import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, merge } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import {
  GoogleGeocoder,
  GoogleMap,
  GoogleMapsLoaderService,
  GoogleMapsModules,
  GoogleMarker,
} from '../../services/google-maps-loader.service';

const DEFAULT_CENTER = { lat: 23.6345, lng: -102.5528 };
const DEFAULT_ZOOM = 5;
const LOCATED_ZOOM = 16;

/**
 * Campos de dirección + Google Maps (pin arrastrable).
 * Sin campo `type` — reutilizable para sucursal, almacén/CEDIS y embebido en cliente.
 */
@Component({
  selector: 'app-location-map-fields',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-map-fields.component.html',
  styleUrl: './location-map-fields.component.scss',
})
export class LocationMapFieldsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) formGroup!: FormGroup;
  /** Nombre del control de calle (p. ej. address | street | street_address). */
  @Input() streetControl = 'street';
  @Input() cityControl = 'city';
  @Input() stateControl = 'state';
  @Input() postalControl = 'postal_code';
  @Input() countryControl = 'country';
  @Input() latitudeControl = 'latitude';
  @Input() longitudeControl = 'longitude';
  @Input() streetLabel = 'Calle y número';
  @Input() postalLabel = 'Código postal';
  /** Si false, no renderiza los inputs (solo mapa + botones GPS). */
  @Input() showAddressFields = true;
  /** Lat/lng requeridos visualmente (el parent valida). */
  @Input() coordsRequired = false;
  /**
   * Cuando pasa a true (p. ej. dialog afterOpened / datos cargados),
   * inicia o refresca el mapa.
   */
  @Input() mapActive = true;

  @ViewChild('mapContainer') mapContainer?: ElementRef<HTMLDivElement>;

  mapLoading = signal(true);
  mapError = signal<string | null>(null);
  geocoding = signal(false);

  private destroy$ = new Subject<void>();
  private maps: GoogleMapsModules | null = null;
  private map: GoogleMap | null = null;
  private marker: GoogleMarker | null = null;
  private geocoder: GoogleGeocoder | null = null;
  private latLngSubBound = false;

  private mapsLoader = inject(GoogleMapsLoaderService);
  private ngZone = inject(NgZone);
  private snackBar = inject(MatSnackBar);

  ngAfterViewInit(): void {
    this.bindLatLngWatch();
    if (this.mapActive) {
      setTimeout(() => void this.initMap(), 80);
      setTimeout(() => void this.initMap(), 260);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapActive'] && this.mapActive) {
      setTimeout(() => void this.initMap(), 80);
    }
    if (changes['formGroup'] && this.formGroup) {
      this.bindLatLngWatch();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.maps && this.marker) {
      this.maps.event.clearInstanceListeners(this.marker);
    }
    if (this.maps && this.map) {
      this.maps.event.clearInstanceListeners(this.map);
    }
  }

  useBrowserLocation(): void {
    if (!navigator.geolocation) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Geolocalización no disponible en este navegador', type: 'error' },
        duration: 4000,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => this.patchCoords(pos.coords.latitude, pos.coords.longitude, true),
      () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'No se pudo obtener la ubicación', type: 'error' },
          duration: 4000,
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  locateOnMap(): void {
    if (!this.geocoder) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'El mapa aún no está listo', type: 'error' },
        duration: 4000,
      });
      return;
    }

    const query = this.buildAddressQuery();
    if (!query) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Ingresa al menos calle y ciudad para ubicar', type: 'error' },
        duration: 4000,
      });
      return;
    }

    this.geocoding.set(true);
    this.geocoder.geocode({ address: query }, (results, status) => {
      this.ngZone.run(() => {
        this.geocoding.set(false);
        if (status !== 'OK' || !results?.[0]) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'No se encontró esa dirección en el mapa', type: 'error' },
            duration: 5000,
          });
          return;
        }
        const location = results[0].geometry.location;
        this.patchCoords(location.lat(), location.lng(), true);
      });
    });
  }

  /** Refresco público (p. ej. al cambiar de tab). */
  refreshMap(): void {
    this.refreshMapSize();
  }

  private bindLatLngWatch(): void {
    if (!this.formGroup || this.latLngSubBound) return;
    const lat = this.formGroup.get(this.latitudeControl);
    const lng = this.formGroup.get(this.longitudeControl);
    if (!lat || !lng) return;

    this.latLngSubBound = true;
    merge(lat.valueChanges, lng.valueChanges)
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => this.moveMarkerFromForm());
  }

  private async initMap(): Promise<void> {
    if (!this.mapActive) return;
    const el = this.mapContainer?.nativeElement;
    if (!el) return;

    if (this.map) {
      this.refreshMapSize();
      return;
    }

    this.mapLoading.set(true);
    this.mapError.set(null);

    try {
      this.maps = await this.mapsLoader.load();
      const center = this.readCoords() ?? DEFAULT_CENTER;
      const zoom = this.readCoords() ? LOCATED_ZOOM : DEFAULT_ZOOM;
      const { Map, Marker, Geocoder } = this.maps;

      this.ngZone.runOutsideAngular(() => {
        this.map = new Map(el, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
        });

        this.marker = new Marker({
          map: this.map,
          position: center,
          draggable: true,
          title: 'Arrastra para confirmar la ubicación',
        });

        this.geocoder = new Geocoder();

        this.marker.addListener('dragend', () => {
          const pos = this.marker?.getPosition();
          if (!pos) return;
          this.ngZone.run(() => this.patchCoords(pos.lat(), pos.lng(), false));
        });
      });

      this.ngZone.run(() => this.mapLoading.set(false));
      setTimeout(() => this.refreshMapSize(), 50);
      setTimeout(() => this.refreshMapSize(), 250);

      if (!this.readCoords() && this.buildAddressQuery()) {
        this.locateOnMap();
      }
    } catch (err: unknown) {
      this.ngZone.run(() => {
        this.mapLoading.set(false);
        this.mapError.set(err instanceof Error ? err.message : 'No se pudo cargar el mapa');
      });
    }
  }

  private refreshMapSize(): void {
    if (!this.maps || !this.map) return;
    const coords = this.readCoords() ?? DEFAULT_CENTER;
    this.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(coords);
  }

  private buildAddressQuery(): string {
    if (!this.formGroup) return '';
    const raw = this.formGroup.getRawValue();
    return [
      raw[this.streetControl],
      raw[this.cityControl],
      raw[this.stateControl],
      raw[this.postalControl],
      raw[this.countryControl],
    ]
      .map((part: unknown) => String(part ?? '').trim())
      .filter(Boolean)
      .join(', ');
  }

  private readCoords(): { lat: number; lng: number } | null {
    if (!this.formGroup) return null;
    const lat = Number(this.formGroup.get(this.latitudeControl)?.value);
    const lng = Number(this.formGroup.get(this.longitudeControl)?.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  }

  private patchCoords(lat: number, lng: number, moveMap: boolean): void {
    this.formGroup.patchValue(
      {
        [this.latitudeControl]: Number(lat.toFixed(6)),
        [this.longitudeControl]: Number(lng.toFixed(6)),
      },
      { emitEvent: false }
    );
    if (moveMap) this.moveMarkerFromForm(true);
  }

  private moveMarkerFromForm(forceZoom = false): void {
    const coords = this.readCoords();
    if (!coords || !this.map || !this.marker) return;
    this.marker.setPosition(coords);
    this.map.panTo(coords);
    if (forceZoom) this.map.setZoom(LOCATED_ZOOM);
  }
}

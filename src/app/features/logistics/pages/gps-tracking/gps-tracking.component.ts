import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, RefreshCw } from 'lucide-angular';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { GoogleMapsLoaderService } from '../../../../core/services/google-maps-loader.service';
import { GpsUnit } from '../../models/gps-unit.model';
import { GpsTrackingService } from '../../services/gps-tracking.service';
import { truckFacesLeft, truckMarkerColor, truckMarkerUrl } from '../../utils/truck-marker';

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

@Component({
  selector: 'app-gps-tracking',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './gps-tracking.component.html',
  styleUrl: './gps-tracking.component.scss',
})
export class GpsTrackingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapHost') mapHost?: ElementRef<HTMLDivElement>;

  readonly RefreshCw = RefreshCw;

  units = signal<GpsUnit[]>([]);
  selectedId = signal<string | null>(null);
  loading = signal(false);
  message = signal<string | null>(null);

  private map: any = null;
  private mapsReady = false;
  private markers: any[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private destroyed = false;
  private didFit = false;

  constructor(
    private gps: GpsTrackingService,
    private mapsLoader: GoogleMapsLoaderService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.refresh();
    this.timer = setInterval(() => this.refresh(false), 45000);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.timer) clearInterval(this.timer);
    this.clearMarkers();
  }

  selected(): GpsUnit | null {
    const id = this.selectedId();
    return this.units().find((unit) => unit.uid === id) ?? null;
  }

  refresh(showSpinner = true): void {
    if (showSpinner) this.loading.set(true);
    this.gps.getPositions().subscribe({
      next: (response) => {
        if (this.destroyed) return;
        this.loading.set(false);
        this.units.set(response.units);
        this.message.set(response.ok ? null : response.message || 'No se pudo consultar el GPS.');
        if (this.selectedId() && !response.units.some((unit) => unit.uid === this.selectedId())) {
          this.selectedId.set(response.units[0]?.uid ?? null);
        } else if (!this.selectedId() && response.units.length) {
          const withPoint = response.units.find((unit) => this.hasPoint(unit));
          this.selectedId.set((withPoint ?? response.units[0]).uid);
        }
        void this.renderMap();
      },
      error: () => {
        if (this.destroyed) return;
        this.loading.set(false);
        this.message.set('No se pudo consultar el GPS.');
      },
    });
  }

  select(unit: GpsUnit): void {
    this.selectedId.set(unit.uid);
    if (!this.map || !this.hasPoint(unit)) return;
    this.map.panTo({ lat: Number(unit.latitude), lng: Number(unit.longitude) });
    this.map.setZoom(13);
  }

  formatWhen(value: string | null | undefined): string {
    if (!value) return 'Sin reporte';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }

  speedLabel(unit: GpsUnit): string {
    if (unit.speed == null || !Number.isFinite(Number(unit.speed))) return '—';
    const measure = unit.speed_measure?.trim() || 'km/h';
    return `${Number(unit.speed).toLocaleString('es-MX', { maximumFractionDigits: 1 })} ${measure}`;
  }

  private async renderMap(): Promise<void> {
    const host = this.mapHost?.nativeElement;
    if (!host || this.destroyed) return;
    const gmaps = await this.ensureMaps();
    if (!gmaps || this.destroyed) return;

    const located = this.units().filter((unit) => this.hasPoint(unit));
    if (!this.map) {
      const first = located[0];
      this.map = new gmaps.Map(host, {
        center: first
          ? { lat: Number(first.latitude), lng: Number(first.longitude) }
          : { lat: 20.6, lng: -100.4 },
        zoom: first ? 8 : 6,
        styles: DARK_MAP_STYLE,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });
    }

    this.clearMarkers();
    const bounds = new gmaps.LatLngBounds();
    for (const unit of located) {
      const position = { lat: Number(unit.latitude), lng: Number(unit.longitude) };
      bounds.extend(position);
      const marker = new gmaps.Marker({
        map: this.map,
        position,
        title: unit.name,
        icon: {
          url: truckMarkerUrl(truckMarkerColor(unit.speed, unit.ignition), truckFacesLeft(unit.heading)),
          scaledSize: new gmaps.Size(54, 30),
          anchor: new gmaps.Point(27, 22),
        },
      });
      marker.addListener('click', () => this.ngZone.run(() => this.select(unit)));
      this.markers.push(marker);
    }

    const selected = this.selected();
    if (!this.didFit) {
      if (selected && this.hasPoint(selected)) {
        this.map.panTo({ lat: Number(selected.latitude), lng: Number(selected.longitude) });
        this.map.setZoom(12);
      } else if (located.length > 1) {
        this.map.fitBounds(bounds, 64);
      } else if (located.length === 1) {
        this.map.setCenter({ lat: Number(located[0].latitude), lng: Number(located[0].longitude) });
        this.map.setZoom(13);
      }
      if (located.length) this.didFit = true;
    }
  }

  private async ensureMaps(): Promise<any> {
    if (this.mapsReady && (window as any).google?.maps) return (window as any).google.maps;
    await this.mapsLoader.load();
    this.mapsReady = true;
    return (window as any).google?.maps ?? null;
  }

  private clearMarkers(): void {
    for (const marker of this.markers) marker.setMap(null);
    this.markers = [];
  }

  hasCoords(unit: GpsUnit): boolean {
    return this.hasPoint(unit);
  }

  private hasPoint(unit: GpsUnit): boolean {
    return Number.isFinite(Number(unit.latitude)) && Number.isFinite(Number(unit.longitude));
  }
}

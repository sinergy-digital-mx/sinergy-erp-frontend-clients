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
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import {
  GoogleMap,
  GoogleMapsLoaderService,
  GoogleMapsModules,
  GoogleMarker,
} from '../../../../core/services/google-maps-loader.service';
import {
  ShippingOrigin,
  ShippingPreviewOrder,
  ShippingRoutePoint,
  ShippingStop,
} from '../../models/shipping.model';

export interface ShippingMapPoint {
  lat: number;
  lng: number;
  label: string;
  kind: 'origin' | 'stop';
  seq: string;
}

type MapOverlay = { setMap: (map: GoogleMap | null) => void };

@Component({
  selector: 'app-shipping-map',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './shipping-map.component.html',
  styleUrl: './shipping-map.component.scss',
})
export class ShippingMapComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() active = false;
  @Input() origin: ShippingOrigin | null = null;
  @Input() stops: ShippingStop[] = [];
  @Input() previewOrders: ShippingPreviewOrder[] = [];
  @Input() routePoints: ShippingRoutePoint[] = [];

  @ViewChild('mapHost') mapHost?: ElementRef<HTMLDivElement>;

  points: ShippingMapPoint[] = [];
  empty = true;
  mapLoading = signal(false);
  mapError = signal<string | null>(null);

  private maps: GoogleMapsModules | null = null;
  private map: GoogleMap | null = null;
  private markers: GoogleMarker[] = [];
  private routeOverlays: MapOverlay[] = [];
  private initToken = 0;
  private renderTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private mapsLoader: GoogleMapsLoaderService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.scheduleRender();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.points = this.collectPoints();
    this.empty = this.points.length === 0;
    if (this.active && !this.empty) {
      this.scheduleRender();
    } else {
      this.cancelScheduledRender();
      this.destroyMap();
      this.mapLoading.set(false);
      this.mapError.set(null);
    }
  }

  ngOnDestroy(): void {
    this.cancelScheduledRender();
    this.initToken += 1;
    this.destroyMap();
  }

  private scheduleRender(): void {
    this.cancelScheduledRender();
    if (!this.active || this.empty) return;
    this.renderTimer = setTimeout(() => {
      this.renderTimer = null;
      void this.renderMap();
    }, 0);
  }

  private cancelScheduledRender(): void {
    if (this.renderTimer != null) {
      clearTimeout(this.renderTimer);
      this.renderTimer = null;
    }
  }

  private collectPoints(): ShippingMapPoint[] {
    if (this.routePoints?.length) {
      return this.routePoints
        .filter((p) => this.isValidCoord(p.latitude, p.longitude))
        .map((p, idx) => ({
          lat: Number(p.latitude),
          lng: Number(p.longitude),
          label: p.name || (p.kind === 'origin' ? 'Origen' : 'Parada'),
          kind: p.kind,
          seq: p.label || (p.kind === 'origin' ? '0' : String(idx)),
        }));
    }

    const points: ShippingMapPoint[] = [];
    const oLat = this.origin?.latitude;
    const oLng = this.origin?.longitude;
    if (this.isValidCoord(oLat, oLng)) {
      points.push({
        lat: Number(oLat),
        lng: Number(oLng),
        label: this.origin?.name || this.origin?.warehouse_name || 'Origen',
        kind: 'origin',
        seq: this.origin?.label || '0',
      });
    }

    const previewStops = this.previewOrders ?? [];
    if (previewStops.length) {
      previewStops.forEach((stop, idx) => {
        const lat = stop.delivery_latitude ?? stop.latitude;
        const lng = stop.delivery_longitude ?? stop.longitude;
        if (this.isValidCoord(lat, lng)) {
          points.push({
            lat: Number(lat),
            lng: Number(lng),
            label: stop.customer_name || stop.folio || 'Parada',
            kind: 'stop',
            seq: stop.label || String(idx + 1),
          });
        }
      });
      return points;
    }

    (this.stops ?? []).forEach((stop, idx) => {
      const lat = stop.delivery_latitude;
      const lng = stop.delivery_longitude;
      if (this.isValidCoord(lat, lng)) {
        points.push({
          lat: Number(lat),
          lng: Number(lng),
          label: stop.customer_name || stop.order_number || 'Parada',
          kind: 'stop',
          seq: String(stop.stop_sequence ?? idx + 1),
        });
      }
    });
    return points;
  }

  private isValidCoord(lat: unknown, lng: unknown): boolean {
    const a = Number(lat);
    const b = Number(lng);
    return Number.isFinite(a) && Number.isFinite(b);
  }

  private async renderMap(): Promise<void> {
    const token = ++this.initToken;
    const el = this.mapHost?.nativeElement;
    if (!el || this.empty || !this.active) {
      this.mapLoading.set(false);
      return;
    }

    this.mapLoading.set(true);
    this.mapError.set(null);

    try {
      this.maps = await this.mapsLoader.load();
      if (token !== this.initToken) return;

      this.clearOverlays();

      const gmaps = (window as any).google?.maps;
      if (!gmaps) throw new Error('Google Maps no disponible');

      if (!this.map) {
        this.map = new this.maps!.Map(el, {
          center: { lat: this.points[0].lat, lng: this.points[0].lng },
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
        });
      }

      const bounds = new gmaps.LatLngBounds();
      this.points.forEach((p, idx) => {
        const pos = { lat: p.lat, lng: p.lng };
        bounds.extend(pos);

        const markerText = this.markerText(p, idx);
        const marker = new this.maps!.Marker({
          map: this.map!,
          position: pos,
          title: `${markerText}. ${p.label}`,
          label: {
            text: markerText,
            color: '#fff',
            fontWeight: '700',
            fontSize: '11px',
          },
          icon: {
            path: gmaps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: '#16a34a',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });
        this.markers.push(marker);
      });

      if (this.points.length === 1) {
        this.map!.setCenter({ lat: this.points[0].lat, lng: this.points[0].lng });
        this.map!.setZoom(13);
      } else {
        await this.drawDrivingRoute(gmaps, token);
        if (token !== this.initToken) return;
        this.map!.fitBounds?.(bounds, 48);
      }

      if (token !== this.initToken) return;

      this.mapLoading.set(false);
      setTimeout(() => {
        if (token === this.initToken) {
          this.maps?.event.trigger(this.map as object, 'resize');
        }
      }, 80);
      setTimeout(() => {
        if (token === this.initToken) {
          this.maps?.event.trigger(this.map as object, 'resize');
        }
      }, 280);
    } catch (err: any) {
      if (token !== this.initToken) return;
      this.mapLoading.set(false);
      this.mapError.set(err?.message || 'No se pudo cargar Google Maps');
    } finally {
      if (token === this.initToken && this.mapLoading() && this.map) {
        this.mapLoading.set(false);
      }
    }
  }

  /**
   * Traza la ruta por calles (Directions). Si falla, cae a línea recta entre puntos.
   * Directions permite hasta 25 waypoints intermedios.
   */
  private async drawDrivingRoute(gmaps: any, token: number): Promise<void> {
    const path = this.points.map((p) => ({ lat: p.lat, lng: p.lng }));
    if (path.length < 2) return;

    const DirectionsService = gmaps.DirectionsService;
    if (typeof DirectionsService !== 'function') {
      this.drawStraightPolyline(gmaps, path);
      return;
    }

    // Chunk: origin + hasta 23 waypoints + destination por request.
    const chunks = this.chunkRoutePoints(path, 25);
    const service = new DirectionsService();

    for (const chunk of chunks) {
      if (token !== this.initToken) return;
      try {
        const result = await this.requestDirections(service, gmaps, chunk);
        if (token !== this.initToken) return;
        if (result) {
          this.paintDirectionsResult(gmaps, result);
        } else {
          this.drawStraightPolyline(gmaps, chunk);
        }
      } catch {
        if (token !== this.initToken) return;
        this.drawStraightPolyline(gmaps, chunk);
      }
    }
  }

  private chunkRoutePoints(
    path: { lat: number; lng: number }[],
    maxPoints: number
  ): { lat: number; lng: number }[][] {
    if (path.length <= maxPoints) return [path];

    const chunks: { lat: number; lng: number }[][] = [];
    let start = 0;
    while (start < path.length - 1) {
      const end = Math.min(start + maxPoints - 1, path.length - 1);
      chunks.push(path.slice(start, end + 1));
      start = end; // overlap last point as next origin
    }
    return chunks;
  }

  private requestDirections(
    service: any,
    gmaps: any,
    chunk: { lat: number; lng: number }[]
  ): Promise<any | null> {
    const origin = chunk[0];
    const destination = chunk[chunk.length - 1];
    const waypoints = chunk.slice(1, -1).map((p) => ({
      location: p,
      stopover: true,
    }));

    return new Promise((resolve) => {
      service.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: gmaps.TravelMode?.DRIVING || 'DRIVING',
          optimizeWaypoints: false,
        },
        (result: any, status: string) => {
          if (status === 'OK' && result) {
            resolve(result);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  private paintDirectionsResult(gmaps: any, result: any): void {
    // Preferir DirectionsRenderer (ruta por calles) sin markers propios del renderer.
    if (typeof gmaps.DirectionsRenderer === 'function') {
      const renderer = new gmaps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeOpacity: 0.9,
          strokeWeight: 5,
        },
      });
      renderer.setDirections(result);
      this.routeOverlays.push(renderer);
      return;
    }

    // Fallback: path de los legs.
    const routePath: { lat: number; lng: number }[] = [];
    const route = result?.routes?.[0];
    const legs = route?.legs ?? [];
    for (const leg of legs) {
      for (const step of leg.steps ?? []) {
        const stepPath = step.path || step.lat_lngs || [];
        for (const pt of stepPath) {
          const lat = typeof pt.lat === 'function' ? pt.lat() : pt.lat;
          const lng = typeof pt.lng === 'function' ? pt.lng() : pt.lng;
          if (Number.isFinite(lat) && Number.isFinite(lng)) {
            routePath.push({ lat, lng });
          }
        }
      }
    }
    if (routePath.length > 1) {
      this.drawStraightPolyline(gmaps, routePath, false);
    }
  }

  private drawStraightPolyline(
    gmaps: any,
    path: { lat: number; lng: number }[],
    geodesic = true
  ): void {
    if (path.length < 2 || typeof gmaps.Polyline !== 'function') return;
    const line = new gmaps.Polyline({
      path,
      geodesic,
      strokeColor: '#2563eb',
      strokeOpacity: 0.85,
      strokeWeight: 4,
      map: this.map,
    });
    this.routeOverlays.push(line);
  }

  private markerText(point: ShippingMapPoint, idx: number): string {
    const raw = String(point.seq ?? '').trim();
    if (/^\d+$/.test(raw)) return raw.length <= 2 ? raw : raw.slice(0, 2);
    if (/^[A-Za-z]$/.test(raw)) {
      return String(raw.toUpperCase().charCodeAt(0) - 65);
    }
    return String(point.kind === 'origin' ? 0 : idx);
  }

  private clearOverlays(): void {
    for (const m of this.markers) {
      m.setMap(null);
      this.maps?.event.clearInstanceListeners(m);
    }
    this.markers = [];
    for (const overlay of this.routeOverlays) {
      overlay.setMap(null);
    }
    this.routeOverlays = [];
  }

  private destroyMap(): void {
    this.clearOverlays();
    if (this.map && this.maps) {
      this.maps.event.clearInstanceListeners(this.map);
    }
    this.map = null;
  }
}

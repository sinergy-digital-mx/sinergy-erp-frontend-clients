import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import {
  GoogleGeocoder,
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
  ShippingTransfer,
} from '../../models/shipping.model';
import { truckFacesLeft, truckMarkerColor, truckMarkerUrl } from '../../utils/truck-marker';

export interface ShippingMapVehicle {
  lat: number;
  lng: number;
  title: string;
  speedKmh?: number | null;
  speedMeasure?: string | null;
  heading?: number | null;
  ignition?: string | null;
  reportedAt?: string | null;
  address?: string | null;
}

export interface ShippingMapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  kind: 'origin' | 'stop' | 'transfer';
  seq: string;
  address?: string;
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
  @Input() transfers: ShippingTransfer[] = [];
  @Input() vehicle: ShippingMapVehicle | null = null;

  @Output() focusFailed = new EventEmitter<string>();

  @ViewChild('mapHost') mapHost?: ElementRef<HTMLDivElement>;

  points: ShippingMapPoint[] = [];
  empty = true;
  mapLoading = signal(false);
  mapError = signal<string | null>(null);

  private maps: GoogleMapsModules | null = null;
  private map: GoogleMap | null = null;
  private markers: GoogleMarker[] = [];
  private markerById = new Map<string, GoogleMarker>();
  private routeOverlays: MapOverlay[] = [];
  private infoWindow: { close: () => void; setContent?: (html: string) => void; open?: (opts: unknown) => void } | null = null;
  private initToken = 0;
  private renderTimer: ReturnType<typeof setTimeout> | null = null;
  private renderAttempts = 0;
  private destroyed = false;
  private pendingFocusId: string | null = null;
  private geocoded = new Map<string, { lat: number; lng: number } | null>();
  private geocodeInFlight = new Set<string>();
  private geocodeQueue: Array<{ key: string; address: string }> = [];
  private geocoding = false;

  constructor(
    private mapsLoader: GoogleMapsLoaderService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.scheduleRender();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.points = this.collectPoints();
    this.empty = this.points.length === 0 && !this.hasVehicle();
    if (this.geocodeQueue.length) void this.geocodeQueued();
    if (this.active && !this.empty) {
      this.scheduleRender();
    } else if (!this.active || (this.empty && !this.geocodeQueue.length && !this.geocoding)) {
      this.cancelScheduledRender();
      this.destroyMap();
      this.mapLoading.set(false);
      this.mapError.set(null);
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cancelScheduledRender();
    this.initToken += 1;
    this.destroyMap();
  }

  /** Centra el mapa en origen, parada o transferencia. */
  focus(id: string): boolean {
    if (this.applyFocus(id)) {
      this.pendingFocusId = null;
      return true;
    }
    if (!this.canResolve(id)) return false;
    this.pendingFocusId = id;
    if (this.geocodeQueue.length) void this.geocodeQueued();
    return true;
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
    const points = this.collectBasePoints();
    this.appendTransferPoints(points);
    return points;
  }

  private collectBasePoints(): ShippingMapPoint[] {
    if (this.routePoints?.length) {
      return this.routePoints
        .filter((p) => this.isValidCoord(p.latitude, p.longitude))
        .map((p, idx) => ({
          id: p.kind === 'origin' ? 'origin' : p.sales_order_id ? `stop:${p.sales_order_id}` : `route:${idx}`,
          lat: Number(p.latitude),
          lng: Number(p.longitude),
          label: p.name || (p.kind === 'origin' ? 'Origen' : 'Parada'),
          kind: p.kind,
          seq: p.label || (p.kind === 'origin' ? '0' : String(idx)),
          address: p.address_summary || undefined,
        }));
    }

    const points: ShippingMapPoint[] = [];
    const oLat = this.origin?.latitude;
    const oLng = this.origin?.longitude;
    if (this.isValidCoord(oLat, oLng)) {
      points.push({
        id: 'origin',
        lat: Number(oLat),
        lng: Number(oLng),
        label: this.origin?.name || this.origin?.warehouse_name || 'Origen',
        kind: 'origin',
        seq: this.origin?.label || '0',
        address: this.origin?.address_summary,
      });
    }

    const previewStops = this.previewOrders ?? [];
    if (previewStops.length) {
      previewStops.forEach((stop, idx) => {
        const lat = stop.delivery_latitude ?? stop.latitude;
        const lng = stop.delivery_longitude ?? stop.longitude;
        if (this.isValidCoord(lat, lng)) {
          points.push({
            id: `stop:${stop.sales_order_id}`,
            lat: Number(lat),
            lng: Number(lng),
            label: stop.customer_name || stop.folio || 'Parada',
            kind: 'stop',
            seq: stop.label || String(idx + 1),
            address: stop.address_summary,
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
          id: `stop:${stop.sales_order_id}`,
          lat: Number(lat),
          lng: Number(lng),
          label: stop.customer_name || stop.order_number || 'Parada',
          kind: 'stop',
          seq: String(stop.stop_sequence ?? idx + 1),
          address: stop.address_summary,
        });
      }
    });
    return points;
  }

  private appendTransferPoints(points: ShippingMapPoint[]): void {
    const lastSeq = points.reduce((max, point) => {
      const seq = Number(point.seq);
      return Number.isFinite(seq) ? Math.max(max, seq) : max;
    }, 0);
    (this.transfers ?? []).forEach((transfer, idx) => {
      const id = `transfer:${transfer.id}`;
      if (points.some((point) => point.id === id)) return;
      const address = transfer.destination_address?.trim() || '';
      const resolved = this.resolveTransferCoords(transfer, address);
      if (!resolved) return;
      const branch = transfer.destination_branch_name?.trim();
      const warehouse = transfer.destination_warehouse_name?.trim();
      const place = [branch, warehouse].filter(Boolean).join(' · ');
      points.push({
        id,
        lat: resolved.lat,
        lng: resolved.lng,
        label: place ? `${transfer.folio} · ${place}` : transfer.folio || 'Transferencia',
        kind: 'transfer',
        seq: String(lastSeq + idx + 1),
        address: address || undefined,
      });
    });
  }

  private resolveTransferCoords(
    transfer: ShippingTransfer,
    address: string
  ): { lat: number; lng: number } | null {
    if (this.isValidCoord(transfer.destination_latitude, transfer.destination_longitude)) {
      return {
        lat: Number(transfer.destination_latitude),
        lng: Number(transfer.destination_longitude),
      };
    }
    if (!address) return null;
    const key = address.toLowerCase();
    if (this.geocoded.has(key)) return this.geocoded.get(key) ?? null;
    this.queueGeocode(address);
    return null;
  }

  private queueGeocode(address: string): void {
    const trimmed = address.trim();
    const key = trimmed.toLowerCase();
    if (!key || this.geocoded.has(key) || this.geocodeInFlight.has(key)) return;
    this.geocodeInFlight.add(key);
    this.geocodeQueue.push({ key, address: trimmed });
  }

  private hasVehicle(): boolean {
    return !!this.vehicle && this.isValidCoord(this.vehicle.lat, this.vehicle.lng);
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
      if (!el && !this.empty && this.active && this.renderAttempts < 8) {
        this.renderAttempts += 1;
        this.scheduleRender();
      }
      this.mapLoading.set(false);
      return;
    }
    this.renderAttempts = 0;

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
            fillColor: p.kind === 'transfer' ? '#0f766e' : '#16a34a',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });
        marker.addListener('click', () => this.openPointInfo(p, marker));
        this.markers.push(marker);
        this.markerById.set(p.id, marker);
      });
      this.addVehicleMarker(gmaps, bounds);

      const plotted = this.points.length + (this.hasVehicle() ? 1 : 0);
      const focusing =
        !!this.pendingFocusId && this.points.some((point) => point.id === this.pendingFocusId);
      if (!focusing && plotted <= 1) {
        const only = this.hasVehicle()
          ? { lat: Number(this.vehicle!.lat), lng: Number(this.vehicle!.lng) }
          : { lat: this.points[0].lat, lng: this.points[0].lng };
        this.map!.setCenter(only);
        this.map!.setZoom(13);
      } else if (!focusing) {
        if (this.points.length > 1) {
          await this.drawDrivingRoute(gmaps, token);
          if (token !== this.initToken) return;
        }
        this.map!.fitBounds?.(bounds, 48);
      } else if (this.points.length > 1) {
        await this.drawDrivingRoute(gmaps, token);
        if (token !== this.initToken) return;
      }

      if (token !== this.initToken) return;
      this.settleFocus();

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

  private addVehicleMarker(gmaps: any, bounds: { extend: (pos: { lat: number; lng: number }) => void }): void {
    if (!this.hasVehicle() || !this.map) return;
    const vehicle = this.vehicle!;
    const position = { lat: Number(vehicle.lat), lng: Number(vehicle.lng) };
    bounds.extend(position);
    const marker = new this.maps!.Marker({
      map: this.map,
      position,
      title: vehicle.title || 'Camión',
      icon: {
        url: truckMarkerUrl(
          truckMarkerColor(vehicle.speedKmh, vehicle.ignition),
          truckFacesLeft(vehicle.heading)
        ),
        scaledSize: new gmaps.Size(54, 30),
        anchor: new gmaps.Point(27, 22),
      },
    });
    if (typeof gmaps.InfoWindow === 'function') {
      const info = new gmaps.InfoWindow({ content: this.vehicleInfo(vehicle) });
      marker.addListener('click', () => info.open({ map: this.map, anchor: marker }));
      this.infoWindow = info;
    }
    this.markers.push(marker);
  }

  private vehicleInfo(vehicle: ShippingMapVehicle): string {
    const speed =
      vehicle.speedKmh == null
        ? ''
        : `<div>Velocidad: ${this.escapeHtml(String(vehicle.speedKmh))} ${this.escapeHtml(vehicle.speedMeasure || 'km/h')}</div>`;
    const when = vehicle.reportedAt
      ? `<div>Última posición: ${this.escapeHtml(vehicle.reportedAt)}</div>`
      : '';
    const address = vehicle.address ? `<div>${this.escapeHtml(vehicle.address)}</div>` : '';
    return `<div style="font-size:13px;line-height:1.4"><strong>${this.escapeHtml(vehicle.title || 'Camión')}</strong>${speed}${when}${address}</div>`;
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return map[char];
    });
  }

  private markerText(point: ShippingMapPoint, idx: number): string {
    const raw = String(point.seq ?? '').trim();
    if (/^\d+$/.test(raw)) return raw.length <= 2 ? raw : raw.slice(0, 2);
    if (/^[A-Za-z]$/.test(raw)) {
      return String(raw.toUpperCase().charCodeAt(0) - 65);
    }
    return String(point.kind === 'origin' ? 0 : idx);
  }

  private canResolve(id: string): boolean {
    if (this.points.some((point) => point.id === id)) return true;
    if (id === 'origin') return this.isValidCoord(this.origin?.latitude, this.origin?.longitude);
    if (id.startsWith('stop:')) {
      const stopId = id.slice('stop:'.length);
      const stop = (this.stops ?? []).find((item) => item.sales_order_id === stopId);
      if (stop) return this.isValidCoord(stop.delivery_latitude, stop.delivery_longitude);
      const preview = (this.previewOrders ?? []).find((item) => item.sales_order_id === stopId);
      if (!preview) return false;
      return this.isValidCoord(
        preview.delivery_latitude ?? preview.latitude,
        preview.delivery_longitude ?? preview.longitude
      );
    }
    if (id.startsWith('transfer:')) {
      const transferId = id.slice('transfer:'.length);
      const transfer = (this.transfers ?? []).find((item) => item.id === transferId);
      if (!transfer) return false;
      if (this.isValidCoord(transfer.destination_latitude, transfer.destination_longitude)) return true;
      const address = transfer.destination_address?.trim();
      if (!address) return false;
      return this.geocoded.get(address.toLowerCase()) !== null;
    }
    return false;
  }

  private applyFocus(id: string): boolean {
    const point = this.points.find((item) => item.id === id);
    const marker = this.markerById.get(id);
    if (!point || !marker || !this.map) return false;
    this.map.panTo({ lat: point.lat, lng: point.lng });
    this.map.setZoom(15);
    this.openPointInfo(point, marker);
    return true;
  }

  private settleFocus(): void {
    const id = this.pendingFocusId;
    if (!id) return;
    if (this.applyFocus(id)) {
      this.pendingFocusId = null;
      return;
    }
    if (this.geocoding || this.geocodeQueue.length) return;
    this.pendingFocusId = null;
    this.focusFailed.emit(id);
  }

  private openPointInfo(point: ShippingMapPoint, marker: GoogleMarker): void {
    const gmaps = (window as any).google?.maps;
    if (!gmaps || typeof gmaps.InfoWindow !== 'function' || !this.map) return;
    const address = point.address
      ? `<div>${this.escapeHtml(point.address)}</div>`
      : '';
    const content = `<div style="font-size:13px;line-height:1.4"><strong>${this.escapeHtml(point.label)}</strong>${address}</div>`;
    if (!this.infoWindow) {
      this.infoWindow = new gmaps.InfoWindow();
    }
    this.infoWindow.setContent?.(content);
    this.infoWindow.open?.({ map: this.map, anchor: marker });
  }

  private async geocodeQueued(): Promise<void> {
    if (this.geocoding || !this.geocodeQueue.length || !this.active || this.destroyed) return;
    this.geocoding = true;
    const batch = this.geocodeQueue.splice(0);
    try {
      this.maps = this.maps ?? (await this.mapsLoader.load());
      if (this.destroyed) return;
      const geocoder: GoogleGeocoder = new this.maps.Geocoder();
      let found = false;
      for (const item of batch) {
        const hit = await this.lookupAddress(geocoder, item.address);
        if (this.destroyed) return;
        this.geocoded.set(item.key, hit);
        this.geocodeInFlight.delete(item.key);
        if (hit) found = true;
      }
      if (found) {
        this.points = this.collectPoints();
        this.empty = this.points.length === 0 && !this.hasVehicle();
        if (this.active && !this.empty) this.scheduleRender();
        else this.settleFocus();
      } else {
        this.settleFocus();
      }
    } catch {
      for (const item of batch) {
        if (!this.geocoded.has(item.key)) this.geocoded.set(item.key, null);
        this.geocodeInFlight.delete(item.key);
      }
      this.settleFocus();
    } finally {
      this.geocoding = false;
      if (!this.destroyed && this.geocodeQueue.length && this.active) void this.geocodeQueued();
    }
  }

  private lookupAddress(
    geocoder: GoogleGeocoder,
    address: string
  ): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      geocoder.geocode({ address }, (results, status) => {
        this.ngZone.run(() => {
          if (status !== 'OK' || !results?.[0]) {
            resolve(null);
            return;
          }
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          resolve(this.isValidCoord(lat, lng) ? { lat, lng } : null);
        });
      });
    });
  }

  private clearOverlays(): void {
    this.infoWindow?.close();
    this.infoWindow = null;
    this.markerById.clear();
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

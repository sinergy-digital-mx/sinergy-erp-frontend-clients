export type ShippingStatus = 'Creado' | 'En Ruta' | 'Completado' | 'Cancelado';

export type LocationStatus = 'ok' | 'without_location';

export interface ShippingOrderInput {
  sales_order_id: string;
  stop_sequence: number;
  customer_address_id?: number | string;
}

export interface CreateShippingDto {
  shipping_date: string;
  driver_id: string;
  truck_id: string;
  origin_warehouse_id: string;
  notes?: string;
  orders: ShippingOrderInput[];
}

export interface ShippingPreviewDto {
  shipping_date?: string;
  driver_id?: string;
  truck_id?: string;
  origin_warehouse_id: string;
  orders: ShippingOrderInput[];
}

export interface ShippingStop {
  sales_order_id: string;
  order_number?: string;
  folio?: string;
  stop_sequence?: number;
  customer_id?: string | number;
  customer_address_id?: number | string | null;
  customer_name?: string;
  address_summary?: string;
  location_status?: LocationStatus;
  delivery_latitude?: number | null;
  delivery_longitude?: number | null;
  distance_from_previous_km?: number | null;
  order_status?: string;
  hasCoords?: boolean;
  needsAddress?: boolean;
  legDistanceLabel?: string;
}

export interface ShippingOrigin {
  label?: string;
  warehouse_id?: string;
  name?: string;
  warehouse_name?: string;
  latitude?: number | null;
  longitude?: number | null;
  location_status?: LocationStatus;
  address_summary?: string;
}

export interface ShippingRoutePoint {
  label?: string;
  kind: 'origin' | 'stop';
  latitude: number;
  longitude: number;
  name?: string;
  sales_order_id?: string;
  stop_sequence?: number;
}

export interface ShippingPreviewOrder {
  label?: string;
  sales_order_id: string;
  folio?: string;
  order_number?: string;
  customer_name?: string;
  location_status: LocationStatus;
  address_summary?: string;
  address_type?: string;
  customer_id?: string | number;
  customer_address_id?: number | string | null;
  latitude?: number | null;
  longitude?: number | null;
  delivery_latitude?: number | null;
  delivery_longitude?: number | null;
  stop_sequence?: number;
  distance_from_previous_km?: number | null;
  distance_from_origin_km?: number | null;
}

export interface ShippingPreviewResult {
  origin?: ShippingOrigin;
  orders: ShippingPreviewOrder[];
  route_points?: ShippingRoutePoint[];
  estimated_distance_km?: number | null;
  missing_location_count: number;
  origin_missing_location?: boolean;
}

export interface Shipping {
  id: string;
  short_id?: string;
  shipping_date: string;
  status: ShippingStatus | string;
  driver_id?: string;
  driver_name?: string;
  truck_id?: string;
  truck_name?: string;
  truck_placa?: string;
  origin_warehouse_id?: string;
  origin_warehouse_name?: string;
  notes?: string | null;
  distance_km?: number | null;
  stops?: ShippingStop[];
  origin?: ShippingOrigin;
  origin_missing_location?: boolean;
  missing_location_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ShippingListItem extends Shipping {}

export interface ShippingQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  driver_id?: string;
  truck_id?: string;
  origin_warehouse_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface ShippingListResponse {
  data: ShippingListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ResolveOrdersDto {
  sales_order_ids: string[];
}

export interface SalesOrderShippingSummary {
  has_shipping: boolean;
  shipping_id?: string;
  status?: string;
  driver_name?: string;
  truck_name?: string;
  stop_sequence?: number;
  route_summary?: {
    distance_km?: number;
    stops_count?: number;
  };
}

export const SHIPPING_STATUS_COLORS: Record<
  string,
  { background: string; text: string }
> = {
  creado: { background: '#eef2f7', text: '#5b7a9d' },
  'en ruta': { background: '#f7f0ea', text: '#a07858' },
  completado: { background: '#eef5f0', text: '#5c8a6e' },
  cancelado: { background: '#f6eeee', text: '#9a7272' },
};

export function normalizeShippingStatusKey(status: string | null | undefined): string {
  return (status ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getShippingStatusColors(status: string | null | undefined): {
  background: string;
  text: string;
} {
  const key = normalizeShippingStatusKey(status);
  return SHIPPING_STATUS_COLORS[key] ?? { background: '#f3f4f6', text: '#374151' };
}

export function getNextShippingStatuses(current: string | null | undefined): ShippingStatus[] {
  const key = normalizeShippingStatusKey(current);
  if (key === 'creado') return ['En Ruta', 'Cancelado'];
  if (key === 'en ruta') return ['Completado', 'Cancelado'];
  return [];
}

export function enrichShippingStop(stop: ShippingStop): ShippingStop {
  const lat = stop.delivery_latitude;
  const lng = stop.delivery_longitude;
  const hasCoords =
    stop.location_status === 'ok' ||
    (typeof lat === 'number' && typeof lng === 'number' && !Number.isNaN(lat) && !Number.isNaN(lng));

  const needsAddress = !hasCoords && !stop.customer_address_id;

  const km = stop.distance_from_previous_km;
  const legDistanceLabel =
    typeof km === 'number' && !Number.isNaN(km) ? `${km.toFixed(1)} km` : undefined;

  return {
    ...stop,
    hasCoords,
    needsAddress,
    location_status: hasCoords ? 'ok' : 'without_location',
    legDistanceLabel,
  };
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : null;
}

/** Aplana relaciones anidadas del GET detalle / listado. */
export function normalizeShipping(raw: any): Shipping {
  if (!raw || typeof raw !== 'object') return raw as Shipping;

  const driver = raw.driver ?? raw.Driver;
  const truck = raw.truck ?? raw.Truck;
  const warehouse = raw.origin_warehouse ?? raw.originWarehouse ?? raw.warehouse;
  const warehouseLat = toNumber(warehouse?.latitude);
  const warehouseLng = toNumber(warehouse?.longitude);
  const origin = raw.origin
    ? {
        ...raw.origin,
        warehouse_id:
          raw.origin.warehouse_id || raw.origin_warehouse_id || warehouse?.id || undefined,
        name: raw.origin.name || raw.origin.warehouse_name || warehouse?.name,
        warehouse_name: raw.origin.warehouse_name || warehouse?.name,
        location_status:
          raw.origin.location_status ||
          (toNumber(raw.origin.latitude) != null && toNumber(raw.origin.longitude) != null
            ? 'ok'
            : warehouseLat != null && warehouseLng != null
              ? 'ok'
              : 'without_location'),
        latitude: toNumber(raw.origin.latitude) ?? warehouseLat,
        longitude: toNumber(raw.origin.longitude) ?? warehouseLng,
        address_summary:
          raw.origin.address_summary ||
          [warehouse?.street, warehouse?.city, warehouse?.state].filter(Boolean).join(', ') ||
          undefined,
      }
    : warehouse
      ? {
          warehouse_id: warehouse.id,
          name: warehouse.name,
          warehouse_name: warehouse.name,
          latitude: warehouseLat,
          longitude: warehouseLng,
          location_status:
            warehouseLat != null && warehouseLng != null ? 'ok' : 'without_location',
          address_summary: [warehouse.street, warehouse.city, warehouse.state]
            .filter(Boolean)
            .join(', '),
        }
      : undefined;

  const driverName =
    raw.driver_name ||
    (driver
      ? [driver.first_name || driver.name, driver.last_name || driver.lastname]
          .filter(Boolean)
          .join(' ')
          .trim()
      : '') ||
    undefined;

  const truckName = raw.truck_name || truck?.name || undefined;
  const truckPlaca = raw.truck_placa || truck?.placa || undefined;

  const stopsRaw = raw.stops ?? raw.orders ?? [];
  const stops: ShippingStop[] = (Array.isArray(stopsRaw) ? stopsRaw : []).map((s: any, idx: number) => {
    const so = s.sales_order ?? s.salesOrder ?? s.order;
    const customer = s.customer ?? so?.customer;
    const address = s.customer_address ?? s.customerAddress ?? s.address;
    const company = customer?.company_name?.trim?.() || '';
    const person = [customer?.name, customer?.lastname].filter(Boolean).join(' ').trim();
    const customerName =
      s.customer_name ||
      (company && person ? `${company} - ${person}` : company || person) ||
      customer?.display_name ||
      undefined;

    const lat = toNumber(s.delivery_latitude ?? s.latitude ?? address?.latitude);
    const lng = toNumber(s.delivery_longitude ?? s.longitude ?? address?.longitude);
    const distanceFromPrevious = toNumber(s.distance_from_previous_km);

    const hasNumCoords = lat != null && lng != null;

    return {
      sales_order_id: String(s.sales_order_id || so?.id || s.id || ''),
      order_number: s.order_number || s.folio || so?.folio || so?.order_number,
      folio: s.folio || so?.folio,
      stop_sequence: s.stop_sequence ?? idx + 1,
      customer_id: s.customer_id ?? customer?.id ?? so?.customer_id,
      customer_address_id: s.customer_address_id ?? address?.id ?? null,
      customer_name: customerName,
      address_summary:
        s.address_summary ||
        address?.street_address ||
        [address?.street_address || address?.street, address?.city, address?.state]
          .filter(Boolean)
          .join(', ') ||
        undefined,
      location_status: s.location_status || (hasNumCoords ? 'ok' : 'without_location'),
      delivery_latitude: lat,
      delivery_longitude: lng,
      distance_from_previous_km: distanceFromPrevious,
      order_status: s.order_status || so?.general_status,
    } as ShippingStop;
  });

  const originMissing =
    !origin ||
    origin.location_status === 'without_location' ||
    !(typeof origin.latitude === 'number' && typeof origin.longitude === 'number');

  return {
    ...raw,
    short_id: raw.short_id || raw.shipping_number || raw.folio || undefined,
    driver_name: driverName,
    truck_name: truckName,
    truck_placa: truckPlaca,
    origin_warehouse_id: raw.origin_warehouse_id || warehouse?.id || origin?.warehouse_id,
    origin_warehouse_name:
      raw.origin_warehouse_name || warehouse?.name || origin?.name || origin?.warehouse_name,
    distance_km: toNumber(raw.distance_km),
    origin: origin
      ? {
          ...origin,
          location_status: originMissing ? 'without_location' : 'ok',
        }
      : undefined,
    stops,
  } as Shipping;
}

export function countMissingGps(shipping: Shipping | null | undefined): {
  missingStops: number;
  originMissing: boolean;
  total: number;
} {
  if (!shipping) return { missingStops: 0, originMissing: false, total: 0 };
  const stops = (shipping.stops ?? []).map(enrichShippingStop);
  const missingStops = stops.filter((s) => !s.hasCoords).length;
  const originMissing =
    !!shipping.origin_missing_location ||
    shipping.origin?.location_status === 'without_location' ||
    !(
      typeof shipping.origin?.latitude === 'number' &&
      typeof shipping.origin?.longitude === 'number'
    );
  return {
    missingStops,
    originMissing,
    total: missingStops + (originMissing ? 1 : 0),
  };
}

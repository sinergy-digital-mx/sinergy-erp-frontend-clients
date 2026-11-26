import {
  ShippingListItem,
  ShippingStop,
  normalizeShippingStatusKey,
} from '../models/shipping.model';

export type TripTone = 'info' | 'warning' | 'success' | 'danger' | 'neutral';

export interface TripCardModel {
  id: string;
  folio: string;
  status: string;
  tone: TripTone;
  origin: string;
  destination: string;
  customerLine: string;
  clientsLabel: string;
  routeLine: string;
  unitLine: string;
  driverLine: string;
  distanceLabel: string;
  kmValue: string;
  stopsValue: string;
  dateLabel: string;
  dateDay: string;
  dateMonth: string;
  metaLine: string;
}

function stopCustomer(stop: ShippingStop | undefined): string {
  return stop?.customer_name?.trim() || '';
}

function formatKmValue(value: number | null | undefined): string {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 1 }).format(Number(value));
}

function tripTone(status: string | null | undefined): TripTone {
  const key = normalizeShippingStatusKey(status);
  if (key === 'creado') return 'info';
  if (key === 'en ruta') return 'warning';
  if (key === 'completado') return 'success';
  if (key === 'cancelado') return 'danger';
  return 'neutral';
}

function dateParts(value: string | undefined): { day: string; month: string; label: string } {
  if (!value) return { day: '—', month: '', label: '—' };
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return { day: '—', month: '', label: '—' };
  const date = new Date(year, month - 1, day);
  const monthName = date
    .toLocaleDateString('es-MX', { month: 'short' })
    .replace(/\./g, '')
    .trim();
  return { day: String(day), month: monthName, label: `${day} ${monthName}` };
}

function uniqueLabels(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.map((value) => value?.trim()).filter((value): value is string => !!value))];
}

export function shippingRouteLabels(shipping: ShippingListItem | null | undefined): {
  origin: string;
  destination: string;
} {
  if (!shipping) return { origin: 'Sucursal', destination: 'Destino' };
  const stops = [...(shipping.stops ?? [])].sort(
    (a, b) => (a.stop_sequence ?? 0) - (b.stop_sequence ?? 0),
  );
  const transfers = shipping.transfers ?? [];
  const transferOrigins = uniqueLabels(
    transfers.map((transfer) => transfer.source_branch_name || transfer.source_warehouse_name),
  );
  const transferDestinations = uniqueLabels(
    transfers.map(
      (transfer) => transfer.destination_branch_name || transfer.destination_warehouse_name,
    ),
  );
  const origin =
    shipping.origin_billing_branch_name ||
    shipping.origin?.name ||
    shipping.origin_warehouse_name ||
    transferOrigins.join(' · ') ||
    'Sucursal';
  const last = stops[stops.length - 1];
  const stopDestination = stopCustomer(last) || last?.address_summary?.trim() || '';
  const destination = stopDestination || transferDestinations.join(' · ') || 'Destino';
  return { origin, destination };
}

export function buildTripCard(shipping: ShippingListItem): TripCardModel {
  const stops = [...(shipping.stops ?? [])].sort(
    (a, b) => (a.stop_sequence ?? 0) - (b.stop_sequence ?? 0),
  );
  const names = [...new Set(stops.map((stop) => stopCustomer(stop)).filter(Boolean))];
  const route = shippingRouteLabels(shipping);
  const origin = route.origin;
  const destination = route.destination;

  const plate = shipping.truck_placa?.trim() || '';
  const truckName = shipping.truck_name?.trim() || '';
  const trailerPlate = shipping.truck_trailer_placa?.trim() || '';
  let unit = plate || truckName || 'Sin unidad';
  if (plate && truckName) unit = `${plate} · ${truckName}`;
  if (trailerPlate) unit = `${unit} · ${trailerPlate}`;

  const stopCount = stops.length;
  const clientsLabel = names.length > 1 ? `${names.length} clientes` : '';
  const customerLine = names.length === 1 ? names[0] : clientsLabel || 'Sin cliente';
  const rawFolio = shipping.short_id?.trim() || shipping.id.slice(0, 8);
  const folio = rawFolio.startsWith('#') ? rawFolio : `#${rawFolio}`;
  const kmValue = formatKmValue(shipping.distance_km);
  const distanceLabel = kmValue === '—' ? 'Sin km' : `${kmValue} km`;
  const driverLine = shipping.driver_name?.trim() || 'Sin chofer';
  const when = dateParts(shipping.shipping_date);
  const meta = [folio, clientsLabel, unit, driverLine, distanceLabel].filter(Boolean);

  return {
    id: shipping.id,
    folio,
    status: String(shipping.status || '—'),
    tone: tripTone(shipping.status),
    origin,
    destination,
    customerLine,
    clientsLabel,
    routeLine: `${origin} → ${destination}`,
    unitLine: unit,
    driverLine,
    distanceLabel,
    kmValue,
    stopsValue: String(stopCount),
    dateLabel: when.label,
    dateDay: when.day,
    dateMonth: when.month,
    metaLine: meta.join(' · '),
  };
}

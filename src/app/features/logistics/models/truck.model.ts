export type TruckStatus = 'active' | 'inactive';

export interface Truck {
  id: string;
  name: string;
  placa: string;
  serial_number?: string | null;
  anio?: string | null;
  permiso_sct?: string | null;
  numero_permiso_sct?: string | null;
  tipo_auto_transporte?: string | null;
  aseguradora_rc?: string | null;
  poliza_rc?: string | null;
  peso_bruto_vehicular?: number | null;
  carta_porte_ready?: boolean;
  carta_porte_missing?: string[];
  subtipo_remolque1?: string | null;
  placa_remolque1?: string | null;
  /** URL firmada (~15 min); null si no hay foto */
  photo?: string | null;
  status: TruckStatus;
  gps_unit_uid?: string | null;
  gps_unit_name?: string | null;
  /** Envío Creado o En Ruta que ya usa esta unidad. */
  active_shipping_id?: string | null;
  active_shipping_status?: string | null;
  active_shipping_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTruckDto {
  name: string;
  placa: string;
  serial_number?: string | null;
  anio?: string;
  permiso_sct?: string;
  numero_permiso_sct?: string;
  tipo_auto_transporte?: string;
  aseguradora_rc?: string;
  poliza_rc?: string;
  peso_bruto_vehicular?: number;
  subtipo_remolque1?: string;
  placa_remolque1?: string;
  gps_unit_uid?: string | null;
  gps_unit_name?: string | null;
}

export type UpdateTruckDto = Partial<CreateTruckDto>;

export interface TruckQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TruckStatus;
}

export interface TruckListResponse {
  data: Truck[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiEnvelope<T> {
  status?: number | string;
  message?: string;
  data: T;
}

export function truckSelectLabel(truck: Pick<Truck, 'name' | 'placa'>): string {
  const name = truck.name?.trim();
  const placa = truck.placa?.trim();
  if (name && placa) return `${name} · ${placa}`;
  return name || placa || 'Camión';
}

/** Texto cuando la unidad ya está en un envío Creado o En Ruta. */
export function truckBusyLabel(
  truck: Pick<Truck, 'active_shipping_id' | 'active_shipping_status' | 'active_shipping_date'>,
): string {
  if (!truck.active_shipping_id) return '';
  const folio = `#${truck.active_shipping_id.slice(0, 8)}`;
  const day = formatShippingDay(truck.active_shipping_date);
  const status = truck.active_shipping_status?.trim();
  const where = [folio, day, status].filter(Boolean).join(' · ');
  return `en uso en ${where}`;
}

function formatShippingDay(value: string | null | undefined): string {
  if (!value) return '';
  const [year, month, day] = value.slice(0, 10).split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
}

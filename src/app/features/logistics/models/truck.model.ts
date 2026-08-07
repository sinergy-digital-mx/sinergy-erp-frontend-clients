export type TruckStatus = 'active' | 'inactive';

export interface Truck {
  id: string;
  name: string;
  placa: string;
  anio?: string | null;
  permiso_sct?: string | null;
  numero_permiso_sct?: string | null;
  tipo_auto_transporte?: string | null;
  aseguradora_rc?: string | null;
  poliza_rc?: string | null;
  subtipo_remolque1?: string | null;
  placa_remolque1?: string | null;
  /** URL firmada (~15 min); null si no hay foto */
  photo?: string | null;
  status: TruckStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTruckDto {
  name: string;
  placa: string;
  anio?: string;
  permiso_sct?: string;
  numero_permiso_sct?: string;
  tipo_auto_transporte?: string;
  aseguradora_rc?: string;
  poliza_rc?: string;
  subtipo_remolque1?: string;
  placa_remolque1?: string;
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

/**
 * Property Model
 */
export interface Property {
  id: string;
  code: string;
  block?: string;
  lot_number?: string;
  /** Clave catastral (API: cadastral_key). Null si no está capturada. */
  cadastral_key?: string | null;
  name: string;
  description?: string;
  location?: string;
  group_id: string;
  group?: PropertyGroup;
  total_area: number;
  measurement_unit_id: string;
  measurement_unit?: MeasurementUnit;
  total_price: number;
  currency: string;
  status: PropertyStatus;
  customer?: PropertyCustomer | null;
  contracts?: PropertyContract[];
  created_at?: string;
  updated_at?: string;
}

export interface PropertyCustomerGroup {
  id: string;
  name: string;
}

export interface PropertyCustomer {
  id: number;
  name: string;
  lastname: string;
  fullName?: string;
  group_id?: string | null;
  group?: PropertyCustomerGroup | null;
}

export interface PropertyContract {
  id: string;
  status: string;
  customer?: PropertyCustomer | null;
}

export interface PropertyGroup {
  id: string;
  name: string;
  description?: string;
  location?: string;
}

export interface MeasurementUnit {
  id: string;
  name: string;
  symbol: string;
}

export type PropertyStatus = 'disponible' | 'vendido' | 'reservado' | 'cancelado';

export interface CreatePropertyDto {
  code: string;
  block?: string;
  lot_number?: string;
  cadastral_key?: string | null;
  name: string;
  description?: string;
  location?: string;
  group_id: string;
  total_area: number;
  measurement_unit_id: string;
  total_price: number;
  currency?: string;
  status?: PropertyStatus;
}

export interface UpdatePropertyDto extends Partial<CreatePropertyDto> {}

/** Filtros de listado. group_id = grupo de cliente (mismo catálogo que Clientes). */
export interface PropertyListFilters {
  group_id?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export interface PropertyStatsBucket {
  count: number;
  area?: number;
  value?: number;
}

export interface PropertyStats {
  total: PropertyStatsBucket;
  available: PropertyStatsBucket;
  active_in_payment: {
    count: number;
    remaining_balance: number;
  };
  reserved: { count: number };
  sold: { count: number };
  avg_price_per_m2: number;
}

export const EMPTY_PROPERTY_STATS: PropertyStats = {
  total: { count: 0, area: 0, value: 0 },
  available: { count: 0, area: 0, value: 0 },
  active_in_payment: { count: 0, remaining_balance: 0 },
  reserved: { count: 0 },
  sold: { count: 0 },
  avg_price_per_m2: 0,
};

/** Vacío o solo espacios → null (el API no guarda string vacío). */
export function normalizeCadastralKey(value?: string | null): string | null {
  const trimmed = String(value ?? '').trim();
  return trimmed || null;
}

/** Texto para listados y detalle. Null / vacío → —. */
export function displayCadastralKey(value?: string | null): string {
  return value?.trim() || '—';
}

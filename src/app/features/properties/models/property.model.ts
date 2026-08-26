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
  contracts?: PropertyContract[];
  created_at?: string;
  updated_at?: string;
}

export interface PropertyContract {
  id: string;
  status: string;
  customer: {
    id: number;
    name: string;
    lastname: string;
  };
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

/** Vacío o solo espacios → null (el API no guarda string vacío). */
export function normalizeCadastralKey(value?: string | null): string | null {
  const trimmed = String(value ?? '').trim();
  return trimmed || null;
}

/** Texto para listados y detalle. Null / vacío → —. */
export function displayCadastralKey(value?: string | null): string {
  return value?.trim() || '—';
}

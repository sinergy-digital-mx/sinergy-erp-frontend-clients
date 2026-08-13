export interface BranchWarehouse {
  id?: string;
  name: string;
  code?: string;
  prefix?: string | null;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  status?: 'active' | 'inactive';
  metadata?: Record<string, unknown> | null;
}

export interface Branch {
  id: string;
  fiscal_configuration_id: string;
  name?: string;
  code?: string;
  prefix?: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status: number;
  display_name: string;
  warehouses_count?: number;
  warehouses?: BranchWarehouse[];
  created_at: string;
  updated_at: string;
}

export interface CreateBranchDto {
  name: string;
  prefix?: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status?: number;
  warehouses?: BranchWarehouse[];
}

export interface UpdateBranchDto {
  name?: string;
  prefix?: string | null;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status?: number;
  warehouses?: BranchWarehouse[];
}

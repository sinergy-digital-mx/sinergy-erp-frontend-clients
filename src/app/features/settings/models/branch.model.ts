export interface BranchWarehouse {
  id?: string;
  name: string;
  code?: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  status?: 'active' | 'inactive';
}

export interface Branch {
  id: string;
  fiscal_configuration_id: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string | null;
  status: number;
  display_name: string;
  warehouses_count?: number;
  warehouses?: BranchWarehouse[];
  created_at: string;
  updated_at: string;
}

export interface CreateBranchDto {
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string | null;
  status?: number;
  warehouses?: BranchWarehouse[];
}

export interface UpdateBranchDto {
  code?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string | null;
  status?: number;
  warehouses?: BranchWarehouse[];
}

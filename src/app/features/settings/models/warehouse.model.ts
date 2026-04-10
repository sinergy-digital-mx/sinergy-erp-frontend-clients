export interface Warehouse {
  id: string;
  tenant_id: string;
  name: string;
  code: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  status: 'active' | 'inactive';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateWarehouseDto {
  name: string;
  code?: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  billing_branch_id?: string;
  status?: 'active' | 'inactive';
  metadata?: Record<string, any>;
}

export interface UpdateWarehouseDto extends Partial<CreateWarehouseDto> {}

export interface WarehouseListResponse {
  data: Warehouse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface WarehouseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  state?: string;
  country?: string;
  code?: string;
}

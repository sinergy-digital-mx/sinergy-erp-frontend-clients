export interface Vendor {
  id: string;
  tenant_id: string;
  name: string;
  company_name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  razon_social: string;
  rfc: string;
  persona_type: 'Persona Física' | 'Persona Moral';
  status: 'active' | 'inactive';
  credit_days?: number;
  credit_limit?: string | number;
  created_at: string;
  updated_at: string;
}

export interface CreateVendorDto {
  name: string;
  company_name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  razon_social: string;
  rfc: string;
  persona_type: 'Persona Física' | 'Persona Moral';
  status?: 'active' | 'inactive';
  credit_days?: number;
  credit_limit?: number;
}

export interface UpdateVendorDto extends Partial<CreateVendorDto> {}

export interface VendorListResponse {
  data: Vendor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface VendorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  state?: string;
  country?: string;
}

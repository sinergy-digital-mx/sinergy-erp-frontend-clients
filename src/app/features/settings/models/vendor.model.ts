export type VendorType = 'NATIONAL' | 'INTERNATIONAL';

export type VendorPersonaType = 'Persona Física' | 'Persona Moral';

export interface Vendor {
  id: string;
  tenant_id: string;
  vendor_type: VendorType;
  name: string;
  company_name?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  /** Nacional (México) */
  razon_social?: string;
  rfc?: string;
  persona_type?: VendorPersonaType;
  /** Internacional */
  tax_id?: string;
  legal_name?: string;
  /** Bancario */
  bank_name?: string;
  bank_account_holder?: string;
  bank_account_number?: string;
  bank_clabe?: string;
  bank_swift_bic?: string;
  bank_iban?: string;
  bank_currency?: string;
  status: 'active' | 'inactive';
  credit_days?: number;
  credit_limit?: string | number;
  created_at: string;
  updated_at: string;
}

export interface CreateVendorDto {
  vendor_type: VendorType;
  name: string;
  company_name?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  razon_social?: string;
  rfc?: string;
  persona_type?: VendorPersonaType;
  tax_id?: string;
  legal_name?: string;
  bank_name?: string;
  bank_account_holder?: string;
  bank_account_number?: string;
  bank_clabe?: string;
  bank_swift_bic?: string;
  bank_iban?: string;
  bank_currency?: string;
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
  vendor_type?: VendorType;
}

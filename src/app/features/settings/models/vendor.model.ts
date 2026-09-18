export type VendorType = 'NATIONAL' | 'INTERNATIONAL';

export type VendorPersonaType = 'Persona Física' | 'Persona Moral';

export type VendorMatchReason = 'rfc' | 'tax_id' | 'name' | 'company' | 'bank';

export interface VendorSimilarMatch {
  id: string;
  name: string;
  company_name?: string | null;
  rfc?: string | null;
  tax_id?: string | null;
  match_reasons: VendorMatchReason[];
  score: number;
}

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
  /** Internacional (opcional) */
  tax_id?: string | null;
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
  profile_completeness?: number;
  looks_similar?: boolean;
  similar_vendors?: VendorSimilarMatch[];
}

export interface VendorDuplicatesResponse {
  found: boolean;
  matches: VendorSimilarMatch[];
}

export interface CheckVendorDuplicatesDto {
  name?: string;
  company_name?: string;
  razon_social?: string;
  legal_name?: string;
  rfc?: string;
  tax_id?: string;
  bank_clabe?: string;
  bank_iban?: string;
  bank_account_number?: string;
}

export interface DeleteVendorResult {
  action: 'deleted' | 'merged' | 'deactivated';
  vendor_id: string;
  merged_into?: { id: string; name: string };
  purchase_orders_reassigned: number;
  message: string;
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
  tax_id?: string | null;
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
  similar_only?: boolean;
}

/** Filtros del listado reutilizados en GET /tenant/vendors/export/excel */
export interface VendorsExportFilters {
  search?: string;
  status?: 'active' | 'inactive';
  vendor_type?: VendorType;
  state?: string;
  country?: string;
}

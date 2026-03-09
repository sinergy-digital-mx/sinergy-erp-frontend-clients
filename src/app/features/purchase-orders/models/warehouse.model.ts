/**
 * Warehouse entity (from external module)
 */
export interface Warehouse {
  id: string;
  tenant_id?: string;
  name: string;
  code: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  address?: string;
  type?: string;
  status?: string;
  fiscal_configuration_id?: string | null;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
}

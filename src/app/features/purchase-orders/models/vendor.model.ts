/**
 * Vendor entity (from external module)
 */
export interface Vendor {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  rfc?: string;
}

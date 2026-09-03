import { PosUserSummary } from '../../sales-orders/models/sales-order.model';

export type QuotationStatus = 'Creada' | 'Convertida' | 'Cancelada';
export type QuotationType = 'POS' | 'MANUAL';

export interface QuotationCustomer {
  id?: number;
  name?: string;
  lastname?: string;
  company_name?: string;
  display_name?: string;
  email?: string;
}

export interface QuotationLineItem {
  id?: string;
  product_id: string;
  product_uom_id: string;
  quantity: number | string;
  unit_price: number | string;
  discount_percentage?: number | string;
  line_subtotal?: number;
  line_discount_amount?: number;
  iva_percentage?: number | string;
  ieps_percentage?: number | string;
  uom_name?: string;
  product?: { id: string; name: string; sku?: string };
  applied_product_discount?: { id: string; name?: string } | null;
}

export interface QuotationDocument {
  id: string;
  document_type_name: string;
  document_name?: string;
  path: string;
  document_language?: string;
  uploaded_at?: string;
}

export interface Quotation {
  id: string;
  folio: string;
  quotation_type: QuotationType;
  general_status: QuotationStatus;
  total?: number | string;
  subtotal?: number | string;
  iva_total?: number | string;
  ieps_total?: number | string;
  discount_total?: number | string;
  global_discount_amount?: number | string;
  notes?: string | null;
  created_at?: string;
  expected_delivery_date?: string;
  razon_social?: string | null;
  sucursal?: string | null;
  fiscal_razon_social?: string | null;
  customer?: QuotationCustomer;
  customer_display_name?: string;
  customer_summary?: QuotationCustomer;
  fiscal_configuration?: { id: string; razon_social?: string; rfc?: string } | null;
  billing_branch?: {
    id: string;
    code?: string;
    city?: string;
    state?: string;
  } | null;
  can_convert?: boolean;
  can_cancel?: boolean;
  can_edit?: boolean;
  can_send?: boolean;
  customer_email?: string | null;
  converted_to_sales_order_id?: string | null;
  seller_user?: PosUserSummary | null;
  assigned_seller_user?: PosUserSummary | null;
  terminal_user?: PosUserSummary | null;
}

export interface QuotationEmail {
  id: string;
  to_email: string;
  cc?: string[];
  bcc?: string[];
  subject?: string;
  message?: string | null;
  sent_at?: string;
  sent_by?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    display_name?: string | null;
  } | null;
}

export interface SendQuotationEmailPayload {
  to_email?: string;
  cc?: string[];
  bcc?: string[];
  subject?: string;
  message?: string;
}

export interface QuotationDetailPayload {
  header: Quotation;
  line_items: QuotationLineItem[];
  documents: QuotationDocument[];
  emails?: QuotationEmail[];
  discount_summary?: {
    line_discount_total?: number;
    global_discount_amount?: number;
    discount_total?: number;
  };
}

export interface QuotationFilters {
  search?: string;
  general_status?: string | string[];
  quotation_type?: QuotationType;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  created_from?: string;
  created_to?: string;
}

export interface QuotationFormData {
  fiscal_configuration_id: string;
  billing_branch_id?: string;
  warehouse_id?: string;
  customer_id?: number | string;
  expected_delivery_date: string;
  quotation_type?: QuotationType;
  seller_user_id?: string;
  notes?: string;
  global_discount_id?: string;
  line_items: Array<{
    product_id: string;
    product_uom_id: string;
    quantity: number;
    unit_price: number;
    discount_percentage?: number;
    product_discount_id?: string;
    iva_percentage?: number;
    ieps_percentage?: number;
  }>;
}

export interface ConvertQuotationResponse {
  quotation: { header?: Quotation } | QuotationDetailPayload;
  sales_order: {
    id: string;
    folio: string;
    general_status: string;
    payment_status?: string;
    sales_order_type?: string;
    total?: number | string;
  };
}

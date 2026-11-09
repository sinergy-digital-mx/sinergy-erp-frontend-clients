export interface GlobalInvoiceBranchOption {
  id: string;
  label: string;
  fiscal_configuration_id: string;
}

export interface GlobalInvoicePaymentLine {
  method: string;
  label: string;
  amount_mxn: number;
  amount_usd: number;
}

export interface GlobalInvoiceOrderRow {
  id: string;
  folio: string;
  created_at: string;
  customer_name: string;
  company_name: string | null;
  branch_label: string | null;
  general_status: string;
  payment_status: string;
  currency: string;
  subtotal: number;
  iva_total: number;
  ieps_total: number;
  discount_total: number;
  total: number;
  payment_method: string | null;
  payment_method_label: string | null;
  payment_breakdown_label: string | null;
  payment_lines: GlobalInvoicePaymentLine[];
}

export interface GlobalInvoiceCard {
  id: string;
  status: 'pending' | 'active' | 'cancelled';
  electronic_invoice_id: string | null;
  series: string | null;
  folio: string | null;
  uuid: string | null;
  subtotal: number;
  total: number;
  currency: string;
  stamp_status: string | null;
  sat_status: string | null;
  can_cancel: boolean;
  process_folio: string | null;
}

export interface GlobalInvoicePolicy {
  auto_enabled: boolean;
  block_after_month: boolean;
  hour: number | null;
  timezone: string;
  timezone_label: string;
  calendar_month: string;
}

export interface GlobalInvoicePage {
  month: string;
  period_label: string;
  branches: GlobalInvoiceBranchOption[];
  billing_branch_id: string | null;
  fiscal_configuration_id: string | null;
  invoice: GlobalInvoiceCard | null;
  cancelled_invoice: GlobalInvoiceCard | null;
  orders: GlobalInvoiceOrderRow[];
  orders_count: number;
  orders_total: number | null;
  currency: string | null;
  can_generate: boolean;
  blocked_reason: string | null;
  policy: GlobalInvoicePolicy | null;
}

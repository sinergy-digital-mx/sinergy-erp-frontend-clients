export type ServiceSubscriptionStatus = 'active' | 'completed' | 'cancelled';
export type ServiceSubscriptionPeriodStatus = 'pending' | 'linked' | 'invoiced' | 'skipped';

export interface ServiceSubscriptionListItem {
  id: string;
  title: string;
  customer_id: number;
  customer_name: string;
  monthly_amount: number;
  iva_percentage: number;
  start_month: string;
  end_month: string;
  start_label: string;
  end_label: string;
  billing_day: number;
  status: ServiceSubscriptionStatus;
  months_total: number;
  months_covered: number;
}

export interface ServiceSubscriptionPeriod {
  id: string;
  period_month: string;
  label: string;
  amount: number;
  status: ServiceSubscriptionPeriodStatus;
  sales_order_id: string | null;
  sales_order_folio: string | null;
  electronic_invoice_id: string | null;
  linked_manually: boolean;
  invoice_error: string | null;
}

export interface ServiceSubscriptionDetail extends ServiceSubscriptionListItem {
  fiscal_configuration_id: string;
  billing_branch_id: string;
  product_id: string;
  product_uom_id: string;
  uso_cfdi: string;
  forma_pago: string;
  metodo_pago: string;
  regimen_fiscal_receptor: string;
  notes: string | null;
  renewed_from_id: string | null;
  periods: ServiceSubscriptionPeriod[];
}

export interface CreateServiceSubscriptionPayload {
  customer_id: number;
  title: string;
  monthly_amount: number;
  iva_percentage: number;
  fiscal_configuration_id: string;
  billing_branch_id: string;
  product_id: string;
  product_uom_id: string;
  start_month: string;
  end_month: string;
  billing_day: number;
  uso_cfdi: string;
  forma_pago: string;
  metodo_pago: string;
  regimen_fiscal_receptor: string;
  notes?: string;
}

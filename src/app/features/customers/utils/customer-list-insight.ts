export const CUSTOMER_LIST_INSIGHTS = [
  'with_orders',
  'without_orders',
  'fiscal_ready',
  'fiscal_not_ready',
  'active',
  'inactive',
  'with_email',
  'without_email',
] as const;

export type CustomerListInsight = (typeof CUSTOMER_LIST_INSIGHTS)[number];

const LABELS: Record<CustomerListInsight, string> = {
  with_orders: 'Con órdenes',
  without_orders: 'Sin órdenes',
  fiscal_ready: 'Listos para facturar',
  fiscal_not_ready: 'Sin datos fiscales',
  active: 'Activos',
  inactive: 'Inactivos',
  with_email: 'Con correo',
  without_email: 'Sin correo',
};

export function isCustomerListInsight(value: string | null | undefined): value is CustomerListInsight {
  return !!value && (CUSTOMER_LIST_INSIGHTS as readonly string[]).includes(value);
}

export function customerInsightLabel(insight: CustomerListInsight): string {
  return LABELS[insight];
}

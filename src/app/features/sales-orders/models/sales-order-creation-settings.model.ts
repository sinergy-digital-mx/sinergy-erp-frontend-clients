export const SALES_ORDER_CREATION_FIELD_KEYS = [
  'fiscal_configuration_id',
  'customer',
  'billing_branch_id',
  'expected_delivery_date',
  'sale_scope',
  'currency',
  'requires_selection_assembly',
  'for_shipping',
  'notes',
] as const;

export type SalesOrderCreationFieldKey = (typeof SALES_ORDER_CREATION_FIELD_KEYS)[number];

export interface SalesOrderCreationFieldConfig {
  visible: boolean;
  required: boolean;
  default_value: string | boolean | null;
  locked: boolean;
}

export type SalesOrderCreationFields = Record<
  SalesOrderCreationFieldKey,
  SalesOrderCreationFieldConfig
>;

export interface SalesOrderCreationSettings {
  fields: SalesOrderCreationFields;
}

export function defaultSalesOrderCreationSettings(): SalesOrderCreationSettings {
  return {
    fields: {
      fiscal_configuration_id: { visible: true, required: true, default_value: 'user_primary', locked: true },
      customer: { visible: true, required: true, default_value: null, locked: true },
      billing_branch_id: { visible: true, required: true, default_value: 'user_primary', locked: false },
      expected_delivery_date: { visible: true, required: true, default_value: 'today', locked: false },
      sale_scope: { visible: true, required: true, default_value: 'inventory', locked: false },
      currency: { visible: true, required: true, default_value: 'MXN', locked: false },
      requires_selection_assembly: { visible: true, required: false, default_value: false, locked: false },
      for_shipping: { visible: true, required: false, default_value: false, locked: false },
      notes: { visible: true, required: false, default_value: null, locked: false },
    },
  };
}

export const SALES_ORDER_CREATION_FIELD_KEYS = [
  'fiscal_configuration_id',
  'customer',
  'billing_branch_id',
  'expected_delivery_date',
  'sale_scope',
  'currency',
  'requires_selection_assembly',
  'for_shipping',
  'estimated_delivery_date',
  'route_id',
  'notes',
] as const;

export type SalesOrderCreationFieldKey = (typeof SALES_ORDER_CREATION_FIELD_KEYS)[number];

export interface SalesOrderCreationFieldConfig {
  visible: boolean;
  required: boolean;
  default_value: string | boolean | null;
  locked: boolean;
  only_when_shipping?: boolean;
}

export interface LogisticsRouteOption {
  id: string;
  name: string;
  code: string;
}

export type SalesOrderCreationFields = Record<
  SalesOrderCreationFieldKey,
  SalesOrderCreationFieldConfig
>;

export interface SalesOrderCreationSettings {
  fields: SalesOrderCreationFields;
  routes_enabled: boolean;
  routes: LogisticsRouteOption[];
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
      estimated_delivery_date: {
        visible: true,
        required: false,
        default_value: 'today',
        locked: false,
        only_when_shipping: true,
      },
      route_id: {
        visible: false,
        required: false,
        default_value: null,
        locked: false,
        only_when_shipping: true,
      },
      notes: { visible: true, required: false, default_value: null, locked: false },
    },
    routes_enabled: false,
    routes: [],
  };
}

export function shippingIsOn(value: unknown): boolean {
  return value === true;
}

export function showEstimatedDeliveryDate(
  fields: SalesOrderCreationFields,
  shipping: boolean,
): boolean {
  const field = fields.estimated_delivery_date;
  if (!field?.visible) return false;
  return field.only_when_shipping === false || shipping;
}

export function estimatedDateRequired(
  fields: SalesOrderCreationFields,
  shipping: boolean,
): boolean {
  return showEstimatedDeliveryDate(fields, shipping) && !!fields.estimated_delivery_date.required;
}

export function showOrderRoute(
  fields: SalesOrderCreationFields,
  routesEnabled: boolean,
  shipping: boolean,
): boolean {
  if (!routesEnabled || !fields.route_id?.visible) return false;
  return fields.route_id.only_when_shipping === false || shipping;
}

export function orderRouteRequired(
  fields: SalesOrderCreationFields,
  routesEnabled: boolean,
  shipping: boolean,
): boolean {
  return showOrderRoute(fields, routesEnabled, shipping) && !!fields.route_id.required;
}

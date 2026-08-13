/**
 * Central Permissions Catalog
 *
 * Re-exports all module permission catalogs for easy access.
 * Import from here to access any module's permissions.
 *
 * Example:
 * import { PERMISSIONS } from '@core/config/permissions.config';
 *
 * canCreate = authService.hasPermission(PERMISSIONS.customers.create);
 */

export { CONTRACT_PERMISSIONS } from '../../features/contracts/config/permissions.config';
export { CUSTOMER_PERMISSIONS } from '../../features/customers/config/permissions.config';
export { LEAD_PERMISSIONS } from '../../features/leads/config/permissions.config';
export { PROPERTY_PERMISSIONS } from '../../features/properties/config/permissions.config';
export { SETTINGS_PERMISSIONS } from '../../features/settings/config/permissions.config';
export { INVENTORY_PERMISSIONS } from '../../features/inventory/config/permissions.config';
export { MARKETING_PERMISSIONS } from '../../features/marketing/config/permissions.config';
export { POS_PERMISSIONS } from '../../features/pos/config/permissions.config';
export { PURCHASE_ORDER_PERMISSIONS } from '../../features/purchase-orders/config/permissions.config';
export { SALES_ORDER_PERMISSIONS } from '../../features/sales-orders/config/permissions.config';
export { DIVINO_DASHBOARD_PERMISSIONS } from '../../features/divino-dashboard/config/permissions.config';
export { DIVINO_RESERVATION_FORMAT_PERMISSIONS } from '../../features/divino-reservation-formats/config/permissions.config';
export { ACCOUNTING_PERMISSIONS } from '../../features/accounting/config/permissions.config';
export { GOAL_PERMISSIONS } from '../../features/goals/config/permissions.config';
export { GLOBAL_DISCOUNT_PERMISSIONS } from '../../features/global-discounts/config/permissions.config';
export { EMPLOYEE_PERMISSIONS } from '../../features/employees/config/permissions.config';
export {
  LOGISTICS_PERMISSIONS,
  TRUCK_PERMISSIONS,
  SHIPPING_PERMISSIONS,
} from '../../features/logistics/config/permissions.config';
export { WAREHOUSE_CONTROL_PERMISSIONS } from '../../features/warehouse-control/config/permissions.config';
export { MADERERIA_INVENTORY_IMPORT_PERMISSIONS } from '../../features/madereria-inventory-import/config/permissions.config';

/**
 * Grouped permissions for easier access
 */
import { CONTRACT_PERMISSIONS } from '../../features/contracts/config/permissions.config';
import { CUSTOMER_PERMISSIONS } from '../../features/customers/config/permissions.config';
import { LEAD_PERMISSIONS } from '../../features/leads/config/permissions.config';
import { PROPERTY_PERMISSIONS } from '../../features/properties/config/permissions.config';
import { SETTINGS_PERMISSIONS } from '../../features/settings/config/permissions.config';
import { INVENTORY_PERMISSIONS } from '../../features/inventory/config/permissions.config';
import { MARKETING_PERMISSIONS } from '../../features/marketing/config/permissions.config';
import { POS_PERMISSIONS } from '../../features/pos/config/permissions.config';
import { PURCHASE_ORDER_PERMISSIONS } from '../../features/purchase-orders/config/permissions.config';
import { SALES_ORDER_PERMISSIONS } from '../../features/sales-orders/config/permissions.config';
import { DIVINO_DASHBOARD_PERMISSIONS } from '../../features/divino-dashboard/config/permissions.config';
import { DIVINO_RESERVATION_FORMAT_PERMISSIONS } from '../../features/divino-reservation-formats/config/permissions.config';
import { ACCOUNTING_PERMISSIONS } from '../../features/accounting/config/permissions.config';
import { GOAL_PERMISSIONS } from '../../features/goals/config/permissions.config';
import { GLOBAL_DISCOUNT_PERMISSIONS } from '../../features/global-discounts/config/permissions.config';
import { EMPLOYEE_PERMISSIONS } from '../../features/employees/config/permissions.config';
import {
  LOGISTICS_PERMISSIONS,
  SHIPPING_PERMISSIONS,
  TRUCK_PERMISSIONS,
} from '../../features/logistics/config/permissions.config';
import { WAREHOUSE_CONTROL_PERMISSIONS } from '../../features/warehouse-control/config/permissions.config';
import { MADERERIA_INVENTORY_IMPORT_PERMISSIONS } from '../../features/madereria-inventory-import/config/permissions.config';

export const PERMISSIONS = {
  contracts: CONTRACT_PERMISSIONS,
  customers: CUSTOMER_PERMISSIONS,
  leads: LEAD_PERMISSIONS,
  properties: PROPERTY_PERMISSIONS,
  settings: SETTINGS_PERMISSIONS,
  inventory: INVENTORY_PERMISSIONS,
  marketing: MARKETING_PERMISSIONS,
  pos: POS_PERMISSIONS,
  purchaseOrders: PURCHASE_ORDER_PERMISSIONS,
  salesOrders: SALES_ORDER_PERMISSIONS,
  divinoDashboard: DIVINO_DASHBOARD_PERMISSIONS,
  divinoReservationFormats: DIVINO_RESERVATION_FORMAT_PERMISSIONS,
  accounting: ACCOUNTING_PERMISSIONS,
  goals: GOAL_PERMISSIONS,
  globalDiscounts: GLOBAL_DISCOUNT_PERMISSIONS,
  employees: EMPLOYEE_PERMISSIONS,
  logistics: LOGISTICS_PERMISSIONS,
  trucks: TRUCK_PERMISSIONS,
  shippings: SHIPPING_PERMISSIONS,
  warehouseControl: WAREHOUSE_CONTROL_PERMISSIONS,
  madereriaInventoryImport: MADERERIA_INVENTORY_IMPORT_PERMISSIONS,
} as const;

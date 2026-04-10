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
  salesOrders: SALES_ORDER_PERMISSIONS
} as const;

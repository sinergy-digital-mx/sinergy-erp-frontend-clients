/**
 * Warehouse Control (Mesa de Control).
 * Entity en RBAC: WarehouseControl (se normaliza a warehousecontrol).
 */
export const WAREHOUSE_CONTROL_PERMISSIONS = {
  viewMenu: 'WarehouseControl:ViewMenu',
  read: 'WarehouseControl:Read',
  create: 'WarehouseControl:Create',
  update: 'WarehouseControl:Update',
  corroborate: 'WarehouseControl:Update',
} as const;

export type WarehouseControlPermission =
  (typeof WAREHOUSE_CONTROL_PERMISSIONS)[keyof typeof WAREHOUSE_CONTROL_PERMISSIONS];

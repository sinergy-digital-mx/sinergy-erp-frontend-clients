/**
 * Warehouse Control module permissions.
 * Entity en RBAC: WarehouseControl (se normaliza a warehousecontrol).
 */
export const WAREHOUSE_CONTROL_PERMISSIONS = {
  viewMenu: 'WarehouseControl:ViewMenu',
  read: 'WarehouseControl:Read',
  /** Corroborar / confirmar picking */
  corroborate: 'WarehouseControl:Update',
  update: 'WarehouseControl:Update',
} as const;

export type WarehouseControlPermission =
  (typeof WAREHOUSE_CONTROL_PERMISSIONS)[keyof typeof WAREHOUSE_CONTROL_PERMISSIONS];

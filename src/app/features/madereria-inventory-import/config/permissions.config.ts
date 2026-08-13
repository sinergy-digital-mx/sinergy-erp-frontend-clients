/**
 * Permisos del módulo Importación de inventario (Madereria Zona Norte).
 * Solo está habilitado en esa organización.
 */
export const MADERERIA_INVENTORY_IMPORT_PERMISSIONS = {
  viewMenu: 'madereria_inventory_import:ViewMenu',
  read: 'madereria_inventory_import:Read',
  create: 'madereria_inventory_import:Create',
} as const;

export const MADERERIA_INVENTORY_IMPORT_MODULE_CODE = 'madereria_inventory_import';

export type MadereriaInventoryImportPermission =
  (typeof MADERERIA_INVENTORY_IMPORT_PERMISSIONS)[keyof typeof MADERERIA_INVENTORY_IMPORT_PERMISSIONS];

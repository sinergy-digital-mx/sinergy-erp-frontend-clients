/**
 * Inventory Module Permissions Catalog
 * 
 * Defines all permissions required for inventory-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const INVENTORY_PERMISSIONS = {
  // Module access
  viewMenu: 'inventory:ViewMenu',
  
  // Views
  viewList: 'inventory:Read',
  viewDetail: 'inventory:Read',
  viewStats: 'inventory:Read',
  viewBatches: 'inventory:Read',
  
  // CRUD operations
  create: 'inventory:Create',
  update: 'inventory:Update',
  delete: 'inventory:Delete',
  
  // Special actions
  export: 'inventory:Export',
  import: 'inventory:Import',
  adjustStock: 'inventory:AdjustStock',
  transfer: 'inventory:Transfer',
  
  // Batch management
  createBatch: 'inventory:CreateBatch',
  updateBatch: 'inventory:UpdateBatch',
  deleteBatch: 'inventory:DeleteBatch',
  
  // Warehouse operations
  viewWarehouse: 'inventory:Read',
  manageWarehouse: 'inventory:ManageWarehouse'
} as const;

/**
 * Helper type for permission values
 */
export type InventoryPermission = typeof INVENTORY_PERMISSIONS[keyof typeof INVENTORY_PERMISSIONS];

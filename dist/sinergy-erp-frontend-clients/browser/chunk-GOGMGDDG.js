// src/app/features/inventory/config/permissions.config.ts
var INVENTORY_PERMISSIONS = {
  // Module access
  viewMenu: "inventory:ViewMenu",
  // Views
  viewList: "inventory:Read",
  viewDetail: "inventory:Read",
  viewStats: "inventory:Read",
  viewBatches: "inventory:Read",
  // CRUD operations
  create: "inventory:Create",
  update: "inventory:Update",
  delete: "inventory:Delete",
  // Special actions
  export: "inventory:Export",
  import: "inventory:Import",
  adjustStock: "inventory:AdjustStock",
  transfer: "inventory:Transfer",
  // Batch management
  createBatch: "inventory:CreateBatch",
  updateBatch: "inventory:UpdateBatch",
  deleteBatch: "inventory:DeleteBatch",
  // Warehouse operations
  viewWarehouse: "inventory:Read",
  manageWarehouse: "inventory:ManageWarehouse"
};

export {
  INVENTORY_PERMISSIONS
};
//# sourceMappingURL=chunk-GOGMGDDG.js.map

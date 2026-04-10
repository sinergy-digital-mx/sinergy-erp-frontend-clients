// src/app/features/properties/config/permissions.config.ts
var PROPERTY_PERMISSIONS = {
  // Module access
  viewMenu: "properties:ViewMenu",
  // Views
  viewList: "properties:Read",
  viewDetail: "properties:Read",
  viewStats: "properties:Read",
  // CRUD operations
  create: "properties:Create",
  update: "properties:Update",
  delete: "properties:Delete",
  // Special actions
  export: "properties:Export",
  import: "properties:Import",
  changeStatus: "properties:ChangeStatus",
  // Bulk operations
  bulkEdit: ["properties:Update", "properties:Read"],
  bulkDelete: ["properties:Delete", "properties:Read"]
};

export {
  PROPERTY_PERMISSIONS
};
//# sourceMappingURL=chunk-3BJZNAHA.js.map

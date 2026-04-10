// src/app/features/customers/config/permissions.config.ts
var CUSTOMER_PERMISSIONS = {
  // Module access
  viewMenu: "customers:ViewMenu",
  // Views
  viewList: "customers:Read",
  viewDetail: "customers:Read",
  viewStats: "customers:Read",
  // CRUD operations
  create: "customers:Create",
  update: "customers:Update",
  delete: "customers:Delete",
  // Special actions
  export: "customers:Export",
  import: "customers:Import",
  assignGroup: "customers:AssignGroup",
  // Document management
  uploadDocument: "customers:UploadDocument",
  deleteDocument: "customers:DeleteDocument",
  downloadDocument: "customers:Read",
  // Bulk operations (require multiple permissions)
  bulkEdit: ["customers:Update", "customers:Read"],
  bulkDelete: ["customers:Delete", "customers:Read"]
};

export {
  CUSTOMER_PERMISSIONS
};
//# sourceMappingURL=chunk-4VG5IEU6.js.map

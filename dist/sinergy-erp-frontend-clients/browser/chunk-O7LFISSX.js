// src/app/features/purchase-orders/config/permissions.config.ts
var PURCHASE_ORDER_PERMISSIONS = {
  // Module access
  viewMenu: "purchase_orders:ViewMenu",
  // Views
  viewList: "purchase_orders:Read",
  viewDetail: "purchase_orders:Read",
  viewStats: "purchase_orders:Read",
  // CRUD operations
  create: "purchase_orders:Create",
  update: "purchase_orders:Update",
  delete: "purchase_orders:Delete",
  // Special actions
  export: "purchase_orders:Export",
  approve: "purchase_orders:Approve",
  reject: "purchase_orders:Reject",
  receive: "purchase_orders:Receive",
  cancel: "purchase_orders:Cancel",
  // Document management
  uploadDocument: "purchase_orders:UploadDocument",
  deleteDocument: "purchase_orders:DeleteDocument",
  // Bulk operations
  bulkApprove: ["purchase_orders:Approve", "purchase_orders:Read"],
  bulkCancel: ["purchase_orders:Cancel", "purchase_orders:Read"]
};

export {
  PURCHASE_ORDER_PERMISSIONS
};
//# sourceMappingURL=chunk-O7LFISSX.js.map

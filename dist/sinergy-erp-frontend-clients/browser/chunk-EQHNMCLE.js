// src/app/features/leads/config/permissions.config.ts
var LEAD_PERMISSIONS = {
  // Module access
  viewMenu: "leads:ViewMenu",
  // Views
  viewList: "leads:Read",
  viewDetail: "leads:Read",
  viewStats: "leads:Read",
  // CRUD operations
  create: "leads:Create",
  update: "leads:Update",
  delete: "leads:Delete",
  // Special actions
  export: "leads:Export",
  import: "leads:Import",
  assignGroup: "leads:AssignGroup",
  convertToCustomer: "leads:ConvertToCustomer",
  // Communication
  sendEmail: "leads:SendEmail",
  viewEmailHistory: "leads:Read",
  // Activity management
  viewActivities: "leads:Read",
  createActivity: "leads:CreateActivity",
  // Address management
  viewAddress: "leads:Read",
  updateAddress: "leads:UpdateAddress",
  // Bulk operations
  bulkEdit: ["leads:Update", "leads:Read"],
  bulkDelete: ["leads:Delete", "leads:Read"],
  bulkAssignGroup: ["leads:AssignGroup", "leads:Read"]
};

export {
  LEAD_PERMISSIONS
};
//# sourceMappingURL=chunk-EQHNMCLE.js.map

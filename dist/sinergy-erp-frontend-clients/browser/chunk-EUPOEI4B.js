// src/app/features/contracts/config/permissions.config.ts
var CONTRACT_PERMISSIONS = {
  // Module access
  viewMenu: "contracts:ViewMenu",
  // Views
  viewList: "contracts:Read",
  viewDetail: "contracts:Read",
  viewStats: "contracts:Read",
  // CRUD operations
  create: "contracts:Create",
  update: "contracts:Update",
  delete: "contracts:Delete",
  // Special actions
  export: "contracts:Export",
  downloadStatement: "contracts:DownloadStatement",
  // Payment management
  viewPayments: "contracts:Read",
  generatePayments: "contracts:GeneratePayments",
  registerPayment: "contracts:RegisterPayment",
  cancelPayment: "contracts:CancelPayment",
  deletePayment: "contracts:DeletePayment",
  editPayment: "contracts:EditPayment",
  resetPayments: "contracts:ResetPayments",
  // HOA management
  generateHOAPayments: "contracts:GenerateHOAPayments",
  // Document management
  uploadDocument: "contracts:UploadDocument",
  deleteDocument: "contracts:DeleteDocument",
  downloadDocument: "contracts:Read",
  // Down payment management
  viewDownPayments: "contracts:Read",
  manageDownPayments: "contracts:ManageDownPayments"
};

export {
  CONTRACT_PERMISSIONS
};
//# sourceMappingURL=chunk-EUPOEI4B.js.map

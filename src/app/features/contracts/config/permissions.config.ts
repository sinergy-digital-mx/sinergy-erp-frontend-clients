/**
 * Contracts Module Permissions Catalog
 * 
 * Defines all permissions required for contract-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const CONTRACT_PERMISSIONS = {
  // Module access
  viewMenu: 'contracts:ViewMenu',
  
  // Views
  viewList: 'contracts:Read',
  viewDetail: 'contracts:Read',
  viewStats: 'contracts:Read',
  
  // CRUD operations
  create: 'contracts:Create',
  update: 'contracts:Update',
  delete: 'contracts:Delete',
  
  // Special actions
  export: 'contracts:Export',
  downloadStatement: 'contracts:DownloadStatement',
  
  // Payment management
  viewPayments: 'contracts:Read',
  generatePayments: 'contracts:GeneratePayments',
  registerPayment: 'contracts:RegisterPayment',
  cancelPayment: 'contracts:CancelPayment',
  deletePayment: 'contracts:DeletePayment',
  editPayment: 'contracts:EditPayment',
  resetPayments: 'contracts:ResetPayments',
  
  // HOA management
  generateHOAPayments: 'contracts:GenerateHOAPayments',
  
  // Document management
  uploadDocument: 'contracts:UploadDocument',
  deleteDocument: 'contracts:DeleteDocument',
  downloadDocument: 'contracts:Read',
  
  // Down payment management
  viewDownPayments: 'contracts:Read',
  manageDownPayments: 'contracts:ManageDownPayments'
} as const;

/**
 * Helper type for permission values
 */
export type ContractPermission = typeof CONTRACT_PERMISSIONS[keyof typeof CONTRACT_PERMISSIONS];

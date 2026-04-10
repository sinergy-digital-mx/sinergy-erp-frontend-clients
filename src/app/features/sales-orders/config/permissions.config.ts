/**
 * Sales Orders Module Permissions Catalog
 * 
 * Defines all permissions required for sales order-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const SALES_ORDER_PERMISSIONS = {
  // Module access
  viewMenu: 'sales_orders:ViewMenu',
  
  // Views
  viewList: 'sales_orders:Read',
  viewDetail: 'sales_orders:Read',
  viewStats: 'sales_orders:Read',
  
  // CRUD operations
  create: 'sales_orders:Create',
  update: 'sales_orders:Update',
  delete: 'sales_orders:Delete',
  
  // Special actions
  export: 'sales_orders:Export',
  approve: 'sales_orders:Approve',
  reject: 'sales_orders:Reject',
  fulfill: 'sales_orders:Fulfill',
  cancel: 'sales_orders:Cancel',
  invoice: 'sales_orders:Invoice',
  
  // Document management
  uploadDocument: 'sales_orders:UploadDocument',
  deleteDocument: 'sales_orders:DeleteDocument',
  
  // Bulk operations
  bulkApprove: ['sales_orders:Approve', 'sales_orders:Read'],
  bulkCancel: ['sales_orders:Cancel', 'sales_orders:Read']
} as const;

/**
 * Helper type for permission values
 */
export type SalesOrderPermission = typeof SALES_ORDER_PERMISSIONS[keyof typeof SALES_ORDER_PERMISSIONS];

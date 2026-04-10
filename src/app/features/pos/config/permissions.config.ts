/**
 * POS (Point of Sale) Module Permissions Catalog
 * 
 * Defines all permissions required for POS-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const POS_PERMISSIONS = {
  // Module access
  viewMenu: 'pos:ViewMenu',
  
  // Views
  viewDashboard: 'pos:Read',
  viewSales: 'pos:Read',
  viewReports: 'pos:Read',
  
  // Operations
  createSale: 'pos:CreateSale',
  voidSale: 'pos:VoidSale',
  refund: 'pos:Refund',
  
  // Cash management
  openCashDrawer: 'pos:OpenCashDrawer',
  closeCashDrawer: 'pos:CloseCashDrawer',
  manageCash: 'pos:ManageCash',
  
  // Special actions
  applyDiscount: 'pos:ApplyDiscount',
  viewCost: 'pos:ViewCost',
  overridePrice: 'pos:OverridePrice',
  
  // Reports
  viewDailyReport: 'pos:ViewDailyReport',
  viewCashierReport: 'pos:ViewCashierReport',
  exportReport: 'pos:ExportReport'
} as const;

/**
 * Helper type for permission values
 */
export type POSPermission = typeof POS_PERMISSIONS[keyof typeof POS_PERMISSIONS];

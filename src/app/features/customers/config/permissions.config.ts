/**
 * Customer Module Permissions Catalog
 * 
 * Defines all permissions required for customer-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const CUSTOMER_PERMISSIONS = {
  // Module access
  viewMenu: 'customers:ViewMenu',
  
  // Views
  viewList: 'customers:Read',
  viewDetail: 'customers:Read',
  viewStats: 'customers:Read',
  
  // CRUD operations
  create: 'customers:Create',
  update: 'customers:Update',
  delete: 'customers:Delete',
  
  // Special actions
  export: 'customers:Export',
  import: 'customers:Import',
  assignGroup: 'customers:AssignGroup',
  
  // Document management
  uploadDocument: 'customers:UploadDocument',
  deleteDocument: 'customers:DeleteDocument',
  downloadDocument: 'customers:Read',

  // Activity management
  viewActivities: ['customers:Activity:Read', 'customers:ReadActivity', 'customers:Read'],
  createActivity: [
    'customers:Activity:Create',
    'customers:CreateActivity',
    'customer_activities:Create',
    'customers:Create',
    'customers:Update',
  ],
  updateActivity: [
    'customers:Activity:Update',
    'customers:UpdateActivity',
    'customer_activities:Update',
    'customers:Update',
  ],
  
  // Bulk operations (require multiple permissions)
  bulkEdit: ['customers:Update', 'customers:Read'],
  bulkDelete: ['customers:Delete', 'customers:Read']
} as const;

/**
 * Helper type for permission values
 */
export type CustomerPermission = typeof CUSTOMER_PERMISSIONS[keyof typeof CUSTOMER_PERMISSIONS];

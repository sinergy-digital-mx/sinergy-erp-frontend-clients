/**
 * Leads Module Permissions Catalog
 * 
 * Defines all permissions required for lead-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const LEAD_PERMISSIONS = {
  // Module access
  viewMenu: 'leads:ViewMenu',
  
  // Views
  viewList: 'leads:Read',
  viewDetail: 'leads:Read',
  viewStats: 'leads:Read',
  
  // CRUD operations
  create: 'leads:Create',
  update: 'leads:Update',
  delete: 'leads:Delete',
  
  // Special actions
  export: 'leads:Export',
  import: 'leads:Import',
  assignGroup: 'leads:AssignGroup',
  convertToCustomer: 'leads:ConvertToCustomer',
  
  // Communication
  sendEmail: 'leads:SendEmail',
  viewEmailHistory: 'leads:Read',
  
  // Activity management
  viewActivities: 'leads:Read',
  createActivity: 'leads:CreateActivity',
  
  // Address management
  viewAddress: 'leads:Read',
  updateAddress: 'leads:UpdateAddress',
  
  // Bulk operations
  bulkEdit: ['leads:Update', 'leads:Read'],
  bulkDelete: ['leads:Delete', 'leads:Read'],
  bulkAssignGroup: ['leads:AssignGroup', 'leads:Read']
} as const;

/**
 * Helper type for permission values
 */
export type LeadPermission = typeof LEAD_PERMISSIONS[keyof typeof LEAD_PERMISSIONS];

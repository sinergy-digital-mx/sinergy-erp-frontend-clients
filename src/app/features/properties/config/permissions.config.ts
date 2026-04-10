/**
 * Properties Module Permissions Catalog
 * 
 * Defines all permissions required for property-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const PROPERTY_PERMISSIONS = {
  // Module access
  viewMenu: 'properties:ViewMenu',
  
  // Views
  viewList: 'properties:Read',
  viewDetail: 'properties:Read',
  viewStats: 'properties:Read',
  
  // CRUD operations
  create: 'properties:Create',
  update: 'properties:Update',
  delete: 'properties:Delete',
  
  // Special actions
  export: 'properties:Export',
  import: 'properties:Import',
  changeStatus: 'properties:ChangeStatus',
  
  // Bulk operations
  bulkEdit: ['properties:Update', 'properties:Read'],
  bulkDelete: ['properties:Delete', 'properties:Read']
} as const;

/**
 * Helper type for permission values
 */
export type PropertyPermission = typeof PROPERTY_PERMISSIONS[keyof typeof PROPERTY_PERMISSIONS];

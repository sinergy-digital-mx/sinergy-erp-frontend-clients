/**
 * Settings Module Permissions Catalog
 * 
 * Settings is a container module with multiple sub-modules.
 * Each sub-module has its own set of permissions.
 */
export const SETTINGS_PERMISSIONS = {
  // Module access
  viewMenu: 'settings:ViewMenu',
  
  // Products sub-module
  products: {
    view: 'products:Read',
    create: 'products:Create',
    update: 'products:Update',
    delete: 'products:Delete',
    manageUOMs: 'products:ManageUOMs',
    managePrices: 'products:ManagePrices',
    manageCategories: 'products:ManageCategories',
    export: 'products:Export',
    import: 'products:Import'
  },
  
  // Vendors sub-module
  vendors: {
    view: 'vendors:Read',
    create: 'vendors:Create',
    update: 'vendors:Update',
    delete: 'vendors:Delete'
  },
  
  // Warehouses sub-module
  warehouses: {
    view: 'warehouses:Read',
    create: 'warehouses:Create',
    update: 'warehouses:Update',
    delete: 'warehouses:Delete'
  },
  
  // Fiscal Configuration sub-module (entity: FiscalConfiguration — razones sociales, CSD, Finkok)
  fiscalConfig: {
    view: 'FiscalConfiguration:Read',
    create: 'FiscalConfiguration:Create',
    update: 'FiscalConfiguration:Update',
    delete: 'FiscalConfiguration:Delete'
  },
  
  // Email Templates sub-module
  emailTemplates: {
    view: 'email_templates:Read',
    create: 'email_templates:Create',
    update: 'email_templates:Update',
    delete: 'email_templates:Delete',
    send: 'email_templates:Send'
  },
  
  // POS Equipment sub-module
  posEquipment: {
    view: 'pos_equipment:Read',
    create: 'pos_equipment:Create',
    update: 'pos_equipment:Update',
    delete: 'pos_equipment:Delete'
  },
  
  // Lead Groups sub-module
  leadGroups: {
    view: 'lead_groups:Read',
    create: 'lead_groups:Create',
    update: 'lead_groups:Update',
    delete: 'lead_groups:Delete'
  },
  
  // Customer Groups sub-module
  customerGroups: {
    view: 'customer_groups:Read',
    create: 'customer_groups:Create',
    update: 'customer_groups:Update',
    delete: 'customer_groups:Delete'
  },

  // Exchange Rate sub-module
  exchangeRate: {
    viewMenu: 'exchangerate:ViewMenu',
    view: 'exchangerate:Read',
    update: 'exchangerate:Update'
  }
} as const;

/**
 * Helper type for permission values
 */
export type SettingsPermission = typeof SETTINGS_PERMISSIONS[keyof typeof SETTINGS_PERMISSIONS];

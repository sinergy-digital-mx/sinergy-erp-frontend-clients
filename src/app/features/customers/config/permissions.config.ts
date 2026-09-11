/**
 * Permisos del módulo Clientes.
 * Deben coincidir con el catálogo RBAC (entity customers) y el API.
 */
export const CUSTOMER_PERMISSIONS = {
  viewMenu: 'customers:ViewMenu',

  viewList: 'customers:Read',
  viewDetail: 'customers:Read',
  viewStats: 'customers:Read',

  create: 'customers:Create',
  update: 'customers:Update',
  delete: 'customers:Delete',

  export: 'customers:Export',
  download: 'customers:Download',
  import: 'customers:Import',
  assignGroup: 'customers:AssignGroup',

  uploadDocument: 'customers:UploadDocument',
  deleteDocument: 'customers:DeleteDocument',
  downloadDocument: 'customers:Read',

  viewActivities: 'customers:Read',
  viewFrequentPurchases: 'customers:ComprasFrecuentes',
  createActivity: 'customers:Update',
  updateActivity: 'customers:Update',

  bulkEdit: ['customers:Update', 'customers:Read'],
  bulkDelete: ['customers:Delete', 'customers:Read'],
} as const;

export type CustomerPermission = typeof CUSTOMER_PERMISSIONS[keyof typeof CUSTOMER_PERMISSIONS];

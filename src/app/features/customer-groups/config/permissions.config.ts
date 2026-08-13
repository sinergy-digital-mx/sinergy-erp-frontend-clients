/**
 * Catálogo de permisos del módulo Grupos de clientes (Configuración).
 * Comparar en minúsculas: customergroup:read, etc. Admin (hasAdminRole) hace bypass.
 */
export const CUSTOMER_GROUP_PERMISSIONS = {
  viewMenu: 'CustomerGroup:ViewMenu',
  view: 'CustomerGroup:Read',
  create: 'CustomerGroup:Create',
  update: 'CustomerGroup:Update',
  delete: 'CustomerGroup:Delete',
} as const;

export type CustomerGroupPermission =
  (typeof CUSTOMER_GROUP_PERMISSIONS)[keyof typeof CUSTOMER_GROUP_PERMISSIONS];

import { CUSTOMER_PERMISSIONS } from '../../customers/config/permissions.config';

/** El portal CRM reusa permisos de clientes. */
export const CRM_PERMISSIONS = {
  viewMenu: CUSTOMER_PERMISSIONS.viewMenu,
  viewInbox: CUSTOMER_PERMISSIONS.viewList,
  updateActivity: CUSTOMER_PERMISSIONS.updateActivity,
} as const;

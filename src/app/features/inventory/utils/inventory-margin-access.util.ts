import { INVENTORY_PERMISSIONS } from '../config/permissions.config';

type MarginAccess = {
  hasGrantedPermission(permission: string): boolean;
};

/** El permiso se respeta tal cual está en Roles, también para Dirección. */
export function canViewInventoryMargin(auth: MarginAccess): boolean {
  return auth.hasGrantedPermission(INVENTORY_PERMISSIONS.viewMargin);
}

/**
 * RBAC Tenant UI Models
 * Defines all TypeScript interfaces for the RBAC system
 */

export type UserStatus = 'active' | 'inactive' | 'pending';

export type PosUserType = 'VENTAS' | 'COBRANZA';

export const POS_USER_TYPE_OPTIONS: ReadonlyArray<{
  value: PosUserType;
  label: string;
  description: string;
}> = [
  {
    value: 'VENTAS',
    label: 'Ventas',
    description: 'Arma pedidos; no cobra ni maneja corte',
  },
  {
    value: 'COBRANZA',
    label: 'Cobranza',
    description: 'Abre/cierra corte, cortes parciales y cobra ventas',
  },
];

export const POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE =
  'No se puede cambiar el tipo POS ni la sucursal mientras hay un corte global abierto. Cierra el corte primero.';

export function isOpenGlobalCutBlockMessage(message: string | undefined | null): boolean {
  if (!message) {
    return false;
  }
  return (
    message === POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE ||
    message.toLowerCase().includes('corte global abierto')
  );
}

export function userHasOpenGlobalCut(user: User | null | undefined): boolean {
  if (!user) {
    return false;
  }
  return !!(
    user.has_open_global_cut ??
    (user as { has_open_global_corte?: boolean }).has_open_global_corte ??
    (user as { hasOpenGlobalCut?: boolean }).hasOpenGlobalCut
  );
}

export function getPosUserTypeLabel(posUserType: PosUserType | null | undefined): string | null {
  const option = POS_USER_TYPE_OPTIONS.find((item) => item.value === posUserType);
  return option?.label ?? null;
}

export function getPosUserTypeBadgeLabel(
  isPosUser: boolean | undefined,
  posUserType: PosUserType | null | undefined
): string | null {
  if (!isPosUser) {
    return null;
  }
  if (posUserType === 'VENTAS') {
    return 'POS Ventas';
  }
  if (posUserType === 'COBRANZA') {
    return 'POS Cobranza';
  }
  return 'POS';
}

export type PermissionType = 'read' | 'create' | 'edit' | 'delete' | 'download' | 'export';

export interface StatusObject {
  id: number;
  code: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  status: UserStatus | StatusObject | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  tenant_id?: string;
  last_login_at?: Date | string;
  billing_branch_id?: string | null;
  billing_branch?: UserBillingBranch | null;
  has_all_branches_access?: boolean;
  is_pos_user?: boolean;
  pos_user_type?: PosUserType | null;
  pos_user_code?: number | null;
  /** COBRANZA con corte global abierto hoy: bloquea cambios de tipo POS y sucursal. */
  has_open_global_cut?: boolean;
  [key: string]: any;
}

export interface UserBillingBranch {
  id: string;
  code: string;
  display_name?: string;
  fiscal_configuration?: {
    razon_social?: string;
    rfc?: string;
  };
}

export interface CreateUserDto {
  tenant_id?: string;
  status_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  billing_branch_id?: string | null;
  is_pos_user?: boolean;
  pos_user_type?: PosUserType | null;
  pos_user_code?: number | null;
  /** COBRANZA con corte global abierto hoy: bloquea cambios de tipo POS y sucursal. */
  has_open_global_cut?: boolean;
}

export interface UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  billing_branch_id?: string | null;
  is_pos_user?: boolean;
  pos_user_type?: PosUserType | null;
  pos_user_code?: number | null;
  /** COBRANZA con corte global abierto hoy: bloquea cambios de tipo POS y sucursal. */
  has_open_global_cut?: boolean;
}

export interface Permission {
  id: string;
  type: PermissionType;
  displayName: string;
}

export interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface AvailablePermission {
  id: string;
  entity?: string;
  action: string;
  description?: string;
  assigned?: boolean;
}

export interface AvailableModule {
  id: string;
  name: string;
  code: string;
  category?: string;
  category_label?: string;
  sort_order?: number;
  permissions: AvailablePermission[];
}

export interface PermissionCategory {
  code: string;
  label: string;
  sort_order: number;
  modules: AvailableModule[];
}

export interface AvailablePermissionsResponse {
  modules: AvailableModule[];
  categories: PermissionCategory[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  permission_count?: number;
  is_admin?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  [key: string]: any; // Allow additional fields from backend
}

export interface RoleDefinition {
  name: string;
  description: string;
  permissions?: string[];
  permission_ids?: string[];
}

export interface ModulePermission {
  id: string;
  moduleId: string;
  moduleName: string;
  permissionType: PermissionType;
  displayName: string;
}

/**
 * RBAC Tenant UI Models
 * Defines all TypeScript interfaces for the RBAC system
 */

export type UserStatus = 'active' | 'inactive' | 'pending';

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
  [key: string]: any; // Allow additional fields from backend
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

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
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

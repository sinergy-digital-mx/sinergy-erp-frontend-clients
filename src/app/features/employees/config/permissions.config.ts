/**
 * Employees Module Permissions Catalog
 *
 * Defines all permissions required for employee (RH/nómina) actions.
 * Use these constants throughout the module instead of hardcoded strings.
 *
 * Entity matching is case-insensitive (see AuthService.normalizePermission),
 * so `Employee:Read` matches `employee:Read` in the JWT.
 */
export const EMPLOYEE_PERMISSIONS = {
  // Module access
  viewMenu: 'Employee:ViewMenu',

  // Views
  viewList: 'Employee:Read',
  viewDetail: 'Employee:Read',

  // CRUD operations
  create: 'Employee:Create',
  update: 'Employee:Update',
  delete: 'Employee:Delete',

  // Leave (vacaciones / faltas) management
  manageLeave: 'Employee:ManageLeave',
} as const;

/**
 * Helper type for permission values
 */
export type EmployeePermission =
  (typeof EMPLOYEE_PERMISSIONS)[keyof typeof EMPLOYEE_PERMISSIONS];

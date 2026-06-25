export const ACCOUNTING_PERMISSIONS = {
  viewMenu: 'accounting:ViewMenu',
  read: 'accounting:Read',
} as const;

export type AccountingPermission = typeof ACCOUNTING_PERMISSIONS[keyof typeof ACCOUNTING_PERMISSIONS];

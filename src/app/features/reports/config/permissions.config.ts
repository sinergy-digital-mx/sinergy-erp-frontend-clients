export const REPORTS_PERMISSIONS = {
  viewMenu: 'stock_reports:ViewMenu',
  read: 'stock_reports:Read',
} as const;

export type ReportsPermission = (typeof REPORTS_PERMISSIONS)[keyof typeof REPORTS_PERMISSIONS];

export const CUSTOMER_SALES_REPORT_PERMISSIONS = {
  viewMenu: 'customer_sales_report:ViewMenu',
  read: 'customer_sales_report:Read',
} as const;

export type CustomerSalesReportPermission =
  (typeof CUSTOMER_SALES_REPORT_PERMISSIONS)[keyof typeof CUSTOMER_SALES_REPORT_PERMISSIONS];

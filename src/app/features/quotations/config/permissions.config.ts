export const QUOTATION_PERMISSIONS = {
  viewMenu: 'Quotation:ViewMenu',
  viewList: 'Quotation:Read',
  viewDetail: 'Quotation:Read',
  viewAll: 'Quotation:ViewAll',
  viewAllBranches: 'Quotation:ViewAllBranches',
  create: 'Quotation:Create',
  update: 'Quotation:Update',
  delete: 'Quotation:Delete',
  convert: 'Quotation:Convert',
  send: 'Quotation:Send',
} as const;

export type QuotationPermission =
  (typeof QUOTATION_PERMISSIONS)[keyof typeof QUOTATION_PERMISSIONS];

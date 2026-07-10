/**
 * Global Discounts Module Permissions Catalog
 */
export const GLOBAL_DISCOUNT_PERMISSIONS = {
  viewMenu: ['global_discounts:ViewMenu', 'globalDiscount:ViewMenu', 'GlobalDiscount:ViewMenu'],
  viewList: ['global_discounts:Read', 'globalDiscount:Read', 'GlobalDiscount:Read'],
  create: ['global_discounts:Create', 'globalDiscount:Create', 'GlobalDiscount:Create'],
  update: ['global_discounts:Update', 'globalDiscount:Update', 'GlobalDiscount:Update'],
  delete: ['global_discounts:Delete', 'globalDiscount:Delete', 'GlobalDiscount:Delete'],
} as const;

export type GlobalDiscountPermission =
  (typeof GLOBAL_DISCOUNT_PERMISSIONS)[keyof typeof GLOBAL_DISCOUNT_PERMISSIONS];

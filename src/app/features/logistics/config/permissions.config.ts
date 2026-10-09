/**
 * Logistics module permissions (Truck / Shipping).
 * Entity names normalize to lowercase via AuthService (Truck → truck).
 */
export const TRUCK_PERMISSIONS = {
  viewMenu: 'truck:ViewMenu',
  viewList: 'truck:Read',
  viewDetail: 'truck:Read',
  create: 'truck:Create',
  update: 'truck:Update',
  delete: 'truck:Delete',
} as const;

export const SHIPPING_PERMISSIONS = {
  viewMenu: 'shipping:ViewMenu',
  viewList: 'shipping:Read',
  viewDetail: 'shipping:Read',
  create: 'shipping:Create',
  update: 'shipping:Update',
  /** Read covers preview / resolve / detail */
  preview: 'shipping:Read',
} as const;

export const GPS_TRACKING_PERMISSIONS = {
  viewMenu: 'gps_tracking:ViewMenu',
  viewList: 'gps_tracking:Read',
  read: 'gps_tracking:Read',
  create: 'gps_tracking:Create',
  update: 'gps_tracking:Update',
  delete: 'gps_tracking:Delete',
} as const;

export const LOGISTICS_PERMISSIONS = {
  trucks: TRUCK_PERMISSIONS,
  shippings: SHIPPING_PERMISSIONS,
  gpsTracking: GPS_TRACKING_PERMISSIONS,
} as const;

export type TruckPermission = (typeof TRUCK_PERMISSIONS)[keyof typeof TRUCK_PERMISSIONS];
export type ShippingPermission = (typeof SHIPPING_PERMISSIONS)[keyof typeof SHIPPING_PERMISSIONS];
export type GpsTrackingPermission =
  (typeof GPS_TRACKING_PERMISSIONS)[keyof typeof GPS_TRACKING_PERMISSIONS];

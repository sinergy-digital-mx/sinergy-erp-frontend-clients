/**
 * Divino Reservation Formats — Permissions Catalog
 *
 * Entidad (entityType): DivinoReservationFormat
 * Acciones: ViewMenu, Create, Read, Update, Delete, Send
 * Habilitado solo para el tenant Divino.
 */
export const DIVINO_RESERVATION_FORMAT_PERMISSIONS = {
  viewMenu: 'DivinoReservationFormat:ViewMenu',
  create: 'DivinoReservationFormat:Create',
  read: 'DivinoReservationFormat:Read',
  update: 'DivinoReservationFormat:Update',
  delete: 'DivinoReservationFormat:Delete',
  send: 'DivinoReservationFormat:Send',
} as const;

export type DivinoReservationFormatPermission =
  (typeof DIVINO_RESERVATION_FORMAT_PERMISSIONS)[keyof typeof DIVINO_RESERVATION_FORMAT_PERMISSIONS];

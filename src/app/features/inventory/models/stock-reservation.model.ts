/**
 * Reservation status enum
 */
export type ReservationStatus = 'Activa' | 'Liberada' | 'Expirada';

/**
 * Stock Reservation entity
 */
export interface StockReservation {
  id: string;
  tenant_id: string;
  product_id: string;
  warehouse_id: string;
  quantity: number;
  reference_type: string;
  reference_id: string;
  status: ReservationStatus;
  expires_at?: string;
  released_at?: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  warehouse?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Payment entity
 */
export interface Payment {
  id: string;
  purchase_order_id: string;
  amount: number;
  payment_date: string; // ISO 8601 date string
  payment_method: string;
  reference?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

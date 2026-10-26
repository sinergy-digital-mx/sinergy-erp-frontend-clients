/**
 * Payment entity
 */
export interface VendorCreditCreated {
  amount: number;
  currency: 'MXN' | 'USD' | string;
  balance_after: number;
}

export interface RegisterPaymentResponse {
  payment?: Payment | null;
  summary?: PaymentsSummaryLike;
  credit_created?: VendorCreditCreated | null;
}

export interface PaymentsSummaryLike {
  amount_paid?: number;
  amount_pending?: number;
  payment_status?: string;
  currency?: string;
}

export interface Payment {
  id: string;
  purchase_order_batch_id: string;
  amount: number;
  payment_date: string; // ISO 8601 date string
  currency?: 'MXN' | 'USD';
  payment_method: string;
  reference_number?: string;
  reference?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

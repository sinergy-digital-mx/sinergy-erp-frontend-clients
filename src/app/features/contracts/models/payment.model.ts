/**
 * Payment Model
 */
export interface Payment {
  id: string;
  contract_id: string;
  payment_number: number;
  amount: number;
  due_date: string;
  paid_date: string | null;
  status: PaymentStatus;
  payment_method: string | null;
  reference_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Payment Status
 */
export type PaymentStatus = 'pendiente' | 'pagado' | 'vencido' | 'cancelado';

/**
 * Payment Statistics
 */
export interface PaymentStats {
  total_payments: number;
  paid_count: number;
  pending_count: number;
  overdue_count: number;
  cancelled_count: number;
  total_paid: number;
  total_pending: number;
  next_payment: {
    payment_number: number;
    due_date: string;
    amount: number;
  } | null;
}

/**
 * Mark Payment as Paid DTO
 */
export interface MarkPaymentPaidDto {
  paid_date: string;
  payment_method: string;
  reference_number?: string;
}

/**
 * Update Payment DTO
 */
export interface UpdatePaymentDto {
  amount?: number;
  due_date?: string;
  notes?: string;
}

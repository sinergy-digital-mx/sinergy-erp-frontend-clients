export type DownPaymentStatus = 'pendiente' | 'parcial' | 'pagado' | 'cancelado';

export interface DownPaymentPayment {
  id: string;
  contract_id: string;
  payment_number: number;
  amount: number;
  amount_paid: number;
  amount_pending: number;
  due_date: string;
  paid_date: string | null;
  first_partial_payment_date: string | null;
  payment_method: string | null;
  status: DownPaymentStatus;
  is_overdue: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DownPaymentStats {
  total_payments: number;
  paid_count: number;
  pending_count: number;
  partial_count: number;
  overdue_count: number;
  cancelled_count: number;
  total_paid: number;
  total_pending: number;
  total_expected: number;
}

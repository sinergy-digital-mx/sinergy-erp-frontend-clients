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
  down_payment_target?: number | null;
  down_payment_applied?: number;
  down_payment_target_defined?: boolean;
  downpayment_financing_complete?: boolean;
}

export interface CreateManualDownPaymentDto {
  amount: number;
  due_date: string;
  record_as_paid?: boolean;
  payment_method?: string;
  payment_date?: string;
  reference_number?: string;
  notes?: string;
}

export interface GenerateDownPaymentInstallmentsDto {
  down_payment_target: number;
  down_payment_months: number;
  first_payment_date: string;
  payment_day?: number;
}

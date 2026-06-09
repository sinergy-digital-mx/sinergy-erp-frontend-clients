export type HoaPaymentStatus = 'pendiente' | 'parcial' | 'pagado' | 'cancelado';

export interface HoaPayment {
  id: string;
  tenant_id: string;
  contract_id: string;
  payment_number: number;
  amount: number;
  amount_paid: number;
  amount_pending: number;
  due_date: string;
  paid_date: string | null;
  first_partial_payment_date: string | null;
  payment_method: string | null;
  status: HoaPaymentStatus;
  is_overdue: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface HoaPaymentStats {
  total_payments: number;
  paid_count: number;
  pending_count: number;
  partial_count: number;
  overdue_count: number;
  cancelled_count: number;
  total_paid: number;
  total_pending: number;
  total_expected: number;
  partial_payment?: {
    payment_number: number;
    amount_paid: number;
    amount_pending: number;
    is_overdue: boolean;
  } | null;
}

export interface GenerateHoaPaymentsDto {
  /** Formato nuevo (preferido) */
  first_payment_date?: string;
  payments_count?: number;
  payment_day?: number;
  /** Formato legacy (UI alternativa) */
  start_date?: string;
  end_date?: string;
  monthly_amount: number;
}

export interface RecordHoaPaymentDto {
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
}

export interface UpdateHoaPaymentDto {
  amount_paid?: number;
  due_date?: string;
  paid_date?: string | null;
  payment_method?: string | null;
  notes?: string | null;
}

/** Mes siguiente al último vencimiento activo (no cancelado), primer día del mes en ISO. */
export function getSuggestedHoaFirstPaymentDate(payments: HoaPayment[]): string | null {
  const active = payments.filter((p) => p.status !== 'cancelado');
  if (!active.length) return null;

  const lastDueMs = active.reduce((max, p) => {
    const ms = new Date(p.due_date).getTime();
    return ms > max ? ms : max;
  }, 0);

  const lastDue = new Date(lastDueMs);
  const nextMonth = new Date(lastDue.getFullYear(), lastDue.getMonth() + 1, 1);
  const year = nextMonth.getFullYear();
  const month = String(nextMonth.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

export function getSuggestedHoaMonthlyAmount(payments: HoaPayment[]): number | null {
  const active = payments.filter((p) => p.status !== 'cancelado');
  if (!active.length) return null;

  const latest = [...active].sort((a, b) => b.payment_number - a.payment_number)[0];
  return latest?.amount ?? null;
}

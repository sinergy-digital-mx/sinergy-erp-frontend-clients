import { formatApiDate, parseApiDateTime } from '../../../core/utils/api-datetime.util';

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
  overdue_amount?: number;
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

export function getHoaDueDate(value: string | Date | null | undefined): Date | null {
  return parseApiDateTime(value);
}

export function getHoaPaymentMonthLabel(payment: Pick<HoaPayment, 'due_date'>): string {
  return formatApiDate(payment.due_date, 'month-year');
}

export function getHoaPaymentYear(payment: Pick<HoaPayment, 'due_date'>): number {
  return getHoaDueDate(payment.due_date)?.getFullYear() ?? 0;
}

export function sortHoaPaymentsByDueDate<T extends Pick<HoaPayment, 'due_date' | 'payment_number'>>(
  payments: T[],
): T[] {
  return [...payments].sort((a, b) => {
    const aMs = getHoaDueDate(a.due_date)?.getTime() ?? 0;
    const bMs = getHoaDueDate(b.due_date)?.getTime() ?? 0;
    if (aMs !== bMs) return aMs - bMs;
    return Number(a.payment_number) - Number(b.payment_number);
  });
}

export function isHoaUnpaidOverdue(
  payment: Pick<HoaPayment, 'due_date' | 'status' | 'is_overdue'>,
): boolean {
  if (payment.status !== 'pendiente' && payment.status !== 'parcial') {
    return false;
  }
  if (payment.is_overdue) {
    return true;
  }
  const due = getHoaDueDate(payment.due_date);
  if (!due) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function getHoaOverdueAmount(payments: HoaPayment[]): number {
  return payments
    .filter(isHoaUnpaidOverdue)
    .reduce((sum, payment) => sum + Number(payment.amount_pending || 0), 0);
}

export function summarizeHoaCoverage(payments: HoaPayment[]): string | null {
  const active = sortHoaPaymentsByDueDate(payments.filter((p) => p.status !== 'cancelado'));
  if (!active.length) return null;

  const first = getHoaPaymentMonthLabel(active[0]);
  const last = getHoaPaymentMonthLabel(active[active.length - 1]);
  if (first === last) {
    return `${active.length} cuota${active.length === 1 ? '' : 's'} en ${first}`;
  }
  return `${active.length} cuotas de ${first} a ${last}`;
}

/** Mes siguiente al último vencimiento activo (no cancelado), primer día del mes en ISO. */
export function getSuggestedHoaFirstPaymentDate(payments: HoaPayment[]): string | null {
  const active = payments.filter((p) => p.status !== 'cancelado');
  if (!active.length) return null;

  const lastDueMs = active.reduce((max, p) => {
    const ms = getHoaDueDate(p.due_date)?.getTime() ?? 0;
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

  const latest = sortHoaPaymentsByDueDate(active).at(-1);
  return latest?.amount ?? null;
}

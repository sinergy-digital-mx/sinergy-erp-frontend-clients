import { Contract, getDownPaymentTarget } from '../models/contract.model';
import { PaymentStats } from '../models/payment.model';

function money(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(Number.isFinite(amount) ? amount : 0);
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Desglose del saldo pendiente: precio, enganche abonado y mensualidades.
 */
export function buildPendingBalanceTooltip(
  contract: Pick<
    Contract,
    | 'total_price'
    | 'down_payment'
    | 'down_payment_target'
    | 'down_payment_financed'
    | 'remaining_balance'
    | 'payment_months'
    | 'monthly_payment'
    | 'currency'
  >,
  stats?: Pick<PaymentStats, 'pending_full_payments' | 'partial_payment'> | null,
): string {
  const currency = contract.currency || 'USD';
  const total = Number(contract.total_price) || 0;
  const downApplied = Number(contract.down_payment) || 0;
  const remaining = Number(contract.remaining_balance) || 0;
  const monthlyPaid = Math.max(0, roundMoney(total - downApplied - remaining));
  const months = Number(contract.payment_months) || 0;
  const target = contract.down_payment_financed ? getDownPaymentTarget(contract) : downApplied;
  const hasTarget = target != null && target > 0;
  const basis = hasTarget ? target : downApplied;
  const afterDown =
    contract.down_payment_financed && !hasTarget
      ? 0
      : Math.max(0, roundMoney(total - basis));

  const lines = [
    `Precio total ${money(total, currency)}`,
    `− Enganche abonado ${money(downApplied, currency)}`,
    `− Mensualidades pagadas ${money(monthlyPaid, currency)}`,
    `= Saldo pendiente ${money(remaining, currency)}`,
  ];

  if (contract.down_payment_financed && hasTarget) {
    lines.push(`Meta de enganche ${money(target, currency)}`);
  }

  if (months > 0 && afterDown > 0) {
    const cuota = Number(contract.monthly_payment) || afterDown / months;
    lines.push(
      `Cuota: ${money(afterDown, currency)} ÷ ${months} meses = ${money(cuota, currency)}`,
    );
  } else if (contract.down_payment_financed && !hasTarget) {
    lines.push('La cuota queda en 0 hasta definir la meta de enganche.');
  }

  if (stats?.pending_full_payments) {
    lines.push(
      `${stats.pending_full_payments} cuotas pendientes × ${money(Number(contract.monthly_payment) || 0, currency)}`,
    );
  }

  if (stats?.partial_payment) {
    lines.push(
      `Pago parcial #${stats.partial_payment.installment_number}: falta ${money(stats.partial_payment.remaining_amount, currency)}`,
    );
  }

  return lines.join('\n');
}

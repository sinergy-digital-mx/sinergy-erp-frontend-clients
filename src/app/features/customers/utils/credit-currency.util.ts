export type CreditCurrency = 'MXN' | 'USD';

export function normalizeCreditCurrency(value: unknown): CreditCurrency {
  return value === 'USD' ? 'USD' : 'MXN';
}

function roundCreditMoneyAmount(value: number): number {
  return Number((Number(value) || 0).toFixed(2));
}

/** Lleva el saldo de la orden a la moneda del crédito con el tipo de cambio de la orden. */
export function amountInCreditCurrency(input: {
  amount: number;
  orderCurrency: unknown;
  creditCurrency: unknown;
  exchangeRate?: number | string | null;
}): { amount: number | null; error: string | null } {
  const amount = roundCreditMoneyAmount(Math.max(0, Number(input.amount) || 0));
  const orderCurrency = normalizeCreditCurrency(input.orderCurrency);
  const creditCurrency = normalizeCreditCurrency(input.creditCurrency);
  if (orderCurrency === creditCurrency) {
    return { amount, error: null };
  }

  const rate = Number(input.exchangeRate);
  if (!(rate > 0)) {
    return {
      amount: null,
      error: 'No hay tipo de cambio para convertir el crédito de la orden',
    };
  }

  if (orderCurrency === 'USD') {
    return { amount: roundCreditMoneyAmount(amount * rate), error: null };
  }
  return { amount: roundCreditMoneyAmount(amount / rate), error: null };
}

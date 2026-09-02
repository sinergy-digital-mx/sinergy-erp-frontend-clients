/** Default Pollux (contratos / lotes). Nunca Intl con currency MXN. */
export const DEFAULT_POLLUX_CURRENCY = 'USD';

export function resolvePolluxCurrency(value?: string | null): string {
  const code = String(value ?? '').trim().toUpperCase();
  return code === 'USD' || code === 'MXN' ? code : DEFAULT_POLLUX_CURRENCY;
}

/** `$2,913,337.14` — sin prefijo MX$ / US$. */
export function formatPolluxAmount(amount: number | string | null | undefined): string {
  const n = Number(amount);
  const value = Number.isFinite(n) ? n : 0;
  const body = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `$${body}`;
}

/** Cards: `USD $2,913,337.14` */
export function formatPolluxMoney(
  amount: number | string | null | undefined,
  currency?: string | null,
): string {
  return `${resolvePolluxCurrency(currency)} ${formatPolluxAmount(amount)}`;
}

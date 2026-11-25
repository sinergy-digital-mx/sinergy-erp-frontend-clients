import { formatPosMoney } from './pos-daily-shift.model';
import { paymentMethodLabel } from './pos-collected-sales.model';

export interface PosSaleCollectionCustomer {
  id?: number;
  display_name?: string;
  name?: string;
  is_walk_in?: boolean;
}

export interface PosSaleCollection {
  customer_id?: number;
  customer?: PosSaleCollectionCustomer;
  payment_method?: string;
  order_total_mxn?: number | string;
  amount_cash_mxn?: number | string;
  amount_cash_usd?: number | string;
  usd_exchange_rate?: number | string;
  amount_transfer_mxn?: number | string;
  transfer_reference?: string | null;
  transfer_payments?: Array<{
    amount_mxn?: number | string;
    reference?: string | null;
  }>;
  transfer_payer_name?: string | null;
  transfer_payer_business_name?: string | null;
  amount_card_mxn?: number | string;
  card_reference?: string | null;
  card_payer_name?: string | null;
  card_payer_phone?: string | null;
  card_payments?: Array<{
    amount_mxn?: number | string;
    reference?: string | null;
    card_kind?: 'debit' | 'credit' | null;
  }>;
  card_kind?: 'debit' | 'credit' | null;
  amount_check_mxn?: number | string;
  amount_check_usd?: number | string;
  check_reference?: string | null;
  check_payer_name?: string | null;
  check_payer_phone?: string | null;
  amount_credit_mxn?: number | string;
  received_cash_mxn?: number | string;
  received_cash_usd?: number | string;
  change_cash_mxn?: number | string;
  change_cash_usd?: number | string;
  collected_at?: string;
}

export type PosTransferPaymentRow = {
  amount_mxn: number;
  reference: string | null;
};

export function posCollectionTransferRows(
  pay:
    | Pick<PosSaleCollection, 'amount_transfer_mxn' | 'transfer_reference' | 'transfer_payments'>
    | Record<string, unknown>
    | null
    | undefined,
): PosTransferPaymentRow[] {
  if (!pay) {
    return [];
  }
  const record = pay as Record<string, unknown>;
  const raw = record['transfer_payments'];
  if (Array.isArray(raw) && raw.length > 0) {
    return raw
      .map((item) => {
        const row = (item ?? {}) as Record<string, unknown>;
        return {
          amount_mxn: Number(row['amount_mxn'] ?? 0),
          reference:
            row['reference'] != null && String(row['reference']).trim()
              ? String(row['reference']).trim()
              : null,
        };
      })
      .filter((item) => item.amount_mxn > 0);
  }
  const amount = Number(record['amount_transfer_mxn'] ?? 0);
  if (!(amount > 0)) {
    return [];
  }
  const reference =
    record['transfer_reference'] != null && String(record['transfer_reference']).trim()
      ? String(record['transfer_reference']).trim()
      : null;
  return [{ amount_mxn: amount, reference }];
}

export type PosCardPaymentRow = {
  amount_mxn: number;
  reference: string | null;
  card_kind: 'debit' | 'credit' | null;
};

function readCardKind(value: unknown): 'debit' | 'credit' | null {
  return value === 'debit' || value === 'credit' ? value : null;
}

export function posCollectionCardRows(
  pay:
    | Pick<PosSaleCollection, 'amount_card_mxn' | 'card_reference' | 'card_payments'>
    | Record<string, unknown>
    | null
    | undefined,
): PosCardPaymentRow[] {
  if (!pay) {
    return [];
  }
  const record = pay as Record<string, unknown>;
  const raw = record['card_payments'];
  if (Array.isArray(raw) && raw.length > 0) {
    return raw
      .map((item) => {
        const row = (item ?? {}) as Record<string, unknown>;
        return {
          amount_mxn: Number(row['amount_mxn'] ?? 0),
          reference: row['reference'] != null && String(row['reference']).trim()
            ? String(row['reference']).trim()
            : null,
          card_kind: readCardKind(row['card_kind']),
        };
      })
      .filter((item) => item.amount_mxn > 0);
  }
  const amount = Number(record['amount_card_mxn'] ?? 0);
  if (!(amount > 0)) {
    return [];
  }
  const reference =
    record['card_reference'] != null && String(record['card_reference']).trim()
      ? String(record['card_reference']).trim()
      : null;
  const kind = readCardKind(record['card_kind']);
  return [{ amount_mxn: amount, reference, card_kind: kind }];
}

export function normalizePosSaleCollection(raw: unknown): PosSaleCollection | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  return raw as PosSaleCollection;
}

export function posCollectionMoneyLabel(value: unknown): string {
  return formatPosMoney(value as number | string);
}

export function posCollectionUsdLabel(value: unknown): string {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function posCollectionMethodLabel(method?: string | null): string {
  return paymentMethodLabel(method);
}

export type PosCollectionPayTone = 'cash' | 'card' | 'transfer' | 'check' | 'credit' | 'change';

export interface PosCollectionPayLine {
  title: string;
  amount: string;
  details: string[];
}

export interface PosCollectionPayGroup {
  tone: PosCollectionPayTone;
  lines: PosCollectionPayLine[];
  note: string | null;
}

function readAmount(value: unknown): number {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function readText(value: unknown): string {
  return value == null ? '' : String(value).trim();
}

function presentDetails(...parts: Array<string | null | undefined>): string[] {
  return parts.map((part) => (part ?? '').trim()).filter((part) => part.length > 0);
}

function payerNote(name: string, phone: string): string | null {
  const who = name.trim();
  const tel = formatPayerPhone(phone);
  if (who && tel) return `Pagó ${who} · ${tel}`;
  if (who) return `Pagó ${who}`;
  if (tel) return tel;
  return null;
}

function formatPayerPhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return trimmed;
}

function formatExchangeRate(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

function cardKindLabel(kind: PosCardPaymentRow['card_kind']): string | null {
  if (kind === 'debit') return 'débito';
  if (kind === 'credit') return 'crédito';
  return null;
}

function amountsDiffer(left: number, right: number): boolean {
  return Math.abs(left - right) > 0.009;
}

/** Desglose del cobro POS: un bloque por medio, tarjetas juntas y el cambio al final. */
export function posCollectionBreakdown(
  pay: PosSaleCollection | null | undefined,
): PosCollectionPayGroup[] {
  if (!pay) {
    return [];
  }

  const groups: PosCollectionPayGroup[] = [];
  const rate = readAmount(pay.usd_exchange_rate);
  const rateDetail = rate > 0 ? `TC ${formatExchangeRate(rate)}` : '';
  let rateUsed = false;
  const takeRate = (): string => {
    if (!rateDetail || rateUsed) {
      return '';
    }
    rateUsed = true;
    return rateDetail;
  };

  const cashLines: PosCollectionPayLine[] = [];
  const cashMxn = readAmount(pay.amount_cash_mxn);
  const receivedMxn = readAmount(pay.received_cash_mxn);
  if (cashMxn > 0 || receivedMxn > 0) {
    const shown = cashMxn > 0 ? cashMxn : receivedMxn;
    cashLines.push({
      title: 'Efectivo',
      amount: posCollectionMoneyLabel(shown),
      details: presentDetails(
        receivedMxn > 0 && amountsDiffer(receivedMxn, shown)
          ? `recibió ${posCollectionMoneyLabel(receivedMxn)}`
          : '',
      ),
    });
  }

  const cashUsd = readAmount(pay.amount_cash_usd);
  const receivedUsd = readAmount(pay.received_cash_usd);
  if (cashUsd > 0 || receivedUsd > 0) {
    const shown = cashUsd > 0 ? cashUsd : receivedUsd;
    cashLines.push({
      title: 'Dólares',
      amount: posCollectionUsdLabel(shown),
      details: presentDetails(
        takeRate(),
        receivedUsd > 0 && amountsDiffer(receivedUsd, shown)
          ? `recibió ${posCollectionUsdLabel(receivedUsd)}`
          : '',
      ),
    });
  }
  if (cashLines.length) {
    groups.push({ tone: 'cash', lines: cashLines, note: null });
  }

  const transfers = posCollectionTransferRows(pay);
  const transferWho = presentDetails(
    readText(pay.transfer_payer_name),
    readText(pay.transfer_payer_business_name),
  );
  if (transfers.length > 1) {
    groups.push({
      tone: 'transfer',
      lines: transfers.map((transfer, index) => ({
        title: `Transferencia ${index + 1}`,
        amount: posCollectionMoneyLabel(transfer.amount_mxn),
        details: presentDetails(transfer.reference ? `ref. ${transfer.reference}` : ''),
      })),
      note: transferWho.length ? transferWho.join(' · ') : null,
    });
  } else if (transfers.length === 1) {
    const transfer = transfers[0];
    groups.push({
      tone: 'transfer',
      lines: [
        {
          title: 'Transferencia',
          amount: posCollectionMoneyLabel(transfer.amount_mxn),
          details: presentDetails(
            transfer.reference ? `ref. ${transfer.reference}` : '',
            ...transferWho,
          ),
        },
      ],
      note: null,
    });
  } else if (transferWho.length) {
    groups.push({
      tone: 'transfer',
      lines: [
        {
          title: 'Transferencia',
          amount: '—',
          details: transferWho,
        },
      ],
      note: null,
    });
  }

  const cards = posCollectionCardRows(pay);
  if (cards.length) {
    groups.push({
      tone: 'card',
      lines: cards.map((card, index) => {
        const kind = cardKindLabel(card.card_kind);
        const title = cards.length > 1 ? `Tarjeta ${index + 1}` : 'Tarjeta';
        return {
          title,
          amount: posCollectionMoneyLabel(card.amount_mxn),
          details: presentDetails(
            kind,
            card.reference ? `voucher ${card.reference}` : '',
          ),
        };
      }),
      note: payerNote(readText(pay.card_payer_name), readText(pay.card_payer_phone)),
    });
  }

  const checkMxn = readAmount(pay.amount_check_mxn);
  const checkUsd = readAmount(pay.amount_check_usd);
  const checkMeta = presentDetails(
    readText(pay.check_reference) ? `ref. ${readText(pay.check_reference)}` : '',
    readText(pay.check_payer_name),
    formatPayerPhone(readText(pay.check_payer_phone)),
  );
  const checkLines: PosCollectionPayLine[] = [];
  if (checkMxn > 0) {
    checkLines.push({
      title: 'Cheque',
      amount: posCollectionMoneyLabel(checkMxn),
      details: [],
    });
  }
  if (checkUsd > 0) {
    checkLines.push({
      title: 'Cheque USD',
      amount: posCollectionUsdLabel(checkUsd),
      details: [],
    });
  }
  if (!checkLines.length && checkMeta.length) {
    checkLines.push({ title: 'Cheque', amount: '—', details: [] });
  }
  if (checkLines.length) {
    checkLines[checkLines.length - 1].details = presentDetails(
      checkUsd > 0 ? takeRate() : '',
      ...checkMeta,
    );
    groups.push({ tone: 'check', lines: checkLines, note: null });
  }

  const credit = readAmount(pay.amount_credit_mxn);
  if (credit > 0) {
    groups.push({
      tone: 'credit',
      lines: [
        {
          title: 'Crédito',
          amount: posCollectionMoneyLabel(credit),
          details: [],
        },
      ],
      note: null,
    });
  }

  const changeMxn = readAmount(pay.change_cash_mxn);
  const changeUsd = readAmount(pay.change_cash_usd);
  const changeLines: PosCollectionPayLine[] = [];
  if (changeMxn > 0) {
    changeLines.push({
      title: 'Cambio',
      amount: posCollectionMoneyLabel(changeMxn),
      details: [],
    });
  }
  if (changeUsd > 0) {
    changeLines.push({
      title: 'Cambio USD',
      amount: posCollectionUsdLabel(changeUsd),
      details: [],
    });
  }
  if (changeLines.length) {
    groups.push({ tone: 'change', lines: changeLines, note: null });
  }

  return groups;
}

export function posCollectionCustomerLabel(collection?: PosSaleCollection | null): string | null {
  const customer = collection?.customer;
  if (customer?.display_name?.trim()) {
    return customer.is_walk_in
      ? `${customer.display_name.trim()} (mostrador)`
      : customer.display_name.trim();
  }
  if (customer?.name?.trim()) {
    return customer.is_walk_in ? `${customer.name.trim()} (mostrador)` : customer.name.trim();
  }
  return null;
}

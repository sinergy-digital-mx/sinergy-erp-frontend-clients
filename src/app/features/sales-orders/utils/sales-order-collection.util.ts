import {
  SalesOrder,
  SalesOrderCollectionChannel,
} from '../models/sales-order.model';
import { salesOrderPaymentMethodLabel } from '../models/sales-order-payment.model';
import { isSalesOrderCredit } from './sales-order-credit.util';

export const SALES_ORDER_COLLECTION_CHANNEL_LABELS: Record<
  SalesOrderCollectionChannel,
  string
> = {
  pos_cobranza: 'POS cobranza',
  manual: 'Cobrada manual',
  mixed: 'POS cobranza + Manual',
};

export function salesOrderCollectionChannel(
  order?: Pick<SalesOrder, 'collection_channel'> | null
): SalesOrderCollectionChannel | null {
  const channel = order?.collection_channel;
  if (channel === 'pos_cobranza' || channel === 'manual' || channel === 'mixed') {
    return channel;
  }
  return null;
}

/** Label del origen de cobro. Vacío si aún no hay cobro. No usa sales_order_type. */
export function salesOrderCollectionChannelLabel(
  order?: Pick<SalesOrder, 'collection_channel' | 'collection_channel_label'> | null
): string {
  const channel = salesOrderCollectionChannel(order);
  if (!channel) {
    return '';
  }
  const fromApi = order?.collection_channel_label?.trim();
  return fromApi || SALES_ORDER_COLLECTION_CHANNEL_LABELS[channel];
}

export function salesOrderCollectionChannelChipClass(
  order?: Pick<SalesOrder, 'collection_channel'> | null
): string {
  const channel = salesOrderCollectionChannel(order);
  if (!channel) {
    return '';
  }
  const modifier = channel === 'pos_cobranza' ? 'pos' : channel;
  return `so-collection-chip so-collection-chip--${modifier}`;
}

export const SALES_ORDER_COLLECTION_CHANNEL_SHORT_LABELS: Record<
  SalesOrderCollectionChannel,
  string
> = {
  pos_cobranza: 'POS',
  manual: 'Manual',
  mixed: 'POS + Manual',
};

export function salesOrderCollectionChannelShortLabel(
  order?: Pick<SalesOrder, 'collection_channel'> | null
): string {
  const channel = salesOrderCollectionChannel(order);
  return channel ? SALES_ORDER_COLLECTION_CHANNEL_SHORT_LABELS[channel] : '';
}

/**
 * Línea secundaria del listado: método · origen · crédito.
 * El estado (Pagado/Pendiente) va solo en el chip.
 */
export function salesOrderListPaymentMetaLabel(
  order?: Pick<
    SalesOrder,
    | 'payment_method_label'
    | 'payment_method'
    | 'collection_channel'
    | 'is_credit'
  > | null
): string {
  const parts: string[] = [];
  const method = salesOrderHeaderPaymentMethodLabel(order);
  if (method) {
    parts.push(method);
  }

  const channel = salesOrderCollectionChannelShortLabel(order);
  if (channel) {
    parts.push(channel);
  }

  if (isSalesOrderCredit(order) && !parts.some(isCreditMetaLabel)) {
    parts.push('Crédito');
  }

  return uniquePaymentMetaParts(parts).join(' · ');
}

function isCreditMetaLabel(label: string): boolean {
  return label.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase() === 'credito';
}

function uniquePaymentMetaParts(parts: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const part of parts) {
    const key = part.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(part);
  }
  return unique;
}

/** Forma de pago del header/listado. Si el API no manda label → Sin cobro. */
export function salesOrderHeaderPaymentMethodLabel(
  order?: Pick<SalesOrder, 'payment_method_label' | 'payment_method'> | null
): string {
  const fromApi = order?.payment_method_label?.trim();
  if (fromApi) {
    return fromApi;
  }
  if (!order?.payment_method) {
    return 'Sin cobro';
  }
  return salesOrderPaymentMethodLabel(order.payment_method);
}

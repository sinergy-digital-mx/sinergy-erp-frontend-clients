import { describe, expect, it } from 'vitest';
import {
  salesOrderCollectionChannel,
  salesOrderCollectionChannelChipClass,
  salesOrderCollectionChannelLabel,
  salesOrderCollectionChannelShortLabel,
  salesOrderHeaderPaymentMethodLabel,
  salesOrderListPaymentMetaLabel,
} from './sales-order-collection.util';

describe('salesOrderCollectionChannel', () => {
  it('ignora sales_order_type y solo usa collection_channel', () => {
    expect(
      salesOrderCollectionChannel({
        collection_channel: null,
      })
    ).toBeNull();
    expect(
      salesOrderCollectionChannelLabel({
        collection_channel: null,
        collection_channel_label: 'POS cobranza',
      })
    ).toBe('');
  });

  it('usa el label del API cuando hay cobro', () => {
    expect(
      salesOrderCollectionChannelLabel({
        collection_channel: 'manual',
        collection_channel_label: 'Cobrada manual',
      })
    ).toBe('Cobrada manual');
    expect(
      salesOrderCollectionChannelChipClass({ collection_channel: 'pos_cobranza' })
    ).toContain('so-collection-chip--pos');
    expect(
      salesOrderCollectionChannelChipClass({ collection_channel: 'mixed' })
    ).toContain('so-collection-chip--mixed');
  });

  it('cae a labels conocidos si el API no manda collection_channel_label', () => {
    expect(
      salesOrderCollectionChannelLabel({ collection_channel: 'pos_cobranza' })
    ).toBe('POS cobranza');
    expect(
      salesOrderCollectionChannelLabel({ collection_channel: 'mixed' })
    ).toBe('POS cobranza + Manual');
  });

  it('resume el origen en el listado', () => {
    expect(
      salesOrderCollectionChannelShortLabel({ collection_channel: 'pos_cobranza' })
    ).toBe('POS');
    expect(salesOrderCollectionChannelShortLabel({ collection_channel: 'manual' })).toBe(
      'Manual'
    );
    expect(salesOrderCollectionChannelShortLabel({ collection_channel: 'mixed' })).toBe(
      'POS + Manual'
    );
  });
});

describe('salesOrderListPaymentMetaLabel', () => {
  it('junta método, origen y crédito en una línea', () => {
    expect(
      salesOrderListPaymentMetaLabel({
        payment_method: 'cash',
        payment_method_label: 'Efectivo',
        collection_channel: 'pos_cobranza',
        is_credit: false,
      })
    ).toBe('Efectivo · POS');
    expect(
      salesOrderListPaymentMetaLabel({
        payment_method: null,
        collection_channel: null,
        is_credit: true,
      })
    ).toBe('Sin cobro · Crédito');
    expect(
      salesOrderListPaymentMetaLabel({
        payment_method: 'credit',
        payment_method_label: 'Crédito',
        collection_channel: 'pos_cobranza',
        is_credit: true,
      })
    ).toBe('Crédito · POS');
  });
});

describe('salesOrderHeaderPaymentMethodLabel', () => {
  it('muestra Sin cobro si no hay método', () => {
    expect(salesOrderHeaderPaymentMethodLabel({})).toBe('Sin cobro');
    expect(salesOrderHeaderPaymentMethodLabel({ payment_method: null })).toBe('Sin cobro');
  });

  it('prioriza payment_method_label del API', () => {
    expect(
      salesOrderHeaderPaymentMethodLabel({
        payment_method: 'cash',
        payment_method_label: 'Efectivo',
      })
    ).toBe('Efectivo');
  });
});

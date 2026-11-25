import { describe, expect, it } from 'vitest';
import {
  posCollectionBreakdown,
  posCollectionMoneyLabel,
  posCollectionUsdLabel,
} from './pos-sale-collection.model';

describe('posCollectionBreakdown', () => {
  it('junta las tarjetas, el voucher y quién pagó en un solo bloque', () => {
    const [group] = posCollectionBreakdown({
      payment_method: 'mixed',
      card_payments: [
        { amount_mxn: 350 },
        { amount_mxn: 1100, reference: '000053', card_kind: 'debit' },
        { amount_mxn: 1755.46, reference: '000054', card_kind: 'credit' },
      ],
      card_payer_name: 'DANIEL',
      card_payer_phone: '6645632356',
    });

    expect(group.tone).toBe('card');
    expect(group.lines.map((line) => line.title)).toEqual(['Tarjeta 1', 'Tarjeta 2', 'Tarjeta 3']);
    expect(group.lines[0].amount).toBe(posCollectionMoneyLabel(350));
    expect(group.lines[0].details).toEqual([]);
    expect(group.lines[1].details).toEqual(['débito', 'voucher 000053']);
    expect(group.lines[2].details).toEqual(['crédito', 'voucher 000054']);
    expect(group.note).toBe('Pagó DANIEL · 664 563 2356');
  });

  it('separa el efectivo aplicado, lo recibido y el cambio', () => {
    const groups = posCollectionBreakdown({
      amount_cash_mxn: 1200,
      received_cash_mxn: 1500,
      change_cash_mxn: 300,
    });

    expect(groups.map((group) => group.tone)).toEqual(['cash', 'change']);
    expect(groups[0].lines[0]).toMatchObject({
      title: 'Efectivo',
      amount: posCollectionMoneyLabel(1200),
      details: [`recibió ${posCollectionMoneyLabel(1500)}`],
    });
    expect(groups[1].lines[0]).toMatchObject({
      title: 'Cambio',
      amount: posCollectionMoneyLabel(300),
    });
  });

  it('no repite lo recibido cuando el cliente pagó exacto', () => {
    const [group] = posCollectionBreakdown({
      amount_cash_mxn: 500,
      received_cash_mxn: 500,
    });

    expect(group.lines[0].details).toEqual([]);
  });

  it('pone tipo de cambio y referencia en la línea que les corresponde', () => {
    const groups = posCollectionBreakdown({
      amount_cash_usd: 20,
      usd_exchange_rate: 17.5,
      amount_transfer_mxn: 800,
      transfer_reference: 'SPEI-99',
      transfer_payer_name: 'Juan Pérez',
    });

    expect(groups[0].lines[0]).toMatchObject({
      title: 'Dólares',
      amount: posCollectionUsdLabel(20),
      details: ['TC 17.50'],
    });
    expect(groups[1].lines[0].details).toEqual(['ref. SPEI-99', 'Juan Pérez']);
  });

  it('separa cada transferencia y deja al ordenante una sola vez', () => {
    const [group] = posCollectionBreakdown({
      transfer_payments: [
        { amount_mxn: 300, reference: 'SPEI-1' },
        { amount_mxn: 500, reference: 'SPEI-2' },
      ],
      transfer_payer_name: 'Juan Pérez',
      transfer_payer_business_name: 'Maderería',
    });

    expect(group.tone).toBe('transfer');
    expect(group.lines.map((line) => line.title)).toEqual(['Transferencia 1', 'Transferencia 2']);
    expect(group.lines[0].details).toEqual(['ref. SPEI-1']);
    expect(group.lines[1].details).toEqual(['ref. SPEI-2']);
    expect(group.note).toBe('Juan Pérez · Maderería');
  });
});

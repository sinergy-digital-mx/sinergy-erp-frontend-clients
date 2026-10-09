import { describe, expect, it } from 'vitest';
import { regimenOptionsForPerson } from '../models/sales-order-electronic-invoice.model';
import { defaultRegimenReceptor, receptorPersonKind } from './cfdi-xml-builder.util';
import type { SalesOrder } from '../models/sales-order.model';

function order(rfc: string): SalesOrder {
  return { customer: { fiscal_rfc: rfc } } as SalesOrder;
}

describe('régimen del receptor', () => {
  it('trata un RFC de 13 como persona física y uno de 12 como moral', () => {
    expect(receptorPersonKind('ROMR9606149GA')).toBe('fisica');
    expect(receptorPersonKind('VTI040608HP6')).toBe('moral');
  });

  it('no ofrece el 601 a una persona física', () => {
    expect(defaultRegimenReceptor(order('ROMR9606149GA'))).toBe('612');
    expect(regimenOptionsForPerson('fisica').map((option) => option.id)).not.toContain('601');
    expect(defaultRegimenReceptor(order('SSS2410213X9'))).toBe('601');
  });
});

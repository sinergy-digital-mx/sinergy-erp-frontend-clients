import { describe, expect, it } from 'vitest';
import { shippingRouteLabels } from './trip-card.util';
import { ShippingListItem } from '../models/shipping.model';

function shipping(partial: Partial<ShippingListItem>): ShippingListItem {
  return { id: 'ship-1', status: 'Creado', ...partial } as ShippingListItem;
}

describe('shippingRouteLabels', () => {
  it('usa sucursales de la transferencia cuando no hay paradas', () => {
    const labels = shippingRouteLabels(
      shipping({
        transfers: [
          {
            id: 'tr-1',
            folio: 'TRF-1',
            source_branch_name: 'Maquinado',
            destination_branch_name: 'Centro',
          },
        ],
      }),
    );
    expect(labels.origin).toBe('Maquinado');
    expect(labels.destination).toBe('Centro');
  });

  it('el destino de una entrega sigue siendo el cliente', () => {
    const labels = shippingRouteLabels(
      shipping({
        origin_billing_branch_name: 'Norte',
        stops: [{ stop_sequence: 1, customer_name: 'Cliente Uno', sales_order_id: 'ov-1' }],
        transfers: [
          {
            id: 'tr-1',
            folio: 'TRF-1',
            destination_branch_name: 'Centro',
          },
        ],
      }),
    );
    expect(labels.origin).toBe('Norte');
    expect(labels.destination).toBe('Cliente Uno');
  });
});

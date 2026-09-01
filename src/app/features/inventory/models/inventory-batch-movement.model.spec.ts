import { describe, expect, it } from 'vitest';
import {
  batchMovementChipTone,
  metadataString,
  normalizeInventoryBatchMovementsResponse,
} from './inventory-batch-movement.model';

describe('inventory-batch-movement.model', () => {
  it('unwraps dedicated GET { data, total } newest first', () => {
    const result = normalizeInventoryBatchMovementsResponse({
      data: [
        {
          id: 'imported:1',
          type: 'imported',
          type_label: 'Entrada por importación',
          title: 'Entrada por importación',
          description: 'Entraron 3.000 Pieza.',
          occurred_at: '2026-08-18T10:00:00.000Z',
        },
        {
          id: 'sold:1',
          type: 'stock_sold',
          type_label: 'Salida por venta',
          title: 'Salida por venta',
          description: 'Salieron 2.000 Pieza.',
          occurred_at: '2026-08-19T12:00:00.000Z',
        },
      ],
      total: 2,
    });

    expect(result.total).toBe(2);
    expect(result.data.map((item) => item.id)).toEqual(['sold:1', 'imported:1']);
  });

  it('maps chip tones by type', () => {
    expect(batchMovementChipTone('imported')).toBe('in');
    expect(batchMovementChipTone('purchase_received')).toBe('in');
    expect(batchMovementChipTone('stock_sold')).toBe('sold');
    expect(batchMovementChipTone('transfer_out')).toBe('out');
    expect(batchMovementChipTone('inventory_adjusted')).toBe('adjust');
    expect(batchMovementChipTone('created')).toBe('created');
  });

  it('reads metadata strings for links', () => {
    expect(metadataString({ sales_order_id: 'ov-1' }, 'sales_order_id')).toBe('ov-1');
    expect(metadataString({ sales_order_folio: '' }, 'sales_order_folio')).toBeNull();
  });
});

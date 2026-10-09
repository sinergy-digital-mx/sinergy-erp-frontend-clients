import { describe, expect, it } from 'vitest';
import {
  groupMovementsByDay,
  humanizeMovementText,
  movementClock,
} from './purchase-order-movement-display.util';

const NOW = new Date('2026-10-09T20:00:00.000Z');

describe('movementClock', () => {
  it('dice hoy, ayer o el día en el reloj de Tijuana', () => {
    expect(movementClock('2026-10-09 20:00:00', NOW)?.dayLabel).toBe('Hoy');
    expect(movementClock('2026-10-08 20:00:00', NOW)?.dayLabel).toBe('Ayer');
    expect(movementClock('2026-08-07 21:35:00', NOW)).toMatchObject({
      dayLabel: '7 de agosto',
      timeLabel: '2:35 p.m.',
    });
    expect(movementClock('2025-08-07 21:35:00', NOW)?.dayLabel).toBe('7 de agosto de 2025');
  });
});

describe('humanizeMovementText', () => {
  it('quita códigos de PDF, el nombre del archivo y los ceros de más', () => {
    expect(
      humanizeMovementText(
        'Se generó DOCUMENTO_ORIGINAL (DOCUMENTO_ORIGINAL_ODC-000001.es.pdf).',
      ),
    ).toBe('Se generó el PDF original.');
    expect(
      humanizeMovementText('Se generó RECEPCIÓN (RECEPCIÓN_ODC-000001.es.pdf).'),
    ).toBe('Se generó el PDF de recepción.');
    expect(
      humanizeMovementText('Salieron 1.000 del lote F-LOTE-000001 por la venta OSV-000003.'),
    ).toBe('Salieron 1 del lote F-LOTE-000001 por la venta OSV-000003.');
    expect(
      humanizeMovementText('Se recibió mercancía en 1 lote(s). Cantidad: 12.000.'),
    ).toBe('Se recibió mercancía en 1 lote. Cantidad: 12.');
    expect(humanizeMovementText('Se subió FACTURA: factura-proveedor.pdf.')).toBe(
      'Se subió FACTURA: factura-proveedor.pdf.',
    );
  });
});

describe('groupMovementsByDay', () => {
  it('agrupa los movimientos del mismo día', () => {
    const groups = groupMovementsByDay(
      [
        { id: '1', occurred_at: '2026-08-07 21:35:00', type: 'stock_sold', type_label: 'Salida', title: '', description: '' },
        { id: '2', occurred_at: '2026-08-07 18:50:00', type: 'stock_sold', type_label: 'Salida', title: '', description: '' },
        { id: '3', occurred_at: '2026-08-06 18:48:00', type: 'created', type_label: 'Orden creada', title: '', description: '' },
      ],
      NOW,
    );
    expect(groups.map((group) => group.label)).toEqual(['7 de agosto', '6 de agosto']);
    expect(groups[0].items).toHaveLength(2);
  });
});

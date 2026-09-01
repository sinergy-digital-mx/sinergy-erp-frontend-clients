import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InventoryBatchMovementsTabComponent } from './inventory-batch-movements-tab.component';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { ToastService } from '../../../../core/services/toast.service';
import { InventoryBatchMovement } from '../../models/inventory-batch-movement.model';

function movement(overrides: Partial<InventoryBatchMovement> = {}): InventoryBatchMovement {
  return {
    id: 'sold:1',
    type: 'stock_sold',
    type_label: 'Salida por venta',
    title: 'Salida por venta',
    description: 'Salieron 2.000 Pieza por la venta OV-000010 (Juan García).',
    direction: 'out',
    quantity: '2.000',
    actor_name: 'Ana Pérez',
    occurred_at: '2026-08-19T12:00:00.000Z',
    ...overrides,
  };
}

describe('InventoryBatchMovementsTabComponent', () => {
  const getBatchMovements = vi.fn();

  beforeEach(() => {
    getBatchMovements.mockReturnValue(
      of({
        data: [
          movement({
            id: 'imported:1',
            type: 'imported',
            type_label: 'Entrada por importación',
            title: 'Entrada por importación',
            direction: 'in',
            quantity: '3.000',
            occurred_at: '2026-08-18T10:00:00.000Z',
          }),
        ],
        total: 1,
      })
    );
    TestBed.configureTestingModule({
      imports: [InventoryBatchMovementsTabComponent],
      providers: [
        { provide: InventoryBatchService, useValue: { getBatchMovements } },
        { provide: ToastService, useValue: { error: vi.fn(), success: vi.fn() } },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    getBatchMovements.mockReset();
  });

  it('formats quantity by direction', () => {
    const component = TestBed.createComponent(InventoryBatchMovementsTabComponent).componentInstance;
    expect(component.formatQuantity(movement({ direction: 'in', quantity: '3.000' }))).toBe('+3.000');
    expect(component.formatQuantity(movement({ direction: 'out', quantity: '2.000' }))).toBe('−2.000');
    expect(component.formatQuantity(movement({ direction: 'adjust', quantity: '-0.500' }))).toBe('−0.500');
  });

  it('paints detail movements newest first without an extra GET', () => {
    const component = TestBed.createComponent(InventoryBatchMovementsTabComponent).componentInstance;
    component.batchId = 'batch-1';
    component.movements = [
      movement({ id: 'imported:1', type: 'imported', occurred_at: '2026-08-18T10:00:00.000Z' }),
      movement({ id: 'sold:1', occurred_at: '2026-08-19T12:00:00.000Z' }),
    ];
    component.ngOnChanges({
      batchId: {
        currentValue: 'batch-1',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
      movements: {
        currentValue: component.movements,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.items().map((item) => item.id)).toEqual(['sold:1', 'imported:1']);
    expect(getBatchMovements).not.toHaveBeenCalled();
  });

  it('does not wipe the timeline when the parent re-emits an empty array', () => {
    const component = TestBed.createComponent(InventoryBatchMovementsTabComponent).componentInstance;
    component.batchId = 'batch-1';
    component.movements = [movement()];
    component.ngOnChanges({
      batchId: {
        currentValue: 'batch-1',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
      movements: {
        currentValue: component.movements,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    component.movements = [];
    component.ngOnChanges({
      movements: {
        currentValue: [],
        previousValue: [movement()],
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.items()).toHaveLength(1);
    expect(getBatchMovements).not.toHaveBeenCalled();
  });

  it('fetches GET /batches/:id/movements when the detail has no timeline', () => {
    const component = TestBed.createComponent(InventoryBatchMovementsTabComponent).componentInstance;
    component.batchId = 'batch-1';
    component.ngOnChanges({
      batchId: {
        currentValue: 'batch-1',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(getBatchMovements).toHaveBeenCalledWith('batch-1');
    expect(component.items()).toHaveLength(1);
  });
});

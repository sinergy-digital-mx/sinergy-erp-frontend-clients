import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BatchDetailDialogComponent } from './batch-detail-dialog.component';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { ProductService } from '../../../settings/services/product.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { PERMISSIONS } from '../../../../core/config/permissions.config';

function batch(overrides: Partial<InventoryBatch> = {}): InventoryBatch {
  return {
    id: 'batch-1',
    batch_number: 'MZN-CTIJ-BDG-00005',
    warehouse_id: 'wh-1',
    warehouse_name: 'Bodega',
    product_id: 'p-1',
    product_name: 'Encino',
    product_sku: 'EN1',
    uom_id: 'uom-pt',
    uom_name: 'PT',
    quantity: '1314',
    available_quantity: '1314',
    purchase_order_batch_id: null,
    purchase_order_id: null,
    purchase_order_detail_id: null,
    purchase_order_folio: null,
    created_by: 'u-1',
    created_at: '2026-08-27T00:00:00.000Z',
    ...overrides,
  };
}

describe('BatchDetailDialogComponent edit flags', () => {
  let permissions: string[];

  beforeEach(() => {
    permissions = [];
  });

  function setup(detail: InventoryBatch) {
    TestBed.configureTestingModule({
      imports: [BatchDetailDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { batchId: detail.id } },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MatDialog, useValue: { open: vi.fn() } },
        { provide: InventoryBatchService, useValue: { getBatchById: () => of(detail), updateBatch: vi.fn() } },
        { provide: InventoryAuditService, useValue: { getContext: () => of({}), getAuditById: () => of({}), createAudit: vi.fn(), addLine: vi.fn() } },
        { provide: WarehouseService, useValue: { getWarehouse: () => of({}) } },
        { provide: ProductService, useValue: { getUOMCatalog: () => of([]), createUOMCatalogItem: vi.fn() } },
        { provide: ToastService, useValue: { success: vi.fn(), error: vi.fn(), info: vi.fn() } },
        {
          provide: AuthService,
          useValue: {
            hasPermission: (permission: string) => permissions.includes(permission),
            hasEntityPermission: (entity: string, action: string) =>
              permissions.includes(`${entity.toLowerCase()}:${action}`) ||
              permissions.includes(`${entity}:${action}`),
          },
        },
      ],
    });
    return TestBed.createComponent(BatchDetailDialogComponent).componentInstance;
  }

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('shows warehouse pencil only with Transfer and can_transfer', () => {
    const component = setup(batch({ can_transfer: true, can_edit_tag: true, can_edit_measure: true }));
    component.ngOnInit();

    expect(component.showWarehousePencil).toBe(false);

    permissions.push(PERMISSIONS.inventory.transfer);
    expect(component.showWarehousePencil).toBe(true);
  });

  it('hides warehouse pencil when can_transfer is false', () => {
    permissions = [PERMISSIONS.inventory.transfer];
    const component = setup(batch({ can_transfer: false }));
    component.ngOnInit();

    expect(component.showWarehousePencil).toBe(false);
    expect(component.canTransfer).toBe(false);
  });

  it('shows tag and measure pencils only with Write and their flags', () => {
    const component = setup(batch({ can_edit_tag: true, can_edit_measure: true }));
    component.ngOnInit();

    expect(component.showTagPencil).toBe(false);
    expect(component.showMeasurePencil).toBe(false);

    permissions.push(PERMISSIONS.inventory.write);
    expect(component.showTagPencil).toBe(true);
    expect(component.showMeasurePencil).toBe(true);
  });

  it('shows both pencils on IMPORTACION / empty measure with Write', () => {
    permissions = [PERMISSIONS.inventory.write];
    const component = setup(
      batch({
        batch_number: 'MZN-CTR-BDG-00001',
        source_tag_identifier: 'IMPORTACION',
        measure: null,
        measure_label: null,
        can_edit_tag: true,
        can_edit_measure: true,
      })
    );
    component.ngOnInit();

    expect(component.sourceTag).toBe('IMPORTACION');
    expect(component.measureLabel).toBe('—');
    expect(component.showTagPencil).toBe(true);
    expect(component.showMeasurePencil).toBe(true);
  });

  it('exposes movements tab badge from movements_count and summary orders', () => {
    permissions = [PERMISSIONS.inventory.write];
    const component = setup(
      batch({
        movements_count: 2,
        movements: [
          {
            id: 'sold:1',
            type: 'stock_sold',
            type_label: 'Salida por venta',
            title: 'Salida por venta',
            description: 'Salieron 2.000 Pieza por la venta OV-000010.',
            direction: 'out',
            quantity: '2.000',
            occurred_at: '2026-08-19T12:00:00.000Z',
          },
        ],
        movement_summary: {
          total_movements: 2,
          total_out: 2,
          total_in: 3,
          by_type: { orders: 1, transfers_out: 0, transfers_in: 0, adjustments: 0 },
        },
      })
    );
    component.ngOnInit();

    expect(component.movementsCount).toBe(2);
    expect(component.summaryOrders).toBe(1);
    expect(component.tabs.map((tab) => tab.id)).toEqual([
      'general',
      'movimientos',
      'transferencias',
      'auditorias',
      'foto',
      'etiqueta',
    ]);
    expect(component.batch()?.movement_summary?.by_type?.orders).toBe(1);
  });

  it('counts Órdenes from stock_sold when summary still says 0', () => {
    const component = setup(
      batch({
        movements_count: 2,
        movements: [
          {
            id: 'sold:1',
            type: 'stock_sold',
            type_label: 'Salida por venta',
            title: 'Salida por venta',
            description: 'Salieron 2.000 Pieza.',
            direction: 'out',
            quantity: '2.000',
            occurred_at: '2026-08-19T12:00:00.000Z',
          },
        ],
        movement_summary: {
          total_movements: 2,
          total_out: 2,
          total_in: 3,
          by_type: { orders: 0, transfers_out: 0, transfers_in: 0, adjustments: 0 },
        },
      })
    );
    component.ngOnInit();

    expect(component.summaryOrders).toBe(1);
  });

  it('hides measure pencil when can_edit_measure is false', () => {
    permissions = [PERMISSIONS.inventory.write];
    const component = setup(batch({ can_edit_tag: true, can_edit_measure: false, measure_label: '8 Foot' }));
    component.ngOnInit();

    expect(component.showTagPencil).toBe(true);
    expect(component.showMeasurePencil).toBe(false);
    expect(component.measureLabel).toBe('8 Foot');
  });
});

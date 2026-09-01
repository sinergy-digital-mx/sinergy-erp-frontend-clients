import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InventoryBatchService } from './inventory-batch.service';
import { environment } from '../../../../environments/environment';

describe('InventoryBatchService', () => {
  let service: InventoryBatchService;
  let httpMock: HttpTestingController;
  const api = `${environment.api}/tenant/inventory/batches`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryBatchService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(InventoryBatchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should unwrap GET detail including edit flags', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    const req = httpMock.expectOne(`${api}/batch-1`);
    expect(req.request.method).toBe('GET');
    req.flush({
      data: {
        id: 'batch-1',
        source_tag_identifier: '648664',
        measure: null,
        can_edit_tag: true,
        can_edit_measure: true,
        can_transfer: true,
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'batch-1',
        can_edit_tag: true,
        can_edit_measure: true,
        can_transfer: true,
      })
    );
  });

  it('should unwrap GET detail movements and movements_count', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    httpMock.expectOne(`${api}/batch-1`).flush({
      data: {
        id: 'batch-1',
        movements_count: 2,
        movement_summary: {
          total_movements: 2,
          total_out: 2,
          total_in: 3,
          by_type: { orders: 1, transfers_out: 0, transfers_in: 0, adjustments: 0 },
        },
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
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'batch-1',
        movements_count: 2,
        movement_summary: expect.objectContaining({
          total_movements: 2,
          by_type: expect.objectContaining({ orders: 1 }),
        }),
        movements: expect.arrayContaining([
          expect.objectContaining({ type: 'stock_sold', direction: 'out' }),
        ]),
      })
    );
  });

  it('should GET dedicated movements timeline', () => {
    let result: unknown;
    service.getBatchMovements('batch-1').subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne(`${api}/batch-1/movements`);
    expect(req.request.method).toBe('GET');
    req.flush({
      data: [
        {
          id: 'imported:1',
          type: 'imported',
          type_label: 'Entrada por importación',
          title: 'Entrada por importación',
          description: 'Entraron 3.000 Pieza por importación en Bodega.',
          direction: 'in',
          quantity: '3.000',
          occurred_at: '2026-08-18T10:00:00.000Z',
        },
      ],
      total: 1,
    });

    expect(result).toEqual(
      expect.objectContaining({
        total: 1,
        data: expect.arrayContaining([
          expect.objectContaining({ type: 'imported', direction: 'in' }),
        ]),
      })
    );
  });

  it('should unwrap movement_summary from the response root and nested movements', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    httpMock.expectOne(`${api}/batch-1`).flush({
      data: {
        id: 'batch-1',
        movements: {
          data: [
            {
              id: 'sold:1',
              type: 'stock_sold',
              occurred_at: '2026-08-19T12:00:00.000Z',
            },
            {
              id: 'imported:1',
              type: 'imported',
              occurred_at: '2026-08-18T10:00:00.000Z',
            },
          ],
          total: 2,
        },
      },
      movements_count: 2,
      movement_summary: {
        total_movements: '2',
        total_out: 2,
        total_in: 3,
        by_type: { orders: '1', transfers_out: 0, transfers_in: 0, adjustments: 0 },
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'batch-1',
        movements_count: 2,
        movement_summary: expect.objectContaining({
          total_movements: 2,
          by_type: expect.objectContaining({ orders: 1 }),
        }),
        movements: [
          expect.objectContaining({ id: 'sold:1' }),
          expect.objectContaining({ id: 'imported:1' }),
        ],
      })
    );
  });

  it('should keep edit flags when the API sends them next to data', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    httpMock.expectOne(`${api}/batch-1`).flush({
      data: {
        id: 'batch-1',
        source_tag_identifier: 'IMPORTACION',
        measure: null,
        measure_label: null,
      },
      can_edit_tag: true,
      can_edit_measure: true,
      can_transfer: false,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'batch-1',
        source_tag_identifier: 'IMPORTACION',
        can_edit_tag: true,
        can_edit_measure: true,
        can_transfer: false,
      })
    );
  });

  it('should default edit flags when GET omits them (tag always, measure if empty)', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    httpMock.expectOne(`${api}/batch-1`).flush({
      data: {
        id: 'batch-1',
        source_tag_identifier: 'IMPORTACION',
        measure: null,
        measure_label: null,
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'batch-1',
        can_edit_tag: true,
        can_edit_measure: true,
      })
    );
  });

  it('should default can_edit_measure to false when measure is already set', () => {
    let result: unknown;
    service.getBatchById('batch-1').subscribe((batch) => {
      result = batch;
    });

    httpMock.expectOne(`${api}/batch-1`).flush({
      data: {
        id: 'batch-1',
        measure: 8,
        measure_label: '8 Foot',
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        can_edit_tag: true,
        can_edit_measure: false,
      })
    );
  });

  it('should PATCH tag and unwrap the detail response', () => {
    let result: unknown;
    service.updateBatch('batch-1', { source_tag_identifier: '648664' }).subscribe((batch) => {
      result = batch;
    });

    const req = httpMock.expectOne(`${api}/batch-1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ source_tag_identifier: '648664' });
    req.flush({
      data: { id: 'batch-1', source_tag_identifier: '648664', can_edit_tag: true },
    });

    expect(result).toEqual(
      expect.objectContaining({ id: 'batch-1', source_tag_identifier: '648664' })
    );
  });

  it('should surface the API 400 message when measure is already set', () => {
    let message = '';
    service.updateBatch('batch-1', { measure: 8, measure_uom_id: 'uom-foot' }).subscribe({
      error: (error: Error) => {
        message = error.message;
      },
    });

    const req = httpMock.expectOne(`${api}/batch-1`);
    req.flush(
      { message: 'La medida de este lote ya está definida y no se puede cambiar' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(message).toBe('La medida de este lote ya está definida y no se puede cambiar');
  });
});

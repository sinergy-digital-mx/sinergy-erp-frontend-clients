import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { environment } from '../../../../environments/environment';
import { WarehouseControlService } from './warehouse-control.service';

describe('WarehouseControlService', () => {
  let service: WarehouseControlService;
  let httpMock: HttpTestingController;
  const api = `${environment.api}/tenant/warehouse-control`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseControlService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WarehouseControlService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('pide el tablero con sucursal, vista y stats del board', () => {
    service
      .getBoard({
        billing_branch_id: 'br-1',
        search: 'OV-1',
        status: 'picking',
        view: 'admin',
        page: 1,
        limit: 50,
      })
      .subscribe((board) => {
        expect(board.stats.in_desk).toBe(3);
        expect(board.jobs).toHaveLength(1);
        expect(board.queue).toHaveLength(1);
        expect(board.positions[0].code).toBe('A1');
      });

    const req = httpMock.expectOne((request) => request.url === api);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('billing_branch_id')).toBe('br-1');
    expect(req.request.params.get('search')).toBe('OV-1');
    expect(req.request.params.get('status')).toBe('picking');
    expect(req.request.params.get('view')).toBe('admin');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('50');
    req.flush({
      stats: { in_desk: 3, released: 1, picking: 2 },
      jobs: [{ id: 'job-1', folio: 'OV-1', status: 'picking', tasks: [] }],
      positions: [{ id: 'p1', code: 'A1', row: 0, col: 0, occupied: false }],
      queue: [{ id: 'job-2', folio: 'OV-2', status: 'released' }],
      page: 1,
      limit: 50,
      total: 2,
    });
  });

  it('completa una tarea sin lines (100 % pedido)', () => {
    service.completeTask('job-1', 'task-1').subscribe((job) => {
      expect(job.id).toBe('job-1');
      expect(job.status).toBe('waiting_assembly');
    });

    const req = httpMock.expectOne(`${api}/job-1/tasks/task-1/complete`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ id: 'job-1', status: 'waiting_assembly', tasks: [] });
  });

  it('asigna siguiente posición libre sin position_id', () => {
    service.assignPosition('job-1').subscribe((job) => {
      expect(job.position?.code).toBe('A1');
    });

    const req = httpMock.expectOne(`${api}/job-1/assign-position`);
    expect(req.request.body).toEqual({});
    req.flush({
      id: 'job-1',
      status: 'picking',
      position: { id: 'p1', code: 'A1' },
      tasks: [],
    });
  });
});

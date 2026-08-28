import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ContractService } from './contract.service';
import { EMPTY_CONTRACT_STATS } from '../models/contract.model';
import { environment } from '../../../../environments/environment';

describe('ContractService', () => {
  let service: ContractService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContractService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('sends the same filters on list, stats and excel, without page on stats', async () => {
    const filters = {
      group_id: 'group-1',
      search: 'CONT',
      status: 'activo',
      hasOverdue: true as const,
      page: 2,
      limit: 20,
    };

    const listPromise = firstValueFrom(service.getContracts(filters));
    const listReq = httpMock.expectOne((req) => req.url === `${api}/tenant/contracts`);
    expect(listReq.request.params.get('group_id')).toBe('group-1');
    expect(listReq.request.params.get('search')).toBe('CONT');
    expect(listReq.request.params.get('status')).toBe('activo');
    expect(listReq.request.params.get('hasOverdue')).toBe('true');
    expect(listReq.request.params.get('page')).toBe('2');
    expect(listReq.request.params.get('limit')).toBe('20');
    listReq.flush({ data: [], total: 0 });
    await listPromise;

    const statsPromise = firstValueFrom(service.getContractStats(filters));
    const statsReq = httpMock.expectOne((req) => req.url === `${api}/tenant/contracts/stats`);
    expect(statsReq.request.params.get('group_id')).toBe('group-1');
    expect(statsReq.request.params.get('search')).toBe('CONT');
    expect(statsReq.request.params.get('status')).toBe('activo');
    expect(statsReq.request.params.get('hasOverdue')).toBe('true');
    expect(statsReq.request.params.has('page')).toBe(false);
    expect(statsReq.request.params.has('limit')).toBe(false);
    statsReq.flush(EMPTY_CONTRACT_STATS);
    await statsPromise;

    const excelPromise = firstValueFrom(service.exportToExcel(filters));
    const excelReq = httpMock.expectOne((req) => req.url === `${api}/tenant/contracts/export/excel`);
    expect(excelReq.request.params.get('group_id')).toBe('group-1');
    expect(excelReq.request.params.has('page')).toBe(false);
    excelReq.flush(new Blob());
    await excelPromise;
  });

  it('omits group_id when listing all groups', async () => {
    const promise = firstValueFrom(service.getContractStats({ search: 'CONT' }));
    const req = httpMock.expectOne((r) => r.url === `${api}/tenant/contracts/stats`);
    expect(req.request.params.has('group_id')).toBe(false);
    expect(req.request.params.get('search')).toBe('CONT');
    req.flush(EMPTY_CONTRACT_STATS);
    await promise;
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PropertyService } from './property.service';
import { EMPTY_PROPERTY_STATS } from '../models/property.model';
import { environment } from '../../../../environments/environment';

describe('PropertyService stats', () => {
  let service: PropertyService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PropertyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('sends groupId and customer_group_id on list and stats, without page on stats', async () => {
    const filters = {
      groupId: 'project-1',
      customer_group_id: 'cust-group-1',
      status: 'disponible',
      search: 'MZ',
      page: 2,
      limit: 20,
    };

    const listPromise = firstValueFrom(service.getProperties(filters));
    const listReq = httpMock.expectOne((req) => req.url === `${api}/tenant/properties`);
    expect(listReq.request.params.get('groupId')).toBe('project-1');
    expect(listReq.request.params.get('customer_group_id')).toBe('cust-group-1');
    expect(listReq.request.params.get('status')).toBe('disponible');
    expect(listReq.request.params.get('page')).toBe('2');
    expect(listReq.request.params.has('group_id')).toBe(false);
    listReq.flush({ data: [], total: 0 });
    await listPromise;

    const statsPromise = firstValueFrom(service.getPropertyStats(filters));
    const statsReq = httpMock.expectOne((req) => req.url === `${api}/tenant/properties/stats`);
    expect(statsReq.request.params.get('groupId')).toBe('project-1');
    expect(statsReq.request.params.get('customer_group_id')).toBe('cust-group-1');
    expect(statsReq.request.params.has('page')).toBe(false);
    expect(statsReq.request.params.has('limit')).toBe(false);
    expect(statsReq.request.params.has('group_id')).toBe(false);
    statsReq.flush(EMPTY_PROPERTY_STATS);
    await statsPromise;
  });

  it('omits empty filters', async () => {
    const promise = firstValueFrom(service.getPropertyStats({}));
    const req = httpMock.expectOne((r) => r.url === `${api}/tenant/properties/stats`);
    expect(req.request.params.keys().length).toBe(0);
    req.flush(EMPTY_PROPERTY_STATS);
    await promise;
  });
});

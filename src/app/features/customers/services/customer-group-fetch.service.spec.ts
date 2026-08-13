import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { CustomerGroupFetchService } from './customer-group-fetch.service';
import { CustomerGroup } from '../models/customer-group.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

describe('CustomerGroupFetchService', () => {
  let service: CustomerGroupFetchService;
  let httpMock: HttpTestingController;

  const groupsUrl = `${environment.api}/tenant/customers/groups`;
  const mockGroups: CustomerGroup[] = [
    { id: '1', name: 'Enterprise' },
    { id: '2', name: 'SMEs' }
  ];
  const authStub = {
    user_info: { tenant_id: 'org-1' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerGroupFetchService,
        { provide: AuthService, useValue: authStub }
      ]
    });

    service = TestBed.inject(CustomerGroupFetchService);
    httpMock = TestBed.inject(HttpTestingController);
    authStub.user_info.tenant_id = 'org-1';
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch groups from customers catalog API', async () => {
    const resultPromise = firstValueFrom(service.fetchGroups());
    const req = httpMock.expectOne(groupsUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockGroups);
    expect(await resultPromise).toEqual(mockGroups);
  });

  it('should handle wrapped array response', async () => {
    const resultPromise = firstValueFrom(service.fetchGroups());
    const req = httpMock.expectOne(groupsUrl);
    req.flush({ groups: mockGroups });
    expect(await resultPromise).toEqual(mockGroups);
  });

  it('should cache groups for the same organization', async () => {
    const firstPromise = firstValueFrom(service.fetchGroups());
    const req = httpMock.expectOne(groupsUrl);
    req.flush(mockGroups);
    await firstPromise;

    const cached = await firstValueFrom(service.fetchGroups());
    httpMock.expectNone(groupsUrl);
    expect(cached).toEqual(mockGroups);
  });

  it('should refetch when organization changes', async () => {
    const firstPromise = firstValueFrom(service.fetchGroups());
    httpMock.expectOne(groupsUrl).flush(mockGroups);
    await firstPromise;

    authStub.user_info.tenant_id = 'org-2';

    const secondPromise = firstValueFrom(service.fetchGroups());
    httpMock.expectOne(groupsUrl).flush(mockGroups);
    expect(await secondPromise).toEqual(mockGroups);
  });

  it('should invalidate cache', async () => {
    const firstPromise = firstValueFrom(service.fetchGroups());
    httpMock.expectOne(groupsUrl).flush(mockGroups);
    await firstPromise;

    service.invalidateCache();

    const secondPromise = firstValueFrom(service.fetchGroups());
    httpMock.expectOne(groupsUrl).flush(mockGroups);
    await secondPromise;
  });

  it('should get cached groups synchronously', async () => {
    const resultPromise = firstValueFrom(service.fetchGroups());
    httpMock.expectOne(groupsUrl).flush(mockGroups);
    await resultPromise;
    expect(service.getCachedGroups()).toEqual(mockGroups);
  });

  it('should return empty array when cache is empty', () => {
    expect(service.getCachedGroups()).toEqual([]);
  });
});

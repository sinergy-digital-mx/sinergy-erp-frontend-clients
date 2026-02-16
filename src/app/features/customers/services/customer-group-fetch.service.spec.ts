import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerGroupFetchService } from './customer-group-fetch.service';
import { CustomerGroup } from '../models/customer-group.model';
import { environment } from '../../../../environments/environment';

describe('CustomerGroupFetchService', () => {
  let service: CustomerGroupFetchService;
  let httpMock: HttpTestingController;

  const mockGroups: CustomerGroup[] = [
    { id: '1', name: 'Enterprise', customer_count: 45 },
    { id: '2', name: 'SMEs', customer_count: 120 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerGroupFetchService]
    });

    service = TestBed.inject(CustomerGroupFetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchGroups', () => {
    it('should fetch groups from API', (done) => {
      service.fetchGroups().subscribe(groups => {
        expect(groups).toEqual(mockGroups);
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      expect(req.request.method).toBe('GET');
      req.flush({ groups: mockGroups });
    });

    it('should handle array response', (done) => {
      service.fetchGroups().subscribe(groups => {
        expect(groups).toEqual(mockGroups);
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      req.flush(mockGroups);
    });

    it('should cache groups', (done) => {
      service.fetchGroups().subscribe(() => {
        service.fetchGroups().subscribe(groups => {
          expect(groups).toEqual(mockGroups);
          done();
        });

        // Second call should not make HTTP request
        httpMock.expectNone(`${environment.api}/customer-groups`);
      });

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      req.flush({ groups: mockGroups });
    });

    it('should retry on failure', (done) => {
      service.fetchGroups().subscribe(
        () => {},
        (error) => {
          expect(error).toBeTruthy();
          done();
        }
      );

      // Should retry 2 times + 1 original = 3 requests
      const requests = httpMock.match(`${environment.api}/customer-groups`);
      expect(requests.length).toBe(3);
      
      requests.forEach(req => {
        req.error(new ErrorEvent('Network error'));
      });
    });

    it('should handle network error', (done) => {
      service.fetchGroups().subscribe(
        () => {},
        (error) => {
          expect(error.type).toBe('network');
          expect(error.message).toContain('No se puede conectar');
          done();
        }
      );

      const requests = httpMock.match(`${environment.api}/customer-groups`);
      requests.forEach(req => {
        req.error(new ErrorEvent('Network error'), { status: 0 });
      });
    });

    it('should handle server error', (done) => {
      service.fetchGroups().subscribe(
        () => {},
        (error) => {
          expect(error.type).toBe('server');
          expect(error.message).toContain('Error del servidor');
          done();
        }
      );

      const requests = httpMock.match(`${environment.api}/customer-groups`);
      requests.forEach(req => {
        req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
      });
    });

    it('should handle validation error', (done) => {
      service.fetchGroups().subscribe(
        () => {},
        (error) => {
          expect(error.type).toBe('validation');
          expect(error.message).toContain('Error de validación');
          done();
        }
      );

      const requests = httpMock.match(`${environment.api}/customer-groups`);
      requests.forEach(req => {
        req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
      });
    });
  });

  describe('Cache Management', () => {
    it('should invalidate cache', (done) => {
      service.fetchGroups().subscribe(() => {
        service.invalidateCache();
        
        service.fetchGroups().subscribe(() => {
          done();
        });

        const req = httpMock.expectOne(`${environment.api}/customer-groups`);
        req.flush({ groups: mockGroups });
      });

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      req.flush({ groups: mockGroups });
    });

    it('should get cached groups synchronously', (done) => {
      service.fetchGroups().subscribe(() => {
        const cachedGroups = service.getCachedGroups();
        expect(cachedGroups).toEqual(mockGroups);
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      req.flush({ groups: mockGroups });
    });

    it('should return empty array when cache is empty', () => {
      const cachedGroups = service.getCachedGroups();
      expect(cachedGroups).toEqual([]);
    });
  });

  describe('Observable Stream', () => {
    it('should emit groups through observable', (done) => {
      service.groups$.subscribe(groups => {
        if (groups.length > 0) {
          expect(groups).toEqual(mockGroups);
          done();
        }
      });

      service.fetchGroups().subscribe();

      const req = httpMock.expectOne(`${environment.api}/customer-groups`);
      req.flush({ groups: mockGroups });
    });
  });
});

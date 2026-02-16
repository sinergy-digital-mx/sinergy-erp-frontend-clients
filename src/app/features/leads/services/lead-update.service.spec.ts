import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeadUpdateService } from './lead-update.service';
import { environment } from '../../../../environments/environment';
import { Lead } from '../models/lead-group.model';

describe('LeadUpdateService', () => {
  let service: LeadUpdateService;
  let httpMock: HttpTestingController;

  const mockLead: Lead = {
    id: '1',
    name: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    phone_code: '+1',
    phone_country: 'US',
    source: 'Web',
    status_id: '1',
    company_name: 'Acme Corp',
    website: 'https://acme.com',
    group_id: '1',
  };

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeadUpdateService],
    }).compileComponents();

    service = TestBed.inject(LeadUpdateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
    TestBed.resetTestingModule();
  });

  describe('updateLeadWithGroup', () => {
    it('should update lead with group_id', (done) => {
      const leadData = {
        name: 'John',
        email: 'john@example.com',
      };

      service.updateLeadWithGroup('1', '2', leadData).subscribe((lead) => {
        expect(lead.group_id).toBe('2');
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body.group_id).toBe('2');
      expect(req.request.body.name).toBe('John');
      req.flush({ ...mockLead, group_id: '2' });
    });

    it('should update lead with null group_id (clear)', (done) => {
      const leadData = {
        name: 'John',
        email: 'john@example.com',
      };

      service.updateLeadWithGroup('1', null, leadData).subscribe((lead) => {
        expect(lead.group_id).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body.group_id).toBeNull();
      req.flush({ ...mockLead, group_id: null });
    });

    it('should handle API errors', (done) => {
      service.updateLeadWithGroup('1', '2', {}).subscribe(
        () => {
          throw new Error('should have failed');
        },
        (error) => {
          expect(error.message).toContain('Failed to update lead');
          done();
        }
      );

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      req.error(new ErrorEvent('Network error'));
    });

    it('should retry on failure', (done) => {
      let requestCount = 0;

      service.updateLeadWithGroup('1', '2', {}).subscribe(
        (lead) => {
          expect(lead.group_id).toBe('2');
          expect(requestCount).toBe(2); // Initial + 1 retry
          done();
        },
        () => {
          throw new Error('should have succeeded after retry');
        }
      );

      // First request fails
      let req = httpMock.expectOne(`${environment.api}/leads/1`);
      requestCount++;
      req.error(new ErrorEvent('Network error'));

      // Second request succeeds
      req = httpMock.expectOne(`${environment.api}/leads/1`);
      requestCount++;
      req.flush({ ...mockLead, group_id: '2' });
    });

    it('should include all lead data in request', (done) => {
      const leadData = {
        name: 'Jane',
        email: 'jane@example.com',
        phone: '9876543210',
        company_name: 'Tech Corp',
      };

      service.updateLeadWithGroup('1', '3', leadData).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      expect(req.request.body.name).toBe('Jane');
      expect(req.request.body.email).toBe('jane@example.com');
      expect(req.request.body.phone).toBe('9876543210');
      expect(req.request.body.company_name).toBe('Tech Corp');
      expect(req.request.body.group_id).toBe('3');
      req.flush(mockLead);
    });

    it('should handle empty lead data', (done) => {
      service.updateLeadWithGroup('1', '2', {}).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      expect(req.request.body.group_id).toBe('2');
      req.flush(mockLead);
    });

    it('should handle undefined lead data', (done) => {
      service.updateLeadWithGroup('1', '2').subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(`${environment.api}/leads/1`);
      expect(req.request.body.group_id).toBe('2');
      req.flush(mockLead);
    });
  });
});

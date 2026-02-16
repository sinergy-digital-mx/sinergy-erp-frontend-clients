import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerActivityService } from './customer-activity.service';
import { CustomerActivity, ActivitySummary, ActivityType, ActivityStatus } from '../models/customer-group.model';
import { environment } from '../../../../environments/environment';

describe('CustomerActivityService', () => {
  let service: CustomerActivityService;
  let httpMock: HttpTestingController;

  const mockActivity: CustomerActivity = {
    id: '1',
    customer_id: 123,
    type: ActivityType.CALL,
    status: ActivityStatus.COMPLETED,
    title: 'Test Call',
    description: 'Test description',
    activity_date: '2025-02-10T10:00:00Z',
    duration_minutes: 30,
    created_at: '2025-02-10T10:00:00Z'
  };

  const mockSummary: ActivitySummary = {
    total_activities: 5,
    activities_by_type: {
      [ActivityType.CALL]: 2,
      [ActivityType.EMAIL]: 3,
      [ActivityType.MEETING]: 0,
      [ActivityType.NOTE]: 0,
      [ActivityType.TASK]: 0,
      [ActivityType.FOLLOW_UP]: 0,
      [ActivityType.PURCHASE]: 0,
      [ActivityType.SUPPORT]: 0
    },
    activities_by_status: {
      [ActivityStatus.COMPLETED]: 4,
      [ActivityStatus.SCHEDULED]: 1,
      [ActivityStatus.CANCELLED]: 0,
      [ActivityStatus.IN_PROGRESS]: 0
    },
    last_activity_date: '2025-02-10T10:00:00Z',
    next_follow_up: '2025-02-15T10:00:00Z'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerActivityService]
    });

    service = TestBed.inject(CustomerActivityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getActivities', () => {
    it('should fetch activities for a customer', (done) => {
      const customerId = 123;
      const mockResponse = { data: [mockActivity], total: 1 };

      service.getActivities(customerId).subscribe(response => {
        expect(response.data).toEqual([mockActivity]);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities?page=1&limit=10`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle pagination parameters', (done) => {
      const customerId = 123;
      const mockResponse = { data: [mockActivity], total: 1 };

      service.getActivities(customerId, 2, 20).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities?page=2&limit=20`
      );
      req.flush(mockResponse);
    });
  });

  describe('getActivitySummary', () => {
    it('should fetch activity summary', (done) => {
      const customerId = 123;

      service.getActivitySummary(customerId).subscribe(summary => {
        expect(summary.total_activities).toBe(5);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities/summary`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockSummary);
    });
  });

  describe('getActivity', () => {
    it('should fetch a specific activity', (done) => {
      const customerId = 123;
      const activityId = '1';

      service.getActivity(customerId, activityId).subscribe(activity => {
        expect(activity.id).toBe('1');
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities/${activityId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockActivity);
    });
  });

  describe('createActivity', () => {
    it('should create a new activity', (done) => {
      const customerId = 123;
      const request = {
        type: ActivityType.CALL,
        status: ActivityStatus.COMPLETED,
        title: 'New Call',
        description: 'New description'
      };

      service.createActivity(customerId, request).subscribe(activity => {
        expect(activity.title).toBe('Test Call');
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);
      req.flush(mockActivity);
    });
  });

  describe('updateActivity', () => {
    it('should update an existing activity', (done) => {
      const customerId = 123;
      const activityId = '1';
      const request = {
        title: 'Updated Call',
        status: ActivityStatus.COMPLETED
      };

      service.updateActivity(customerId, activityId, request).subscribe(activity => {
        expect(activity.id).toBe('1');
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities/${activityId}`
      );
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(request);
      req.flush(mockActivity);
    });
  });

  describe('deleteActivity', () => {
    it('should delete an activity', (done) => {
      const customerId = 123;
      const activityId = '1';

      service.deleteActivity(customerId, activityId).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(
        `${environment.api}/tenant/customers/${customerId}/activities/${activityId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle server error', (done) => {
      const customerId = 123;

      service.getActivities(customerId).subscribe(
        () => {},
        (error) => {
          expect(error.type).toBe('server');
          expect(error.message).toContain('Error del servidor');
          done();
        }
      );

      const requests = httpMock.match(
        `${environment.api}/tenant/customers/${customerId}/activities?page=1&limit=10`
      );
      requests.forEach(req => {
        req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
      });
    });

    it('should handle network error', (done) => {
      const customerId = 123;

      service.getActivities(customerId).subscribe(
        () => {},
        (error) => {
          expect(error.type).toBe('network');
          expect(error.message).toContain('No se puede conectar');
          done();
        }
      );

      const requests = httpMock.match(
        `${environment.api}/tenant/customers/${customerId}/activities?page=1&limit=10`
      );
      requests.forEach(req => {
        req.error(new ErrorEvent('Network error'), { status: 0 });
      });
    });
  });
});

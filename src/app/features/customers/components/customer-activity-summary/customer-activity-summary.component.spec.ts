import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerActivitySummaryComponent } from './customer-activity-summary.component';
import { CustomerActivityService } from '../../services/customer-activity.service';
import { ActivitySummary, ActivityType, ActivityStatus } from '../../models/customer-group.model';
import { of, throwError } from 'rxjs';

describe('CustomerActivitySummaryComponent', () => {
  let component: CustomerActivitySummaryComponent;
  let fixture: ComponentFixture<CustomerActivitySummaryComponent>;
  let mockActivityService: jasmine.SpyObj<CustomerActivityService>;

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

  beforeEach(async () => {
    mockActivityService = jasmine.createSpyObj('CustomerActivityService', [
      'getActivitySummary'
    ]);

    await TestBed.configureTestingModule({
      imports: [CustomerActivitySummaryComponent],
      providers: [
        { provide: CustomerActivityService, useValue: mockActivityService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerActivitySummaryComponent);
    component = fixture.componentInstance;
    component.customerId = 123;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load summary on init', () => {
      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));

      component.ngOnInit();

      expect(mockActivityService.getActivitySummary).toHaveBeenCalledWith(123);
      expect(component.summary).toEqual(mockSummary);
    });

    it('should set loading to false after fetch', () => {
      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));

      component.ngOnInit();

      expect(component.isLoading).toBe(false);
    });
  });

  describe('Summary Data', () => {
    beforeEach(() => {
      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));
      component.ngOnInit();
    });

    it('should display total activities', () => {
      expect(component.summary?.total_activities).toBe(5);
    });

    it('should display last activity date', () => {
      expect(component.summary?.last_activity_date).toBe('2025-02-10T10:00:00Z');
    });

    it('should display next follow-up date', () => {
      expect(component.summary?.next_follow_up).toBe('2025-02-15T10:00:00Z');
    });
  });

  describe('Activities by Type', () => {
    beforeEach(() => {
      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));
      component.ngOnInit();
    });

    it('should get activities by type as array', () => {
      const byType = component.getActivitiesByType();

      expect(byType.length).toBeGreaterThan(0);
      expect(byType[0]).toHaveProperty('type');
      expect(byType[0]).toHaveProperty('count');
    });

    it('should include call activities', () => {
      const byType = component.getActivitiesByType();
      const callActivity = byType.find(a => a.type === ActivityType.CALL);

      expect(callActivity?.count).toBe(2);
    });

    it('should include email activities', () => {
      const byType = component.getActivitiesByType();
      const emailActivity = byType.find(a => a.type === ActivityType.EMAIL);

      expect(emailActivity?.count).toBe(3);
    });
  });

  describe('Activities by Status', () => {
    beforeEach(() => {
      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));
      component.ngOnInit();
    });

    it('should get activities by status as array', () => {
      const byStatus = component.getActivitiesByStatus();

      expect(byStatus.length).toBeGreaterThan(0);
      expect(byStatus[0]).toHaveProperty('status');
      expect(byStatus[0]).toHaveProperty('count');
    });

    it('should include completed activities', () => {
      const byStatus = component.getActivitiesByStatus();
      const completed = byStatus.find(s => s.status === ActivityStatus.COMPLETED);

      expect(completed?.count).toBe(4);
    });

    it('should include scheduled activities', () => {
      const byStatus = component.getActivitiesByStatus();
      const scheduled = byStatus.find(s => s.status === ActivityStatus.SCHEDULED);

      expect(scheduled?.count).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle fetch error', () => {
      const error = { message: 'Failed to fetch summary' };
      mockActivityService.getActivitySummary.and.returnValue(throwError(() => error));

      component.loadSummary();

      expect(component.error).toEqual(error);
      expect(component.isLoading).toBe(false);
    });

    it('should retry loading summary', () => {
      const error = { message: 'Failed to fetch summary' };
      mockActivityService.getActivitySummary.and.returnValue(throwError(() => error));

      component.loadSummary();
      expect(component.error).toBeTruthy();

      mockActivityService.getActivitySummary.and.returnValue(of(mockSummary));

      component.loadSummary();
      expect(component.error).toBeNull();
      expect(component.summary).toEqual(mockSummary);
    });
  });

  describe('Empty State', () => {
    it('should handle empty summary', () => {
      mockActivityService.getActivitySummary.and.returnValue(of(null as any));

      component.loadSummary();

      expect(component.summary).toBeNull();
    });
  });

  describe('Cleanup', () => {
    it('should unsubscribe on destroy', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });
});

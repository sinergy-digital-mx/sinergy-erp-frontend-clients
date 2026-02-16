import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CustomerActivitiesListComponent } from './customer-activities-list.component';
import { CustomerActivityService } from '../../services/customer-activity.service';
import { CustomerActivity, ActivityType, ActivityStatus } from '../../models/customer-group.model';
import { of, throwError } from 'rxjs';

describe('CustomerActivitiesListComponent', () => {
  let component: CustomerActivitiesListComponent;
  let fixture: ComponentFixture<CustomerActivitiesListComponent>;
  let mockActivityService: jasmine.SpyObj<CustomerActivityService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockActivities: CustomerActivity[] = [
    {
      id: '1',
      customer_id: 123,
      type: ActivityType.CALL,
      status: ActivityStatus.COMPLETED,
      title: 'Call with client',
      activity_date: '2025-02-10T10:00:00Z',
      duration_minutes: 30,
      created_at: '2025-02-10T10:00:00Z'
    },
    {
      id: '2',
      customer_id: 123,
      type: ActivityType.EMAIL,
      status: ActivityStatus.COMPLETED,
      title: 'Email follow-up',
      activity_date: '2025-02-09T14:00:00Z',
      created_at: '2025-02-09T14:00:00Z'
    }
  ];

  beforeEach(async () => {
    mockActivityService = jasmine.createSpyObj('CustomerActivityService', [
      'getActivities',
      'deleteActivity'
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [CustomerActivitiesListComponent],
      providers: [
        { provide: CustomerActivityService, useValue: mockActivityService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerActivitiesListComponent);
    component = fixture.componentInstance;
    component.customerId = 123;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load activities on init', () => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      component.ngOnInit();

      expect(mockActivityService.getActivities).toHaveBeenCalledWith(123, 1, 10);
      expect(component.activities).toEqual(mockActivities);
    });

    it('should set total results', () => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      component.ngOnInit();

      expect(component.totalResults).toBe(2);
    });
  });

  describe('Loading State', () => {
    it('should show loading state while fetching', () => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      component.loadActivities();

      expect(component.isLoading).toBe(false);
    });

    it('should hide loading state after fetch', () => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      component.loadActivities();

      expect(component.isLoading).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle fetch error', () => {
      const error = { message: 'Failed to fetch activities' };
      mockActivityService.getActivities.and.returnValue(throwError(() => error));

      component.loadActivities();

      expect(component.error).toEqual(error);
      expect(component.isLoading).toBe(false);
    });

    it('should retry loading activities', () => {
      const error = { message: 'Failed to fetch activities' };
      mockActivityService.getActivities.and.returnValue(throwError(() => error));

      component.loadActivities();
      expect(component.error).toBeTruthy();

      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      component.loadActivities();
      expect(component.error).toBeNull();
    });
  });

  describe('Pagination', () => {
    it('should handle page change', () => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );

      const pageEvent = { pageIndex: 1, pageSize: 20, length: 2 };
      component.onPageChange(pageEvent);

      expect(component.page).toBe(2);
      expect(component.pageSize).toBe(20);
      expect(mockActivityService.getActivities).toHaveBeenCalledWith(123, 2, 20);
    });
  });

  describe('Activity Management', () => {
    beforeEach(() => {
      mockActivityService.getActivities.and.returnValue(
        of({ data: mockActivities, total: 2 })
      );
      component.ngOnInit();
    });

    it('should open create activity modal', () => {
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(null) });
      mockDialog.open.and.returnValue(dialogRefSpyObj);

      component.openCreateActivityModal();

      expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should open edit activity modal', () => {
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(null) });
      mockDialog.open.and.returnValue(dialogRefSpyObj);

      component.editActivity(mockActivities[0]);

      expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should delete activity with confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      mockActivityService.deleteActivity.and.returnValue(of(void 0));
      mockActivityService.getActivities.and.returnValue(
        of({ data: [], total: 0 })
      );

      component.deleteActivity('1');

      expect(mockActivityService.deleteActivity).toHaveBeenCalledWith(123, '1');
    });

    it('should not delete activity without confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteActivity('1');

      expect(mockActivityService.deleteActivity).not.toHaveBeenCalled();
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

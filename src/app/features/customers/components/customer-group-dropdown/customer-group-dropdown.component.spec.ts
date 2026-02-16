import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CustomerGroupDropdownComponent } from './customer-group-dropdown.component';
import { CustomerGroupFetchService } from '../../services/customer-group-fetch.service';
import { of, throwError } from 'rxjs';
import { CustomerGroup } from '../../models/customer-group.model';

describe('CustomerGroupDropdownComponent', () => {
  let component: CustomerGroupDropdownComponent;
  let fixture: ComponentFixture<CustomerGroupDropdownComponent>;
  let mockGroupFetchService: jasmine.SpyObj<CustomerGroupFetchService>;

  const mockGroups: CustomerGroup[] = [
    { id: '1', name: 'Enterprise', customer_count: 45 },
    { id: '2', name: 'SMEs', customer_count: 120 }
  ];

  beforeEach(async () => {
    mockGroupFetchService = jasmine.createSpyObj('CustomerGroupFetchService', ['fetchGroups']);

    await TestBed.configureTestingModule({
      imports: [CustomerGroupDropdownComponent, FormsModule],
      providers: [
        { provide: CustomerGroupFetchService, useValue: mockGroupFetchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerGroupDropdownComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load groups on init', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(mockGroupFetchService.fetchGroups).toHaveBeenCalled();
      expect(component.groups).toEqual(mockGroups);
    });

    it('should build group options with "Ver Todos" option', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(component.groupOptions.length).toBe(3); // "Ver Todos" + 2 groups
      expect(component.groupOptions[0].label).toBe('Ver Todos');
      expect(component.groupOptions[0].value).toBeNull();
      expect(component.groupOptions[0].count).toBe(165); // 45 + 120
    });

    it('should set selected value from input', () => {
      component.selectedGroupId = '1';
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(component.selectedValue).toBe('1');
    });
  });

  describe('Group Selection', () => {
    beforeEach(() => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      component.ngOnInit();
    });

    it('should emit group selection event', (done) => {
      component.groupSelect.subscribe(event => {
        expect(event.groupId).toBe('1');
        expect(event.groupName).toBe('Enterprise');
        done();
      });

      component.selectedValue = '1';
      component.onGroupChange();
    });

    it('should emit null groupId for "Ver Todos"', (done) => {
      component.groupSelect.subscribe(event => {
        expect(event.groupId).toBeNull();
        expect(event.groupName).toBeNull();
        done();
      });

      component.selectedValue = null;
      component.onGroupChange();
    });

    it('should disable select when loading', () => {
      component.isLoadingGroups = true;
      fixture.detectChanges();
      
      const select = fixture.nativeElement.querySelector('.group-select');
      expect(select.disabled).toBe(true);
    });

    it('should disable select when error exists', () => {
      component.groupsError = {
        type: 'network',
        message: 'Connection error',
        retryable: true
      };
      fixture.detectChanges();
      
      const select = fixture.nativeElement.querySelector('.group-select');
      expect(select.disabled).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle fetch error', () => {
      const error = {
        type: 'network',
        message: 'No se puede conectar',
        retryable: true
      };
      mockGroupFetchService.fetchGroups.and.returnValue(throwError(() => error));
      
      component.ngOnInit();
      
      expect(component.groupsError).toEqual(error);
      expect(component.isLoadingGroups).toBe(false);
    });

    it('should show error message', () => {
      component.groupsError = {
        type: 'network',
        message: 'Connection error',
        retryable: true
      };
      fixture.detectChanges();
      
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('Connection error');
    });

    it('should retry loading groups', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      component.groupsError = {
        type: 'network',
        message: 'Connection error',
        retryable: true
      };
      
      component.loadGroups();
      
      expect(mockGroupFetchService.fetchGroups).toHaveBeenCalled();
      expect(component.groupsError).toBeNull();
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

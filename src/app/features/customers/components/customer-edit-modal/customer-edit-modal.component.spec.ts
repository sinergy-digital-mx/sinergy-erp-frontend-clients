import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerEditModalComponent } from './customer-edit-modal.component';
import { CustomerGroupFetchService } from '../../services/customer-group-fetch.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { of, throwError } from 'rxjs';
import { Customer, CustomerGroup } from '../../models/customer-group.model';

describe('CustomerEditModalComponent', () => {
  let component: CustomerEditModalComponent;
  let fixture: ComponentFixture<CustomerEditModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CustomerEditModalComponent>>;
  let mockGroupFetchService: jasmine.SpyObj<CustomerGroupFetchService>;
  let mockCustomerService: jasmine.SpyObj<CustomerService>;

  const mockCustomer: Customer = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company_name: 'Acme Corp',
    group_id: 'group-1',
    status_id: 'active'
  };

  const mockGroups: CustomerGroup[] = [
    { id: 'group-1', name: 'Enterprise', customer_count: 45 },
    { id: 'group-2', name: 'SMEs', customer_count: 120 }
  ];

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGroupFetchService = jasmine.createSpyObj('CustomerGroupFetchService', ['fetchGroups']);
    mockCustomerService = jasmine.createSpyObj('CustomerService', ['updateCustomer']);

    await TestBed.configureTestingModule({
      imports: [
        CustomerEditModalComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { customer: mockCustomer } },
        { provide: CustomerGroupFetchService, useValue: mockGroupFetchService },
        { provide: CustomerService, useValue: mockCustomerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerEditModalComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load customer and groups on init', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(mockGroupFetchService.fetchGroups).toHaveBeenCalled();
      expect(component.formState.groups).toEqual(mockGroups);
    });

    it('should populate form with customer data', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(component.editForm.get('name')?.value).toBe('John Doe');
      expect(component.editForm.get('email')?.value).toBe('john@example.com');
      expect(component.editForm.get('phone')?.value).toBe('+1234567890');
      expect(component.editForm.get('company_name')?.value).toBe('Acme Corp');
      expect(component.editForm.get('group_id')?.value).toBe('group-1');
    });

    it('should set loading to false after data loads', () => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      
      component.ngOnInit();
      
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      component.ngOnInit();
    });

    it('should require name field', () => {
      const nameControl = component.editForm.get('name');
      nameControl?.setValue('');
      
      expect(nameControl?.hasError('required')).toBe(true);
    });

    it('should require email field', () => {
      const emailControl = component.editForm.get('email');
      emailControl?.setValue('');
      
      expect(emailControl?.hasError('required')).toBe(true);
    });

    it('should validate email format', () => {
      const emailControl = component.editForm.get('email');
      emailControl?.setValue('invalid-email');
      
      expect(emailControl?.hasError('email')).toBe(true);
    });

    it('should accept valid email', () => {
      const emailControl = component.editForm.get('email');
      emailControl?.setValue('valid@example.com');
      
      expect(emailControl?.valid).toBe(true);
    });

    it('should allow optional phone and company fields', () => {
      const phoneControl = component.editForm.get('phone');
      const companyControl = component.editForm.get('company_name');
      
      phoneControl?.setValue('');
      companyControl?.setValue('');
      
      expect(phoneControl?.valid).toBe(true);
      expect(companyControl?.valid).toBe(true);
    });
  });

  describe('Saving Changes', () => {
    beforeEach(() => {
      mockGroupFetchService.fetchGroups.and.returnValue(of(mockGroups));
      component.ngOnInit();
    });

    it('should save customer changes', () => {
      mockCustomerService.updateCustomer.and.returnValue(of(mockCustomer));
      
      component.editForm.patchValue({
        name: 'Jane Doe',
        email: 'jane@example.com'
      });
      
      component.onSave();
      
      expect(mockCustomerService.updateCustomer).toHaveBeenCalledWith(
        '1',
        jasmine.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com'
        })
      );
    });

    it('should close dialog on successful save', () => {
      mockCustomerService.updateCustomer.and.returnValue(of(mockCustomer));
      
      component.onSave();
      
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should not save if form is invalid', () => {
      component.editForm.patchValue({
        name: '',
        email: 'invalid'
      });
      
      component.onSave();
      
      expect(mockCustomerService.updateCustomer).not.toHaveBeenCalled();
    });

    it('should handle save error', () => {
      const error = { message: 'Save failed' };
      mockCustomerService.updateCustomer.and.returnValue(throwError(() => error));
      
      component.onSave();
      
      expect(component.formState.submitError).toBe('Save failed');
      expect(component.formState.isSubmitting).toBe(false);
    });

    it('should set submitting state during save', () => {
      mockCustomerService.updateCustomer.and.returnValue(of(mockCustomer));
      
      component.onSave();
      
      expect(component.formState.isSubmitting).toBe(false); // Should be false after completion
    });
  });

  describe('Modal Actions', () => {
    it('should close dialog on cancel', () => {
      component.onCancel();
      
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle group fetch error', () => {
      const error = {
        message: 'Failed to fetch groups'
      };
      mockGroupFetchService.fetchGroups.and.returnValue(throwError(() => error));
      
      component.ngOnInit();
      
      expect(component.formState.groupsError).toBe('Failed to fetch groups');
      expect(component.isLoading).toBe(false);
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

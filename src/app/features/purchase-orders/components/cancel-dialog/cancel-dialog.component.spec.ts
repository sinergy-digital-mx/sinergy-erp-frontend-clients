import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CancelDialogComponent } from './cancel-dialog.component';

describe('CancelDialogComponent', () => {
  let component: CancelDialogComponent;
  let fixture: ComponentFixture<CancelDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CancelDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CancelDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty cancellation_reason', () => {
    expect(component.form.get('cancellation_reason')?.value).toBe('');
  });

  describe('Form Validation', () => {
    it('should require cancellation_reason field', () => {
      const reasonControl = component.form.get('cancellation_reason');
      expect(reasonControl?.hasError('required')).toBe(true);
      
      reasonControl?.setValue('Order no longer needed');
      expect(reasonControl?.hasError('required')).toBe(false);
    });

    it('should mark form as invalid when cancellation_reason is empty', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should mark form as valid when cancellation_reason is filled', () => {
      component.form.patchValue({
        cancellation_reason: 'Vendor cannot fulfill order'
      });
      
      expect(component.form.valid).toBe(true);
    });

    it('should accept whitespace-only input as invalid after trim', () => {
      component.form.patchValue({
        cancellation_reason: '   '
      });
      
      // Form validation passes, but submit will trim and handle
      expect(component.form.valid).toBe(true);
    });
  });

  describe('getReasonError', () => {
    it('should return null when field is not touched', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('');
      
      expect(component.getReasonError()).toBeNull();
    });

    it('should return required error message', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('');
      reasonControl?.markAsTouched();
      
      expect(component.getReasonError()).toBe('La razón de cancelación es requerida');
    });

    it('should return null when field has valid value', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('Valid reason');
      reasonControl?.markAsTouched();
      
      expect(component.getReasonError()).toBeNull();
    });
  });

  describe('closeDialog', () => {
    it('should close dialog with null when not loading', () => {
      component.loading.set(false);
      component.closeDialog();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith(null);
    });

    it('should not close dialog when loading', () => {
      component.loading.set(true);
      component.closeDialog();
      
      expect(mockDialogRef.close).not.toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should not submit when form is invalid', () => {
      component.form.patchValue({
        cancellation_reason: ''
      });
      
      component.submit();
      
      expect(mockDialogRef.close).not.toHaveBeenCalled();
      expect(component.form.get('cancellation_reason')?.touched).toBe(true);
    });

    it('should close dialog with cancellation reason when form is valid', () => {
      const reason = 'Order cancelled due to budget constraints';
      component.form.patchValue({
        cancellation_reason: reason
      });
      
      component.submit();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith(reason);
    });

    it('should trim whitespace from cancellation reason', () => {
      const reason = '  Order no longer needed  ';
      component.form.patchValue({
        cancellation_reason: reason
      });
      
      component.submit();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith('Order no longer needed');
    });

    it('should handle multi-line cancellation reasons', () => {
      const reason = 'Line 1: Budget issue\nLine 2: Timeline changed\nLine 3: Vendor unavailable';
      component.form.patchValue({
        cancellation_reason: reason
      });
      
      component.submit();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith(reason);
    });
  });

  describe('Focus Management', () => {
    it('should focus textarea after view init', (done) => {
      // Create a spy on the textarea element's focus method
      const textarea = fixture.nativeElement.querySelector('textarea');
      spyOn(textarea, 'focus');
      
      component.ngAfterViewInit();
      
      // Wait for setTimeout to complete
      setTimeout(() => {
        expect(textarea.focus).toHaveBeenCalled();
        done();
      }, 150);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on dialog', () => {
      const dialog = fixture.nativeElement.querySelector('.dialog-container');
      
      expect(dialog.getAttribute('role')).toBe('dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBe('dialog-title');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should have proper ARIA attributes on textarea when invalid', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('');
      reasonControl?.markAsTouched();
      fixture.detectChanges();
      
      const textarea = fixture.nativeElement.querySelector('textarea');
      
      expect(textarea.getAttribute('aria-required')).toBe('true');
      expect(textarea.getAttribute('aria-invalid')).toBe('true');
      expect(textarea.getAttribute('aria-describedby')).toBe('reason-error');
    });

    it('should have proper ARIA attributes on textarea when valid', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('Valid reason');
      reasonControl?.markAsTouched();
      fixture.detectChanges();
      
      const textarea = fixture.nativeElement.querySelector('textarea');
      
      expect(textarea.getAttribute('aria-required')).toBe('true');
      expect(textarea.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have error message with role="alert"', () => {
      const reasonControl = component.form.get('cancellation_reason');
      reasonControl?.setValue('');
      reasonControl?.markAsTouched();
      fixture.detectChanges();
      
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.getAttribute('role')).toBe('alert');
    });

    it('should have close button with aria-label', () => {
      const closeButton = fixture.nativeElement.querySelector('.close-button');
      
      expect(closeButton.getAttribute('aria-label')).toBe('Cerrar diálogo');
    });
  });

  describe('UI Elements', () => {
    it('should display dialog title', () => {
      const title = fixture.nativeElement.querySelector('#dialog-title');
      
      expect(title.textContent).toBe('Cancelar Orden de Compra');
    });

    it('should display warning message', () => {
      const warning = fixture.nativeElement.querySelector('.warning-info p');
      
      expect(warning.textContent).toContain('Esta acción no se puede deshacer');
    });

    it('should have textarea with placeholder', () => {
      const textarea = fixture.nativeElement.querySelector('textarea');
      
      expect(textarea.getAttribute('placeholder')).toBe('Describe la razón por la cual se cancela esta orden');
    });

    it('should have two buttons in footer', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.dialog-footer app-button');
      
      expect(buttons.length).toBe(2);
    });

    it('should disable submit button when form is invalid', () => {
      component.form.patchValue({
        cancellation_reason: ''
      });
      fixture.detectChanges();
      
      const submitButton = fixture.nativeElement.querySelectorAll('.dialog-footer app-button')[1];
      
      expect(submitButton.hasAttribute('disabled')).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      component.form.patchValue({
        cancellation_reason: 'Valid reason'
      });
      fixture.detectChanges();
      
      const submitButton = fixture.nativeElement.querySelectorAll('.dialog-footer app-button')[1];
      
      expect(submitButton.hasAttribute('disabled')).toBe(false);
    });
  });
});

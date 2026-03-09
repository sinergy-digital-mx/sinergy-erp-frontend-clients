import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent, PaymentDialogData } from './payment-dialog.component';

describe('PaymentDialogComponent', () => {
  let component: PaymentDialogComponent;
  let fixture: ComponentFixture<PaymentDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<PaymentDialogComponent>>;
  const mockData: PaymentDialogData = {
    remainingAmount: 1000
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [PaymentDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.get('amount')?.value).toBe('');
    expect(component.form.get('payment_date')?.value).toBeTruthy();
    expect(component.form.get('payment_method')?.value).toBe('Transferencia');
    expect(component.form.get('reference')?.value).toBe('');
    expect(component.form.get('notes')?.value).toBe('');
  });

  it('should set remainingAmount from dialog data', () => {
    expect(component.remainingAmount).toBe(1000);
  });

  describe('Form Validation', () => {
    it('should require amount field', () => {
      const amountControl = component.form.get('amount');
      expect(amountControl?.hasError('required')).toBe(true);
      
      amountControl?.setValue(100);
      expect(amountControl?.hasError('required')).toBe(false);
    });

    it('should validate amount is greater than zero', () => {
      const amountControl = component.form.get('amount');
      
      amountControl?.setValue(0);
      expect(amountControl?.hasError('min')).toBe(true);
      
      amountControl?.setValue(-10);
      expect(amountControl?.hasError('min')).toBe(true);
      
      amountControl?.setValue(0.01);
      expect(amountControl?.hasError('min')).toBe(false);
    });

    it('should validate amount does not exceed remaining amount', () => {
      const amountControl = component.form.get('amount');
      
      amountControl?.setValue(1001);
      expect(amountControl?.hasError('max')).toBe(true);
      
      amountControl?.setValue(1000);
      expect(amountControl?.hasError('max')).toBe(false);
      
      amountControl?.setValue(500);
      expect(amountControl?.hasError('max')).toBe(false);
    });

    it('should require payment_date field', () => {
      const dateControl = component.form.get('payment_date');
      
      dateControl?.setValue('');
      expect(dateControl?.hasError('required')).toBe(true);
      
      dateControl?.setValue('2024-01-15');
      expect(dateControl?.hasError('required')).toBe(false);
    });

    it('should require payment_method field', () => {
      const methodControl = component.form.get('payment_method');
      
      methodControl?.setValue('');
      expect(methodControl?.hasError('required')).toBe(true);
      
      methodControl?.setValue('Efectivo');
      expect(methodControl?.hasError('required')).toBe(false);
    });

    it('should mark form as invalid when required fields are empty', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should mark form as valid when all required fields are filled correctly', () => {
      component.form.patchValue({
        amount: 500,
        payment_date: '2024-01-15',
        payment_method: 'Transferencia'
      });
      
      expect(component.form.valid).toBe(true);
    });
  });

  describe('getAmountError', () => {
    it('should return null when field is not touched', () => {
      const amountControl = component.form.get('amount');
      amountControl?.setValue('');
      
      expect(component.getAmountError()).toBeNull();
    });

    it('should return required error message', () => {
      const amountControl = component.form.get('amount');
      amountControl?.setValue('');
      amountControl?.markAsTouched();
      
      expect(component.getAmountError()).toBe('El monto es requerido');
    });

    it('should return min error message', () => {
      const amountControl = component.form.get('amount');
      amountControl?.setValue(0);
      amountControl?.markAsTouched();
      
      expect(component.getAmountError()).toBe('El monto debe ser mayor a cero');
    });

    it('should return max error message with formatted amount', () => {
      const amountControl = component.form.get('amount');
      amountControl?.setValue(1500);
      amountControl?.markAsTouched();
      
      const error = component.getAmountError();
      expect(error).toContain('no puede exceder el saldo pendiente');
      expect(error).toContain('1,000');
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
        amount: '',
        payment_date: '',
        payment_method: ''
      });
      
      component.submit();
      
      expect(mockDialogRef.close).not.toHaveBeenCalled();
      expect(component.form.get('amount')?.touched).toBe(true);
    });

    it('should close dialog with payment data when form is valid', () => {
      component.form.patchValue({
        amount: 500,
        payment_date: '2024-01-15',
        payment_method: 'Efectivo',
        reference: 'REF-123',
        notes: 'Test payment'
      });
      
      component.submit();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith({
        amount: 500,
        payment_date: '2024-01-15',
        payment_method: 'Efectivo',
        reference: 'REF-123',
        notes: 'Test payment'
      });
    });

    it('should omit empty optional fields', () => {
      component.form.patchValue({
        amount: 500,
        payment_date: '2024-01-15',
        payment_method: 'Transferencia',
        reference: '',
        notes: ''
      });
      
      component.submit();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith({
        amount: 500,
        payment_date: '2024-01-15',
        payment_method: 'Transferencia',
        reference: undefined,
        notes: undefined
      });
    });

    it('should parse amount as float', () => {
      component.form.patchValue({
        amount: '123.45',
        payment_date: '2024-01-15',
        payment_method: 'Cheque'
      });
      
      component.submit();
      
      const callArgs = mockDialogRef.close.calls.mostRecent().args[0];
      expect(callArgs.amount).toBe(123.45);
      expect(typeof callArgs.amount).toBe('number');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in Mexican pesos', () => {
      const formatted = component.formatCurrency(1234.56);
      expect(formatted).toContain('1,234.56');
      expect(formatted).toContain('$');
    });

    it('should format zero correctly', () => {
      const formatted = component.formatCurrency(0);
      expect(formatted).toContain('0.00');
    });

    it('should format large numbers correctly', () => {
      const formatted = component.formatCurrency(1000000);
      expect(formatted).toContain('1,000,000');
    });
  });
});

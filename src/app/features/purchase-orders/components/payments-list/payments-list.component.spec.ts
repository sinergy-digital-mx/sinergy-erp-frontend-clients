import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { PaymentsListComponent } from './payments-list.component';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { Payment } from '../../models/payment.model';

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;
  let taxCalculatorService: TaxCalculatorService;

  const mockPayments: Payment[] = [
    {
      id: '1',
      purchase_order_id: 'po-1',
      amount: 5000,
      payment_date: '2024-01-15T00:00:00Z',
      payment_method: 'Transferencia',
      reference: 'REF-001',
      notes: 'Pago inicial',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      purchase_order_id: 'po-1',
      amount: 3000,
      payment_date: '2024-01-20T00:00:00Z',
      payment_method: 'Efectivo',
      reference: undefined,
      notes: undefined,
      created_at: '2024-01-20T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsListComponent],
      providers: [TaxCalculatorService]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
    taxCalculatorService = TestBed.inject(TaxCalculatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Payments List Rendering', () => {
    it('should render payments list with data', () => {
      component.payments = mockPayments;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll('.payment-row');
      
      expect(rows.length).toBe(2);
    });

    it('should display payment dates formatted', () => {
      component.payments = mockPayments;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const dateCell = compiled.querySelector('.payment-row td[data-label="FECHA"]');
      
      expect(dateCell?.textContent).toContain('ene');
    });

    it('should display payment method', () => {
      component.payments = mockPayments;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const methodCells = compiled.querySelectorAll('.payment-row td[data-label="MÉTODO"]');
      
      expect(methodCells[0]?.textContent?.trim()).toBe('Transferencia');
      expect(methodCells[1]?.textContent?.trim()).toBe('Efectivo');
    });

    it('should display reference or N/A', () => {
      component.payments = mockPayments;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const refCells = compiled.querySelectorAll('.payment-row td[data-label="REFERENCIA"]');
      
      expect(refCells[0]?.textContent?.trim()).toBe('REF-001');
      expect(refCells[1]?.textContent?.trim()).toBe('N/A');
    });

    it('should display notes or dash', () => {
      component.payments = mockPayments;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const notesCells = compiled.querySelectorAll('.payment-row td[data-label="NOTAS"]');
      
      expect(notesCells[0]?.textContent?.trim()).toBe('Pago inicial');
      expect(notesCells[1]?.textContent?.trim()).toBe('-');
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no payments', () => {
      component.payments = [];
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const emptyState = compiled.querySelector('.empty-state');
      
      expect(emptyState).toBeTruthy();
      expect(emptyState?.textContent).toContain('No hay pagos registrados');
    });

    it('should show hint in empty state when canAddPayment is true', () => {
      component.payments = [];
      component.canAddPayment = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const hint = compiled.querySelector('.empty-hint');
      
      expect(hint).toBeTruthy();
      expect(hint?.textContent).toContain('Registrar Pago');
    });

    it('should not show hint in empty state when canAddPayment is false', () => {
      component.payments = [];
      component.canAddPayment = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const hint = compiled.querySelector('.empty-hint');
      
      expect(hint).toBeFalsy();
    });
  });

  describe('Add Payment Button', () => {
    it('should show "Registrar Pago" button when canAddPayment is true', () => {
      component.canAddPayment = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('.btn-add-payment');
      
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Registrar Pago');
    });

    it('should not show "Registrar Pago" button when canAddPayment is false', () => {
      component.canAddPayment = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('.btn-add-payment');
      
      expect(button).toBeFalsy();
    });

    it('should emit addPayment event when button is clicked', () => {
      const emitSpy = vi.spyOn(component.addPayment, 'emit');
      component.canAddPayment = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('.btn-add-payment') as HTMLButtonElement;
      button.click();

      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('Helper Methods', () => {
    it('should format currency using TaxCalculatorService', () => {
      const result = component.formatCurrency(1000);
      
      expect(result).toContain('$');
      expect(result).toContain('1,000.00');
    });

    it('should format date to Spanish locale', () => {
      const dateString = '2024-01-15T00:00:00Z';
      const result = component.formatDate(dateString);
      
      expect(result).toContain('ene');
      expect(result).toContain('2024');
    });

    it('should track payments by id', () => {
      const payment = mockPayments[0];
      const result = component.trackByPayment(0, payment);
      
      expect(result).toBe('1');
    });
  });
});

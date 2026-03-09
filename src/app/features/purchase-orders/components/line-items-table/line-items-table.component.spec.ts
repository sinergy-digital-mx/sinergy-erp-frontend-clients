import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LineItemsTableComponent } from './line-items-table.component';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { LineItem } from '../../models/line-item.model';

describe('LineItemsTableComponent', () => {
  let component: LineItemsTableComponent;
  let fixture: ComponentFixture<LineItemsTableComponent>;
  let taxCalculator: TaxCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineItemsTableComponent],
      providers: [TaxCalculatorService]
    }).compileComponents();

    fixture = TestBed.createComponent(LineItemsTableComponent);
    component = fixture.componentInstance;
    taxCalculator = TestBed.inject(TaxCalculatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty state when no line items', () => {
    component.lineItems = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emptyState = compiled.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('No hay líneas de productos');
  });

  it('should render line items in table', () => {
    const mockLineItems: LineItem[] = [
      {
        id: '1',
        purchase_order_id: 'po-1',
        product_id: 'prod-1',
        uom_id: 'uom-1',
        quantity: 10,
        unit_price: 100,
        subtotal: 1000,
        iva_percentage: 16,
        iva_amount: 160,
        ieps_percentage: 0,
        ieps_amount: 0,
        line_total: 1160,
        product: { id: 'prod-1', name: 'Product 1', sku: 'SKU1', cost: 100, base_uom_id: 'uom-1', uoms: [] },
        uom: { id: 'uom-1', name: 'Piece', abbreviation: 'PCS' },
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ];

    component.lineItems = mockLineItems;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('.line-item-row');
    expect(rows.length).toBe(1);
    expect(compiled.textContent).toContain('Product 1');
    expect(compiled.textContent).toContain('PCS');
  });

  it('should calculate and display totals', () => {
    const mockLineItems: LineItem[] = [
      {
        id: '1',
        purchase_order_id: 'po-1',
        product_id: 'prod-1',
        uom_id: 'uom-1',
        quantity: 10,
        unit_price: 100,
        subtotal: 1000,
        iva_percentage: 16,
        iva_amount: 160,
        ieps_percentage: 0,
        ieps_amount: 0,
        line_total: 1160,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: '2',
        purchase_order_id: 'po-1',
        product_id: 'prod-2',
        uom_id: 'uom-1',
        quantity: 5,
        unit_price: 200,
        subtotal: 1000,
        iva_percentage: 16,
        iva_amount: 160,
        ieps_percentage: 0,
        ieps_amount: 0,
        line_total: 1160,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ];

    component.lineItems = mockLineItems;
    fixture.detectChanges();

    const totals = component.totals;
    expect(totals.total_subtotal).toBe(2000);
    expect(totals.total_iva).toBe(320);
    expect(totals.total_ieps).toBe(0);
    expect(totals.grand_total).toBe(2320);
  });

  it('should enable virtual scrolling for > 50 items', () => {
    const mockLineItems: LineItem[] = Array.from({ length: 51 }, (_, i) => ({
      id: `${i}`,
      purchase_order_id: 'po-1',
      product_id: `prod-${i}`,
      uom_id: 'uom-1',
      quantity: 1,
      unit_price: 100,
      subtotal: 100,
      iva_percentage: 16,
      iva_amount: 16,
      ieps_percentage: 0,
      ieps_amount: 0,
      line_total: 116,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }));

    component.lineItems = mockLineItems;
    expect(component.useVirtualScroll).toBe(true);
  });

  it('should not enable virtual scrolling for <= 50 items', () => {
    const mockLineItems: LineItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      purchase_order_id: 'po-1',
      product_id: `prod-${i}`,
      uom_id: 'uom-1',
      quantity: 1,
      unit_price: 100,
      subtotal: 100,
      iva_percentage: 16,
      iva_amount: 16,
      ieps_percentage: 0,
      ieps_amount: 0,
      line_total: 116,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }));

    component.lineItems = mockLineItems;
    expect(component.useVirtualScroll).toBe(false);
  });

  it('should format currency correctly', () => {
    const formatted = component.formatCurrency(1234.56);
    expect(formatted).toContain('1,234.56');
    expect(formatted).toContain('$');
  });

  it('should emit lineItemChange when editable', () => {
    component.editable = true;
    const mockLineItem: LineItem = {
      id: '1',
      purchase_order_id: 'po-1',
      product_id: 'prod-1',
      uom_id: 'uom-1',
      quantity: 10,
      unit_price: 100,
      subtotal: 1000,
      iva_percentage: 16,
      iva_amount: 160,
      ieps_percentage: 0,
      ieps_amount: 0,
      line_total: 1160,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    };

    const emitSpy = vi.spyOn(component.lineItemChange, 'emit');
    component.onLineItemChange(mockLineItem);
    expect(emitSpy).toHaveBeenCalledWith(mockLineItem);
  });

  it('should not emit lineItemChange when not editable', () => {
    component.editable = false;
    const mockLineItem: LineItem = {
      id: '1',
      purchase_order_id: 'po-1',
      product_id: 'prod-1',
      uom_id: 'uom-1',
      quantity: 10,
      unit_price: 100,
      subtotal: 1000,
      iva_percentage: 16,
      iva_amount: 160,
      ieps_percentage: 0,
      ieps_amount: 0,
      line_total: 1160,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    };

    const emitSpy = vi.spyOn(component.lineItemChange, 'emit');
    component.onLineItemChange(mockLineItem);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit lineItemRemove when editable', () => {
    component.editable = true;
    const emitSpy = vi.spyOn(component.lineItemRemove, 'emit');
    component.onLineItemRemove(0);
    expect(emitSpy).toHaveBeenCalledWith(0);
  });

  it('should not emit lineItemRemove when not editable', () => {
    component.editable = false;
    const emitSpy = vi.spyOn(component.lineItemRemove, 'emit');
    component.onLineItemRemove(0);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should track line items by id', () => {
    const mockLineItem: LineItem = {
      id: 'test-id',
      purchase_order_id: 'po-1',
      product_id: 'prod-1',
      uom_id: 'uom-1',
      quantity: 10,
      unit_price: 100,
      subtotal: 1000,
      iva_percentage: 16,
      iva_amount: 160,
      ieps_percentage: 0,
      ieps_amount: 0,
      line_total: 1160,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    };

    const trackId = component.trackByLineItem(0, mockLineItem);
    expect(trackId).toBe('test-id');
  });
});

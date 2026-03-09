import { describe, it, expect, beforeEach } from 'vitest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';
import { Vendor } from '../../models/vendor.model';
import { Warehouse } from '../../models/warehouse.model';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let formBuilder: FormBuilder;
  let testFormGroup: FormGroup;

  const mockVendors: Vendor[] = [
    { id: '1', name: 'Vendor A', code: 'VA', email: 'vendora@test.com' },
    { id: '2', name: 'Vendor B', code: 'VB', email: 'vendorb@test.com' }
  ];

  const mockWarehouses: Warehouse[] = [
    { id: '1', name: 'Warehouse 1', code: 'WH1' },
    { id: '2', name: 'Warehouse 2', code: 'WH2' }
  ];

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new OrderFormComponent();

    // Create a test form group
    testFormGroup = formBuilder.group({
      vendor_id: ['', Validators.required],
      purpose: ['', Validators.required],
      warehouse_id: ['', Validators.required],
      tentative_receipt_date: ['', Validators.required]
    });

    component.formGroup = testFormGroup;
    component.vendors = mockVendors;
    component.warehouses = mockWarehouses;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Inputs', () => {
    it('should accept formGroup input', () => {
      expect(component.formGroup).toBe(testFormGroup);
    });

    it('should accept vendors input', () => {
      expect(component.vendors).toEqual(mockVendors);
      expect(component.vendors.length).toBe(2);
    });

    it('should accept warehouses input', () => {
      expect(component.warehouses).toEqual(mockWarehouses);
      expect(component.warehouses.length).toBe(2);
    });

    it('should have empty arrays as default for vendors and warehouses', () => {
      const newComponent = new OrderFormComponent();
      expect(newComponent.vendors).toEqual([]);
      expect(newComponent.warehouses).toEqual([]);
    });
  });

  describe('Validation Error Messages', () => {
    it('should return error message when vendor field is invalid and touched', () => {
      const vendorControl = testFormGroup.get('vendor_id');
      vendorControl?.markAsTouched();
      vendorControl?.setValue('');

      const error = component.getFieldError('vendor_id');
      expect(error).toBe('Proveedor es requerido');
    });

    it('should return error message when warehouse field is invalid and touched', () => {
      const warehouseControl = testFormGroup.get('warehouse_id');
      warehouseControl?.markAsTouched();
      warehouseControl?.setValue('');

      const error = component.getFieldError('warehouse_id');
      expect(error).toBe('Almacén es requerido');
    });

    it('should return error message when purpose field is invalid and touched', () => {
      const purposeControl = testFormGroup.get('purpose');
      purposeControl?.markAsTouched();
      purposeControl?.setValue('');

      const error = component.getFieldError('purpose');
      expect(error).toBe('Propósito es requerido');
    });

    it('should return error message when date field is invalid and touched', () => {
      const dateControl = testFormGroup.get('tentative_receipt_date');
      dateControl?.markAsTouched();
      dateControl?.setValue('');

      const error = component.getFieldError('tentative_receipt_date');
      expect(error).toBe('Fecha tentativa de recepción es requerida');
    });

    it('should return null when fields are valid', () => {
      testFormGroup.patchValue({
        vendor_id: '1',
        purpose: 'Test purpose',
        warehouse_id: '1',
        tentative_receipt_date: '2024-12-31'
      });

      expect(component.getFieldError('vendor_id')).toBeNull();
      expect(component.getFieldError('warehouse_id')).toBeNull();
      expect(component.getFieldError('purpose')).toBeNull();
      expect(component.getFieldError('tentative_receipt_date')).toBeNull();
    });

    it('should return null when fields are invalid but not touched', () => {
      testFormGroup.patchValue({
        vendor_id: '',
        purpose: '',
        warehouse_id: '',
        tentative_receipt_date: ''
      });

      expect(component.getFieldError('vendor_id')).toBeNull();
      expect(component.getFieldError('warehouse_id')).toBeNull();
      expect(component.getFieldError('purpose')).toBeNull();
      expect(component.getFieldError('tentative_receipt_date')).toBeNull();
    });
  });

  describe('Form Integration', () => {
    it('should work with reactive form group', () => {
      expect(component.formGroup).toBeDefined();
      expect(component.formGroup.get('vendor_id')).toBeDefined();
      expect(component.formGroup.get('warehouse_id')).toBeDefined();
      expect(component.formGroup.get('purpose')).toBeDefined();
      expect(component.formGroup.get('tentative_receipt_date')).toBeDefined();
    });

    it('should reflect form validity state', () => {
      expect(testFormGroup.invalid).toBe(true);

      testFormGroup.patchValue({
        vendor_id: '1',
        purpose: 'Test purpose',
        warehouse_id: '1',
        tentative_receipt_date: '2024-12-31'
      });

      expect(testFormGroup.valid).toBe(true);
    });

    it('should update form when values change', () => {
      testFormGroup.patchValue({
        vendor_id: '1',
        warehouse_id: '2',
        purpose: 'Updated purpose',
        tentative_receipt_date: '2024-12-25'
      });

      expect(testFormGroup.get('vendor_id')?.value).toBe('1');
      expect(testFormGroup.get('warehouse_id')?.value).toBe('2');
      expect(testFormGroup.get('purpose')?.value).toBe('Updated purpose');
      expect(testFormGroup.get('tentative_receipt_date')?.value).toBe('2024-12-25');
    });

    it('should handle partial form updates', () => {
      testFormGroup.patchValue({
        vendor_id: '1'
      });

      expect(testFormGroup.get('vendor_id')?.value).toBe('1');
      expect(testFormGroup.get('warehouse_id')?.value).toBe('');
      expect(testFormGroup.invalid).toBe(true);
    });
  });
});

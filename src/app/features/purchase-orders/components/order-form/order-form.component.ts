import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Vendor } from '../../models/vendor.model';
import { Warehouse } from '../../models/warehouse.model';
import { getErrorMessage } from '../../utils/order-validators';

/**
 * OrderFormComponent
 * 
 * Presentational component for the general order information form fields.
 * Handles vendor selection, purpose input, warehouse selection, and tentative receipt date.
 * 
 * @Input formGroup - The reactive form group containing order fields
 * @Input vendors - List of available vendors for dropdown
 * @Input warehouses - List of available warehouses for dropdown
 */
@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() vendors: Vendor[] = [];
  @Input() warehouses: Warehouse[] = [];

  /**
   * Get error message for a form field
   */
  getFieldError(fieldName: string): string | null {
    return getErrorMessage(this.formGroup.get(fieldName), fieldName);
  }
}

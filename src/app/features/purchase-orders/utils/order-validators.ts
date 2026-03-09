import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validate quantity - must be > 0
 */
export function validateQuantity(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    if (value <= 0) {
      return { invalidQuantity: { message: 'La cantidad debe ser mayor a cero' } };
    }
    
    return null;
  };
}

/**
 * Validate price - must be >= 0
 */
export function validatePrice(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    if (value < 0) {
      return { invalidPrice: { message: 'El precio debe ser mayor o igual a cero' } };
    }
    
    return null;
  };
}

/**
 * Validate tax percentage - must be 0-100
 */
export function validateTaxPercentage(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    if (value < 0 || value > 100) {
      return { invalidTaxPercentage: { message: 'Los porcentajes deben estar entre 0 y 100' } };
    }
    
    return null;
  };
}

/**
 * Validate line items - must have at least 1 item
 */
export function validateLineItems(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const lineItems = control.value;
    
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return { noLineItems: { message: 'Debe agregar al menos un producto' } };
    }
    
    return null;
  };
}

/**
 * Validate payment amount - must be > 0 and <= remaining
 */
export function validatePaymentAmount(remainingAmount: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    if (value <= 0) {
      return { invalidPaymentAmount: { message: 'El monto debe ser mayor a cero' } };
    }
    
    if (value > remainingAmount) {
      return { 
        exceedsRemaining: { 
          message: `El monto no puede exceder el saldo pendiente de ${remainingAmount}` 
        } 
      };
    }
    
    return null;
  };
}

/**
 * Get error message for a form control
 */
export function getErrorMessage(control: AbstractControl | null, fieldName: string): string | null {
  if (!control || !control.errors || !control.touched) {
    return null;
  }

  const errors = control.errors;

  if (errors['required']) {
    return getRequiredErrorMessage(fieldName);
  }

  if (errors['invalidQuantity']) {
    return errors['invalidQuantity'].message;
  }

  if (errors['invalidPrice']) {
    return errors['invalidPrice'].message;
  }

  if (errors['invalidTaxPercentage']) {
    return errors['invalidTaxPercentage'].message;
  }

  if (errors['noLineItems']) {
    return errors['noLineItems'].message;
  }

  if (errors['invalidPaymentAmount']) {
    return errors['invalidPaymentAmount'].message;
  }

  if (errors['exceedsRemaining']) {
    return errors['exceedsRemaining'].message;
  }

  if (errors['min']) {
    return `El valor mínimo es ${errors['min'].min}`;
  }

  if (errors['max']) {
    return `El valor máximo es ${errors['max'].max}`;
  }

  return 'Campo inválido';
}

/**
 * Get required error message based on field name
 */
function getRequiredErrorMessage(fieldName: string): string {
  const messages: Record<string, string> = {
    'vendor_id': 'Proveedor es requerido',
    'warehouse_id': 'Almacén es requerido',
    'tentative_receipt_date': 'Fecha tentativa de recepción es requerida',
    'purpose': 'Propósito es requerido',
    'product_id': 'Producto es requerido',
    'uom_id': 'Unidad de medida es requerida',
    'quantity': 'Cantidad es requerida',
    'unit_price': 'Precio unitario es requerido',
    'amount': 'Monto es requerido',
    'payment_date': 'Fecha de pago es requerida',
    'payment_method': 'Método de pago es requerido',
    'reason': 'Razón de cancelación es requerida'
  };
  
  return messages[fieldName] || 'Este campo es requerido';
}

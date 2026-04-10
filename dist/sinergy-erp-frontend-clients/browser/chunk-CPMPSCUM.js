// src/app/features/purchase-orders/utils/order-validators.ts
function validateQuantity() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value <= 0) {
      return { invalidQuantity: { message: "La cantidad debe ser mayor a cero" } };
    }
    return null;
  };
}
function validatePrice() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value < 0) {
      return { invalidPrice: { message: "El precio debe ser mayor o igual a cero" } };
    }
    return null;
  };
}
function validateTaxPercentage() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value < 0 || value > 100) {
      return { invalidTaxPercentage: { message: "Los porcentajes deben estar entre 0 y 100" } };
    }
    return null;
  };
}
function getErrorMessage(control, fieldName) {
  if (!control || !control.errors || !control.touched) {
    return null;
  }
  const errors = control.errors;
  if (errors["required"]) {
    return getRequiredErrorMessage(fieldName);
  }
  if (errors["invalidQuantity"]) {
    return errors["invalidQuantity"].message;
  }
  if (errors["invalidPrice"]) {
    return errors["invalidPrice"].message;
  }
  if (errors["invalidTaxPercentage"]) {
    return errors["invalidTaxPercentage"].message;
  }
  if (errors["noLineItems"]) {
    return errors["noLineItems"].message;
  }
  if (errors["invalidPaymentAmount"]) {
    return errors["invalidPaymentAmount"].message;
  }
  if (errors["exceedsRemaining"]) {
    return errors["exceedsRemaining"].message;
  }
  if (errors["min"]) {
    return `El valor m\xEDnimo es ${errors["min"].min}`;
  }
  if (errors["max"]) {
    return `El valor m\xE1ximo es ${errors["max"].max}`;
  }
  return "Campo inv\xE1lido";
}
function getRequiredErrorMessage(fieldName) {
  const messages = {
    "vendor_id": "Proveedor es requerido",
    "warehouse_id": "Almac\xE9n es requerido",
    "tentative_receipt_date": "Fecha tentativa de recepci\xF3n es requerida",
    "purpose": "Prop\xF3sito es requerido",
    "product_id": "Producto es requerido",
    "uom_id": "Unidad de medida es requerida",
    "quantity": "Cantidad es requerida",
    "unit_price": "Precio unitario es requerido",
    "amount": "Monto es requerido",
    "payment_date": "Fecha de pago es requerida",
    "payment_method": "M\xE9todo de pago es requerido",
    "reason": "Raz\xF3n de cancelaci\xF3n es requerida"
  };
  return messages[fieldName] || "Este campo es requerido";
}

export {
  validateQuantity,
  validatePrice,
  validateTaxPercentage,
  getErrorMessage
};
//# sourceMappingURL=chunk-CPMPSCUM.js.map

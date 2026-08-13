import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Prefijo de folio de lote: 1–10 letras/números, sin guiones. */
export const DOCUMENT_PREFIX_MAX_LENGTH = 10;
export const DOCUMENT_PREFIX_PATTERN = /^[A-Z0-9]{1,10}$/;
export const DOCUMENT_PREFIX_ERROR =
  'El prefijo solo admite letras y números (máx. 10), sin guiones. Ejemplo: MZN';

export function documentPrefixValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = String(control.value ?? '').trim();
    if (!raw) {
      return null;
    }
    if (!DOCUMENT_PREFIX_PATTERN.test(raw.toUpperCase())) {
      return { documentPrefix: true };
    }
    return null;
  };
}

export function normalizeDocumentPrefix(value: unknown): string | null {
  const normalized = String(value ?? '').trim().toUpperCase();
  return normalized || null;
}

export function uppercasePrefixControl(control: AbstractControl | null): void {
  if (!control) {
    return;
  }
  const normalized = String(control.value ?? '').trim().toUpperCase();
  if (control.value !== normalized) {
    control.setValue(normalized, { emitEvent: false });
  }
}

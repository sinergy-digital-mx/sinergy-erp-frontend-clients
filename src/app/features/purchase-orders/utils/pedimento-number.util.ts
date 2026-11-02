import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Anexo 22: 2 año + 2 aduana + 4 patente + 1 dígito de año + 6 consecutivos. */
export const PEDIMENTO_DIGIT_COUNT = 15;
export const PEDIMENTO_INPUT_MAX_LENGTH = 32;
export const PEDIMENTO_MASK_PLACEHOLDER = '00  00  0000  0000000';
export const PEDIMENTO_FORMATTED_EXAMPLE = '26  47  3807  6000123';
/** Dos espacios que el HTML no colapsa, solo para textos de ayuda. */
const PEDIMENTO_EXAMPLE_LABEL = '26\u00a0\u00a047\u00a0\u00a03807\u00a0\u00a06000123';

export const PEDIMENTO_FORMAT_ERROR =
  `El pedimento debe tener 15 dígitos con el formato del SAT: año (2), aduana (2), patente (4) y numeración (7). Ejemplo: ${PEDIMENTO_EXAMPLE_LABEL}.`;

export const PEDIMENTO_YEAR_DIGIT_ERROR =
  'El dígito de año del pedimento debe ser el último dígito del año de validación, o el del año anterior si es un consolidado.';

export const PEDIMENTO_SEQUENCE_ERROR =
  'La numeración progresiva del pedimento debe iniciar en 000001.';

export const PEDIMENTO_HINT =
  `Año, aduana, patente y numeración. Ejemplo: ${PEDIMENTO_EXAMPLE_LABEL}. Vacío si aún no hay pedimento.`;

export interface ParsedPedimento {
  valid: boolean;
  empty: boolean;
  formatted: string | null;
  message: string | null;
}

export function pedimentoDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/** Pinta `AA  AA  PPPP  ANNNNNN`. Recorta a 15 dígitos. */
export function formatPedimentoMask(value: string): string {
  const digits = pedimentoDigits(value).slice(0, PEDIMENTO_DIGIT_COUNT);
  const groups: string[] = [];
  if (digits.length > 0) {
    groups.push(digits.slice(0, Math.min(2, digits.length)));
  }
  if (digits.length > 2) {
    groups.push(digits.slice(2, Math.min(4, digits.length)));
  }
  if (digits.length > 4) {
    groups.push(digits.slice(4, Math.min(8, digits.length)));
  }
  if (digits.length > 8) {
    groups.push(digits.slice(8));
  }
  return groups.join('  ');
}

export function pedimentoMaskCursor(formatted: string, digitsBefore: number): number {
  if (digitsBefore <= 0) {
    return 0;
  }
  let seen = 0;
  for (let index = 0; index < formatted.length; index++) {
    const char = formatted[index];
    if (char >= '0' && char <= '9') {
      seen++;
      if (seen === digitsBefore) {
        return index + 1;
      }
    }
  }
  return formatted.length;
}

export function applyPedimentoMask(raw: string, cursor: number): { value: string; cursor: number } {
  const digitsBefore = raw.slice(0, Math.max(0, cursor)).replace(/\D/g, '').length;
  const value = formatPedimentoMask(raw);
  return { value, cursor: pedimentoMaskCursor(value, digitsBefore) };
}

export function formatPedimentoForDisplay(value?: string | null): string | null {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) {
    return null;
  }
  if (/[^\d\s-]/.test(trimmed)) {
    return trimmed;
  }
  const digits = pedimentoDigits(trimmed);
  if (digits.length !== PEDIMENTO_DIGIT_COUNT) {
    return trimmed;
  }
  return formatPedimentoMask(digits);
}

export function parsePedimentoNumber(value: unknown): ParsedPedimento {
  if (value === null || value === undefined) {
    return { valid: true, empty: true, formatted: null, message: null };
  }
  const raw = String(value).trim();
  if (!raw) {
    return { valid: true, empty: true, formatted: null, message: null };
  }
  if (/[^\d\s-]/.test(raw)) {
    return { valid: false, empty: false, formatted: null, message: PEDIMENTO_FORMAT_ERROR };
  }
  const digits = pedimentoDigits(raw);
  if (digits.length !== PEDIMENTO_DIGIT_COUNT) {
    return { valid: false, empty: false, formatted: null, message: PEDIMENTO_FORMAT_ERROR };
  }

  const year = Number(digits.slice(0, 2));
  const marker = digits[8];
  const yearLast = String(year % 10);
  const previousLast = String((year + 9) % 10);
  if (marker !== yearLast && marker !== previousLast) {
    return {
      valid: false,
      empty: false,
      formatted: null,
      message: PEDIMENTO_YEAR_DIGIT_ERROR,
    };
  }

  if (digits.slice(9) === '000000') {
    return {
      valid: false,
      empty: false,
      formatted: null,
      message: PEDIMENTO_SEQUENCE_ERROR,
    };
  }

  return {
    valid: true,
    empty: false,
    formatted: formatPedimentoMask(digits),
    message: null,
  };
}

/** Valor inicial del input: máscara si son dígitos; si no, el texto para que se vea el error. */
export function pedimentoInputValue(value?: string | null): string {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return '';
  }
  if (/[^\d\s-]/.test(trimmed)) {
    return trimmed;
  }
  return formatPedimentoMask(trimmed);
}

export function pedimentoNumberValidator(control: AbstractControl): ValidationErrors | null {
  const parsed = parsePedimentoNumber(control.value);
  if (parsed.valid) {
    return null;
  }
  return { pedimentoFormat: { message: parsed.message ?? PEDIMENTO_FORMAT_ERROR } };
}

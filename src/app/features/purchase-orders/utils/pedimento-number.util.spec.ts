import { FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import {
  applyPedimentoMask,
  formatPedimentoForDisplay,
  parsePedimentoNumber,
  pedimentoInputValue,
  pedimentoNumberValidator,
} from './pedimento-number.util';

describe('pedimento-number.util', () => {
  it('inserta los dos espacios al cruzar cada grupo y deja el cursor en el dígito', () => {
    expect(applyPedimentoMask('264', 3)).toEqual({ value: '26  4', cursor: 5 });
    expect(applyPedimentoMask('264738076', 9)).toEqual({ value: '26  47  3807  6', cursor: 15 });
    expect(applyPedimentoMask('26  40  3591  6004274', 21)).toEqual({
      value: '26  40  3591  6004274',
      cursor: 21,
    });
  });

  it('acepta el formato completo, el consolidado y el vacío', () => {
    expect(parsePedimentoNumber('').valid).toBe(true);
    expect(parsePedimentoNumber('264738076000123')).toEqual({
      valid: true,
      empty: false,
      formatted: '26  47  3807  6000123',
      message: null,
    });
    expect(parsePedimentoNumber('26  47  3807  5000123').valid).toBe(true);
    expect(pedimentoNumberValidator(new FormControl('26  40  3591  6004274'))).toBeNull();
    expect(pedimentoNumberValidator(new FormControl(''))).toBeNull();
  });

  it('bloquea un pedimento incompleto, con letras o con el dígito de año mal', () => {
    expect(parsePedimentoNumber('26  47').valid).toBe(false);
    expect(parsePedimentoNumber('ABC').message).toContain('15 dígitos');
    expect(parsePedimentoNumber('26  47  3807  4000123').message).toContain('dígito de año');
    expect(parsePedimentoNumber('26  47  3807  6000000').message).toContain('000001');
    expect(pedimentoNumberValidator(new FormControl('26  47'))?.['pedimentoFormat'].message).toContain(
      '15 dígitos',
    );
  });

  it('prepara el input y la lectura', () => {
    expect(pedimentoInputValue('264738076000123')).toBe('26  47  3807  6000123');
    expect(pedimentoInputValue('NOTA')).toBe('NOTA');
    expect(formatPedimentoForDisplay('162430010001234')).toBe('16  24  3001  0001234');
    expect(formatPedimentoForDisplay(null)).toBeNull();
  });
});

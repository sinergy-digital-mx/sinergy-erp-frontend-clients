import { formatUnitAmount, formatUnitCurrency } from './unit-money.util';

describe('formatUnitAmount', () => {
  it('no convierte 2.150 en 2.2', () => {
    expect(formatUnitAmount(2.15)).toBe('2.15');
    expect(formatUnitAmount(2.15)).not.toContain('2.2');
  });

  it('conserva 2.215 sin redondear a 2.22', () => {
    expect(formatUnitAmount(2.215)).toBe('2.215');
  });
});

describe('formatUnitCurrency', () => {
  it('muestra hasta 4 decimales en POS/OV', () => {
    expect(formatUnitCurrency(2.215)).toContain('2.215');
    expect(formatUnitCurrency(2.15)).toContain('2.15');
  });
});

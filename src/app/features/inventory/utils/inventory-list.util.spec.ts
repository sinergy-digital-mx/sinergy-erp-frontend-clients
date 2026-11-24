import { describe, expect, it } from 'vitest';
import { inventoryFiscalFromQuery, inventoryPageFromQuery } from './inventory-list.util';

describe('filtros de inventario en la URL', () => {
  it('distingue todas las razones sociales de una razón elegida', () => {
    expect(inventoryFiscalFromQuery(null)).toBeNull();
    expect(inventoryFiscalFromQuery('all')).toBe('all');
    expect(inventoryFiscalFromQuery('  ')).toBe('all');
    expect(inventoryFiscalFromQuery('fiscal-1')).toBe('fiscal-1');
  });

  it('la página 1 no se guarda', () => {
    expect(inventoryPageFromQuery(null)).toBe(1);
    expect(inventoryPageFromQuery('1')).toBe(1);
    expect(inventoryPageFromQuery('4')).toBe(4);
  });
});

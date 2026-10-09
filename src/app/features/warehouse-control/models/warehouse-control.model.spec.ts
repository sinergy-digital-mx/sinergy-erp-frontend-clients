import { describe, expect, it } from 'vitest';
import {
  matchesPickPosition,
  matchesPickStatus,
  resolveWarehouseControlView,
  salesQtyToBase,
} from './warehouse-control.model';

describe('resolveWarehouseControlView', () => {
  it('Admin sin almacenes ve tablero admin', () => {
    expect(resolveWarehouseControlView([], true)).toBe('admin');
  });

  it('Jefe con almacenes ve warehouse', () => {
    expect(resolveWarehouseControlView([{ id: 'w1' }], false)).toBe('warehouse');
  });

  it('Admin con almacenes puede pedir view=warehouse', () => {
    expect(resolveWarehouseControlView([{ id: 'w1' }], true, 'warehouse')).toBe('warehouse');
  });

  it('Sin almacenes no puede forzar warehouse', () => {
    expect(resolveWarehouseControlView([], false, 'warehouse')).toBe('admin');
  });
});

describe('filtros de surtido del jefe', () => {
  it('filtra por estado de la tarea', () => {
    expect(matchesPickStatus('pending', 'all')).toBe(true);
    expect(matchesPickStatus('in_progress', 'in_progress')).toBe(true);
    expect(matchesPickStatus('pending', 'picked')).toBe(false);
  });

  it('filtra por posición y por sin posición', () => {
    expect(matchesPickPosition('B6', 'all')).toBe(true);
    expect(matchesPickPosition('B6', 'B6')).toBe(true);
    expect(matchesPickPosition('', 'none')).toBe(true);
    expect(matchesPickPosition('A1', 'none')).toBe(false);
  });
});

describe('salesQtyToBase', () => {
  it('convierte la UOM de la OV a la base que pide complete', () => {
    expect(salesQtyToBase({ id: 'l1', quantity: 2, quantity_base_ordered: 2000 }, 1)).toBe(1000);
  });

  it('deja igual cuando pedido y base coinciden', () => {
    expect(salesQtyToBase({ id: 'l1', quantity: 8, quantity_base_ordered: 8 }, 8)).toBe(8);
  });
});

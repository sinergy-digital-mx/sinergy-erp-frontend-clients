import { describe, expect, it } from 'vitest';
import { resolveWarehouseControlView } from './warehouse-control.model';

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

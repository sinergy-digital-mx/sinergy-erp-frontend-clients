import { describe, expect, it } from 'vitest';
import {
  filterWarehouseLookups,
  flattenPurchaseOrderWarehouses,
  unwrapPurchaseOrderLocations,
  warehouseLookupLabel,
} from './purchase-order-location.util';

describe('purchase-order-location.util', () => {
  const tree = [
    {
      id: 'fiscal-1',
      razon_social: 'MADERERIA ZONA NORTE',
      rfc: 'MZN010101XXX',
      status: 'active',
      branches: [
        {
          id: 'branch-1',
          name: 'Ensenada',
          status: 1,
          warehouses: [{ id: 'wh-1', name: 'CEDIS Bodega Ensenada', status: 'active' }],
        },
      ],
    },
  ];

  it('aplana almacenes con su razón y sucursal', () => {
    const items = flattenPurchaseOrderWarehouses(tree, [
      { id: 'wh-2', name: 'Bodega suelta', status: 'active' },
    ]);
    expect(items[0].assigned).toBe(false);
    expect(items[1]).toMatchObject({
      id: 'wh-1',
      branchName: 'Ensenada',
      fiscalName: 'MADERERIA ZONA NORTE',
      assigned: true,
    });
  });

  it('filtra por nombre de almacén o sucursal', () => {
    const items = flattenPurchaseOrderWarehouses(tree);
    expect(filterWarehouseLookups(items, 'ensenada')).toHaveLength(1);
    expect(filterWarehouseLookups(items, 'tijuana')).toHaveLength(0);
  });

  it('marca almacenes sin sucursal en el label', () => {
    expect(
      warehouseLookupLabel({
        id: 'wh-2',
        name: 'CEDIS Bodega Ensenada',
        status: 'active',
        fiscalId: null,
        fiscalName: '',
        branchId: null,
        branchName: '',
        assigned: false,
      }),
    ).toBe('CEDIS Bodega Ensenada (sin sucursal)');
  });

  it('desenvuelve data y unassigned_warehouses', () => {
    const res = unwrapPurchaseOrderLocations({
      data: tree,
      unassigned_warehouses: [{ id: 'wh-2', name: 'Suelta', status: 'active' }],
    });
    expect(res.data).toHaveLength(1);
    expect(res.unassigned_warehouses).toHaveLength(1);
  });
});

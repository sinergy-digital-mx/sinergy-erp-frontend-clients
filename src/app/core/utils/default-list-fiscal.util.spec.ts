import { defaultListFiscalConfigurationId, defaultListLocation } from './default-list-fiscal.util';

describe('defaultListFiscalConfigurationId', () => {
  const branches = [
    { id: 'cedis', fiscal_configuration_id: 'rfc-cedis' },
    { id: 'centro', is_primary: true, fiscal_configuration_id: 'rfc-centro' },
  ];

  it('usa la razón social de la sucursal principal', () => {
    expect(defaultListFiscalConfigurationId(branches, 'centro', 'rfc-cedis')).toBe('rfc-centro');
    expect(defaultListFiscalConfigurationId(branches, null, null)).toBe('rfc-centro');
  });

  it('respeta el id de sucursal principal aunque el flag no coincida', () => {
    expect(defaultListFiscalConfigurationId(branches, 'cedis', null)).toBe('rfc-cedis');
  });

  it('sin sucursales asignadas usa la razón de la sucursal activa', () => {
    expect(defaultListFiscalConfigurationId([], null, 'rfc-activa')).toBe('rfc-activa');
    expect(defaultListFiscalConfigurationId([], null, '  ')).toBeNull();
  });

  it('también devuelve la sucursal principal', () => {
    expect(defaultListLocation(branches, 'centro', 'cedis', 'rfc-cedis')).toEqual({
      fiscalConfigurationId: 'rfc-centro',
      billingBranchId: 'centro',
    });
    expect(defaultListLocation([], null, 'cedis', 'rfc-cedis')).toEqual({
      fiscalConfigurationId: 'rfc-cedis',
      billingBranchId: 'cedis',
    });
  });
});

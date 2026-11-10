export interface BranchFiscalRef {
  id: string;
  is_primary?: boolean;
  fiscal_configuration_id?: string | null;
}

export interface DefaultListLocation {
  fiscalConfigurationId: string | null;
  billingBranchId: string | null;
}

/**
 * Sucursal principal del usuario y su razón social.
 * Si no hay sucursales asignadas, usa la sucursal activa.
 */
export function defaultListLocation(
  branches: BranchFiscalRef[],
  primaryBranchId: string | null | undefined,
  activeBranchId: string | null | undefined,
  activeBranchFiscalId: string | null | undefined,
): DefaultListLocation {
  const primary =
    (primaryBranchId ? branches.find((branch) => branch.id === primaryBranchId) : undefined) ??
    branches.find((branch) => branch.is_primary) ??
    (branches.length === 1 ? branches[0] : undefined);

  if (primary) {
    return {
      fiscalConfigurationId: primary.fiscal_configuration_id?.trim() || null,
      billingBranchId: primary.id,
    };
  }
  if (branches.length > 0) {
    return { fiscalConfigurationId: null, billingBranchId: null };
  }

  return {
    fiscalConfigurationId: activeBranchFiscalId?.trim() || null,
    billingBranchId: activeBranchId?.trim() || null,
  };
}

export function defaultListFiscalConfigurationId(
  branches: BranchFiscalRef[],
  primaryBranchId: string | null | undefined,
  activeBranchFiscalId: string | null | undefined,
): string | null {
  return defaultListLocation(branches, primaryBranchId, null, activeBranchFiscalId).fiscalConfigurationId;
}

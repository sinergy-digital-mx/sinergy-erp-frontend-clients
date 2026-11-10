export interface BranchFiscalRef {
  id: string;
  is_primary?: boolean;
  fiscal_configuration_id?: string | null;
}

/**
 * Razón social de la sucursal principal del usuario.
 * Si no hay sucursales asignadas, usa la de su sucursal activa.
 */
export function defaultListFiscalConfigurationId(
  branches: BranchFiscalRef[],
  primaryBranchId: string | null | undefined,
  activeBranchFiscalId: string | null | undefined,
): string | null {
  const primary =
    (primaryBranchId ? branches.find((branch) => branch.id === primaryBranchId) : undefined) ??
    branches.find((branch) => branch.is_primary) ??
    (branches.length === 1 ? branches[0] : undefined);

  const fromBranch = primary?.fiscal_configuration_id?.trim();
  if (fromBranch) return fromBranch;
  if (branches.length > 0) return null;

  const fallback = activeBranchFiscalId?.trim();
  return fallback || null;
}

/** Query cuando el usuario eligió todas las sucursales. Sin parámetro, aplica el default. */
export const ALL_BRANCHES_QUERY = 'all';

export function branchIdFromQuery(raw: string | null | undefined): string {
  const value = raw?.trim() || '';
  return value === ALL_BRANCHES_QUERY ? '' : value;
}

export function branchQueryFromId(branchId: string): string {
  const value = branchId.trim();
  return value || ALL_BRANCHES_QUERY;
}

export function isAllBranchesQuery(raw: string | null | undefined): boolean {
  return (raw?.trim() || '') === ALL_BRANCHES_QUERY;
}

type BranchQueryParams = {
  get(name: string): string | null;
  has(name: string): boolean;
};

/** Sucursal compartida de Cobranza. `billing_branch_id` gana; `debt_branch_id` solo en enlaces viejos. */
export function sharedBranchIdFromParams(params: BranchQueryParams): string {
  if (params.has('billing_branch_id')) return branchIdFromQuery(params.get('billing_branch_id'));
  if (params.has('debt_branch_id')) return branchIdFromQuery(params.get('debt_branch_id'));
  return '';
}

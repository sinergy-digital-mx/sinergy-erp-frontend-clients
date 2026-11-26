import { AuthService } from '../../../core/services/auth.service';
import { TruckQueryParams } from '../models/truck.model';

/** Prefiltra por las sucursales del usuario. `includeOtherBranches` lista toda la flota. */
export function operatorTruckQuery(
  auth: AuthService,
  includeOtherBranches: boolean,
  extra: TruckQueryParams = {},
): TruckQueryParams {
  if (includeOtherBranches) return extra;
  const ids = auth
    .getAssignedBranches()
    .map((row) => row.id)
    .filter((id) => !!id);
  if (!ids.length) return extra;
  return { ...extra, billing_branch_ids: ids.join(',') };
}

export function userHasAssignedBranches(auth: AuthService): boolean {
  return auth.getAssignedBranches().some((row) => !!row.id);
}

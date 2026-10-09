import { isMadereriaZonaNorte } from '../../../core/config/organizations.constants';
import { PURCHASE_ORDER_PERMISSIONS } from '../config/permissions.config';

type RealCostAccess = {
  hasPermission(permission: string): boolean;
  user_info?: { tenant_id?: string | null } | null;
};

/** Tab, lotes, detalle de lote e historial de costo real. */
export function canViewPurchaseOrderRealCost(auth: RealCostAccess): boolean {
  return (
    isMadereriaZonaNorte(auth.user_info?.tenant_id) &&
    auth.hasPermission(PURCHASE_ORDER_PERMISSIONS.viewRealCost)
  );
}

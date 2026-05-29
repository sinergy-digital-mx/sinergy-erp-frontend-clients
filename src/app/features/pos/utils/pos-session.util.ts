import { Observable } from 'rxjs';
import { POSService } from '../services/pos.service';
import { OpenShiftDialogResult, PosSession } from '../models/pos-session.model';

export function persistPosSelection(
  posConfigurationId?: string,
  posConfigurationCode?: string
): void {
  if (posConfigurationId) {
    localStorage.setItem('pos_configuration_id', posConfigurationId);
  } else {
    localStorage.removeItem('pos_configuration_id');
  }
  if (posConfigurationCode) {
    localStorage.setItem('pos_configuration_code', posConfigurationCode);
  } else {
    localStorage.removeItem('pos_configuration_code');
  }
}

export function isPosSessionNotFoundError(error: unknown): boolean {
  const msg = String((error as any)?.error?.message || (error as any)?.message || '').toLowerCase();
  const status = (error as any)?.status;
  return status === 404 || msg.includes('not found') || msg.includes('404') || msg.includes('no existe');
}

export function applyOpenShiftDialogResult(
  result: OpenShiftDialogResult,
  posService: POSService
): Observable<PosSession> {
  localStorage.setItem('pos_warehouse_id', result.warehouse_id);
  persistPosSelection(result.pos_configuration_id, result.pos_configuration_code);

  if (result.action === 'resume') {
    return new Observable((subscriber) => {
      subscriber.next(result.session);
      subscriber.complete();
    });
  }

  return posService.openPosSession({
    warehouse_id: result.warehouse_id,
    cashier_id: '',
    opening_balance: result.opening_balance,
    ...(result.notes?.trim() ? { notes: result.notes.trim() } : {}),
    pos_configuration_id: result.pos_configuration_id,
  });
}

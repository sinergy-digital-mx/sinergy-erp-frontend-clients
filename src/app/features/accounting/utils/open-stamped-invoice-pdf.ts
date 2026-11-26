import { SalesOrderElectronicInvoice } from '../../sales-orders/models/sales-order-electronic-invoice.model';
import { SalesOrderInvoiceService } from '../../sales-orders/services/sales-order-invoice.service';
import { ToastService } from '../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../core/utils/http-error-message.util';

/** Abre el PDF de la factura de ingreso vigente de una orden. */
export function openStampedInvoicePdf(
  invoices: SalesOrderInvoiceService,
  toast: ToastService,
  orderId: string,
  setBusy: (busy: boolean) => void,
  invoiceId?: string | null,
): void {
  if (!orderId) return;
  if (invoiceId) {
    fetchPdf(invoices, toast, orderId, invoiceId, setBusy);
    return;
  }
  setBusy(true);
  invoices.getInvoices(orderId).subscribe({
    next: (list) => {
      const picked = pickInvoiceId(list);
      if (!picked) {
        setBusy(false);
        toast.error('Esta orden no tiene factura');
        return;
      }
      fetchPdf(invoices, toast, orderId, picked, setBusy);
    },
    error: (error) => {
      setBusy(false);
      toast.error(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF de la factura'));
    },
  });
}

function fetchPdf(
  invoices: SalesOrderInvoiceService,
  toast: ToastService,
  orderId: string,
  invoiceId: string,
  setBusy: (busy: boolean) => void,
): void {
  setBusy(true);
  invoices.getInvoicePdf(orderId, invoiceId).subscribe({
    next: (response) => {
      setBusy(false);
      if (!response.signedUrl) {
        toast.error('No se recibió el PDF de la factura');
        return;
      }
      window.open(response.signedUrl, '_blank', 'noopener,noreferrer');
    },
    error: (error) => {
      setBusy(false);
      toast.error(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF de la factura'));
    },
  });
}

function pickInvoiceId(invoices: SalesOrderElectronicInvoice[]): string | null {
  const usable = invoices.filter((invoice) => {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    const role = (invoice.invoice_role || '').toLowerCase();
    return (
      Boolean(invoice.uuid) &&
      (stamp === 'stamped' || stamp === 'cancel_pending') &&
      (role === 'merchandise' || role === 'standard' || role === 'advance' || !role)
    );
  });
  const rank = (role?: string | null) => {
    const value = (role || '').toLowerCase();
    if (value === 'merchandise' || value === 'standard' || !value) return 0;
    if (value === 'advance') return 1;
    return 9;
  };
  usable.sort((left, right) => rank(left.invoice_role) - rank(right.invoice_role));
  return usable[0]?.id || null;
}

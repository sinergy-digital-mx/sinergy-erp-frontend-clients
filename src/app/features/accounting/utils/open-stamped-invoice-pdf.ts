import { MatDialog } from '@angular/material/dialog';
import { SalesOrderElectronicInvoice } from '../../sales-orders/models/sales-order-electronic-invoice.model';
import { SalesOrderInvoiceService } from '../../sales-orders/services/sales-order-invoice.service';
import { ToastService } from '../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../core/utils/http-error-message.util';
import { openInvoicePdfViewer } from '../components/invoice-pdf-viewer-dialog/invoice-pdf-viewer-dialog.component';

/** Abre el PDF de la factura de ingreso vigente de una orden, en un modal. */
export function openStampedInvoicePdf(
  dialog: MatDialog,
  invoices: SalesOrderInvoiceService,
  toast: ToastService,
  orderId: string,
  setBusy: (busy: boolean) => void,
  invoiceId?: string | null,
  title?: string,
): void {
  if (!orderId) return;
  if (invoiceId) {
    fetchPdf(dialog, invoices, toast, orderId, invoiceId, setBusy, title);
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
      fetchPdf(dialog, invoices, toast, orderId, picked, setBusy, title);
    },
    error: (error) => {
      setBusy(false);
      toast.error(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF de la factura'));
    },
  });
}

function fetchPdf(
  dialog: MatDialog,
  invoices: SalesOrderInvoiceService,
  toast: ToastService,
  orderId: string,
  invoiceId: string,
  setBusy: (busy: boolean) => void,
  title?: string,
): void {
  setBusy(true);
  invoices.getInvoicePdf(orderId, invoiceId).subscribe({
    next: (response) => {
      setBusy(false);
      if (!response.signedUrl) {
        toast.error('No se recibió el PDF de la factura');
        return;
      }
      openInvoicePdfViewer(dialog, response.signedUrl, title);
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

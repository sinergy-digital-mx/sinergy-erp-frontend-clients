import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuotationService } from '../../services/quotation.service';
import {
  Quotation,
  QuotationDetailPayload,
  QuotationDocument,
  QuotationEmail,
  QuotationLineItem,
} from '../../models/quotation.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { formatApiDate } from '../../../../core/utils/api-datetime.util';
import { formatUnitAmount } from '../../../../core/utils/unit-money.util';
import { QUOTATION_PERMISSIONS } from '../../config/permissions.config';
import { EditSalesOrderLineDialogComponent } from '../../../sales-orders/components/edit-sales-order-line-dialog/edit-sales-order-line-dialog.component';
import { AddSalesOrderLineDialogComponent } from '../../../sales-orders/components/add-sales-order-line-dialog/add-sales-order-line-dialog.component';
import { SalesOrderLineItem } from '../../../sales-orders/models/sales-order.model';
import {
  formatTitleCase,
  getSalesOrderListCompanyName,
} from '../../../sales-orders/utils/sales-order-display.util';
import { resolveSalesOrderCustomerName } from '../../../sales-orders/utils/customer-display.util';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import {
  getSalesOrderDocumentChipLabel,
  getSalesOrderDocumentKind,
} from '../../../sales-orders/utils/sales-order-document.util';
import {
  QuotationNotesDialogComponent,
  QuotationNotesDialogResult,
} from '../quotation-notes-dialog/quotation-notes-dialog.component';
import { AdvanceInvoiceDialogComponent } from '../../../sales-orders/components/advance-invoice-dialog/advance-invoice-dialog.component';

@Component({
  selector: 'app-quotation-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, RemoveTrailingZerosPipe, SpinnerComponent],
  templateUrl: './quotation-detail-dialog.component.html',
  styleUrls: [
    '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.scss',
    './quotation-detail-dialog.component.scss',
  ],
  host: {
    class: 'order-detail-dialog-container',
  },
})
export class QuotationDetailDialogComponent implements OnInit {
  loading = signal(true);
  refreshing = signal(false);
  converting = signal(false);
  cancelling = signal(false);
  regeneratingPDF = signal(false);
  sendingEmail = signal(false);
  activeTabIndex = signal(0);
  header = signal<Quotation | null>(null);
  lineItems = signal<QuotationLineItem[]>([]);
  documents = signal<QuotationDocument[]>([]);
  emails = signal<QuotationEmail[]>([]);
  discountSummary = signal<QuotationDetailPayload['discount_summary'] | null>(null);
  emailTo = '';
  emailCc = '';
  emailSubject = '';
  emailMessage = '';
  canConvertPerm = false;
  canCancelPerm = false;
  canUpdate = false;
  canSendPerm = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { quotationId: string },
    private dialogRef: MatDialogRef<QuotationDetailDialogComponent>,
    private dialog: MatDialog,
    private quotationService: QuotationService,
    private auth: AuthService,
    private toast: ToastService,
    private taxCalculator: TaxCalculatorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.canConvertPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.convert);
    this.canCancelPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.delete);
    this.canUpdate = this.auth.hasPermission(QUOTATION_PERMISSIONS.update);
    this.canSendPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.send);
    this.reload();
  }

  reload(silent = false): void {
    if (silent) {
      this.refreshing.set(true);
    } else {
      this.loading.set(true);
    }
    this.quotationService.getDetail(this.data.quotationId).subscribe({
      next: (payload) => {
        this.applyPayload(payload);
        this.loading.set(false);
        this.refreshing.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.refreshing.set(false);
        this.toast.error('No se pudo cargar la cotización');
      },
    });
  }

  private applyPayload(payload: QuotationDetailPayload): void {
    this.header.set(payload.header);
    this.lineItems.set(payload.line_items || []);
    this.documents.set(payload.documents || []);
    this.emails.set(payload.emails || []);
    this.discountSummary.set(payload.discount_summary ?? null);
    const header = payload.header;
    if (!this.emailTo) {
      this.emailTo = header?.customer_email || header?.customer?.email || '';
    }
    if (!this.emailSubject && header?.folio) {
      this.emailSubject = `Cotización ${header.folio}`;
    }
    if (!this.emailMessage && header?.folio) {
      this.emailMessage = `Adjuntamos la cotización ${header.folio}.`;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  parseNumber(value: number | string | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  formatCurrency(value: number | string | undefined | null): string {
    return this.taxCalculator.formatCurrency(this.parseNumber(value));
  }

  formatShortDate(value?: string | null): string {
    return formatApiDate(value, 'month-day');
  }

  getStatusBadgeClass(): string {
    const status = this.header()?.general_status ?? '';
    if (status === 'Convertida') return 'status-badge--success';
    if (status === 'Creada') return 'status-badge--info';
    if (status === 'Cancelada') return 'status-badge--danger';
    return 'status-badge--neutral';
  }

  getRazonSocialDisplayName(): string {
    const q = this.header();
    const value = q?.razon_social ?? q?.fiscal_configuration?.razon_social ?? q?.fiscal_razon_social;
    if (!value?.trim()) return '—';
    return formatTitleCase(value.trim());
  }

  getRazonSocialSubtitle(): string {
    return this.header()?.fiscal_configuration?.rfc?.trim() || '';
  }

  getSucursalDisplayName(): string {
    const q = this.header();
    const value = q?.sucursal ?? q?.billing_branch?.code;
    if (!value?.trim()) return '—';
    return formatTitleCase(value.trim());
  }

  getSucursalSubtitle(): string {
    const branch = this.header()?.billing_branch;
    if (!branch) return '';
    return [branch.city, branch.state].filter(Boolean).join(', ');
  }

  getCustomerDisplayName(): string {
    return formatTitleCase(resolveSalesOrderCustomerName(this.header() as any));
  }

  getCustomerCompanyName(): string {
    return getSalesOrderListCompanyName(this.header() as any);
  }

  getSellerDisplayName(): string {
    return formatPosUser(this.header()?.seller_user ?? undefined);
  }

  getAssignedSellerDisplayName(): string {
    const seller = this.header()?.assigned_seller_user;
    return seller ? formatPosUser(seller) : 'Sin comisionado';
  }

  formatPosUserLabel(user: Quotation['terminal_user']): string {
    return formatPosUser(user ?? undefined);
  }

  isPosQuotation(): boolean {
    return this.header()?.quotation_type === 'POS';
  }

  hasLineDiscount(): boolean {
    return this.getLineDiscountAmount() > 0.009;
  }

  hasGlobalDiscount(): boolean {
    return this.getGlobalDiscountAmount() > 0.009;
  }

  globalDiscountLabel(): string {
    return 'Desc. global';
  }

  private getLineDiscountAmount(): number {
    const summary = this.discountSummary();
    if (summary?.line_discount_total != null) {
      return this.parseNumber(summary.line_discount_total);
    }
    const q = this.header();
    return Math.max(this.parseNumber(q?.discount_total) - this.parseNumber(q?.global_discount_amount), 0);
  }

  private getGlobalDiscountAmount(): number {
    const summary = this.discountSummary();
    if (summary?.global_discount_amount != null) {
      return this.parseNumber(summary.global_discount_amount);
    }
    return this.parseNumber(this.header()?.global_discount_amount);
  }

  getDisplayedLineDiscount(): string {
    return this.formatCurrency(-this.getLineDiscountAmount());
  }

  getDisplayedGlobalDiscount(): string {
    return this.formatCurrency(-this.getGlobalDiscountAmount());
  }

  getDisplayedSubtotal(): string {
    return this.formatCurrency(this.header()?.subtotal);
  }

  getDisplayedIva(): string {
    return this.formatCurrency(this.header()?.iva_total);
  }

  getDisplayedIeps(): string {
    return this.formatCurrency(this.header()?.ieps_total);
  }

  getDisplayedTotal(): string {
    return this.formatCurrency(this.header()?.total);
  }

  getLineItemsCount(): number {
    return this.lineItems().length;
  }

  getDocumentsCount(): number {
    return this.documents().length;
  }

  getEmailsCount(): number {
    return this.emails().length;
  }

  canShowSend(): boolean {
    const q = this.header();
    if (!q || !this.canSendPerm) return false;
    if (q.general_status === 'Cancelada') return false;
    return q.can_send !== false;
  }

  sendBlockedReason(): string {
    if (!this.canSendPerm) {
      return 'Tu usuario no tiene el permiso de envío. Cierra sesión y vuelve a entrar para refrescar permisos.';
    }
    if (this.header()?.general_status === 'Cancelada') {
      return 'No se puede enviar una cotización cancelada.';
    }
    return 'No se puede enviar esta cotización.';
  }

  senderLabel(row: QuotationEmail): string {
    return row.sent_by?.display_name || [row.sent_by?.first_name, row.sent_by?.last_name].filter(Boolean).join(' ') || '—';
  }

  sendEmail(): void {
    const q = this.header();
    if (!q || !this.canShowSend() || this.sendingEmail()) return;
    const to = this.emailTo.trim();
    if (!to) {
      this.toast.error('Indica un correo destino');
      return;
    }

    const cc = this.emailCc
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    this.sendingEmail.set(true);
    this.quotationService
      .sendEmail(q.id, {
        to_email: to,
        ...(cc.length ? { cc } : {}),
        subject: this.emailSubject.trim() || undefined,
        message: this.emailMessage.trim() || undefined,
      })
      .subscribe({
        next: (row) => {
          this.sendingEmail.set(false);
          this.emails.update((current) => [row, ...current]);
          this.toast.success(`Cotización enviada a ${row.to_email}`);
        },
        error: (err) => {
          this.sendingEmail.set(false);
          this.toast.error(err?.error?.message || 'No se pudo enviar el correo');
        },
      });
  }

  getLineUom(item: QuotationLineItem): string {
    return item.uom_name || 'Unidad';
  }

  getLineQty(item: QuotationLineItem): number {
    return this.parseNumber(item.quantity);
  }

  canShowConvert(): boolean {
    return this.canConvertPerm && !!this.header()?.can_convert;
  }

  canEditLines = computed(() => {
    const header = this.header();
    if (!this.canUpdate || !header) return false;
    if (typeof header.can_edit_lines === 'boolean') return header.can_edit_lines;
    return !!header.can_edit;
  });

  getPaymentCurrency(): 'MXN' | 'USD' {
    return 'MXN';
  }

  formatAmount(value: number | string | null | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.parseNumber(value));
  }

  formatUnitPrice(value: number | string | null | undefined): string {
    return formatUnitAmount(value);
  }

  hasLineIvaColumn(): boolean {
    return this.lineItems().some(
      (item) => this.parseNumber(item.iva_percentage) > 0 || this.parseNumber(item.line_iva) > 0,
    );
  }

  hasLineIepsColumn(): boolean {
    return this.lineItems().some(
      (item) => this.parseNumber(item.ieps_percentage) > 0 || this.parseNumber(item.line_ieps) > 0,
    );
  }

  hasLineTax(item: QuotationLineItem): boolean {
    return this.getLineIvaAmount(item) > 0 || this.getLineIepsAmount(item) > 0;
  }

  getLineUnitPrice(item: QuotationLineItem): number {
    return this.parseNumber(item.unit_price);
  }

  getLineSubtotal(item: QuotationLineItem): number {
    if (item.line_subtotal != null) {
      return this.parseNumber(item.line_subtotal);
    }
    return this.parseNumber(item.quantity) * this.parseNumber(item.unit_price);
  }

  getLineIvaPercent(item: QuotationLineItem): number {
    return this.parseNumber(item.iva_percentage);
  }

  getLineIvaAmount(item: QuotationLineItem): number {
    if (item.line_iva != null) {
      return this.parseNumber(item.line_iva);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable * (this.getLineIvaPercent(item) / 100);
  }

  getLineIepsPercent(item: QuotationLineItem): number {
    return this.parseNumber(item.ieps_percentage);
  }

  getLineIepsAmount(item: QuotationLineItem): number {
    if (item.line_ieps != null) {
      return this.parseNumber(item.line_ieps);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable * (this.getLineIepsPercent(item) / 100);
  }

  getLineGross(item: QuotationLineItem): number {
    if (item.line_total != null) {
      return this.parseNumber(item.line_total);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable + this.getLineIvaAmount(item) + this.getLineIepsAmount(item);
  }

  getProductsColspan(): number {
    let count = 4;
    if (this.hasLineIvaColumn()) count += 1;
    if (this.hasLineIepsColumn()) count += 1;
    if (this.canEditLines()) count += 1;
    return count;
  }

  getTotalsSnapshot(): { subtotal: number; iva: number; ieps: number; total: number } {
    const header = this.header();
    return {
      subtotal: this.parseNumber(header?.subtotal),
      iva: this.parseNumber(header?.iva_total),
      ieps: this.parseNumber(header?.ieps_total),
      total: this.parseNumber(header?.total),
    };
  }

  private applyLineMutation(updated: QuotationDetailPayload): void {
    this.applyPayload(updated);
  }

  openEditLineItem(item: QuotationLineItem): void {
    const q = this.header();
    if (!q || !item.id || !this.canEditLines()) return;

    this.dialog
      .open(EditSalesOrderLineDialogComponent, {
        width: '460px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          quotationId: q.id,
          folio: q.folio,
          currency: this.getPaymentCurrency(),
          lineItem: item as SalesOrderLineItem,
        },
      })
      .afterClosed()
      .subscribe((updated: QuotationDetailPayload | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Línea actualizada');
      });
  }

  confirmDeleteLineItem(item: QuotationLineItem): void {
    const q = this.header();
    if (!q || !item.id || !this.canEditLines()) return;

    const name = item.product?.name || 'este producto';
    this.dialog
      .open(AlertDialogComponent, {
        width: '420px',
        data: {
          title: 'Eliminar producto',
          message: `¿Eliminar ${name} de esta cotización? Se recalcularán los totales.`,
          type: 'warning',
          text_accept: 'Eliminar',
          text_cancel: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.quotationService.deleteLineItem(q.id, String(item.id)).subscribe({
          next: (updated) => {
            this.applyLineMutation(updated);
            this.toast.success('Producto eliminado');
          },
          error: (error: Error) => {
            this.toast.error(error?.message || 'No se pudo eliminar la línea');
          },
        });
      });
  }

  openAddLineItem(): void {
    const q = this.header();
    if (!q || !this.canEditLines()) return;

    const fiscalId = q.fiscal_configuration_id || q.fiscal_configuration?.id;
    const branchId = q.billing_branch_id || q.billing_branch?.id;
    if (!fiscalId || !branchId) {
      this.toast.error('La cotización no tiene razón social o sucursal');
      return;
    }

    this.dialog
      .open(AddSalesOrderLineDialogComponent, {
        width: '760px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          quotationId: q.id,
          folio: q.folio,
          currency: this.getPaymentCurrency(),
          fiscal_configuration_id: fiscalId,
          billing_branch_id: branchId,
          sale_scope: 'combined',
        },
      })
      .afterClosed()
      .subscribe((updated: QuotationDetailPayload | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Producto agregado');
      });
  }

  canShowCancel(): boolean {
    return this.canCancelPerm && !!this.header()?.can_cancel;
  }

  canEditNotes(): boolean {
    const header = this.header();
    if (!this.canUpdate || !header) return false;
    if (header.can_edit_notes != null) return header.can_edit_notes;
    return header.general_status !== 'Cancelada';
  }

  openNotesEditor(): void {
    const q = this.header();
    if (!q || !this.canEditNotes()) return;

    this.dialog
      .open(QuotationNotesDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: 'textarea',
        data: {
          quotationId: q.id,
          notes: q.notes ?? '',
          folio: q.folio,
        },
      })
      .afterClosed()
      .subscribe((result: QuotationNotesDialogResult | undefined) => {
        if (!result?.saved) return;
        this.header.update((current) =>
          current ? { ...current, notes: result.notes ?? undefined } : current,
        );
        this.toast.success(
          result.notes
            ? 'Observaciones actualizadas. El PDF se regeneró.'
            : 'Observaciones eliminadas. El PDF se regeneró.',
        );
        this.reload(true);
      });
  }

  convert(): void {
    const q = this.header();
    if (!q?.can_convert) return;

    const branchName = this.getSucursalDisplayName();
    this.quotationService.collectionPreview(q.id).subscribe({
      next: (preview) => this.confirmConvert(q, preview.sucursal || branchName, preview.open_shift),
      error: () => this.confirmConvert(q, branchName, null),
    });
  }

  private confirmConvert(
    q: Quotation,
    branchName: string,
    openShift: { id: string; shift_date: string } | null,
  ): void {
    const hasShift = !!openShift;
    this.dialog
      .open(AlertDialogComponent, {
        width: '440px',
        data: {
          title: 'Convertir a venta',
          message: hasShift
            ? `Hay un corte abierto del ${openShift.shift_date} en ${branchName}. ¿Generar el cobro en ese corte?`
            : `No hay corte abierto en ${branchName}. La orden se crea sin cobro. Cuando abran el corte podrás enviarla a cobranza desde la orden.`,
          type: 'warning',
          text_accept: hasShift ? 'Sí, generar cobro' : 'Crear orden sin cobro',
          text_cancel: hasShift ? 'No, crear sin cobro' : 'Volver',
        },
      })
      .afterClosed()
      .subscribe((answer: boolean | undefined) => {
        if (answer === undefined) return;
        if (!hasShift && answer === false) return;
        const sendToCaja = hasShift && answer === true;
        this.converting.set(true);
        this.quotationService.convert(q.id, { send_to_pos_caja: sendToCaja }).subscribe({
          next: (res) => {
            this.converting.set(false);
            const folio = res.sales_order?.folio || 'OV';
            if (res.sales_order?.sent_to_pos_caja) {
              this.toast.success(`Convertida a ${folio}. En caja de ${branchName} para cobrar.`);
            } else {
              this.toast.success(`Convertida a ${folio}. Sin cobro en caja. Puedes enviarla después desde la orden.`);
            }
            this.dialogRef.close({ converted: true, salesOrderId: res.sales_order?.id });
          },
          error: (err) => {
            this.converting.set(false);
            this.toast.error(err?.error?.message || 'No se pudo convertir');
          },
        });
      });
  }

  openAdvanceInvoice(): void {
    const q = this.header();
    if (!q?.can_stamp_advance) return;
    const base = Math.max(
      Number(q.subtotal || 0) - Number(q.discount_total || 0) - Number(q.global_discount_amount || 0),
      0,
    );
    const taxable = base || Number(q.total || 0);
    const iva = taxable > 0 ? Math.round((Number(q.iva_total || 0) / taxable) * 10000) / 100 : 8;
    this.dialog
      .open(AdvanceInvoiceDialogComponent, {
        width: '440px',
        data: {
          mode: 'stamp',
          source: 'quotation',
          documentId: q.id,
          folio: q.folio,
          defaultBase: Number(base.toFixed(2)),
          defaultIva: Math.abs(iva - 8) < 0.3 ? 8 : Math.abs(iva - 16) < 0.3 ? 16 : iva,
        },
      })
      .afterClosed()
      .subscribe((stamped) => {
        if (!stamped) return;
        this.toast.success('Factura de anticipo timbrada');
        this.reload(true);
      });
  }

  cancelAdvanceInvoice(): void {
    const q = this.header();
    const invoiceId = q?.advance_invoice?.id;
    if (!q || !invoiceId || q.advance_invoice?.applied) return;
    this.quotationService.cancelAdvance(q.id, invoiceId).subscribe({
      next: () => {
        this.toast.success('Factura de anticipo cancelada');
        this.reload(true);
      },
      error: (err) => this.toast.error(err?.error?.message || 'No se pudo cancelar el anticipo'),
    });
  }

  cancelQuotation(): void {
    const q = this.header();
    if (!q?.can_cancel) return;
    this.cancelling.set(true);
    this.quotationService.cancel(q.id).subscribe({
      next: () => {
        this.cancelling.set(false);
        this.toast.success('Cotización cancelada');
        this.dialogRef.close({ cancelled: true });
      },
      error: (err) => {
        this.cancelling.set(false);
        this.toast.error(err?.error?.message || 'No se pudo cancelar');
      },
    });
  }

  goToSalesOrder(): void {
    const id = this.header()?.converted_to_sales_order_id;
    if (!id) return;
    this.dialogRef.close();
    void this.router.navigate(['/sales-orders']);
  }

  originalDocument(): QuotationDocument | undefined {
    return this.documents().find((d) => d.document_type_name === 'DOCUMENTO_ORIGINAL');
  }

  openPdf(): void {
    const doc = this.originalDocument();
    if (doc?.path) {
      window.open(doc.path, '_blank');
    } else {
      this.toast.info('El PDF aún se está generando. Recarga en unos segundos.');
    }
  }

  regeneratePDF(): void {
    const q = this.header();
    if (!q) return;
    this.regeneratingPDF.set(true);
    this.quotationService.regenerateDocumentoOriginal(q.id).subscribe({
      next: () => {
        this.regeneratingPDF.set(false);
        this.toast.success('PDF regenerado');
        this.reload(true);
      },
      error: (err) => {
        this.regeneratingPDF.set(false);
        this.toast.error(err?.error?.message || 'No se pudo regenerar el PDF');
      },
    });
  }

  getDocumentTypeLabel(documentType: string): string {
    return getSalesOrderDocumentChipLabel(documentType);
  }

  getDocumentBadgeClass(documentType: string): string {
    switch (getSalesOrderDocumentKind(documentType)) {
      case 'original':
        return 'badge-blue';
      case 'delivery':
        return 'badge-green';
      default:
        return 'badge-gray';
    }
  }

  getDocumentLanguageLabel(language?: string | null): string | null {
    if (language === 'es') return 'ES';
    if (language === 'en') return 'EN';
    return null;
  }

  formatDocumentDate(dateString?: string | null): string {
    return formatApiDate(dateString, 'month-day');
  }

  downloadDocument(doc: QuotationDocument): void {
    if (doc.path) window.open(doc.path, '_blank');
  }
}

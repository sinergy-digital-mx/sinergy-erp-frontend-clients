import { Component, Inject, OnInit, signal } from '@angular/core';
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
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { QUOTATION_PERMISSIONS } from '../../config/permissions.config';
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
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' });
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

  getLineTotal(item: QuotationLineItem): number {
    const qty = this.parseNumber(item.quantity);
    const unit = this.parseNumber(item.unit_price);
    const discountPct = this.parseNumber(item.discount_percentage);
    const taxable = unit * qty;
    const discount = taxable * (discountPct / 100);
    const discounted = Math.max(taxable - discount, 0);
    const iva = discounted * (this.parseNumber(item.iva_percentage) / 100);
    const ieps = discounted * (this.parseNumber(item.ieps_percentage) / 100);
    return discounted + iva + ieps;
  }

  canShowConvert(): boolean {
    return this.canConvertPerm && !!this.header()?.can_convert;
  }

  canShowCancel(): boolean {
    return this.canCancelPerm && !!this.header()?.can_cancel;
  }

  canEditNotes(): boolean {
    return this.canUpdate && this.header()?.general_status === 'Creada';
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
        this.toast.success(result.notes ? 'Notas actualizadas' : 'Notas eliminadas');
      });
  }

  convert(): void {
    const q = this.header();
    if (!q?.can_convert) return;
    this.converting.set(true);
    this.quotationService.convert(q.id).subscribe({
      next: (res) => {
        this.converting.set(false);
        const folio = res.sales_order?.folio || 'OV';
        this.toast.success(`Convertida a ${folio}. Se retuvo inventario.`);
        this.dialogRef.close({ converted: true, salesOrderId: res.sales_order?.id });
      },
      error: (err) => {
        this.converting.set(false);
        this.toast.error(err?.error?.message || 'No se pudo convertir');
      },
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
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} de ${month}`;
  }

  downloadDocument(doc: QuotationDocument): void {
    if (doc.path) window.open(doc.path, '_blank');
  }
}

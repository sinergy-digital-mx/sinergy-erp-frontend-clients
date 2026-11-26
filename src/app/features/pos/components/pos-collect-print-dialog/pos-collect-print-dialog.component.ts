import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, FileText, Printer, Receipt, X } from 'lucide-angular';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { PosSaleReceipt, normalizePosSaleReceipt } from '../../models/pos-receipt.model';
import { POSService } from '../../services/pos.service';
import {
  POS_TICKET_COPIES_DEFAULT,
  POS_TICKET_COPIES_MAX,
  PosReceiptPrintService,
  clampTicketCopies,
} from '../../services/pos-receipt-print.service';
import { SalesOrderInvoiceService } from '../../../sales-orders/services/sales-order-invoice.service';
import { SalesOrderElectronicInvoice } from '../../../sales-orders/models/sales-order-electronic-invoice.model';
import { QuotationService } from '../../../quotations/services/quotation.service';
import {
  EscPosPreviewLine,
  buildEscPosPreview,
  hasReceiptPreview,
} from '../../utils/escpos-preview.util';

export interface PosCollectPrintDialogData {
  folio?: string;
  salesOrderId?: string;
  quotationId?: string;
  receipt?: PosSaleReceipt | null;
  invoiceId?: string | null;
  discoverInvoice?: boolean;
}

type PrintTab = 'ticket' | 'invoice';

interface ReceiptPreviewLine extends EscPosPreviewLine {
  qrSafe?: SafeUrl;
}

@Component({
  selector: 'app-pos-collect-print-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './pos-collect-print-dialog.component.html',
  styleUrl: './pos-collect-print-dialog.component.scss',
  host: {
    '[class.is-wide]': 'invoiceAvailable()',
  },
})
export class PosCollectPrintDialogComponent implements OnInit, OnDestroy {
  private readonly dialogRef = inject(MatDialogRef<PosCollectPrintDialogComponent>);
  readonly data = inject<PosCollectPrintDialogData>(MAT_DIALOG_DATA);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly posService = inject(POSService);
  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly quotationService = inject(QuotationService);
  private readonly printService = inject(PosReceiptPrintService);

  readonly Receipt = Receipt;
  readonly FileText = FileText;
  readonly Printer = Printer;
  readonly X = X;
  readonly copiesMax = POS_TICKET_COPIES_MAX;

  readonly tab = signal<PrintTab>('ticket');
  readonly ticketAvailable = signal(false);
  readonly invoiceAvailable = signal(false);
  readonly ticketLoading = signal(false);
  readonly invoiceLoading = signal(false);
  readonly printing = signal(false);
  readonly printersLoading = signal(false);
  readonly ticketError = signal<string | null>(null);
  readonly invoiceError = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly receipt = signal<PosSaleReceipt | null>(null);
  readonly previewLines = signal<ReceiptPreviewLine[]>([]);
  readonly pdfUrl = signal('');
  readonly pdfName = signal('factura.pdf');
  readonly printers = signal<string[]>([]);
  readonly invoicePrinter = signal('');
  readonly ticketCopies = signal(POS_TICKET_COPIES_DEFAULT);
  readonly invoiceCopies = signal(POS_TICKET_COPIES_DEFAULT);
  readonly invoiceId = signal('');

  readonly pdfSafe = computed(() => {
    const url = this.pdfUrl();
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });

  readonly showTabs = computed(() => this.ticketAvailable() && this.invoiceAvailable());
  readonly layout = computed<'both' | 'ticket' | 'invoice'>(() => {
    if (this.ticketAvailable() && this.invoiceAvailable()) return 'both';
    if (this.invoiceAvailable()) return 'invoice';
    return 'ticket';
  });

  private pdfRetried = false;
  private pdfRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private destroyed = false;

  ngOnInit(): void {
    this.ticketCopies.set(POS_TICKET_COPIES_DEFAULT);
    this.invoiceCopies.set(POS_TICKET_COPIES_DEFAULT);
    this.invoicePrinter.set(this.printService.getInvoicePrinterName());

    const hasTicket = !!(this.data.salesOrderId?.trim() || this.data.receipt);
    this.ticketAvailable.set(hasTicket);
    if (this.data.invoiceId?.trim()) {
      this.invoiceId.set(this.data.invoiceId.trim());
      this.invoiceAvailable.set(true);
      this.loadPdf();
    } else if (this.data.discoverInvoice && this.data.salesOrderId?.trim()) {
      this.discoverInvoice();
    }

    if (!hasTicket && (this.invoiceAvailable() || this.data.invoiceId || this.data.quotationId)) {
      this.tab.set('invoice');
    }
    if (hasTicket) {
      this.loadTicket();
    }
    this.fitDialog();
    if (this.invoiceAvailable()) {
      void this.loadPrinters();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.pdfRetryTimer != null) {
      clearTimeout(this.pdfRetryTimer);
    }
  }

  title(): string {
    const folio = this.data.folio?.trim();
    return folio ? `Imprimir ${folio}` : 'Imprimir';
  }

  private fitDialog(): void {
    if (this.invoiceAvailable()) {
      this.dialogRef.addPanelClass('pos-print-wide');
      this.dialogRef.updateSize('96vw', '94vh');
      return;
    }
    this.dialogRef.removePanelClass('pos-print-wide');
    this.dialogRef.updateSize('680px', '');
  }

  selectTab(tab: PrintTab): void {
    if (tab === 'invoice' && !this.invoiceAvailable()) return;
    if (tab === 'ticket' && !this.ticketAvailable()) return;
    this.tab.set(tab);
    this.actionError.set(null);
    if (tab === 'invoice' && this.printers().length === 0 && !this.printersLoading()) {
      void this.loadPrinters();
    }
  }

  copies(): number {
    return this.tab() === 'invoice' ? this.invoiceCopies() : this.ticketCopies();
  }

  setCopies(value: number | string): void {
    if (this.tab() === 'invoice') {
      this.setInvoiceCopies(value);
      return;
    }
    this.setTicketCopies(value);
  }

  setTicketCopies(value: number | string): void {
    const count = this.parseCopies(value);
    if (count == null) return;
    this.ticketCopies.set(count);
    this.printService.setTicketCopies(count);
  }

  setInvoiceCopies(value: number | string): void {
    const count = this.parseCopies(value);
    if (count == null) return;
    this.invoiceCopies.set(count);
    this.printService.setInvoiceCopies(count);
  }

  private parseCopies(value: number | string): number | null {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return clampTicketCopies(parsed);
  }

  changeCopies(delta: number): void {
    this.setCopies(this.copies() + delta);
  }

  canPrintTicket(): boolean {
    return this.printService.hasPrintableReceipt(this.receipt());
  }

  printDisabled(): boolean {
    if (this.printing()) return true;
    if (this.tab() === 'invoice') {
      return !this.pdfUrl() || this.invoiceLoading();
    }
    return !this.canPrintTicket() || this.ticketLoading();
  }

  printLabel(): string {
    if (this.printing()) return 'Imprimiendo…';
    const count = this.copies();
    const what = this.tab() === 'invoice' ? 'PDF' : 'ticket';
    return count === 1 ? `Imprimir ${what}` : `Imprimir ${count} ${what}`;
  }

  close(): void {
    this.dialogRef.close();
  }

  async printActive(): Promise<void> {
    if (this.tab() === 'invoice') {
      await this.printInvoice();
      return;
    }
    await this.printTicket();
  }

  openPdf(): void {
    const url = this.pdfUrl();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async loadPrinters(): Promise<void> {
    if (this.printersLoading()) return;
    this.printersLoading.set(true);
    this.actionError.set(null);
    try {
      const list = await this.printService.listPrinters();
      if (this.destroyed) return;
      this.printers.set(list);
      if (!this.invoicePrinter() && list.length === 1) {
        this.choosePrinter(list[0]);
      }
      if (list.length === 0) {
        this.actionError.set('No se encontraron impresoras. Abre QZ Tray en esta PC.');
      }
    } catch (err) {
      if (this.destroyed) return;
      this.printers.set([]);
      this.actionError.set(err instanceof Error ? err.message : 'No se pudo conectar con QZ Tray');
    } finally {
      if (!this.destroyed) this.printersLoading.set(false);
    }
  }

  choosePrinter(name: string): void {
    const value = name.trim();
    this.invoicePrinter.set(value);
    this.printService.setInvoicePrinterName(value);
    this.actionError.set(null);
  }

  private loadTicket(): void {
    const initial = normalizePosSaleReceipt(this.data.receipt);
    if (initial && hasReceiptPreview(initial)) {
      this.applyReceipt(initial);
      return;
    }
    const orderId = this.data.salesOrderId?.trim();
    if (!orderId) {
      this.ticketLoading.set(false);
      this.ticketError.set('No hay ticket para esta venta.');
      return;
    }
    this.ticketLoading.set(true);
    this.posService.getSaleReceipt(orderId).subscribe({
      next: (receipt) => {
        if (this.destroyed) return;
        if (!receipt || !hasReceiptPreview(receipt)) {
          this.ticketLoading.set(false);
          this.ticketError.set('Esta venta no tiene ticket guardado.');
          return;
        }
        this.applyReceipt(receipt);
      },
      error: () => {
        if (this.destroyed) return;
        this.ticketLoading.set(false);
        this.ticketError.set('No se pudo cargar el ticket.');
      },
    });
  }

  private discoverInvoice(): void {
    const orderId = this.data.salesOrderId?.trim();
    if (!orderId) return;
    this.invoiceLoading.set(true);
    this.invoiceService.getInvoices(orderId).subscribe({
      next: (list) => {
        if (this.destroyed) return;
        const picked = pickPrintableInvoice(list);
        if (!picked) {
          this.invoiceLoading.set(false);
          this.invoiceAvailable.set(false);
          return;
        }
        this.invoiceId.set(picked.id);
        this.invoiceAvailable.set(true);
        this.fitDialog();
        void this.loadPrinters();
        this.loadPdf();
      },
      error: () => {
        if (this.destroyed) return;
        this.invoiceLoading.set(false);
        this.invoiceAvailable.set(false);
      },
    });
  }

  private loadPdf(): void {
    const invoiceId = this.invoiceId().trim();
    const orderId = this.data.salesOrderId?.trim();
    const quotationId = this.data.quotationId?.trim();
    if (!invoiceId || (!orderId && !quotationId)) {
      this.invoiceLoading.set(false);
      this.invoiceError.set('No hay factura para imprimir.');
      return;
    }
    this.invoiceLoading.set(true);
    this.invoiceError.set(null);
    const request$ = quotationId
      ? this.quotationService.getAdvancePdf(quotationId, invoiceId)
      : this.invoiceService.getInvoicePdf(orderId!, invoiceId);
    request$.subscribe({
      next: (raw) => {
        if (this.destroyed) return;
        const pdf = readPdfLink(raw);
        if (!pdf.url) {
          this.retryOrFailPdf();
          return;
        }
        this.pdfUrl.set(pdf.url);
        this.pdfName.set(pdf.fileName);
        this.invoiceLoading.set(false);
        this.invoiceAvailable.set(true);
        this.fitDialog();
        void this.loadPrinters();
      },
      error: () => {
        if (this.destroyed) return;
        this.retryOrFailPdf();
      },
    });
  }

  private retryOrFailPdf(): void {
    if (!this.pdfRetried) {
      this.pdfRetried = true;
      this.pdfRetryTimer = setTimeout(() => {
        if (!this.destroyed) this.loadPdf();
      }, 900);
      return;
    }
    this.invoiceLoading.set(false);
    this.invoiceError.set('No se pudo cargar el PDF de la factura.');
  }

  async printTicket(): Promise<void> {
    const receipt = this.receipt();
    if (!this.canPrintTicket() || this.printing()) return;
    if (!this.printService.getPrinterName()) {
      this.actionError.set('Configura la impresora térmica en POS Caja antes de imprimir.');
      return;
    }
    this.printing.set(true);
    this.actionError.set(null);
    try {
      await this.printService.printReceipt(receipt!, this.ticketCopies());
    } catch (err) {
      this.actionError.set(err instanceof Error ? err.message : 'No se pudo imprimir el ticket');
    } finally {
      if (!this.destroyed) this.printing.set(false);
    }
  }

  async printInvoice(): Promise<void> {
    const url = this.pdfUrl();
    if (!url || this.printing()) return;
    if (!this.invoicePrinter().trim()) {
      this.actionError.set('Elige la impresora del PDF. No es la térmica del ticket.');
      return;
    }
    this.printing.set(true);
    this.actionError.set(null);
    try {
      this.printService.setInvoicePrinterName(this.invoicePrinter());
      await this.printService.printInvoicePdf(url, this.invoiceCopies());
    } catch (err) {
      this.actionError.set(err instanceof Error ? err.message : 'No se pudo imprimir la factura');
    } finally {
      if (!this.destroyed) this.printing.set(false);
    }
  }

  private applyReceipt(receipt: PosSaleReceipt): void {
    this.receipt.set(receipt);
    this.previewLines.set(
      buildEscPosPreview(receipt).map((line) => ({
        ...line,
        qrSafe: line.qrSrc ? this.sanitizer.bypassSecurityTrustUrl(line.qrSrc) : undefined,
      })),
    );
    this.ticketLoading.set(false);
    this.ticketError.set(null);
  }
}

function pickPrintableInvoice(invoices: SalesOrderElectronicInvoice[]): SalesOrderElectronicInvoice | null {
  const usable = invoices.filter((invoice) => {
    const status = String(invoice.stamp_status ?? '').toLowerCase();
    if (status === 'cancelled' || status === 'stamp_error' || status === 'pending' || status === 'pending_stamp') {
      return false;
    }
    if (invoice.tipo_comprobante && invoice.tipo_comprobante !== 'I') return false;
    return status === 'stamped' || status === 'cancel_pending' || status === 'cancel_error' || !!invoice.uuid;
  });
  if (!usable.length) return null;
  return [...usable].sort((a, b) => stampTime(b) - stampTime(a))[0];
}

function stampTime(invoice: SalesOrderElectronicInvoice): number {
  const parsed = Date.parse(invoice.stamped_at || invoice.issued_at || '');
  return Number.isFinite(parsed) ? parsed : 0;
}

function readPdfLink(raw: unknown): { url: string; fileName: string } {
  const root = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const body =
    root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
      ? (root['data'] as Record<string, unknown>)
      : root;
  const fileName = body['fileName'] ?? body['file_name'];
  return {
    url: String(body['signedUrl'] ?? body['signed_url'] ?? ''),
    fileName: fileName != null && String(fileName).trim() ? String(fileName) : 'factura.pdf',
  };
}

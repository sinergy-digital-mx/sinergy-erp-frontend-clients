import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Eye, Printer, X } from 'lucide-angular';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { PosSaleReceipt, normalizePosSaleReceipt } from '../../models/pos-receipt.model';
import { POSService } from '../../services/pos.service';
import {
  POS_TICKET_COPY_OPTIONS,
  PosReceiptPrintService,
} from '../../services/pos-receipt-print.service';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import {
  EscPosPreviewLine,
  buildEscPosPreview,
  hasReceiptPreview,
} from '../../utils/escpos-preview.util';

export interface ReceiptPreviewLine extends EscPosPreviewLine {
  qrSafe?: SafeUrl;
}

export interface PosReceiptPreviewDialogData {
  title?: string;
  receipt?: PosSaleReceipt | null;
  salesOrderId?: string;
  /** Backoffice: GET /sales-orders/:id/ticket-recibo. POS: GET /pos/sales/:id/receipt */
  useSalesOrderTicketApi?: boolean;
}

@Component({
  selector: 'app-pos-receipt-preview-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './pos-receipt-preview-dialog.component.html',
  styleUrl: './pos-receipt-preview-dialog.component.scss',
})
export class PosReceiptPreviewDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<PosReceiptPreviewDialogComponent>);
  readonly data = inject<PosReceiptPreviewDialogData>(MAT_DIALOG_DATA);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly posService = inject(POSService);
  private readonly salesOrderService = inject(SalesOrderService);
  private readonly printService = inject(PosReceiptPrintService);

  readonly Eye = Eye;
  readonly Printer = Printer;
  readonly X = X;

  readonly copyOptions = POS_TICKET_COPY_OPTIONS;

  loading = signal(true);
  error = signal<string | null>(null);
  receipt = signal<PosSaleReceipt | null>(null);
  previewLines = signal<ReceiptPreviewLine[]>([]);
  printing = signal(false);
  copies = signal(1);
  copiesOpen = signal(false);

  ngOnInit(): void {
    this.copies.set(this.printService.getTicketCopies());
    const initial = normalizePosSaleReceipt(this.data.receipt);
    if (initial && hasReceiptPreview(initial)) {
      this.applyReceipt(initial);
      return;
    }

    const orderId = this.data.salesOrderId?.trim();
    if (!orderId) {
      this.loading.set(false);
      this.error.set('No hay ticket disponible para previsualizar.');
      return;
    }

    if (this.data.useSalesOrderTicketApi) {
      this.salesOrderService.getTicketRecibo(orderId).subscribe({
        next: (payload) => this.applyLoadedReceipt(payload.receipt ?? null),
        error: () => {
          this.loading.set(false);
          this.error.set('No hay ticket guardado para esta venta.');
        },
      });
      return;
    }

    this.posService.getSaleReceipt(orderId).subscribe({
      next: (receipt) => this.applyLoadedReceipt(receipt),
      error: () => {
        this.loading.set(false);
        this.error.set('No se pudo cargar el ticket.');
      },
    });
  }

  private applyLoadedReceipt(receipt: PosSaleReceipt | null): void {
    if (!receipt || !hasReceiptPreview(receipt)) {
      this.loading.set(false);
      this.error.set('Esta venta no tiene ticket ESC/POS guardado.');
      return;
    }
    this.applyReceipt(receipt);
  }

  title(): string {
    return this.data.title?.trim() || 'Vista previa del ticket';
  }

  canPrint(): boolean {
    return this.printService.hasPrintableReceipt(this.receipt());
  }

  copiesLabel(): string {
    const count = this.copies();
    return count === 1 ? '1 copia' : `${count} copias`;
  }

  printLabel(): string {
    if (this.printing()) {
      return 'Imprimiendo…';
    }
    const count = this.copies();
    return count === 1 ? 'Imprimir' : `Imprimir ${count} copias`;
  }

  toggleCopiesMenu(): void {
    if (this.printing()) {
      return;
    }
    this.copiesOpen.update((open) => !open);
  }

  selectCopies(count: number): void {
    this.copies.set(count);
    this.copiesOpen.set(false);
    this.printService.setTicketCopies(count);
  }

  close(): void {
    this.dialogRef.close();
  }

  async printTicket(): Promise<void> {
    const receipt = this.receipt();
    if (!this.canPrint() || this.printing()) {
      return;
    }

    if (!this.printService.getPrinterName()) {
      this.error.set('Configura la impresora térmica en POS Caja antes de imprimir.');
      return;
    }

    this.copiesOpen.set(false);
    this.printing.set(true);
    this.error.set(null);
    try {
      await this.printService.printReceipt(receipt!, this.copies());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo imprimir el ticket';
      this.error.set(message);
    } finally {
      this.printing.set(false);
    }
  }

  private applyReceipt(receipt: PosSaleReceipt): void {
    this.receipt.set(receipt);
    this.previewLines.set(
      buildEscPosPreview(receipt).map((line) => ({
        ...line,
        qrSafe: line.qrSrc ? this.sanitizer.bypassSecurityTrustUrl(line.qrSrc) : undefined,
      }))
    );
    this.loading.set(false);
    this.error.set(null);
  }
}

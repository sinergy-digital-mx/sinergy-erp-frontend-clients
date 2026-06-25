import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Eye, Printer, X } from 'lucide-angular';
import { PosSaleReceipt, normalizePosSaleReceipt } from '../../models/pos-receipt.model';
import { POSService } from '../../services/pos.service';
import { PosReceiptPrintService } from '../../services/pos-receipt-print.service';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import {
  EscPosPreviewLine,
  buildEscPosPreview,
  hasReceiptPreview,
} from '../../utils/escpos-preview.util';

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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pos-receipt-preview-dialog.component.html',
  styleUrl: './pos-receipt-preview-dialog.component.scss',
})
export class PosReceiptPreviewDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<PosReceiptPreviewDialogComponent>);
  readonly data = inject<PosReceiptPreviewDialogData>(MAT_DIALOG_DATA);
  private readonly posService = inject(POSService);
  private readonly salesOrderService = inject(SalesOrderService);
  private readonly printService = inject(PosReceiptPrintService);

  readonly Eye = Eye;
  readonly Printer = Printer;
  readonly X = X;

  loading = signal(true);
  error = signal<string | null>(null);
  receipt = signal<PosSaleReceipt | null>(null);
  previewLines = signal<EscPosPreviewLine[]>([]);
  printing = signal(false);

  ngOnInit(): void {
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

  close(): void {
    this.dialogRef.close();
  }

  async printTicket(): Promise<void> {
    const receipt = this.receipt();
    if (!this.canPrint() || this.printing()) {
      return;
    }

    if (!this.printService.getPrinterName()) {
      this.error.set('Configura la impresora térmica en Cobranza POS antes de imprimir.');
      return;
    }

    this.printing.set(true);
    this.error.set(null);
    try {
      await this.printService.printReceipt(receipt!);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo imprimir el ticket';
      this.error.set(message);
    } finally {
      this.printing.set(false);
    }
  }

  private applyReceipt(receipt: PosSaleReceipt): void {
    this.receipt.set(receipt);
    this.previewLines.set(buildEscPosPreview(receipt));
    this.loading.set(false);
    this.error.set(null);
  }
}

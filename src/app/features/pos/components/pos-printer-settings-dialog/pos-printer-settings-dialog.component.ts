import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Printer, RefreshCw, Check, X } from 'lucide-angular';
import { PosReceiptPrintService } from '../../services/pos-receipt-print.service';

@Component({
  selector: 'app-pos-printer-settings-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, LucideAngularModule],
  templateUrl: './pos-printer-settings-dialog.component.html',
  styleUrl: './pos-printer-settings-dialog.component.scss',
})
export class PosPrinterSettingsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PosPrinterSettingsDialogComponent>);
  private readonly printService = inject(PosReceiptPrintService);

  readonly Printer = Printer;
  readonly RefreshCw = RefreshCw;
  readonly Check = Check;
  readonly X = X;

  printerName = this.printService.getPrinterName();
  autoPrint = this.printService.isAutoPrintEnabled();
  printers = signal<string[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  cancel(): void {
    this.dialogRef.close(false);
  }

  selectPrinter(name: string): void {
    this.printerName = name;
    this.error.set(null);
  }

  async detectPrinters(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const list = await this.printService.listPrinters();
      this.printers.set(list);
      if (list.length === 0) {
        this.error.set('No se encontraron impresoras. Verifica que QZ Tray esté abierto.');
        return;
      }
      if (!this.printerName && list.length === 1) {
        this.printerName = list[0];
      }
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'No se pudo conectar con QZ Tray');
      this.printers.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  save(): void {
    this.printService.setPrinterName(this.printerName.trim());
    this.printService.setAutoPrintEnabled(this.autoPrint);
    this.dialogRef.close(true);
  }
}

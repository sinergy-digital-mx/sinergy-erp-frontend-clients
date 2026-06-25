import { Injectable } from '@angular/core';
import { PosSaleReceipt } from '../models/pos-receipt.model';

const LS_PRINTER = 'pos_printer_name';
const LS_AUTO_PRINT = 'pos_auto_print_on_collect';
const QZ_SCRIPT = 'https://cdn.jsdelivr.net/npm/qz-tray@2.2.4/qz-tray.js';

type QzApi = {
  websocket: { isActive: () => boolean; connect: () => Promise<void> };
  configs: { create: (printer: string) => unknown };
  printers: { find: () => Promise<string[]> };
  print: (config: unknown, data: unknown[]) => Promise<void>;
};

@Injectable({ providedIn: 'root' })
export class PosReceiptPrintService {
  private qzLoadPromise: Promise<QzApi> | null = null;

  getPrinterName(): string {
    return localStorage.getItem(LS_PRINTER)?.trim() ?? '';
  }

  setPrinterName(name: string): void {
    const value = name.trim();
    if (value) {
      localStorage.setItem(LS_PRINTER, value);
    } else {
      localStorage.removeItem(LS_PRINTER);
    }
  }

  isAutoPrintEnabled(): boolean {
    return localStorage.getItem(LS_AUTO_PRINT) !== 'false';
  }

  setAutoPrintEnabled(enabled: boolean): void {
    localStorage.setItem(LS_AUTO_PRINT, enabled ? 'true' : 'false');
  }

  decodeEscPosBase64(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  hasPrintableReceipt(receipt: PosSaleReceipt | null | undefined): boolean {
    return !!receipt?.escpos_base64?.trim();
  }

  async listPrinters(): Promise<string[]> {
    const qz = await this.ensureQz();
    await this.connectQz(qz);
    return qz.printers.find();
  }

  async printReceipt(receipt: PosSaleReceipt): Promise<void> {
    const base64 = receipt?.escpos_base64?.trim();
    if (!base64) {
      throw new Error('El ticket no incluye datos ESC/POS para imprimir');
    }

    const printerName = this.getPrinterName();
    if (!printerName) {
      throw new Error('Configura el nombre de la impresora térmica en Cobranza POS');
    }

    const qz = await this.ensureQz();
    await this.connectQz(qz);
    const bytes = this.decodeEscPosBase64(base64);
    const config = qz.configs.create(printerName);

    await qz.print(config, [
      {
        type: 'raw',
        format: 'plain',
        data: Array.from(bytes),
      },
    ]);
  }

  private async connectQz(qz: QzApi): Promise<void> {
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect();
    }
  }

  private async ensureQz(): Promise<QzApi> {
    if (!this.qzLoadPromise) {
      this.qzLoadPromise = this.loadQz();
    }
    return this.qzLoadPromise;
  }

  private loadQz(): Promise<QzApi> {
    const win = window as Window & { qz?: QzApi };
    if (win.qz) {
      return Promise.resolve(win.qz);
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-qz-tray="true"]`);
      if (existing) {
        existing.addEventListener('load', () => {
          if (win.qz) {
            resolve(win.qz);
          } else {
            reject(new Error('QZ Tray no está disponible'));
          }
        });
        existing.addEventListener('error', () =>
          reject(new Error('No se pudo cargar QZ Tray. Instálalo en la PC del POS.'))
        );
        return;
      }

      const script = document.createElement('script');
      script.src = QZ_SCRIPT;
      script.async = true;
      script.dataset['qzTray'] = 'true';
      script.onload = () => {
        if (win.qz) {
          resolve(win.qz);
        } else {
          reject(new Error('QZ Tray no está disponible'));
        }
      };
      script.onerror = () =>
        reject(new Error('No se pudo cargar QZ Tray. Instálalo en la PC del POS.'));
      document.head.appendChild(script);
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PosSaleReceipt } from '../models/pos-receipt.model';

const LS_PRINTER = 'pos_printer_name';
const LS_AUTO_PRINT = 'pos_auto_print_on_collect';
const QZ_SCRIPT = 'https://cdn.jsdelivr.net/npm/qz-tray@2.2.4/qz-tray.js';

type QzSecurityApi = {
  setSignatureAlgorithm: (algorithm: string) => void;
  setCertificatePromise: (
    handler: (resolve: (cert: string) => void, reject: (error: unknown) => void) => void
  ) => void;
  setSignaturePromise: (
    handler: (toSign: string) => (resolve: (sig: string) => void, reject: (error: unknown) => void) => void
  ) => void;
};

type QzApi = {
  websocket: { isActive: () => boolean; connect: () => Promise<void> };
  configs: { create: (printer: string) => unknown };
  printers: { find: () => Promise<string[]> };
  print: (config: unknown, data: unknown[]) => Promise<void>;
  security?: QzSecurityApi;
};

@Injectable({ providedIn: 'root' })
export class PosReceiptPrintService {
  private qzLoadPromise: Promise<QzApi> | null = null;
  private qzSecurityConfigured = false;

  constructor(private http: HttpClient) {}

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

  isQzSigningEnabled(): boolean {
    const cfg = environment.qzTray;
    return !!(cfg?.signingEnabled && cfg.certificateUrl?.trim() && cfg.signUrl?.trim());
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
    const config = qz.configs.create(printerName);

    await qz.print(config, [
      {
        type: 'raw',
        format: 'command',
        flavor: 'base64',
        data: base64,
      },
    ]);
  }

  private setupQzSecurity(qz: QzApi): void {
    if (this.qzSecurityConfigured || !this.isQzSigningEnabled() || !qz.security) {
      return;
    }

    const { certificateUrl, signUrl } = environment.qzTray!;

    qz.security.setSignatureAlgorithm('SHA512');
    qz.security.setCertificatePromise((resolve, reject) => {
      void this.fetchQzCertificate(certificateUrl).then(resolve).catch(reject);
    });
    qz.security.setSignaturePromise((toSign) => {
      return (resolve, reject) => {
        void this.signQzRequest(signUrl, toSign).then(resolve).catch(reject);
      };
    });

    this.qzSecurityConfigured = true;
  }

  private async fetchQzCertificate(certificateUrl: string): Promise<string> {
    if (certificateUrl.startsWith('/assets/')) {
      const res = await fetch(certificateUrl, {
        cache: 'no-store',
        headers: { Accept: 'text/plain' },
      });
      if (!res.ok) {
        throw new Error('No se pudo cargar el certificado QZ Tray');
      }
      return res.text();
    }

    return firstValueFrom(
      this.http.get(certificateUrl, {
        responseType: 'text',
        headers: { Accept: 'text/plain' },
      })
    );
  }

  private async signQzRequest(signUrl: string, toSign: string): Promise<string> {
    const params = new HttpParams().set('request', toSign);
    return firstValueFrom(
      this.http.get(signUrl, {
        params,
        responseType: 'text',
        headers: { Accept: 'text/plain' },
      })
    );
  }

  private async connectQz(qz: QzApi): Promise<void> {
    this.setupQzSecurity(qz);
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

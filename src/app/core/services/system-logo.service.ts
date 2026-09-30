import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

interface SystemLogoMeta {
  enabled: boolean;
  cache_key: string | null;
}

interface SystemLogoCache {
  tenantId: string;
  cacheKey: string;
  dataUrl: string;
}

/**
 * Logo de menú. La imagen se guarda en el navegador y solo se vuelve a bajar
 * si cambia el archivo en el servidor.
 */
@Injectable({ providedIn: 'root' })
export class SystemLogoService {
  private readonly storageKey = 'sinergy.system_logo';
  private readonly api = environment.api;
  private checkedThisSession = false;
  private refreshPromise: Promise<void> | null = null;

  readonly dataUrl = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.dataUrl.set(this.readMatchingCache());
  }

  /** Compara la versión guardada. No descarga la imagen si sigue igual. */
  refresh(force = false): void {
    if (!this.auth.token) {
      return;
    }
    if (this.checkedThisSession && !force) {
      return;
    }
    if (this.refreshPromise) {
      if (force) {
        void this.refreshPromise.finally(() => this.refresh(true));
      }
      return;
    }
    this.refreshPromise = this.sync().finally(() => {
      this.refreshPromise = null;
    });
  }

  private async sync(): Promise<void> {
    const tenantId = this.auth.user_info?.tenant_id;
    if (!tenantId) {
      return;
    }

    let meta: SystemLogoMeta;
    try {
      meta = await firstValueFrom(
        this.http.get<SystemLogoMeta>(`${this.api}/tenant/fiscal-configurations/system-logo`),
      );
    } catch {
      return;
    }

    if (!meta?.enabled || !meta.cache_key) {
      this.clearCache();
      this.dataUrl.set(null);
      this.checkedThisSession = true;
      return;
    }

    const cached = this.readCache();
    if (
      cached &&
      cached.tenantId === tenantId &&
      cached.cacheKey === meta.cache_key &&
      cached.dataUrl
    ) {
      this.dataUrl.set(cached.dataUrl);
      this.checkedThisSession = true;
      return;
    }

    try {
      const blob = await firstValueFrom(
        this.http.get(`${this.api}/tenant/fiscal-configurations/system-logo/file`, {
          responseType: 'blob',
        }),
      );
      const dataUrl = await this.blobToDataUrl(blob);
      this.writeCache({ tenantId, cacheKey: meta.cache_key, dataUrl });
      this.dataUrl.set(dataUrl);
      this.checkedThisSession = true;
    } catch {
      // Si falla la descarga, se conserva la imagen anterior.
    }
  }

  private readMatchingCache(): string | null {
    const cached = this.readCache();
    const tenantId = this.auth.user_info?.tenant_id;
    if (!cached || !tenantId || cached.tenantId !== tenantId || !cached.dataUrl) {
      return null;
    }
    return cached.dataUrl;
  }

  private readCache(): SystemLogoCache | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as SystemLogoCache;
      if (!parsed?.tenantId || !parsed.cacheKey || !parsed.dataUrl?.startsWith('data:image/')) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private writeCache(entry: SystemLogoCache): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(entry));
    } catch {
      // Si el almacenamiento está lleno, la imagen queda solo en memoria de esta sesión.
    }
  }

  private clearCache(): void {
    localStorage.removeItem(this.storageKey);
  }

  private async blobToDataUrl(blob: Blob): Promise<string> {
    try {
      const bitmap = await createImageBitmap(blob);
      const maxWidth = 480;
      const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        bitmap.close();
        return this.blobToRawDataUrl(blob);
      }
      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();
      return canvas.toDataURL('image/png');
    } catch {
      return this.blobToRawDataUrl(blob);
    }
  }

  private blobToRawDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
}

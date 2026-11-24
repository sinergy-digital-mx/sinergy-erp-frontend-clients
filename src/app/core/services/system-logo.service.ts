import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { SystemBrandMeta, SystemBrandService } from './system-brand.service';

interface SystemLogoMeta {
  enabled: boolean;
  cache_key: string | null;
  brand?: SystemBrandMeta;
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
  /** Si cambia el recorte del PNG, las imágenes ya guardadas se vuelven a bajar. */
  private readonly imageProcessVersion = '2';
  private readonly api = environment.api;
  /** No consultar el menú en cada foco si ya se revisó hace poco. */
  private readonly recheckMs = 2 * 60 * 1000;
  private checkedThisSession = false;
  private syncedTenantId: string | null = null;
  private lastCheckedAt = 0;
  private refreshPromise: Promise<void> | null = null;

  readonly dataUrl = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private brand: SystemBrandService,
  ) {
    this.dataUrl.set(this.readMatchingCache());
    this.bindRecheck();
  }

  /** Al salir de la sesión, la siguiente entrada vuelve a preguntar logo y colores. */
  endSession(): void {
    this.checkedThisSession = false;
    this.syncedTenantId = null;
    this.lastCheckedAt = 0;
  }

  /** Compara la versión guardada. No descarga la imagen si sigue igual. */
  refresh(force = false): void {
    if (!this.auth.token) {
      return;
    }
    const tenantId = this.auth.user_info?.tenant_id ?? null;
    if (tenantId && this.syncedTenantId && tenantId !== this.syncedTenantId) {
      this.checkedThisSession = false;
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
    this.lastCheckedAt = Date.now();
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
      this.lastCheckedAt = Date.now();
      return;
    }

    if (meta?.brand) {
      this.brand.sync(tenantId, meta.brand);
    }
    this.syncedTenantId = tenantId;
    this.lastCheckedAt = Date.now();

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
      cached.cacheKey === this.imageCacheKey(meta.cache_key) &&
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
      this.writeCache({ tenantId, cacheKey: this.imageCacheKey(meta.cache_key), dataUrl });
      this.dataUrl.set(dataUrl);
      this.checkedThisSession = true;
    } catch {
      // Si falla la descarga, se conserva la imagen anterior.
    }
  }

  private bindRecheck(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible' || !this.auth.token) {
        return;
      }
      if (Date.now() - this.lastCheckedAt < this.recheckMs) {
        return;
      }
      this.refresh(true);
    });
  }

  private imageCacheKey(serverKey: string): string {
    return `${serverKey}:${this.imageProcessVersion}`;
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
      if (!parsed.cacheKey.endsWith(`:${this.imageProcessVersion}`)) {
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
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        bitmap.close();
        return this.blobToRawDataUrl(blob);
      }
      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();
      return this.isolateLogo(canvas).toDataURL('image/png');
    } catch {
      return this.blobToRawDataUrl(blob);
    }
  }

  /**
   * Quita el blanco pegado al borde del PNG y recorta el espacio vacío,
   * para que el logo se asiente sobre el menú y no dentro de un cuadro.
   */
  private isolateLogo(source: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = source.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return source;
    }
    const { width, height } = source;
    const image = ctx.getImageData(0, 0, width, height);
    this.clearEdgeBackground(image);
    const after = this.countOpaque(image.data);
    // Un logo casi todo blanco no se vacía: se deja como vino.
    if (after < 24) {
      return source;
    }
    ctx.putImageData(image, 0, 0);
    this.clearLightFringe(image);
    ctx.putImageData(image, 0, 0);
    return this.cropToOpaque(source, image.data) ?? source;
  }

  private countOpaque(data: Uint8ClampedArray): number {
    let count = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 16) {
        count++;
      }
    }
    return count;
  }

  private isNearWhite(data: Uint8ClampedArray, offset: number): boolean {
    if (data[offset + 3] < 16) {
      return false;
    }
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return min >= 236 && max - min <= 18;
  }

  private clearEdgeBackground(image: ImageData): void {
    const { data, width, height } = image;
    const seen = new Uint8Array(width * height);
    const stack: number[] = [];
    const push = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return;
      }
      const pixel = y * width + x;
      if (seen[pixel]) {
        return;
      }
      const offset = pixel * 4;
      const open = data[offset + 3] < 16 || this.isNearWhite(data, offset);
      if (!open) {
        return;
      }
      seen[pixel] = 1;
      stack.push(pixel);
    };
    for (let x = 0; x < width; x++) {
      push(x, 0);
      push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      push(0, y);
      push(width - 1, y);
    }
    while (stack.length) {
      const pixel = stack.pop() as number;
      const offset = pixel * 4;
      if (data[offset + 3] >= 16) {
        data[offset + 3] = 0;
      }
      const x = pixel % width;
      const y = (pixel - x) / width;
      push(x + 1, y);
      push(x - 1, y);
      push(x, y + 1);
      push(x, y - 1);
    }
  }

  private clearLightFringe(image: ImageData): void {
    const { data, width, height } = image;
    for (let pass = 0; pass < 2; pass++) {
      const clear: number[] = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          if (!this.isNearWhite(data, offset)) {
            continue;
          }
          const touches =
            (x > 0 && data[offset - 1] < 16) ||
            (x + 1 < width && data[offset + 7] < 16) ||
            (y > 0 && data[offset - width * 4 + 3] < 16) ||
            (y + 1 < height && data[offset + width * 4 + 3] < 16);
          if (touches) {
            clear.push(offset);
          }
        }
      }
      for (const offset of clear) {
        data[offset + 3] = 0;
      }
    }
  }

  private cropToOpaque(source: HTMLCanvasElement, data: Uint8ClampedArray): HTMLCanvasElement | null {
    const { width, height } = source;
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] <= 12) {
          continue;
        }
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) {
      return null;
    }
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    if (cropW === width && cropH === height) {
      return source;
    }
    const out = document.createElement('canvas');
    out.width = cropW;
    out.height = cropH;
    const ctx = out.getContext('2d');
    if (!ctx) {
      return source;
    }
    ctx.drawImage(source, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    return out;
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

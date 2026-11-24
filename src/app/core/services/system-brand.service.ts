import { Injectable } from '@angular/core';
import {
  BrandNavColors,
  DEFAULT_BRAND_NAV_COLORS,
  normalizeBrandHex,
} from '../brand/brand-nav-colors';
import { AuthService } from './auth.service';

interface BrandCacheEntry {
  cacheKey: string;
  start: string;
  mid: string;
  end: string;
}

interface BrandCacheFile {
  byTenant: Record<string, BrandCacheEntry>;
}

export interface SystemBrandMeta {
  cache_key: string;
  start: string;
  mid: string;
  end: string;
}

/**
 * Colores del menú. La base es la fuente; el navegador guarda la última
 * versión por organización para pintarla antes de volver a preguntar.
 */
@Injectable({ providedIn: 'root' })
export class SystemBrandService {
  static readonly storageKey = 'sinergy.system_brand';

  constructor(private auth: AuthService) {
    this.applyForCurrentTenant();
  }

  /** Pinta lo guardado de esta organización, o el degradado de Pólux. */
  applyForCurrentTenant(): void {
    const tenantId = this.auth.user_info?.tenant_id;
    const cached = tenantId ? this.readTenant(tenantId) : null;
    this.apply(cached ?? { ...DEFAULT_BRAND_NAV_COLORS });
  }

  /** Respuesta del servidor. Si la clave no cambió, igual deja el menú al día. */
  sync(tenantId: string, brand: SystemBrandMeta): void {
    if (!tenantId || !brand) {
      return;
    }
    const colors: BrandNavColors = {
      start: normalizeBrandHex(brand.start, DEFAULT_BRAND_NAV_COLORS.start),
      mid: normalizeBrandHex(brand.mid, DEFAULT_BRAND_NAV_COLORS.mid),
      end: normalizeBrandHex(brand.end, DEFAULT_BRAND_NAV_COLORS.end),
    };
    this.writeTenant(tenantId, {
      cacheKey: brand.cache_key,
      ...colors,
    });
    this.apply(colors);
  }

  apply(colors: BrandNavColors): void {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    root.style.setProperty('--brand-nav-start', colors.start);
    root.style.setProperty('--brand-nav-mid', colors.mid);
    root.style.setProperty('--brand-nav-end', colors.end);
    this.paintStatusBar(colors.start);
  }

  /** Fuera del menú, la barra del celular vuelve al índigo de Pólux. */
  releaseStatusBar(): void {
    this.paintStatusBar(DEFAULT_BRAND_NAV_COLORS.start);
  }

  private paintStatusBar(color: string): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', color);
    });
  }

  private readTenant(tenantId: string): BrandNavColors | null {
    const entry = this.readFile()?.byTenant?.[tenantId];
    if (!entry) {
      return null;
    }
    const start = normalizeBrandHex(entry.start, '');
    const mid = normalizeBrandHex(entry.mid, '');
    const end = normalizeBrandHex(entry.end, '');
    if (!start || !mid || !end) {
      return null;
    }
    return { start, mid, end };
  }

  private writeTenant(tenantId: string, entry: BrandCacheEntry): void {
    const file = this.readFile() ?? { byTenant: {} };
    file.byTenant[tenantId] = entry;
    try {
      localStorage.setItem(SystemBrandService.storageKey, JSON.stringify(file));
    } catch {
      // Si el almacenamiento está lleno, los colores quedan solo en esta sesión.
    }
  }

  private readFile(): BrandCacheFile | null {
    try {
      const raw = localStorage.getItem(SystemBrandService.storageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as BrandCacheFile;
      if (!parsed?.byTenant || typeof parsed.byTenant !== 'object') {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
}

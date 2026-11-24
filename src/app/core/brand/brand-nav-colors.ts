/**
 * Degradado del menú, de arriba a abajo (0% / 50% / 100%).
 * Debe coincidir con el fallback de sidebar.scss y con el backend.
 * El de arriba también es el fondo del celular.
 */
export const DEFAULT_BRAND_NAV_COLORS = {
  start: '#1e1b4b',
  mid: '#312e81',
  end: '#4c1d95',
} as const;

export type BrandNavStop = 'start' | 'mid' | 'end';

export interface BrandNavColors {
  start: string;
  mid: string;
  end: string;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function isBrandHex(value: string | null | undefined): boolean {
  return HEX.test(String(value ?? '').trim());
}

export function normalizeBrandHex(value: string | null | undefined, fallback: string): string {
  const raw = String(value ?? '').trim();
  return isBrandHex(raw) ? raw.toLowerCase() : fallback;
}

/** 0 = negro, 1 = blanco. Sirve para avisar si el texto blanco del menú se pierde. */
export function brandHexLuminance(hex: string): number {
  if (!isBrandHex(hex)) {
    return 0;
  }
  const n = parseInt(hex.trim().slice(1), 16);
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

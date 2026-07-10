export type FiscalPersonType = 'fisica' | 'moral' | 'otro';

export const FISCAL_PERSON_TYPE_OPTIONS: ReadonlyArray<{ value: FiscalPersonType; label: string }> = [
  { value: 'fisica', label: 'Persona física' },
  { value: 'moral', label: 'Persona moral' },
  { value: 'otro', label: 'Otro' },
];

const FISCAL_PERSON_TYPE_LABELS: Record<FiscalPersonType, string> = {
  fisica: 'Persona física',
  moral: 'Persona moral',
  otro: 'Otro',
};

export function isValidFiscalPersonType(value: string | null | undefined): value is FiscalPersonType {
  const normalized = (value ?? '').trim().toLowerCase();
  return normalized === 'fisica' || normalized === 'moral' || normalized === 'otro';
}

export function inferFiscalPersonTypeFromRfc(rfc: string | null | undefined): FiscalPersonType | null {
  const clean = (rfc ?? '').trim().replace(/\s/g, '').toUpperCase();
  if (clean.length === 13) return 'fisica';
  if (clean.length === 12) return 'moral';
  return null;
}

/** Normaliza valor del API (p. ej. códigos SAT erróneos) o infiere desde RFC. */
export function resolveFiscalPersonType(
  value: string | null | undefined,
  rfc?: string | null
): FiscalPersonType | '' {
  const normalized = (value ?? '').trim().toLowerCase();
  if (isValidFiscalPersonType(normalized)) return normalized;
  return inferFiscalPersonTypeFromRfc(rfc) ?? '';
}

export function getFiscalPersonTypeLabel(value: string | null | undefined): string {
  const normalized = (value ?? '').trim().toLowerCase();
  if (isValidFiscalPersonType(normalized)) {
    return FISCAL_PERSON_TYPE_LABELS[normalized];
  }
  return '—';
}

export function sanitizeFiscalPersonTypeForApi(value: unknown): FiscalPersonType | undefined {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return isValidFiscalPersonType(normalized) ? normalized : undefined;
}

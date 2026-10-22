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

const GENERIC_RFCS = new Set(['XAXX010101000', 'XEXX010101000']);

export function inferFiscalPersonTypeFromRfc(rfc: string | null | undefined): FiscalPersonType | null {
  const clean = (rfc ?? '').trim().replace(/\s/g, '').toUpperCase();
  if (clean.length === 13) return 'fisica';
  if (clean.length === 12) return 'moral';
  return null;
}

/** El RFC manda. Un tipo de persona viejo no fuerza 612 sobre un RFC de 12. */
export function inferReceptorRegimen(
  rfc: string | null | undefined,
  personType?: string | null,
): string {
  const clean = (rfc ?? '').trim().replace(/[\s-]/g, '').toUpperCase();
  if (GENERIC_RFCS.has(clean)) return '616';
  if (clean.length === 12) return '601';
  if (clean.length === 13) return '612';
  return String(personType ?? '').trim().toLowerCase() === 'fisica' ? '612' : '601';
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

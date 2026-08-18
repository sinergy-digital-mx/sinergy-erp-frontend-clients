/** Clave SAT c_Pais por defecto cuando hay domicilio fiscal. */
export const SAT_COUNTRY_MEX = 'MEX';

function trimFiscal(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Calle: campo CSF o dirección concatenada de clientes viejos. */
export function resolveFiscalStreet(customer: {
  fiscal_street?: string | null;
  fiscal_address?: string | null;
}): string {
  return trimFiscal(customer.fiscal_street) || trimFiscal(customer.fiscal_address);
}

/** Municipio o alcaldía: campo CSF o ciudad legado. */
export function resolveFiscalMunicipio(customer: {
  fiscal_municipio?: string | null;
  fiscal_city?: string | null;
}): string {
  return trimFiscal(customer.fiscal_municipio) || trimFiscal(customer.fiscal_city);
}

export function hasFiscalDomicile(customer: {
  fiscal_street?: string | null;
  fiscal_address?: string | null;
  fiscal_municipio?: string | null;
  fiscal_city?: string | null;
  fiscal_postal_code?: string | null;
  fiscal_state?: string | null;
  fiscal_colonia?: string | null;
  fiscal_exterior_number?: string | null;
  fiscal_interior_number?: string | null;
  fiscal_localidad?: string | null;
}): boolean {
  return !!(
    resolveFiscalStreet(customer) ||
    resolveFiscalMunicipio(customer) ||
    trimFiscal(customer.fiscal_postal_code) ||
    trimFiscal(customer.fiscal_state) ||
    trimFiscal(customer.fiscal_colonia) ||
    trimFiscal(customer.fiscal_exterior_number) ||
    trimFiscal(customer.fiscal_interior_number) ||
    trimFiscal(customer.fiscal_localidad)
  );
}

/** Etiqueta de país para ficha (MEX → México). */
export function formatFiscalCountryLabel(code: string | null | undefined): string {
  const normalized = trimFiscal(code).toUpperCase();
  if (!normalized) return '—';
  if (normalized === SAT_COUNTRY_MEX) return 'México (MEX)';
  return normalized;
}

export function resolveFiscalCountryLabel(customer: {
  fiscal_country?: string | null;
  fiscal_street?: string | null;
  fiscal_address?: string | null;
  fiscal_municipio?: string | null;
  fiscal_city?: string | null;
  fiscal_postal_code?: string | null;
  fiscal_state?: string | null;
  fiscal_colonia?: string | null;
  fiscal_exterior_number?: string | null;
  fiscal_interior_number?: string | null;
  fiscal_localidad?: string | null;
}): string {
  const code = trimFiscal(customer.fiscal_country).toUpperCase();
  if (code) return formatFiscalCountryLabel(code);
  return hasFiscalDomicile(customer) ? formatFiscalCountryLabel(SAT_COUNTRY_MEX) : '—';
}

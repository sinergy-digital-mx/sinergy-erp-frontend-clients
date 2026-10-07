export interface FiscalConfiguration {
  id: string;
  tenant_id: string;
  warehouse_id: string;
  razon_social: string;
  rfc: string;
  prefix?: string | null;
  quotation_expiration_days?: number | null;
  advance_invoicing_enabled?: boolean;
  persona_type: 'Persona Física' | 'Persona Moral';
  branches_count?: number;
  branch_count?: number;
  branches?: unknown[];
  fiscal_regime?: string;
  digital_seal?: string;
  digital_seal_password?: string;
  private_key?: string;
  has_digital_seal?: boolean | number;
  has_private_key?: boolean | number;
  has_digital_seal_password?: boolean | number;
  logo?: string;
  use_as_system_logo?: boolean | number;
  status: 'active' | 'inactive';
  certificate_serial_number?: string;
  finkok_registration_status?: 'pending' | 'registered' | 'failed' | string;
  finkok_registration_error?: string | null;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateFiscalConfigurationDto {
  razon_social: string;
  rfc: string;
  prefix?: string | null;
  quotation_expiration_days?: number | null;
  advance_invoicing_enabled?: boolean;
  persona_type: 'Persona Física' | 'Persona Moral';
  fiscal_regime?: string;
  digital_seal?: string;
  digital_seal_password?: string;
  private_key?: string;
  use_as_system_logo?: boolean;
  status?: 'active' | 'inactive';
  metadata?: Record<string, any>;
}

export interface UpdateFiscalConfigurationDto extends Partial<CreateFiscalConfigurationDto> {}

export interface FiscalConfigurationListResponse {
  data: FiscalConfiguration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FiscalConfigurationQueryParams {
  page?: number;
  limit?: number;
  warehouse_id?: string;
  status?: 'active' | 'inactive';
}

export type FiscalRegimeAppliesTo = 'fisica' | 'moral' | 'both';

export interface FiscalRegimeOption {
  id: string;
  name: string;
  appliesTo: FiscalRegimeAppliesTo;
}

/** Catálogo SAT c_RegimenFiscal, filtrable por tipo de persona. */
export const FISCAL_REGIMES: FiscalRegimeOption[] = [
  { id: '601', name: '601 - General de Ley Personas Morales', appliesTo: 'moral' },
  { id: '603', name: '603 - Personas Morales con Fines no Lucrativos', appliesTo: 'moral' },
  { id: '605', name: '605 - Sueldos y Salarios e Ingresos Asimilados a Salarios', appliesTo: 'fisica' },
  { id: '606', name: '606 - Arrendamiento', appliesTo: 'fisica' },
  { id: '607', name: '607 - Régimen de Enajenación o Adquisición de Bienes', appliesTo: 'both' },
  { id: '608', name: '608 - Demás ingresos', appliesTo: 'fisica' },
  { id: '610', name: '610 - Residentes en el Extranjero sin Establecimiento Permanente en México', appliesTo: 'both' },
  { id: '611', name: '611 - Ingresos por Dividendos (socios y accionistas)', appliesTo: 'fisica' },
  { id: '612', name: '612 - Personas Físicas con Actividades Empresariales y Profesionales', appliesTo: 'fisica' },
  { id: '614', name: '614 - Ingresos por intereses', appliesTo: 'fisica' },
  { id: '615', name: '615 - Régimen de los ingresos por obtención de premios', appliesTo: 'fisica' },
  { id: '616', name: '616 - Sin obligaciones fiscales', appliesTo: 'fisica' },
  { id: '620', name: '620 - Sociedades Cooperativas de Producción que optan por diferir sus ingresos', appliesTo: 'moral' },
  { id: '621', name: '621 - Incorporación Fiscal', appliesTo: 'fisica' },
  { id: '622', name: '622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras', appliesTo: 'moral' },
  { id: '623', name: '623 - Opcional para Grupos de Sociedades', appliesTo: 'moral' },
  { id: '624', name: '624 - Coordinados', appliesTo: 'moral' },
  { id: '625', name: '625 - Actividades Empresariales con ingresos a través de Plataformas Tecnológicas', appliesTo: 'fisica' },
  { id: '626', name: '626 - Régimen Simplificado de Confianza', appliesTo: 'both' },
];

export function fiscalRegimesForPersona(personaType: string | null | undefined): FiscalRegimeOption[] {
  const key: FiscalRegimeAppliesTo = personaType === 'Persona Física' ? 'fisica' : 'moral';
  return FISCAL_REGIMES.filter((regime) => regime.appliesTo === key || regime.appliesTo === 'both');
}

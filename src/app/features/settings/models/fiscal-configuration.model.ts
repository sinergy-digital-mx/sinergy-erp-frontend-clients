export interface FiscalConfiguration {
  id: string;
  tenant_id: string;
  warehouse_id: string;
  razon_social: string;
  rfc: string;
  persona_type: 'Persona Física' | 'Persona Moral';
  fiscal_regime?: string;
  digital_seal?: string;
  digital_seal_password?: string;
  private_key?: string;
  status: 'active' | 'inactive';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateFiscalConfigurationDto {
  razon_social: string;
  rfc: string;
  persona_type: 'Persona Física' | 'Persona Moral';
  fiscal_regime?: string;
  digital_seal?: string;
  digital_seal_password?: string;
  private_key?: string;
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

export const FISCAL_REGIMES = [
  { id: '601', name: '601 - Régimen General de Ley Personas Morales' },
  { id: '603', name: '603 - Personas Morales con Régimen de Intereses' },
  { id: '605', name: '605 - Personas Morales con Régimen de Actividades Agrícolas' },
  { id: '606', name: '606 - Personas Morales con Régimen de Actividades Ganaderas' },
  { id: '607', name: '607 - Personas Morales con Régimen de Actividades Pesqueras' },
  { id: '608', name: '608 - Personas Morales con Régimen de Actividades Silvícolas' },
  { id: '609', name: '609 - Personas Morales con Régimen de Actividades Forestales' },
  { id: '610', name: '610 - Personas Morales con Régimen de Actividades Mineras' },
  { id: '611', name: '611 - Personas Morales con Régimen de Actividades Petroleras' },
  { id: '614', name: '614 - Personas Morales con Régimen de Actividades de Transporte' },
  { id: '616', name: '616 - Personas Morales con Régimen de Actividades de Telecomunicaciones' },
  { id: '620', name: '620 - Personas Morales con Régimen de Actividades de Servicios Financieros' },
  { id: '621', name: '621 - Personas Morales con Régimen de Actividades de Seguros' },
  { id: '622', name: '622 - Personas Morales con Régimen de Actividades de Fianzas' },
  { id: '623', name: '623 - Personas Morales con Régimen de Actividades de Fondos de Pensiones' },
  { id: '624', name: '624 - Personas Morales con Régimen de Actividades de Administración de Fondos' },
  { id: '625', name: '625 - Personas Morales con Régimen de Actividades de Sociedades de Inversión' },
  { id: '626', name: '626 - Personas Morales con Régimen de Actividades de Sociedades de Crédito' },
  { id: '627', name: '627 - Personas Morales con Régimen de Actividades de Uniones de Crédito' },
  { id: '628', name: '628 - Personas Morales con Régimen de Actividades de Instituciones de Crédito' },
  { id: '629', name: '629 - Personas Morales con Régimen de Actividades de Casas de Bolsa' },
  { id: '630', name: '630 - Personas Morales con Régimen de Actividades de Mercados de Futuros' }
];

export type InvoiceStampStatus =
  | 'pending'
  | 'pending_stamp'
  | 'stamped'
  | 'stamp_error'
  | 'cancel_pending'
  | 'cancelled'
  | string;

export type InvoiceSatStatus = 'Vigente' | 'Cancelado' | string;

export interface FinkokIncidencia {
  code?: string;
  message?: string;
}

export interface SalesOrderElectronicInvoice {
  id: string;
  sales_order_id?: string;
  uuid?: string | null;
  series?: string | null;
  folio?: string | null;
  total?: string | number;
  stamp_status?: InvoiceStampStatus;
  sat_status?: InvoiceSatStatus;
  sat_es_cancelable?: string | null;
  stamped_at?: string | null;
  sat_last_sync_at?: string | null;
  xml_stamped?: string | null;
  xml_unsigned?: string | null;
  stamp_error_message?: string | null;
  issued_at?: string | null;
  status?: string | null;
  metadata?: {
    finkok_incidencias?: FinkokIncidencia[];
    [key: string]: unknown;
  };
}

export interface StampSalesOrderInvoicePayload {
  xml: string;
  series?: string;
  folio?: string;
  certificate_serial?: string;
}

export interface CancelSalesOrderInvoicePayload {
  motivo: '01' | '02' | '03' | '04';
  folio_sustitucion?: string;
}

export interface SalesOrderInvoicePdfResponse {
  signedUrl: string;
  fileName?: string;
  preview?: boolean;
}

export interface FinkokConfiguration {
  finkok_username?: string;
  environment?: 'demo' | 'production' | string;
  is_active?: number | boolean;
  has_password?: boolean;
  last_connection_test_status?: string | null;
}

export type { FinkokConfigurationsResponse } from '../../settings/models/finkok-configuration.model';
export { hasFinkokCredentials } from '../../settings/models/finkok-configuration.model';

export interface InvoiceValidationIssue {
  id: string;
  message: string;
  actionLabel?: string;
  action?: 'finkok' | 'fiscal' | 'customer' | 'xml';
}

export const CFDI_USO_OPTIONS = [
  { id: 'G01', name: 'G01 - Adquisición de mercancías' },
  { id: 'G02', name: 'G02 - Devoluciones, descuentos o bonificaciones' },
  { id: 'G03', name: 'G03 - Gastos en general' },
  { id: 'I01', name: 'I01 - Construcciones' },
  { id: 'I02', name: 'I02 - Mobiliario y equipo de oficina' },
  { id: 'I03', name: 'I03 - Equipo de transporte' },
  { id: 'I04', name: 'I04 - Equipo de cómputo' },
  { id: 'I08', name: 'I08 - Otra maquinaria y equipo' },
  { id: 'D01', name: 'D01 - Honorarios médicos' },
  { id: 'D10', name: 'D10 - Pagos por servicios educativos' },
  { id: 'S01', name: 'S01 - Sin efectos fiscales' },
  { id: 'CP01', name: 'CP01 - Pagos' },
  { id: 'CN01', name: 'CN01 - Nómina' },
];

export const CFDI_FORMA_PAGO_OPTIONS = [
  { id: '01', name: '01 - Efectivo' },
  { id: '02', name: '02 - Cheque nominativo' },
  { id: '03', name: '03 - Transferencia electrónica' },
  { id: '04', name: '04 - Tarjeta de crédito' },
  { id: '28', name: '28 - Tarjeta de débito' },
  { id: '99', name: '99 - Por definir' },
];

export const CFDI_REGIMEN_RECEPTOR_OPTIONS = [
  { id: '601', name: '601 - General de Ley Personas Morales' },
  { id: '603', name: '603 - Personas Morales con fines no lucrativos' },
  { id: '605', name: '605 - Sueldos y Salarios' },
  { id: '606', name: '606 - Arrendamiento' },
  { id: '612', name: '612 - Personas Físicas con Actividades Empresariales' },
  { id: '616', name: '616 - Sin obligaciones fiscales' },
  { id: '626', name: '626 - Régimen Simplificado de Confianza' },
];

export const CFDI_CANCEL_MOTIVO_OPTIONS = [
  { id: '01', name: '01 - Comprobante emitido con errores con relación' },
  { id: '02', name: '02 - Comprobante emitido con errores sin relación' },
  { id: '03', name: '03 - No se llevó a cabo la operación' },
  { id: '04', name: '04 - Operación nominativa en factura global' },
];

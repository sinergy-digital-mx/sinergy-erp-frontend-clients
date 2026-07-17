/**
 * Divino — Formatos de Reservación
 *
 * Cotización/apartado de un LOTE (no venta real) que replica el formato de
 * reservación en papel de Divino y permite enviarlo por correo con el PDF adjunto.
 */

export type DivinoReservationFormatStatus = 'draft' | 'sent';

export type DivinoPaymentDay = '1' | '15';

export type DivinoLeadSource =
  | 'facebook'
  | 'instagram'
  | 'google'
  | 'restaurante'
  | 'walkin'
  | 'referido'
  | 'otro';

export interface DivinoReservationFormatProperty {
  id: string;
  code: string;
  name: string;
  block?: string;
  lot_number?: string;
}

export interface DivinoReservationFormatFiscalConfiguration {
  id: string;
  razon_social: string;
  logo?: string;
}

export interface DivinoReservationFormatCreator {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface DivinoReservationFormat {
  id: string;
  folio: string;
  status: DivinoReservationFormatStatus;

  // Encabezado
  fiscal_configuration_id?: string | null;
  fiscal_configuration?: DivinoReservationFormatFiscalConfiguration | null;
  payable_to?: string | null;

  // Recepción de fondos
  received_from?: string | null;
  amount_in_words?: string | null;
  evidenced_by?: string | null;

  // LOTE
  property_id: string;
  property?: DivinoReservationFormatProperty | null;
  block?: string | null;
  lot_number?: string | null;
  surface?: string | number | null;
  purchase_price?: number | null;
  currency?: string | null;

  // Plan de pagos
  reservation_deposit?: number | null;
  reservation_date?: string | null;
  down_payment?: number | null;
  down_payment_date?: string | null;
  financed_balance?: number | null;
  financing_years?: number | null;
  monthly_payments_count?: number | null;
  monthly_payment_amount?: number | null;
  maintenance_fee?: number | null;
  maintenance_currency?: string | null;
  payment_day?: DivinoPaymentDay | null;

  // Comprador
  buyer_name?: string | null;
  buyer_address?: string | null;
  buyer_phone?: string | null;
  buyer_email?: string | null;

  // Origen
  lead_source?: DivinoLeadSource | null;
  lead_source_other?: string | null;

  // Pie
  format_date?: string | null;
  agent_name?: string | null;
  notes?: string | null;

  // Auditoría
  created_by?: string | null;
  created_by_name?: string | null;
  creator?: DivinoReservationFormatCreator | null;
  sent_at?: string | null;
  sent_to?: string | null;
  sent_by?: string | null;

  created_at?: string;
  updated_at?: string;
}

export interface CreateDivinoReservationFormatDto {
  property_id: string;
  fiscal_configuration_id?: string | null;
  payable_to?: string | null;

  received_from?: string | null;
  amount_in_words?: string | null;
  evidenced_by?: string | null;

  purchase_price?: number | null;
  currency?: string | null;

  reservation_deposit?: number | null;
  reservation_date?: string | null;
  down_payment?: number | null;
  down_payment_date?: string | null;
  financed_balance?: number | null;
  financing_years?: number | null;
  monthly_payments_count?: number | null;
  monthly_payment_amount?: number | null;
  maintenance_fee?: number | null;
  maintenance_currency?: string | null;
  payment_day?: DivinoPaymentDay | null;

  buyer_name?: string | null;
  buyer_address?: string | null;
  buyer_phone?: string | null;
  buyer_email?: string | null;

  lead_source?: DivinoLeadSource | null;
  lead_source_other?: string | null;

  format_date?: string | null;
  agent_name?: string | null;
  notes?: string | null;
}

export type UpdateDivinoReservationFormatDto = Partial<CreateDivinoReservationFormatDto>;

export interface QueryDivinoReservationFormatParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: DivinoReservationFormatStatus;
  property_id?: string;
}

export interface SendDivinoReservationFormatDto {
  to_email?: string;
  cc?: string[];
  bcc?: string[];
  subject?: string;
  message?: string;
}

export interface DivinoReservationFormatListResponse {
  data: DivinoReservationFormat[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const DIVINO_LEAD_SOURCE_OPTIONS: { value: DivinoLeadSource; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'walkin', label: 'Walk-in' },
  { value: 'referido', label: 'Referido' },
  { value: 'otro', label: 'Otro' },
];

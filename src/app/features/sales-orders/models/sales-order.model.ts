import { PosSaleCollection } from '../../pos/models/pos-sale-collection.model';
import { PosSaleReceipt, normalizePosSaleReceipt } from '../../pos/models/pos-receipt.model';
import {
  SalesOrderPayment,
  SalesOrderPaymentDisplay,
  SalesOrderPaymentsSummary,
} from './sales-order-payment.model';

export type SalesOrderStatus =
  | 'Creada'
  | 'En Selección'
  | 'Lista para entrega'
  | 'Surtida'
  | 'En Camino'
  | 'Cancelada';
export type SalesPaymentStatus = 'Pendiente' | 'Pagado';
export type SalesOrderType = 'POS' | 'MANUAL';
export type SalesOrderCollectionChannel = 'pos_cobranza' | 'manual' | 'mixed';

export interface SalesOrderUserSummary {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface Customer {
  id: number | string;
  name: string;
  lastname?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  fiscal_rfc?: string;
  fiscal_razon_social?: string;
  fiscal_postal_code?: string;
  /** Legado: usar `fiscal_postal_code`. */
  fiscal_zip_code?: string;
}

export interface SalesOrderCustomerSummary {
  id?: number;
  name?: string;
  lastname?: string;
  display_name?: string;
  company_name?: string;
  is_walk_in?: boolean;
}

export interface SalesOrderLineItem {
  id?: string;
  sales_order_id?: string;
  product_id: string;
  product_uom_id: string;
  quantity: string | number;
  quantity_base_uom?: string;
  base_uom_id?: string;
  unit_price: string | number;
  discount_percentage?: string | number;
  discount_unit?: string | number;
  line_discount_amount?: string | number;
  applied_product_discount?: SalesOrderAppliedProductDiscount | null;
  iva_percentage?: string | number;
  iva_unit?: string | number;
  ieps_percentage?: string | number;
  ieps_unit?: string | number;
  line_subtotal?: string | number;
  line_iva?: string | number;
  line_ieps?: string | number;
  line_total?: string | number;
  uom_name?: string;
  base_uom_name?: string;
  product?: { id: string; name: string; sku: string };
  product_uom?: { id: string; factor: number; uom?: { id?: string; name?: string } };
  base_uom?: { id?: string; name?: string };
  batch_allocations?: any[];
  created_at?: string;
}

export interface SalesOrderInvoice {
  id?: string;
  folio?: string;
  uuid?: string;
  issued_at?: string;
  total?: string | number;
  status?: string;
}

export type SalesDocumentLanguage = 'es' | 'en';

export interface SalesOrderDocument {
  id: string;
  document_type_name: string;
  document_language?: SalesDocumentLanguage | null;
  document_name?: string;
  path?: string;
  uploaded_at?: string;
}

export interface RegenerateSalesDocumentResponse {
  success: boolean;
  message: string;
  document_language: SalesDocumentLanguage;
  keep_previous?: boolean;
}

export interface TicketReciboResponse {
  success: boolean;
  message: string;
  regenerated: boolean;
  receipt?: PosSaleReceipt | null;
  documents?: SalesOrderDocument[];
}

/** @deprecated Use TicketReciboResponse */
export type RegenerateTicketReciboResponse = TicketReciboResponse;

export function normalizeTicketReciboResponse(
  raw: unknown,
  defaultRegenerated = false
): TicketReciboResponse {
  if (!raw || typeof raw !== 'object') {
    return { success: false, message: '', regenerated: defaultRegenerated };
  }

  let source = raw as Record<string, unknown>;
  if (source['data'] && typeof source['data'] === 'object' && !Array.isArray(source['data'])) {
    source = source['data'] as Record<string, unknown>;
  }

  const receiptRaw = source['receipt'];
  const documentsRaw = source['documents'];

  return {
    success: source['success'] === true,
    message: source['message'] != null ? String(source['message']) : '',
    regenerated:
      source['regenerated'] === true ||
      (source['regenerated'] !== false && defaultRegenerated),
    receipt: normalizePosSaleReceipt(receiptRaw),
    documents: Array.isArray(documentsRaw) ? (documentsRaw as SalesOrderDocument[]) : undefined,
  };
}

/** @deprecated Use normalizeTicketReciboResponse */
export const normalizeRegenerateTicketReciboResponse = normalizeTicketReciboResponse;

export interface SalesOrderAppliedProductDiscount {
  product_name?: string;
  discount_name?: string;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number | string;
  discount_amount?: number | string;
  line_discount_amount?: number | string;
}

export interface SalesOrderAppliedGlobalDiscount {
  global_discount_id?: string;
  discount_name: string;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number | string;
  discount_amount?: number | string;
}

export interface SalesOrderDiscountSummary {
  line_discount_total: number;
  global_discount_amount: number;
  discount_total: number;
  line_items: SalesOrderAppliedProductDiscount[];
  global_discount: SalesOrderAppliedGlobalDiscount | null;
}

export interface PosUserSummary {
  id?: string;
  first_name?: string;
  last_name?: string;
  pos_user_code?: number | null;
  pos_user_type?: string | null;
}

export interface SalesOrder {
  id: string;
  tenant_id?: string;
  folio?: string;
  /** Folio del ticket de autofactura (`MZN-CTR-INV-000033`). Null si aún no hay ticket. */
  public_invoice_code?: string | null;
  /** URL del portal de autofactura. Null si no hay ticket o no aplica. */
  self_invoice_url?: string | null;
  fiscal_configuration_id?: string;
  customer_id: number | string;
  warehouse_id?: string | null;
  delivery_date?: string;
  expected_delivery_date?: string;
  sales_order_type?: SalesOrderType;
  fiscal_razon_social?: string;
  status?: SalesOrderStatus;
  general_status?: SalesOrderStatus;
  can_cancel?: boolean;
  cancel_blocked_reason?: string | null;
  can_edit_lines?: boolean;
  payment_status: SalesPaymentStatus;
  payment_method?: string | null;
  payment_method_label?: string | null;
  payment_breakdown_label?: string | null;
  collection_channel?: SalesOrderCollectionChannel | null;
  collection_channel_label?: string | null;
  payment_display?: SalesOrderPaymentDisplay | null;
  is_credit?: boolean;
  invoice_requested?: boolean;
  subtotal?: string | number;
  discount_total?: string | number;
  global_discount_amount?: string | number;
  discount_summary?: SalesOrderDiscountSummary;
  iva_total?: string | number;
  ieps_total?: string | number;
  total?: string | number;
  requested_subtotal?: string | number;
  requested_discount_total?: string | number;
  requested_iva_total?: string | number;
  requested_ieps_total?: string | number;
  requested_total?: string | number;
  delivered_subtotal?: string | number;
  delivered_discount_total?: string | number;
  delivered_iva_total?: string | number;
  delivered_ieps_total?: string | number;
  delivered_total?: string | number;
  // legacy compat
  grand_total?: number;
  notes?: string;
  requires_selection_assembly?: boolean;
  control_desk?: SalesOrderControlDesk | null;
  corroborated_at?: string | null;
  corroborated_by?: string | null;
  corroborated_by_user?: SalesOrderUserSummary | null;
  created_by_user?: SalesOrderUserSummary | null;
  line_items?: SalesOrderLineItem[];
  // legacy compat
  lines?: SalesOrderLineItem[];
  customer?: Customer;
  customer_display_name?: string;
  customer_summary?: SalesOrderCustomerSummary;
  pos_collection?: PosSaleCollection;
  seller_user?: PosUserSummary | null;
  assigned_seller_user?: PosUserSummary | null;
  terminal_user?: PosUserSummary;
  collected_by_user?: PosUserSummary;
  warehouse?: { id: string; name: string; zip_code?: string };
  sucursal?: string;
  billing_branch_id?: string;
  billing_branch?: {
    id?: string;
    display_name?: string;
    code?: string;
    city?: string;
    state?: string;
    country?: string;
    address?: string;
    postal_code?: string;
  };
  razon_social?: string;
  fiscal_configuration?: {
    id?: string;
    razon_social?: string;
    business_name?: string;
    rfc?: string;
    prefix?: string | null;
    persona_type?: string;
    fiscal_regime?: string;
    status?: string;
    finkok_registration_status?: string;
    certificate_serial_number?: string;
  };
  invoices?: SalesOrderInvoice[];
  documents?: SalesOrderDocument[];
  payments?: SalesOrderPayment[];
  payments_summary?: SalesOrderPaymentsSummary;
  shipping?: SalesOrderShippingInfo;
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface SalesOrderShippingInfo {
  has_shipping: boolean;
  shipping_id?: string;
  status?: string;
  driver_name?: string;
  truck_name?: string;
  stop_sequence?: number;
  route_summary?: {
    distance_km?: number;
    stops_count?: number;
  };
}

export interface SalesOrderFilters {
  search?: string;
  status?: SalesOrderStatus;
  general_status?: SalesOrderStatus | SalesOrderStatus[] | string;
  payment_status?: SalesPaymentStatus;
  collection_channel?: SalesOrderCollectionChannel;
  sales_order_type?: SalesOrderType;
  customer_id?: string | number;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  dateFrom?: string;
  dateTo?: string;
  is_credit?: boolean;
}

export type SalesOrderExportType = 'headers' | 'details';

export interface SalesOrderExportFilters {
  search?: string;
  general_status?: string | SalesOrderStatus | SalesOrderStatus[];
  payment_status?: string;
  collection_channel?: SalesOrderCollectionChannel;
  sales_order_type?: SalesOrderType;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  customer_id?: number | string;
  created_from?: string;
  created_to?: string;
  is_credit?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface SalesOrderControlDeskMissing {
  product_name?: string;
  warehouse_name?: string;
}

export interface SalesOrderControlDesk {
  job_id?: string;
  status?: string;
  progress?: {
    warehouses_done?: number;
    warehouses_total?: number;
  };
  position?: {
    id?: string;
    code?: string;
  } | null;
  missing?: SalesOrderControlDeskMissing[];
}

export interface SalesOrderFormData {
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  customer_id: number | string;
  /** Obligatorio en POS. No enviar en alta MANUAL. */
  warehouse_id?: string;
  expected_delivery_date?: string;
  sales_order_type?: SalesOrderType;
  fiscal_razon_social?: string;
  seller_user_id?: string;
  assigned_seller_user_id?: string;
  payment_status?: string;
  notes?: string;
  requires_selection_assembly?: boolean;
  global_discount_id?: string;
  line_items: Array<{
    product_id: string;
    product_uom_id: string;
    quantity: number;
    unit_price: number;
    discount_percentage?: number;
    product_discount_id?: string;
    iva_percentage: number;
    ieps_percentage: number;
  }>;
}

export interface SalesOrderProductsSummaryParams {
  fiscal_configuration_id: string;
  billing_branch_id: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface SalesOrderDetailPayload {
  header: SalesOrder;
  line_items: SalesOrderLineItem[];
  documents?: SalesOrderDocument[];
  pos_collection?: PosSaleCollection;
  payments?: SalesOrderPayment[];
  payments_summary?: SalesOrderPaymentsSummary;
  payment_display?: SalesOrderPaymentDisplay;
  discount_summary?: SalesOrderDiscountSummary;
  applied_line_discounts?: SalesOrderAppliedProductDiscount[];
  applied_global_discount?: SalesOrderAppliedGlobalDiscount | null;
  shipping?: SalesOrderShippingInfo;
}

export function normalizeSalesOrderDiscountSummary(raw: unknown): SalesOrderDiscountSummary | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const source = raw as Record<string, unknown>;
  const lineItemsRaw = source['line_items'] ?? source['applied_line_discounts'];
  const lineItems = Array.isArray(lineItemsRaw)
    ? (lineItemsRaw as SalesOrderAppliedProductDiscount[])
    : [];

  const globalRaw = source['global_discount'] ?? source['applied_global_discount'];
  let globalDiscount: SalesOrderAppliedGlobalDiscount | null = null;
  if (globalRaw && typeof globalRaw === 'object') {
    const g = globalRaw as Record<string, unknown>;
    if (g['discount_name'] || g['global_discount_id']) {
      globalDiscount = {
        global_discount_id: g['global_discount_id'] as string | undefined,
        discount_name: String(g['discount_name'] ?? ''),
        discount_type: g['discount_type'] as SalesOrderAppliedGlobalDiscount['discount_type'],
        discount_value: g['discount_value'] as number | string | undefined,
        discount_amount: g['discount_amount'] as number | string | undefined,
      };
    }
  }

  const lineDiscountTotal = Number(source['line_discount_total'] ?? 0);
  const globalDiscountAmount = Number(
    source['global_discount_amount'] ?? globalDiscount?.discount_amount ?? 0
  );
  const discountTotal = Number(
    source['discount_total'] ?? lineDiscountTotal + globalDiscountAmount
  );

  if (
    lineDiscountTotal <= 0 &&
    globalDiscountAmount <= 0 &&
    !globalDiscount &&
    lineItems.length === 0
  ) {
    return null;
  }

  return {
    line_discount_total: lineDiscountTotal,
    global_discount_amount: globalDiscountAmount,
    discount_total: discountTotal,
    line_items: lineItems,
    global_discount: globalDiscount,
  };
}

export interface SalesOrderDetailResponse {
  data: SalesOrderDetailPayload;
}

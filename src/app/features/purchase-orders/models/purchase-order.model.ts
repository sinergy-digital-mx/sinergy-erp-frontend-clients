import { LineItem } from './line-item.model';
import { Payment } from './payment.model';
import { Warehouse } from './warehouse.model';
import { Vendor } from './vendor.model';

// Re-export LineItem for convenience
export type { LineItem } from './line-item.model';

/**
 * Batch entity for inventory tracking
 */
export interface Batch {
  id: string;
  batch_number: string;
  warehouse_id: string;
  warehouse_name?: string;
  warehouse?: {
    id: string;
    name: string;
  };
  product_id: string;
  product_name?: string;
  product_sku?: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  uom_id: string;
  uom_name?: string;
  uom?: {
    id: string;
    name: string;
  };
  quantity?: number | string;
  initial_quantity?: number | string;
  available_quantity?: number | string;
  /** Cantidad pedida en la línea de OC, si el API la manda en el lote. */
  requested_quantity?: number | string;
  /** Cantidad recibida en este lote, si el API la manda. */
  received_quantity?: number | string;
  purchase_order_batch_id: string;
  purchase_order_id?: string;
  purchase_order_detail_id: string;
  created_by: string;
  created_at: string;
}

/**
 * Order status enum
 */
export type OrderStatus = 'Creada' | 'En Proceso' | 'Recibida' | 'Cancelada';

/**
 * Payment status enum
 */
export type PaymentStatus = 'Pagada' | 'Pagado' | 'Parcial' | 'Pendiente' | 'No pagado';
export type PaymentCurrency = 'MXN' | 'USD';

/** Conteo + monto de un cubo en stats del listado (requested_total). */
export interface PurchaseOrderStatBucket {
  count: number;
  amount: number;
}

export interface PurchaseOrderCurrencyStats {
  count: number;
  amount: number;
  by_status: {
    Creada: PurchaseOrderStatBucket;
    Recibida: PurchaseOrderStatBucket;
    Cancelada: PurchaseOrderStatBucket;
  };
  by_payment: {
    Pagado: PurchaseOrderStatBucket;
    Pendiente: PurchaseOrderStatBucket;
  };
}

/** `stats` del GET /purchase-orders: cubre todas las OC de los filtros, no solo la página. */
export interface PurchaseOrderListStats {
  count: number;
  by_currency: {
    MXN: PurchaseOrderCurrencyStats;
    USD: PurchaseOrderCurrencyStats;
  };
}

function emptyStatBucket(): PurchaseOrderStatBucket {
  return { count: 0, amount: 0 };
}

function emptyCurrencyStats(): PurchaseOrderCurrencyStats {
  return {
    count: 0,
    amount: 0,
    by_status: {
      Creada: emptyStatBucket(),
      Recibida: emptyStatBucket(),
      Cancelada: emptyStatBucket(),
    },
    by_payment: {
      Pagado: emptyStatBucket(),
      Pendiente: emptyStatBucket(),
    },
  };
}

export function emptyPurchaseOrderListStats(count = 0): PurchaseOrderListStats {
  return {
    count,
    by_currency: {
      MXN: emptyCurrencyStats(),
      USD: emptyCurrencyStats(),
    },
  };
}

export function normalizePurchaseOrderListStats(
  stats?: PurchaseOrderListStats | null,
  fallbackCount = 0
): PurchaseOrderListStats {
  if (!stats?.by_currency) {
    return emptyPurchaseOrderListStats(fallbackCount);
  }

  return {
    count: Number(stats.count) || fallbackCount,
    by_currency: {
      MXN: mergeCurrencyStats(stats.by_currency.MXN),
      USD: mergeCurrencyStats(stats.by_currency.USD),
    },
  };
}

function mergeCurrencyStats(raw?: PurchaseOrderCurrencyStats | null): PurchaseOrderCurrencyStats {
  if (!raw) {
    return emptyCurrencyStats();
  }

  return {
    count: Number(raw.count) || 0,
    amount: Number(raw.amount) || 0,
    by_status: {
      Creada: mergeStatBucket(raw.by_status?.Creada),
      Recibida: mergeStatBucket(raw.by_status?.Recibida),
      Cancelada: mergeStatBucket(raw.by_status?.Cancelada),
    },
    by_payment: {
      Pagado: mergeStatBucket(raw.by_payment?.Pagado),
      Pendiente: mergeStatBucket(raw.by_payment?.Pendiente),
    },
  };
}

function mergeStatBucket(raw?: PurchaseOrderStatBucket | null): PurchaseOrderStatBucket {
  return {
    count: Number(raw?.count) || 0,
    amount: Number(raw?.amount) || 0,
  };
}

export interface PaymentsSummary {
  amount_paid: number | string;
  amount_pending: number | string;
  payment_status: PaymentStatus | 'Pagado';
  currency: PaymentCurrency;
}

export type DocumentLanguage = 'es' | 'en';

export interface RegenerateDocumentResponse {
  success: boolean;
  message: string;
  document_language: DocumentLanguage;
  keep_previous?: boolean;
}

/**
 * Document entity
 */
export interface Document {
  id: string;
  purchase_order_id: string;
  document_type_id: number;
  document_name: string;
  document_type_name: string;
  document_language?: DocumentLanguage | null;
  file_path: string;
  file_key: string;
  uploaded_by: string;
  uploaded_by_name: string;
  uploaded_at: string;
  key: string;
  path: string;
  name?: string;
  url?: string;
  type?: string;
  size?: number;
}

export interface DocumentType {
  id: number;
  name: string;
  description?: string;
}

/**
 * User entity
 */
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface PurchaseOrderBillingBranch {
  id: string;
  code: string;
  city?: string;
  state?: string;
}

export interface PurchaseOrderFiscalConfiguration {
  id: string;
  razon_social?: string;
  rfc?: string;
  prefix?: string | null;
}

/**
 * Purchase Order main entity
 */
export interface PurchaseOrder {
  id: string;
  tenant_id: string;
  vendor_id: string;
  creator_id: string;
  purpose: string;
  warehouse_id: string;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  razon_social?: string;
  sucursal?: string;
  folio?: string;
  tentative_receipt_date: string; // ISO 8601 date string
  expected_delivery_date?: string;
  status: OrderStatus;
  general_status?: OrderStatus;
  cancellation_date?: string;
  cancellation_reason?: string;
  payment_status: PaymentStatus;
  payment_currency?: PaymentCurrency;
  payment_date?: string;
  payment_amount?: number;
  payment_method?: string;
  remaining_amount: number;
  payments_summary?: PaymentsSummary;
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
  requested_subtotal?: string;
  requested_iva_total?: string;
  requested_ieps_total?: string;
  requested_total?: string;
  /** true solo si `general_status === 'Creada'`. */
  can_edit_lines?: boolean;
  received_subtotal?: string;
  received_iva_total?: string;
  received_ieps_total?: string;
  received_total?: string;
  notes?: string;
  /** Derivado del proveedor; no se envía al crear. */
  is_international_vendor?: boolean;
  /** Solo compras internacionales. Vacío / null si no hay pedimento. */
  pedimento_number?: string | null;
  line_items: LineItem[];
  batches?: Batch[];
  payments: Payment[];
  documents?: Document[];
  warehouse?: Warehouse;
  vendor?: Vendor;
  billing_branch?: PurchaseOrderBillingBranch;
  fiscal_configuration?: PurchaseOrderFiscalConfiguration;
  creator?: User;
  created_at: string;
  updated_at: string;
}

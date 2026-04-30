import { OrderStatus, PaymentStatus } from './purchase-order.model';

/**
 * Order filters
 */
export interface OrderFilters {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: OrderStatus;
  warehouseId?: string;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * API response with pagination
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Line item calculations
 */
export interface LineItemCalculations {
  subtotal: number;
  iva_amount: number;
  ieps_amount: number;
  line_total: number;
}

/**
 * Order total calculations
 */
export interface TotalCalculations {
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
}

/**
 * Dashboard metrics
 */
export interface DashboardMetrics {
  byStatus: StatusDistribution[];
  byPaymentStatus: PaymentStatusDistribution[];
}

export interface StatusDistribution {
  status: OrderStatus;
  count: number;
  percentage: number;
}

export interface PaymentStatusDistribution {
  paymentStatus: PaymentStatus;
  count: number;
  percentage: number;
}

/**
 * Purchase Order form data (valores internos del formulario antes de mapear a API).
 */
export interface PurchaseOrderFormData {
  fiscal_configuration_id: string;
  vendor_id: string;
  purpose: string;
  warehouse_id: string;
  tentative_receipt_date: string;
  payment_status: string;
  line_items: LineItemFormData[];
}

/**
 * Cuerpo API para crear o editar OC (CreatePurchaseOrderDto / mismo esquema en PUT).
 * Mapeo UI: purpose → notes, tentative_receipt_date → expected_delivery_date, unit_price → unit_total.
 */
export interface WritePurchaseOrderDto {
  fiscal_configuration_id: string;
  warehouse_id: string;
  vendor_id: string;
  expected_delivery_date: string;
  payment_currency?: 'MXN' | 'USD';
  payment_status?: string;
  notes?: string;
  line_items: PurchaseOrderApiLineItem[];
}

export interface PurchaseOrderApiLineItem {
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_total: number;
  iva_percentage?: number;
  ieps_percentage?: number;
}

/**
 * Line Item form data
 */
export interface LineItemFormData {
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
}

/**
 * PATCH body for `/tenant/purchase-orders/:orderId/line-items/:lineItemId`.
 * Do not send iva_unit / ieps_unit; backend derives them from subtotal and percentages.
 */
export interface UpdateLineItemDto {
  quantity?: number;
  uom_id?: string;
  unit_total?: number;
  iva_percentage?: number;
  ieps_percentage?: number;
}

/** POST body para agregar una línea a una OC existente (misma forma que en alta). */
export interface CreatePurchaseOrderLineItemDto {
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_total: number;
  iva_percentage: number;
  ieps_percentage: number;
}

/**
 * Payment form data
 */
export interface PaymentFormData {
  amount: number;
  payment_date: string;
  payment_method: string;
  currency: 'MXN' | 'USD';
  reference_number?: string;
  notes?: string;
}

/**
 * Cancel order data
 */
export interface CancelOrderData {
  reason: string;
}

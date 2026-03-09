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
 * Purchase Order form data
 */
export interface PurchaseOrderFormData {
  vendor_id: string;
  purpose: string;
  warehouse_id: string;
  tentative_receipt_date: string;
  line_items: LineItemFormData[];
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
 * Payment form data
 */
export interface PaymentFormData {
  amount: number;
  payment_date: string;
  payment_method: string;
  reference?: string;
  notes?: string;
}

/**
 * Cancel order data
 */
export interface CancelOrderData {
  reason: string;
}

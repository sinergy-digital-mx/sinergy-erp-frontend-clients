export type SalesOrderStatus = 'Creada' | 'Surtida' | 'Cancelada';
export type SalesPaymentStatus = 'Pendiente' | 'Pagado';
export type SalesOrderType = 'POS' | 'MANUAL';

export interface Customer {
  id: number | string;
  name: string;
  lastname?: string;
  company_name?: string;
  email?: string;
  phone?: string;
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
  iva_percentage?: string | number;
  iva_unit?: string | number;
  ieps_percentage?: string | number;
  ieps_unit?: string | number;
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

export interface SalesOrder {
  id: string;
  tenant_id?: string;
  folio?: string;
  fiscal_configuration_id?: string;
  customer_id: number | string;
  warehouse_id: string;
  delivery_date?: string;
  expected_delivery_date?: string;
  sales_order_type?: SalesOrderType;
  fiscal_razon_social?: string;
  status?: SalesOrderStatus;
  general_status?: SalesOrderStatus;
  payment_status: SalesPaymentStatus;
  subtotal?: string | number;
  discount_total?: string | number;
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
  line_items?: SalesOrderLineItem[];
  // legacy compat
  lines?: SalesOrderLineItem[];
  customer?: Customer;
  warehouse?: { id: string; name: string };
  fiscal_configuration?: {
    id?: string;
    razon_social?: string;
    business_name?: string;
    rfc?: string;
    persona_type?: string;
    fiscal_regime?: string;
    status?: string;
  };
  invoices?: SalesOrderInvoice[];
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface SalesOrderFilters {
  search?: string;
  status?: SalesOrderStatus;
  general_status?: SalesOrderStatus;
  payment_status?: SalesPaymentStatus;
  sales_order_type?: SalesOrderType;
  customer_id?: string | number;
  warehouse_id?: string;
  dateFrom?: string;
  dateTo?: string;
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

export interface SalesOrderFormData {
  fiscal_configuration_id?: string;
  customer_id: number | string;
  warehouse_id: string;
  expected_delivery_date?: string;
  sales_order_type?: SalesOrderType;
  fiscal_razon_social?: string;
  payment_status?: string;
  notes?: string;
  line_items: Array<{
    product_id: string;
    product_uom_id: string;
    quantity: number;
    unit_price: number;
    discount_percentage?: number;
    iva_percentage: number;
    ieps_percentage: number;
  }>;
}

export interface SalesOrderDetailPayload {
  header: SalesOrder;
  line_items: SalesOrderLineItem[];
}

export interface SalesOrderDetailResponse {
  data: SalesOrderDetailPayload;
}

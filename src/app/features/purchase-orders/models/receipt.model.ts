/**
 * Receipt Item - Item recibido en una orden de compra
 */
export interface ReceivedItem {
  line_item_id: string;
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_total: number;
  iva_percentage: number;
  iva_unit: number;
  ieps_percentage: number;
  ieps_unit: number;
  expiration_date?: string;
}

/**
 * Receipt Request - Payload para recibir items
 */
export interface ReceiptRequest {
  received_items: ReceivedItem[];
}

/**
 * Receipt Response - Respuesta del API
 */
export interface ReceiptResponse {
  id: string;
  folio: string;
  general_status: string;
  received_subtotal: number;
  received_iva_total: number;
  received_ieps_total: number;
  received_total: number;
  updated_by: string;
  updated_at: string;
  line_items: ReceivedLineItem[];
}

/**
 * Received Line Item - Item recibido en la respuesta
 */
export interface ReceivedLineItem {
  id: string;
  received_original_quantity: number;
  received_converted_quantity: number;
  received_original_uom_id: string;
  received_converted_uom_id: string;
  received_original_product_id: string;
  received_original_unit_total: number;
  received_original_iva_percentage: number;
  received_original_iva_unit: number;
  received_original_ieps_percentage: number;
  received_original_ieps_unit: number;
  updated_by: string;
  updated_at: string;
}

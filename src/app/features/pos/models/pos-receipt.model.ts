import { PosSaleCollection, normalizePosSaleCollection } from './pos-sale-collection.model';
export interface PosSaleReceipt {
  document_id?: string;
  file_name?: string;
  mime_type?: string;
  download_url?: string | null;
  escpos_base64?: string;
  plain_text?: string;
  printer_profile?: string;
}

export interface CollectSaleResponse {
  message?: string;
  collection?: PosSaleCollection | null;
  receipt?: PosSaleReceipt | null;
  sales_order?: {
    id?: string;
    folio?: string;
    payment_status?: string;
    customer_id?: number;
    total?: number | string;
    customer?: {
      id?: number;
      display_name?: string;
      name?: string;
      is_walk_in?: boolean;
    };
  } | null;
}

export function normalizePosSaleReceipt(raw: unknown): PosSaleReceipt | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const obj = raw as Record<string, unknown>;
  const nested =
    obj['receipt'] && typeof obj['receipt'] === 'object'
      ? (obj['receipt'] as Record<string, unknown>)
      : obj;
  const base64 = nested['escpos_base64'];
  if (base64 == null || String(base64).trim() === '') {
    if (!nested['plain_text'] && !nested['download_url']) {
      return null;
    }
  }
  return {
    document_id: nested['document_id'] != null ? String(nested['document_id']) : undefined,
    file_name: nested['file_name'] != null ? String(nested['file_name']) : undefined,
    mime_type: nested['mime_type'] != null ? String(nested['mime_type']) : undefined,
    download_url:
      nested['download_url'] != null ? (String(nested['download_url']) as string) : null,
    escpos_base64: base64 != null ? String(base64) : undefined,
    plain_text: nested['plain_text'] != null ? String(nested['plain_text']) : undefined,
    printer_profile:
      nested['printer_profile'] != null ? String(nested['printer_profile']) : undefined,
  };
}

export function normalizeCollectSaleResponse(raw: unknown): CollectSaleResponse {
  if (!raw || typeof raw !== 'object') {
    return {};
  }
  const root = raw as Record<string, unknown>;
  const source =
    root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
      ? (root['data'] as Record<string, unknown>)
      : root;

  return {
    message: source['message'] != null ? String(source['message']) : undefined,
    collection: normalizePosSaleCollection(source['collection']),
    receipt: normalizePosSaleReceipt(source['receipt']),
    sales_order:
      source['sales_order'] && typeof source['sales_order'] === 'object'
        ? (source['sales_order'] as CollectSaleResponse['sales_order'])
        : null,
  };
}

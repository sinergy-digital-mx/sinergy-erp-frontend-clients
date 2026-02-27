/**
 * Payment Document Model
 */
export interface PaymentDocument {
  id: string;
  payment_id: string;
  document_type: DocumentType;
  file_name: string;
  file_size: number;
  file_url: string;
  notes: string | null;
  uploaded_at: string;
}

/**
 * Document Type
 */
export type DocumentType = 
  | 'comprobante_transferencia' 
  | 'foto_deposito' 
  | 'recibo' 
  | 'factura' 
  | 'otro';

/**
 * Upload Document DTO
 */
export interface UploadDocumentDto {
  file: File;
  document_type: DocumentType;
  notes?: string;
}

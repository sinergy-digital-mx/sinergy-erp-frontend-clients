/**
 * Customer Document Models
 */
export interface CustomerDocument {
  id: string;
  customer_id: number;
  document_type_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  status: DocumentStatus;
  expiration_date?: string;
  notes?: string;
  uploaded_by?: string;
  download_url?: string;
  created_at: string;
  updated_at: string;
  document_type: DocumentType;
}

export interface DocumentType {
  id: string;
  name: string;
  description?: string;
  is_required: boolean;
  requires_expiration: boolean;
}

export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface UploadDocumentDto {
  file: File;
  document_type_id: string;
  expiration_date?: string;
  notes?: string;
}

export interface UpdateDocumentStatusDto {
  status: DocumentStatus;
  notes?: string;
}

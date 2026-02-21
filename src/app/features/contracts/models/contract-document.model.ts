/**
 * Contract Document Model
 */
export interface ContractDocument {
  id: string;
  contract_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  download_url?: string;
  status: DocumentStatus;
  notes?: string;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Document Status
 */
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

/**
 * Update Document Status DTO
 */
export interface UpdateDocumentStatusDto {
  status: DocumentStatus;
  notes?: string;
}

export interface MadereriaInventoryImportCreatedProduct {
  sku: string;
  name: string;
  row_number: number;
}

export interface MadereriaInventoryImportSkippedRow {
  sku: string;
  row_number: number;
  reason: string;
}

export interface MadereriaInventoryImportError {
  sku?: string;
  row_number?: number;
  reason?: string;
  message?: string;
}

export interface MadereriaInventoryImportResult {
  warehouse_id: string;
  warehouse_name: string;
  file_rows: number;
  products_created: MadereriaInventoryImportCreatedProduct[];
  prices_created: number;
  costs_created: number;
  costs_updated: number;
  batches_created: number;
  skipped: MadereriaInventoryImportSkippedRow[];
  errors: MadereriaInventoryImportError[] | string[];
}

export type MadereriaInventoryImportJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface MadereriaInventoryImportJob {
  id: string;
  status: MadereriaInventoryImportJobStatus;
  total: number;
  processed: number;
  percent: number;
  current_sku: string | null;
  message: string | null;
  result: MadereriaInventoryImportResult | null;
  error: string | null;
}

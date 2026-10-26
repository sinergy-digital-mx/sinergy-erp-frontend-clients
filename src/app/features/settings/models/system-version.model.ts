export type SystemVersionChannel = 'frontend' | 'backend' | 'full';
export type SystemVersionScope = 'frontend' | 'backend';

export interface SystemVersionChange {
  scope: SystemVersionScope;
  message: string;
}

export interface SystemVersion {
  id: string;
  version: string;
  build_id: string | null;
  channel: SystemVersionChannel;
  title: string;
  changes: SystemVersionChange[];
  released_at: string;
}

export interface SystemVersionListResponse {
  data: SystemVersion[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

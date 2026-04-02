export interface PosEquipment {
  id: string;
  tenant_id: string;
  name: string;
  warehouse_id: string;
  status: 'active' | 'inactive';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreatePosEquipmentDto {
  name: string;
  warehouse_id: string;
  status?: 'active' | 'inactive';
  metadata?: Record<string, any>;
}

export interface UpdatePosEquipmentDto extends Partial<CreatePosEquipmentDto> {}

export interface PosEquipmentListResponse {
  data: PosEquipment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PosEquipmentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  warehouse_id?: string;
}

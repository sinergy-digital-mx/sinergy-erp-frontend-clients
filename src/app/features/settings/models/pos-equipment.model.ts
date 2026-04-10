/** POS configuration (tenant/pos-configurations). */

export interface PosConfigurationBranch {
  id?: string;
  display_name?: string;
  code?: string;
  [key: string]: unknown;
}

export interface PosConfiguration {
  id: string;
  tenant_id: string;
  code: string;
  sucursal: string;
  modelo: string;
  status: number;
  branch?: PosConfigurationBranch | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePosConfigurationDto {
  code: string;
  sucursal: string;
  modelo: string;
  status: number;
}

export type UpdatePosConfigurationDto = Partial<CreatePosConfigurationDto>;

export interface PosConfigurationListResponse {
  data: PosConfiguration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PosConfigurationQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: number;
  sucursal?: string;
}

/** @deprecated use PosConfiguration */
export type PosEquipment = PosConfiguration;

/** @deprecated use CreatePosConfigurationDto */
export type CreatePosEquipmentDto = CreatePosConfigurationDto;

/** @deprecated use UpdatePosConfigurationDto */
export type UpdatePosEquipmentDto = UpdatePosConfigurationDto;

/** @deprecated use PosConfigurationListResponse */
export type PosEquipmentListResponse = PosConfigurationListResponse;

/** @deprecated use PosConfigurationQueryParams */
export type PosEquipmentQueryParams = PosConfigurationQueryParams;

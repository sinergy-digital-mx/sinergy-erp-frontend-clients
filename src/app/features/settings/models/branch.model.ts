export interface Branch {
  id: string;
  fiscal_configuration_id: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  status: number;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBranchDto {
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  status?: number;
}

export interface UpdateBranchDto {
  code?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  status?: number;
}

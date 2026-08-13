export interface CustomerGroupAdmin {
  id: string;
  name: string;
  description?: string | null;
  is_system: boolean;
  customer_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCustomerGroupDto {
  name: string;
  description?: string;
}

export interface UpdateCustomerGroupDto {
  name?: string;
  description?: string;
}

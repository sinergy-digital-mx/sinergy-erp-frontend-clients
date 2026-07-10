export type GlobalDiscountType = 'percentage' | 'fixed';

export interface GlobalDiscount {
  id: string;
  name: string;
  discount_type: GlobalDiscountType;
  value: number;
  is_active: boolean;
  valid_from?: string | null;
  valid_to?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateGlobalDiscountDto {
  name: string;
  discount_type: GlobalDiscountType;
  value: number;
  is_active?: boolean;
  valid_from?: string | null;
  valid_to?: string | null;
}

export interface UpdateGlobalDiscountDto extends Partial<CreateGlobalDiscountDto> {}

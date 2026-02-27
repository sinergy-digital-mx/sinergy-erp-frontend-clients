/**
 * Contract Model
 */
export interface Contract {
  id: string;
  tenant_id: string;
  customer_id: number;
  property_id: string;
  contract_number: string;
  contract_date: string;
  total_price: number;
  down_payment: number;
  remaining_balance: number;
  payment_months: number;
  monthly_payment: number;
  first_payment_date: string;
  currency: string;
  status: ContractStatus;
  notes?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  customer?: ContractCustomer;
  property?: ContractProperty;
}

export interface ContractCustomer {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  phone_country: string;
  phone_code: string;
}

export interface ContractProperty {
  id: string;
  code: string;
  name: string;
  block: string;
  total_area: number;
  total_price: number;
  status: string;
}

export type ContractStatus = 'activo' | 'completado' | 'cancelado' | 'suspendido';

export interface CreateContractDto {
  customer_id: number;
  property_id: string;
  contract_number: string;
  contract_date: string;
  total_price: number;
  down_payment: number;
  payment_months: number;
  first_payment_date: string;
  currency: string;
  status?: ContractStatus;
  notes?: string;
}

export interface UpdateContractDto extends Partial<CreateContractDto> {}

export interface ContractStats {
  total: {
    count: number;
    value: number;
  };
  completed: {
    count: number;
    value: number;
  };
  pending: {
    count: number;
    value: number;
    paid: number;
    remaining: number;
  };
  overdue: {
    count: number;
    value: number;
  };
}

export interface ContractStatsResponse {
  active: number;
  completed: number;
  cancelled: number;
  suspended: number;
  total_contracts: number;
  total_contract_value: number;
  completed_value: number;
  pending_value: number;
  overdue_value: number;
  with_overdue_payments: number;
  amount_collected: number;
  amount_pending: number;
  total_down_payments: number;
  total_pending_balance: number;
  payments_completed: number;
  payments_pending: number;
  payments_overdue: number;
  total_payments: number;
  up_to_date: number;
}

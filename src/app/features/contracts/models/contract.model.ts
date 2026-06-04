/**
 * Contract Model
 */
export interface Contract {
  id: string;
  tenant_id: string;
  customer_id: number;
  property_id: string;
  seller_id?: string;
  contract_number: string;
  contract_date: string;
  total_price: number;
  /** Precio lista al vender; override opcional sobre el lote. */
  list_price?: number | null;
  /** Lead vinculado (opcional). */
  lead_id?: number | null;
  /** Origen de venta (lead group). */
  lead_group_id?: string | null;
  /** Monto ya pagado de enganche (se actualiza con abonos). */
  down_payment: number;
  /** Total pactado de enganche; null hasta definir meta. */
  down_payment_target?: number | null;
  remaining_balance: number;
  payment_months: number;
  monthly_payment: number;
  first_payment_date: string;
  currency: string;
  status: ContractStatus;
  notes?: string;
  metadata?: any;
  /** Enganche financiado en cuotas separadas de contract_payments */
  down_payment_financed?: boolean;
  down_payment_months?: number;
  down_payment_monthly_amount?: number;
  down_payment_first_payment_date?: string;
  down_payment_payment_day?: number;
  created_at: string;
  updated_at: string;
  customer?: ContractCustomer;
  property?: ContractProperty;
  seller?: ContractSeller;
}

export interface ContractSeller {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
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
  list_price?: number | null;
  status: string;
}

export type ContractStatus = 'activo' | 'completado' | 'cancelado' | 'suspendido';

export interface CreateContractDto {
  customer_id: number;
  property_id: string;
  seller_id?: string;
  contract_number?: string;
  contract_date: string;
  total_price: number;
  list_price?: number | null;
  lead_id?: number | null;
  lead_group_id?: string | null;
  down_payment: number;
  payment_months: number;
  first_payment_date: string;
  currency: string;
  status?: ContractStatus;
  notes?: string;
  /** Si true, solo habilita la pestaña de enganche; meses/fechas se definen al generar cuotas. */
  down_payment_financed?: boolean;
  /** Meta de enganche al crear (opcional). */
  down_payment_target?: number;
  down_payment_months?: number;
  down_payment_first_payment_date?: string;
  down_payment_payment_day?: number;
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
    contracts_count: number;
    payments_count: number;
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

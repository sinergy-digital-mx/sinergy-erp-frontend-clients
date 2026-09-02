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
  /** Total pactado de enganche; null hasta definir meta. El API puede enviar string. */
  down_payment_target?: number | string | null;
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

export interface ContractCustomerGroup {
  id: string;
  name: string;
}

export interface ContractCustomer {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  phone_country: string;
  phone_code: string;
  group_id?: string | null;
  group?: ContractCustomerGroup | null;
}

export interface ContractProperty {
  id: string;
  code: string;
  name: string;
  block: string;
  lot_number?: string | null;
  cadastral_key?: string | null;
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

/** Filtros compartidos por lista, stats y Excel. page/limit solo van en la lista. */
export interface ContractListFilters {
  group_id?: string;
  search?: string;
  status?: string;
  hasOverdue?: string | boolean;
  customerId?: number | string;
  propertyId?: string;
  page?: number;
  limit?: number;
}

export interface ContractStats {
  /** Código para las cards. `null` si el filtro mezcla USD y MXN. */
  currency: string | null;
  currencies: string[];
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

export const EMPTY_CONTRACT_STATS: ContractStats = {
  currency: 'USD',
  currencies: ['USD'],
  total: { count: 0, value: 0 },
  completed: { count: 0, value: 0 },
  pending: { count: 0, value: 0, paid: 0, remaining: 0 },
  overdue: { contracts_count: 0, payments_count: 0, value: 0 },
};

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

/** Parsea down_payment_target (el API puede enviar number o string). */
export function getDownPaymentTarget(
  contract: Pick<Contract, 'down_payment_target'>,
): number | null {
  const raw = contract.down_payment_target;
  if (raw == null || raw === '') return null;
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  const n = parseFloat(String(raw));
  return Number.isFinite(n) ? n : null;
}

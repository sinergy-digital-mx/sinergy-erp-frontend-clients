export type MonthlyIncomeMonthStatus = 'paid' | 'partial' | 'unpaid' | 'none';

export interface MonthlyIncomeContractRow {
  contract_id: string;
  contract_number: string;
  customer_name: string;
  currency: string;
  month_expected: number;
  month_paid: number;
  month_pending: number;
  month_status: MonthlyIncomeMonthStatus;
  prior_amount: number;
  prior_installments: number;
  prior_oldest: string | null;
}

export interface MonthlyIncomeCurrencySummary {
  currency: string;
  expected: number;
  collected: number;
  pending: number;
  collection_pct: number;
  contracts: number;
  paid_contracts: number;
  partial_contracts: number;
  unpaid_contracts: number;
  prior_only_contracts: number;
  prior_amount: number;
  prior_installments: number;
  prior_contracts: number;
  average_installment: number;
}

export interface MonthlyIncomeUnscheduled {
  contract_id: string;
  contract_number: string;
  customer_name: string;
  currency: string;
  monthly_payment: number;
}

export interface MonthlyIncomeAnalysis {
  year: number;
  month: number;
  month_label: string;
  currencies: MonthlyIncomeCurrencySummary[];
  contracts: MonthlyIncomeContractRow[];
  unscheduled: {
    count: number;
    contracts: MonthlyIncomeUnscheduled[];
  };
}

export function emptyCurrencySummary(currency: string): MonthlyIncomeCurrencySummary {
  return {
    currency,
    expected: 0,
    collected: 0,
    pending: 0,
    collection_pct: 0,
    contracts: 0,
    paid_contracts: 0,
    partial_contracts: 0,
    unpaid_contracts: 0,
    prior_only_contracts: 0,
    prior_amount: 0,
    prior_installments: 0,
    prior_contracts: 0,
    average_installment: 0,
  };
}

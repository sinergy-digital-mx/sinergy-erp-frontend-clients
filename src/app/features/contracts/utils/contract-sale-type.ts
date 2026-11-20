export type ContractSaleType = 'cash' | 'financed';
export type ContractSaleMark = 'cash' | 'down_payment_and_financing' | 'financing';

export interface ContractSaleBadge {
  name: string;
  mark: string | null;
  hint: string;
  kind: ContractSaleMark;
}

export function isCashContract(contract: { sale_type?: string | null } | null | undefined): boolean {
  return contract?.sale_type === 'cash';
}

export function contractSaleBadge(contract: {
  sale_type?: string | null;
  down_payment_financed?: boolean | null;
} | null | undefined): ContractSaleBadge {
  if (isCashContract(contract)) {
    return {
      kind: 'cash',
      name: 'Contado',
      mark: null,
      hint: 'Contado. Sin mensualidad. Los abonos, si se parten, van en enganche.',
    };
  }
  if (contract?.down_payment_financed) {
    return {
      kind: 'down_payment_and_financing',
      name: 'Financiado',
      mark: 'E + F',
      hint: 'Enganche más financiamiento',
    };
  }
  return {
    kind: 'financing',
    name: 'Financiado',
    mark: 'F',
    hint: 'Financiamiento',
  };
}

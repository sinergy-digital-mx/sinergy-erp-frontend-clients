import { ISelect } from '../../../core/components/select/select.component';

export interface ContractFiscalOption {
  id: string;
  razon_social?: string | null;
  rfc?: string | null;
}

export function fiscalSelectLabel(fiscal: ContractFiscalOption): string {
  const name = fiscal.razon_social?.trim() || 'Razón social';
  const rfc = fiscal.rfc?.trim();
  return rfc ? `${name} · ${rfc}` : name;
}

export function toFiscalSelectData(
  rows: ContractFiscalOption[],
  current?: ContractFiscalOption | null,
): Array<{ id: string; label: string }> {
  const data = rows.map((row) => ({ id: row.id, label: fiscalSelectLabel(row) }));
  if (current?.id && !data.some((row) => row.id === current.id)) {
    data.unshift({ id: current.id, label: fiscalSelectLabel(current) });
  }
  return data;
}

export function emptyFiscalSelectConfig(): ISelect {
  return {
    placeholder: 'Selecciona la razón social',
    data: [],
    value: 'id',
    option: 'label',
    form_control: null,
    loading: true,
    all: false,
  };
}

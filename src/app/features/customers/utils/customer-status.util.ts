import { Customer } from '../models/customer-group.model';

export function getCustomerStatusCode(customer: Customer): string {
  return String(customer.status?.code ?? '').trim().toUpperCase();
}

export function getCustomerStatusLabel(customer: Customer): string {
  if (customer.status?.name?.trim()) {
    return customer.status.name.trim();
  }
  return 'Sin estatus';
}

export function getCustomerStatusPillClass(customer: Customer): string {
  const base = 'dt-status-pill';
  switch (getCustomerStatusCode(customer)) {
    case 'ACTIVE':
      return `${base} dt-status-pill--sky`;
    case 'INACTIVE':
      return `${base} dt-status-pill--neutral`;
    case 'SUSPENDED':
      return `${base} dt-status-pill--warning`;
    case 'DELETED':
      return `${base} dt-status-pill--danger`;
    default: {
      const name = (customer.status?.name ?? '').toLowerCase();
      if (name.includes('activ')) return `${base} dt-status-pill--sky`;
      if (name.includes('inactiv')) return `${base} dt-status-pill--neutral`;
      if (name.includes('suspend')) return `${base} dt-status-pill--warning`;
      if (name.includes('elimin')) return `${base} dt-status-pill--danger`;
      return `${base} dt-status-pill--info`;
    }
  }
}

/** Nombre completo del cliente (sin truncar por caracteres). */
export function getCustomerFullName(customer: Customer): string {
  const full = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
  return full || '—';
}

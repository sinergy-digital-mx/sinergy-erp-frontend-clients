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
  switch (getCustomerStatusCode(customer)) {
    case 'ACTIVE':
      return 'status-pill--active';
    case 'INACTIVE':
      return 'status-pill--inactive';
    case 'SUSPENDED':
      return 'status-pill--suspended';
    case 'DELETED':
      return 'status-pill--deleted';
    default: {
      const name = (customer.status?.name ?? '').toLowerCase();
      if (name.includes('activ')) return 'status-pill--active';
      if (name.includes('inactiv')) return 'status-pill--inactive';
      if (name.includes('suspend')) return 'status-pill--suspended';
      if (name.includes('elimin')) return 'status-pill--deleted';
      return 'status-pill--default';
    }
  }
}

/** Nombre completo del cliente (sin truncar por caracteres). */
export function getCustomerFullName(customer: Customer): string {
  const full = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
  return full || '—';
}

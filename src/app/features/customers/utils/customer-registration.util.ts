import {
  CustomerDuplicateMatchReason,
  CustomerRegisteredByUser,
  CustomerRegistrationUserOption,
} from '../models/customer-group.model';

export const DUPLICATE_MATCH_REASON_LABELS: Record<CustomerDuplicateMatchReason, string> = {
  email: 'Correo',
  phone: 'Teléfono',
  name: 'Nombre y apellido',
  rfc: 'RFC',
};

export function formatRegisteredByUserLabel(
  user: CustomerRegisteredByUser | CustomerRegistrationUserOption | null | undefined
): string {
  if (!user) return '—';
  const name = [user.first_name, user.last_name]
    .map((part) => (part ?? '').trim())
    .filter(Boolean)
    .join(' ');
  return name || (user.email ?? '').trim() || '—';
}

export function formatRegistrationUserOption(
  user: CustomerRegistrationUserOption
): string {
  const label = formatRegisteredByUserLabel(user);
  return label === '—' ? user.id : label;
}

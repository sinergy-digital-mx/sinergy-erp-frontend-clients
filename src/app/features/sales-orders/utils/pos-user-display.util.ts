import { PosUserSummary } from '../models/sales-order.model';

export function formatPosUserName(user: PosUserSummary | null | undefined): string {
  if (!user) {
    return '—';
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
  return name || (user.pos_user_code ? String(user.pos_user_code) : '—');
}

export function formatPosUser(user: PosUserSummary | null | undefined): string {
  if (!user) {
    return '—';
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
  if (name && user.pos_user_code) {
    return `${name} (${user.pos_user_code})`;
  }
  return name || (user.pos_user_code ? String(user.pos_user_code) : '—');
}

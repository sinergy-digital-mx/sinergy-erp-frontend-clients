import {
  AssignmentHistoryChange,
  AssignmentHistoryEntry,
  CustomerAssignedSellerUser,
  CustomerDuplicateMatchReason,
  CustomerRegisteredByUser,
  CustomerRegistrationSellerOption,
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

export function formatAssignedSellerLabel(
  user: CustomerAssignedSellerUser | CustomerRegistrationSellerOption | null | undefined,
  emptyLabel = 'Sin vendedor'
): string {
  if (!user) return emptyLabel;
  const name = [user.first_name, user.last_name]
    .map((part) => (part ?? '').trim())
    .filter(Boolean)
    .join(' ');
  const code = user.pos_user_code != null && String(user.pos_user_code).trim() !== ''
    ? String(user.pos_user_code).trim()
    : '';
  if (name && code) return `${name} (${code})`;
  if (name) return name;
  if (code) return code;
  return (user.email ?? '').trim() || emptyLabel;
}

export function formatAssignmentOccurredAt(value?: string | null): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Código de estatus del catálogo de asignación (`active` / `inactive` / `deleted`). */
export function getRegistrationUserStatusCode(source: unknown): string | null {
  if (!source || typeof source !== 'object') {
    return null;
  }
  const row = source as Record<string, unknown>;
  const status = row['status'];
  if (typeof status === 'string' && status.trim()) {
    return status.trim().toLowerCase();
  }
  if (status && typeof status === 'object') {
    const nested = status as Record<string, unknown>;
    const code = nested['code'] ?? nested['name'];
    if (typeof code === 'string' && code.trim()) {
      return code.trim().toLowerCase();
    }
  }
  const statusCode = row['status_code'];
  if (typeof statusCode === 'string' && statusCode.trim()) {
    return statusCode.trim().toLowerCase();
  }
  return null;
}

/**
 * true = activo, false = inactivo/eliminado, null = no se puede saber.
 * Solo activos deben aparecer al asignar registrado por / vendedor.
 */
export function isActiveRegistrationUser(
  source: unknown,
  activeStatusIds?: Iterable<number>
): boolean | null {
  if (!source || typeof source !== 'object') {
    return null;
  }
  const row = source as Record<string, unknown>;
  if (row['is_deleted'] === true || row['deleted'] === true) {
    return false;
  }
  if (row['deleted_at']) {
    return false;
  }
  if (row['is_active'] === false) {
    return false;
  }
  if (row['is_active'] === true) {
    return true;
  }

  const code = getRegistrationUserStatusCode(source);
  if (code) {
    return code === 'active' || code === 'activo';
  }

  const rawId = row['status_id'] ?? (row['status'] && typeof row['status'] === 'object'
    ? (row['status'] as Record<string, unknown>)['id']
    : undefined);
  const statusId = rawId == null || rawId === '' ? NaN : Number(rawId);
  if (Number.isFinite(statusId) && activeStatusIds) {
    const actives = new Set(Array.from(activeStatusIds, Number));
    if (actives.size > 0) {
      return actives.has(statusId);
    }
  }
  return null;
}

/** Cambios de un evento: usa `changes[]` del API o parte `description` si viene concatenada. */
export function assignmentHistoryChanges(
  entry: AssignmentHistoryEntry | null | undefined
): AssignmentHistoryChange[] {
  const structured = (entry?.changes ?? []).filter(
    (change) => !!(change.field_label || change.field || change.from || change.to)
  );
  if (structured.length) {
    return structured;
  }
  return parseAssignmentHistoryDescription(entry?.description);
}

export function parseAssignmentHistoryDescription(
  description?: string | null
): AssignmentHistoryChange[] {
  const text = (description ?? '').trim();
  if (!text) {
    return [];
  }
  return text
    .split(/\s*;\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^([^:]+):\s*(.*?)\s*(?:→|->)\s*(.*)$/);
      if (!match) {
        return { field_label: '', from: null, to: part };
      }
      return {
        field_label: match[1].trim(),
        from: match[2].trim() || null,
        to: match[3].trim() || null,
      };
    });
}

export function assignmentHistoryChangeLabel(change: AssignmentHistoryChange): string {
  return (change.field_label || change.field || 'Cambio').trim();
}

export function assignmentHistoryChangeValue(value?: string | null): string {
  const trimmed = (value ?? '').trim();
  return trimmed || 'Sin asignar';
}

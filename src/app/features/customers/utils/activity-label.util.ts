import { ActivityOutcome, ActivityStatus, ActivityType } from '../models/customer-group.model';

const TYPE_LABELS: Record<ActivityType, string> = {
  [ActivityType.NOTE]: 'Nota',
  [ActivityType.CALL]: 'Llamada',
  [ActivityType.EMAIL]: 'Correo',
  [ActivityType.MEETING]: 'Reunión',
  [ActivityType.TASK]: 'Tarea',
  [ActivityType.FOLLOW_UP]: 'Seguimiento',
  [ActivityType.PURCHASE]: 'Compra',
  [ActivityType.SUPPORT]: 'Soporte',
};

const STATUS_LABELS: Record<ActivityStatus, string> = {
  [ActivityStatus.COMPLETED]: 'Completada',
  [ActivityStatus.SCHEDULED]: 'Programada',
  [ActivityStatus.CANCELLED]: 'Cancelada',
  [ActivityStatus.IN_PROGRESS]: 'En progreso',
};

const OUTCOME_LABELS: Record<ActivityOutcome, string> = {
  [ActivityOutcome.SATISFIED]: 'Satisfecho',
  [ActivityOutcome.ISSUE_RESOLVED]: 'Problema resuelto',
  [ActivityOutcome.ESCALATED]: 'Escalado',
  [ActivityOutcome.FOLLOW_UP_NEEDED]: 'Requiere seguimiento',
};

export function getActivityTypeLabel(type: ActivityType | string): string {
  return TYPE_LABELS[type as ActivityType] ?? type;
}

export function getActivityStatusLabel(status: ActivityStatus | string): string {
  return STATUS_LABELS[status as ActivityStatus] ?? status;
}

export function getActivityOutcomeLabel(outcome: ActivityOutcome | string): string {
  return OUTCOME_LABELS[outcome as ActivityOutcome] ?? outcome;
}

export function getActivityStatusClass(status: ActivityStatus | string): string {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium';
  switch (status) {
    case ActivityStatus.COMPLETED:
      return `${base} bg-green-100 text-green-800`;
    case ActivityStatus.SCHEDULED:
      return `${base} bg-blue-100 text-blue-800`;
    case ActivityStatus.IN_PROGRESS:
      return `${base} bg-amber-100 text-amber-800`;
    case ActivityStatus.CANCELLED:
      return `${base} bg-gray-100 text-gray-600`;
    default:
      return `${base} bg-gray-100 text-gray-700`;
  }
}

export function getActivityTypeClass(type: ActivityType | string): string {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize';
  switch (type) {
    case ActivityType.CALL:
      return `${base} bg-indigo-100 text-indigo-800`;
    case ActivityType.EMAIL:
      return `${base} bg-sky-100 text-sky-800`;
    case ActivityType.MEETING:
      return `${base} bg-violet-100 text-violet-800`;
    case ActivityType.NOTE:
      return `${base} bg-slate-100 text-slate-800`;
    case ActivityType.TASK:
      return `${base} bg-orange-100 text-orange-800`;
    case ActivityType.FOLLOW_UP:
      return `${base} bg-teal-100 text-teal-800`;
    case ActivityType.PURCHASE:
      return `${base} bg-emerald-100 text-emerald-800`;
    case ActivityType.SUPPORT:
      return `${base} bg-rose-100 text-rose-800`;
    default:
      return `${base} bg-gray-100 text-gray-700`;
  }
}

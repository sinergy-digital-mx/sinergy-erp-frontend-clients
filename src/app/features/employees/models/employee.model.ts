/**
 * Employees Module Models
 *
 * TypeScript interfaces that mirror the `/tenant/employees` API contract.
 */

export type EmployeeStatus = 'active' | 'inactive';

export type PaymentFrequency = 'weekly' | 'biweekly' | 'monthly';

export type LeaveType = 'vacation' | 'absence' | 'sick_leave' | 'permit';

export type LeaveStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled';

/**
 * Payment frequency options for the user modal / employee form.
 */
export const PAYMENT_FREQUENCY_OPTIONS: ReadonlyArray<{
  value: PaymentFrequency;
  label: string;
}> = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'biweekly', label: 'Quincenal' },
  { value: 'monthly', label: 'Mensual' },
];

/**
 * Leave type options for the leave-request forms.
 */
export const LEAVE_TYPE_OPTIONS: ReadonlyArray<{
  value: LeaveType;
  label: string;
}> = [
  { value: 'vacation', label: 'Vacaciones' },
  { value: 'absence', label: 'Falta' },
  { value: 'sick_leave', label: 'Incapacidad' },
  { value: 'permit', label: 'Permiso' },
];

/**
 * Vacation summary computed by the backend (Mexican LFT — "Vacaciones dignas").
 */
export interface EmployeeVacationSummary {
  years_of_service: number;
  entitled_days: number;
  taken_days: number;
  pending_days: number;
  available_days: number;
  current_period_start?: string;
}

/**
 * Payroll figures computed by the backend from the monthly salary.
 */
export interface EmployeePayroll {
  monthly_salary: number;
  daily_salary: number;
  biweekly_salary: number;
  weekly_salary: number;
  annual_salary: number;
  integration_factor?: number;
  integrated_daily_salary?: number;
}

/**
 * A single vacation / absence request.
 */
export interface LeaveRequest {
  id: string;
  employee_id?: string;
  type: LeaveType;
  status: LeaveStatus;
  start_date: string;
  end_date: string;
  days: number;
  reason?: string;
  is_paid?: boolean;
  review_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at?: string;
  updated_at?: string;
  /** Present in the RH "all leave requests" view. */
  employee?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    position?: string;
    photo_url?: string;
  };
}

export interface LeaveRequestCounts {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
}

/**
 * HR / payroll profile attached to a user marked as employee.
 * Sent inside the `employee` object of POST/PUT /tenant/users.
 */
export interface EmployeeProfile {
  employee_code?: string;
  rfc?: string;
  curp?: string;
  nss?: string;
  position?: string;
  department?: string;
  hire_date?: string;
  birth_date?: string;
  monthly_salary?: number;
  payment_frequency?: PaymentFrequency;
  bank_name?: string;
  clabe?: string;
  bank_account?: string;
}

/**
 * Full employee record returned by the Employees module endpoints.
 */
export interface Employee extends EmployeeProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  status?: EmployeeStatus | string;
  photo_url?: string | null;
  years_of_service?: number;
  vacation?: EmployeeVacationSummary;
  payroll?: EmployeePayroll;
  request_counts?: LeaveRequestCounts;
  leave_requests?: LeaveRequest[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Filters for the Employees list.
 */
export interface EmployeeFilters {
  search?: string;
  status?: string;
  department?: string;
}

/**
 * Filters for the RH "all leave requests" view.
 */
export interface LeaveRequestFilters {
  status?: LeaveStatus | '';
  type?: LeaveType | '';
}

/**
 * Pagination request params.
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Standard paginated envelope used across the ERP API.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Payload for creating a leave request (self-service or on behalf of an employee).
 */
export interface CreateLeaveRequestDto {
  type: LeaveType;
  start_date: string;
  end_date: string;
  reason?: string;
  is_paid?: boolean;
}

/**
 * Payload for approving / rejecting a leave request.
 */
export interface ReviewLeaveRequestDto {
  status: Extract<LeaveStatus, 'approved' | 'rejected'>;
  review_notes?: string;
}

/**
 * Human-readable labels for leave types.
 */
export function getLeaveTypeLabel(type: LeaveType | string | undefined): string {
  return LEAVE_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? 'Solicitud';
}

/**
 * Human-readable labels for leave statuses.
 */
export function getLeaveStatusLabel(status: LeaveStatus | string | undefined): string {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'approved':
      return 'Aprobada';
    case 'rejected':
      return 'Rechazada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return status ?? '—';
  }
}

/**
 * Human-readable label for payment frequency.
 */
export function getPaymentFrequencyLabel(
  frequency: PaymentFrequency | string | undefined
): string {
  return (
    PAYMENT_FREQUENCY_OPTIONS.find((o) => o.value === frequency)?.label ?? '—'
  );
}

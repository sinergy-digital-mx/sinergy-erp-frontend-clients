/**
 * Mexican labor law helpers (client-side preview).
 *
 * These calculations reproduce the backend logic so the user modal can show a
 * live preview (vacation days, payroll breakdown) before saving. The backend
 * remains the source of truth: list / detail views use the `vacation` and
 * `payroll` objects returned by the API.
 *
 * Vacation entitlement follows the 2023 "Vacaciones Dignas" reform to the
 * Ley Federal del Trabajo (art. 76):
 *   - Year 1: 12 days
 *   - Year 2: 14 days
 *   - Year 3: 16 days
 *   - Year 4: 18 days
 *   - Year 5: 20 days
 *   - From year 6 onward: +2 days every additional 5 years of service.
 */

import { EmployeePayroll } from '../models/employee.model';

/** Days per month used by LFT for daily salary (salario diario = mensual / 30). */
const DAYS_PER_MONTH = 30;

/**
 * Whole years of service completed between the hire date and a reference date.
 */
export function getYearsOfService(
  hireDate: string | Date | null | undefined,
  reference: Date = new Date()
): number {
  if (!hireDate) {
    return 0;
  }

  const start = hireDate instanceof Date ? hireDate : new Date(hireDate);
  if (Number.isNaN(start.getTime())) {
    return 0;
  }

  let years = reference.getFullYear() - start.getFullYear();
  const monthDiff = reference.getMonth() - start.getMonth();
  const dayDiff = reference.getDate() - start.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }

  return Math.max(0, years);
}

/**
 * Entitled vacation days for a given completed years of service.
 *
 * `yearsOfService` is the number of *completed* years. During the first year
 * of employment (0 completed years) the worker is accruing toward the first
 * anniversary; we report 12 (the minimum after completing year 1) so the
 * preview is meaningful.
 */
export function getEntitledVacationDays(yearsOfService: number): number {
  const years = Math.max(0, Math.floor(yearsOfService || 0));

  // Year-1 through year-5 ramp.
  if (years <= 1) return 12;
  if (years === 2) return 14;
  if (years === 3) return 16;
  if (years === 4) return 18;
  if (years === 5) return 20;

  // From year 6: +2 days per additional 5-year block.
  const extraBlocks = Math.floor((years - 1) / 5);
  return 20 + extraBlocks * 2;
}

/**
 * Full payroll breakdown derived from a monthly salary.
 *
 * - daily = monthly / 30
 * - weekly = daily * 7
 * - biweekly (quincenal) = monthly / 2
 * - annual = monthly * 12
 * - integrated daily salary (SDI) uses the LFT minimum integration factor for
 *   the first year (15 días aguinaldo + 25% prima vacacional sobre vacaciones).
 */
export function calculatePayroll(
  monthlySalary: number | null | undefined,
  yearsOfService = 1
): EmployeePayroll {
  const monthly = Number(monthlySalary) || 0;
  const daily = round2(monthly / DAYS_PER_MONTH);
  const weekly = round2(daily * 7);
  const biweekly = round2(monthly / 2);
  const annual = round2(monthly * 12);

  const integrationFactor = getIntegrationFactor(yearsOfService);
  const integratedDaily = round2(daily * integrationFactor);

  return {
    monthly_salary: round2(monthly),
    daily_salary: daily,
    biweekly_salary: biweekly,
    weekly_salary: weekly,
    annual_salary: annual,
    integration_factor: integrationFactor,
    integrated_daily_salary: integratedDaily,
  };
}

/**
 * Salario Diario Integrado factor (LFT art. 84):
 *   factor = 1 + (aguinaldo_dias + prima_vacacional_dias) / 365
 *   - aguinaldo = 15 días (mínimo legal)
 *   - prima vacacional = 25% de los días de vacaciones que corresponden
 */
export function getIntegrationFactor(yearsOfService: number): number {
  const aguinaldoDays = 15;
  const vacationDays = getEntitledVacationDays(yearsOfService);
  const primaVacacionalDays = vacationDays * 0.25;
  const factor = 1 + (aguinaldoDays + primaVacacionalDays) / 365;
  return round4(factor);
}

/**
 * Inclusive number of calendar days between two ISO dates (YYYY-MM-DD).
 * Used for faltas / permisos / incapacidad.
 */
export function getInclusiveDays(
  startDate: string | null | undefined,
  endDate: string | null | undefined
): number {
  const start = parseIsoDateLocal(startDate);
  const end = parseIsoDateLocal(endDate);
  if (!start || !end) {
    return 0;
  }
  const ms = end.getTime() - start.getTime();
  if (ms < 0) {
    return 0;
  }
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Días hábiles inclusivos (lunes a viernes).
 * 16–24 abril 2026 = 7, no 9.
 */
export function getBusinessDays(
  startDate: string | null | undefined,
  endDate: string | null | undefined
): number {
  const start = parseIsoDateLocal(startDate);
  const end = parseIsoDateLocal(endDate);
  if (!start || !end || start > end) {
    return 0;
  }

  let count = 0;
  const cursor = new Date(start);
  while (cursor <= end) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      count += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

/**
 * Preview of days the API will store.
 * Vacaciones = hábiles (lun–vie) salvo `countWeekends`.
 * Faltas / permisos / incapacidad = días naturales.
 */
export function getLeaveDays(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  type?: string | null,
  countWeekends = false
): number {
  if (type === 'vacation' && !countWeekends) {
    return getBusinessDays(startDate, endDate);
  }
  return getInclusiveDays(startDate, endDate);
}

/** Evita el desfase UTC de `new Date('YYYY-MM-DD')`. */
function parseIsoDateLocal(value: string | null | undefined): Date | null {
  if (!value) {
    return null;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) {
    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function round4(value: number): number {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}

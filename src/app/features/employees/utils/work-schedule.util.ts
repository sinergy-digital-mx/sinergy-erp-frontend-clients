import { WorkSchedule, WorkScheduleDay, WorkWeekday } from '../models/employee.model';

export const WORK_WEEKDAYS: WorkWeekday[] = [1, 2, 3, 4, 5, 6, 7];

export const WORK_WEEKDAY_LABELS: Record<WorkWeekday, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
};

export const WORK_WEEKDAY_SHORT: Record<WorkWeekday, string> = {
  1: 'Lun',
  2: 'Mar',
  3: 'Mié',
  4: 'Jue',
  5: 'Vie',
  6: 'Sáb',
  7: 'Dom',
};

export interface WorkScheduleDayDraft {
  weekday: WorkWeekday;
  is_workday: boolean;
  start_time: string;
  end_time: string;
}

const CLOCK = /^([01]\d|2[0-3]):([0-5]\d)/;

export function hoursBetweenClocks(startTime: string, endTime: string): number | null {
  const start = clockMinutes(startTime);
  const end = clockMinutes(endTime);
  if (start == null || end == null || start === end) {
    return null;
  }
  const minutes = end > start ? end - start : 1440 - start + end;
  return Math.round((minutes / 60) * 100) / 100;
}

export function formatScheduleHours(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) {
    return '—';
  }
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? `${rounded} h` : `${rounded.toFixed(1)} h`;
}

export function draftWorkScheduleDays(schedule?: WorkSchedule | null): WorkScheduleDayDraft[] {
  const byWeekday = new Map<number, WorkScheduleDay>();
  for (const day of schedule?.days ?? []) {
    byWeekday.set(day.weekday, day);
  }
  const hasSaved = (schedule?.days ?? []).some((day) => day.is_workday);
  return WORK_WEEKDAYS.map((weekday) => {
    const saved = byWeekday.get(weekday);
    if (saved) {
      return {
        weekday,
        is_workday: saved.is_workday,
        start_time: saved.start_time || (saved.is_workday ? '09:00' : ''),
        end_time: saved.end_time || (saved.is_workday ? '18:00' : ''),
      };
    }
    const isWorkday = !hasSaved && weekday <= 5;
    return {
      weekday,
      is_workday: isWorkday,
      start_time: isWorkday ? '09:00' : '',
      end_time: isWorkday ? '18:00' : '',
    };
  });
}

export function weeklyHoursFromDraft(days: WorkScheduleDayDraft[]): number {
  return Math.round(
    days.reduce((total, day) => {
      if (!day.is_workday) {
        return total;
      }
      return total + (hoursBetweenClocks(day.start_time, day.end_time) ?? 0);
    }, 0) * 100,
  ) / 100;
}

function clockMinutes(value: string): number | null {
  const match = CLOCK.exec(String(value ?? '').trim());
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

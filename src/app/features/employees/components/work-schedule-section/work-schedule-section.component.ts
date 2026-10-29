import { Component, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../../employee-portal/services/employee-portal.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee, UpsertWorkScheduleDto, WorkSchedule } from '../../models/employee.model';
import {
  WORK_WEEKDAY_LABELS,
  WORK_WEEKDAY_SHORT,
  WorkScheduleDayDraft,
  draftWorkScheduleDays,
  formatScheduleHours,
  hoursBetweenClocks,
  weeklyHoursFromDraft,
} from '../../utils/work-schedule.util';

@Component({
  selector: 'app-work-schedule-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-schedule-section.component.html',
  styleUrls: ['./work-schedule-section.component.scss'],
})
export class WorkScheduleSectionComponent implements OnChanges {
  @Input() source: 'employee' | 'portal' = 'employee';
  @Input() employeeId = '';
  @Input() schedule: WorkSchedule | null = null;
  @Input() canEdit = false;
  @Output() saved = new EventEmitter<Employee>();

  readonly weekdayLabel = WORK_WEEKDAY_LABELS;
  readonly weekdayShort = WORK_WEEKDAY_SHORT;
  readonly formatHours = formatScheduleHours;

  days = signal<WorkScheduleDayDraft[]>(draftWorkScheduleDays());
  notes = signal('');
  saving = signal(false);

  constructor(
    private employeeService: EmployeeService,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService,
  ) {}

  ngOnChanges(): void {
    this.days.set(draftWorkScheduleDays(this.schedule));
    this.notes.set(this.schedule?.notes ?? '');
  }

  get weeklyHours(): number {
    return weeklyHoursFromDraft(this.days());
  }

  get hasSchedule(): boolean {
    return (this.schedule?.days ?? []).some((day) => day.is_workday);
  }

  dayHours(day: WorkScheduleDayDraft): number | null {
    if (!day.is_workday) {
      return null;
    }
    return hoursBetweenClocks(day.start_time, day.end_time);
  }

  toggleWorkday(weekday: WorkScheduleDayDraft['weekday'], checked: boolean): void {
    this.days.update((days) =>
      days.map((day) => {
        if (day.weekday !== weekday) {
          return day;
        }
        return {
          ...day,
          is_workday: checked,
          start_time: checked ? day.start_time || '09:00' : '',
          end_time: checked ? day.end_time || '18:00' : '',
        };
      }),
    );
  }

  patchTime(
    weekday: WorkScheduleDayDraft['weekday'],
    field: 'start_time' | 'end_time',
    value: string,
  ): void {
    this.days.update((days) =>
      days.map((day) => (day.weekday === weekday ? { ...day, [field]: value } : day)),
    );
  }

  save(): void {
    if (!this.canEdit || this.saving()) {
      return;
    }
    const payload: UpsertWorkScheduleDto = {
      days: this.days().map((day) => ({
        weekday: day.weekday,
        is_workday: day.is_workday,
        start_time: day.is_workday ? day.start_time?.slice(0, 5) || null : null,
        end_time: day.is_workday ? day.end_time?.slice(0, 5) || null : null,
      })),
      notes: this.notes().trim() || null,
    };
    this.saving.set(true);
    const request$ =
      this.source === 'portal'
        ? this.portalService.upsertMyWorkSchedule(payload)
        : this.employeeService.upsertWorkSchedule(this.employeeId, payload);
    request$.subscribe({
      next: (employee) => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Horario guardado',
          message: 'Quedó el horario laboral de la semana.',
        });
        this.saved.emit(employee);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo guardar el horario',
        });
      },
    });
  }
}

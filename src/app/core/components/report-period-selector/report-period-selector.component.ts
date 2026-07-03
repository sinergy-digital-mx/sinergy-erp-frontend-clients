import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type ReportPeriod = 'today' | 'week' | 'month' | 'year' | 'range';

const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

@Component({
  selector: 'app-report-period-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="zn-period-bar" role="search" [attr.aria-label]="ariaLabel">
      <div
        class="zn-period-panel"
        [class.zn-period-panel--range]="period === 'range'">
        <div class="zn-period-toggle" role="group">
          @for (opt of visibleOptions; track opt.value) {
            @if (opt.value === 'month') {
              <div class="zn-period-toggle__month-wrap">
                <button
                  type="button"
                  class="zn-period-toggle__btn zn-period-toggle__btn--month"
                  [class.zn-period-toggle__btn--active]="isMonthActive"
                  [attr.aria-pressed]="isMonthActive"
                  [attr.aria-expanded]="monthDropdownOpen"
                  aria-haspopup="listbox"
                  (click)="toggleMonthDropdown($event)">
                  <span>{{ opt.label }}</span>
                  <svg
                    class="zn-period-toggle__chevron"
                    [class.zn-period-toggle__chevron--open]="monthDropdownOpen"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                @if (monthDropdownOpen) {
                  <div class="zn-period-month-menu" role="listbox" aria-label="Seleccionar mes">
                    @for (m of monthOptions; track m.index) {
                      <button
                        type="button"
                        class="zn-period-month-menu__item"
                        role="option"
                        [class.zn-period-month-menu__item--active]="isMonthOptionSelected(m.index)"
                        [attr.aria-selected]="isMonthOptionSelected(m.index)"
                        (click)="onSelectMonth(m.index)">
                        {{ m.label }}
                      </button>
                    }
                  </div>
                }
              </div>
            } @else {
              <button
                type="button"
                class="zn-period-toggle__btn"
                [class.zn-period-toggle__btn--active]="period === opt.value"
                [attr.aria-pressed]="period === opt.value"
                (click)="onSelectPeriod(opt.value)">
                {{ opt.label }}
              </button>
            }
          }
          <button
            type="button"
            class="zn-period-toggle__btn zn-period-toggle__btn--range"
            [class.zn-period-toggle__btn--active]="period === 'range'"
            [attr.aria-pressed]="period === 'range'"
            [attr.aria-label]="customRangeAriaLabel()"
            (click)="onSelectPeriod('range')">
            <svg
              class="zn-period-toggle__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Rango</span>
          </button>
        </div>

        @if (period === 'range') {
          <div class="zn-date-range" aria-label="Rango de fechas personalizado">
            <div class="zn-date-range__field">
              <label class="zn-date-range__label" [for]="dateFromId">Inicio</label>
              <div class="zn-date-range__control">
                <input
                  [id]="dateFromId"
                  type="date"
                  class="zn-date-range__input"
                  [(ngModel)]="dateFrom"
                  (change)="onRangeInputChange()"
                  [max]="dateTo || undefined"
                  aria-label="Fecha de inicio" />
              </div>
            </div>
            <span class="zn-date-range__sep" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <div class="zn-date-range__field">
              <label class="zn-date-range__label" [for]="dateToId">Fin</label>
              <div class="zn-date-range__control">
                <input
                  [id]="dateToId"
                  type="date"
                  class="zn-date-range__input"
                  [(ngModel)]="dateTo"
                  (change)="onRangeInputChange()"
                  [min]="dateFrom || undefined"
                  aria-label="Fecha de fin" />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .zn-period-bar {
        flex-shrink: 0;
        overflow: visible;
      }
      .zn-period-panel {
        display: inline-flex;
        flex-direction: column;
        align-items: stretch;
        width: fit-content;
        max-width: 100%;
        overflow: visible;
        background: #fff;
        border-radius: 16px;
        padding: 0.25rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;
        transition: padding 0.2s ease, min-width 0.2s ease;
      }
      .zn-period-panel--range {
        padding: 0.25rem 0.35rem 0.65rem;
        min-width: min(100%, 22rem);
      }
      .zn-period-toggle {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 0.125rem;
        padding: 0.15rem;
        width: 100%;
        flex-shrink: 0;
      }
      .zn-period-toggle__btn {
        border: none;
        background: transparent;
        color: #475569;
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.4rem 0.75rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        white-space: nowrap;
        line-height: 1.25;
        flex-shrink: 0;
      }
      .zn-period-toggle__btn:hover:not(.zn-period-toggle__btn--active) {
        background: #f8fafc;
        color: #334155;
      }
      .zn-period-toggle__btn--active {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: #fff;
        box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
      }
      .zn-period-toggle__btn--range,
      .zn-period-toggle__btn--month {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }
      .zn-period-toggle__month-wrap {
        position: relative;
        flex-shrink: 0;
      }
      .zn-period-toggle__chevron {
        width: 0.75rem;
        height: 0.75rem;
        flex-shrink: 0;
        opacity: 0.7;
        transition: transform 0.15s ease;
      }
      .zn-period-toggle__chevron--open {
        transform: rotate(180deg);
      }
      .zn-period-month-menu {
        position: absolute;
        top: calc(100% + 0.35rem);
        left: 0;
        z-index: 40;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 8.5rem;
        max-height: min(18rem, 70vh);
        overflow-y: auto;
        padding: 0.35rem;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
      }
      .zn-period-month-menu__item {
        border: none;
        background: transparent;
        color: #475569;
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.45rem 0.75rem;
        border-radius: 8px;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s ease, color 0.15s ease;
        white-space: nowrap;
        width: 100%;
      }
      .zn-period-month-menu__item:hover {
        background: #f8fafc;
        color: #334155;
      }
      .zn-period-month-menu__item--active {
        background: #eef2ff;
        color: #4338ca;
      }
      .zn-period-toggle__icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .zn-date-range {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: end;
        gap: 0.5rem 0.4rem;
        width: 100%;
        padding: 0.6rem 0.35rem 0.15rem;
        margin-top: 0.15rem;
        border-top: 1px solid #f1f5f9;
      }
      .zn-date-range__field {
        min-width: 0;
      }
      .zn-date-range__label {
        display: block;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        color: #64748b;
        margin-bottom: 0.35rem;
      }
      .zn-date-range__control {
        display: flex;
        align-items: center;
        min-height: 2.5rem;
        padding: 0 0.65rem;
        background: linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%);
        border: 1px solid #e4e4e7;
        border-radius: 10px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }
      .zn-date-range__control:focus-within {
        border-color: #a5b4fc;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
      .zn-date-range__input {
        width: 100%;
        min-width: 0;
        padding: 0.45rem 0;
        border: none;
        background: transparent;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1e293b;
        cursor: pointer;
        font-family: Inter, sans-serif !important;
      }
      .zn-date-range__input:focus {
        outline: none;
      }
      .zn-date-range__input::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.55;
        margin-left: 0.25rem;
      }
      .zn-date-range__sep {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 0.65rem;
        color: #cbd5e1;
        flex-shrink: 0;
      }
      .zn-date-range__sep svg {
        width: 1.125rem;
        height: 1.125rem;
      }
      @media (max-width: 640px) {
        .zn-period-toggle__btn {
          padding: 0.35rem 0.55rem;
          font-size: 0.75rem;
        }
        .zn-period-bar,
        .zn-period-panel,
        .zn-period-panel--range {
          width: 100%;
          min-width: 0;
        }
        .zn-date-range {
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        .zn-date-range__sep {
          display: none;
        }
      }
    `,
  ],
})
export class ReportPeriodSelectorComponent {
  @Input() period: ReportPeriod = 'month';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() includeYear = false;
  @Input() ariaLabel = 'Periodo del reporte';
  @Input() dateFromId = 'report-date-from';
  @Input() dateToId = 'report-date-to';

  @Output() periodChange = new EventEmitter<ReportPeriod>();
  @Output() rangeChange = new EventEmitter<{ dateFrom: string; dateTo: string }>();

  monthDropdownOpen = false;

  readonly monthOptions = MONTH_LABELS.map((label, index) => ({ label, index }));

  readonly baseOptions: { label: string; value: Exclude<ReportPeriod, 'range'> }[] = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
  ];

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get visibleOptions(): { label: string; value: Exclude<ReportPeriod, 'range'> }[] {
    if (this.includeYear) {
      return [...this.baseOptions, { label: 'Año', value: 'year' }];
    }
    return this.baseOptions;
  }

  get isMonthActive(): boolean {
    if (this.period === 'month') {
      return true;
    }
    if (this.period === 'range' && this.dateFrom && this.dateTo) {
      return this.getMonthIndexFromRange(this.dateFrom, this.dateTo) !== null;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.monthDropdownOpen) {
      return;
    }
    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.monthDropdownOpen = false;
    }
  }

  toggleMonthDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.monthDropdownOpen = !this.monthDropdownOpen;
  }

  isMonthOptionSelected(monthIndex: number): boolean {
    if (this.period === 'month') {
      return monthIndex === new Date().getMonth();
    }
    if (this.period === 'range' && this.dateFrom && this.dateTo) {
      return this.getMonthIndexFromRange(this.dateFrom, this.dateTo) === monthIndex;
    }
    return false;
  }

  onSelectMonth(monthIndex: number): void {
    this.monthDropdownOpen = false;

    const now = new Date();
    const year = now.getFullYear();
    const from = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const today = this.startOfDay(now);
    // Mes cerrado: día 1 → último día. Mes actual: día 1 → hoy.
    const to = lastDay > today ? today : lastDay;

    // Siempre rango explícito (evita que period=month use "mes actual" del servidor
    // y que metas se resuelvan en otro mes por timezone).
    const dateFrom = this.toInputDate(from);
    const dateTo = this.toInputDate(to);
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.periodChange.emit('range');
    this.rangeChange.emit({ dateFrom, dateTo });
  }

  onSelectPeriod(preset: ReportPeriod): void {
    this.monthDropdownOpen = false;

    if (preset === 'month') {
      // Mes actual como rango explícito (mismo path que elegir el mes en el dropdown).
      this.onSelectMonth(new Date().getMonth());
      return;
    }

    if (preset === 'range' && (!this.dateFrom || !this.dateTo)) {
      const to = this.startOfDay(new Date());
      const from = new Date(to);
      from.setDate(from.getDate() - 30);
      this.dateFrom = this.toInputDate(from);
      this.dateTo = this.toInputDate(to);
    }
    this.periodChange.emit(preset);
    if (preset === 'range' && this.dateFrom && this.dateTo) {
      this.rangeChange.emit({ dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
  }

  onRangeInputChange(): void {
    if (!this.dateFrom || !this.dateTo) {
      return;
    }

    const from = this.parseInputDate(this.dateFrom);
    const to = this.parseInputDate(this.dateTo);
    if (!from || !to) {
      return;
    }

    if (from > to) {
      const tmp = this.dateFrom;
      this.dateFrom = this.dateTo;
      this.dateTo = tmp;
    }

    this.rangeChange.emit({ dateFrom: this.dateFrom, dateTo: this.dateTo });
  }

  customRangeAriaLabel(): string {
    if (this.period === 'range' && this.dateFrom && this.dateTo) {
      return `Rango personalizado: ${this.dateFrom} a ${this.dateTo}`;
    }
    return 'Seleccionar rango de fechas personalizado';
  }

  private getMonthIndexFromRange(dateFrom: string, dateTo: string): number | null {
    const from = this.parseInputDate(dateFrom);
    const to = this.parseInputDate(dateTo);
    if (!from || !to || from.getFullYear() !== to.getFullYear() || from.getMonth() !== to.getMonth()) {
      return null;
    }

    const year = from.getFullYear();
    const monthIndex = from.getMonth();
    const monthStart = this.toInputDate(new Date(year, monthIndex, 1));
    const monthEnd = this.toInputDate(new Date(year, monthIndex + 1, 0));
    const now = this.startOfDay(new Date());
    const expectedEnd = this.toInputDate(
      new Date(year, monthIndex + 1, 0) > now ? now : new Date(year, monthIndex + 1, 0)
    );

    if (dateFrom !== monthStart) {
      return null;
    }
    if (dateTo !== monthEnd && dateTo !== expectedEnd) {
      return null;
    }

    return monthIndex;
  }

  private startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private parseInputDate(value: string): Date | null {
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) {
      return null;
    }
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-filter-clear-button',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  template: `
    <span
      class="filter-bar__clear-button-wrap"
      [matTooltip]="active ? 'Limpiar filtros' : 'No hay filtros activos'"
      matTooltipPosition="above">
      <button
        type="button"
        class="filter-bar__clear-button"
        [class.filter-bar__clear-button--inactive]="!active"
        [disabled]="!active"
        (click)="onClear()"
        [attr.aria-label]="active ? 'Limpiar filtros' : 'No hay filtros activos'">
        <svg
          class="filter-bar__clear-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M4 6H20L14 13V18L10 20V13L4 6Z"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round" />
          <path
            d="M5 19L19 5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round" />
        </svg>
      </button>
    </span>
  `,
  styleUrl: './filter-clear-button.component.scss',
})
export class FilterClearButtonComponent {
  @Input() active = false;
  @Output() clear = new EventEmitter<void>();

  onClear(): void {
    if (!this.active) {
      return;
    }
    this.clear.emit();
  }
}

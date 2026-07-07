import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActiveFilter {
  type: 'status' | 'group' | 'search';
  label: string;
}

@Component({
  selector: 'app-property-filter-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (activeFilters.length) {
      <div class="property-filter-indicator">
        <div class="property-filter-indicator__container">
          <span class="property-filter-indicator__label">Filtros activos:</span>
          <div class="property-filter-indicator__chips">
            @for (filter of activeFilters; track filter.type) {
              <div class="property-filter-indicator__chip">
                <span>{{ filter.label }}</span>
                <button
                  type="button"
                  class="property-filter-indicator__remove"
                  (click)="clearFilter(filter.type)"
                  title="Limpiar filtro">
                  ×
                </button>
              </div>
            }
          </div>
          <button
            type="button"
            class="property-filter-indicator__clear-all"
            (click)="clearAllFilters()">
            Limpiar todos
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .property-filter-indicator {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
    }

    .property-filter-indicator__container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .property-filter-indicator__label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: #6b7280;
    }

    .property-filter-indicator__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .property-filter-indicator__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.25rem 0.625rem;
      font-size: 0.8125rem;
      color: #374151;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 9999px;
    }

    .property-filter-indicator__remove {
      border: none;
      background: transparent;
      color: #9ca3af;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
    }

    .property-filter-indicator__remove:hover {
      color: #6b7280;
    }

    .property-filter-indicator__clear-all {
      margin-left: auto;
      border: none;
      background: transparent;
      color: #6366f1;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0;
    }

    .property-filter-indicator__clear-all:hover {
      color: #4f46e5;
    }
  `],
})
export class PropertyFilterIndicatorComponent implements OnChanges {
  @Input() activeStatus: string | null = null;
  @Input() activeStatusLabel: string | null = null;
  @Input() activeGroupId: string | null = null;
  @Input() activeGroupName: string | null = null;
  @Input() activeSearchTerm: string | null = null;
  @Output() filterClear = new EventEmitter<'status' | 'group' | 'search' | 'all'>();

  activeFilters: ActiveFilter[] = [];

  ngOnChanges(): void {
    this.activeFilters = [];

    if (this.activeStatus) {
      this.activeFilters.push({
        type: 'status',
        label: `Estado: ${this.activeStatusLabel || this.activeStatus}`,
      });
    }

    if (this.activeGroupId && this.activeGroupName) {
      this.activeFilters.push({
        type: 'group',
        label: `Proyecto: ${this.activeGroupName}`,
      });
    }

    if (this.activeSearchTerm?.trim()) {
      this.activeFilters.push({
        type: 'search',
        label: `Búsqueda: ${this.activeSearchTerm.trim()}`,
      });
    }
  }

  clearFilter(filterType: 'status' | 'group' | 'search'): void {
    this.filterClear.emit(filterType);
  }

  clearAllFilters(): void {
    this.filterClear.emit('all');
  }
}

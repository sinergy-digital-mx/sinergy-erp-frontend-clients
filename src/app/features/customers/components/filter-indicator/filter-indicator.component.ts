import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface ActiveFilter {
  type: 'status' | 'group' | 'search';
  value: string;
  label: string;
}

@Component({
  selector: 'app-customer-filter-indicator',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
  <div class="filters-container">
    <span class="filters-label">Filtros activos:</span>
    <div class="filter-chips">
      <div *ngFor="let filter of activeFilters" class="filter-chip">
        <i [class]="'pi ' + getFilterIcon(filter.type)"></i>
        <span>{{ filter.label }}</span>
        <button 
          type="button"
          class="remove-btn"
          (click)="clearFilter(filter.type)"
          title="Limpiar filtro">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <button 
      type="button"
      class="clear-all-btn"
      (click)="clearAllFilters()"
      pButton
      label="Limpiar todos"
      class="p-button-sm p-button-text">
    </button>
  </div>
</div>`,
  styles: [`
.filter-indicator {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.filter-indicator .filters-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-indicator .filters-container .filters-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
}

.filter-indicator .filters-container .filter-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-indicator .filters-container .filter-chips .filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #3b82f6;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: #1e40af;
}

.filter-indicator .filters-container .filter-chips .filter-chip i {
  font-size: 0.75rem;
}

.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn {
  background: none;
  border: none;
  color: #1e40af;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: color 0.2s ease;
}

.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn:hover {
  color: #dc2626;
}

.filter-indicator .filters-container .clear-all-btn {
  margin-left: auto;
}

@media (max-width: 767px) {
  .filter-indicator {
    padding: 0.75rem;
  }

  .filter-indicator .filters-container {
    gap: 0.5rem;
  }

  .filter-indicator .filters-container .filters-label {
    font-size: 0.8125rem;
  }

  .filter-indicator .filters-container .filter-chips .filter-chip {
    font-size: 0.8125rem;
    padding: 0.25rem 0.5rem;
  }
}
  `],
})
export class FilterIndicatorComponent {
  @Input() activeStatusFilter: string | null = null;
  @Input() activeGroupId: string | null = null;
  @Input() activeGroupName: string | null = null;
  @Input() activeSearchTerm: string | null = null;
  @Output() filterClear = new EventEmitter<'status' | 'group' | 'search' | 'all'>();

  activeFilters: ActiveFilter[] = [];

  ngOnChanges() {
    this.updateActiveFilters();
  }

  /**
   * Update the list of active filters
   */
  private updateActiveFilters() {
    this.activeFilters = [];

    if (this.activeStatusFilter) {
      this.activeFilters.push({
        type: 'status',
        value: this.activeStatusFilter,
        label: `Estado: ${this.activeStatusFilter}`
      });
    }

    if (this.activeGroupId && this.activeGroupName) {
      this.activeFilters.push({
        type: 'group',
        value: this.activeGroupId,
        label: `Grupo: ${this.activeGroupName}`
      });
    }

    if (this.activeSearchTerm) {
      this.activeFilters.push({
        type: 'search',
        value: this.activeSearchTerm,
        label: `Búsqueda: ${this.activeSearchTerm}`
      });
    }
  }

  /**
   * Check if there are any active filters
   */
  hasActiveFilters(): boolean {
    return this.activeFilters.length > 0;
  }

  /**
   * Clear a specific filter
   */
  clearFilter(filterType: 'status' | 'group' | 'search') {
    this.filterClear.emit(filterType);
  }

  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterClear.emit('all');
  }

  /**
   * Get the icon for a filter type
   */
  getFilterIcon(filterType: 'status' | 'group' | 'search'): string {
    switch (filterType) {
      case 'status':
        return 'pi-filter';
      case 'group':
        return 'pi-tag';
      case 'search':
        return 'pi-search';
      default:
        return 'pi-filter';
    }
  }
}

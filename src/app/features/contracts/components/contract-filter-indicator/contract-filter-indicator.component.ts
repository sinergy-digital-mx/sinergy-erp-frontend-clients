import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Search, X } from 'lucide-angular';

interface ActiveFilter {
  type: 'search' | 'status';
  value: string;
  label: string;
}

@Component({
  selector: 'app-contract-filter-indicator',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
  <div class="filters-container">
    <span class="filters-label">Filtros activos:</span>
    <div class="filter-chips">
      <div *ngFor="let filter of activeFilters" class="filter-chip">
        <lucide-icon [img]="getFilterIcon(filter.type)" [size]="14"></lucide-icon>
        <span>{{ filter.label }}</span>
        <button 
          type="button"
          class="remove-btn"
          (click)="clearFilter(filter.type)"
          title="Limpiar filtro">
          <lucide-icon [img]="X" [size]="12"></lucide-icon>
        </button>
      </div>
    </div>
    <button 
      type="button"
      class="clear-all-btn"
      (click)="clearAllFilters()"
      aria-label="Limpiar todos los filtros">
      Limpiar todos
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
  border: none;
  background: transparent;
  color: #1d4ed8;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.filter-indicator .filters-container .clear-all-btn:hover {
  background: #dbeafe;
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
export class ContractFilterIndicatorComponent {
  readonly Filter = Filter;
  readonly Search = Search;
  readonly X = X;

  @Input() activeSearchTerm: string | null = null;
  @Input() activeStatusFilter: string | null = null;
  @Output() filterClear = new EventEmitter<'search' | 'status' | 'all'>();

  activeFilters: ActiveFilter[] = [];

  ngOnChanges() {
    this.updateActiveFilters();
  }

  private updateActiveFilters() {
    this.activeFilters = [];

    if (this.activeStatusFilter) {
      const statusLabel = this.getStatusLabel(this.activeStatusFilter);
      this.activeFilters.push({
        type: 'status',
        value: this.activeStatusFilter,
        label: `Estado: ${statusLabel}`
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

  hasActiveFilters(): boolean {
    return this.activeFilters.length > 0;
  }

  clearFilter(filterType: 'search' | 'status') {
    this.filterClear.emit(filterType);
  }

  clearAllFilters() {
    this.filterClear.emit('all');
  }

  getFilterIcon(filterType: 'search' | 'status') {
    switch (filterType) {
      case 'status':
        return this.Filter;
      case 'search':
        return this.Search;
      default:
        return this.Filter;
    }
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'activo': 'Activo',
      'completado': 'Completado',
      'cancelado': 'Cancelado',
      'suspendido': 'Suspendido'
    };
    return labels[status] || status;
  }
}

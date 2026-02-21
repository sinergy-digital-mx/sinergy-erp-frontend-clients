import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { StateService } from '../../services/state.service';
import { UserStatus } from '../../models';

/**
 * UserSearchFilterComponent
 * Presentational component for user search and status filtering
 * Integrates SearchComponent for email search and SelectComponent for status filtering
 * 
 * Requirements: 3.1, 3.2, 3.3, 4.1, 4.2, 4.3
 */
@Component({
  selector: 'app-user-search-filter',
  standalone: true,
  imports: [CommonModule, SearchComponent, SelectComponent],
  template: `
    <div class="space-y-3 w-full">
      <!-- Email Search Input -->
      <div class="w-full overflow-hidden">
        <app-search
          placeholder="Buscar por email..."
          (searchChange)="onSearchChange($event)"
        ></app-search>
      </div>

      <!-- Status Filter Dropdown -->
      <div class="w-full">
        <app-select
          [config]="statusFilterConfig"
          (changeOption)="onStatusFilterChange($event)"
        ></app-select>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    ::ng-deep .search_container {
      width: 100%;
    }
    
    ::ng-deep .search_container input {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    ::ng-deep .select_container {
      width: 100%;
    }
    
    ::ng-deep .filter__control {
      width: 100%;
    }
  `]
})
export class UserSearchFilterComponent implements OnInit {
  statusFilterConfig: ISelect;

  constructor(private stateService: StateService) {
    // Initialize status filter configuration
    this.statusFilterConfig = {
      placeholder: 'Filtrar por estado',
      data: [
        { value: 'all', label: 'Todos los Estados' },
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'pending', label: 'Pendiente' }
      ],
      name_select: 'status',
      value: null,
      option: 'label',
      value_default: null,
      all: false
    };
  }

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Handles search filter changes from SearchComponent
   * Emits the search filter to the state service
   * @param searchQuery - The search query string
   */
  onSearchChange(searchQuery: string): void {
    this.stateService.setUserSearchFilter(searchQuery);
  }

  /**
   * Handles status filter changes from SelectComponent
   * Emits the status filter to the state service
   * @param event - The change event from SelectComponent
   */
  onStatusFilterChange(event: any): void {
    const statusValue = event.value as UserStatus | 'all';
    this.stateService.setUserStatusFilter(statusValue);
  }
}

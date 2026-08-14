import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { StateService } from '../../services/state.service';
import { CatalogStatus, Role, UserStatus } from '../../models';

@Component({
  selector: 'app-user-search-filter',
  standalone: true,
  imports: [CommonModule, SearchComponent, SelectComponent],
  template: `
    <div class="space-y-3 w-full">
      <div class="w-full overflow-hidden">
        <app-search
          placeholder="Buscar por email..."
          (searchChange)="onSearchChange($event)"
        ></app-search>
      </div>

      <div class="filter-row">
        <div class="filter-row__item">
          <app-select
            [config]="statusFilterConfig"
            (changeOption)="onStatusFilterChange($event)"
          ></app-select>
        </div>
        <div class="filter-row__item">
          <app-select
            [config]="roleFilterConfig"
            (changeOption)="onRoleFilterChange($event)"
          ></app-select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .filter-row {
      display: flex;
      gap: 8px;
      width: 100%;
    }

    .filter-row__item {
      flex: 1;
      min-width: 0;
    }

    ::ng-deep .search_container {
      width: 100%;
    }

    ::ng-deep .search_container input {
      width: 100% !important;
      max-width: 100% !important;
    }

    ::ng-deep .select_container,
    ::ng-deep .filter__control {
      width: 100%;
    }
  `]
})
export class UserSearchFilterComponent implements OnChanges {
  @Input() statuses: CatalogStatus[] = [];
  @Input() roles: Role[] = [];

  statusFilterConfig: ISelect;
  roleFilterConfig: ISelect;

  constructor(private stateService: StateService) {
    this.statusFilterConfig = this.buildStatusConfig([]);
    this.roleFilterConfig = this.buildRoleConfig([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statuses']) {
      this.statusFilterConfig = this.buildStatusConfig(this.statuses || []);
    }
    if (changes['roles']) {
      this.roleFilterConfig = this.buildRoleConfig(this.roles || []);
    }
  }

  onSearchChange(searchQuery: string): void {
    this.stateService.setUserSearchFilter(searchQuery);
  }

  onStatusFilterChange(event: { value?: string | null }): void {
    const raw = event?.value;
    const statusValue = !raw ? 'all' : (raw as UserStatus | 'all');
    this.stateService.setUserStatusFilter(statusValue);
  }

  onRoleFilterChange(event: { value?: string | null }): void {
    this.stateService.setUserRoleFilter(event?.value ? String(event.value) : '');
  }

  private buildStatusConfig(statuses: CatalogStatus[]): ISelect {
    return {
      placeholder: 'Filtrar por estado',
      data: statuses.map((item) => ({ value: item.code, label: item.name })),
      name_select: 'status',
      value: 'value',
      option: 'label',
      all: true,
      all_message: 'Todos',
      value_default: null,
    };
  }

  private buildRoleConfig(roles: Role[]): ISelect {
    return {
      placeholder: 'Filtrar por rol',
      data: roles.map((role) => ({ value: role.id, label: role.name })),
      name_select: 'role',
      value: 'value',
      option: 'label',
      all: true,
      all_message: 'Todos',
      value_default: null,
    };
  }
}

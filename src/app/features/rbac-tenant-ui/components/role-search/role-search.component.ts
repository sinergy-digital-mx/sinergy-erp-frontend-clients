import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { StateService } from '../../services/state.service';

/**
 * RoleSearchComponent
 * Presentational component for role search filtering
 * Integrates SearchComponent for role name search
 * 
 * Requirements: 9.1, 9.2, 9.3
 */
@Component({
  selector: 'app-role-search',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  template: `
    <div>
      <!-- Role Name Search Input -->
      <app-search
        placeholder="Search by role name..."
        (searchChange)="onSearchChange($event)"
      ></app-search>
    </div>
  `,
  styles: []
})
export class RoleSearchComponent implements OnInit {
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Handles search filter changes from SearchComponent
   * Emits the search filter to the state service
   * @param searchQuery - The search query string
   */
  onSearchChange(searchQuery: string): void {
    this.stateService.setRoleSearchFilter(searchQuery);
  }
}

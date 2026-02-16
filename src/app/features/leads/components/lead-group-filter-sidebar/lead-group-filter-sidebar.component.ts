import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { GroupFetchService } from '../../services/group-fetch.service';
import { LeadGroup, ErrorState } from '../../models/lead-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lead-group-filter-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, TagModule],
  template: `<div class="lead-group-filter-sidebar" [ngClass]="{ 'collapsed': sidebarCollapsed }">
  <!-- Mobile toggle button -->
  <div class="mobile-toggle">
    <button 
      pButton 
      type="button" 
      icon="pi pi-bars"
      class="p-button-rounded p-button-text"
      (click)="toggleSidebar()">
    </button>
  </div>

  <!-- Sidebar content -->
  <div class="sidebar-content">
    <h3 class="sidebar-title">Filtrar por Grupo</h3>

    <!-- Loading state -->
    <div *ngIf="isLoadingGroups" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando grupos...</p>
    </div>

    <!-- Error state -->
    <div *ngIf="groupsError && !isLoadingGroups" class="error-state">
      <p class="error-message">{{ groupsError.message }}</p>
      <button 
        pButton 
        type="button" 
        label="Reintentar"
        class="p-button-sm p-button-outlined"
        (click)="retryLoadGroups()">
      </button>
    </div>

    <!-- Groups list -->
    <div *ngIf="!isLoadingGroups && !groupsError" class="groups-list">
      <!-- View All option -->
      <div 
        class="group-item view-all"
        [ngClass]="{ 'selected': isGroupSelected(null) }"
        (click)="selectViewAll()">
        <span class="group-name">Ver Todos</span>
        <span class="lead-count-badge">{{ getTotalLeads() }}</span>
      </div>

      <!-- Group items -->
      <div 
        *ngFor="let group of groups"
        class="group-item"
        [ngClass]="{ 'selected': isGroupSelected(group.id) }"
        (click)="selectGroup(group.id)">
        <span class="group-name">{{ group.name }}</span>
        <span class="lead-count-badge">{{ group.lead_count || 0 }}</span>
      </div>
    </div>
  </div>
</div>`,
  styles: [`
.lead-group-filter-sidebar {
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
  min-height: 100vh;
  width: 100%;
  transition: all 0.3s ease;
}

.lead-group-filter-sidebar .mobile-toggle {
  display: none;
  margin-bottom: 1rem;
}

.lead-group-filter-sidebar .sidebar-content .sidebar-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.lead-group-filter-sidebar .sidebar-content .loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  gap: 1rem;
}

.lead-group-filter-sidebar .sidebar-content .loading-state .spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.lead-group-filter-sidebar .sidebar-content .loading-state p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.lead-group-filter-sidebar .sidebar-content .error-state {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 1rem;
  text-align: center;
}

.lead-group-filter-sidebar .sidebar-content .error-state .error-message {
  color: #991b1b;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
}

.lead-group-filter-sidebar .sidebar-content .error-state button {
  width: 100%;
}

.lead-group-filter-sidebar .sidebar-content .groups-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item .group-name {
  font-size: 0.9375rem;
  color: #374151;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item .lead-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  min-width: 30px;
  text-align: center;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item:hover {
  background-color: #f3f4f6;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item.selected {
  background-color: #dbeafe;
  border-color: #3b82f6;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item.selected .group-name {
  color: #1e40af;
  font-weight: 600;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item.selected .lead-count-badge {
  background-color: #3b82f6;
  color: white;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item.view-all {
  border-top: 1px solid #d1d5db;
  margin-bottom: 0.5rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.lead-group-filter-sidebar .sidebar-content .groups-list .group-item.view-all .group-name {
  font-weight: 600;
  color: #1f2937;
}

.lead-group-filter-sidebar.collapsed {
  display: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 767px) {
  .lead-group-filter-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 70%;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    padding: 1rem;
  }

  .lead-group-filter-sidebar .mobile-toggle {
    display: block;
  }

  .lead-group-filter-sidebar.collapsed {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .lead-group-filter-sidebar {
    width: 25%;
    min-height: 100vh;
    padding: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .lead-group-filter-sidebar {
    width: 22%;
    min-height: 100vh;
    padding: 1.5rem;
  }
}
  `],
})
export class LeadGroupFilterSidebarComponent implements OnInit, OnDestroy {
  @Input() selectedGroupId: string | null = null;
  @Input() sidebarCollapsed: boolean = false;
  @Output() groupSelect = new EventEmitter<string | null>();
  @Output() sidebarToggle = new EventEmitter<boolean>();

  groups: LeadGroup[] = [];
  isLoadingGroups: boolean = false;
  groupsError: ErrorState | null = null;
  private destroy$ = new Subject<void>();

  constructor(private groupFetchService: GroupFetchService) {}

  ngOnInit() {
    this.loadGroups();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load groups from the API
   */
  loadGroups() {
    this.isLoadingGroups = true;
    this.groupsError = null;

    this.groupFetchService.fetchGroups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (groups) => {
          this.groups = groups;
          this.isLoadingGroups = false;
        },
        error: (error) => {
          this.isLoadingGroups = false;
          this.groupsError = {
            type: 'network',
            message: 'No se puede conectar. Por favor, verifica tu conexión a internet.',
            retryable: true
          };
          console.error('Error loading groups:', error);
        }
      });
  }

  /**
   * Select a group to filter
   */
  selectGroup(groupId: string | null) {
    this.selectedGroupId = groupId;
    this.groupSelect.emit(groupId);
  }

  /**
   * Select "Ver Todos" option
   */
  selectViewAll() {
    this.selectGroup(null);
  }

  /**
   * Retry loading groups
   */
  retryLoadGroups() {
    this.loadGroups();
  }

  /**
   * Toggle sidebar on mobile
   */
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggle.emit(this.sidebarCollapsed);
  }

  /**
   * Check if a group is selected
   */
  isGroupSelected(groupId: string | null): boolean {
    return this.selectedGroupId === groupId;
  }

  /**
   * Get the total number of leads across all groups
   */
  getTotalLeads(): number {
    return this.groups.reduce((total, group) => total + (group.lead_count || 0), 0);
  }
}

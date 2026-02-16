import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupFetchService } from '../../services/group-fetch.service';
import { LeadGroup, ErrorState } from '../../models/lead-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface GroupOption {
  label: string;
  value: string | null;
  count?: number;
}

@Component({
  selector: 'app-group-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="group-dropdown-wrapper">
  <select 
    [(ngModel)]="selectedValue"
    (change)="onGroupChange()"
    [disabled]="isLoadingGroups || !!groupsError || isDisabled"
    class="group-select">
    <option value="">Filtrar por grupo</option>
    <option *ngFor="let option of groupOptions" [value]="option.value">
      {{ option.label }} ({{ option.count }})
    </option>
  </select>
</div>`,
  styles: [`
.group-dropdown-wrapper {
  min-width: 200px;
}

.group-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.group-select:hover {
  border-color: #9ca3af;
}

.group-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.group-select:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}
  `],
})
export class GroupDropdownComponent implements OnInit, OnDestroy {
  @Input() selectedGroupId: string | null = null;
  @Input() disabled: boolean = false;
  @Output() groupSelect = new EventEmitter<{ groupId: string | null; groupName: string | null }>();

  groups: LeadGroup[] = [];
  groupOptions: GroupOption[] = [];
  selectedValue: string | null = null;
  isLoadingGroups: boolean = false;
  groupsError: ErrorState | null = null;
  isDisabled: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private groupFetchService: GroupFetchService) {}

  ngOnInit() {
    this.loadGroups();
    this.selectedValue = this.selectedGroupId;
    this.isDisabled = this.disabled;
  }

  ngOnChanges() {
    this.selectedValue = this.selectedGroupId;
    this.isDisabled = this.disabled;
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
          this.buildGroupOptions();
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
   * Build dropdown options from groups
   */
  private buildGroupOptions() {
    this.groupOptions = [
      {
        label: 'Ver Todos',
        value: null,
        count: this.groups.reduce((total, g) => total + (g.lead_count || 0), 0)
      },
      ...this.groups.map(group => ({
        label: group.name,
        value: group.id,
        count: group.lead_count || 0
      }))
    ];
  }

  /**
   * Handle group selection change
   */
  onGroupChange() {
    const selectedGroupId = this.selectedValue;
    const selectedGroup = this.groups.find(g => g.id === selectedGroupId);
    const groupName = selectedGroup?.name || null;

    this.groupSelect.emit({
      groupId: selectedGroupId,
      groupName: groupName
    });
  }
}

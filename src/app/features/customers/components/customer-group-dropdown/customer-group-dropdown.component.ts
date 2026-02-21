import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerGroupFetchService } from '../../services/customer-group-fetch.service';
import { CustomerGroup, ErrorState } from '../../models/customer-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-group-dropdown',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig"
      [disable]="isLoadingGroups || !!groupsError || disabled"
      (changeOption)="onGroupChange($event)">
    </app-select>
  `,
  styles: []
})
export class CustomerGroupDropdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedGroupId: string | null = null;
  @Input() disabled: boolean = false;
  @Output() groupSelect = new EventEmitter<{ groupId: string | null; groupName: string | null }>();

  groups: CustomerGroup[] = [];
  groupControl = new FormControl<string | null>(null);
  selectConfig: any = {
    placeholder: 'Filtrar por grupo',
    data: [],
    value: 'id',
    option: 'name',
    all: true,
    all_message: 'Ver Todos',
    form_control: this.groupControl,
    loading: true
  };
  isLoadingGroups: boolean = false;
  groupsError: ErrorState | null = null;
  private destroy$ = new Subject<void>();

  constructor(private groupFetchService: CustomerGroupFetchService) {}

  ngOnInit() {
    this.loadGroups();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedGroupId'] && this.groupControl) {
      this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
    }
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
          this.selectConfig = {
            ...this.selectConfig,
            data: groups.map(group => ({
              id: group.id,
              name: group.name,
              customer_count: group.customer_count || 0
            })),
            loading: false
          };
          // Set the initial value after loading groups
          if (this.selectedGroupId) {
            this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
          }
          this.isLoadingGroups = false;
        },
        error: (error) => {
          this.isLoadingGroups = false;
          this.selectConfig = {
            ...this.selectConfig,
            loading: false
          };
          this.groupsError = error;
          console.error('Error loading groups:', error);
        }
      });
  }

  /**
   * Handle group selection change
   */
  onGroupChange(event: any) {
    const selectedGroupId = event.value;
    const selectedGroup = this.groups.find(g => g.id === selectedGroupId);
    const groupName = selectedGroup?.name || null;

    this.groupSelect.emit({
      groupId: selectedGroupId,
      groupName: groupName
    });
  }
}

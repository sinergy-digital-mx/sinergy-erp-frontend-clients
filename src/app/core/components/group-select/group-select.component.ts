import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { SelectComponent, ISelect } from '../select/select.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface GroupOption {
  id: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-group-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig()"
      [label]="'Group'"
      [has_error]="control?.invalid && control?.touched">
    </app-select>
  `,
  styles: []
})
export class GroupSelectComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Input() groupType: 'lead' | 'customer' = 'lead';
  @Output() groupSelected = new EventEmitter<GroupOption>();

  groups = signal<GroupOption[]>([]);
  loading = signal(false);
  private api = environment.api;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGroups();
  }

  selectConfig() {
    return {
      placeholder: 'Select a group',
      data: this.groups(),
      value: 'id',
      option: 'displayName',
      form_control: this.control,
      loading: this.loading()
    } as ISelect;
  }

  private loadGroups() {
    this.loading.set(true);
    const endpoint = this.groupType === 'lead' ? '/lead-groups' : '/customer-groups';
    
    this.http.get<any>(`${this.api}${endpoint}`).subscribe({
      next: (response) => {
        const groupsData = Array.isArray(response) ? response : (response.groups || response.data || []);
        this.groups.set(
          groupsData.map((item: any) => ({
            id: item.id,
            name: item.name,
            count: item.lead_count || item.customer_count || 0,
            displayName: `${item.name} (${item.lead_count || item.customer_count || 0})`
          }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.groups.set([]);
      }
    });
  }
}

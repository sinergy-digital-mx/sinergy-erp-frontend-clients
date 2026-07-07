import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SelectComponent } from '../../../../core/components/select/select.component';

export interface PropertyGroup {
  id: string;
  name: string;
  description?: string;
  location?: string;
}

@Component({
  selector: 'app-property-group-dropdown',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onGroupChange($event)">
    </app-select>
  `,
  styles: [],
})
export class PropertyGroupDropdownComponent implements OnInit, OnChanges {
  @Input() selectedGroupId: string | null = null;
  @Output() groupSelect = new EventEmitter<{ groupId: string | null; groupName: string | null }>();

  groups = signal<PropertyGroup[]>([]);
  loading = signal(false);
  private readonly groupControl = new FormControl<string | null>(null);
  private readonly api = environment.api;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGroupId']) {
      this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
    }
  }

  selectConfig() {
    return {
      placeholder: 'Proyecto',
      data: this.groups(),
      value: 'id',
      option: 'name',
      form_control: this.groupControl,
      loading: this.loading(),
      all: true,
      all_message: 'Todos los proyectos',
    };
  }

  private loadGroups(): void {
    this.loading.set(true);

    this.http.get<PropertyGroup[]>(`${this.api}/tenant/property-groups`).subscribe({
      next: (response) => {
        const groupsData = Array.isArray(response) ? response : [];
        this.groups.set(groupsData);
        this.loading.set(false);
        if (this.selectedGroupId) {
          this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
        }
      },
      error: () => {
        this.loading.set(false);
        this.groups.set([]);
      },
    });
  }

  onGroupChange(event: { value?: string | null }): void {
    const groupId = event?.value || null;
    const groupName = groupId ? this.groups().find((g) => g.id === groupId)?.name || null : null;
    this.groupSelect.emit({ groupId, groupName });
  }
}

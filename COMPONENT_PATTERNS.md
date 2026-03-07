# Component Patterns & Architecture

## 1. DATATABLE WRAPPER

### What it is
Custom wrapper around `@swimlane/ngx-datatable` for consistent table styling and behavior.

### Interface
```typescript
interface IDatatableConfig {
  rows: any[];
  columns: IColumnConfig[];
  externalPaging: boolean;
  externalSorting: boolean;
  page: number;
  limit: number;
  totalResults: number;
  loading: boolean;
  emptyState: { title: string; subtitle: string };
  columnMode: 'force' | 'flex';
  reorderable: boolean;
}

interface IColumnConfig {
  name: string;
  prop: string;
  sortable: boolean;
  canAutoResize: boolean;
  width: number;
}
```

### Usage
```typescript
// Component
table_config = signal<IDatatableConfig>({
  rows: [],
  columns: [
    { name: 'Número', prop: 'contract_number', sortable: true, width: 120 }
  ],
  externalPaging: false,
  externalSorting: false,
  page: 1,
  limit: 20,
  totalResults: 0,
  loading: false,
  emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron datos' },
  columnMode: 'force',
  reorderable: false
});
```

```html
<!-- Template -->
<app-datatable-wrapper
  [config]="table_config()"
  [rowTemplate]="tableTemplate"
  (pageChange)="onPageChange($event)"
  (sortChange)="onSortChange($event)"
  (rowClick)="onRowClick($event)">
</app-datatable-wrapper>

<ng-template #tableTemplate let-item="$implicit">
  <td>{{ item.contract_number }}</td>
  <td>{{ item.customer.name }}</td>
</ng-template>
```

### Events
```typescript
interface IPaginationEvent {
  page: number;
  limit: number;
}

interface ISortEvent {
  column: IColumnConfig;
  direction: 'asc' | 'desc';
}
```

---

## 2. SELECT COMPONENT

### Interface
```typescript
interface ISelectConfig {
  options: any[];
  label_key: string;
  value_key: string;
  placeholder?: string;
  form_control: FormControl;
  disabled?: boolean;
}
```

### Implementation
```typescript
// select.component.ts
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <select 
      [formControl]="config.form_control"
      [disabled]="config.disabled"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
      <option value="">{{ config.placeholder || 'Seleccionar' }}</option>
      <option *ngFor="let opt of config.options" [value]="opt[config.value_key]">
        {{ opt[config.label_key] }}
      </option>
    </select>
  `
})
export class SelectComponent {
  @Input() config!: ISelectConfig;
}
```

### Usage
```typescript
// Component
form = new FormGroup({
  status: new FormControl('activo')
});

statusSelectConfig: ISelectConfig = {
  options: [
    { id: 'activo', name: 'Activo' },
    { id: 'completado', name: 'Completado' }
  ],
  label_key: 'name',
  value_key: 'id',
  form_control: this.form.controls.status,
  placeholder: 'Seleccionar estado'
};
```

```html
<app-select [config]="statusSelectConfig"></app-select>
```

---

## 3. BADGES/TAGS

### Pattern
```html
<!-- Basic Badge -->
<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
  {{ text }}
</span>

<!-- Clickable Badge -->
<span 
  (click)="handleClick(); $event.stopPropagation()"
  class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors">
  {{ text }}
</span>

<!-- Status Badge (rounded-full) -->
<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
  {{ status }}
</span>
```

### Color Scheme
- **Properties/Lotes**: `bg-green-100 text-green-800`
- **Contracts**: `bg-purple-100 text-purple-800`
- **Customers**: `bg-blue-100 text-blue-800`
- **Active**: `bg-green-100 text-green-800`
- **Completed**: `bg-blue-100 text-blue-800`
- **Cancelled**: `bg-red-100 text-red-800`
- **Pending**: `bg-yellow-100 text-yellow-800`

---

## 4. BUTTON COMPONENT

### Interface
```typescript
interface ButtonConfig {
  text: string;
  custom_class: 'btn_primary' | 'btn_secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: any; // Lucide icon
}
```

### Usage
```html
<app-button
  text="Crear Contrato"
  custom_class="btn_primary"
  [loading]="saving()"
  (clicked)="handleClick()">
</app-button>
```

---

## 5. MODALS (MatDialog)

### Structure
```typescript
// Component
@Component({
  selector: 'app-modal',
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h2>Title</h2>
        <lucide-icon [img]="X" (click)="close()"></lucide-icon>
      </div>
      <div class="dialog__body">
        <!-- Content -->
      </div>
      <div class="dialog__footer">
        <app-button text="Cancelar" (clicked)="close()"></app-button>
        <app-button text="Guardar" (clicked)="save()"></app-button>
      </div>
    </div>
  `
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
```

### SCSS
```scss
.dialog {
  width: 90vw;
  max-width: 1400px;
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.dialog__header {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog__body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1rem;
}

.dialog__footer {
  padding: 0.625rem 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.625rem;
}
```

### Opening Modal
```typescript
const dialogRef = this.dialog.open(ModalComponent, {
  width: '900px',
  data: { item: selectedItem }
});

dialogRef.afterClosed().subscribe(result => {
  if (result) {
    // Handle result
  }
});
```

---

## 6. ACTION BUTTONS (Table)

### Pattern
```html
<button
  (click)="handleAction(item); $event.stopPropagation()"
  class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
  [matTooltip]="'Action Name'"
  matTooltipPosition="above">
  <lucide-icon [img]="IconName" [size]="16"></lucide-icon>
</button>
```

### Colors
- **Edit**: `text-gray-600 hover:bg-gray-600`
- **Delete**: `text-red-600 hover:bg-red-600`
- **Register**: `text-blue-600 hover:bg-blue-600`
- **Cancel**: `text-orange-600 hover:bg-orange-600`

---

## 7. STATS CARDS

### Pattern
```html
<div class="grid grid-cols-4 gap-4 mb-6">
  <div 
    (click)="applyFilter('total')"
    [class.ring-2]="activeFilter() === 'total'"
    [class.ring-gray-500]="activeFilter() === 'total'"
    class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-all">
    <div class="mb-2">
      <p class="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-0.5">Total</p>
      <p class="text-[10px] text-gray-500">Descripción</p>
    </div>
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold text-gray-900">{{ stats.total.value | currency }}</p>
      <span class="text-2xl font-bold text-gray-900">{{ stats.total.count }}</span>
    </div>
  </div>
</div>
```

---

## 8. SEARCH COMPONENT

### Usage
```html
<app-search
  class="w-64"
  [param_activate]="true"
  param_name="search"
  (searchChange)="onSearchChange($event)">
</app-search>
```

```typescript
onSearchChange(searchTerm: string) {
  this.search = searchTerm;
  this.router.navigate([], {
    queryParams: { search: searchTerm || undefined },
    queryParamsHandling: 'merge'
  });
}
```

---

## 9. FORM PATTERNS

### Reactive Forms
```typescript
form = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  status: new FormControl('activo')
});
```

### Input Component
```html
<app-input
  label="Nombre"
  type="text"
  [form_control]="form.controls.name">
</app-input>
```

---

## 10. ICONS (Lucide Angular)

### Import
```typescript
import { LucideAngularModule, Edit, Trash2, Plus, X } from 'lucide-angular';
```

### Usage
```html
<lucide-icon [img]="Edit" [size]="16"></lucide-icon>
```

### Common Icons
- Edit, Trash2, Plus, X, DollarSign, RefreshCw, ArrowRight, Users, FileCheck

---

## 11. TOOLTIPS (Material)

### Setup
```typescript
import { MatTooltipModule } from '@angular/material/tooltip';
```

### Usage
```html
<button 
  [matTooltip]="'Tooltip text'"
  matTooltipPosition="above">
  Action
</button>
```

### Global Styles
```scss
.mat-mdc-tooltip {
  background-color: #1f2937 !important;
  font-size: 12px !important;
  padding: 6px 10px !important;
  border-radius: 6px !important;
}
```

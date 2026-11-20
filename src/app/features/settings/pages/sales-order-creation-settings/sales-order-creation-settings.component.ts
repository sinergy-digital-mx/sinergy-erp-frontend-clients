import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import {
  SalesOrderCreationFieldConfig,
  SalesOrderCreationFieldKey,
  SalesOrderCreationFields,
  defaultSalesOrderCreationSettings,
} from '../../../sales-orders/models/sales-order-creation-settings.model';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LogisticsRoutesPanelComponent } from '../../../logistics/components/logistics-routes-panel/logistics-routes-panel.component';
import { SALES_ORDER_PERMISSIONS } from '../../../sales-orders/config/permissions.config';

interface FieldRow {
  key: SalesOrderCreationFieldKey;
  label: string;
  hint: string;
  kind: 'locked' | 'branch' | 'date' | 'scope' | 'currency' | 'boolean' | 'text' | 'route';
}

@Component({
  selector: 'app-sales-order-creation-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LogisticsRoutesPanelComponent],
  templateUrl: './sales-order-creation-settings.component.html',
  styleUrl: './sales-order-creation-settings.component.scss',
})
export class SalesOrderCreationSettingsComponent implements OnInit {
  readonly rows: FieldRow[] = [
    {
      key: 'fiscal_configuration_id',
      label: 'Razón social',
      hint: 'Siempre visible. Al abrir el alta se preselecciona la de la sucursal principal del usuario.',
      kind: 'locked',
    },
    {
      key: 'customer',
      label: 'Cliente',
      hint: 'Siempre visible y obligatorio.',
      kind: 'locked',
    },
    {
      key: 'billing_branch_id',
      label: 'Sucursal',
      hint: 'Si se oculta, o si la razón social solo tiene una sucursal, el alta la asigna sola.',
      kind: 'branch',
    },
    {
      key: 'expected_delivery_date',
      label: 'Fecha de entrega',
      hint: 'Hoy usa el día en que se abre el alta. Fecha fija deja ese día.',
      kind: 'date',
    },
    {
      key: 'sale_scope',
      label: 'Tipo de orden',
      hint: 'Inventario, servicios o ambos.',
      kind: 'scope',
    },
    {
      key: 'currency',
      label: 'Moneda',
      hint: 'Moneda con la que nace la orden.',
      kind: 'currency',
    },
    {
      key: 'requires_selection_assembly',
      label: 'Mesa de control',
      hint: 'Picking y armado. Si se oculta, el alta usa el valor por defecto sin mostrar la opción.',
      kind: 'boolean',
    },
    {
      key: 'for_shipping',
      label: 'Requiere envío',
      hint: 'Si está apagado, la fecha tentativa y la ruta no se piden.',
      kind: 'boolean',
    },
    {
      key: 'estimated_delivery_date',
      label: 'Fecha tentativa de entrega',
      hint: 'Solo se muestra cuando la orden requiere envío. Puede nacer en hoy o en una fecha fija.',
      kind: 'date',
    },
    {
      key: 'route_id',
      label: 'Ruta',
      hint: 'Se preselecciona la ruta habitual del cliente. Solo si las rutas están activas.',
      kind: 'route',
    },
    {
      key: 'notes',
      label: 'Notas',
      hint: 'Nota general de la orden, distinta de la nota de cada producto.',
      kind: 'text',
    },
  ];

  fields: SalesOrderCreationFields = defaultSalesOrderCreationSettings().fields;
  routesEnabled = false;
  loading = true;
  saving = false;
  canEdit = false;

  constructor(
    private salesOrders: SalesOrderService,
    private toast: ToastService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.canEdit = this.auth.hasPermission(SALES_ORDER_PERMISSIONS.update);
    this.salesOrders.getCreationSettings().subscribe({
      next: (settings) => {
        this.fields = settings.fields;
        this.routesEnabled = settings.routes_enabled;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.toast.error('No se pudo cargar la configuración de órdenes de venta');
        this.cdr.detectChanges();
      },
    });
  }

  field(key: SalesOrderCreationFieldKey): SalesOrderCreationFieldConfig {
    return this.fields[key];
  }

  private isFixedDate(value: string | boolean | null): value is string {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value);
  }

  private todayInput(): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Tijuana',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }

  dateMode(key: SalesOrderCreationFieldKey): 'today' | 'fixed' {
    return this.isFixedDate(this.field(key).default_value) ? 'fixed' : 'today';
  }

  fixedDate(key: SalesOrderCreationFieldKey): string {
    const value = this.field(key).default_value;
    return this.isFixedDate(value) ? value.slice(0, 10) : this.todayInput();
  }

  onDateMode(key: SalesOrderCreationFieldKey, mode: 'today' | 'fixed'): void {
    const row = this.fields[key];
    if (row.locked) return;
    row.default_value = mode === 'fixed' ? this.fixedDate(key) : 'today';
  }

  onFixedDate(key: SalesOrderCreationFieldKey, value: string): void {
    const row = this.fields[key];
    if (row.locked) return;
    row.default_value = this.isFixedDate(value) ? value.slice(0, 10) : 'today';
  }

  onVisibleChange(key: SalesOrderCreationFieldKey, visible: boolean): void {
    const row = this.fields[key];
    if (row.locked) return;
    row.visible = visible;
    if (key === 'billing_branch_id' && visible) {
      row.required = true;
    }
    if (!visible) {
      row.required = false;
    }
  }

  save(): void {
    if (!this.canEdit || this.saving) return;
    this.saving = true;
    this.salesOrders.updateCreationSettings(this.fields, this.routesEnabled).subscribe({
      next: (settings) => {
        this.fields = settings.fields;
        this.routesEnabled = settings.routes_enabled;
        this.saving = false;
        this.toast.success('Configuración de órdenes de venta guardada');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.saving = false;
        this.toast.error(error?.message || 'No se pudo guardar la configuración');
        this.cdr.detectChanges();
      },
    });
  }
}

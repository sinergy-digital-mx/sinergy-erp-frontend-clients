import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { LogisticsRouteOption } from '../../../sales-orders/models/sales-order-creation-settings.model';
import { LogisticsRouteService } from '../../../logistics/services/logistics-route.service';
import { ToastService } from '../../../../core/services/toast.service';
import { environment } from '../../../../../environments/environment';

export interface AssignClientRouteData {
  customerId?: string | number | null;
  customerName?: string;
  routes: LogisticsRouteOption[];
  selectedRouteId?: string | null;
  saveAsDefault?: boolean;
}

export interface AssignClientRouteResult {
  route_id: string;
  route_name: string;
  route_code: string;
  saved_as_default: boolean;
}

@Component({
  selector: 'app-assign-client-route-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-client-route-modal.component.html',
  styleUrl: './assign-client-route-modal.component.scss',
})
export class AssignClientRouteModalComponent {
  routes: LogisticsRouteOption[] = [];
  selectedId = '';
  saveAsDefault = true;
  creating = false;
  saving = false;
  draft = { name: '', code: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignClientRouteData,
    private dialogRef: MatDialogRef<AssignClientRouteModalComponent, AssignClientRouteResult | null>,
    private routesApi: LogisticsRouteService,
    private http: HttpClient,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {
    this.routes = data?.routes || [];
    this.selectedId = data?.selectedRouteId || '';
    this.saveAsDefault = data?.saveAsDefault !== false;
  }

  get selected(): LogisticsRouteOption | undefined {
    return this.routes.find((route) => route.id === this.selectedId);
  }

  createRoute(): void {
    const name = this.draft.name.trim();
    const code = this.draft.code.trim();
    if (!name || !code || this.creating) return;
    this.creating = true;
    this.routesApi.create({ name, code }).subscribe({
      next: (route) => {
        this.routes = [...this.routes, { id: route.id, name: route.name, code: route.code }];
        this.selectedId = route.id;
        this.draft = { name: '', code: '' };
        this.creating = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.creating = false;
        this.toast.error(error?.error?.message || 'No se pudo crear la ruta');
        this.cdr.detectChanges();
      },
    });
  }

  confirm(): void {
    const route = this.selected;
    if (!route || this.saving) return;
    const finish = (saved: boolean) => {
      this.saving = false;
      this.dialogRef.close({
        route_id: route.id,
        route_name: route.name,
        route_code: route.code,
        saved_as_default: saved,
      });
    };
    if (this.saveAsDefault && this.data.customerId != null && this.data.customerId !== '') {
      this.saving = true;
      this.http
        .put(`${environment.api}/tenant/customers/${this.data.customerId}/default-route`, {
          route_id: route.id,
        })
        .subscribe({
          next: () => finish(true),
          error: (error) => {
            this.saving = false;
            this.toast.error(error?.error?.message || 'No se pudo guardar la ruta del cliente');
            this.cdr.detectChanges();
          },
        });
      return;
    }
    finish(false);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}

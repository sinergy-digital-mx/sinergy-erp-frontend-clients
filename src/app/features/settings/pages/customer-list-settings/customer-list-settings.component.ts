import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CUSTOMER_PERMISSIONS } from '../../../customers/config/permissions.config';
import {
  CustomerListPrefilter,
  normalizeCustomerListPrefilter,
} from '../../../customers/utils/customer-list-prefilter.util';

@Component({
  selector: 'app-customer-list-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './customer-list-settings.component.html',
  styleUrl: './customer-list-settings.component.scss',
})
export class CustomerListSettingsComponent implements OnInit {
  loading = true;
  saving = false;
  canEdit = false;
  prefilter: CustomerListPrefilter = 'sellers';

  readonly options: { value: CustomerListPrefilter; label: string; hint: string }[] = [
    {
      value: 'sellers',
      label: 'Solo vendedores',
      hint: 'Entra con su razón y sucursal. Admin, y quien tenga el permiso Ver todos en Clientes, abre el listado completo.',
    },
    {
      value: 'everyone',
      label: 'Todos los usuarios',
      hint: 'Cualquiera abre Clientes con su razón y sucursal, incluido quien puede ver todos.',
    },
    {
      value: 'off',
      label: 'Nadie',
      hint: 'El listado abre sin razón ni sucursal, como antes.',
    },
  ];

  constructor(
    private customers: CustomerService,
    private toast: ToastService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.canEdit = this.auth.hasPermission(CUSTOMER_PERMISSIONS.update);
    this.customers.getCustomerListSettings().subscribe({
      next: (settings) => {
        this.prefilter = normalizeCustomerListPrefilter(settings?.prefilter);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.error('No se pudo cargar la configuración de clientes');
      },
    });
  }

  save(): void {
    if (!this.canEdit || this.saving) return;
    this.saving = true;
    this.customers.updateCustomerListSettings(this.prefilter).subscribe({
      next: (settings) => {
        this.prefilter = normalizeCustomerListPrefilter(settings?.prefilter);
        this.saving = false;
        this.toast.success('Configuración guardada');
      },
      error: () => {
        this.saving = false;
        this.toast.error('No se pudo guardar la configuración');
      },
    });
  }
}

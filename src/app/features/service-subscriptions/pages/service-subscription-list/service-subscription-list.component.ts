import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceSubscriptionService } from '../../services/service-subscription.service';
import { ServiceSubscriptionListItem } from '../../models/service-subscription.model';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ToastService } from '../../../../core/services/toast.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SERVICE_SUBSCRIPTION_PERMISSIONS } from '../../config/permissions.config';

@Component({
  selector: 'app-service-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './service-subscription-list.component.html',
})
export class ServiceSubscriptionListComponent {
  private readonly api = inject(ServiceSubscriptionService);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly items = signal<ServiceSubscriptionListItem[]>([]);
  readonly search = signal('');
  readonly canCreate = this.auth.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.create);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.api.list(this.search()).subscribe({
      next: (page) => {
        this.items.set(page.data || []);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las suscripciones'));
      },
    });
  }

  money(value: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value || 0);
  }

  statusLabel(status: string): string {
    if (status === 'active') return 'Activa';
    if (status === 'completed') return 'Terminada';
    if (status === 'cancelled') return 'Cancelada';
    return status;
  }
}

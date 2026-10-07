import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServiceSubscriptionService } from '../../../service-subscriptions/services/service-subscription.service';
import { ServiceSubscriptionListItem } from '../../../service-subscriptions/models/service-subscription.model';
import {
  coveragePercent,
  moneyMx,
  subscriptionStatusLabel,
} from '../../../service-subscriptions/utils/service-subscription-display.util';
import { SERVICE_SUBSCRIPTION_PERMISSIONS } from '../../../service-subscriptions/config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-customer-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './customer-subscriptions.component.html',
  styles: [`:host { display: block; }`],
})
export class CustomerSubscriptionsComponent implements OnInit {
  private readonly api = inject(ServiceSubscriptionService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  @Input({ required: true }) customerId!: number | string;

  readonly loading = signal(true);
  readonly items = signal<ServiceSubscriptionListItem[]>([]);
  readonly money = moneyMx;
  readonly statusLabel = subscriptionStatusLabel;
  readonly coverage = coveragePercent;
  readonly canCreate = this.auth.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.create);

  ngOnInit(): void {
    const customerId = Number(this.customerId);
    if (!Number.isFinite(customerId) || customerId < 1) {
      this.loading.set(false);
      return;
    }
    this.api.list('', 1, '', customerId).subscribe({
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

  open(id: string): void {
    this.router.navigate(['/service-subscriptions', id]);
  }
}

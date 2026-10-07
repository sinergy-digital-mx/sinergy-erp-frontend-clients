import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceSubscriptionService } from '../../../service-subscriptions/services/service-subscription.service';

@Component({
  selector: 'app-sales-order-subscription-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (link(); as item) {
      <a class="order-subscription-link" [routerLink]="['/service-subscriptions', item.id]">
        Suscripción · {{ item.title }} · {{ item.period_label }}
      </a>
    }
  `,
  styles: `
    :host { display: block; }
    .order-subscription-link {
      display: inline-flex;
      margin-top: 0.25rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #4f46e5;
      text-decoration: none;
    }
  `,
})
export class SalesOrderSubscriptionLinkComponent implements OnInit {
  @Input({ required: true }) orderId!: string;

  private readonly api = inject(ServiceSubscriptionService);
  readonly link = signal<{ id: string; title: string; period_label: string } | null>(null);

  ngOnInit(): void {
    this.api.bySalesOrder(this.orderId).subscribe({
      next: (response) => this.link.set(response.subscription),
      error: () => this.link.set(null),
    });
  }
}

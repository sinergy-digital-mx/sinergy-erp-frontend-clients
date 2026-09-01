import { Component, Input, OnChanges, SimpleChanges, Type, signal } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { SalesOrderShippingInfo } from '../../models/sales-order.model';
import { SHIPPING_PERMISSIONS } from '../../../logistics/config/permissions.config';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-sales-order-shipping-tab',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, HasPermissionDirective, SpinnerComponent],
  template: `
    <div class="so-shipping-tab" *hasPermission="permissions.viewDetail">
      @if (!shippingInfo()?.has_shipping || !shippingInfo()?.shipping_id) {
        <div class="so-shipping-tab__empty">
          Esta orden no está asignada a un envío.
        </div>
      } @else if (shippingViewCmp()) {
        <ng-container
          *ngComponentOutlet="
            shippingViewCmp()!;
            inputs: {
              shippingId: shippingInfo()!.shipping_id!,
              active: active,
              embedded: true,
              currentSalesOrderId: salesOrderId,
              allowOpenOrderDetail: false
            }
          "
        ></ng-container>
      } @else {
        <div class="so-shipping-tab__empty">
          <app-spinner></app-spinner>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .so-shipping-tab__empty {
        padding: 2rem 1rem;
        text-align: center;
        color: #6b7280;
        font-size: 0.9375rem;
      }
    `,
  ],
})
export class SalesOrderShippingTabComponent implements OnChanges {
  @Input() salesOrderId!: string;
  @Input() shipping: SalesOrderShippingInfo | null | undefined;
  @Input() active = false;

  readonly permissions = SHIPPING_PERMISSIONS;
  shippingInfo = signal<SalesOrderShippingInfo | null>(null);
  shippingViewCmp = signal<Type<unknown> | null>(null);

  constructor() {
    void this.loadShippingView();
  }

  private async loadShippingView(): Promise<void> {
    const mod = await import(
      '../../../logistics/components/shipping-view/shipping-view.component'
    );
    this.shippingViewCmp.set(mod.ShippingViewComponent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shipping']) {
      this.shippingInfo.set(this.shipping ?? null);
    }
  }
}

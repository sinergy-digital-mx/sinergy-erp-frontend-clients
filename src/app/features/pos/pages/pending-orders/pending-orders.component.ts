import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { POSService } from '../../services/pos.service';
import { formatPosMoney } from '../../models/pos-daily-shift.model';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';
import { ToastService } from '../../../../core/services/toast.service';

interface PendingSale {
  id: string;
  folio?: string;
  total?: number | string;
  created_at?: string;
  payment_status?: string;
  seller_user?: { first_name?: string; last_name?: string; pos_user_code?: number | null };
}

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  orders = signal<PendingSale[]>([]);
  loading = signal<boolean>(false);

  constructor(
    private posService: POSService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.posService.getPendingSales().subscribe({
      next: ({ pending_sales }) => {
        this.orders.set((pending_sales ?? []) as PendingSale[]);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      }
    });
  }

  viewOrder(orderId: string): void {
    this.router.navigate(['/pos/cobranza'], { queryParams: { orderId } });
  }

  goBack(): void {
    this.router.navigate(['/pos/cobranza']);
  }

  formatCurrency(amount: number | string | undefined): string {
    return formatPosMoney(amount);
  }

  formatDate(date?: string): string {
    if (!date) {
      return '—';
    }
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  sellerLabel(sale: PendingSale): string {
    const s = sale.seller_user;
    if (!s) {
      return '—';
    }
    const name = `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim();
    return name || (s.pos_user_code ? `Código ${s.pos_user_code}` : '—');
  }
}

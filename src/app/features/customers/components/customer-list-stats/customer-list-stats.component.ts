import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClipboardCheck,
  FileCheck,
  LucideAngularModule,
  Mail,
  ShoppingBag,
  Users,
} from 'lucide-angular';
import { CustomerListStats } from '../../../../core/services/customer.service';
import { CustomerListInsight } from '../../utils/customer-list-insight';

type StatTone = 'slate' | 'indigo' | 'emerald' | 'sky' | 'amber';

interface StatCardView {
  key: string;
  label: string;
  hint: string;
  tone: StatTone;
  icon: typeof Users;
  value: number;
  share: number;
  positive: CustomerListInsight | null;
  negative: CustomerListInsight | null;
  negativeLabel: string;
  negativeValue: number;
}

@Component({
  selector: 'app-customer-list-stats',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './customer-list-stats.component.html',
  styleUrl: './customer-list-stats.component.scss',
})
export class CustomerListStatsComponent {
  @Input() stats: CustomerListStats | null = null;
  @Input() loading = false;
  @Input() error = false;
  @Input() activeInsight: CustomerListInsight | null = null;
  @Input() scoped = false;
  @Output() insightChange = new EventEmitter<CustomerListInsight | null>();

  readonly skeletons = [1, 2, 3, 4, 5];
  readonly Users = Users;
  readonly ShoppingBag = ShoppingBag;
  readonly FileCheck = FileCheck;
  readonly ClipboardCheck = ClipboardCheck;
  readonly Mail = Mail;

  get cards(): StatCardView[] {
    const stats = this.stats;
    const total = stats?.total ?? 0;
    const share = (part: number) => (total > 0 ? Math.round((part / total) * 100) : 0);
    return [
      {
        key: 'total',
        label: 'Clientes',
        hint: 'Quitar el filtro del resumen',
        tone: 'slate',
        icon: Users,
        value: total,
        share: total > 0 ? 100 : 0,
        positive: null,
        negative: null,
        negativeLabel: '',
        negativeValue: 0,
      },
      {
        key: 'orders',
        label: 'Con órdenes',
        hint: 'Órdenes de venta y POS que no están canceladas',
        tone: 'indigo',
        icon: ShoppingBag,
        value: stats?.with_orders ?? 0,
        share: share(stats?.with_orders ?? 0),
        positive: 'with_orders',
        negative: 'without_orders',
        negativeLabel: 'Sin órdenes',
        negativeValue: stats?.without_orders ?? 0,
      },
      {
        key: 'fiscal',
        label: 'Listos para facturar',
        hint: 'RFC real, razón social y código postal de 5 dígitos',
        tone: 'emerald',
        icon: FileCheck,
        value: stats?.fiscal_ready ?? 0,
        share: share(stats?.fiscal_ready ?? 0),
        positive: 'fiscal_ready',
        negative: 'fiscal_not_ready',
        negativeLabel: 'Sin datos fiscales',
        negativeValue: stats?.fiscal_not_ready ?? 0,
      },
      {
        key: 'active',
        label: 'Activos',
        hint: 'Estatus activo',
        tone: 'sky',
        icon: ClipboardCheck,
        value: stats?.active ?? 0,
        share: share(stats?.active ?? 0),
        positive: 'active',
        negative: 'inactive',
        negativeLabel: 'Inactivos',
        negativeValue: stats?.inactive ?? 0,
      },
      {
        key: 'email',
        label: 'Con correo',
        hint: 'Tienen correo para contacto o factura',
        tone: 'amber',
        icon: Mail,
        value: stats?.with_email ?? 0,
        share: share(stats?.with_email ?? 0),
        positive: 'with_email',
        negative: 'without_email',
        negativeLabel: 'Sin correo',
        negativeValue: stats?.without_email ?? 0,
      },
    ];
  }

  formatCount(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value || 0);
  }

  isOn(insight: CustomerListInsight | null): boolean {
    return !!insight && this.activeInsight === insight;
  }

  cardIsOn(card: StatCardView): boolean {
    return this.isOn(card.positive) || this.isOn(card.negative);
  }

  select(insight: CustomerListInsight | null): void {
    if (insight && this.activeInsight === insight) {
      this.insightChange.emit(null);
      return;
    }
    this.insightChange.emit(insight);
  }
}

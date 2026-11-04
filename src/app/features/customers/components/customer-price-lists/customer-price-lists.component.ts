import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CustomerService } from '../../../../core/services/customer.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ProductService } from '../../../settings/services/product.service';
import { PriceList } from '../../../settings/models/product.model';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-customer-price-lists',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ButtonComponent],
  templateUrl: './customer-price-lists.component.html',
  styleUrl: './customer-price-lists.component.scss',
})
export class CustomerPriceListsComponent implements OnChanges {
  @Input() customerId: string | number | null = null;
  @Input() canEdit = false;

  loading = signal(true);
  saving = signal(false);
  catalog = signal<PriceList[]>([]);
  assignedIds = signal<string[]>([]);
  defaultId = signal('');

  private readonly customerService = inject(CustomerService);
  private readonly productService = inject(ProductService);
  private readonly interceptor = inject(InterceptorService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] && this.customerId) {
      this.load();
    }
  }

  isAssigned(id: string): boolean {
    return this.assignedIds().includes(id);
  }

  toggle(list: PriceList, checked: boolean): void {
    if (!this.canEdit || this.saving()) return;
    if (checked && list.is_active === false) return;
    const current = this.assignedIds().filter((id) => id !== list.id);
    if (checked) {
      current.push(list.id);
      this.assignedIds.set(current);
      if (!this.defaultId() || !current.includes(this.defaultId())) {
        this.defaultId.set(list.id);
      }
      return;
    }
    this.assignedIds.set(current);
    if (this.defaultId() === list.id) {
      this.defaultId.set(current[0] ?? '');
    }
  }

  setDefault(id: string): void {
    if (!this.canEdit || this.saving() || !this.isAssigned(id)) return;
    this.defaultId.set(id);
  }

  save(): void {
    const id = this.customerId;
    if (!id || !this.canEdit || this.saving()) return;
    const assigned = this.assignedIds();
    const defaultId = assigned.includes(this.defaultId()) ? this.defaultId() : assigned[0] ?? '';
    this.saving.set(true);
    this.customerService
      .updateCustomerPriceLists(
        String(id),
        assigned.map((priceListId) => ({
          price_list_id: priceListId,
          is_default: priceListId === defaultId,
        })),
      )
      .subscribe({
        next: (rows) => {
          this.saving.set(false);
          this.applyAssignments(rows);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Listas de precio actualizadas',
          });
        },
        error: (error) => {
          this.saving.set(false);
          const raw = error?.error?.message;
          const message = Array.isArray(raw)
            ? raw.join('. ')
            : raw || 'No se pudieron guardar las listas de precio';
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message,
          });
        },
      });
  }

  private load(): void {
    const id = this.customerId;
    if (!id) {
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    forkJoin({
      catalog: this.productService.getPriceLists(),
      assigned: this.customerService.getCustomerPriceLists(String(id)),
    }).subscribe({
      next: ({ catalog, assigned }) => {
        const active = (catalog || []).filter((list) => list.is_active !== false);
        const activeIds = new Set(active.map((list) => list.id));
        const missing = assigned
          .filter((row) => row.price_list_id && !activeIds.has(row.price_list_id))
          .map((row) => ({
            id: row.price_list_id,
            name: row.name || 'Lista inactiva',
            is_default: false,
            is_active: false,
          }));
        this.catalog.set([...active, ...missing]);
        this.applyAssignments(assigned);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las listas de precio',
        });
      },
    });
  }

  private applyAssignments(rows: Array<{ price_list_id: string; is_default: boolean }>): void {
    const ids = rows.map((row) => row.price_list_id).filter(Boolean);
    this.assignedIds.set(ids);
    this.defaultId.set(rows.find((row) => row.is_default)?.price_list_id || ids[0] || '');
  }
}

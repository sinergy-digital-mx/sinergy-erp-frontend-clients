import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Check, Search, Store } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

export interface PosCustomerPickerDialogData {
  selectedCustomerId: string;
}

export interface PosCustomerPickerDialogResult {
  customerId: string;
  customer?: any;
}

@Component({
  selector: 'app-pos-customer-picker-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './pos-customer-picker-dialog.component.html',
  styleUrls: ['./pos-customer-picker-dialog.component.scss'],
})
export class PosCustomerPickerDialogComponent implements OnInit, AfterViewInit {
  private readonly dialogRef = inject(MatDialogRef<PosCustomerPickerDialogComponent, PosCustomerPickerDialogResult>);
  readonly data = inject<PosCustomerPickerDialogData>(MAT_DIALOG_DATA);
  private readonly customerService = inject(CustomerService);

  readonly Search = Search;
  readonly Store = Store;
  readonly Check = Check;
  readonly String = String;

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('customerList') customerList?: ElementRef<HTMLElement>;

  customers = signal<any[]>([]);
  customerSearch = signal('');
  loadingCustomers = signal(false);
  selectedCustomerId = signal('');
  highlightIndex = signal(0);

  readonly filteredCustomers = computed(() => {
    const term = this.customerSearch().trim().toLowerCase();
    const list = this.customers();
    if (!term) {
      return list;
    }
    return list.filter((c) => this.customerDisplayName(c).toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.selectedCustomerId.set(this.data.selectedCustomerId ?? '');
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.focusSearch();
  }

  @HostListener('keydown', ['$event'])
  onDialogKeydown(event: KeyboardEvent): void {
    const list = this.filteredCustomers();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!list.length) return;
      this.highlightIndex.update((index) => Math.min(index + 1, list.length - 1));
      this.scrollHighlighted();
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!list.length) return;
      this.highlightIndex.update((index) => Math.max(index - 1, 0));
      this.scrollHighlighted();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const customer = list[this.highlightIndex()];
      if (customer) this.selectCustomer(String(customer.id));
    }
  }

  private loadCustomers(search = ''): void {
    this.loadingCustomers.set(true);
    const params: Record<string, string | number> = { limit: 100 };
    if (search.trim()) {
      params['search'] = search.trim();
    }
    this.customerService.getCustomers(params).subscribe({
      next: (customers) => {
        const list = Array.isArray(customers) ? customers : (customers as any)?.data || [];
        this.customers.set(list);
        this.highlightIndex.set(0);
        this.loadingCustomers.set(false);
        this.focusSearch();
      },
      error: () => {
        this.customers.set([]);
        this.loadingCustomers.set(false);
      },
    });
  }

  onSearchChange(term: string): void {
    this.highlightIndex.set(0);
    this.customerSearch.set(term);
    if (term.trim().length >= 2) {
      this.loadCustomers(term);
    } else if (!term.trim()) {
      this.loadCustomers();
    }
  }

  selectCustomer(customerId: string): void {
    const customer = this.customers().find((c) => String(c.id) === String(customerId));
    this.dialogRef.close({ customerId, customer });
  }

  clearCustomer(): void {
    this.dialogRef.close({ customerId: '' });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  customerDisplayName(customer: any): string {
    if (!customer) {
      return '';
    }
    const parts = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
    if (customer.company_name) {
      return parts ? `${parts} · ${customer.company_name}` : customer.company_name;
    }
    return parts || customer.email || 'Cliente';
  }

  private focusSearch(): void {
    queueMicrotask(() => this.searchInput?.nativeElement.focus());
  }

  private scrollHighlighted(): void {
    queueMicrotask(() => {
      const row = this.customerList?.nativeElement.querySelector('.customer-row--active');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  customerInitials(customer: any): string {
    const name = this.customerDisplayName(customer);
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}

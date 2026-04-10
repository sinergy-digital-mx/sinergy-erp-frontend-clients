import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SalesOrderFilters, SalesOrderStatus } from '../../models/sales-order.model';
import { Warehouse } from '../../../settings/models/warehouse.model';

@Component({
  selector: 'app-sales-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-filter-bar.component.html',
  styleUrl: './sales-filter-bar.component.scss'
})
export class SalesFilterBarComponent implements OnInit, OnDestroy {
  @Input() warehouses: Warehouse[] = [];
  @Output() filtersChange = new EventEmitter<SalesOrderFilters>();

  searchControl = new FormControl<string>('', { nonNullable: true });
  dateRangeControl = new FormControl<string>('', { nonNullable: true });
  dateFromControl = new FormControl<string>('', { nonNullable: true });
  dateToControl = new FormControl<string>('', { nonNullable: true });
  statusControl = new FormControl<SalesOrderStatus | null>(null);
  warehouseControl = new FormControl<string | null>(null);

  dateRangeOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Rango', value: 'range' }
  ];

  showCustomDateRange = false;

  statusOptions: { label: string; value: SalesOrderStatus }[] = [
    { label: 'Creada', value: 'Creada' },
    { label: 'Surtida', value: 'Surtida' },
    { label: 'Cancelada', value: 'Cancelada' }
  ];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateRangeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => this.onDateRangeChange(v));
    this.dateFromControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateToControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.warehouseControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
  }

  onDateRangeChange(value: string): void {
    const today = new Date();
    let dateFrom: Date | null = null;
    let dateTo: Date | null = null;

    switch (value) {
      case 'today':
        dateFrom = new Date(today.setHours(0, 0, 0, 0));
        dateTo = new Date(today.setHours(23, 59, 59, 999));
        this.showCustomDateRange = false;
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        dateFrom = weekStart;
        dateTo = new Date();
        this.showCustomDateRange = false;
        break;
      case 'month':
        dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
        dateTo = new Date();
        this.showCustomDateRange = false;
        break;
      case 'range':
        this.showCustomDateRange = true;
        return;
      default:
        this.showCustomDateRange = false;
        break;
    }

    if (dateFrom && dateTo) {
      this.dateFromControl.setValue(this.fmt(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.fmt(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }

  fmt(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emitFilters(): void {
    const filters: SalesOrderFilters = {};
    const search = this.searchControl.value.trim();
    if (search) filters.search = search;
    const dateFrom = this.dateFromControl.value;
    if (dateFrom) filters.dateFrom = new Date(dateFrom).toISOString();
    const dateTo = this.dateToControl.value;
    if (dateTo) filters.dateTo = new Date(dateTo).toISOString();
    const status = this.statusControl.value;
    if (status) filters.status = status;
    const warehouseId = this.warehouseControl.value;
    if (warehouseId) filters.warehouse_id = warehouseId;
    this.filtersChange.emit(filters);
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { OrderFilters } from '../../models/filters.model';
import { OrderStatus } from '../../models/purchase-order.model';
import { Warehouse } from '../../models/warehouse.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @Input() warehouses: Warehouse[] = [];
  @Output() filtersChange = new EventEmitter<OrderFilters>();

  // Form controls
  searchControl = new FormControl<string>('', { nonNullable: true });
  dateRangeControl = new FormControl<string>('', { nonNullable: true });
  dateFromControl = new FormControl<string>('', { nonNullable: true });
  dateToControl = new FormControl<string>('', { nonNullable: true });
  statusControl = new FormControl<OrderStatus | null>(null);
  warehouseControl = new FormControl<string | null>(null);

  // Date range options
  dateRangeOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Rango', value: 'range' }
  ];

  showCustomDateRange = false;

  // Status options
  statusOptions: { label: string; value: OrderStatus }[] = [
    { label: 'En Proceso', value: 'En Proceso' },
    { label: 'Recibida', value: 'Recibida' },
    { label: 'Cancelada', value: 'Cancelada' }
  ];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Search with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.emitFilters());

    // Date range preset changes
    this.dateRangeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onDateRangeChange(value));

    // Date range changes
    this.dateFromControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.dateToControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    // Status changes
    this.statusControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    // Warehouse changes
    this.warehouseControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());
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

    if (dateFrom && dateTo && !this.showCustomDateRange) {
      this.dateFromControl.setValue(this.formatDateForInput(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.formatDateForInput(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.dateRangeControl.setValue('', { emitEvent: false });
    this.dateFromControl.setValue('', { emitEvent: false });
    this.dateToControl.setValue('', { emitEvent: false });
    this.statusControl.setValue(null, { emitEvent: false });
    this.warehouseControl.setValue(null, { emitEvent: false });
    this.showCustomDateRange = false;
    this.emitFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emitFilters(): void {
    const filters: OrderFilters = {};

    const search = this.searchControl.value.trim();
    if (search) {
      filters.search = search;
    }

    const dateFrom = this.dateFromControl.value;
    if (dateFrom) {
      // Convert date string to ISO format
      filters.dateFrom = new Date(dateFrom).toISOString();
    }

    const dateTo = this.dateToControl.value;
    if (dateTo) {
      // Convert date string to ISO format
      filters.dateTo = new Date(dateTo).toISOString();
    }

    const status = this.statusControl.value;
    if (status) {
      filters.status = status;
    }

    const warehouseId = this.warehouseControl.value;
    if (warehouseId) {
      filters.warehouseId = warehouseId;
    }

    this.filtersChange.emit(filters);
  }
}

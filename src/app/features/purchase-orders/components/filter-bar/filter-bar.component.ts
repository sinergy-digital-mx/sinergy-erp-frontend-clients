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
  dateFromControl = new FormControl<string>('', { nonNullable: true });
  dateToControl = new FormControl<string>('', { nonNullable: true });
  statusControl = new FormControl<OrderStatus | null>(null);
  warehouseControl = new FormControl<string | null>(null);

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

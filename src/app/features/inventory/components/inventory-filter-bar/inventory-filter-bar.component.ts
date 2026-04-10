import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { InventoryFilters } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-filter-bar.component.html',
  styleUrl: './inventory-filter-bar.component.scss'
})
export class InventoryFilterBarComponent implements OnInit, OnDestroy {
  @Input() warehouses: any[] = [];
  @Output() filtersChange = new EventEmitter<InventoryFilters>();

  // Form controls
  searchControl = new FormControl<string>('', { nonNullable: true });
  warehouseControl = new FormControl<string | null>(null);
  lowStockControl = new FormControl<boolean>(false, { nonNullable: true });

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

    // Warehouse changes
    this.warehouseControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    // Low stock changes
    this.lowStockControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.warehouseControl.setValue(null, { emitEvent: false });
    this.lowStockControl.setValue(false, { emitEvent: false });
    this.emitFilters();
  }

  private emitFilters(): void {
    const filters: InventoryFilters = {};

    const search = this.searchControl.value.trim();
    if (search) {
      filters.search = search;
    }

    const warehouseId = this.warehouseControl.value;
    if (warehouseId) {
      filters.warehouse_id = warehouseId;
    }

    const lowStock = this.lowStockControl.value;
    if (lowStock) {
      filters.low_stock = true;
    }

    this.filtersChange.emit(filters);
  }
}

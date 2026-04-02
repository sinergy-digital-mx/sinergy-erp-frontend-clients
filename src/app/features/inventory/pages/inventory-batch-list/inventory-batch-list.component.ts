import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryBatch } from '../../models/inventory-batch.model';

@Component({
  selector: 'app-inventory-batch-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './inventory-batch-list.component.html',
  styleUrl: './inventory-batch-list.component.scss'
})
export class InventoryBatchListComponent implements OnInit {
  batches: InventoryBatch[] = [];
  loading = false;
  searchTerm = '';
  
  // Pagination
  page = 1;
  limit = 20;
  total = 0;
  pages = 0;

  constructor(private inventoryBatchService: InventoryBatchService) {}

  ngOnInit() {
    this.loadBatches();
  }

  /**
   * Load batches from API
   */
  loadBatches(): void {
    this.loading = true;
    this.inventoryBatchService.getBatches(this.page, this.limit).subscribe({
      next: (response) => {
        this.batches = response.data;
        this.total = response.pagination.total;
        this.pages = response.pagination.pages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading batches:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Handle pagination change
   */
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadBatches();
  }

  /**
   * Format date
   */
  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format quantity
   */
  formatQuantity(quantity: number, uomName: string): string {
    return `${quantity} ${uomName || ''}`;
  }
}

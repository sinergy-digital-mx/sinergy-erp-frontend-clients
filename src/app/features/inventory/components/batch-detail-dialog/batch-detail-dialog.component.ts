import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { X, Package, MapPin, FileText, Calendar, ShoppingCart, ArrowRight, Edit } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-batch-detail-dialog',
  standalone: true,
  imports: [CommonModule, RemoveTrailingZerosPipe, LucideAngularModule],
  templateUrl: './batch-detail-dialog.component.html',
  styleUrl: './batch-detail-dialog.component.scss'
})
export class BatchDetailDialogComponent implements OnInit {
  X = X; Package = Package; MapPin = MapPin; FileText = FileText;
  Calendar = Calendar; ShoppingCart = ShoppingCart; ArrowRight = ArrowRight; Edit = Edit;

  batch = signal<InventoryBatch | null>(null);
  loading = signal(true);

  activeTab = 'general';
  tabs = [
    { id: 'general', label: 'General' },
    { id: 'movimientos', label: 'Movimientos' },
    { id: 'auditorias', label: 'Auditorías' },
    { id: 'etiqueta', label: 'Etiqueta' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { batchId: string },
    public dialogRef: MatDialogRef<BatchDetailDialogComponent>,
    private batchService: InventoryBatchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  get availablePercent(): number {
    const b = this.batch();
    if (!b) return 0;
    return b.availability_percentage ?? 0;
  }

  toNum(val: any): number {
    return typeof val === 'string' ? parseFloat(val) || 0 : (val || 0);
  }

  openPurchaseOrder(): void {
    const b = this.batch();
    if (!b?.purchase_order_id) return;
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: b.purchase_order_id },
      width: '1400px',
      maxWidth: '95vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'order-detail-dialog-container'
    });
  }

  openProductDetail(): void {
    const b = this.batch();
    if (!b?.product_id) return;
    this.dialog.open(ProductDetailModalComponent, {
      data: { product: { id: b.product_id }, isNew: false },
      width: '850px',
      maxHeight: '90vh',
    });
  }

  openWarehouseDetail(): void {
    const b = this.batch();
    if (!b?.warehouse_id) return;
    this.dialog.open(WarehouseDetailModalComponent, {
      data: { warehouse: { id: b.warehouse_id, name: b.warehouse_name } },
      width: '80vw',
      maxWidth: '1000px',
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { X, Package, MapPin, FileText, Calendar, ShoppingCart, ArrowRight, Edit, ImageUp } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-batch-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveTrailingZerosPipe, LucideAngularModule],
  templateUrl: './batch-detail-dialog.component.html',
  styleUrl: './batch-detail-dialog.component.scss'
})
export class BatchDetailDialogComponent implements OnInit {
  X = X; Package = Package; MapPin = MapPin; FileText = FileText;
  Calendar = Calendar; ShoppingCart = ShoppingCart; ArrowRight = ArrowRight; Edit = Edit;
  ImageUp = ImageUp;

  batch = signal<InventoryBatch | null>(null);
  loading = signal(true);
  uploadingPhoto = signal(false);
  showTagModal = signal(false);
  tagDraft = signal('');

  activeTab = 'general';
  tabs = [
    { id: 'general', label: 'General' },
    { id: 'movimientos', label: 'Movimientos' },
    { id: 'auditorias', label: 'Auditorías' },
    { id: 'foto', label: 'Foto' },
    { id: 'etiqueta', label: 'Etiqueta' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { batchId: string },
    public dialogRef: MatDialogRef<BatchDetailDialogComponent>,
    private batchService: InventoryBatchService,
    private dialog: MatDialog,
    private toast: ToastService
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
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: b.purchase_order_id }
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

  get sourceTag(): string | null {
    return this.batch()?.source_tag_identifier ?? null;
  }

  openTagModal(): void {
    this.tagDraft.set(this.sourceTag ?? '');
    this.showTagModal.set(true);
  }

  closeTagModal(): void {
    this.showTagModal.set(false);
  }

  updateTagDraft(value: string): void {
    this.tagDraft.set(value);
  }

  saveTagLocally(): void {
    const current = this.batch();
    if (!current) return;

    const normalized = this.tagDraft().trim();
    this.batch.set({
      ...current,
      source_tag_identifier: normalized.length ? normalized : null
    });
    this.showTagModal.set(false);
    this.toast.info('TAG actualizado localmente (pendiente endpoint)');
  }

  get batchPhotoUrl(): string | null {
    const batch = this.batch();
    if (!batch) return null;
    return batch.photo_signed_url ?? batch.photo_url ?? batch.photo ?? null;
  }

  openPhotoPicker(input: HTMLInputElement): void {
    if (this.uploadingPhoto()) return;
    input.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const currentBatch = this.batch();
    if (!currentBatch?.id) return;

    this.uploadingPhoto.set(true);
    this.batchService.uploadBatchPhoto(currentBatch.id, file).subscribe({
      next: (resp) => {
        const payload = resp?.data ?? {};
        const photoUrl = typeof payload['photo_url'] === 'string'
          ? payload['photo_url']
          : typeof payload['photo_signed_url'] === 'string'
            ? payload['photo_signed_url']
            : null;
        const photo = typeof payload['photo'] === 'string' ? payload['photo'] : null;
        this.batch.set({
          ...currentBatch,
          photo,
          photo_url: photoUrl,
          photo_signed_url: photoUrl
        });
        this.uploadingPhoto.set(false);
        this.toast.success('Foto del lote actualizada');
      },
      error: (error) => {
        this.uploadingPhoto.set(false);
        this.toast.error(error?.message || 'No se pudo subir la foto del lote');
      }
    });
    input.value = '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

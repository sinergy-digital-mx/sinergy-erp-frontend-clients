import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { BatchTransferHistoryEntry } from '../../models/inventory-transfer.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { X, Package, MapPin, FileText, Calendar, ShoppingCart, ArrowRight, Edit, ImageUp, ArrowRightLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-angular';
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
  ImageUp = ImageUp; ArrowRightLeft = ArrowRightLeft;
  ArrowUpRight = ArrowUpRight; ArrowDownLeft = ArrowDownLeft;

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
    private toast: ToastService,
    private authService: AuthService
  ) {}

  get canCreateTransfer(): boolean {
    return (
      this.authService.hasPermission(PERMISSIONS.inventory.write) ||
      this.authService.hasPermission(PERMISSIONS.inventory.transfer) ||
      this.authService.hasPermission(PERMISSIONS.inventory.create)
    );
  }

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

  get canTransfer(): boolean {
    const b = this.batch();
    if (!b) return false;
    return this.toNum(b.available_quantity) > 0;
  }

  get transferHistory(): BatchTransferHistoryEntry[] {
    return this.batch()?.transfer_history ?? [];
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

  openTransfer(): void {
    const b = this.batch();
    if (!b || !this.canTransfer) return;

    this.dialog.open(CreateTransferDialogComponent, {
      data: {
        product_id: b.product_id,
        warehouse_id: b.warehouse_id,
        preselected_batch_id: b.id,
        preselected_quantity: this.toNum(b.available_quantity),
      },
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    }).afterClosed().subscribe((success) => {
      if (success) {
        this.reloadBatch();
      }
    });
  }

  openTransferDetail(transferId: string | undefined): void {
    if (!transferId) return;
    this.dialog.open(TransferDetailDialogComponent, {
      data: { transferId },
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  }

  openRelatedBatch(batchId: string | undefined): void {
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId },
      width: '920px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  }

  openOriginBatch(): void {
    const b = this.batch();
    if (b?.transferred_from_batch_id) {
      this.openRelatedBatch(b.transferred_from_batch_id);
    }
  }

  private reloadBatch(): void {
    this.loading.set(true);
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  directionLabel(direction: 'in' | 'out'): string {
    return direction === 'out' ? 'Salida' : 'Entrada';
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

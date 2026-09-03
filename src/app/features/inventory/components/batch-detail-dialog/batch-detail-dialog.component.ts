import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast.service';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { InventoryBatchMovementsTabComponent, BatchMovementReferenceKind, BatchMovementsLoadedEvent } from '../inventory-batch-movements-tab/inventory-batch-movements-tab.component';
import { UomCatalogItem } from '../../../purchase-orders/models/receipt.model';
import { ProductService } from '../../../settings/services/product.service';
import { BatchAuditHistoryEntry, InventoryAudit, InventoryAuditStatus } from '../../models/inventory-audit.model';
import { BatchTransferHistoryEntry } from '../../models/inventory-transfer.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG, WAREHOUSE_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { AUDIT_DETAIL_DIALOG_OPTIONS } from '../../config/audit-dialog.config';
import { X, Package, MapPin, FileText, Calendar, ShoppingCart, ArrowRight, Edit, ImageUp, ArrowRightLeft, ArrowUpRight, ArrowDownLeft, Stamp, Ruler, Eye, ClipboardCheck, CircleDollarSign } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { formatPedimentoDisplay, formatPurchaseOrderUnitCost, parsePurchaseOrderDecimal } from '../../../purchase-orders/utils/purchase-order-display.util';
import {
  auditStatusLabel,
  auditUserName,
  contextOpenAuditFolio,
  contextOpenAuditId,
  lineVariance,
  parseAuditQty,
} from '../../utils/inventory-audit.util';

@Component({
  selector: 'app-batch-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveTrailingZerosPipe, LucideAngularModule, SpinnerComponent, InventoryBatchMovementsTabComponent],
  templateUrl: './batch-detail-dialog.component.html',
  styleUrl: './batch-detail-dialog.component.scss',
  host: {
    class: 'batch-detail-dialog-container',
  },
})
export class BatchDetailDialogComponent implements OnInit {
  X = X; Package = Package; MapPin = MapPin; FileText = FileText;
  Calendar = Calendar; ShoppingCart = ShoppingCart; ArrowRight = ArrowRight; Edit = Edit;
  ImageUp = ImageUp; ArrowRightLeft = ArrowRightLeft;
  ArrowUpRight = ArrowUpRight; ArrowDownLeft = ArrowDownLeft; Stamp = Stamp; Ruler = Ruler; Eye = Eye;
  ClipboardCheck = ClipboardCheck;
  CircleDollarSign = CircleDollarSign;

  batch = signal<InventoryBatch | null>(null);
  loading = signal(true);
  startingAudit = signal(false);
  auditsLoading = signal(true);
  openAuditId = signal<string | null>(null);
  openAuditFolio = signal('');
  openAuditStatus = signal<InventoryAuditStatus | null>(null);
  openAuditEntry = signal<BatchAuditHistoryEntry | null>(null);
  uploadingPhoto = signal(false);
  showTagModal = signal(false);
  tagDraft = signal('');
  savingTag = signal(false);
  showMeasureModal = signal(false);
  measureSize = signal('');
  measureUomId = signal('');
  uomCatalog = signal<UomCatalogItem[]>([]);
  loadingUomCatalog = signal(false);
  savingMeasure = signal(false);
  showCreateUom = signal(false);
  newUomName = signal('');
  newUomDescription = signal('');
  savingNewUom = signal(false);

  activeTab = 'general';

  get tabs(): Array<{ id: string; label: string; count?: number }> {
    return [
      { id: 'general', label: 'General' },
      { id: 'movimientos', label: 'Movimientos', count: this.movementsCount },
      { id: 'transferencias', label: 'Transferencias' },
      { id: 'auditorias', label: 'Auditorías', count: this.auditsLoading() ? undefined : (this.visibleAuditHistory.length || undefined) },
      { id: 'foto', label: 'Foto' },
      { id: 'etiqueta', label: 'Etiqueta' },
    ];
  }

  get movementsCount(): number {
    const b = this.batch();
    if (b?.movements_count != null) {
      return Number(b.movements_count) || 0;
    }
    if (b?.movement_summary?.total_movements != null) {
      return Number(b.movement_summary.total_movements) || 0;
    }
    return b?.movements?.length ?? 0;
  }

  get summaryOrders(): number {
    const raw = this.batch()?.movement_summary?.by_type?.orders;
    const fromSummary = raw != null ? Number(raw) || 0 : 0;
    if (fromSummary > 0) {
      return fromSummary;
    }
    const sold = (this.batch()?.movements ?? []).filter((item) => item.type === 'stock_sold').length;
    return sold || fromSummary;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { batchId: string },
    public dialogRef: MatDialogRef<BatchDetailDialogComponent>,
    private batchService: InventoryBatchService,
    private auditService: InventoryAuditService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private dialog: MatDialog,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  get canCount(): boolean {
    return this.authService.hasEntityPermission('Inventory', 'Count');
  }

  get canCreateTransfer(): boolean {
    return this.authService.hasPermission(PERMISSIONS.inventory.transfer);
  }

  get canWriteBatch(): boolean {
    return this.authService.hasEntityPermission('Inventory', 'Write');
  }

  get showWarehousePencil(): boolean {
    return this.canCreateTransfer && this.batch()?.can_transfer === true;
  }

  get showTagPencil(): boolean {
    return this.canWriteBatch && this.batch()?.can_edit_tag === true;
  }

  get showMeasurePencil(): boolean {
    return this.canWriteBatch && this.batch()?.can_edit_measure === true;
  }

  get canSaveMeasure(): boolean {
    const measure = this.parseMeasure(this.measureSize());
    return measure != null && measure > 0 && !!this.measureUomId().trim();
  }

  get canCreateUom(): boolean {
    return this.newUomName().trim().length > 0 && !this.savingNewUom();
  }

  ngOnInit(): void {
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
        this.refreshOpenAudit();
      },
      error: () => {
        this.loading.set(false);
        this.auditsLoading.set(false);
      }
    });
  }

  get availablePercent(): number {
    const b = this.batch();
    if (!b) return 0;
    return b.availability_percentage ?? 0;
  }

  get canTransfer(): boolean {
    return this.batch()?.can_transfer === true;
  }

  get hasAvailableStock(): boolean {
    return this.toNum(this.batch()?.available_quantity) > 0;
  }

  get transferHistory(): BatchTransferHistoryEntry[] {
    return this.batch()?.transfer_history ?? [];
  }

  get auditHistory(): BatchAuditHistoryEntry[] {
    return this.batch()?.audit_history ?? [];
  }

  get visibleAuditHistory(): BatchAuditHistoryEntry[] {
    const history = this.auditHistory;
    const open = this.openAuditEntry();
    if (!open) return history;
    const openId = this.auditId(open);
    const rest = history.filter((entry) => this.auditId(entry) !== openId);
    return [open, ...rest];
  }

  isOpenAudit(entry: BatchAuditHistoryEntry): boolean {
    return entry.status === 'draft' || entry.status === 'submitted';
  }

  auditId(entry: BatchAuditHistoryEntry): string | undefined {
    return entry.audit_id || entry.id;
  }

  auditStatus(entry: BatchAuditHistoryEntry): string {
    return auditStatusLabel(entry.status);
  }

  auditUser(entry: BatchAuditHistoryEntry, field: 'counted_by_user' | 'authorized_by_user'): string {
    return auditUserName(entry[field]);
  }

  qtyLabel(value: string | number | null | undefined): string {
    const qty = parseAuditQty(value);
    if (qty === null) return '—';
    return String(qty).includes('.') ? String(qty).replace(/\.?0+$/, '') : String(qty);
  }

  auditVariance(entry: BatchAuditHistoryEntry): number | null {
    if (entry.variance !== null && entry.variance !== undefined && entry.variance !== '') {
      return parseAuditQty(entry.variance);
    }
    return lineVariance(entry.counted_quantity, entry.system_quantity);
  }

  auditVarianceClass(entry: BatchAuditHistoryEntry): string {
    const variance = this.auditVariance(entry);
    if (variance === null || variance === 0) return '';
    return variance > 0 ? 'positive' : 'negative';
  }

  openAuditById(auditId: string, focusBatchId?: string): void {
    if (!auditId) return;
    void import('../audit-detail-dialog/audit-detail-dialog.component').then(({ AuditDetailDialogComponent }) => {
      this.dialog.open(AuditDetailDialogComponent, {
        ...AUDIT_DETAIL_DIALOG_OPTIONS,
        data: { auditId, focusBatchId },
      }).afterClosed().subscribe(() => this.reloadBatch());
    });
  }

  startOrContinueAudit(): void {
    const batch = this.batch();
    if (!batch?.warehouse_id || !batch.product_id || this.startingAudit()) return;

    this.startingAudit.set(true);
    const includeEmpty = this.toNum(batch.available_quantity) <= 0;

    this.auditService
      .getContext(batch.warehouse_id, {
        product_id: batch.product_id,
        include_empty_lots: includeEmpty,
      })
      .pipe(
        switchMap((ctx) => {
          const openId = contextOpenAuditId(ctx);
          this.openAuditId.set(openId);
          this.openAuditFolio.set(contextOpenAuditFolio(ctx));
          if (openId) return of(openId);
          return this.auditService
            .createAudit({
              warehouse_id: batch.warehouse_id,
              product_id: batch.product_id,
              include_empty_lots: includeEmpty || undefined,
            })
            .pipe(
              map((audit) => {
                this.toast.success(`${audit.folio} creada`);
                return audit.id;
              })
            );
        }),
        switchMap((auditId) =>
          this.auditService.getAuditById(auditId).pipe(
            switchMap((audit) => {
              const alreadyIncluded = (audit.lines ?? []).some((line) => line.inventory_batch_id === batch.id);
              if (alreadyIncluded || audit.status !== 'draft') return of(audit.id);
              return this.auditService.addLine(audit.id, { inventory_batch_id: batch.id }).pipe(
                map(() => audit.id),
                catchError(() => of(audit.id))
              );
            })
          )
        )
      )
      .subscribe({
        next: (auditId) => {
          this.startingAudit.set(false);
          this.openAuditById(auditId, batch.id);
        },
        error: (err) => {
          this.startingAudit.set(false);
          this.toast.error(err?.message || 'No se pudo abrir la auditoría');
        },
      });
  }

  openAuditDetail(entry: BatchAuditHistoryEntry): void {
    const id = this.auditId(entry);
    if (id) this.openAuditById(id, this.batch()?.id);
  }

  toNum(val: any): number {
    return typeof val === 'string' ? parseFloat(val) || 0 : (val || 0);
  }

  get purchaseOrderFolio(): string {
    return this.batch()?.purchase_order_folio ?? '—';
  }

  get showCostsCard(): boolean {
    const batch = this.batch();
    return !!batch?.purchase_order_id || batch?.suggested_unit_price != null;
  }

  get showVendorCost(): boolean {
    return !!this.batch()?.purchase_order_id;
  }

  get hasRealCost(): boolean {
    const batch = this.batch();
    return batch?.real_unit_cost_usd != null || batch?.real_unit_cost_mxn != null;
  }

  vendorCostCurrency(): string {
    return this.batch()?.payment_currency === 'USD' ? 'USD' : 'MXN';
  }

  formatBatchCost(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return formatPurchaseOrderUnitCost(value);
  }

  formatBatchRate(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(parsePurchaseOrderDecimal(value));
  }

  formatSuggestedPrice(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsePurchaseOrderDecimal(value));
  }

  get pedimentoNumber(): string | null {
    const value = this.batch()?.pedimento_number?.trim();
    return value || null;
  }

  formatPedimento(value?: string | null): string {
    return formatPedimentoDisplay(value);
  }

  openPurchaseOrder(): void {
    const id = this.batch()?.purchase_order_id;
    if (id) this.openPurchaseOrderById(id);
  }

  openPurchaseOrderById(orderId: string): void {
    if (!orderId) return;
    this.dialog.open(OrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId }
    }).afterClosed().subscribe(() => {
      this.reloadBatch();
    });
  }

  openSalesOrder(orderId: string): void {
    if (!orderId) return;
    void import('../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component').then(
      ({ SalesOrderDetailDialogComponent }) => {
        this.dialog.open(SalesOrderDetailDialogComponent, {
          ...ORDER_DETAIL_DIALOG_OPTIONS,
          data: { orderId },
        }).afterClosed().subscribe(() => this.reloadBatch());
      }
    );
  }

  onMovementReference(event: { kind: BatchMovementReferenceKind; id: string }): void {
    if (!event?.id) return;
    if (event.kind === 'sales') {
      this.openSalesOrder(event.id);
      return;
    }
    if (event.kind === 'purchase') {
      this.openPurchaseOrderById(event.id);
      return;
    }
    if (event.kind === 'transfer') {
      this.openTransferDetail(event.id);
      return;
    }
    if (event.kind === 'audit') {
      this.openAuditById(event.id);
      return;
    }
    this.openRelatedBatch(event.id);
  }

  onMovementsLoaded(event: BatchMovementsLoadedEvent): void {
    const current = this.batch();
    if (!current || !event) return;
    this.batch.set({
      ...current,
      movements: event.data,
      movements_count: event.total,
    });
  }

  openProductDetail(): void {
    const b = this.batch();
    if (!b?.product_id) return;
    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: { product: { id: b.product_id }, isNew: false },
    });
  }

  openWarehouseDetail(): void {
    const b = this.batch();
    if (!b?.warehouse_id) return;

    this.warehouseService.getWarehouse(b.warehouse_id).subscribe({
      next: (warehouse) => {
        this.dialog.open(WarehouseDetailModalComponent, {
          ...WAREHOUSE_DETAIL_DIALOG_CONFIG,
          data: { warehouse },
        });
      },
      error: () => this.toast.error('No se pudo cargar el almacén'),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  openTransfer(event?: Event): void {
    event?.stopPropagation();
    const b = this.batch();
    if (!b || !this.canCreateTransfer || !this.canTransfer) return;

    this.dialog.open(CreateTransferDialogComponent, {
      data: {
        product_id: b.product_id,
        warehouse_id: b.warehouse_id,
        uom_id: b.uom_id,
        preselected_batch_id: b.id,
        preselected_quantity: this.toNum(b.available_quantity),
      },
      width: 'min(1100px, 96vw)',
      height: '720px',
      maxWidth: '96vw',
      maxHeight: '92vh',
      panelClass: 'transfer-dialog-panel',
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
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
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
    this.auditsLoading.set(true);
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
        this.refreshOpenAudit();
      },
      error: () => {
        this.loading.set(false);
        this.auditsLoading.set(false);
      },
    });
  }

  private refreshOpenAudit(): void {
    const batch = this.batch();
    this.auditsLoading.set(true);
    if (!batch?.warehouse_id || !batch.product_id) {
      this.clearOpenAudit();
      this.auditsLoading.set(false);
      return;
    }
    this.auditService.getContext(batch.warehouse_id, { product_id: batch.product_id }).pipe(
      switchMap((ctx) => {
        const id = contextOpenAuditId(ctx);
        this.openAuditId.set(id);
        this.openAuditFolio.set(contextOpenAuditFolio(ctx));
        this.openAuditStatus.set(ctx.open_audit_status ?? ctx.open_audit?.status ?? null);
        if (!id) {
          this.openAuditEntry.set(null);
          return of(null);
        }
        return this.auditService.getAuditById(id).pipe(
          map((audit) => this.entryFromOpenAudit(audit, batch.id)),
          catchError(() => of(this.entryFromOpenRef(
            id,
            contextOpenAuditFolio(ctx),
            ctx.open_audit_status ?? ctx.open_audit?.status
          )))
        );
      }),
      finalize(() => this.auditsLoading.set(false))
    ).subscribe({
      next: (entry) => {
        if (entry) this.openAuditEntry.set(entry);
      },
      error: () => this.clearOpenAudit(),
    });
  }

  private clearOpenAudit(): void {
    this.openAuditId.set(null);
    this.openAuditFolio.set('');
    this.openAuditStatus.set(null);
    this.openAuditEntry.set(null);
  }

  private entryFromOpenRef(
    id: string,
    folio: string,
    status?: InventoryAuditStatus | null
  ): BatchAuditHistoryEntry {
    return {
      audit_id: id,
      folio: folio || 'AUD',
      status: status ?? 'draft',
      system_quantity: this.batch()?.available_quantity ?? '',
      counted_quantity: null,
      variance: null,
    };
  }

  private resolveAuditSystemQty(value: string | number | null | undefined): string | number {
    if (parseAuditQty(value) !== null) return value as string | number;
    return this.batch()?.available_quantity ?? '';
  }

  private entryFromOpenAudit(audit: InventoryAudit, batchId: string): BatchAuditHistoryEntry {
    const line = (audit.lines ?? []).find((item) => item.inventory_batch_id === batchId);
    return {
      audit_id: audit.id,
      folio: audit.folio,
      status: audit.status,
      system_quantity: this.resolveAuditSystemQty(line?.system_quantity),
      counted_quantity: line?.counted_quantity ?? null,
      variance: line?.variance ?? null,
      counted_by_user: line?.counted_by_user ?? audit.created_by_user,
      authorized_by_user: audit.authorized_by_user,
      counted_at: line?.counted_at ?? audit.created_at,
      authorized_at: audit.authorized_at,
      reason: line?.reason ?? null,
    };
  }

  directionLabel(direction: 'in' | 'out'): string {
    return direction === 'out' ? 'Salida' : 'Entrada';
  }

  get sourceTag(): string | null {
    return this.batch()?.source_tag_identifier ?? null;
  }

  get measureLabel(): string {
    return this.batch()?.measure_label?.trim() || '—';
  }

  openTagModal(): void {
    if (!this.showTagPencil) return;
    this.tagDraft.set(this.sourceTag ?? '');
    this.showTagModal.set(true);
  }

  closeTagModal(): void {
    if (this.savingTag()) return;
    this.showTagModal.set(false);
  }

  updateTagDraft(value: string): void {
    this.tagDraft.set(value);
  }

  saveTag(): void {
    const current = this.batch();
    if (!current || this.savingTag()) return;

    const normalized = this.tagDraft().trim();
    this.savingTag.set(true);
    this.batchService.updateBatch(current.id, {
      source_tag_identifier: normalized.length ? normalized : '',
    }).subscribe({
      next: (updated) => {
        this.applyPatchedBatch(updated);
        this.savingTag.set(false);
        this.showTagModal.set(false);
        this.toast.success(normalized.length ? 'TAG actualizado' : 'TAG eliminado');
      },
      error: (error) => {
        this.savingTag.set(false);
        this.toast.error(error?.message || 'No se pudo actualizar el TAG');
      },
    });
  }

  openMeasureModal(): void {
    if (!this.showMeasurePencil) return;
    this.measureSize.set('');
    this.measureUomId.set('');
    this.resetCreateUomForm();
    this.showMeasureModal.set(true);
    this.loadUomCatalog();
  }

  closeMeasureModal(): void {
    if (this.savingMeasure() || this.savingNewUom()) return;
    this.showMeasureModal.set(false);
    this.resetCreateUomForm();
  }

  toggleCreateUom(): void {
    if (this.savingNewUom()) return;
    this.showCreateUom.update((open) => !open);
    if (!this.showCreateUom()) {
      this.newUomName.set('');
      this.newUomDescription.set('');
    }
  }

  createGlobalUom(): void {
    const name = this.newUomName().trim();
    if (!name || this.savingNewUom()) return;

    this.savingNewUom.set(true);
    this.productService.createUOMCatalogItem({
      name,
      description: this.newUomDescription().trim(),
    }).subscribe({
      next: (response) => {
        const created = this.unwrapCatalogItem(response);
        this.savingNewUom.set(false);
        this.resetCreateUomForm();
        if (created?.id) {
          const exists = this.uomCatalog().some((item) => item.id === created.id);
          if (!exists) {
            this.uomCatalog.set(this.sortCatalog([...this.uomCatalog(), created]));
          }
          this.measureUomId.set(created.id);
        }
        this.loadUomCatalog(true);
        this.toast.success('Unidad agregada al catálogo global');
      },
      error: (error) => {
        this.savingNewUom.set(false);
        this.toast.error(error?.error?.message || error?.message || 'No se pudo crear la unidad');
      },
    });
  }

  saveMeasure(): void {
    const current = this.batch();
    if (!current || this.savingMeasure()) return;

    const measure = this.parseMeasure(this.measureSize());
    const measureUomId = this.measureUomId().trim();

    if (measure == null || measure <= 0) {
      this.toast.error('Indica el tamaño');
      return;
    }
    if (!measureUomId) {
      this.toast.error('Indica la unidad del tamaño (Foot, PIES, …). No uses la unidad de la orden de compra');
      return;
    }

    this.savingMeasure.set(true);
    this.batchService.updateBatch(current.id, {
      measure,
      measure_uom_id: measureUomId,
    }).subscribe({
      next: (updated) => {
        this.applyPatchedBatch(updated);
        this.savingMeasure.set(false);
        this.showMeasureModal.set(false);
        this.toast.success('Medida actualizada');
      },
      error: (error) => {
        this.savingMeasure.set(false);
        this.toast.error(
          error?.message || 'La medida de este lote ya está definida y no se puede cambiar'
        );
      },
    });
  }

  private loadUomCatalog(force = false): void {
    if (!force && (this.uomCatalog().length || this.loadingUomCatalog())) return;
    this.loadingUomCatalog.set(true);
    this.productService.getUOMCatalog({ limit: 200 }).subscribe({
      next: (items) => {
        this.uomCatalog.set(this.sortCatalog(items ?? []));
        this.loadingUomCatalog.set(false);
      },
      error: () => {
        this.loadingUomCatalog.set(false);
        this.toast.error('No se pudo cargar el catálogo de unidades');
      },
    });
  }

  private resetCreateUomForm(): void {
    this.showCreateUom.set(false);
    this.newUomName.set('');
    this.newUomDescription.set('');
  }

  private unwrapCatalogItem(res: unknown): UomCatalogItem | null {
    if (!res || typeof res !== 'object') return null;
    const root = res as Record<string, unknown>;
    const nested = root['data'];
    const body = nested && typeof nested === 'object' && !Array.isArray(nested)
      ? (nested as Record<string, unknown>)
      : root;
    const id = typeof body['id'] === 'string' ? body['id'] : '';
    const name = typeof body['name'] === 'string' ? body['name'] : '';
    if (!id) return null;
    return { id, name };
  }

  private sortCatalog(items: UomCatalogItem[]): UomCatalogItem[] {
    return [...items].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es'));
  }

  private parseMeasure(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const parsed = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  private applyPatchedBatch(updated: InventoryBatch): void {
    const current = this.batch();
    this.batch.set(current ? { ...current, ...updated } : updated);
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

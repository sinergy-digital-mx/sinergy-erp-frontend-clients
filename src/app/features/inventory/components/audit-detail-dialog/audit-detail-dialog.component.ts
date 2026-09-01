import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClipboardCheck, Plus, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import {
  InventoryAudit,
  InventoryAuditLine,
  InventoryAuditStatus,
  PatchAuditLineDto,
} from '../../models/inventory-audit.model';
import { AuthService } from '../../../../core/services/auth.service';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ToastService } from '../../../../core/services/toast.service';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { TransferLocationView } from '../../utils/transfer-location.util';
import {
  auditProductLabel,
  auditStatusLabel,
  auditUserName,
  countedInputFromLine,
  fromAuditWarehouse,
  lineVariance,
  parseAuditQty,
  roundAuditQty,
} from '../../utils/inventory-audit.util';
import { AddAuditLineDialogComponent } from '../add-audit-line-dialog/add-audit-line-dialog.component';
import { ADD_AUDIT_LINE_DIALOG_OPTIONS } from '../../config/audit-dialog.config';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

interface LineDraft {
  countedInput: string;
  reason: string;
}

type ActionPanel = 'authorize' | 'reject' | 'cancel' | null;

@Component({
  selector: 'app-audit-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    RemoveTrailingZerosPipe,
    TransferLocationPathComponent,
    SpinnerComponent,
  ],
  templateUrl: './audit-detail-dialog.component.html',
  styleUrl: './audit-detail-dialog.component.scss',
})
export class AuditDetailDialogComponent implements OnInit {
  readonly X = X;
  readonly Plus = Plus;
  readonly ClipboardCheck = ClipboardCheck;

  audit = signal<InventoryAudit | null>(null);
  drafts = signal<Record<string, LineDraft>>({});
  loading = signal(true);
  saving = signal(false);
  acting = signal(false);
  dirty = signal(false);
  onlyVariance = signal(false);
  actionPanel = signal<ActionPanel>(null);
  actionNotes = signal('');
  lineFilter = signal('');

  warehouseLocation = computed<TransferLocationView | null>(() => {
    const warehouse = this.audit()?.warehouse;
    return warehouse ? fromAuditWarehouse(warehouse) : null;
  });

  displayedLines = computed(() => {
    const audit = this.audit();
    const lines = [...(audit?.lines ?? [])];
    const query = this.lineFilter().trim().toLowerCase();
    const filtered = query
      ? lines.filter((line) =>
          [line.batch_number, line.product_name, line.product_sku]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(query))
        )
      : lines;

    const prioritizeVariance = audit?.status === 'submitted' || this.onlyVariance();
    const visible = this.onlyVariance()
      ? filtered.filter((line) => {
          if (line.inventory_batch_id === this.data.focusBatchId) return true;
          const variance = this.varianceOf(line);
          return variance !== null && variance !== 0;
        })
      : filtered;

    const focusId = this.data.focusBatchId;
    const sorted = prioritizeVariance
      ? visible.sort((a, b) => {
          const va = Math.abs(this.varianceOf(a) ?? 0);
          const vb = Math.abs(this.varianceOf(b) ?? 0);
          if ((va === 0) !== (vb === 0)) return va === 0 ? 1 : -1;
          return vb - va;
        })
      : visible;

    if (!focusId) return sorted;
    return [...sorted].sort((a, b) => {
      if (a.inventory_batch_id === focusId) return -1;
      if (b.inventory_batch_id === focusId) return 1;
      return 0;
    });
  });

  pendingCount = computed(() => {
    const lines = this.audit()?.lines ?? [];
    return lines.filter((line) => parseAuditQty(this.draftOf(line).countedInput) === null).length;
  });

  varianceWithoutReason = computed(() => {
    const lines = this.audit()?.lines ?? [];
    return lines.some((line) => {
      const variance = this.varianceOf(line);
      if (variance === null || variance === 0) return false;
      return !this.draftOf(line).reason.trim();
    });
  });

  liveTotals = computed(() => {
    const lines = this.audit()?.lines ?? [];
    this.drafts();
    let system = 0;
    let counted = 0;
    let countedLines = 0;
    let withVariance = 0;
    for (const line of lines) {
      system += parseAuditQty(line.system_quantity) ?? 0;
      const qty = parseAuditQty(this.draftOf(line).countedInput);
      if (qty === null) continue;
      countedLines += 1;
      counted += qty;
      const variance = lineVariance(qty, line.system_quantity);
      if (variance !== null && variance !== 0) withVariance += 1;
    }
    return {
      system: roundAuditQty(system),
      counted: countedLines > 0 ? roundAuditQty(counted) : null,
      variance: countedLines > 0 ? roundAuditQty(counted - system) : null,
      withVariance,
      countedLines,
      totalLines: lines.length,
    };
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { auditId: string; focusBatchId?: string },
    private dialogRef: MatDialogRef<AuditDetailDialogComponent, boolean>,
    private auditService: InventoryAuditService,
    private dialog: MatDialog,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  get canCount(): boolean {
    return (
      this.authService.hasAdminRole() ||
      this.authService.hasPermission(PERMISSIONS.inventory.count)
    );
  }

  get canAuthorize(): boolean {
    return (
      this.authService.hasAdminRole() ||
      this.authService.hasPermission(PERMISSIONS.inventory.authorize)
    );
  }

  get status(): InventoryAuditStatus | null {
    return this.audit()?.status ?? null;
  }

  get isReadonly(): boolean {
    return this.status === 'posted' || this.status === 'cancelled';
  }

  get canEditLines(): boolean {
    return this.status === 'draft' && this.canCount && !this.isReadonly;
  }

  get canSubmit(): boolean {
    return (
      this.canEditLines &&
      this.pendingCount() === 0 &&
      !this.varianceWithoutReason() &&
      !this.saving() &&
      !this.acting() &&
      (this.audit()?.lines?.length ?? 0) > 0
    );
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.auditService.getAuditById(this.data.auditId).subscribe({
      next: (audit) => {
        this.applyAudit(audit);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err?.message || 'No se pudo cargar la auditoría');
      },
    });
  }

  statusLabel(status: InventoryAuditStatus | string | null | undefined): string {
    return auditStatusLabel(status);
  }

  productLabel(audit: InventoryAudit): string {
    return auditProductLabel(audit);
  }

  userName(user: InventoryAudit['created_by_user']): string {
    return auditUserName(user);
  }

  draftOf(line: InventoryAuditLine): LineDraft {
    return this.drafts()[line.id] ?? { countedInput: countedInputFromLine(line), reason: line.reason ?? '' };
  }

  varianceOf(line: InventoryAuditLine): number | null {
    return lineVariance(this.draftOf(line).countedInput, line.system_quantity);
  }

  varianceClass(line: InventoryAuditLine): string {
    const variance = this.varianceOf(line);
    if (variance === null || variance === 0) return '';
    return variance > 0 ? 'positive' : 'negative';
  }

  needsReason(line: InventoryAuditLine): boolean {
    const variance = this.varianceOf(line);
    return variance !== null && variance !== 0;
  }

  updateCounted(line: InventoryAuditLine, value: string | number | null): void {
    if (!this.canEditLines) return;
    const next = value === null || value === undefined ? '' : String(value);
    this.patchDraft(line.id, { countedInput: next });
  }

  updateReason(line: InventoryAuditLine, value: string): void {
    if (!this.canEditLines) return;
    this.patchDraft(line.id, { reason: value });
  }

  normalizeCounted(line: InventoryAuditLine): void {
    const raw = this.draftOf(line).countedInput.trim();
    if (raw === '') return;
    const qty = parseAuditQty(raw);
    if (qty === null || qty < 0) {
      this.patchDraft(line.id, { countedInput: '' });
      return;
    }
    this.patchDraft(line.id, { countedInput: String(roundAuditQty(qty)) });
  }

  save(then?: () => void): void {
    const audit = this.audit();
    if (!audit || !this.canEditLines || this.saving()) return;

    const lines: PatchAuditLineDto[] = [];
    for (const line of audit.lines ?? []) {
      const draft = this.draftOf(line);
      const qty = parseAuditQty(draft.countedInput);
      if (qty === null) continue;
      if (qty < 0) {
        this.toast.error('Las cantidades no pueden ser negativas');
        return;
      }
      const variance = lineVariance(draft.countedInput, line.system_quantity);
      if (variance !== null && variance !== 0 && !draft.reason.trim()) {
        this.toast.error('El motivo es obligatorio si hay diferencia contra el sistema');
        return;
      }
      const payload: PatchAuditLineDto = {
        id: line.id,
        counted_quantity: roundAuditQty(qty),
      };
      if (draft.reason.trim()) payload.reason = draft.reason.trim();
      lines.push(payload);
    }

    this.saving.set(true);
    this.auditService.saveLines(audit.id, lines).subscribe({
      next: () => {
        this.saving.set(false);
        this.dirty.set(false);
        this.reloadAfterAction(then);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err?.message || 'No se pudieron guardar las líneas');
      },
    });
  }

  submit(): void {
    if (!this.canSubmit) return;
    const run = () => {
      const audit = this.audit();
      if (!audit) return;
      this.acting.set(true);
      this.auditService.submit(audit.id).subscribe({
        next: () => {
          this.acting.set(false);
          this.toast.success(`${audit.folio} enviada a autorización`);
          this.reloadAfterAction();
        },
        error: (err) => {
          this.acting.set(false);
          this.toast.error(err?.message || 'No se pudo enviar a autorización');
        },
      });
    };
    if (this.dirty()) this.save(run);
    else run();
  }

  confirmAction(): void {
    const panel = this.actionPanel();
    const audit = this.audit();
    if (!panel || !audit || this.acting()) return;
    const notes = this.actionNotes().trim();

    if (panel === 'reject' && notes.length < 3) {
      this.toast.error('El motivo de rechazo debe tener al menos 3 caracteres');
      return;
    }

    this.acting.set(true);
    const request =
      panel === 'authorize'
        ? this.auditService.authorize(audit.id, notes || undefined)
        : panel === 'reject'
          ? this.auditService.reject(audit.id, notes)
          : this.auditService.cancel(audit.id, notes || undefined);

    request.subscribe({
      next: () => {
        this.acting.set(false);
        this.actionPanel.set(null);
        this.actionNotes.set('');
        if (panel === 'authorize') this.toast.success(`${audit.folio} aplicada`);
        else if (panel === 'reject') this.toast.success(`${audit.folio} rechazada`);
        else this.toast.success(`${audit.folio} cancelada`);
        this.reloadAfterAction();
      },
      error: (err) => {
        this.acting.set(false);
        this.toast.error(err?.message || 'No se pudo completar la acción');
      },
    });
  }

  openAction(panel: ActionPanel): void {
    this.actionPanel.set(panel);
    this.actionNotes.set('');
  }

  closeAction(): void {
    this.actionPanel.set(null);
    this.actionNotes.set('');
  }

  addLine(): void {
    const audit = this.audit();
    if (!audit || !this.canEditLines) return;
    this.dialog
      .open(AddAuditLineDialogComponent, {
        ...ADD_AUDIT_LINE_DIALOG_OPTIONS,
        data: {
          auditId: audit.id,
          warehouseId: audit.warehouse.id,
          productId: audit.product_id,
          existingBatchIds: (audit.lines ?? []).map((line) => line.inventory_batch_id),
        },
      })
      .afterClosed()
      .subscribe((added) => {
        if (added) this.reloadAfterAction();
      });
  }

  openBatch(batchId: string | undefined): void {
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
    });
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    return new Date(value).toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  close(): void {
    this.dialogRef.close(this.audit()?.status === 'posted');
  }

  private applyAudit(audit: InventoryAudit): void {
    this.audit.set(audit);
    const drafts: Record<string, LineDraft> = {};
    for (const line of audit.lines ?? []) {
      drafts[line.id] = {
        countedInput: countedInputFromLine(line),
        reason: line.reason ?? '',
      };
    }
    this.drafts.set(drafts);
    this.dirty.set(false);
    if (audit.status === 'submitted' && !this.data.focusBatchId) this.onlyVariance.set(true);
  }

  private patchDraft(lineId: string, patch: Partial<LineDraft>): void {
    this.drafts.update((current) => ({
      ...current,
      [lineId]: { ...current[lineId], ...patch },
    }));
    this.dirty.set(true);
  }

  private reloadAfterAction(then?: () => void): void {
    this.auditService.getAuditById(this.data.auditId).subscribe({
      next: (audit) => {
        this.applyAudit(audit);
        then?.();
      },
      error: (err) => this.toast.error(err?.message || 'No se pudo refrescar la auditoría'),
    });
  }
}

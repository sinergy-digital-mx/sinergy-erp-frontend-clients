import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { Branch } from '../../../settings/models/branch.model';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { MADERERIA_INVENTORY_IMPORT_PERMISSIONS } from '../../config/permissions.config';
import {
  MadereriaInventoryImportError,
  MadereriaInventoryImportJob,
  MadereriaInventoryImportResult,
} from '../../models/madereria-inventory-import.model';
import { MadereriaInventoryImportService } from '../../services/madereria-inventory-import.service';

const ALLOWED_EXTENSIONS = ['.xls', '.xlsx'];
const POLL_INTERVAL_MS = 900;

@Component({
  selector: 'app-madereria-inventory-import-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './madereria-inventory-import-page.component.html',
  styleUrl: './madereria-inventory-import-page.component.scss',
})
export class MadereriaInventoryImportPageComponent implements OnInit, OnDestroy {
  readonly createPermission = MADERERIA_INVENTORY_IMPORT_PERMISSIONS.create;

  form: FormGroup;

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];
  warehouses: Warehouse[] = [];

  selectedFile: File | null = null;
  fileError = '';
  loadingFiscal = false;
  loadingBranches = false;
  loadingWarehouses = false;
  importing = false;
  job: MadereriaInventoryImportJob | null = null;
  result: MadereriaInventoryImportResult | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly stopPoll$ = new Subject<void>();
  private pollSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private importService: MadereriaInventoryImportService,
    private authService: AuthService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.createForm();
  }

  get canImport(): boolean {
    return this.authService.hasAdminRole() || this.authService.hasPermission(this.createPermission);
  }

  get canSubmit(): boolean {
    const value = this.form.getRawValue();
    return (
      this.canImport &&
      !this.importing &&
      !!this.selectedFile &&
      !!value.fiscal_configuration_id &&
      !!value.billing_branch_id &&
      !!value.warehouse_id
    );
  }

  get progressPercent(): number {
    const percent = this.job?.percent ?? 0;
    if (!Number.isFinite(percent)) {
      return 0;
    }
    return Math.min(100, Math.max(0, percent));
  }

  get progressLabel(): string {
    if (!this.job) {
      return 'En cola…';
    }
    if (this.job.message?.trim()) {
      return this.job.message.trim();
    }
    if (this.job.total > 0) {
      return `Importando ${this.job.processed} de ${this.job.total}`;
    }
    return this.job.status === 'queued' ? 'En cola…' : 'Importando…';
  }

  ngOnInit(): void {
    this.setupCascade();
    this.loadFiscalConfigurations();
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();
    this.stopPoll$.complete();
  }

  fiscalLabel(config: FiscalConfiguration): string {
    const name = config.razon_social?.trim() || 'Sin razón social';
    const rfc = config.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  branchLabel(branch: Branch): string {
    return branch.name?.trim() || branch.code?.trim() || '—';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.fileError = '';
    this.selectedFile = null;

    if (!file) {
      return;
    }

    if (!this.isExcelFile(file)) {
      this.fileError = 'Solo se permiten archivos .xls o .xlsx';
      input.value = '';
      return;
    }

    this.selectedFile = file;
  }

  clearFile(input: HTMLInputElement): void {
    this.selectedFile = null;
    this.fileError = '';
    input.value = '';
  }

  submit(): void {
    if (this.importing) {
      return;
    }
    if (!this.canImport) {
      this.toast.error('No tienes permiso para importar inventario.');
      return;
    }

    this.form.markAllAsTouched();
    if (!this.selectedFile) {
      this.fileError = 'Selecciona un archivo Excel (.xls o .xlsx)';
      return;
    }

    const { fiscal_configuration_id, billing_branch_id, warehouse_id } = this.form.getRawValue();
    if (!fiscal_configuration_id || !billing_branch_id || !warehouse_id) {
      this.toast.warning('Completa razón social, sucursal y almacén.');
      return;
    }

    this.importing = true;
    this.job = null;
    this.result = null;
    this.lockForm();

    this.importService
      .startImport({
        file: this.selectedFile,
        fiscal_configuration_id,
        billing_branch_id,
        warehouse_id,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (job) => {
          this.applyJob(job);
        },
        error: (error) => {
          this.finishImport();
          this.toast.error(
            resolveHttpErrorMessage(error, 'No se pudo importar el inventario')
          );
          this.cdr.detectChanges();
        },
      });
  }

  errorMessages(result: MadereriaInventoryImportResult | null = this.result): string[] {
    if (!result?.errors?.length) {
      return [];
    }
    return result.errors.map((item) => this.formatError(item)).filter((msg) => !!msg);
  }

  private applyJob(job: MadereriaInventoryImportJob): void {
    this.job = job;
    this.cdr.detectChanges();

    if (job.status === 'completed') {
      this.stopPolling();
      this.result = job.result;
      this.finishImport();
      if (this.result) {
        const hasErrors = this.errorMessages(this.result).length > 0;
        const summary = this.buildToastSummary(this.result);
        if (hasErrors) {
          this.toast.warning(summary);
        } else {
          this.toast.success(summary);
        }
      } else {
        this.toast.success('Importación completada.');
      }
      return;
    }

    if (job.status === 'failed') {
      this.stopPolling();
      this.finishImport();
      this.toast.error(job.error?.trim() || 'La importación falló.');
      return;
    }

    if (!this.pollSub) {
      if (!job.id) {
        this.finishImport();
        this.toast.error('No se recibió el identificador del job.');
        return;
      }
      this.startPolling(job.id);
    }
  }

  private startPolling(jobId: string): void {
    this.stopPolling();
    this.pollSub = interval(POLL_INTERVAL_MS)
      .pipe(
        switchMap(() => this.importService.getJob(jobId)),
        takeUntil(this.stopPoll$),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (job) => this.applyJob(job),
        error: (error) => {
          this.stopPolling();
          this.finishImport();
          this.toast.error(
            resolveHttpErrorMessage(error, 'No se pudo consultar el progreso de la importación')
          );
          this.cdr.detectChanges();
        },
      });
  }

  private stopPolling(): void {
    this.stopPoll$.next();
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
  }

  private lockForm(): void {
    this.form.disable({ emitEvent: false });
  }

  private finishImport(): void {
    this.importing = false;
    this.restoreFormEnabledState();
    this.cdr.detectChanges();
  }

  private restoreFormEnabledState(): void {
    this.form.get('fiscal_configuration_id')?.enable({ emitEvent: false });
    if (this.form.get('fiscal_configuration_id')?.value) {
      this.form.get('billing_branch_id')?.enable({ emitEvent: false });
    } else {
      this.form.get('billing_branch_id')?.disable({ emitEvent: false });
    }
    if (this.form.get('billing_branch_id')?.value) {
      this.form.get('warehouse_id')?.enable({ emitEvent: false });
    } else {
      this.form.get('warehouse_id')?.disable({ emitEvent: false });
    }
  }

  private setupCascade(): void {
    this.form
      .get('fiscal_configuration_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => {
        this.form.patchValue({ billing_branch_id: '', warehouse_id: '' }, { emitEvent: false });
        this.branches = [];
        this.warehouses = [];
        this.form.get('billing_branch_id')?.disable({ emitEvent: false });
        this.form.get('warehouse_id')?.disable({ emitEvent: false });

        if (fiscalId) {
          this.loadBranches(fiscalId);
          this.form.get('billing_branch_id')?.enable({ emitEvent: false });
        }
        this.cdr.detectChanges();
      });

    this.form
      .get('billing_branch_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((branchId) => {
        this.form.patchValue({ warehouse_id: '' }, { emitEvent: false });
        this.warehouses = [];
        this.form.get('warehouse_id')?.disable({ emitEvent: false });

        if (branchId) {
          this.loadWarehouses(branchId);
          this.form.get('warehouse_id')?.enable({ emitEvent: false });
        }
        this.cdr.detectChanges();
      });
  }

  private loadFiscalConfigurations(): void {
    this.loadingFiscal = true;
    this.form.get('fiscal_configuration_id')?.disable({ emitEvent: false });
    this.fiscalConfigService
      .listFiscalConfigurations({ status: 'active', limit: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.fiscalConfigurations = res.data ?? [];
          this.loadingFiscal = false;
          this.form.get('fiscal_configuration_id')?.enable({ emitEvent: false });
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.fiscalConfigurations = [];
          this.loadingFiscal = false;
          this.form.get('fiscal_configuration_id')?.enable({ emitEvent: false });
          this.toast.error(resolveHttpErrorMessage(error, 'Error al cargar razones sociales'));
          this.cdr.detectChanges();
        },
      });
  }

  private loadBranches(fiscalConfigurationId: string): void {
    this.loadingBranches = true;
    this.branchService
      .getBranches(fiscalConfigurationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.branches = this.unwrapList<Branch>(res);
          this.loadingBranches = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.branches = [];
          this.loadingBranches = false;
          this.toast.error(resolveHttpErrorMessage(error, 'Error al cargar sucursales'));
          this.cdr.detectChanges();
        },
      });
  }

  private loadWarehouses(billingBranchId: string): void {
    this.loadingWarehouses = true;
    this.warehouseService
      .getWarehouses({
        billing_branch_id: billingBranchId,
        status: 'active',
        limit: 100,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.warehouses = res.data ?? [];
          this.loadingWarehouses = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.warehouses = [];
          this.loadingWarehouses = false;
          this.toast.error(resolveHttpErrorMessage(error, 'Error al cargar almacenes'));
          this.cdr.detectChanges();
        },
      });
  }

  private isExcelFile(file: File): boolean {
    const name = file.name.toLowerCase();
    return ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
  }

  private unwrapList<T>(res: unknown): T[] {
    if (Array.isArray(res)) {
      return res as T[];
    }
    if (res && typeof res === 'object' && 'data' in res) {
      const data = (res as { data: unknown }).data;
      if (Array.isArray(data)) {
        return data as T[];
      }
    }
    return [];
  }

  private buildToastSummary(result: MadereriaInventoryImportResult): string {
    const warehouse = result.warehouse_name?.trim() || 'almacén';
    const created = result.products_created?.length ?? 0;
    return (
      `Importación en ${warehouse}: ${result.batches_created ?? 0} lotes, ` +
      `${result.prices_created ?? 0} precios, ` +
      `${result.costs_created ?? 0} costos nuevos, ` +
      `${result.costs_updated ?? 0} actualizados` +
      (created ? `, ${created} productos nuevos` : '') +
      '.'
    );
  }

  private createForm() {
    return this.fb.group({
      fiscal_configuration_id: ['', Validators.required],
      billing_branch_id: [{ value: '', disabled: true }, Validators.required],
      warehouse_id: [{ value: '', disabled: true }, Validators.required],
    });
  }

  private formatError(item: MadereriaInventoryImportError | string): string {
    if (typeof item === 'string') {
      return item.trim();
    }
    const reason = item.reason?.trim() || item.message?.trim() || '';
    const sku = item.sku?.trim();
    const row = item.row_number;
    const prefix = [sku ? `SKU ${sku}` : '', row != null ? `fila ${row}` : '']
      .filter(Boolean)
      .join(', ');
    if (prefix && reason) {
      return `${prefix}: ${reason}`;
    }
    return reason || prefix;
  }
}

import { Component, Inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseService } from '../../services/warehouse.service';
import { BranchService } from '../../services/branch.service';
import { Warehouse } from '../../models/warehouse.model';
import { Branch, BranchWarehouse } from '../../models/branch.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { LocationMapFieldsComponent } from '../../../../core/components/location-map-fields/location-map-fields.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-warehouse-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    LucideAngularModule,
    LocationMapFieldsComponent,
  ],
  templateUrl: './warehouse-detail-modal.component.html',
  styleUrl: './warehouse-detail-modal.component.scss',
})
export class WarehouseDetailModalComponent implements OnInit {
  @ViewChild(LocationMapFieldsComponent) locationMap?: LocationMapFieldsComponent;

  X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;
  nested = false;
  mapActive = false;
  branches = signal<Branch[]>([]);
  loadingBranches = signal(false);

  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' },
  ];

  statusSelectConfig: any;
  branchSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<WarehouseDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { warehouse: Warehouse | BranchWarehouse | null; nested?: boolean }
  ) {
    this.nested = !!data.nested;
    this.isNew = !data.warehouse;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.initializeSelectConfigs();
    this.dialogRef.afterOpened().subscribe(() => {
      this.mapActive = true;
    });
    setTimeout(() => {
      this.mapActive = true;
    }, 200);

    if (this.nested) {
      if (this.data.warehouse) {
        this.form.patchValue(this.data.warehouse);
      }
      return;
    }
    this.loadBranches();
  }

  private initializeSelectConfigs(): void {
    this.statusSelectConfig = {
      placeholder: 'Selecciona status',
      data: this.statusOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('status'),
      name_select: 'status',
    };

    this.branchSelectConfig = {
      placeholder: 'Selecciona una sucursal (opcional)',
      data: this.branches(),
      value: 'id',
      option: 'display_name',
      form_control: this.form.get('billing_branch_id'),
      name_select: 'billing_branch_id',
    };
  }

  private loadBranches(): void {
    this.loadingBranches.set(true);
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.loadingBranches.set(false);
        this.branchSelectConfig = {
          ...this.branchSelectConfig,
          data: branches,
        };
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
          setTimeout(() => this.locationMap?.refreshMap(), 100);
        }
      },
      error: () => {
        this.loadingBranches.set(false);
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
        }
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar sucursales', type: 'error' },
          duration: 3000,
        });
      },
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: [''],
      description: [''],
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: ['México'],
      latitude: [null as number | null],
      longitude: [null as number | null],
      billing_branch_id: [''],
      status: ['active'],
    });
  }

  private normalizeCoords(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private buildPayload() {
    const raw = this.form.getRawValue();
    const status: 'active' | 'inactive' = raw.status === 'inactive' ? 'inactive' : 'active';
    return {
      name: String(raw.name).trim(),
      code: raw.code?.trim() || undefined,
      description: raw.description?.trim() || undefined,
      street: raw.street?.trim() || undefined,
      city: raw.city?.trim() || undefined,
      state: raw.state?.trim() || undefined,
      zip_code: raw.zip_code?.trim() || undefined,
      country: raw.country?.trim() || undefined,
      latitude: this.normalizeCoords(raw.latitude),
      longitude: this.normalizeCoords(raw.longitude),
      billing_branch_id: raw.billing_branch_id || undefined,
      status,
    };
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    const formValue = this.buildPayload();

    if (this.nested) {
      const result: BranchWarehouse = this.isNew
        ? formValue
        : { ...(this.data.warehouse as BranchWarehouse), ...formValue };
      this.dialogRef.close(result);
      return;
    }

    this.saving.set(true);

    if (this.isNew) {
      this.warehouseService.createWarehouse(formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Almacén creado correctamente', type: 'success' },
            duration: 3000,
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear almacén', type: 'error' },
            duration: 5000,
          });
          this.saving.set(false);
        },
      });
    } else {
      this.warehouseService.updateWarehouse((this.data.warehouse as Warehouse).id, formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Almacén actualizado correctamente', type: 'success' },
            duration: 3000,
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error.error?.message || 'Error al actualizar almacén',
              type: 'error',
            },
            duration: 5000,
          });
          this.saving.set(false);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onStatusChange(event: any): void {
    this.form.get('status')?.setValue(event.value, { emitEvent: false });
  }

  onBranchChange(event: any): void {
    this.form.get('billing_branch_id')?.setValue(event.value, { emitEvent: false });
  }
}

import { Component, Inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../../services/branch.service';
import { Branch, BranchWarehouse } from '../../models/branch.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { WarehouseDetailModalComponent } from '../warehouse-detail-modal/warehouse-detail-modal.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-branch-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule],
  templateUrl: './branch-modal.component.html',
  styleUrl: './branch-modal.component.scss'
})
export class BranchModalComponent implements OnInit {
  X = X;
  form: FormGroup;
  saving = signal(false);
  loading = signal(false);
  isNew = true;

  tabs: TabItem[] = [
    { id: 'sucursal', title: 'Sucursal' },
    { id: 'almacenes', title: 'Almacenes' }
  ];
  activeTab = 'sucursal';

  warehouses: BranchWarehouse[] = [];

  statusOptions = [
    { id: 1, name: 'Activo' },
    { id: 0, name: 'Inactivo' }
  ];

  statusSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BranchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fiscalConfigId: string; branchId: string | null }
  ) {
    this.isNew = !data.branchId;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.initializeSelectConfigs();
    if (this.data.branchId) {
      this.loadBranch();
    }
  }

  private loadBranch(): void {
    if (!this.data.branchId) return;

    this.loading.set(true);
    this.branchService.getBranch(this.data.fiscalConfigId, this.data.branchId).subscribe({
      next: (branch) => {
        this.form.patchValue(branch);
        this.warehouses = branch.warehouses ? [...branch.warehouses] : [];
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al cargar sucursal', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  private initializeSelectConfigs(): void {
    this.statusSelectConfig = {
      placeholder: 'Selecciona status',
      data: this.statusOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('status'),
      name_select: 'status'
    };
  }

  private createForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      country: ['México', [Validators.required, Validators.minLength(2)]],
      postal_code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: ['', [Validators.maxLength(50)]],
      status: [1]
    });
  }

  openWarehouseModal(warehouse?: BranchWarehouse, index?: number): void {
    const dialogRef = this.dialog.open(WarehouseDetailModalComponent, {
      width: '92vw',
      maxWidth: '680px',
      data: { warehouse: warehouse ? { ...warehouse } : null, nested: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (index !== undefined) {
        this.warehouses = this.warehouses.map((w, i) => (i === index ? result : w));
      } else {
        this.warehouses = [...this.warehouses, result];
      }
      this.cdr.detectChanges();
    });
  }

  removeWarehouse(index: number): void {
    this.warehouses = this.warehouses.filter((_, i) => i !== index);
  }

  getWarehouseStatusClass(status?: string): string {
    return status === 'active' ? 'status-active' : 'status-inactive';
  }

  getWarehouseStatusLabel(status?: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = { ...this.form.value };
    const phone = formValue.phone?.trim() || null;
    formValue.phone = phone;
    formValue.warehouses = this.warehouses;

    if (this.isNew) {
      this.branchService.createBranch(this.data.fiscalConfigId, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Sucursal creada correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear sucursal', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    } else {
      this.branchService.updateBranch(this.data.fiscalConfigId, this.data.branchId!, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Sucursal actualizada correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar sucursal', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onStatusChange(event: any): void {
    this.form.get('status')?.setValue(event.value, { emitEvent: false });
  }
}

import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosEquipmentService } from '../../services/pos-equipment.service';
import { BranchService } from '../../services/branch.service';
import {
  PosConfiguration,
  CreatePosConfigurationDto,
} from '../../models/pos-equipment.model';
import { Branch } from '../../models/branch.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-pos-equipment-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
  ],
  templateUrl: './pos-equipment-detail-modal.component.html',
  styleUrl: './pos-equipment-detail-modal.component.scss',
})
export class PosEquipmentDetailModalComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isEditMode = false;
  branches = signal<Branch[]>([]);

  statusOptions = [
    { id: 1, name: 'Activo' },
    { id: 0, name: 'Inactivo' },
  ];
  typeOptions = [
    { id: 'VENTAS', name: 'VENTAS' },
    { id: 'COBRANZA', name: 'COBRANZA' },
  ];

  constructor(
    private fb: FormBuilder,
    private posEquipmentService: PosEquipmentService,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PosEquipmentDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { configuration: PosConfiguration | null }
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      type: ['VENTAS', Validators.required],
      sucursal: ['', Validators.required],
      modelo: ['', [Validators.required, Validators.minLength(1)]],
      status: [1, Validators.required],
    });

  }

  ngOnInit(): void {
    this.isEditMode = !!this.data.configuration;
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        if (this.data.configuration) {
          this.populateForm(this.data.configuration);
        }
      },
      error: () => {
        if (this.data.configuration) {
          this.populateForm(this.data.configuration);
        }
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar sucursales', type: 'error' },
          duration: 3000,
        });
      },
    });
  }

  populateForm(configuration: PosConfiguration): void {
    const selectedBranchId =
      configuration.branch?.id ?? configuration.sucursal;

    this.form.patchValue({
      code: configuration.code,
      type: (configuration.type || 'VENTAS').toUpperCase(),
      sucursal: selectedBranchId,
      modelo: configuration.modelo,
      status: configuration.status,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message: 'Por favor completa todos los campos requeridos',
          type: 'error',
        },
        duration: 3000,
      });
      return;
    }

    // Defer state flip to next microtask to avoid NG0100
    // when the click output and disabled binding are checked
    // in the same change detection cycle.
    queueMicrotask(() => {
      this.isLoading = true;
    });
    const v = this.form.value;
    const dto: CreatePosConfigurationDto = {
      code: v.code,
      type: String(v.type || '').toUpperCase() as 'VENTAS' | 'COBRANZA',
      sucursal: v.sucursal,
      modelo: v.modelo,
      status: Number(v.status),
    };

    if (this.isEditMode) {
      this.posEquipmentService
        .updatePosConfiguration(this.data.configuration!.id, dto)
        .subscribe({
          next: (configuration) => {
            this.isLoading = false;
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: 'Equipo actualizado correctamente', type: 'success' },
              duration: 3000,
            });
            this.dialogRef.close(configuration);
          },
          error: (error) => {
            this.isLoading = false;
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: error.error?.message || 'Error al actualizar equipo',
                type: 'error',
              },
              duration: 5000,
            });
          },
        });
    } else {
      this.posEquipmentService.createPosConfiguration(dto).subscribe({
        next: (configuration) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Equipo creado correctamente', type: 'success' },
            duration: 3000,
          });
          this.dialogRef.close(configuration);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error.error?.message || 'Error al crear equipo',
              type: 'error',
            },
            duration: 5000,
          });
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

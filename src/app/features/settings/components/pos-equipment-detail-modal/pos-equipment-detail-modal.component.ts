import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosEquipmentService } from '../../services/pos-equipment.service';
import { WarehouseService } from '../../services/warehouse.service';
import { PosEquipment, CreatePosEquipmentDto } from '../../models/pos-equipment.model';
import { Warehouse } from '../../models/warehouse.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { LucideAngularModule } from 'lucide-angular';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-pos-equipment-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule],
  templateUrl: './pos-equipment-detail-modal.component.html',
  styleUrl: './pos-equipment-detail-modal.component.scss'
})
export class PosEquipmentDetailModalComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isEditMode = false;
  warehouses: Warehouse[] = [];
  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' }
  ];

  warehouseSelectConfig: any;
  statusSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private posEquipmentService: PosEquipmentService,
    private warehouseService: WarehouseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PosEquipmentDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipment: PosEquipment | null }
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      warehouse_id: ['', Validators.required],
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeSelectConfigs();
    this.loadWarehouses();
    if (this.data.equipment) {
      this.isEditMode = true;
      this.populateForm(this.data.equipment);
    }
  }

  private initializeSelectConfigs(): void {
    this.warehouseSelectConfig = {
      placeholder: 'Selecciona una sucursal',
      searchable: true,
      data: this.warehouses,
      value: 'id',
      label: 'name',
      option: 'name',
      form_control: this.form.get('warehouse_id'),
      name_select: 'warehouse_id'
    };

    this.statusSelectConfig = {
      placeholder: 'Selecciona un estado',
      searchable: false,
      data: this.statusOptions,
      value: 'id',
      label: 'name',
      option: 'name',
      form_control: this.form.get('status'),
      name_select: 'status'
    };
  }

  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe({
      next: (res) => {
        this.warehouses = res.data;
        // Update select config with new data
        this.warehouseSelectConfig = {
          placeholder: 'Selecciona una sucursal',
          searchable: true,
          data: res.data,
          value: 'id',
          label: 'name',
          option: 'name',
          form_control: this.form.get('warehouse_id'),
          name_select: 'warehouse_id'
        };
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar sucursales', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  populateForm(equipment: PosEquipment) {
    this.form.patchValue({
      name: equipment.name,
      warehouse_id: equipment.warehouse_id,
      status: equipment.status
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Por favor completa todos los campos requeridos', type: 'error' },
        duration: 3000
      });
      return;
    }

    this.isLoading = true;
    const formValue = this.form.value;
    const dto: CreatePosEquipmentDto = {
      name: formValue.name,
      warehouse_id: formValue.warehouse_id,
      status: formValue.status
    };

    if (this.isEditMode) {
      this.posEquipmentService.updatePosEquipment(this.data.equipment!.id, dto).subscribe({
        next: (equipment) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Equipo actualizado correctamente', type: 'success' },
            duration: 3000
          });
          this.dialogRef.close(equipment);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar equipo', type: 'error' },
            duration: 5000
          });
        }
      });
    } else {
      this.posEquipmentService.createPosEquipment(dto).subscribe({
        next: (equipment) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Equipo creado correctamente', type: 'success' },
            duration: 3000
          });
          this.dialogRef.close(equipment);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear equipo', type: 'error' },
            duration: 5000
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

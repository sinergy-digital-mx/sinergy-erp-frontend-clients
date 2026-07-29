import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X, ChevronDown } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { CreateTruckDto, Truck } from '../../models/truck.model';
import { TruckService } from '../../services/truck.service';

export interface TruckFormDialogData {
  truck: Truck | null;
}

@Component({
  selector: 'app-truck-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule],
  templateUrl: './truck-form-modal.component.html',
  styleUrl: './truck-form-modal.component.scss',
})
export class TruckFormModalComponent implements OnInit {
  readonly X = X;
  readonly ChevronDown = ChevronDown;

  form: FormGroup;
  saving = signal(false);
  isNew = true;
  showSct = signal(false);

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TruckFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TruckFormDialogData
  ) {
    this.isNew = !data.truck;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      placa: ['', [Validators.required, Validators.minLength(3)]],
      anio: [''],
      permiso_sct: [''],
      numero_permiso_sct: [''],
      tipo_auto_transporte: [''],
      aseguradora_rc: [''],
      poliza_rc: [''],
      subtipo_remolque1: [''],
      placa_remolque1: [''],
    });
  }

  ngOnInit(): void {
    if (this.data.truck) {
      this.form.patchValue(this.data.truck);
      const t = this.data.truck;
      if (
        t.permiso_sct ||
        t.numero_permiso_sct ||
        t.tipo_auto_transporte ||
        t.aseguradora_rc ||
        t.poliza_rc ||
        t.subtipo_remolque1 ||
        t.placa_remolque1
      ) {
        this.showSct.set(true);
      }
    }
  }

  toggleSct(): void {
    this.showSct.update((v) => !v);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: CreateTruckDto = {
      name: String(raw.name).trim(),
      placa: String(raw.placa).trim().toUpperCase(),
    };

    const optionalKeys: (keyof CreateTruckDto)[] = [
      'anio',
      'permiso_sct',
      'numero_permiso_sct',
      'tipo_auto_transporte',
      'aseguradora_rc',
      'poliza_rc',
      'subtipo_remolque1',
      'placa_remolque1',
    ];
    for (const key of optionalKeys) {
      const value = raw[key];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = String(value).trim();
      }
    }

    this.saving.set(true);
    const request$ = this.isNew
      ? this.truckService.createTruck(payload)
      : this.truckService.updateTruck(this.data.truck!.id, payload);

    request$.subscribe({
      next: (res) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: res.message || (this.isNew ? 'Camión creado' : 'Camión actualizado'),
            type: 'success',
          },
          duration: 4000,
        });
        this.dialogRef.close(res.truck);
      },
      error: (err) => {
        this.saving.set(false);
        const message =
          err?.error?.message ||
          err?.message ||
          (err?.status === 404 ? 'No encontrado' : 'Error al guardar el camión');
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message, type: 'error' },
          duration: 6000,
        });
      },
    });
  }
}

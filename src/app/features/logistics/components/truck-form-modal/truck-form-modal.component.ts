import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X, ChevronDown } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { AuthService } from '../../../../core/services/auth.service';
import { TRUCK_PERMISSIONS } from '../../config/permissions.config';
import { CreateTruckDto, Truck } from '../../models/truck.model';
import { TruckService } from '../../services/truck.service';

export interface TruckFormDialogData {
  truck: Truck | null;
}

const PHOTO_ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

@Component({
  selector: 'app-truck-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    TabComponent,
    HasPermissionDirective,
  ],
  templateUrl: './truck-form-modal.component.html',
  styleUrl: './truck-form-modal.component.scss',
})
export class TruckFormModalComponent implements OnInit {
  readonly X = X;
  readonly ChevronDown = ChevronDown;
  readonly permissions = TRUCK_PERMISSIONS;

  form: FormGroup;
  saving = signal(false);
  loading = signal(false);
  uploadingPhoto = signal(false);
  isNew = true;
  showSct = signal(false);
  activeTab = 'general';
  truckId: string | null = null;
  photoUrl: string | null = null;
  /** Si se creó/actualizó/subió foto, al cerrar devolvemos el camión para refrescar lista */
  private resultTruck: Truck | null = null;

  tabs: TabItem[] = [
    { id: 'general', title: 'General' },
    { id: 'fotos', title: 'Fotos', disabled: true },
  ];

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialogRef: MatDialogRef<TruckFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TruckFormDialogData
  ) {
    this.isNew = !data.truck;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      placa: ['', [Validators.required, Validators.minLength(3)]],
      serial_number: ['', [Validators.maxLength(50)]],
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
      this.truckId = this.data.truck.id;
      this.photoUrl = this.data.truck.photo?.trim() || null;
      this.setFotosEnabled(true);
      this.loadTruckDetail(this.data.truck.id);
    }
  }

  get canSaveGeneral(): boolean {
    return this.isNew
      ? this.authService.hasPermission(TRUCK_PERMISSIONS.create)
      : this.authService.hasPermission(TRUCK_PERMISSIONS.update);
  }

  get canUploadPhoto(): boolean {
    return !!this.truckId && this.authService.hasPermission(TRUCK_PERMISSIONS.update);
  }

  onTabChange(tabId: string): void {
    if (tabId === 'fotos' && !this.truckId) return;
    this.activeTab = tabId;
  }

  toggleSct(): void {
    this.showSct.update((v) => !v);
  }

  close(): void {
    this.dialogRef.close(this.resultTruck);
  }

  save(): void {
    if (!this.canSaveGeneral) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.activeTab = 'general';
      return;
    }

    const payload = this.buildPayload();
    this.saving.set(true);

    const request$ =
      this.isNew || !this.truckId
        ? this.truckService.createTruck(payload)
        : this.truckService.updateTruck(this.truckId, payload);

    request$.subscribe({
      next: (res) => {
        this.saving.set(false);
        const saved = res.truck;
        this.resultTruck = saved;
        this.applyTruck(saved);
        this.form.patchValue({ serial_number: saved.serial_number ?? '' });
        this.truckId = saved.id;
        const wasNew = this.isNew;
        this.isNew = false;
        this.setFotosEnabled(true);

        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: res.message || (wasNew ? 'Camión creado' : 'Camión actualizado'),
            type: 'success',
          },
          duration: 4000,
        });

        // Tras crear: habilitar Fotos y quedarse en el modal
        if (wasNew) {
          this.activeTab = 'fotos';
        }
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

  openPhotoPicker(input: HTMLInputElement): void {
    if (this.uploadingPhoto() || !this.canUploadPhoto) return;
    input.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';

    if (!file || !this.truckId || !this.canUploadPhoto) return;

    if (!PHOTO_ACCEPT.includes(file.type)) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Solo se permiten imágenes JPG, PNG o WebP', type: 'error' },
        duration: 5000,
      });
      return;
    }

    this.uploadingPhoto.set(true);
    this.truckService.uploadTruckPhoto(this.truckId, file).subscribe({
      next: (truck) => {
        this.uploadingPhoto.set(false);
        this.resultTruck = this.resultTruck ? { ...this.resultTruck, ...truck } : truck;
        this.photoUrl = truck.photo?.trim() || null;
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Foto del camión actualizada', type: 'success' },
          duration: 4000,
        });
      },
      error: (err) => {
        this.uploadingPhoto.set(false);
        const message =
          err?.error?.message || err?.message || 'No se pudo subir la foto del camión';
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message, type: 'error' },
          duration: 6000,
        });
      },
    });
  }

  private loadTruckDetail(id: string): void {
    this.loading.set(true);
    this.truckService.getTruck(id).subscribe({
      next: (truck) => {
        this.loading.set(false);
        this.applyTruck(truck);
      },
      error: () => {
        this.loading.set(false);
        if (this.data.truck) this.applyTruck(this.data.truck);
      },
    });
  }

  private applyTruck(truck: Truck): void {
    const serial = truck.serial_number;
    this.form.patchValue({
      name: truck.name ?? '',
      placa: truck.placa ?? '',
      serial_number: serial == null ? '' : String(serial),
      anio: truck.anio ?? '',
      permiso_sct: truck.permiso_sct ?? '',
      numero_permiso_sct: truck.numero_permiso_sct ?? '',
      tipo_auto_transporte: truck.tipo_auto_transporte ?? '',
      aseguradora_rc: truck.aseguradora_rc ?? '',
      poliza_rc: truck.poliza_rc ?? '',
      subtipo_remolque1: truck.subtipo_remolque1 ?? '',
      placa_remolque1: truck.placa_remolque1 ?? '',
    });
    this.photoUrl = truck.photo?.trim() || null;
    if (
      truck.permiso_sct ||
      truck.numero_permiso_sct ||
      truck.tipo_auto_transporte ||
      truck.aseguradora_rc ||
      truck.poliza_rc ||
      truck.subtipo_remolque1 ||
      truck.placa_remolque1
    ) {
      this.showSct.set(true);
    }
  }

  private setFotosEnabled(enabled: boolean): void {
    this.tabs = this.tabs.map((tab) =>
      tab.id === 'fotos' ? { ...tab, disabled: !enabled } : tab
    );
  }

  private buildPayload(): CreateTruckDto {
    const raw = this.form.getRawValue();
    const serial = String(raw.serial_number ?? '').trim();
    const payload: CreateTruckDto = {
      name: String(raw.name).trim(),
      placa: String(raw.placa).trim().toUpperCase(),
      serial_number: serial || null,
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
    return payload;
  }
}

import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorService } from '../../services/vendor.service';
import { Vendor, CreateVendorDto } from '../../models/vendor.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-vendor-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule],
  templateUrl: './vendor-detail-modal.component.html',
  styleUrl: './vendor-detail-modal.component.scss'
})
export class VendorDetailModalComponent {
  X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;

  personaTypeOptions = [
    { id: 'Persona Física', name: 'Persona Física' },
    { id: 'Persona Moral', name: 'Persona Moral' }
  ];

  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' }
  ];

  countryOptions = [
    { id: 'México', name: 'México' },
    { id: 'Estados Unidos', name: 'Estados Unidos' },
    { id: 'Canadá', name: 'Canadá' },
    { id: 'España', name: 'España' },
    { id: 'Argentina', name: 'Argentina' },
    { id: 'Brasil', name: 'Brasil' },
    { id: 'Chile', name: 'Chile' },
    { id: 'Colombia', name: 'Colombia' },
    { id: 'Perú', name: 'Perú' },
    { id: 'Venezuela', name: 'Venezuela' },
    { id: 'Guatemala', name: 'Guatemala' },
    { id: 'Honduras', name: 'Honduras' },
    { id: 'El Salvador', name: 'El Salvador' },
    { id: 'Nicaragua', name: 'Nicaragua' },
    { id: 'Costa Rica', name: 'Costa Rica' },
    { id: 'Panamá', name: 'Panamá' },
    { id: 'Cuba', name: 'Cuba' },
    { id: 'República Dominicana', name: 'República Dominicana' },
    { id: 'Puerto Rico', name: 'Puerto Rico' }
  ];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VendorDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor | null }
  ) {
    this.isNew = !data.vendor;
    this.form = this.createForm();
    
    if (data.vendor) {
      this.form.patchValue(data.vendor);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company_name: [''],
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: [''],
      razon_social: [''],
      rfc: ['', [Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      persona_type: ['Persona Moral'],
      status: ['active']
    });
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = this.form.value;

    if (this.isNew) {
      this.vendorService.createVendor(formValue).subscribe({
        next: (vendor) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Proveedor creado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(vendor);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear proveedor', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    } else {
      this.vendorService.updateVendor(this.data.vendor!.id, formValue).subscribe({
        next: (vendor) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Proveedor actualizado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(vendor);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar proveedor', type: 'error' },
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
}

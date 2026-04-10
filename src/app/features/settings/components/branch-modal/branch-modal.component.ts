import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-branch-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule],
  templateUrl: './branch-modal.component.html',
  styleUrl: './branch-modal.component.scss'
})
export class BranchModalComponent implements OnInit {
  X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;

  statusOptions = [
    { id: 1, name: 'Activo' },
    { id: 0, name: 'Inactivo' }
  ];

  statusSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BranchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fiscalConfigId: string; branch: Branch | null }
  ) {
    this.isNew = !data.branch;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.initializeSelectConfigs();
    if (this.data.branch) {
      this.form.patchValue(this.data.branch);
    }
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
      status: [1]
    });
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = this.form.value;

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
      this.branchService.updateBranch(this.data.fiscalConfigId, this.data.branch!.id, formValue).subscribe({
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

import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private interceptorService: InterceptorService
  ) {
    this.form = this.fb.group({
      first_name: [this.data.user.first_name || '', Validators.required],
      last_name: [this.data.user.last_name || '', Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      phone: [this.data.user.phone || '']
    });
  }

  saveUser() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Por favor completa todos los campos requeridos'
      });
      return;
    }

    this.saving.set(true);

    this.userService.updateUser(this.data.user.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Usuario actualizado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error.error?.message || 'Error al actualizar el usuario'
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

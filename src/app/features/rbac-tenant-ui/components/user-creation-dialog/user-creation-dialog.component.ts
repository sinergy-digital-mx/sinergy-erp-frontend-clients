import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { AuthService } from '../../../../core/services/auth.service';

/**
 * UserCreationDialogComponent
 * Modal dialog for creating new users
 * Similar to LeadEditDialog pattern
 */
@Component({
  selector: 'app-user-creation-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-creation-dialog.component.html',
  styleUrl: './user-creation-dialog.component.scss'
})
export class UserCreationDialogComponent {
  loading = signal(false);
  created = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(this.created());
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Las contraseñas no coinciden', type: 'error' },
        duration: 3000
      });
      return;
    }

    this.loading.set(true);

    const payload = {
      tenant_id: this.authService.user_info.tenant_id,
      first_name: this.form.get('first_name')?.value,
      last_name: this.form.get('last_name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      password: password,
      status_id: 1
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.created.set(true);
        this.loading.set(false);

        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Usuario creado exitosamente', type: 'success' },
          duration: 3000
        });

        this.closeDialog();
      },
      error: (error) => {
        this.loading.set(false);

        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al crear el usuario', type: 'error' },
          duration: 5000
        });
      }
    });
  }
}

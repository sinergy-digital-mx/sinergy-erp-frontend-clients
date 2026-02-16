import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CloseButtonComponent } from '../../../../core/components/close-button/close-button.component';
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
  imports: [CommonModule, InputComponent, ButtonComponent, CloseButtonComponent, ReactiveFormsModule],
  templateUrl: './user-creation-dialog.component.html',
  styleUrl: './user-creation-dialog.component.scss'
})
export class UserCreationDialogComponent {
  loading = signal(false);
  created = signal(false);
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
      phone: ['']
    });
  }

  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(this.created());
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      tenant_id: this.authService.user_info.tenant_id,
      ...this.form.value
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.created.set(true);
        this.loading.set(false);

        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'User created successfully', type: 'success' },
          duration: 3000
        });

        this.closeDialog();
      },
      error: (error) => {
        this.loading.set(false);

        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Failed to create user', type: 'error' },
          duration: 5000
        });
      }
    });
  }
}

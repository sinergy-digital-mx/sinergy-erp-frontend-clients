import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { Role } from '../../models';

@Component({
  selector: 'app-role-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Crear Nuevo Rol</h2>
        
        <form [formGroup]="roleForm" (ngSubmit)="createRole()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Rol *
            </label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Gerente de Ventas">
            @if (roleForm.get('name')?.invalid && roleForm.get('name')?.touched) {
              <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              formControlName="description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción del rol (opcional)">
            </textarea>
          </div>

          <div class="flex gap-3 justify-end pt-4">
            <app-button
              text="Cancelar"
              custom_class="btn_secondary"
              type="button"
              (clicked)="cancel()">
            </app-button>
            
            <app-button
              text="Crear Rol"
              custom_class="btn_primary"
              type="submit"
              [loading]="saving"
              [disabled]="roleForm.invalid || saving"
              (clicked)="createRole()">
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RoleCreateDialogComponent {
  @Output() roleCreated = new EventEmitter<Role>();
  @Output() cancelled = new EventEmitter<void>();

  roleForm: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  createRole() {
    if (this.roleForm.invalid || this.saving) return;

    this.saving = true;

    const formValue = this.roleForm.value;
    const roleDefinition = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || '',
      permission_ids: []
    };

    this.roleService.createRole(roleDefinition).subscribe({
      next: (newRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: 'Rol creado correctamente', 
            type: 'success' 
          },
          duration: 3000
        });
        
        this.saving = false;
        this.roleCreated.emit(newRole);
      },
      error: (error) => {
        console.error('Error creating role:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: error.error?.message || 'Error al crear el rol', 
            type: 'error' 
          },
          duration: 5000
        });
        this.saving = false;
      }
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}

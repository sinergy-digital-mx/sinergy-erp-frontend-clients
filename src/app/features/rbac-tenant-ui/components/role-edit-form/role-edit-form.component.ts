import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Role, RoleDefinition } from '../../models';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-role-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="role-edit-form">
      @if (isEditing) {
        <!-- Edit Mode -->
        <form [formGroup]="roleForm" (ngSubmit)="saveRole()" class="space-y-4">
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

          <div class="flex gap-3">
            <app-button
              text="Guardar"
              custom_class="btn_primary"
              type="submit"
              [loading]="saving"
              [disabled]="roleForm.invalid || saving"
              (clicked)="saveRole()">
            </app-button>
            
            <app-button
              text="Cancelar"
              custom_class="btn_secondary"
              type="button"
              (clicked)="cancelEdit()">
            </app-button>
          </div>
        </form>
      } @else {
        <!-- View Mode -->
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900">{{ role?.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ role?.description || 'Sin descripción' }}</p>
          </div>
          
          <div class="flex items-center gap-2 ml-4">
            <button
              (click)="startEdit()"
              class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Editar rol">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            
            <button
              (click)="confirmDelete()"
              class="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Eliminar rol">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteConfirm) {
        <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="shrink-0">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">Eliminar Rol</h3>
              </div>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-600">
                ¿Estás seguro de que deseas eliminar el rol <strong>"{{ role?.name }}"</strong>?
              </p>
              <p class="text-sm text-gray-600 mt-2">
                Esta acción no se puede deshacer y todos los usuarios asignados a este rol perderán sus permisos.
              </p>
            </div>
            
            <div class="flex gap-3 justify-end">
              <app-button
                text="Cancelar"
                custom_class="btn_secondary"
                (clicked)="cancelDelete()">
              </app-button>
              
              <app-button
                text="Eliminar"
                custom_class="btn_danger"
                [loading]="deleting"
                [disabled]="deleting"
                (clicked)="deleteRole()">
              </app-button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class RoleEditFormComponent implements OnInit, OnChanges {
  @Input() role: Role | null = null;
  @Output() roleUpdated = new EventEmitter<Role>();
  @Output() roleDeleted = new EventEmitter<string>();

  roleForm: FormGroup;
  isEditing = false;
  saving = false;
  showDeleteConfirm = false;
  deleting = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.roleForm = this.createForm();
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges() {
    this.initializeForm();
    this.isEditing = false; // Reset edit mode when role changes
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  private initializeForm() {
    if (this.role) {
      this.roleForm.patchValue({
        name: this.role.name || '',
        description: this.role.description || ''
      });
    }
  }

  startEdit() {
    this.isEditing = true;
    this.initializeForm(); // Reset form with current values
  }

  cancelEdit() {
    this.isEditing = false;
    this.initializeForm(); // Reset form to original values
  }

  saveRole() {
    if (!this.role || this.roleForm.invalid || this.saving) return;

    this.saving = true;

    const formValue = this.roleForm.value;
    const roleDefinition: RoleDefinition = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || '',
      permission_ids: this.role.permissions || []
    };

    this.roleService.updateRole(this.role.id, roleDefinition).subscribe({
      next: (updatedRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: 'Rol actualizado correctamente', 
            type: 'success' 
          },
          duration: 3000
        });
        
        this.isEditing = false;
        this.saving = false;
        this.roleUpdated.emit(updatedRole);
      },
      error: (error) => {
        console.error('Error updating role:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: error.error?.message || 'Error al actualizar el rol', 
            type: 'error' 
          },
          duration: 5000
        });
        this.saving = false;
      }
    });
  }

  confirmDelete() {
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  deleteRole() {
    if (!this.role || this.deleting) return;

    this.deleting = true;

    this.roleService.deleteRole(this.role.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: 'Rol eliminado correctamente', 
            type: 'success' 
          },
          duration: 3000
        });
        
        this.showDeleteConfirm = false;
        this.deleting = false;
        this.roleDeleted.emit(this.role!.id);
      },
      error: (error) => {
        console.error('Error deleting role:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: error.error?.message || 'Error al eliminar el rol', 
            type: 'error' 
          },
          duration: 5000
        });
        this.deleting = false;
      }
    });
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-uoms-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './uoms-dialog.component.html',
  styleUrl: './uoms-dialog.component.scss'
})
export class UomsDialogComponent implements OnInit {
  form: FormGroup;
  uoms = signal<any[]>([]);
  saving = signal(false);
  isCreating = signal(false);
  editingUomId = signal<string | null>(null);
  editingUomForm: { [key: string]: any } = {};

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UomsDialogComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadUOMCatalog();
  }

  private loadUOMCatalog(): void {
    this.productService.getUOMCatalog().subscribe({
      next: (data) => {
        this.uoms.set(data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar catálogo de UoMs', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  startCreating(): void {
    this.isCreating.set(true);
    this.form.reset();
  }

  cancelCreating(): void {
    this.isCreating.set(false);
    this.form.reset();
  }

  saveUOM(): void {
    if (!this.form.valid) return;
    this.saving.set(true);
    
    const uomData = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value || ''
    };

    this.productService.createUOMCatalogItem(uomData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Unidad de medida creada exitosamente', type: 'success' },
          duration: 3000
        });
        this.isCreating.set(false);
        this.form.reset();
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al crear unidad de medida', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  startEditing(uom: any): void {
    this.editingUomId.set(uom.id);
    this.editingUomForm[uom.id] = { name: uom.name, description: uom.description };
  }

  cancelEditing(): void {
    this.editingUomId.set(null);
    this.editingUomForm = {};
  }

  saveEdit(uom: any): void {
    if (!this.editingUomForm[uom.id]?.name) return;
    this.saving.set(true);

    const updateData = {
      name: this.editingUomForm[uom.id].name,
      description: this.editingUomForm[uom.id].description || ''
    };

    this.productService.updateUOMCatalogItem(uom.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Unidad de medida actualizada exitosamente', type: 'success' },
          duration: 3000
        });
        this.editingUomId.set(null);
        this.editingUomForm = {};
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al actualizar unidad de medida', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  deleteUOM(uom: any): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta unidad de medida?')) return;
    this.saving.set(true);

    this.productService.deleteUOMCatalogItem(uom.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Unidad de medida eliminada exitosamente', type: 'success' },
          duration: 3000
        });
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al eliminar unidad de medida', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

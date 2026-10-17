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
  editingDraft = signal<{ name: string; description: string }>({ name: '', description: '' });

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
    this.productService.getUOMCatalog({ limit: 500 }).subscribe({
      next: (data) => {
        this.uoms.set(data);
      },
      error: (error) => {
        this.notify(this.errorText(error, 'Error al cargar el catálogo de unidades'), 'error');
      }
    });
  }

  startCreating(): void {
    this.editingUomId.set(null);
    this.isCreating.set(true);
    this.form.reset();
  }

  cancelCreating(): void {
    this.isCreating.set(false);
    this.form.reset();
  }

  saveUOM(): void {
    if (this.saving() || this.form.invalid) return;
    const uomData = {
      name: String(this.form.get('name')?.value ?? '').trim(),
      description: String(this.form.get('description')?.value ?? '').trim()
    };
    if (!uomData.name) return;
    this.saving.set(true);

    this.productService.createUOMCatalogItem(uomData).subscribe({
      next: () => {
        this.notify('Unidad de medida creada', 'success');
        this.isCreating.set(false);
        this.form.reset();
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: (error) => {
        this.notify(this.errorText(error, 'Error al crear la unidad de medida'), 'error');
        this.saving.set(false);
      }
    });
  }

  startEditing(uom: any): void {
    this.isCreating.set(false);
    this.editingUomId.set(uom.id);
    this.editingDraft.set({
      name: uom.name ?? '',
      description: uom.description ?? ''
    });
  }

  cancelEditing(): void {
    this.editingUomId.set(null);
  }

  updateDraft(field: 'name' | 'description', value: string): void {
    this.editingDraft.update((draft) => ({ ...draft, [field]: value }));
  }

  saveEdit(uom: any): void {
    const draft = this.editingDraft();
    const name = draft.name.trim();
    if (!name) return;
    this.saving.set(true);

    const updateData = {
      name,
      description: draft.description.trim()
    };

    this.productService.updateUOMCatalogItem(uom.id, updateData).subscribe({
      next: () => {
        this.notify('Unidad de medida actualizada', 'success');
        this.editingUomId.set(null);
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: (error) => {
        this.notify(this.errorText(error, 'Error al actualizar la unidad de medida'), 'error');
        this.saving.set(false);
      }
    });
  }

  deleteUOM(uom: any): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta unidad de medida?')) return;
    this.saving.set(true);

    this.productService.deleteUOMCatalogItem(uom.id).subscribe({
      next: () => {
        this.notify('Unidad de medida eliminada', 'success');
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: (error) => {
        this.notify(this.errorText(error, 'Error al eliminar la unidad de medida'), 'error');
        this.saving.set(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  private notify(message: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 4000
    });
  }

  private errorText(error: any, fallback: string): string {
    const message = error?.error?.message ?? error?.message;
    if (Array.isArray(message)) return message.join('. ');
    if (typeof message === 'string' && message.trim() && message !== 'Http failure response for') {
      return message;
    }
    return fallback;
  }
}

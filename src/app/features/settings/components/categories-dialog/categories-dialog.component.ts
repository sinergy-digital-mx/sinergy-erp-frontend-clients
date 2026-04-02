import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-categories-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categories-dialog.component.html',
  styleUrl: './categories-dialog.component.scss'
})
export class CategoriesDialogComponent implements OnInit {
  form: FormGroup;
  categories = signal<any[]>([]);
  subcategories = signal<any[]>([]);
  selectedCategoryId = signal<string | null>(null);
  saving = signal(false);
  activeTab = signal<'categories' | 'subcategories'>('categories');
  isCreating = signal(false);
  isCreatingSubcategory = signal(false);
  editingCategoryId = signal<string | null>(null);
  editingSubcategoryId = signal<string | null>(null);
  editingCategoryForm: { [key: string]: any } = {};
  editingSubcategoryForm: { [key: string]: any } = {};

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoriesDialogComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar categorías', type: 'error' },
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

  saveCategory(): void {
    if (!this.form.valid) return;
    this.saving.set(true);
    
    const categoryData = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value || ''
    };

    this.productService.createCategory(categoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Categoría creada exitosamente', type: 'success' },
          duration: 3000
        });
        this.isCreating.set(false);
        this.form.reset();
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al crear categoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  startEditingCategory(category: any): void {
    this.editingCategoryId.set(category.id);
    this.editingCategoryForm[category.id] = { name: category.name, description: category.description };
  }

  cancelEditingCategory(): void {
    this.editingCategoryId.set(null);
    this.editingCategoryForm = {};
  }

  saveEditCategory(category: any): void {
    if (!this.editingCategoryForm[category.id]?.name) return;
    this.saving.set(true);

    const updateData = {
      name: this.editingCategoryForm[category.id].name,
      description: this.editingCategoryForm[category.id].description || ''
    };

    this.productService.updateCategory(category.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Categoría actualizada exitosamente', type: 'success' },
          duration: 3000
        });
        this.editingCategoryId.set(null);
        this.editingCategoryForm = {};
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al actualizar categoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  deleteCategory(category: any): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;
    this.saving.set(true);

    this.productService.deleteCategory(category.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Categoría eliminada exitosamente', type: 'success' },
          duration: 3000
        });
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al eliminar categoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  startCreatingSubcategory(): void {
    this.isCreatingSubcategory.set(true);
    this.form.reset();
  }

  cancelCreatingSubcategory(): void {
    this.isCreatingSubcategory.set(false);
    this.form.reset();
  }

  saveSubcategory(): void {
    if (!this.form.valid || !this.selectedCategoryId()) return;
    this.saving.set(true);
    
    const subcategoryData = {
      category_id: this.selectedCategoryId(),
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value || ''
    };

    this.productService.createSubCategory(subcategoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Subcategoría creada exitosamente', type: 'success' },
          duration: 3000
        });
        this.isCreatingSubcategory.set(false);
        this.form.reset();
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId()!);
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al crear subcategoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  startEditingSubcategory(subcategory: any): void {
    this.editingSubcategoryId.set(subcategory.id);
    this.editingSubcategoryForm[subcategory.id] = { name: subcategory.name, description: subcategory.description };
  }

  cancelEditingSubcategory(): void {
    this.editingSubcategoryId.set(null);
    this.editingSubcategoryForm = {};
  }

  saveEditSubcategory(subcategory: any): void {
    if (!this.editingSubcategoryForm[subcategory.id]?.name) return;
    this.saving.set(true);

    const updateData = {
      name: this.editingSubcategoryForm[subcategory.id].name,
      description: this.editingSubcategoryForm[subcategory.id].description || ''
    };

    this.productService.updateSubCategory(subcategory.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Subcategoría actualizada exitosamente', type: 'success' },
          duration: 3000
        });
        this.editingSubcategoryId.set(null);
        this.editingSubcategoryForm = {};
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId()!);
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al actualizar subcategoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  deleteSubcategory(subcategory: any): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta subcategoría?')) return;
    this.saving.set(true);

    this.productService.deleteSubCategory(subcategory.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Subcategoría eliminada exitosamente', type: 'success' },
          duration: 3000
        });
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId()!);
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al eliminar subcategoría', type: 'error' },
          duration: 3000
        });
        this.saving.set(false);
      }
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryId.set(categoryId);
    this.activeTab.set('subcategories');
    this.loadSubcategories(categoryId);
  }

  private loadSubcategories(categoryId: string): void {
    this.productService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        this.subcategories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar subcategorías', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

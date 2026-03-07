import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-categories-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

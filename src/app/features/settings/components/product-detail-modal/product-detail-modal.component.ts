import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product, CreateProductDto, Category, SubCategory } from '../../models/product.model';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.scss'
})
export class ProductDetailModalComponent implements OnInit {
  form: FormGroup;
  saving = signal(false);
  isNew = true;
  categories = signal<Category[]>([]);
  subcategories = signal<SubCategory[]>([]);
  loadingCategories = signal(false);
  loadingSubcategories = signal(false);
  selectedTabIndex = signal(0);
  uoms = signal<any[]>([]);
  editingUomId = signal<string | null>(null);
  editingUomForm: FormGroup;
  catalogUoms = signal<any[]>([]);
  selectedCatalogUomId = signal<string | null>(null);
  loadingCatalog = signal(false);
  relationships = signal<any[]>([]);
  loadingRelationships = signal(false);
  creatingRelationship = signal(false);
  relationshipForm: FormGroup;
  newRelationshipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {
    this.isNew = !data.product;
    this.form = this.createForm();
    this.newRelationshipForm = this.fb.group({
      source_uom_id: ['', Validators.required],
      target_uom_id: ['', Validators.required],
      conversion_factor: ['', [Validators.required, Validators.min(0.001)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    if (this.data.product) {
      // Load full product details to get UOMs
      this.productService.getProduct(this.data.product.id).subscribe({
        next: (fullProduct) => {
          this.form.patchValue(fullProduct);
          if (fullProduct.category_id) {
            this.loadSubcategories(fullProduct.category_id);
          }
          this.loadUOMs(fullProduct);
        },
        error: () => {
          // Fallback to provided product if fetch fails
          this.form.patchValue(this.data.product);
          if (this.data.product.category_id) {
            this.loadSubcategories(this.data.product.category_id);
          }
        }
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      sku: ['', [Validators.required], [this.skuUniqueValidator.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      category_id: [''],
      subcategory_id: ['']
    });
  }

  private loadCategories(): void {
    this.loadingCategories.set(true);
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        this.loadingCategories.set(false);
      },
      error: () => {
        this.loadingCategories.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar categorías', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  private loadSubcategories(categoryId: string): void {
    this.loadingSubcategories.set(true);
    this.subcategories.set([]);
    this.form.get('subcategory_id')?.setValue('');
    
    this.productService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        this.subcategories.set(res.data);
        this.loadingSubcategories.set(false);
      },
      error: () => {
        this.loadingSubcategories.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar subcategorías', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  onCategoryChange(categoryId: string): void {
    if (categoryId) {
      this.loadSubcategories(categoryId);
    } else {
      this.subcategories.set([]);
      this.form.get('subcategory_id')?.setValue('');
    }
  }

  private skuUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    // If editing and SKU hasn't changed, don't validate
    if (!this.isNew && control.value === this.data.product?.sku) {
      return of(null);
    }

    return this.productService.getProducts({ search: control.value }).pipe(
      debounceTime(300),
      first(),
      map(response => {
        const exists = response.data.some(p => p.sku === control.value);
        return exists ? { skuExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = this.form.value;

    if (this.isNew) {
      this.productService.createProduct(formValue).subscribe({
        next: (product) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Producto creado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(product);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear producto', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    } else {
      this.productService.updateProduct(this.data.product!.id, formValue).subscribe({
        next: (product) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Producto actualizado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(product);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar producto', type: 'error' },
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

  private loadUOMs(product: any): void {
    if (product.uoms && product.uoms.length > 0) {
      this.uoms.set(product.uoms);
    }
    this.loadCatalogUoMs();
  }

  private loadCatalogUoMs(): void {
    this.loadingCatalog.set(true);
    this.productService.getUOMCatalog().subscribe({
      next: (data) => {
        this.catalogUoms.set(data);
        this.loadingCatalog.set(false);
      },
      error: () => {
        this.loadingCatalog.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar catálogo de UoMs', type: 'error' },
          duration: 3000
        });
      }
    });
    this.loadRelationships();
  }

  private loadRelationships(): void {
    if (!this.data.product) return;
    this.loadingRelationships.set(true);
    this.productService.getUOMRelationships(this.data.product.id).subscribe({
      next: (data) => {
        this.relationships.set(data);
        this.loadingRelationships.set(false);
      },
      error: () => {
        this.loadingRelationships.set(false);
      }
    });
  }

  assignSingleUoM(): void {
    if (!this.data.product || !this.selectedCatalogUomId()) return;

    const catalogUom = this.catalogUoms().find(u => u.id === this.selectedCatalogUomId());
    if (!catalogUom) return;

    this.saving.set(true);
    this.productService.createUOM(this.data.product.id, {
      uom_catalog_id: this.selectedCatalogUomId(),
      name: catalogUom.name
    }).subscribe({
      next: (newUom) => {
        this.uoms.set([...this.uoms(), newUom]);
        this.selectedCatalogUomId.set(null);
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Unidad asignada correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al asignar unidad', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  createRelationship(): void {
    if (!this.newRelationshipForm.valid || !this.data.product) return;

    const { source_uom_id, target_uom_id, conversion_factor } = this.newRelationshipForm.value;

    if (source_uom_id === target_uom_id) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'No puedes crear una relación con la misma unidad', type: 'error' },
        duration: 3000
      });
      return;
    }

    this.creatingRelationship.set(true);
    this.productService.createUOMRelationship(this.data.product.id, {
      source_uom_id,
      target_uom_id,
      conversion_factor
    }).subscribe({
      next: () => {
        this.newRelationshipForm.reset();
        this.loadRelationships();
        this.creatingRelationship.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Relación creada correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: () => {
        this.creatingRelationship.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al crear relación', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  deleteRelationship(relationshipId: string): void {
    if (!this.data.product) return;
    if (!confirm('¿Eliminar esta relación de conversión?')) return;

    this.productService.deleteUOMRelationship(this.data.product.id, relationshipId).subscribe({
      next: () => {
        this.loadRelationships();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Relación eliminada correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al eliminar relación', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  editUOM(uom: any): void {
    this.editingUomId.set(uom.id);
    this.editingUomForm = this.fb.group({
      name: [uom.name, Validators.required],
      code: [uom.code, Validators.required]
    });
  }

  saveUOMEdit(uom: any): void {
    if (!this.editingUomForm.valid) return;

    this.productService.updateUOM(this.data.product.id, uom.id, this.editingUomForm.value).subscribe({
      next: (updated) => {
        const index = this.uoms().findIndex(u => u.id === uom.id);
        if (index !== -1) {
          const updated_uoms = [...this.uoms()];
          updated_uoms[index] = updated;
          this.uoms.set(updated_uoms);
        }
        this.editingUomId.set(null);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'UOM actualizado correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al actualizar UOM', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  cancelUOMEdit(): void {
    this.editingUomId.set(null);
  }

  deleteUOM(uom: any): void {
    if (!confirm(`¿Eliminar la unidad de medida "${uom.name}"?`)) return;

    this.productService.deleteUOM(this.data.product.id, uom.id).subscribe({
      next: () => {
        this.uoms.set(this.uoms().filter(u => u.id !== uom.id));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'UOM eliminado correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al eliminar UOM', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} es requerido`;
    }
    if (control.errors['minlength']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['skuExists']) {
      return 'Este SKU ya existe';
    }
    return '';
  }
}

import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';
import { UomsDialogComponent } from '../uoms-dialog/uoms-dialog.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'SKU', prop: 'sku', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 200 },
      { name: 'Descripción', prop: 'description', sortable: false, canAutoResize: true, width: 250 },
      { name: 'Detalle', prop: 'detail', sortable: false, canAutoResize: true, width: 100 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron productos' },
    columnMode: 'force',
    reorderable: false,
  });

  products = signal<Product[]>([]);
  ArrowRight = ArrowRight;
  search = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.table_config.update(c => ({ ...c, loading: true }));
    
    const params: any = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    
    this.productService.getProducts(params).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.table_config.update(c => ({
          ...c,
          rows: res.data,
          totalResults: res.total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.table_config.update(c => ({ ...c, loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar productos', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.loadProducts();
  }

  openCreateProductModal() {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '600px',
      height: '650px',
      disableClose: false,
      data: { product: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  viewDetail(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '600px',
      height: '650px',
      disableClose: false,
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: Product, event: Event) {
    event.stopPropagation();
    
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Producto',
        message: `¿Estás seguro de que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: 'Producto eliminado correctamente', type: 'success' },
              duration: 3000
            });
            this.loadProducts();
          },
          error: (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || 'Error al eliminar producto', type: 'error' },
              duration: 5000
            });
          }
        });
      }
    });
  }

  openCategoriesDialog() {
    this.dialog.open(CategoriesDialogComponent, {
      width: '500px',
      height: '600px',
      disableClose: false
    });
  }

  openUOMsDialog() {
    this.dialog.open(UomsDialogComponent, {
      width: '400px',
      disableClose: false
    });
  }
}

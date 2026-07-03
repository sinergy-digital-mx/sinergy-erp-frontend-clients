import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, tap, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';
import { UomsDialogComponent } from '../uoms-dialog/uoms-dialog.component';
import { PriceListsDialogComponent } from '../price-lists-dialog/price-lists-dialog';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    FilterClearButtonComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 200 },
      { name: 'SKU', prop: 'sku', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Categoría', prop: 'category', sortable: false, canAutoResize: true, width: 130 },
      { name: 'Subcategoría', prop: 'subcategory', sortable: false, canAutoResize: true, width: 130 },
    ],
    externalPaging: true,
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
  currentSort: ISortEvent | null = null;
  private destroy$ = new Subject<void>();
  private lastQueryParams = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      filter((query) => {
        const queryString = JSON.stringify(query);
        if (queryString === this.lastQueryParams) {
          return false;
        }
        this.lastQueryParams = queryString;
        return true;
      }),
      tap((query) => {
        this.search = query?.['search'] ?? '';

        const page = query?.['page'] ? Number(query['page']) : 1;
        const limit = query?.['limit'] ? Number(query['limit']) : 20;

        this.table_config.update(c => ({
          ...c,
          page: Number.isNaN(page) ? 1 : page,
          limit: Number.isNaN(limit) ? 20 : limit,
        }));
      }),
      switchMap(() => {
        this.table_config.update(c => ({ ...c, loading: true }));
        return this.productService.getProducts(this.buildQueryParams());
      })
    ).subscribe({
      next: (res) => this.applyProductsResponse(res),
      error: (error) => this.handleLoadError(error),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.table_config.update(c => ({ ...c, loading: true }));
    this.productService.getProducts(this.buildQueryParams()).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => this.applyProductsResponse(res),
      error: (error) => this.handleLoadError(error),
    });
  }

  private buildQueryParams() {
    const config = this.table_config();
    const page = Number.isNaN(config.page) ? 1 : config.page;
    const limit = Number.isNaN(config.limit) ? 20 : config.limit;
    const params: Record<string, string | number> = { page, limit };

    const normalizedSearch = this.search?.trim();
    if (normalizedSearch) {
      // ext:ERP-123 => filtra por external_sku exacto
      if (normalizedSearch.toLowerCase().startsWith('ext:')) {
        const externalSku = normalizedSearch.slice(4).trim();
        if (externalSku) {
          params['external_sku'] = externalSku;
        }
      } else {
        params['search'] = normalizedSearch;
      }
    }

    return params;
  }

  private applyProductsResponse(res: { data: Product[]; total: number; page: number; limit: number; totalPages: number; hasNext: boolean }) {
    this.table_config.update(c => ({
      ...c,
      rows: res.data ?? [],
      totalResults: res.total ?? 0,
      page: res.page ?? c.page,
      limit: res.limit ?? c.limit,
      hasNext: res.hasNext ?? (res.page < res.totalPages),
      loading: false,
    }));
  }

  private handleLoadError(error: unknown) {
    console.error('Error loading products:', error);
    this.table_config.update(c => ({
      ...c,
      rows: [],
      totalResults: 0,
      hasNext: false,
      loading: false,
    }));
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: 'Error al cargar productos', type: 'error' },
      duration: 5000
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  get hasActiveFilters(): boolean {
    return !!this.search?.trim();
  }

  clearFilters(): void {
    this.onSearchChange('');
  }

  onSortChange(event: ISortEvent) {
    this.currentSort = event;
    this.sortProducts();
  }

  private sortProducts() {
    if (!this.currentSort || !this.currentSort.direction) {
      // No sorting, reload original data
      this.loadProducts();
      return;
    }

    const sortedRows = [...this.table_config().rows];
    const { prop } = this.currentSort.column;
    const { direction } = this.currentSort;

    sortedRows.sort((a: any, b: any) => {
      const aValue = a[prop];
      const bValue = b[prop];

      // Handle null values - place them at the end
      if (aValue === null || aValue === undefined) {
        return 1;
      }
      if (bValue === null || bValue === undefined) {
        return -1;
      }

      // Compare values
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.table_config.update(c => ({
      ...c,
      rows: sortedRows
    }));
  }



  openCreateProductModal() {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: false,
      data: { product: null, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  viewDetail(event: any) {
    const product = event.data || event;
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '850px',
      maxHeight: '90vh',
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
      width: '600px',
      height: '600px',
      disableClose: false
    });
  }

  openUOMsDialog() {
    this.dialog.open(UomsDialogComponent, {
      width: '600px',
      height: '600px',
      disableClose: false
    });
  }

  openPriceListsDialog() {
    this.dialog.open(PriceListsDialogComponent, {
      width: '600px',
      height: '600px',
      disableClose: false
    });
  }

}

import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { ProductService } from '../../../settings/services/product.service';

interface LineItem {
  product_id: string;
  product_uom_id: string;
  quantity: number;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
}

@Component({
  selector: 'app-create-sales-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-sales-order-modal.component.html',
  styleUrl: './create-sales-order-modal.component.scss'
})
export class CreateSalesOrderModalComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  lineItems: LineItem[] = [];
  products: any[] = [];
  loadingProducts = false;

  customers: any[] = [];
  warehouses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private salesOrderService: SalesOrderService,
    private warehouseService: WarehouseService,
    private customerService: CustomerService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreateSalesOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      customer_id: ['', Validators.required],
      warehouse_id: ['', Validators.required],
      delivery_date: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.loading = true;

    Promise.all([
      this.customerService.getCustomers({ limit: 100 }).toPromise(),
      this.warehouseService.getWarehouses().toPromise()
    ]).then(([customers, warehouses]) => {
      this.customers = (customers as any)?.data || [];
      this.warehouses = (warehouses as any)?.data || [];
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error loading dropdown data:', error);
      this.snackBar.open('Error al cargar datos', 'Cerrar', { duration: 3000 });
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onWarehouseChange(): void {
    const warehouseId = this.form.get('warehouse_id')?.value;
    if (!warehouseId) {
      this.products = [];
      return;
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.loadingProducts = true;
    this.productService.getProducts({ status: 'active', limit: 200 }).subscribe({
      next: (res: any) => {
        this.products = res.data || [];
        this.loadingProducts = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingProducts = false;
      }
    });
  }

  addLineItem(): void {
    this.lineItems.push({
      product_id: '',
      product_uom_id: '',
      quantity: 1,
      unit_price: 0,
      iva_percentage: 16,
      ieps_percentage: 0
    });
  }

  removeLineItem(index: number): void {
    this.lineItems.splice(index, 1);
  }

  getProductUoms(index: number): any[] {
    const item = this.lineItems[index];
    if (!item.product_id) return [];
    const product = this.products.find(p => p.id === item.product_id);
    return product?.uoms || [];
  }

  onProductChange(index: number): void {
    const item = this.lineItems[index];
    const product = this.products.find(p => p.id === item.product_id);
    if (product?.uoms?.length > 0) {
      const uom = product.uoms[0];
      item.product_uom_id = uom.id || uom.uom_id;
    }
  }

  save(): void {
    if (!this.form.valid || this.lineItems.length === 0) {
      this.snackBar.open('Por favor completa todos los campos y agrega al menos un producto', 'Cerrar', { duration: 3000 });
      return;
    }

    this.saving = true;
    const formData = {
      ...this.form.value,
      line_items: this.lineItems
    };

    this.salesOrderService.createOrder(formData).subscribe({
      next: (order) => {
        this.saving = false;
        this.snackBar.open('Orden de venta creada exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        const msg = error.error?.message || error.message || 'Error al crear la orden de venta';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { POSService } from '../../services/pos.service';
import { ProductService } from '../../../purchase-orders/services/product.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { Product } from '../../../purchase-orders/models/product.model';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { POSCartItem } from '../../models/pos.model';

@Component({
  selector: 'app-take-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.scss']
})
export class TakeOrderComponent implements OnInit {
  products = signal<Product[]>([]);
  warehouses = signal<Warehouse[]>([]);
  filteredProducts = signal<Product[]>([]);
  
  selectedWarehouse = signal<string>('');
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);

  constructor(
    public posService: POSService,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private salesOrderService: SalesOrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.productService.getProducts().subscribe({
      next: (products) => {
        const productArray = Array.isArray(products) ? products : (products as any).data || [];
        this.products.set(productArray);
        this.filteredProducts.set(productArray);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading.set(false);
      }
    });

    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses) ? warehouses : (warehouses as any).data || [];
        this.warehouses.set(warehouseArray);
        if (warehouseArray.length > 0) {
          this.selectedWarehouse.set(warehouseArray[0].id);
        }
      },
      error: (error) => console.error('Error loading warehouses:', error)
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredProducts.set(this.products());
      return;
    }

    const filtered = this.products().filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.sku.toLowerCase().includes(term)
    );
    this.filteredProducts.set(filtered);
  }

  addProductToCart(product: Product): void {
    if (!product.uoms || product.uoms.length === 0) {
      this.snackBar.open('Producto sin unidades de medida', 'Cerrar', { duration: 3000 });
      return;
    }

    const baseUom = product.uoms.find(u => u.id === product.base_uom_id) || product.uoms[0];

    const cartItem: POSCartItem = {
      product_id: product.id,
      product_name: product.name,
      product_sku: product.sku,
      uom_id: baseUom.id,
      uom_name: baseUom.name,
      quantity: 1,
      unit_price: product.cost || 0,
      iva_percentage: 16,
      ieps_percentage: 0,
      subtotal: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0
    };

    // Recalculate will be done by service
    const subtotal = cartItem.quantity * cartItem.unit_price;
    const iva_amount = subtotal * (cartItem.iva_percentage / 100);
    const ieps_amount = subtotal * (cartItem.ieps_percentage / 100);
    cartItem.subtotal = subtotal;
    cartItem.iva_amount = iva_amount;
    cartItem.ieps_amount = ieps_amount;
    cartItem.line_total = subtotal + iva_amount + ieps_amount;

    this.posService.addItem(cartItem);
    this.snackBar.open(`${product.name} agregado`, 'Cerrar', { duration: 2000 });
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.posService.removeItem(index);
    } else {
      this.posService.updateItemQuantity(index, quantity);
    }
  }

  removeItem(index: number): void {
    this.posService.removeItem(index);
  }

  saveOrder(): void {
    if (!this.selectedWarehouse()) {
      this.snackBar.open('Selecciona un almacén', 'Cerrar', { duration: 3000 });
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.snackBar.open('Agrega productos a la orden', 'Cerrar', { duration: 3000 });
      return;
    }

    this.saving.set(true);
    const orderData = this.posService.getCartForOrder(this.selectedWarehouse());

    this.salesOrderService.createOrder(orderData).subscribe({
      next: (order) => {
        this.snackBar.open('Orden creada exitosamente', 'Cerrar', { duration: 3000 });
        this.posService.clearCart();
        this.router.navigate(['/pos']);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error al crear orden', 'Cerrar', { duration: 5000 });
        this.saving.set(false);
      }
    });
  }

  cancel(): void {
    if (confirm('¿Descartar orden actual?')) {
      this.posService.clearCart();
      this.router.navigate(['/pos']);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}

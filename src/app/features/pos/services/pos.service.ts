import { Injectable, signal } from '@angular/core';
import { POSCart, POSCartItem } from '../models/pos.model';

@Injectable({
  providedIn: 'root'
})
export class POSService {
  private cartState = signal<POSCart>({
    items: [],
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  });

  cart = this.cartState.asReadonly();

  /**
   * Add item to cart
   */
  addItem(item: POSCartItem): void {
    const currentCart = this.cartState();
    const existingItemIndex = currentCart.items.findIndex(
      i => i.product_id === item.product_id && i.uom_id === item.uom_id
    );

    let updatedItems: POSCartItem[];
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItems = currentCart.items.map((i, index) => {
        if (index === existingItemIndex) {
          const newQuantity = i.quantity + item.quantity;
          return this.recalculateItem({ ...i, quantity: newQuantity });
        }
        return i;
      });
    } else {
      // Add new item
      updatedItems = [...currentCart.items, item];
    }

    this.updateCart(updatedItems);
  }

  /**
   * Update item quantity
   */
  updateItemQuantity(index: number, quantity: number): void {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.map((item, i) => {
      if (i === index) {
        return this.recalculateItem({ ...item, quantity });
      }
      return item;
    });

    this.updateCart(updatedItems);
  }

  /**
   * Remove item from cart
   */
  removeItem(index: number): void {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.filter((_, i) => i !== index);
    this.updateCart(updatedItems);
  }

  /**
   * Clear cart
   */
  clearCart(): void {
    this.cartState.set({
      items: [],
      total_subtotal: 0,
      total_iva: 0,
      total_ieps: 0,
      grand_total: 0
    });
  }

  /**
   * Recalculate item totals
   */
  private recalculateItem(item: POSCartItem): POSCartItem {
    const subtotal = item.quantity * item.unit_price;
    const iva_amount = subtotal * (item.iva_percentage / 100);
    const ieps_amount = subtotal * (item.ieps_percentage / 100);
    const line_total = subtotal + iva_amount + ieps_amount;

    return {
      ...item,
      subtotal,
      iva_amount,
      ieps_amount,
      line_total
    };
  }

  /**
   * Update cart with new items and recalculate totals
   */
  private updateCart(items: POSCartItem[]): void {
    const total_subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const total_iva = items.reduce((sum, item) => sum + item.iva_amount, 0);
    const total_ieps = items.reduce((sum, item) => sum + item.ieps_amount, 0);
    const grand_total = total_subtotal + total_iva + total_ieps;

    this.cartState.set({
      items,
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }

  /**
   * Get cart for order creation
   */
  getCartForOrder(warehouse_id: string, customer_id?: number) {
    const cart = this.cartState();
    return {
      warehouse_id,
      customer_id,
      line_items: cart.items.map(item => ({
        product_id: item.product_id,
        uom_id: item.uom_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        iva_percentage: item.iva_percentage,
        ieps_percentage: item.ieps_percentage
      }))
    };
  }
}

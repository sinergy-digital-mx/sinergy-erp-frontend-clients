import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  LucideAngularModule,
  LayoutGrid,
  ShoppingCart,
  Receipt,
  CreditCard,
  LogIn,
  LogOut,
  CircleCheck,
  CircleAlert,
} from 'lucide-angular';
import { POSService } from '../../services/pos.service';
import { OpenShiftDialogComponent } from '../../components/open-shift-dialog/open-shift-dialog.component';
import { CloseShiftDialogComponent } from '../../components/close-shift-dialog/close-shift-dialog.component';

@Component({
  selector: 'app-pos-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
})
export class POSHomeComponent implements OnInit {
  readonly LayoutGrid = LayoutGrid;
  readonly ShoppingCart = ShoppingCart;
  readonly Receipt = Receipt;
  readonly CreditCard = CreditCard;
  readonly LogIn = LogIn;
  readonly LogOut = LogOut;
  readonly CircleCheck = CircleCheck;
  readonly CircleAlert = CircleAlert;

  activeCashShift = signal<any | null>(null);
  checkingShift = signal<boolean>(false);
  defaultWarehouseId = signal<string>('');
  parseFloat = parseFloat; // Expose parseFloat to template

  constructor(
    private router: Router,
    private posService: POSService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Try to get warehouse from localStorage or user context
    const warehouseId = localStorage.getItem('pos_warehouse_id');
    if (warehouseId) {
      this.defaultWarehouseId.set(warehouseId);
      this.checkActiveCashShift();
    }
  }

  checkActiveCashShift(): void {
    const warehouseId = this.defaultWarehouseId();
    
    if (!warehouseId) {
      return;
    }
    
    this.checkingShift.set(true);
    this.posService.getActivePosSession(warehouseId).subscribe({
      next: (shift) => {
        this.activeCashShift.set(shift);
        this.checkingShift.set(false);
      },
      error: () => {
        this.activeCashShift.set(null);
        this.checkingShift.set(false);
      }
    });
  }

  openCashShift(): void {
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return; // User cancelled
      }

      const {
        warehouse_id,
        opening_balance,
        notes,
        pos_configuration_id,
        pos_configuration_code,
      } = result;

      // Save warehouse for future use
      this.defaultWarehouseId.set(warehouse_id);
      localStorage.setItem('pos_warehouse_id', warehouse_id);

      this.checkingShift.set(true);
      this.posService.openPosSession({
        warehouse_id,
        cashier_id: '',
        opening_balance,
        ...(notes?.trim() ? { notes: notes.trim() } : {}),
        ...(pos_configuration_id ? { pos_configuration_id } : {}),
      }).subscribe({
        next: (shift) => {
          this.activeCashShift.set(shift);
          if (pos_configuration_id) {
            localStorage.setItem('pos_configuration_id', pos_configuration_id);
          } else {
            localStorage.removeItem('pos_configuration_id');
          }
          if (pos_configuration_code) {
            localStorage.setItem('pos_configuration_code', pos_configuration_code);
          } else {
            localStorage.removeItem('pos_configuration_code');
          }
          this.checkingShift.set(false);
          this.snackBar.open('Sesión POS iniciada', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.snackBar.open(error.error?.message || 'Error al iniciar sesión POS', 'Cerrar', { duration: 5000 });
        }
      });
    });
  }

  closeCashShift(): void {
    const shift = this.activeCashShift();
    
    if (!shift) {
      this.snackBar.open('No hay sesión activa para cerrar', 'Cerrar', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { shift }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return; // User cancelled
      }

      const { closing_balance, notes } = result;

      this.checkingShift.set(true);
      this.posService.closePosSession(shift.id, {
        closing_balance,
        notes
      }).subscribe({
        next: (closedShift) => {
          this.activeCashShift.set(null);
          localStorage.removeItem('pos_configuration_id');
          localStorage.removeItem('pos_configuration_code');
          this.checkingShift.set(false);
          
          const difference = closedShift.difference || 0;
          const diffText = difference === 0 
            ? 'Sin diferencia' 
            : difference > 0 
              ? `Sobrante: ${this.formatCurrency(difference)}`
              : `Faltante: ${this.formatCurrency(Math.abs(difference))}`;
          
          this.snackBar.open(`Sesión cerrada. ${diffText}`, 'Cerrar', { duration: 5000 });
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.snackBar.open(error.error?.message || 'Error al cerrar la sesión POS', 'Cerrar', { duration: 5000 });
        }
      });
    });
  }

  navigateToTakeOrder(): void {
    this.router.navigate(['/pos/take-order']);
  }

  navigateToPayment(): void {
    this.router.navigate(['/pos/payment']);
  }
  
  navigateToPendingOrders(): void {
    this.router.navigate(['/pos/pending-orders']);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}

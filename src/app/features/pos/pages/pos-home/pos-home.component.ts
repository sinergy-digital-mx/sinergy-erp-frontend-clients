import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
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
import { OpenShiftDialogResult } from '../../models/pos-session.model';
import { applyOpenShiftDialogResult } from '../../utils/pos-session.util';

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
    private toast: ToastService,
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
    const posConfigurationId = localStorage.getItem('pos_configuration_id');
    if (!posConfigurationId) {
      this.activeCashShift.set(null);
      return;
    }
    
    this.checkingShift.set(true);
    this.posService.getActivePosSession(posConfigurationId).subscribe({
      next: (shift) => {
        this.activeCashShift.set(shift || null);
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

    dialogRef.afterClosed().subscribe((result: OpenShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }

      this.defaultWarehouseId.set(result.warehouse_id);
      this.checkingShift.set(true);

      applyOpenShiftDialogResult(result, this.posService).subscribe({
        next: (shift) => {
          this.activeCashShift.set(shift);
          this.checkingShift.set(false);
          this.toast.success(
            result.action === 'resume' ? 'Sesión POS reanudada' : 'Sesión POS iniciada'
          );
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.toast.error(error.error?.message || 'Error al iniciar sesión POS');
        },
      });
    });
  }

  closeCashShift(): void {
    const shift = this.activeCashShift();
    
    if (!shift) {
      this.toast.warning('No hay sesión activa para cerrar');
      return;
    }

    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '520px',
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
          
          this.toast.success(`Sesión cerrada. ${diffText}`);
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.toast.error(error.error?.message || 'Error al cerrar la sesión POS');
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

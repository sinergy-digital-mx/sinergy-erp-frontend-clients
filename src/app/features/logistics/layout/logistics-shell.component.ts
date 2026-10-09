import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ArrowLeftRight,
  LayoutDashboard,
  LucideAngularModule,
  Radio,
  Route,
  Truck,
  Users,
} from 'lucide-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { INVENTORY_PERMISSIONS } from '../../inventory/config/permissions.config';
import { GPS_TRACKING_PERMISSIONS, SHIPPING_PERMISSIONS, TRUCK_PERMISSIONS } from '../config/permissions.config';

interface LogisticsNavItem {
  label: string;
  route: string;
  icon: typeof Truck;
  exact: boolean;
}

@Component({
  selector: 'app-logistics-entry',
  standalone: true,
  template: '',
})
export class LogisticsEntryComponent {}

@Component({
  selector: 'app-logistics-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './logistics-shell.component.html',
  styleUrl: './logistics-shell.component.scss',
})
export class LogisticsShellComponent implements OnInit, OnDestroy {
  readonly Truck = Truck;
  executionItems = signal<LogisticsNavItem[]>([]);
  catalogItems = signal<LogisticsNavItem[]>([]);

  private permissionsSub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.rebuildNav();
    this.permissionsSub = this.auth.permissions$.subscribe(() => this.rebuildNav());
  }

  ngOnDestroy(): void {
    this.permissionsSub?.unsubscribe();
  }

  private can(permission: string): boolean {
    return this.auth.hasPermission(permission);
  }

  private rebuildNav(): void {
    const canTrips =
      this.can(SHIPPING_PERMISSIONS.viewList) || this.can(SHIPPING_PERMISSIONS.viewMenu);
    const canFleet =
      this.can(TRUCK_PERMISSIONS.viewList) || this.can(TRUCK_PERMISSIONS.viewMenu);
    const canTransfers =
      this.can(INVENTORY_PERMISSIONS.viewList) || this.can(INVENTORY_PERMISSIONS.viewMenu);

    const execution: LogisticsNavItem[] = [];
    if (canTrips) {
      execution.push(
        { label: 'Dashboard', route: '/logistics/dashboard', icon: LayoutDashboard, exact: true },
        { label: 'Viajes', route: '/logistics/trips', icon: Route, exact: true },
      );
    }
    if (canTransfers) {
      execution.push({
        label: 'Transferencias de inventario',
        route: '/logistics/transfers',
        icon: ArrowLeftRight,
        exact: true,
      });
    }
    if (this.can(GPS_TRACKING_PERMISSIONS.viewMenu) || this.can(GPS_TRACKING_PERMISSIONS.read)) {
      execution.push({
        label: 'Rastreo GPS',
        route: '/logistics/tracking',
        icon: Radio,
        exact: true,
      });
    }

    const catalogs: LogisticsNavItem[] = [];
    if (canFleet) {
      catalogs.push({
        label: 'Flota y remolques',
        route: '/logistics/trucks',
        icon: Truck,
        exact: true,
      });
    }
    if (canTrips) {
      catalogs.push({
        label: 'Choferes',
        route: '/logistics/drivers',
        icon: Users,
        exact: true,
      });
    }

    this.executionItems.set(execution);
    this.catalogItems.set(catalogs);
  }
}

export function logisticsHomePath(auth: AuthService): string {
  const canTrips =
    auth.hasPermission(SHIPPING_PERMISSIONS.viewList) ||
    auth.hasPermission(SHIPPING_PERMISSIONS.viewMenu);
  if (canTrips) return '/logistics/dashboard';
  if (
    auth.hasPermission(GPS_TRACKING_PERMISSIONS.viewMenu) ||
    auth.hasPermission(GPS_TRACKING_PERMISSIONS.read)
  ) {
    return '/logistics/tracking';
  }
  const canFleet =
    auth.hasPermission(TRUCK_PERMISSIONS.viewList) ||
    auth.hasPermission(TRUCK_PERMISSIONS.viewMenu);
  if (canFleet) return '/logistics/trucks';
  const canTransfers =
    auth.hasPermission(INVENTORY_PERMISSIONS.viewList) ||
    auth.hasPermission(INVENTORY_PERMISSIONS.viewMenu);
  if (canTransfers) return '/logistics/transfers';
  return '/';
}

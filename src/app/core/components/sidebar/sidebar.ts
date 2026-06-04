import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Home,
  Users,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  FileText,
  MapPin,
  FileCheck,
  DollarSign,
  Megaphone,
  LandPlot,
  ShoppingCart,
  Package,
  ShoppingBag,
  Monitor,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-angular';
import { DIVINO_DASHBOARD_TENANT_ID } from '../../../features/divino-dashboard/config/divino-dashboard.constants';
import { DIVINO_DASHBOARD_PERMISSIONS } from '../../../features/divino-dashboard/config/permissions.config';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { PERMISSIONS } from '../../config/permissions.config';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
  id?: string;
  permission?: string;
  /** Si se define, el ítem solo se muestra para este tenant. */
  tenantId?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  isCollapsed = signal(false);
  todayUsdMxnRate = signal<number | null>(null);
  visibleMenuItems = signal<MenuItem[]>([]);

  private permissionsSubscription?: Subscription;

  menu: MenuItem[] = [
    {
      label: 'Leads',
      route: '/leads',
      icon: Users,
      id: 'menu-leads',
      permission: PERMISSIONS.leads.viewMenu
    },
    {
      label: 'Clientes',
      route: '/customers',
      icon: CreditCard,
      id: 'menu-customers',
      permission: PERMISSIONS.customers.viewMenu
    },
    {
      label: 'Lotes',
      route: '/properties',
      icon: LandPlot,
      id: 'menu-properties',
      permission: PERMISSIONS.properties.viewMenu
    },
    {
      label: 'Contratos',
      route: '/contracts',
      icon: FileCheck,
      id: 'menu-contracts',
      permission: PERMISSIONS.contracts.viewMenu
    },
    {
      label: 'Órdenes de Compra',
      route: '/purchase-orders',
      icon: ShoppingCart,
      id: 'menu-purchase-orders',
      permission: PERMISSIONS.purchaseOrders.viewMenu
    },
    {
      label: 'Órdenes de Venta',
      route: '/sales-orders',
      icon: ShoppingBag,
      id: 'menu-sales-orders',
      permission: PERMISSIONS.salesOrders.viewMenu
    },
    {
      label: 'Inventario',
      route: '/inventory',
      icon: Package,
      id: 'menu-inventory',
      permission: PERMISSIONS.inventory.viewMenu
    },
    {
      label: 'Punto de Venta',
      route: '/pos',
      icon: Monitor,
      id: 'menu-pos',
      permission: PERMISSIONS.pos.viewMenu
    },
    {
      label: 'Marketing',
      route: '/marketing',
      icon: Megaphone,
      id: 'menu-marketing',
      permission: PERMISSIONS.marketing.viewMenu
    },
    {
      label: 'Reporte de Ventas',
      route: '/zona-norte-reports',
      icon: FileText,
      id: 'menu-zona-norte',
      permission: 'zona_norte_custom_report:ViewMenu'
    },
    {
      label: 'Divino Dashboard',
      route: '/divino-dashboard',
      icon: LayoutDashboard,
      id: 'menu-divino-dashboard',
      permission: DIVINO_DASHBOARD_PERMISSIONS.viewMenu,
      tenantId: DIVINO_DASHBOARD_TENANT_ID,
    }
  ];

  private menuIdCounter = 0;

  icons = { Home, Users, CreditCard, Bell, Settings, LogOut, FileText, MapPin, FileCheck, DollarSign, Megaphone, LandPlot, ShoppingCart, Package, ShoppingBag, Monitor, ChevronLeft, ChevronRight };

  constructor(
    public auth_service: AuthService,
    private sidebarService: SidebarService,
    private exchangeRateService: ExchangeRateService
  ) {
    // Subscribe to sidebar service changes
    this.isCollapsed = this.sidebarService.isCollapsed;
  }

  ngOnInit(): void {
    this.permissionsSubscription = this.auth_service.permissions$.subscribe(() => {
      this.updateVisibleMenuItems();
    });

    if (!this.auth_service.hasPermission('exchangerate:Read')) {
      return;
    }

    this.exchangeRateService.getDailyExchangeRate().subscribe({
      next: (rate) => {
        const value = rate?.exchange_rate;
        if (value != null && Number.isFinite(value) && value > 0) {
          this.todayUsdMxnRate.set(value);
        } else {
          this.todayUsdMxnRate.set(null);
        }
      },
      error: () => this.todayUsdMxnRate.set(null)
    });
  }

  ngOnDestroy(): void {
    this.permissionsSubscription?.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  private updateVisibleMenuItems(): void {
    const tenantId = this.auth_service.user_info?.tenant_id;
    this.visibleMenuItems.set(
      this.menu.filter(item => {
        if (item.tenantId && tenantId !== item.tenantId) {
          return false;
        }
        if (!item.permission) {
          return true;
        }
        return this.auth_service.hasPermission(item.permission);
      })
    );
  }

  getUserName(): string {
    if (!this.auth_service.user_info) {
      return 'Usuario';
    }
    
    const email = this.auth_service.user_info.email;
    if (!email) {
      return 'Usuario';
    }
    
    // Extract name from email (part before @)
    const namePart = email.split('@')[0];
    // Convert to title case (capitalize first letter of each word)
    return namePart
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getInitials(email?: string): string {
    if (!email) {
      return 'U';
    }
    
    const namePart = email.split('@')[0];
    const words = namePart.split('.');
    
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    
    return namePart.substring(0, 2).toUpperCase();
  }

}

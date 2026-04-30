import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { PERMISSIONS } from '../../config/permissions.config';
import { ExchangeRateService } from '../../services/exchange-rate.service';

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
  id?: string;
  permission?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  isCollapsed = signal(false);
  todayUsdMxnRate = signal<number | null>(null);

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

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  get visibleMenuItems(): MenuItem[] {
    return this.menu.filter(item => {
      // If no permission is specified, show the item
      if (!item.permission) {
        return true;
      }
      // Check if user has the required permission
      return this.auth_service.hasPermission(item.permission);
    });
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

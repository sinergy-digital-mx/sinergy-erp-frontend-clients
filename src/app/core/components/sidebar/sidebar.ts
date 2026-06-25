import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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
  X,
  Landmark,
} from 'lucide-angular';
import { DIVINO_DASHBOARD_TENANT_ID } from '../../../features/divino-dashboard/config/divino-dashboard.constants';
import { DIVINO_DASHBOARD_PERMISSIONS } from '../../../features/divino-dashboard/config/permissions.config';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { PERMISSIONS } from '../../config/permissions.config';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { PolluxBrandTextComponent } from '../pollux-brand-text/pollux-brand-text.component';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
  id: string;
  permission?: string;
  /** Si se define, el ítem solo se muestra para este tenant. */
  tenantId?: string;
}

interface MenuSection {
  id: string;
  title: string;
  itemIds: string[];
}

interface VisibleMenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'commercial',
    title: 'Comercial',
    itemIds: ['menu-leads', 'menu-customers', 'menu-properties', 'menu-contracts'],
  },
  {
    id: 'operation',
    title: 'Operación',
    itemIds: ['menu-purchase-orders', 'menu-sales-orders', 'menu-inventory', 'menu-pos', 'menu-accounting'],
  },
  {
    id: 'marketing-reports',
    title: 'Análisis',
    itemIds: ['menu-marketing', 'menu-zona-norte', 'menu-divino-dashboard'],
  },
  {
    id: 'system',
    title: 'Sistema',
    itemIds: ['menu-notifications', 'menu-settings'],
  },
];

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule, PolluxBrandTextComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  isCollapsed = signal(false);
  isMobileOpen = signal(false);
  todayUsdMxnRate = signal<number | null>(null);
  visibleMenuSections = signal<VisibleMenuSection[]>([]);

  private permissionsSubscription?: Subscription;
  private routerSubscription?: Subscription;

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
      label: 'Cobranza / Contabilidad',
      route: '/accounting',
      icon: Landmark,
      id: 'menu-accounting',
      permission: PERMISSIONS.accounting.viewMenu
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
    },
    {
      label: 'Notificaciones',
      route: '/notifications',
      icon: Bell,
      id: 'menu-notifications',
    },
    {
      label: 'Configuración',
      route: '/settings',
      icon: Settings,
      id: 'menu-settings',
    },
  ];

  icons = { Home, Users, CreditCard, Bell, Settings, LogOut, FileText, MapPin, FileCheck, DollarSign, Megaphone, LandPlot, ShoppingCart, Package, ShoppingBag, Monitor, ChevronLeft, ChevronRight, X, Landmark };

  constructor(
    public auth_service: AuthService,
    private sidebarService: SidebarService,
    private exchangeRateService: ExchangeRateService,
    private router: Router
  ) {
    this.isCollapsed = this.sidebarService.isCollapsed;
    this.isMobileOpen = this.sidebarService.isMobileOpen;
  }

  ngOnInit(): void {
    this.permissionsSubscription = this.auth_service.permissions$.subscribe(() => {
      this.updateVisibleMenuSections();
    });

    this.auth_service.ensurePosProfile().subscribe(() => {
      this.updateVisibleMenuSections();
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidebarService.closeMobile();
      }
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
    this.routerSubscription?.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  closeMobileMenu() {
    this.sidebarService.closeMobile();
  }

  private getMenuItems(): MenuItem[] {
    const posType = this.auth_service.getPosUserType();
    return this.menu.map((item) => {
      if (item.id !== 'menu-pos') {
        return item;
      }
      if (posType === 'COBRANZA') {
        return {
          ...item,
          label: 'POS Caja',
          route: '/pos/cobranza',
        };
      }
      return {
        ...item,
        label: 'Punto de Venta',
        route: '/pos/ventas',
      };
    });
  }

  private updateVisibleMenuSections(): void {
    const tenantId = this.auth_service.user_info?.tenant_id;
    const visibleItems = this.getMenuItems().filter(item => {
      if (item.tenantId && tenantId !== item.tenantId) {
        return false;
      }
      if (item.id === 'menu-pos' && this.auth_service.getPosUserType() === 'COBRANZA') {
        return ['pos:Update', 'pos:Read', 'pos:ViewMenu'].some((p) =>
          this.auth_service.hasPermission(p)
        );
      }
      if (!item.permission) {
        return true;
      }
      return this.auth_service.hasPermission(item.permission);
    });
    const itemById = new Map(visibleItems.map(item => [item.id, item]));

    this.visibleMenuSections.set(
      MENU_SECTIONS.map(section => ({
        id: section.id,
        title: section.title,
        items: section.itemIds
          .map(id => itemById.get(id))
          .filter((item): item is MenuItem => item != null),
      })).filter(section => section.items.length > 0)
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

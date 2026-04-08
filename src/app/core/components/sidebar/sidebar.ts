import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
import { IsAdminDirective } from '../../directives/is-admin.directive';

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
  id?: string;
  permission?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule, IsAdminDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isCollapsed = signal(false);

  menu: MenuItem[] = [
    {
      label: 'Leads',
      route: '/leads',
      icon: Users,
      id: 'menu-leads',
      permission: 'leads:ViewMenu'
    },
    {
      label: 'Clientes',
      route: '/customers',
      icon: CreditCard,
      id: 'menu-customers',
      permission: 'customers:ViewMenu'
    },
    {
      label: 'Lotes',
      route: '/properties',
      icon: LandPlot,
      id: 'menu-properties',
      permission: 'properties:ViewMenu'
    },
    {
      label: 'Contratos',
      route: '/contracts',
      icon: FileCheck,
      id: 'menu-contracts',
      permission: 'contracts:ViewMenu'
    },
    {
      label: 'Órdenes de Compra',
      route: '/purchase-orders',
      icon: ShoppingCart,
      id: 'menu-purchase-orders',
      permission: 'purchase_orders:ViewMenu'
    },
    {
      label: 'Órdenes de Venta',
      route: '/sales-orders',
      icon: ShoppingBag,
      id: 'menu-sales-orders',
      permission: 'sales_orders:ViewMenu'
    },
    {
      label: 'Inventario',
      route: '/inventory',
      icon: Package,
      id: 'menu-inventory',
      permission: 'inventory:ViewMenu'
    },
    {
      label: 'Punto de Venta',
      route: '/pos',
      icon: Monitor,
      id: 'menu-pos',
      permission: 'pos:ViewMenu'
    },
    {
      label: 'Marketing',
      route: '/marketing',
      icon: Megaphone,
      id: 'menu-marketing',
      permission: 'marketing:ViewMenu'
    }
  ];

  private menuIdCounter = 0;

  icons = { Home, Users, CreditCard, Bell, Settings, LogOut, FileText, MapPin, FileCheck, DollarSign, Megaphone, LandPlot, ShoppingCart, Package, ShoppingBag, Monitor, ChevronLeft, ChevronRight };

  constructor(public auth_service: AuthService, private sidebarService: SidebarService) {
    // Subscribe to sidebar service changes
    this.isCollapsed = this.sidebarService.isCollapsed;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  get visibleMenuItems(): MenuItem[] {
    const currentPermissions = Array.from(this.auth_service.permissions$.getValue());
    
    const filtered = this.menu.filter(item => {
      // If no permission is specified, show the item
      if (!item.permission) {
        return true;
      }
      // Check if user has the required permission
      const hasPermission = this.auth_service.hasPermission(item.permission);
      return hasPermission;
    });
    
    return filtered;
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

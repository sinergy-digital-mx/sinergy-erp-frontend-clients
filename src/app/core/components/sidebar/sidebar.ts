import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { IsAdminDirective } from '../../directives/is-admin.directive';

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
  id?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule, IsAdminDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  menu: MenuItem[] = [
    {
      label: 'Leads',
      route: '/leads',
      icon: Users,
      id: 'menu-leads'
    },
    {
      label: 'Follow ups',
      route: '/follow-ups',
      icon: Users,
      id: 'menu-follow-ups'
    },
    {
      label: 'Customers',
      route: '/customers',
      icon: Users,
      id: 'menu-customers'
    },
    {
      label: 'Map',
      route: '/map',
      icon: Users,
      id: 'menu-map'
    },
    {
      label: 'Quotes',
      route: '/quotes',
      icon: Users,
      id: 'menu-quotes'
    },
    {
      label: 'Contracts',
      route: '/contracts',
      icon: Users,
      id: 'menu-contracts'
    }
  ];

  private menuIdCounter = 0;

  icons = { Home, Users, CreditCard, Bell, Settings, LogOut, FileText };

  constructor(public auth_service:AuthService){

  }

}

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

interface MenuItem {
  label: string;
  icon?: any;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule,LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  menu: MenuItem[] = [
    {
      label: 'Leads',
      route: '/leads',
      icon: Users
    },
    {
      label: 'Follow ups',
      route: '/customers',
      icon: Users
    },
    {
      label: 'Customers',
      route: '/customers',
      icon: Users
    },
    {
      label: 'Map',
      route: '/customers',
      icon: Users
    },
    {
      label: 'Quotes',
      route: '/customers',
      icon: Users
    },
    {
      label: 'Contracts',
      route: '/customers',
      icon: Users
    }
  ];

  icons = { Home, Users, CreditCard, Bell, Settings, LogOut, FileText };

  constructor(public auth_service:AuthService){

  }

}

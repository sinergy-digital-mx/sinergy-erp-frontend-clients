import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  permissions: string[];
}

/**
 * SettingsComponent
 * Main settings page with grid menu for navigating to different management sections
 * Displays Users and Roles management options
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen">
      <div class="px-2 py-2">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p class="text-gray-600">Gestiona usuarios, roles y permisos de tu empresa</p>
        </div>

        <!-- Accesos y Permisos -->
        <div class="mb-8" *ngIf="visibleAccessSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Accesos y Permisos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleAccessSections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empresa -->
        <div class="mb-8" *ngIf="visibleCompanySections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Empresa</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleCompanySections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comunicación -->
        <div class="mb-8" *ngIf="visibleCommunicationSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Comunicación</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleCommunicationSections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class SettingsComponent implements OnInit, OnDestroy {
  accessSections: SettingsSection[] = [
    {
      id: 'users',
      title: 'Usuarios',
      description: 'Gestiona usuarios, asigna roles y controla permisos de acceso de forma centralizada',
      icon: '👥',
      route: 'users',
      permissions: ['user:ViewMenu']
    },
    {
      id: 'roles',
      title: 'Roles y Permisos',
      description: 'Crea y gestiona roles personalizados, define permisos granulares y organiza el control de acceso',
      icon: '🔐',
      route: 'roles',
      permissions: ['role:ViewMenu']
    }
  ];

  companySections: SettingsSection[] = [
    {
      id: 'fiscal-configurations',
      title: 'Razones Sociales y Sucursales',
      description: 'Gestiona razones sociales, sucursales, almacenes, RFC, régimen fiscal y certificados digitales',
      icon: '📋',
      route: 'fiscal-configurations',
      permissions: ['billing:ViewMenu', 'warehouses:ViewMenu']
    },
    {
      id: 'vendors',
      title: 'Proveedores',
      description: 'Gestiona proveedores, información de contacto, RFC y datos fiscales de tus proveedores',
      icon: '🏢',
      route: 'vendors',
      permissions: ['vendors:ViewMenu']
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Gestiona el catálogo de productos, SKU, nombres y descripciones de tus productos',
      icon: '📦',
      route: 'products',
      permissions: ['products:ViewMenu']
    },
    {
      id: 'pos-configuration',
      title: 'Punto de Venta',
      description: 'Configura y gestiona tu punto de venta, terminales, cajas y configuraciones de ventas',
      icon: '🛒',
      route: 'pos-configuration',
      permissions: ['pos_configuration:ViewMenu']
    },
    {
      id: 'exchange-rates',
      title: 'Tipo de Cambio',
      description: 'Registra y consulta el tipo de cambio diario USD/MXN para operaciones financieras',
      icon: '💱',
      route: 'exchange-rates',
      permissions: ['exchangerate:ViewMenu', 'exchangerate:Read', 'exchangerate:Update']
    },
    {
      id: 'goals',
      title: 'Metas',
      description: 'Define metas de venta por sucursal y periodo, y configura la comisión activa del reporte',
      icon: '🎯',
      route: 'goals',
      permissions: ['goals:ViewMenu', 'goals:Read']
    }
  ];

  communicationSections: SettingsSection[] = [
    {
      id: 'email-templates',
      title: 'Plantillas de Correo',
      description: 'Crea y gestiona plantillas de correo personalizadas para notificaciones y comunicaciones',
      icon: '📧',
      route: 'email-templates',
      permissions: [
        'email-templates:ViewMenu',
        'email-templates:Read',
        'email-templates:Create',
        'email-templates:Update',
        'email-templates:Delete',
        'emailtemplates:ViewMenu',
        'email_templates:Read',
        'email_templates:Create',
        'email_templates:Update',
        'email_templates:Delete'
      ]
    },
    {
      id: 'mailer-configurations',
      title: 'Configuración de Correo',
      description: 'Configura el proveedor de envío de correos, incluyendo Resend y la configuración activa',
      icon: '✉️',
      route: 'mailer-configurations',
      permissions: []
    }
  ];

  sections: SettingsSection[] = [];
  private permissionsSubscription?: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.permissionsSubscription?.unsubscribe();
  }

  /**
   * Check if user has permission to access a section
   */
  hasAccess(section: SettingsSection): boolean {
    if (!section.permissions || section.permissions.length === 0) {
      return true;
    }
    // User needs at least ONE of the permissions
    return section.permissions.some(permission => this.authService.hasPermission(permission));
  }

  /**
   * Get filtered sections based on user permissions
   */
  get visibleAccessSections(): SettingsSection[] {
    return this.accessSections.filter(section => this.hasAccess(section));
  }

  get visibleCompanySections(): SettingsSection[] {
    return this.companySections.filter(section => this.hasAccess(section));
  }

  get visibleCommunicationSections(): SettingsSection[] {
    return this.communicationSections.filter(section => this.hasAccess(section));
  }

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}

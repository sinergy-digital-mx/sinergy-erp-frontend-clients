import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
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
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Accesos y Permisos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of accessSections" 
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
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Empresa</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of companySections" 
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
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Comunicación</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of communicationSections" 
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
export class SettingsComponent {
  accessSections: SettingsSection[] = [
    {
      id: 'users',
      title: 'Usuarios',
      description: 'Gestiona usuarios del tenant, asigna roles y controla permisos de acceso de forma centralizada',
      icon: '👥',
      route: 'users'
    },
    {
      id: 'roles',
      title: 'Roles y Permisos',
      description: 'Crea y gestiona roles personalizados, define permisos granulares y organiza el control de acceso',
      icon: '🔐',
      route: 'roles'
    }
  ];

  companySections: SettingsSection[] = [
    {
      id: 'warehouses',
      title: 'Almacenes',
      description: 'Gestiona almacenes, ubicaciones, información fiscal y datos de contacto de tus almacenes',
      icon: '🏭',
      route: 'warehouses'
    },
    {
      id: 'fiscal-configurations',
      title: 'Configuración Fiscal',
      description: 'Gestiona la información fiscal de tus almacenes, RFC, régimen fiscal y certificados digitales',
      icon: '📋',
      route: 'fiscal-configurations'
    },
    {
      id: 'vendors',
      title: 'Proveedores',
      description: 'Gestiona proveedores, información de contacto, RFC y datos fiscales de tus proveedores',
      icon: '🏢',
      route: 'vendors'
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Gestiona el catálogo de productos, SKU, nombres y descripciones de tus productos',
      icon: '📦',
      route: 'products'
    },
    {
      id: 'point-of-sale',
      title: 'Punto de Venta',
      description: 'Configura y gestiona tu punto de venta, terminales, cajas y configuraciones de ventas',
      icon: '🛒',
      route: 'point-of-sale'
    }
  ];

  communicationSections: SettingsSection[] = [
    {
      id: 'email-templates',
      title: 'Plantillas de Correo',
      description: 'Crea y gestiona plantillas de correo personalizadas para notificaciones y comunicaciones',
      icon: '📧',
      route: 'email-templates'
    }
  ];

  sections: SettingsSection[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}

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
    <div class="bg-gray-50 min-h-screen">
      <div class="p-6">
        <!-- Header -->
        <div class="mb-8 max-w-2xl">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p class="text-gray-600">Gestiona usuarios, roles y permisos de tu tenant</p>
        </div>

        <!-- Settings Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div *ngFor="let section of sections" 
               (click)="navigateTo(section.route)"
               class="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
            
            <!-- Background gradient on hover -->
            <div class="absolute inset-0 bg-linear-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Content -->
            <div class="relative z-10">
              <div class="flex items-start justify-between mb-3">
                <div class="text-4xl">{{ section.icon }}</div>
                <svg class="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              
              <h2 class="text-xl font-bold text-gray-900 mb-2">{{ section.title }}</h2>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ section.description }}</p>
              
              <div class="inline-flex items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700 transition-colors">
                Ir a {{ section.title }}
                <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Border gradient on hover -->
            <div class="absolute inset-0 rounded-xl border border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
  sections: SettingsSection[] = [
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}

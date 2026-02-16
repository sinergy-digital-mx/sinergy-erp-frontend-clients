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
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Settings</h1>
        <p class="text-gray-600 text-sm mt-1">Manage your tenant users, roles, and permissions</p>
      </div>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let section of sections" 
             (click)="navigateTo(section.route)"
             class="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4 hover:shadow-md transition-all cursor-pointer hover:border-blue-400">
          
          <!-- Card Content -->
          <div class="flex items-start gap-4">
            <div class="text-3xl">{{ section.icon }}</div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-gray-900">{{ section.title }}</h2>
              <p class="text-gray-600 text-sm mt-1">{{ section.description }}</p>
              <button 
                class="mt-3 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                Go to {{ section.title }}
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
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
  sections: SettingsSection[] = [
    {
      id: 'users',
      title: 'Users',
      description: 'Manage tenant users, assign roles, and control access permissions',
      icon: '👥',
      route: 'users'
    },
    {
      id: 'roles',
      title: 'Roles & Permissions',
      description: 'Create and manage roles, define permissions, and organize access control',
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

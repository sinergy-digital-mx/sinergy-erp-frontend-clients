import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * RbacTenantUIComponent
 * Main container component for RBAC Tenant UI
 * Handles routing between Settings, Users Management, and Roles Management
 */
@Component({
  selector: 'app-rbac-tenant-ui',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="h-screen flex flex-col">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class RbacTenantUIComponent {}

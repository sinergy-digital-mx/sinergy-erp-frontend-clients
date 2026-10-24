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
    <div class="rbac-shell">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .rbac-shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    @media (max-width: 1023px) {
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }

      .rbac-shell {
        flex: 1 1 auto;
        min-height: 0;
        height: 100%;
      }

      .rbac-shell > app-users-management {
        flex: 1 1 auto;
        min-height: 0;
      }
    }
  `]
})
export class RbacTenantUIComponent {}

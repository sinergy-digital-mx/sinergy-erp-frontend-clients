import { Routes } from '@angular/router';
import { RbacTenantUIComponent } from './rbac-tenant-ui.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { RolesManagementComponent } from './pages/roles-management/roles-management.component';

export const RBAC_TENANT_UI_ROUTES: Routes = [
  {
    path: '',
    component: RbacTenantUIComponent,
    children: [
      {
        path: '',
        component: SettingsComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UsersManagementComponent
      },
      {
        path: 'roles',
        component: RolesManagementComponent
      }
    ]
  }
];

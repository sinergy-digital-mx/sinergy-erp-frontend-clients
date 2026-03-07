import { Routes } from '@angular/router';
import { RbacTenantUIComponent } from './rbac-tenant-ui.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { VendorListComponent } from '../settings/components/vendor-list/vendor-list.component';
import { WarehouseListComponent } from '../settings/components/warehouse-list/warehouse-list.component';
import { FiscalConfigurationListComponent } from '../settings/components/fiscal-configuration-list/fiscal-configuration-list.component';
import { ProductListComponent } from '../settings/components/product-list/product-list.component';

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
      },
      {
        path: 'vendors',
        component: VendorListComponent
      },
      {
        path: 'warehouses',
        component: WarehouseListComponent
      },
      {
        path: 'fiscal-configurations',
        component: FiscalConfigurationListComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      }
    ]
  }
];

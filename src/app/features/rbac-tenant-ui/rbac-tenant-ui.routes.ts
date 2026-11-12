import { Routes } from '@angular/router';
import { RbacTenantUIComponent } from './rbac-tenant-ui.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { FiscalConfigurationListComponent } from '../settings/components/fiscal-configuration-list/fiscal-configuration-list.component';
import { PosEquipmentListComponent } from '../settings/components/pos-equipment-list/pos-equipment-list.component';
import { EmailTemplatesListComponent } from '../settings/pages/email-templates-list/email-templates-list.component';
import { MailerConfigurationsListComponent } from '../settings/pages/mailer-configurations-list/mailer-configurations-list.component';
import { GpsTrackingConfigurationsListComponent } from '../settings/pages/gps-tracking-configurations-list/gps-tracking-configurations-list.component';
import { WhatsappSettingsComponent } from '../settings/pages/whatsapp-settings/whatsapp-settings.component';
import { WhatsappIntegrationGuideComponent } from '../settings/pages/whatsapp-integration-guide/whatsapp-integration-guide.component';
import { WHATSAPP_PERMISSIONS } from '../settings/config/whatsapp-permissions.config';
import { ExchangeRateSettingsComponent } from '../settings/components/exchange-rate-settings/exchange-rate-settings.component';
import { SalesOrderCreationSettingsComponent } from '../settings/pages/sales-order-creation-settings/sales-order-creation-settings.component';
import { SALES_ORDER_PERMISSIONS } from '../sales-orders/config/permissions.config';
import { SystemVersionsComponent } from '../settings/pages/system-versions/system-versions.component';
import { SETTINGS_PERMISSIONS } from '../settings/config/permissions.config';
import { permissionGuard } from '../../core/guards/permission.guard';
import { GPS_TRACKING_PERMISSIONS } from '../logistics/config/permissions.config';

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
        redirectTo: '/vendors',
        pathMatch: 'full',
      },
      {
        path: 'warehouses',
        redirectTo: 'fiscal-configurations',
        pathMatch: 'full'
      },
      {
        path: 'fiscal-configurations',
        component: FiscalConfigurationListComponent
      },
      {
        path: 'products',
        redirectTo: '/products',
        pathMatch: 'full',
      },
      {
        path: 'point-of-sale',
        redirectTo: 'pos-configuration',
        pathMatch: 'full'
      },
      {
        path: 'pos-configuration',
        component: PosEquipmentListComponent
      },
      {
        path: 'email-templates',
        component: EmailTemplatesListComponent
      },
      {
        path: 'mailer-configurations',
        component: MailerConfigurationsListComponent
      },
      {
        path: 'gps-tracking',
        component: GpsTrackingConfigurationsListComponent,
        canActivate: [permissionGuard],
        data: {
          permissions: [GPS_TRACKING_PERMISSIONS.viewMenu, GPS_TRACKING_PERMISSIONS.read],
          permissionMode: 'any',
          title: 'Rastreo GPS',
        },
      },
      {
        path: 'whatsapp/guide',
        component: WhatsappIntegrationGuideComponent,
        canActivate: [permissionGuard],
        data: {
          permissions: [WHATSAPP_PERMISSIONS.viewMenu, WHATSAPP_PERMISSIONS.read],
          permissionMode: 'any',
          title: 'Guía de integración de WhatsApp',
        },
      },
      {
        path: 'whatsapp',
        component: WhatsappSettingsComponent,
        canActivate: [permissionGuard],
        data: {
          permissions: [WHATSAPP_PERMISSIONS.viewMenu, WHATSAPP_PERMISSIONS.read],
          permissionMode: 'any',
          title: 'WhatsApp',
        },
      },
      {
        path: 'exchange-rates',
        component: ExchangeRateSettingsComponent
      },
      {
        path: 'sales-order-creation',
        component: SalesOrderCreationSettingsComponent,
        canActivate: [permissionGuard],
        data: {
          permissions: [SALES_ORDER_PERMISSIONS.update, SALES_ORDER_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Órdenes de venta',
        },
      },
      {
        path: 'versions',
        component: SystemVersionsComponent,
        canActivate: [permissionGuard],
        data: {
          permissions: [
            SETTINGS_PERMISSIONS.systemVersions.viewMenu,
            SETTINGS_PERMISSIONS.systemVersions.view,
          ],
          permissionMode: 'any',
          title: 'Versiones',
        },
      },
      {
        path: 'goals',
        loadChildren: () =>
          import('../goals/goals.routes').then((m) => m.GOALS_ROUTES),
      },
      {
        path: 'global-discounts',
        loadChildren: () =>
          import('../global-discounts/global-discounts.routes').then((m) => m.GLOBAL_DISCOUNTS_ROUTES),
      },
      {
        path: 'customer-groups',
        loadChildren: () =>
          import('../customer-groups/customer-groups.routes').then((m) => m.CUSTOMER_GROUPS_ROUTES),
      },
      {
        path: 'madereria-inventory-import',
        loadChildren: () =>
          import('../madereria-inventory-import/madereria-inventory-import.routes').then(
            (m) => m.MADERERIA_INVENTORY_IMPORT_ROUTES
          ),
      }
    ]
  }
];

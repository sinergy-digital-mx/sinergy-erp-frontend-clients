import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { AuthService } from '../../core/services/auth.service';
import { INVENTORY_PERMISSIONS, TRANSFER_PERMISSIONS } from '../inventory/config/permissions.config';
import { GPS_TRACKING_PERMISSIONS, ROUTE_PERMISSIONS, SHIPPING_PERMISSIONS, TRUCK_PERMISSIONS } from './config/permissions.config';
import {
  LogisticsEntryComponent,
  LogisticsShellComponent,
  logisticsHomePath,
} from './layout/logistics-shell.component';

export const logisticsHomeGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return router.parseUrl(logisticsHomePath(auth));
};

export const LOGISTICS_ROUTES: Routes = [
  {
    path: '',
    component: LogisticsShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [logisticsHomeGuard],
        component: LogisticsEntryComponent,
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/logistics-dashboard/logistics-dashboard.component').then(
            (m) => m.LogisticsDashboardComponent,
          ),
        canActivate: [permissionGuard],
        data: {
          permissions: [SHIPPING_PERMISSIONS.viewList, SHIPPING_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Dashboard logístico',
        },
      },
      {
        path: 'trips',
        loadComponent: () =>
          import('./pages/trips-list/trips-list.component').then((m) => m.TripsListComponent),
        canActivate: [permissionGuard],
        data: {
          permissions: [SHIPPING_PERMISSIONS.viewList, SHIPPING_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Viajes',
        },
      },
      {
        path: 'transfers',
        redirectTo: '/transfers',
      },
      {
        path: 'tracking',
        loadComponent: () =>
          import('./pages/gps-tracking/gps-tracking.component').then((m) => m.GpsTrackingComponent),
        canActivate: [permissionGuard],
        data: {
          permissions: [GPS_TRACKING_PERMISSIONS.viewMenu, GPS_TRACKING_PERMISSIONS.read],
          permissionMode: 'any',
          title: 'Rastreo GPS',
        },
      },
      {
        path: 'shippings',
        redirectTo: 'trips',
        pathMatch: 'full',
      },
      {
        path: 'transfer-process',
        loadComponent: () =>
          import('./pages/transfer-process/transfer-process.component').then(
            (m) => m.TransferProcessComponent,
          ),
        canActivate: [permissionGuard],
        data: {
          permissions: [
            INVENTORY_PERMISSIONS.viewList,
            INVENTORY_PERMISSIONS.viewMenu,
            INVENTORY_PERMISSIONS.transfer,
            TRANSFER_PERMISSIONS.viewList,
            TRANSFER_PERMISSIONS.viewMenu,
            SHIPPING_PERMISSIONS.viewList,
            SHIPPING_PERMISSIONS.viewMenu,
          ],
          permissionMode: 'any',
          title: 'Instrucciones',
        },
      },
      {
        path: 'routes',
        loadComponent: () =>
          import('./pages/logistics-routes-page/logistics-routes-page.component').then(
            (m) => m.LogisticsRoutesPageComponent,
          ),
        canActivate: [permissionGuard],
        data: {
          permissions: [ROUTE_PERMISSIONS.viewMenu, ROUTE_PERMISSIONS.viewList, 'sales_orders:Update'],
          permissionMode: 'any',
          title: 'Rutas',
        },
      },
      {
        path: 'trucks',
        loadComponent: () =>
          import('./pages/trucks-list/trucks-list.component').then((m) => m.TrucksListComponent),
        canActivate: [permissionGuard],
        data: {
          permissions: [TRUCK_PERMISSIONS.viewList, TRUCK_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Flota y remolques',
        },
      },
      {
        path: 'drivers',
        loadComponent: () =>
          import('./pages/drivers-list/drivers-list.component').then((m) => m.DriversListComponent),
        canActivate: [permissionGuard],
        data: {
          permissions: [SHIPPING_PERMISSIONS.viewList, SHIPPING_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Choferes',
        },
      },
    ],
  },
];

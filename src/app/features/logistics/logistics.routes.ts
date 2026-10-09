import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { AuthService } from '../../core/services/auth.service';
import { INVENTORY_PERMISSIONS } from '../inventory/config/permissions.config';
import { GPS_TRACKING_PERMISSIONS, SHIPPING_PERMISSIONS, TRUCK_PERMISSIONS } from './config/permissions.config';
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
        loadComponent: () =>
          import('../inventory/components/transfer-list/transfer-list.component').then(
            (m) => m.TransferListComponent,
          ),
        canActivate: [permissionGuard],
        data: {
          permissions: [INVENTORY_PERMISSIONS.viewList, INVENTORY_PERMISSIONS.viewMenu],
          permissionMode: 'any',
          title: 'Transferencias de inventario',
        },
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

import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { INVENTORY_PERMISSIONS } from './config/permissions.config';

export const INVENTORY_ROUTES: Routes = [
  {
    path: 'audits',
    loadComponent: () =>
      import('./components/audit-list/audit-list.component')
        .then(m => m.AuditListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [
        INVENTORY_PERMISSIONS.viewList,
        INVENTORY_PERMISSIONS.count,
        INVENTORY_PERMISSIONS.authorize,
      ],
      permissionMode: 'any',
      title: 'Auditorías de inventario'
    }
  },
  {
    path: 'transfers',
    loadComponent: () =>
      import('./components/transfer-list/transfer-list.component')
        .then(m => m.TransferListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: 'Transferencias de inventario'
    }
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/inventory-batch-list/inventory-batch-list.component')
        .then(m => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: 'Inventario'
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'totalizado' },
      {
        path: 'lotes',
        loadComponent: () =>
          import('./components/inventory-batches-view/inventory-batches-view.component')
            .then(m => m.InventoryBatchesViewComponent),
        data: { title: 'Inventario' },
      },
      {
        path: 'totalizado',
        loadComponent: () =>
          import('./components/inventory-summary-view/inventory-summary-view.component')
            .then(m => m.InventorySummaryViewComponent),
        data: { title: 'Inventario totalizado' },
      },
    ],
  },
];

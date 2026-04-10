import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { INVENTORY_PERMISSIONS } from './config/permissions.config';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/inventory-batch-list/inventory-batch-list.component')
        .then(m => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: 'Inventario'
    }
  }
];

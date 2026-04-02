import { Routes } from '@angular/router';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inventory-batch-list/inventory-batch-list.component')
        .then(m => m.InventoryBatchListComponent),
    data: { 
      permission: 'inventory:Read',
      title: 'Inventario'
    }
  }
];

import { Routes } from '@angular/router';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/inventory-list/inventory-list.component')
        .then(m => m.InventoryListComponent),
    data: { 
      permission: 'inventory:Read',
      title: 'Inventario'
    }
  }
];

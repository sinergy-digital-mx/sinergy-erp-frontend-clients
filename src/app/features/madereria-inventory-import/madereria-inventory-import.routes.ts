import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { MADERERIA_INVENTORY_IMPORT_PERMISSIONS } from './config/permissions.config';

export const MADERERIA_INVENTORY_IMPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/madereria-inventory-import-page/madereria-inventory-import-page.component').then(
        (m) => m.MadereriaInventoryImportPageComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [MADERERIA_INVENTORY_IMPORT_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Importación de inventario',
    },
  },
];

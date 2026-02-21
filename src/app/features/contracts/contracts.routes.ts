import { Routes } from '@angular/router';

export const CONTRACTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contracts-list/contracts-list.component').then(
        (m) => m.ContractsListComponent
      ),
  },
];

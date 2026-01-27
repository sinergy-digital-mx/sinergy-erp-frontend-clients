import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  // /leads
  {
    path: '',
    loadComponent: () =>
      import('./pages/customers-list/customers-list')
        .then(m => m.CustomersList),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/customer-detail/customer-detail')
        .then(m => m.CustomerDetail),
  },
];

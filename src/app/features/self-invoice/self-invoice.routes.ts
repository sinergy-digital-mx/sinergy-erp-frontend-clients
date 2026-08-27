import { Routes } from '@angular/router';

export const SELF_INVOICE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/self-invoice-portal/self-invoice-portal.component').then(
        (m) => m.SelfInvoicePortalComponent
      ),
    title: 'Facturar tu compra',
  },
  {
    path: ':code',
    loadComponent: () =>
      import('./pages/self-invoice-portal/self-invoice-portal.component').then(
        (m) => m.SelfInvoicePortalComponent
      ),
    title: 'Facturar tu compra',
  },
];

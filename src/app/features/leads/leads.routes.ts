import { Routes } from '@angular/router';

export const LEADS_ROUTES: Routes = [
  // /leads
  {
    path: '',
    loadComponent: () =>
      import('./pages/leads-list/leads-list')
        .then(m => m.LeadsList),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/lead-detail/lead-detail')
        .then(m => m.LeadDetail),
  },
];

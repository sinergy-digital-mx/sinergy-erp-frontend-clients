import { Routes } from '@angular/router';
import { serviceSubscriptionGuard } from './guards/service-subscription.guard';

export const SERVICE_SUBSCRIPTION_ROUTES: Routes = [
  {
    path: '',
    canActivate: [serviceSubscriptionGuard],
    loadComponent: () =>
      import('./pages/service-subscription-list/service-subscription-list.component').then(
        (m) => m.ServiceSubscriptionListComponent,
      ),
    data: { title: 'Suscripciones' },
  },
  {
    path: 'nueva',
    canActivate: [serviceSubscriptionGuard],
    loadComponent: () =>
      import('./pages/service-subscription-form/service-subscription-form.component').then(
        (m) => m.ServiceSubscriptionFormComponent,
      ),
    data: { title: 'Nueva suscripción' },
  },
  {
    path: ':id',
    canActivate: [serviceSubscriptionGuard],
    loadComponent: () =>
      import('./pages/service-subscription-detail/service-subscription-detail.component').then(
        (m) => m.ServiceSubscriptionDetailComponent,
      ),
    data: { title: 'Suscripción' },
  },
];

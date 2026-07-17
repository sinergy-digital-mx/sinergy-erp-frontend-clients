import { Routes } from '@angular/router';
import { divinoReservationFormatsGuard } from './guards/divino-reservation-formats.guard';

export const DIVINO_RESERVATION_FORMATS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [divinoReservationFormatsGuard],
    loadComponent: () =>
      import('./pages/reservation-formats-list/reservation-formats-list.component').then(
        (m) => m.ReservationFormatsListComponent,
      ),
    data: { title: 'Formatos de Reservación' },
  },
];

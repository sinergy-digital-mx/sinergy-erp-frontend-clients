import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { GOAL_PERMISSIONS } from './config/permissions.config';

export const GOALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/goals-list/goals-list.component').then((m) => m.GoalsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [GOAL_PERMISSIONS.viewList],
      permissionMode: 'any',
      title: 'Metas',
    },
  },
];

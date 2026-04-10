import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { MARKETING_PERMISSIONS } from './config/permissions.config';
import { MarketingComponent } from './marketing.component';
import { BulkEmailsComponent } from './pages/bulk-emails/bulk-emails.component';

export const MARKETING_ROUTES: Routes = [
  {
    path: '',
    component: MarketingComponent,
    canActivate: [permissionGuard],
    data: {
      permissions: [MARKETING_PERMISSIONS.viewDashboard]
    }
  },
  {
    path: 'bulk-emails',
    component: BulkEmailsComponent,
    canActivate: [permissionGuard],
    data: {
      permissions: [MARKETING_PERMISSIONS.sendEmail]
    }
  }
];

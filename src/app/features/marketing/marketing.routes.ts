import { Routes } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { BulkEmailsComponent } from './pages/bulk-emails/bulk-emails.component';

export const MARKETING_ROUTES: Routes = [
  {
    path: '',
    component: MarketingComponent
  },
  {
    path: 'bulk-emails',
    component: BulkEmailsComponent
  }
];

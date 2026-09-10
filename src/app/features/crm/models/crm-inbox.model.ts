import { ActivityStatus, ActivityType } from '../../customers/models/customer-group.model';
import { ReportPeriod } from '../../../core/components/report-period-selector/report-period-selector.component';

export type CrmAttentionFilter =
  | 'follow_up_pending'
  | 'follow_up_overdue'
  | 'call_pending'
  | 'task_pending';

export interface CrmActivityUser {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  display_name: string;
}

export interface CrmActivityCustomer {
  id: number;
  name: string;
  lastname: string | null;
  company_name: string | null;
  display_name: string;
}

export interface CrmActivity {
  id: string;
  customer_id: number;
  customer: CrmActivityCustomer | null;
  user_id: string | null;
  user: CrmActivityUser | null;
  type: ActivityType | string;
  status: ActivityStatus | string;
  title: string;
  description?: string | null;
  notes?: string | null;
  activity_date: string;
  follow_up_date?: string | null;
  duration_minutes?: number | null;
  outcome?: string | null;
  is_overdue_follow_up: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CrmActivityListResponse {
  activities: CrmActivity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  is_crm_admin: boolean;
}

export interface CrmActivityAuthor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  display_name: string;
  activity_count: number;
}

export interface CrmActivityAuthorsResponse {
  is_crm_admin: boolean;
  authors: CrmActivityAuthor[];
}

export interface CrmActivityStatsResponse {
  is_crm_admin: boolean;
  period: {
    period: ReportPeriod;
    date_from: string;
    date_to: string;
    label: string;
  };
  totals: {
    activities: number;
    by_type: Record<string, number>;
    by_status: Record<string, number>;
  };
  attention: {
    pending_calls: number;
    pending_follow_ups: number;
    overdue_follow_ups: number;
    upcoming_follow_ups: number;
    pending_tasks: number;
  };
}

export interface CrmInboxQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
  user_id?: string;
  period?: ReportPeriod;
  date_from?: string;
  date_to?: string;
  attention?: CrmAttentionFilter;
}

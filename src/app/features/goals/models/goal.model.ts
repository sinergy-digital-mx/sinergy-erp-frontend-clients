export type GoalScope = 'branch' | 'user_role';
export type MetricType = 'sales_count' | 'amount';
export type PeriodType = 'month' | 'week' | 'year' | 'custom';

export interface GoalBranchRef {
  id: string;
  display_name?: string;
  code?: string;
  name?: string;
}

export interface GoalRoleRef {
  id: string;
  name: string;
}

export interface Goal {
  id: string;
  goal_scope: GoalScope;
  billing_branch_id: string;
  billing_branch?: GoalBranchRef | null;
  role_id?: string | null;
  role?: GoalRoleRef | null;
  metric_type: MetricType;
  target_value: number;
  period_type: PeriodType;
  period_year: number;
  period_month?: number | null;
  is_active?: boolean;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateGoalDto {
  goal_scope: GoalScope;
  billing_branch_id: string;
  role_id?: string;
  metric_type: MetricType;
  target_value: number;
  period_type: PeriodType;
  period_year: number;
  period_month?: number;
  notes?: string;
}

export interface UpdateGoalDto {
  goal_scope?: GoalScope;
  billing_branch_id?: string;
  role_id?: string | null;
  metric_type?: MetricType;
  target_value?: number;
  period_type?: PeriodType;
  period_year?: number;
  period_month?: number | null;
  is_active?: boolean;
  notes?: string | null;
}

export interface GoalListParams {
  billing_branch_id?: string;
  period_year?: number;
  period_month?: number;
  is_active?: boolean;
}

export interface GoalListResponse {
  data: Goal[];
  total?: number;
}

export interface GoalSettings {
  commission_rate: number;
  is_default: boolean;
  updated_at?: string | null;
  updated_by?: string | null;
}

export interface UpdateGoalSettingsDto {
  commission_rate: number;
}

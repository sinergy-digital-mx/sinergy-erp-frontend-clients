/**
 * Customer Group Model
 * Represents a group that customers can be assigned to
 */
export interface CustomerGroup {
  id: string;
  name: string;
  description?: string;
  customer_count?: number;
}

/**
 * Customer Address Model
 * Represents an address for a customer
 */
export interface CustomerAddress {
  id: string;
  customer_id: string;
  type: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Customer Model
 * Represents a customer in the system
 */
export interface Customer {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  phone?: string;
  phone_country?: string;
  phone_code?: string;
  company_name?: string;
  group?: CustomerGroup | null;
  group_id?: string | null;
  status_id?: string;
  status?: {
    id: string;
    name: string;
  };
  contracts?: CustomerContract[];
  addresses?: CustomerAddress[];
  activities?: CustomerActivity[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Customer Contract Model
 * Represents a contract associated with a customer
 */
export interface CustomerContract {
  id: string;
  status: string;
  contract_number: string;
  contract_date: string;
  total_price: number;
  currency: string;
  property: {
    id: string;
    code: string;
    name: string;
    block: string;
    total_area: number;
    total_price: number;
    status: string;
  };
}

/**
 * Error State Model
 * Represents an error state with type and message
 */
export interface ErrorState {
  type: 'network' | 'server' | 'validation';
  message: string;
  retryable: boolean;
}

/**
 * Customer Edit Form State Model
 * Manages the state of the customer edit form
 */
export interface CustomerEditFormState {
  selectedGroupId: string | null;
  groupsLoading: boolean;
  groupsError: string | null;
  groups: CustomerGroup[];
  isSubmitting: boolean;
  submitError: string | null;
}

/**
 * Activity Type Enum
 */
export enum ActivityType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
  TASK = 'task',
  FOLLOW_UP = 'follow_up',
  PURCHASE = 'purchase',
  SUPPORT = 'support'
}

/**
 * Activity Status Enum
 */
export enum ActivityStatus {
  COMPLETED = 'completed',
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in_progress'
}

/**
 * Activity Outcome Enum
 */
export enum ActivityOutcome {
  SATISFIED = 'satisfied',
  ISSUE_RESOLVED = 'issue_resolved',
  ESCALATED = 'escalated',
  FOLLOW_UP_NEEDED = 'follow_up_needed'
}

/**
 * Customer Activity Model
 */
export interface CustomerActivity {
  id: string;
  customer_id: number;
  type: ActivityType;
  status: ActivityStatus;
  title: string;
  description?: string;
  activity_date: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

/**
 * Activity Summary Model
 */
export interface ActivitySummary {
  total_activities: number;
  activities_by_type: Record<ActivityType, number>;
  activities_by_status: Record<ActivityStatus, number>;
  last_activity_date?: string;
  next_follow_up?: string;
}

/**
 * Create Activity Request Model
 */
export interface CreateActivityRequest {
  type: ActivityType;
  status: ActivityStatus;
  title: string;
  description?: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
}

/**
 * Update Activity Request Model
 */
export interface UpdateActivityRequest {
  type?: ActivityType;
  status?: ActivityStatus;
  title?: string;
  description?: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
}

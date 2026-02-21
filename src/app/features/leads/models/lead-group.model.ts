/**
 * Communication Status Enum
 * Represents the communication status of a lead
 */
export enum CommunicationStatus {
  NOT_CONTACTED = 'not_contacted',
  CONTACTED = 'contacted',
  RESPONDED = 'responded'
}

/**
 * LeadGroup Model
 * Represents a group that leads can be assigned to
 */
export interface LeadGroup {
  id: string;
  name: string;
  description?: string;
  lead_count?: number;
}

/**
 * Lead Model (Extended)
 * The existing Lead model extended with group assignment and communication status
 */
export interface Lead {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  phone?: string;
  phone_code?: string;
  phone_country?: string;
  phone_country_code?: string;
  source?: string;
  status?: {
    id: string;
    name: string;
  };
  status_id?: string;
  company_name?: string;
  website?: string;
  group_id: string | null;
  email_contacted: boolean;
  first_email_sent_at: string | null;
  customer_answered: boolean;
  customer_answered_at: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Leads Stats Model
 * Contains statistics for leads dashboard
 */
export interface LeadsStats {
  total_leads: number;
  not_contacted: number;
  customer_responded_no_reply: number;
  customer_responded: number;
}

/**
 * Status Badge Data Model
 * Contains information for rendering a status badge
 */
export interface StatusBadgeData {
  status: CommunicationStatus;
  label: string;
  icon: string;
  color: string;
  tooltip: string;
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
 * LeadEditFormState Model
 * Manages the state of the lead edit form
 */
export interface LeadEditFormState {
  selectedGroupId: string | null;
  groupsLoading: boolean;
  groupsError: string | null;
  groups: LeadGroup[];
  isSubmitting: boolean;
  submitError: string | null;
}

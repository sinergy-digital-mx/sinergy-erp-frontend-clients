/**
 * Customer Group Model
 * Represents a group that customers can be assigned to
 */
export interface CustomerGroup {
  id: string;
  name: string;
  description?: string;
  is_system?: boolean;
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
  latitude?: number | null;
  longitude?: number | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Catálogo de estatus de cliente (GET /tenant/customers/statuses).
 */
export interface CustomerStatus {
  id: number;
  code: string;
  name: string;
}

/**
 * Crédito del cliente por razón social (no por almacén).
 */
export interface CustomerFiscalCredit {
  fiscal_configuration_id: string;
  razon_social?: string;
  rfc?: string;
  fiscal_status?: string;
  credit_enabled?: boolean;
  credit_days?: number | null;
  credit_amount?: number | null;
  credit_used?: number | null;
  credit_available?: number | null;
  credit_usage_percent?: number | null;
}

export interface CustomerCreditsUpdateItem {
  fiscal_configuration_id: string;
  credit_enabled: boolean;
  credit_days?: number | null;
  credit_amount?: number | null;
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
  /** ISO país (titular); el API puede devolver `country` y/o `phone_country`. */
  country?: string;
  phone_country?: string;
  phone_code?: string;
  company_name?: string;
  /** Crédito aplanado de una razón (GET ?fiscal_configuration_id=). No es global. */
  credit_enabled?: boolean;
  credit_days?: number | null;
  credit_amount?: number | null;
  credit_used?: number | null;
  credit_available?: number | null;
  credit_usage_percent?: number | null;
  credits?: CustomerFiscalCredit[];
  auto_generate_invoice?: boolean;
  fiscal_ready_for_invoice?: boolean;
  fiscal_missing_fields?: string[];
  is_walk_in?: boolean;
  fiscal_rfc?: string;
  fiscal_razon_social?: string;
  fiscal_person_type?: string;
  /** Legado GET: no enviar en POST/PUT. Prefill de Calle si `fiscal_street` viene vacío. */
  fiscal_address?: string;
  /** Legado GET: no enviar en POST/PUT. Prefill de Municipio si `fiscal_municipio` viene vacío. */
  fiscal_city?: string;
  fiscal_street?: string;
  fiscal_exterior_number?: string;
  fiscal_interior_number?: string;
  fiscal_colonia?: string;
  fiscal_localidad?: string;
  fiscal_municipio?: string;
  fiscal_state?: string;
  fiscal_postal_code?: string;
  fiscal_country?: string;
  group?: CustomerGroup | null;
  group_id?: string | null;
  legacy_customer_id?: number | null;
  status_id?: number | string | null;
  additional_name?: string;
  additional_lastname?: string;
  additional_email?: string;
  additional_phone?: string;
  additional_phone_country?: string;
  additional_phone_code?: string;
  status?: CustomerStatus | null;
  registered_fiscal_configuration_id?: string | null;
  registered_fiscal_configuration?: CustomerRegisteredFiscalConfiguration | null;
  registered_billing_branch_id?: string | null;
  registered_billing_branch?: CustomerRegisteredBranch | null;
  registered_by_user_id?: string | null;
  registered_by_user?: CustomerRegisteredByUser | null;
  assigned_seller_user_id?: string | null;
  assigned_seller_user?: CustomerAssignedSellerUser | null;
  assignment_history?: AssignmentHistoryEntry[] | null;
  contracts?: CustomerContract[];
  addresses?: CustomerAddress[];
  activities?: CustomerActivity[];
  created_at?: string;
  updated_at?: string;
}

/** Razón social de registro embebida en GET /tenant/customers/:id. */
export interface CustomerRegisteredFiscalConfiguration {
  id: string;
  razon_social?: string | null;
  rfc?: string | null;
}

/** Sucursal de registro embebida en GET /tenant/customers/:id. */
export interface CustomerRegisteredBranch {
  id: string;
  code: string;
  name?: string;
}

/** Usuario que dio de alta, embebido en GET /tenant/customers/:id. */
export interface CustomerRegisteredByUser {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}

/** Vendedor asignado (comisiona) embebido en GET /tenant/customers/:id. */
export interface CustomerAssignedSellerUser {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  pos_user_code?: number | string | null;
}

export interface AssignmentHistoryChange {
  field?: string;
  field_label?: string;
  from?: string | null;
  to?: string | null;
  from_id?: string | null;
  to_id?: string | null;
}

export interface AssignmentHistoryEntry {
  id: string;
  type?: string;
  type_label?: string;
  title?: string;
  description?: string;
  actor_id?: string | null;
  actor_name?: string | null;
  occurred_at?: string | null;
  changes?: AssignmentHistoryChange[];
}

/** Catálogo GET /tenant/customers/registration-options. */
export interface CustomerRegistrationOptions {
  fiscal_configurations: CustomerRegistrationFiscalOption[];
  users: CustomerRegistrationUserOption[];
  sellers: CustomerRegistrationSellerOption[];
}

export interface CustomerRegistrationFiscalOption {
  id: string;
  razon_social?: string | null;
  rfc?: string | null;
  status?: string | null;
  branches: CustomerRegistrationBranchOption[];
}

export interface CustomerRegistrationBranchOption {
  id: string;
  name: string;
}

export interface CustomerRegistrationUserOption {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  status?: string | null;
}

export interface CustomerRegistrationSellerOption {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  pos_user_code?: number | string | null;
  status?: string | null;
}

export type CustomerDuplicateMatchReason = 'email' | 'phone' | 'name' | 'rfc';

export interface CheckCustomerDuplicatesDto {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  phone_code?: string;
  fiscal_rfc?: string;
}

export interface CustomerDuplicateMatch {
  id: string | number;
  name: string;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  phone_code?: string | null;
  fiscal_rfc?: string | null;
  company_name?: string | null;
  status?: CustomerStatus | null;
  match_reasons: CustomerDuplicateMatchReason[];
}

export interface CustomerDuplicatesResponse {
  found: boolean;
  matches: CustomerDuplicateMatch[];
}

/**
 * Cuerpo admitido por el DTO de actualización (PUT); todos los campos son opcionales en el contrato,
 * pero el formulario envía los que edita el usuario.
 */
export interface UpdateCustomerDto {
  status_id?: number | string | null;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  phone_code?: string;
  country?: string;
  company_name?: string;
  credit_enabled?: boolean;
  credit_days?: number | null;
  credit_amount?: number | null;
  auto_generate_invoice?: boolean;
  fiscal_rfc?: string;
  /** Vacío o null borra la razón social en edición. */
  fiscal_razon_social?: string | null;
  fiscal_person_type?: string;
  fiscal_postal_code?: string | null;
  fiscal_street?: string | null;
  fiscal_exterior_number?: string | null;
  fiscal_interior_number?: string | null;
  fiscal_colonia?: string | null;
  fiscal_localidad?: string | null;
  fiscal_municipio?: string | null;
  fiscal_state?: string | null;
  fiscal_country?: string | null;
  group_id?: string | null;
  additional_name?: string;
  additional_lastname?: string;
  additional_email?: string;
  additional_phone?: string;
  additional_phone_country?: string;
  additional_phone_code?: string;
  registered_fiscal_configuration_id?: string | null;
  registered_billing_branch_id?: string | null;
  registered_by_user_id?: string | null;
  assigned_seller_user_id?: string | null;
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

export interface GpsTrackingConfiguration {
  id: string;
  name: string;
  username: string;
  is_active: boolean;
  is_valid: boolean;
  has_password: boolean;
  last_test_result?: {
    ok?: boolean;
    message?: string;
    unit_count?: number;
    tested_at?: string;
  } | null;
  last_test_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateGpsTrackingConfigurationDto {
  name: string;
  username: string;
  password: string;
}

export interface UpdateGpsTrackingConfigurationDto {
  name?: string;
  username?: string;
  password?: string;
}

export interface GpsTrackingTestResult {
  ok: boolean;
  message: string;
  unit_count: number;
}

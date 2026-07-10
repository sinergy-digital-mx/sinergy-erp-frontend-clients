export type FinkokEnvironment = 'demo' | 'production';

export type FinkokConnectionTestStatus = 'connected' | 'failed' | string;

export type FinkokRegistrationStatus = 'pending' | 'registered' | 'failed' | string;

export interface FinkokEnvironmentConfig {
  finkok_username?: string;
  environment: FinkokEnvironment;
  is_active?: number | boolean;
  is_stamping_default?: number | boolean;
  has_password?: boolean;
  last_connection_test_status?: FinkokConnectionTestStatus | null;
}

export interface FinkokConfigurationsResponse {
  stamping_environment: FinkokEnvironment;
  environments: {
    demo: FinkokEnvironmentConfig | null;
    production: FinkokEnvironmentConfig | null;
  };
}

/** @deprecated Legacy single-environment shape — use FinkokConfigurationsResponse */
export interface FinkokConfiguration extends FinkokEnvironmentConfig {}

export interface SaveFinkokConfigurationDto {
  environment: FinkokEnvironment;
  finkok_username: string;
  finkok_password: string;
  is_active: 0 | 1;
  is_stamping_default?: 0 | 1;
}

export interface FinkokTestConnectionResult {
  environment?: FinkokEnvironment;
  last_connection_test_status?: FinkokConnectionTestStatus;
  message?: string;
}

export interface FinkokStatusResponse {
  rfc: string;
  exists_in_finkok: boolean;
  finkok_registration_status?: FinkokRegistrationStatus;
  finkok_remote_status?: string;
  finkok_stamps_counter?: number;
  finkok_stamps_credit?: number | null;
  environment: FinkokEnvironment | string;
  message?: string;
}

export interface RegisterFinkokDto {
  mode: 'verify' | 'add' | 'link_only';
  environment?: FinkokEnvironment;
  add_if_missing?: boolean;
}

export function isFinkokConfigurationsResponse(
  config: FinkokConfigurationsResponse | FinkokConfiguration | null | undefined
): config is FinkokConfigurationsResponse {
  return !!config && 'environments' in config;
}

export function getStampingEnvironmentConfig(
  config: FinkokConfigurationsResponse | FinkokConfiguration | null | undefined
): FinkokEnvironmentConfig | null {
  if (!config) {
    return null;
  }

  if (isFinkokConfigurationsResponse(config)) {
    const env = config.stamping_environment || 'demo';
    return config.environments?.[env] ?? null;
  }

  return config;
}

export function hasFinkokCredentials(
  config: FinkokConfigurationsResponse | FinkokConfiguration | null | undefined
): boolean {
  const envConfig = getStampingEnvironmentConfig(config);
  if (!envConfig) {
    return false;
  }

  const isActive = envConfig.is_active === 1 || envConfig.is_active === true;
  const hasPassword = envConfig.has_password === true;
  return isActive && hasPassword;
}

export function getFinkokConnectionStatusLabel(status?: FinkokConnectionTestStatus | null): string {
  if (!status) {
    return 'Sin probar';
  }

  switch (status) {
    case 'connected':
      return 'Conectado';
    case 'failed':
      return 'Error de conexión';
    default:
      return status;
  }
}

export function getFinkokRegistrationStatusLabel(status?: FinkokRegistrationStatus | null): string {
  switch (status) {
    case 'registered':
      return 'Registrada / vinculada';
    case 'pending':
      return 'Pendiente Finkok';
    case 'failed':
      return 'Error de registro';
    default:
      return status || 'Sin registrar';
  }
}

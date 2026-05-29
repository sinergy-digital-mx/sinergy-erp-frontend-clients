export type MailerVendor = 'resend';

export interface MailerVendorConfig {
  apiKey?: string;
  fromEmail?: string;
  fromName?: string;
  replyTo?: string;
  [key: string]: unknown;
}

export interface MailerConfiguration {
  id: string;
  tenant_id?: string;
  name: string;
  vendor: MailerVendor;
  vendor_config?: MailerVendorConfig;
  vendorConfig?: MailerVendorConfig;
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MailerConfigurationListResponse {
  data: MailerConfiguration[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface CreateMailerConfigurationDto {
  name: string;
  vendor: MailerVendor;
  vendorConfig: MailerVendorConfig;
  apiKey?: string;
  isActive?: boolean;
}

export interface UpdateMailerConfigurationDto {
  name?: string;
  vendorConfig?: MailerVendorConfig;
  apiKey?: string;
  isActive?: boolean;
}

export interface EmailTemplate {
  id: string;
  tenant_id: string;
  name: string;
  subject: string;
  body_html?: string;
  body?: string;
  bodyHtml?: string;
  description?: string;
  variables?: string[];
  custom_variables?: CustomEmailTemplateVariable[];
  customVariables?: CustomEmailTemplateVariable[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplateListParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface EmailTemplateListResponse {
  data: EmailTemplate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmailTemplateVariable {
  key: string;
  label: string;
  type: string;
  source: string;
}

export interface EmailTemplateVariableGroup {
  entity: string;
  label: string;
  moduleCode: string;
  variables: EmailTemplateVariable[];
}

export interface CustomEmailTemplateVariable {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
}

export interface CreateEmailTemplateDto {
  name: string;
  subject: string;
  bodyHtml: string;
  variables?: string[];
  customVariables?: CustomEmailTemplateVariable[];
  isActive?: boolean;
}

export interface UpdateEmailTemplateDto extends Partial<CreateEmailTemplateDto> {}

export interface EmailTemplatePreviewPayload {
  subject: string;
  bodyHtml: string;
  variables?: Record<string, unknown>;
  context?: {
    entity: string;
    id: string;
  };
}

export interface EmailTemplatePreviewResponse {
  subject: string;
  bodyHtml: string;
  missingVariables: string[];
}

export interface EmailTemplateRenderPayload {
  context: {
    entity: string;
    id: string;
  };
}

export interface EmailTemplateSendPayload extends EmailTemplateRenderPayload {
  toEmail?: string;
  cc?: string[];
  bcc?: string[];
}

export interface EmailTemplateSendResponse extends EmailTemplatePreviewResponse {
  provider: string;
  providerMessageId: string;
  toEmail: string;
}

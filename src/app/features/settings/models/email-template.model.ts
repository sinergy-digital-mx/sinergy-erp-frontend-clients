export interface EmailTemplate {
  id: string;
  tenant_id: string;
  name: string;
  subject: string;
  body: string;
  description?: string;
  variables?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateEmailTemplateDto {
  name: string;
  subject: string;
  body: string;
  description?: string;
  variables?: string[];
  is_active?: boolean;
}

export interface UpdateEmailTemplateDto extends Partial<CreateEmailTemplateDto> {}

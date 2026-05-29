import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateEmailTemplateDto,
  EmailTemplate,
  EmailTemplateListParams,
  EmailTemplateListResponse,
  EmailTemplatePreviewPayload,
  EmailTemplatePreviewResponse,
  EmailTemplateRenderPayload,
  EmailTemplateSendPayload,
  EmailTemplateSendResponse,
  EmailTemplateVariableGroup,
  UpdateEmailTemplateDto
} from '../models/email-template.model';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getEmailTemplates(params?: EmailTemplateListParams): Observable<EmailTemplateListResponse> {
    return this.http.get<EmailTemplateListResponse>(`${this.api}/tenant/email-templates`, { params: params as any });
  }

  getAvailableVariables(): Observable<EmailTemplateVariableGroup[]> {
    return this.http.get<EmailTemplateVariableGroup[]>(`${this.api}/tenant/email-templates/variables`);
  }

  getEmailTemplate(id: string): Observable<EmailTemplate> {
    return this.http.get<EmailTemplate>(`${this.api}/tenant/email-templates/${id}`);
  }

  createEmailTemplate(data: CreateEmailTemplateDto): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.api}/tenant/email-templates`, data);
  }

  updateEmailTemplate(id: string, data: UpdateEmailTemplateDto): Observable<EmailTemplate> {
    return this.http.patch<EmailTemplate>(`${this.api}/tenant/email-templates/${id}`, data);
  }

  deleteEmailTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/email-templates/${id}`);
  }

  previewEmailTemplate(data: EmailTemplatePreviewPayload): Observable<EmailTemplatePreviewResponse> {
    return this.http.post<EmailTemplatePreviewResponse>(`${this.api}/tenant/email-templates/preview`, data);
  }

  renderEmailTemplate(id: string, data: EmailTemplateRenderPayload): Observable<EmailTemplatePreviewResponse> {
    return this.http.post<EmailTemplatePreviewResponse>(`${this.api}/tenant/email-templates/${id}/render`, data);
  }

  sendEmailTemplate(id: string, data: EmailTemplateSendPayload): Observable<EmailTemplateSendResponse> {
    return this.http.post<EmailTemplateSendResponse>(`${this.api}/tenant/email-templates/${id}/send`, data);
  }
}

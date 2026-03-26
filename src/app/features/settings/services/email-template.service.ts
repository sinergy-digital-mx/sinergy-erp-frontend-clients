import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmailTemplate, CreateEmailTemplateDto, UpdateEmailTemplateDto } from '../models/email-template.model';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getEmailTemplates(params?: any): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/email-templates`, { params });
  }

  getEmailTemplate(id: string): Observable<EmailTemplate> {
    return this.http.get<EmailTemplate>(`${this.api}/tenant/email-templates/${id}`);
  }

  createEmailTemplate(data: CreateEmailTemplateDto): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.api}/tenant/email-templates`, data);
  }

  updateEmailTemplate(id: string, data: UpdateEmailTemplateDto): Observable<EmailTemplate> {
    return this.http.put<EmailTemplate>(`${this.api}/tenant/email-templates/${id}`, data);
  }

  deleteEmailTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/email-templates/${id}`);
  }
}

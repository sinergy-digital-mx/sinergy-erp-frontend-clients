import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateMailerConfigurationDto,
  MailerConfiguration,
  MailerConfigurationListResponse,
  UpdateMailerConfigurationDto
} from '../models/mailer-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class MailerConfigurationService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getMailerConfigurations(): Observable<MailerConfiguration[] | MailerConfigurationListResponse> {
    return this.http.get<MailerConfiguration[] | MailerConfigurationListResponse>(`${this.api}/tenant/mailer-configurations`);
  }

  getActiveMailerConfiguration(): Observable<MailerConfiguration> {
    return this.http.get<MailerConfiguration>(`${this.api}/tenant/mailer-configurations/active`);
  }

  createMailerConfiguration(data: CreateMailerConfigurationDto): Observable<MailerConfiguration> {
    return this.http.post<MailerConfiguration>(`${this.api}/tenant/mailer-configurations`, data);
  }

  updateMailerConfiguration(id: string, data: UpdateMailerConfigurationDto): Observable<MailerConfiguration> {
    return this.http.patch<MailerConfiguration>(`${this.api}/tenant/mailer-configurations/${id}`, data);
  }

  activateMailerConfiguration(id: string): Observable<MailerConfiguration> {
    return this.http.post<MailerConfiguration>(`${this.api}/tenant/mailer-configurations/${id}/activate`, {});
  }

  deleteMailerConfiguration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/mailer-configurations/${id}`);
  }
}

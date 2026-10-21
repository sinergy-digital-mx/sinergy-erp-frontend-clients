import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  SendWhatsappTextDto,
  WhatsappMessage,
  WhatsappMessagesPage,
  WhatsappQrResponse,
  WhatsappSession,
} from '../models/whatsapp.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly api = `${environment.api}/tenant/whatsapp`;

  constructor(private http: HttpClient) {}

  status(): Observable<WhatsappSession> {
    return this.http.get<WhatsappSession>(`${this.api}/session`);
  }

  connect(): Observable<WhatsappSession> {
    return this.http.post<WhatsappSession>(`${this.api}/session/connect`, {});
  }

  qr(): Observable<WhatsappQrResponse> {
    return this.http.get<WhatsappQrResponse>(`${this.api}/session/qr`);
  }

  pairingCode(phone: string): Observable<{ code: string }> {
    return this.http.post<{ code: string }>(`${this.api}/session/pairing-code`, { phone });
  }

  restart(): Observable<WhatsappSession> {
    return this.http.post<WhatsappSession>(`${this.api}/session/restart`, {});
  }

  logout(): Observable<WhatsappSession> {
    return this.http.post<WhatsappSession>(`${this.api}/session/logout`, {});
  }

  remove(): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.api}/session`);
  }

  sendText(payload: SendWhatsappTextDto): Observable<WhatsappMessage> {
    return this.http.post<WhatsappMessage>(`${this.api}/messages/text`, payload);
  }

  messages(page = 1, limit = 10): Observable<WhatsappMessagesPage> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<WhatsappMessagesPage>(`${this.api}/messages`, { params });
  }
}

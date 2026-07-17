import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateDivinoReservationFormatDto,
  DivinoReservationFormat,
  DivinoReservationFormatListResponse,
  QueryDivinoReservationFormatParams,
  SendDivinoReservationFormatDto,
  UpdateDivinoReservationFormatDto,
} from '../models/divino-reservation-format.model';

@Injectable({ providedIn: 'root' })
export class DivinoReservationFormatService {
  private readonly api = `${environment.api}/tenant/divino-reservation-formats`;

  constructor(private http: HttpClient) {}

  list(params?: QueryDivinoReservationFormatParams): Observable<DivinoReservationFormatListResponse> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page != null) httpParams = httpParams.set('page', String(params.page));
      if (params.limit != null) httpParams = httpParams.set('limit', String(params.limit));
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.property_id) httpParams = httpParams.set('property_id', params.property_id);
    }
    return this.http.get<DivinoReservationFormatListResponse>(this.api, { params: httpParams });
  }

  get(id: string): Observable<DivinoReservationFormat> {
    return this.http.get<DivinoReservationFormat>(`${this.api}/${id}`);
  }

  create(dto: CreateDivinoReservationFormatDto): Observable<DivinoReservationFormat> {
    return this.http.post<DivinoReservationFormat>(this.api, dto);
  }

  update(id: string, dto: UpdateDivinoReservationFormatDto): Observable<DivinoReservationFormat> {
    return this.http.put<DivinoReservationFormat>(`${this.api}/${id}`, dto);
  }

  delete(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.api}/${id}`);
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(`${this.api}/${id}/pdf`, { responseType: 'blob' });
  }

  send(id: string, dto: SendDivinoReservationFormatDto): Observable<DivinoReservationFormat> {
    return this.http.post<DivinoReservationFormat>(`${this.api}/${id}/send`, dto);
  }
}

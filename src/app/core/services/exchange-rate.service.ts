import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DailyExchangeRate {
  rate_date: string;
  exchange_rate: number;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ExchangeRateHistoryResponse {
  data: DailyExchangeRate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExchangeRateHistoryQuery {
  page?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  upsertDailyExchangeRate(payload: {
    exchange_rate: number;
    rate_date?: string;
    notes?: string;
  }): Observable<DailyExchangeRate> {
    return this.http.put<any>(`${this.api}/tenant/exchange-rates/daily`, payload).pipe(
      map((response) => this.normalizeDailyRate(response))
    );
  }

  getDailyExchangeRate(date?: string): Observable<DailyExchangeRate> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }

    return this.http.get<any>(`${this.api}/tenant/exchange-rates/daily`, { params }).pipe(
      map((response) => this.normalizeDailyRate(response))
    );
  }

  getExchangeRateHistory(query?: ExchangeRateHistoryQuery): Observable<ExchangeRateHistoryResponse> {
    return this.http.get<any>(`${this.api}/tenant/exchange-rates`, { params: query as any }).pipe(
      map((response) => {
        const data = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];

        return {
          data: data.map((item: any) => this.normalizeDailyRate(item)),
          total: response?.total ?? data.length,
          page: response?.page ?? 1,
          limit: response?.limit ?? query?.limit ?? data.length,
          totalPages: response?.totalPages ?? 1
        } as ExchangeRateHistoryResponse;
      })
    );
  }

  private normalizeDailyRate(response: any): DailyExchangeRate {
    const item = response?.data ?? response ?? {};

    return {
      rate_date: item.rate_date,
      exchange_rate: Number(item.exchange_rate),
      notes: item.notes ?? null,
      created_at: item.created_at,
      updated_at: item.updated_at
    };
  }
}

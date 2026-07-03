import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateGoalDto,
  Goal,
  GoalListParams,
  GoalSettings,
  UpdateGoalDto,
  UpdateGoalSettingsDto,
} from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private readonly apiUrl = `${environment.api}/tenant/goals`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<GoalSettings> {
    return this.http.get<GoalSettings>(`${this.apiUrl}/settings`);
  }

  updateSettings(payload: UpdateGoalSettingsDto): Observable<GoalSettings> {
    return this.http.patch<GoalSettings>(`${this.apiUrl}/settings`, payload);
  }

  getGoals(filters: GoalListParams = {}): Observable<Goal[]> {
    let params = new HttpParams();

    if (filters.billing_branch_id) {
      params = params.set('billing_branch_id', filters.billing_branch_id);
    }
    if (filters.period_year != null) {
      params = params.set('period_year', String(filters.period_year));
    }
    if (filters.period_month != null) {
      params = params.set('period_month', String(filters.period_month));
    }
    if (filters.is_active != null) {
      params = params.set('is_active', String(filters.is_active));
    }

    return this.http.get<Goal[] | { data: Goal[] }>(this.apiUrl, { params }).pipe(
      map((response) => (Array.isArray(response) ? response : response?.data ?? []))
    );
  }

  getGoal(id: string): Observable<Goal> {
    return this.http.get<Goal>(`${this.apiUrl}/${id}`);
  }

  createGoal(payload: CreateGoalDto): Observable<Goal> {
    return this.http.post<Goal>(this.apiUrl, payload);
  }

  updateGoal(id: string, payload: UpdateGoalDto): Observable<Goal> {
    return this.http.patch<Goal>(`${this.apiUrl}/${id}`, payload);
  }

  deleteGoal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

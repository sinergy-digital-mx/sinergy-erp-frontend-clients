import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LeadsStats } from '../../features/leads/models/lead-group.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  api = environment.api;

  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {}

  getLeads(params: any): Observable<any> {
    return this.http.get(`${this.api}/leads`, {
      params
    });
  }

  getDetail(id: any): Observable<any> {
    return this.http.get(`${this.api}/leads/${id}`);
  }

  createLead(params: any): Observable<any> {
    return this.http.post(`${this.api}/leads`, params);
  }

  updateLead(params: any): Observable<any> {
    return this.http.put(`${this.api}/leads/${params.id}`, params);
  }

  createActivity(data: any): Observable<any> {
    return this.http.post(`${this.api}/leads/${data.lead_id}/activities`, data);
  }

  getLeadsStats(): Observable<LeadsStats> {
    return this.http.get<LeadsStats>(`${this.api}/leads/stats/overview`);
  }
}

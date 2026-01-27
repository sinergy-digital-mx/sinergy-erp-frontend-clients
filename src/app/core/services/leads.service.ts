import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class LeadService {
  api = environment.api;


  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {
    
  }


  getLeads(params: any): Observable<any> {
    return this.http.get(`${this.api}/leads`, {
      params
    });
  }

  getDetail(id: any): Observable<any> {
    return this.http.get(`${this.api}/leads?id=${id}`);
  }

}

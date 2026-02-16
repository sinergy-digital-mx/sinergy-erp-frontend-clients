import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  api = environment.api;


  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {
    
  }


  getCustomers(params: any): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers`, {
      params
    });
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}`);
  }

  getCustomerAddresses(id: string): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}/addresses`);
  }

  getCustomerActivities(id: string, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}/activities`, {
      params: { page, limit }
    });
  }

  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.api}/tenant/customers/${id}`, data);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.api}/tenant/customers`, data);
  }

  // getDetail(id: any): Observable<any> {
  //   return this.http.get(`${this.api}/leads/${id}`);
  // }

  // createLead(params: any): Observable<any> {
  //   return this.http.post(`${this.api}/leads`,params);
  // }

  // updateLead(params: any): Observable<any> {
  //   return this.http.put(`${this.api}/leads/${params.id}`,params);
  // }

  // createActivity(data): Observable<any> {
  //   console.log(data)
  //   return this.http.post(`${this.api}/leads/${data.lead_id}/activities`,data);
  // }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CustomerStatus, UpdateCustomerDto } from '../../features/customers/models/customer-group.model';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  api = environment.api;
  private statusesCache: CustomerStatus[] | null = null;


  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {
    
  }

  getCustomerStatuses(force = false): Observable<CustomerStatus[]> {
    if (this.statusesCache && !force) {
      return of(this.statusesCache);
    }
    return this.http
      .get<CustomerStatus[]>(`${this.api}/tenant/customers/statuses`)
      .pipe(tap((list) => {
        this.statusesCache = Array.isArray(list) ? list : [];
      }));
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

  updateCustomer(id: string, data: UpdateCustomerDto): Observable<any> {
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

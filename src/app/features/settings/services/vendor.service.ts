import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Vendor, CreateVendorDto, UpdateVendorDto, VendorListResponse, VendorQueryParams } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getVendors(params?: VendorQueryParams): Observable<VendorListResponse> {
    return this.http.get<VendorListResponse>(`${this.api}/tenant/vendors`, { params: params as any });
  }

  getVendor(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.api}/tenant/vendors/${id}`);
  }

  createVendor(data: CreateVendorDto): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.api}/tenant/vendors`, data);
  }

  updateVendor(id: string, data: UpdateVendorDto): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.api}/tenant/vendors/${id}`, data);
  }

  deleteVendor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/vendors/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  TransferContext,
  CreateTransferDto,
  InventoryTransfer,
  TransferFilters,
  PaginationParams,
  TransferListResponse,
} from '../models/inventory-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryTransferService {
  private readonly baseUrl = `${environment.api}/tenant/inventory/transfers`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getContext(productId: string, warehouseId: string): Observable<TransferContext> {
    const params = new HttpParams()
      .set('product_id', productId)
      .set('warehouse_id', warehouseId);

    return this.http.get<TransferContext>(`${this.baseUrl}/context`, { params })
      .pipe(catchError(error => this.handleError(error)));
  }

  createTransfer(data: CreateTransferDto): Observable<InventoryTransfer> {
    return this.http.post<InventoryTransfer>(this.baseUrl, data)
      .pipe(catchError(error => this.handleError(error)));
  }

  getTransfers(
    filters: TransferFilters,
    pagination: PaginationParams
  ): Observable<TransferListResponse> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) params = params.set('search', filters.search);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.source_warehouse_id) params = params.set('source_warehouse_id', filters.source_warehouse_id);
    if (filters.destination_warehouse_id) params = params.set('destination_warehouse_id', filters.destination_warehouse_id);
    if (filters.source_billing_branch_id) params = params.set('source_billing_branch_id', filters.source_billing_branch_id);
    if (filters.destination_billing_branch_id) params = params.set('destination_billing_branch_id', filters.destination_billing_branch_id);
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);

    return this.http.get<TransferListResponse>(this.baseUrl, { params })
      .pipe(catchError(error => this.handleError(error)));
  }

  getTransferById(id: string): Observable<InventoryTransfer> {
    return this.http.get<InventoryTransfer>(`${this.baseUrl}/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    switch (error.status) {
      case 401:
        this.router.navigate(['/auth/login']);
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        break;
      case 403:
        errorMessage = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        errorMessage = 'Transferencia no encontrada';
        break;
      case 400:
      case 422:
        errorMessage = this.extractErrorMessage(error);
        break;
      case 500:
        errorMessage = 'Error del servidor. Por favor, intenta más tarde';
        break;
      case 0:
        errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet';
        break;
      default:
        errorMessage = 'Ha ocurrido un error inesperado';
    }

    return throwError(() => new Error(errorMessage));
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error?.message === 'string') {
      return error.error.message;
    }
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return (errors as string[]).join(', ');
    }
    return 'Error de validación. Por favor, verifica los datos ingresados.';
  }
}

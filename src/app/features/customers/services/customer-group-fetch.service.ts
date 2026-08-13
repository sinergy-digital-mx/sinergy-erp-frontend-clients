import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerGroup } from '../models/customer-group.model';

/**
 * Catálogo de grupos para filtro/select de Clientes.
 * Usa GET /tenant/customers/groups (customers:Read), no el CRUD de Configuración.
 * Cache en memoria de la sesión actual; se invalida al cambiar de organización.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerGroupFetchService {
  private readonly api = environment.api;
  private groupsCache: CustomerGroup[] | null = null;
  private cacheTenantId: string | null = null;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  fetchGroups(): Observable<CustomerGroup[]> {
    const tenantId = this.currentTenantId();
    if (this.groupsCache && this.cacheTenantId === tenantId) {
      return of(this.groupsCache);
    }

    return this.http.get<unknown>(`${this.api}/tenant/customers/groups`).pipe(
      map((response) => this.normalizeList(response)),
      tap((groups) => {
        this.groupsCache = groups;
        this.cacheTenantId = tenantId;
      }),
      catchError((error) => {
        let errorMessage = 'Failed to fetch groups. Please try again.';
        let errorType: 'network' | 'server' | 'validation' = 'network';

        if (error.status >= 500) {
          errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
          errorType = 'server';
        } else if (error.status >= 400) {
          errorMessage = 'Error de validación. Por favor, verifica los datos.';
          errorType = 'validation';
        } else if (error.status === 0) {
          errorMessage = 'No se puede conectar. Por favor, verifica tu conexión a internet.';
          errorType = 'network';
        }

        return throwError(() => ({
          type: errorType,
          message: errorMessage,
          originalError: error
        }));
      })
    );
  }

  invalidateCache(): void {
    this.groupsCache = null;
    this.cacheTenantId = null;
  }

  getCachedGroups(): CustomerGroup[] {
    return this.groupsCache || [];
  }

  private currentTenantId(): string | null {
    return this.authService.user_info?.tenant_id ?? null;
  }

  private normalizeList(response: unknown): CustomerGroup[] {
    if (Array.isArray(response)) {
      return response as CustomerGroup[];
    }
    if (!response || typeof response !== 'object') {
      return [];
    }
    const obj = response as Record<string, unknown>;
    const candidates = [obj['data'], obj['groups'], obj['items']];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as CustomerGroup[];
      }
    }
    return [];
  }
}

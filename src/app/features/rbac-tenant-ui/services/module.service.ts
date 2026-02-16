import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { Module, ModulePermission } from '../models';
import { environment } from '../../../../environments/environment';
import { DataMapperService } from './data-mapper.service';

/**
 * ModuleService
 * Handles fetching and caching of available modules and their permissions
 */
@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modulesCache$ = new BehaviorSubject<Module[] | null>(null);
  private modulePermissionsCache$ = new BehaviorSubject<ModulePermission[] | null>(null);
  private api = environment.api;

  constructor(private http: HttpClient, private dataMapper: DataMapperService) {}

  /**
   * Fetches all available modules with their permissions
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<Module[]> - Array of modules with their permissions
   */
  getModules(): Observable<Module[]> {
    if (this.modulesCache$.value) {
      return new Observable(observer => {
        observer.next(this.modulesCache$.value!);
        observer.complete();
      });
    }

    return this.http.get<any>(`${this.api}/tenant/modules`).pipe(
      map(backendModules => this.dataMapper.mapModules(backendModules)),
      tap(modules => this.modulesCache$.next(modules)),
      shareReplay(1)
    );
  }

  /**
   * Fetches all module permissions
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<ModulePermission[]> - Array of all module permissions
   */
  getModulePermissions(): Observable<ModulePermission[]> {
    if (this.modulePermissionsCache$.value) {
      return new Observable(observer => {
        observer.next(this.modulePermissionsCache$.value!);
        observer.complete();
      });
    }

    return this.http.get<any>(`${this.api}/tenant/module-permissions`).pipe(
      tap(permissions => this.modulePermissionsCache$.next(permissions)),
      shareReplay(1)
    );
  }

  /**
   * Clears the module cache
   * Useful for forcing a refresh of module data
   */
  clearCache(): void {
    this.modulesCache$.next(null);
    this.modulePermissionsCache$.next(null);
  }
}

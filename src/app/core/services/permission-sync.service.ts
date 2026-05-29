import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, of } from 'rxjs';
import { AuthService } from './auth.service';
import { InterceptorService } from './interceptor.service';

/**
 * Keeps JWT permissions in sync with the backend.
 * The token in localStorage embeds permissions at issue time — without refresh
 * the UI keeps showing stale access even after an admin changes roles.
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionSyncService implements OnDestroy {
  private lastRefreshAt = 0;
  private readonly cooldownMs = 5_000;
  private refreshInFlight = false;
  private routerSubscription?: Subscription;

  private readonly onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.syncIfNeeded();
    }
  };

  private readonly onWindowFocus = () => this.syncIfNeeded();

  private readonly onStorageChange = (event: StorageEvent) => {
    if (event.key !== this.authService.name_token) {
      return;
    }

    if (event.newValue) {
      this.authService.reloadFromStorage();
    } else {
      this.authService.clearSession();
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private interceptorService: InterceptorService
  ) {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      window.addEventListener('focus', this.onWindowFocus);
      window.addEventListener('storage', this.onStorageChange);
    }

    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => this.syncIfNeeded());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      window.removeEventListener('focus', this.onWindowFocus);
      window.removeEventListener('storage', this.onStorageChange);
    }
  }

  /** Force refresh on app bootstrap — replaces stale JWT from a previous session. */
  initialize(): void {
    if (this.authService.isWithinFreshLoginGrace()) {
      console.log('[PermissionSync] Login reciente — se usa el token de /auth/login sin llamar /auth/refresh');
      return;
    }
    this.syncIfNeeded(true);
  }

  /** Call after admin saves role permissions or assigns/replaces roles. */
  syncAfterRbacChange(): void {
    this.syncIfNeeded(true);
  }

  syncIfNeeded(force = false): Observable<boolean> {
    if (!this.authService.token || this.refreshInFlight) {
      return of(false);
    }

    if (this.authService.isWithinFreshLoginGrace()) {
      return of(false);
    }

    const now = Date.now();
    if (!force && now - this.lastRefreshAt < this.cooldownMs) {
      return of(false);
    }

    this.lastRefreshAt = now;
    this.refreshInFlight = true;

    const beforeVersion = this.authService.user_info?.permissions_version;
    const beforePermissions = new Set(this.authService.permissions$.getValue());

    return new Observable<boolean>(observer => {
      this.authService.refresh().subscribe({
        next: () => {
          this.refreshInFlight = false;
          const changed = this.didPermissionsChange(beforeVersion, beforePermissions);

          if (changed) {
            const newVersion = this.authService.user_info?.permissions_version;
            const newCount = this.authService.permissions$.getValue().size;
            console.log(
              `[PermissionSync] Token actualizado: v${beforeVersion} → v${newVersion} (${newCount} permisos)`
            );
            this.interceptorService.openSnackbar({
              type: 'info',
              title: 'Permisos actualizados',
              message: 'Tu sesión refleja los permisos más recientes'
            });
          }

          observer.next(changed);
          observer.complete();
        },
        error: (error) => {
          this.refreshInFlight = false;
          console.warn('[PermissionSync] No se pudo refrescar el token:', error);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  private didPermissionsChange(
    beforeVersion: number | undefined,
    beforePermissions: Set<string>
  ): boolean {
    const afterVersion = this.authService.user_info?.permissions_version;
    if (beforeVersion !== undefined && afterVersion !== undefined && beforeVersion !== afterVersion) {
      return true;
    }

    const afterPermissions = this.authService.permissions$.getValue();
    if (beforePermissions.size !== afterPermissions.size) {
      return true;
    }

    for (const permission of beforePermissions) {
      if (!afterPermissions.has(permission)) {
        return true;
      }
    }

    for (const permission of afterPermissions) {
      if (!beforePermissions.has(permission)) {
        return true;
      }
    }

    return false;
  }
}

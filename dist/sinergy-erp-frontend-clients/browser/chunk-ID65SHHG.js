import {
  InterceptorService
} from "./chunk-6CHEJEJW.js";
import {
  AuthService
} from "./chunk-QU2SCCOO.js";
import {
  NavigationEnd,
  Router
} from "./chunk-YUPXBHST.js";
import {
  Injectable,
  Observable,
  filter,
  of,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XEFUC5ED.js";

// src/app/core/services/permission-sync.service.ts
var PermissionSyncService = class _PermissionSyncService {
  authService;
  router;
  interceptorService;
  lastRefreshAt = 0;
  cooldownMs = 5e3;
  refreshInFlight = false;
  routerSubscription;
  onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      this.syncIfNeeded();
    }
  };
  onWindowFocus = () => this.syncIfNeeded();
  onStorageChange = (event) => {
    if (event.key !== this.authService.name_token) {
      return;
    }
    if (event.newValue) {
      this.authService.reloadFromStorage();
    } else {
      this.authService.clearSession();
    }
  };
  constructor(authService, router, interceptorService) {
    this.authService = authService;
    this.router = router;
    this.interceptorService = interceptorService;
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      window.addEventListener("focus", this.onWindowFocus);
      window.addEventListener("storage", this.onStorageChange);
    }
    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.syncIfNeeded());
  }
  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
      window.removeEventListener("focus", this.onWindowFocus);
      window.removeEventListener("storage", this.onStorageChange);
    }
  }
  /** Force refresh on app bootstrap — replaces stale JWT from a previous session. */
  initialize() {
    if (this.authService.isWithinFreshLoginGrace()) {
      console.log("[PermissionSync] Login reciente \u2014 se usa el token de /auth/login sin llamar /auth/refresh");
      return;
    }
    this.syncIfNeeded(true);
  }
  /** Call after admin saves role permissions or assigns/replaces roles. */
  syncAfterRbacChange() {
    this.syncIfNeeded(true);
  }
  syncIfNeeded(force = false) {
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
    return new Observable((observer) => {
      this.authService.refresh().subscribe({
        next: () => {
          this.refreshInFlight = false;
          const changed = this.didPermissionsChange(beforeVersion, beforePermissions);
          if (changed) {
            const newVersion = this.authService.user_info?.permissions_version;
            const newCount = this.authService.permissions$.getValue().size;
            console.log(`[PermissionSync] Token actualizado: v${beforeVersion} \u2192 v${newVersion} (${newCount} permisos)`);
            this.interceptorService.openSnackbar({
              type: "info",
              title: "Permisos actualizados",
              message: "Tu sesi\xF3n refleja los permisos m\xE1s recientes"
            });
          }
          observer.next(changed);
          observer.complete();
        },
        error: (error) => {
          this.refreshInFlight = false;
          console.warn("[PermissionSync] No se pudo refrescar el token:", error);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
  didPermissionsChange(beforeVersion, beforePermissions) {
    const afterVersion = this.authService.user_info?.permissions_version;
    if (beforeVersion !== void 0 && afterVersion !== void 0 && beforeVersion !== afterVersion) {
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
  static \u0275fac = function PermissionSyncService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PermissionSyncService)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router), \u0275\u0275inject(InterceptorService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionSyncService, factory: _PermissionSyncService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PermissionSyncService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AuthService }, { type: Router }, { type: InterceptorService }], null);
})();

export {
  PermissionSyncService
};
//# sourceMappingURL=chunk-ID65SHHG.js.map

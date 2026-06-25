import {
  ActivatedRoute,
  Router
} from "./chunk-55FJTJJ6.js";
import {
  HttpClient,
  environment
} from "./chunk-BMMLV6YT.js";
import {
  BehaviorSubject,
  Injectable,
  Observable,
  of,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-57S27ROJ.js";

// node_modules/jwt-decode/build/esm/index.js
var InvalidTokenError = class extends Error {
};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  router;
  http;
  activated_route;
  api = environment.api;
  user_info;
  name_token = "sinergy_erp_token";
  user_profile_key = "sinergy_erp_user_profile";
  token;
  permissions$ = new BehaviorSubject(/* @__PURE__ */ new Set());
  /** Skip /auth/refresh briefly after login so refresh doesn't overwrite a fresh token. */
  freshLoginUntil = 0;
  freshLoginGraceMs = 15e3;
  posProfileLoaded = false;
  constructor(router, http, activated_route) {
    this.router = router;
    this.http = http;
    this.activated_route = activated_route;
    this.BuildTokensToInit();
  }
  BuildTokensToInit() {
    if (localStorage.getItem(this.name_token)) {
      this.user_info = jwtDecode(localStorage.getItem(this.name_token) || "{}");
      this.token = localStorage.getItem(this.name_token) || "";
      const permissions = this.decodeJWT(this.token);
      this.setPermissions(permissions);
      console.log("=== TOKEN INFO ===");
      console.log("permissions_version:", this.user_info.permissions_version);
      console.log("Total permissions:", permissions.length);
      this.restoreSessionUser();
    } else {
      localStorage.removeItem(this.name_token);
      this.permissions$.next(/* @__PURE__ */ new Set());
    }
  }
  /** Clears session and sends user to login when they have no accessible modules. */
  redirectToLoginNoAccess() {
    this.clearSession();
    void this.router.navigate(["/login"], {
      queryParams: { reason: "no-access" },
      replaceUrl: true
    });
  }
  logout() {
    this.clearSession();
    this.router.navigate(["/login"]);
  }
  /** Clears in-memory session state and removes the stored token. */
  clearSession() {
    this.token = "";
    this.user_info = null;
    localStorage.removeItem(this.name_token);
    localStorage.removeItem(this.user_profile_key);
    this.permissions$.next(/* @__PURE__ */ new Set());
    this.resetPosProfileCache();
  }
  /** True right after login — avoid calling /auth/refresh over the new token. */
  isWithinFreshLoginGrace() {
    return Date.now() < this.freshLoginUntil;
  }
  /**
   * Logs JWT claims for debugging permission sync issues.
   * If permissions here are stale right after login, the bug is in POST /auth/login (backend).
   */
  logTokenDiagnostics(source) {
    if (!this.token) {
      console.warn(`[JWT ${source}] No hay token`);
      return;
    }
    const decoded = jwtDecode(this.token);
    const flatPermissions = this.decodeJWT(this.token);
    console.group(`=== JWT DIAGNOSTICS [${source}] ===`);
    console.log("user:", decoded.email || decoded.sub);
    console.log("permissions_version:", decoded.permissions_version);
    console.log("permissionCount (claim):", decoded.permissionCount);
    console.log("roles:", decoded.roles);
    console.log("permissions raw type:", Array.isArray(decoded.permissions) ? "array" : typeof decoded.permissions);
    console.log("permissions flat count:", flatPermissions.length);
    console.log("permissions sample:", flatPermissions.slice(0, 15));
    console.groupEnd();
  }
  /** Re-reads token from localStorage (e.g. another tab updated it). */
  reloadFromStorage() {
    const storedToken = localStorage.getItem(this.name_token);
    if (storedToken) {
      this.setToken(storedToken);
    } else {
      this.clearSession();
    }
  }
  /**
   * Refresh the authentication token when permissions have changed.
   * Calls POST /auth/refresh with current token to get a new token with updated permissions.
   *
   * @returns Observable with the refresh response containing new access_token and user info
   */
  refresh() {
    return new Observable((observer) => {
      this.http.post(`${this.api}/auth/refresh`, {}).subscribe((response) => {
        console.log("=== AUTH SERVICE - REFRESH ===");
        console.log("Token refreshed due to permission changes");
        const { token, profile } = this.parseAuthResponse(response);
        if (token) {
          this.setToken(token);
          this.logTokenDiagnostics("REFRESH");
        } else {
          console.warn("[AuthService] Refresh response did not include a token");
        }
        if (profile) {
          this.applySessionUser(profile);
        } else {
          this.mergePosClaimsFromUserInfo();
        }
        observer.next(response);
        observer.complete();
      }, (error) => {
        console.error("Error refreshing token:", error);
        observer.error(error);
      });
    });
  }
  /**
   * Set a new authentication token and update permissions.
   *
   * @param token - The new JWT token to store
   */
  setToken(token, fromLogin = false) {
    localStorage.setItem(this.name_token, token);
    this.token = token;
    this.user_info = jwtDecode(token);
    if (fromLogin) {
      this.freshLoginUntil = Date.now() + this.freshLoginGraceMs;
      localStorage.removeItem(this.user_profile_key);
    }
    const permissions = this.decodeJWT(token);
    this.setPermissions(permissions);
    if (!fromLogin) {
      this.restoreSessionUser();
    }
    this.mergePosClaimsFromUserInfo();
    console.log("=== TOKEN UPDATED ===");
    console.log("New permissions_version:", this.user_info.permissions_version);
    console.log("New total permissions:", permissions.length);
  }
  login(data) {
    return new Observable((observer) => {
      this.http.post(`${this.api}/auth/login`, data).subscribe((response) => {
        console.log("=== AUTH SERVICE - LOGIN ===");
        console.log("Response completo:", response);
        const { token, profile } = this.parseAuthResponse(response);
        if (token) {
          this.setToken(token, true);
          if (profile) {
            this.applySessionUser(profile);
          } else {
            this.mergePosClaimsFromUserInfo();
          }
          this.logTokenDiagnostics("LOGIN");
          console.log("[AuthService] Perfil POS tras login:", {
            is_pos_user: this.user_info?.is_pos_user,
            pos_user_type: this.user_info?.pos_user_type,
            billing_branch_id: this.user_info?.billing_branch_id,
            route: this.resolvePostLoginRoute()
          });
        } else {
          console.warn("No se encontr\xF3 token en la respuesta");
        }
        observer.next(response);
        observer.complete();
      }, (error) => {
        console.error("Error en login:", error);
        observer.error(error);
      });
    });
  }
  setPassword(data) {
    return this.http.post(this.api + "/auth/user/login", data);
  }
  /**
   * Set permissions from a string array and normalize them to lowercase entity:PascalCase action format.
   * Updates the permissions$ observable with the normalized Set.
   *
   * @param permissions - Array of permission strings in format "entity:Action"
   *
   * Example normalization:
   * - "Customers:Create" → "customers:Create"
   * - "CUSTOMERS:CREATE" → "customers:Create"
   * - "customers:Create" → "customers:Create"
   */
  setPermissions(permissions) {
    const normalizedPermissions = /* @__PURE__ */ new Set();
    if (Array.isArray(permissions)) {
      permissions.forEach((permission) => {
        const normalized = this.normalizePermission(permission);
        normalizedPermissions.add(normalized);
      });
    }
    this.permissions$.next(normalizedPermissions);
  }
  /**
   * Normalize a permission string to lowercase entity:PascalCase action format.
   * Also converts underscores to camelCase (e.g., View_Menu -> ViewMenu)
   *
   * @param permission - Permission string in format "entity:Action" or "entity:Action_Name"
   * @returns Normalized permission string
   */
  normalizePermission(permission) {
    if (!permission || typeof permission !== "string") {
      return permission;
    }
    const parts = permission.split(":");
    if (parts.length !== 2) {
      return permission;
    }
    const entity = parts[0].toLowerCase();
    let action = parts[1];
    if (action.includes("_")) {
      action = action.split("_").map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join("");
    }
    return `${entity}:${action}`;
  }
  /**
   * Check if the user has a specific permission.
   * Performs case-insensitive entity matching.
   *
   * @param permission - Permission string in format "entity:Action"
   * @returns true if the permission exists in the permissions Set, false otherwise
   *
   * Example:
   * - If permissions contain "customers:Create", hasPermission("customers:Create") returns true
   * - If permissions contain "customers:Create", hasPermission("Customers:Create") returns true (case-insensitive entity)
   * - If permissions contain "customers:Create", hasPermission("leads:Create") returns false
   */
  hasPermission(permission) {
    if (!permission || typeof permission !== "string") {
      return false;
    }
    const normalizedPermission = this.normalizePermission(permission);
    const currentPermissions = this.permissions$.getValue();
    return currentPermissions.has(normalizedPermission);
  }
  /**
   * Check if the user can perform an action on an entity.
   * Constructs the permission string in "entity:Action" format and delegates to hasPermission().
   *
   * @param action - The action in PascalCase (e.g., "Create", "Read", "Update", "Delete")
   * @param entity - The entity name (e.g., "customers", "leads", "users")
   * @returns true if the user has the "entity:Action" permission, false otherwise
   *
   * Example:
   * - can("Create", "customers") checks for "customers:Create" permission
   * - can("Update", "leads") checks for "leads:Update" permission
   */
  can(action, entity) {
    if (!action || !entity || typeof action !== "string" || typeof entity !== "string") {
      return false;
    }
    const permission = `${entity}:${action}`;
    return this.hasPermission(permission);
  }
  /**
   * Check if the user can read an entity.
   * Convenience method that delegates to can("Read", entity).
   *
   * @param entity - The entity name (e.g., "customers", "leads", "users")
   * @returns true if the user has the "entity:Read" permission, false otherwise
   *
   * Example:
   * - canRead("customers") checks for "customers:Read" permission
   */
  canRead(entity) {
    return this.can("Read", entity);
  }
  /**
   * Check if the user can create an entity.
   * Convenience method that delegates to can("Create", entity).
   *
   * @param entity - The entity name (e.g., "customers", "leads", "users")
   * @returns true if the user has the "entity:Create" permission, false otherwise
   *
   * Example:
   * - canCreate("customers") checks for "customers:Create" permission
   */
  canCreate(entity) {
    return this.can("Create", entity);
  }
  /**
   * Check if the user can update an entity.
   * Convenience method that delegates to can("Update", entity).
   *
   * @param entity - The entity name (e.g., "customers", "leads", "users")
   * @returns true if the user has the "entity:Update" permission, false otherwise
   *
   * Example:
   * - canUpdate("customers") checks for "customers:Update" permission
   */
  canUpdate(entity) {
    return this.can("Update", entity);
  }
  /**
   * Check if the user can delete an entity.
   * Convenience method that delegates to can("Delete", entity).
   *
   * @param entity - The entity name (e.g., "customers", "leads", "users")
   * @returns true if the user has the "entity:Delete" permission, false otherwise
   *
   * Example:
   * - canDelete("customers") checks for "customers:Delete" permission
   */
  canDelete(entity) {
    return this.can("Delete", entity);
  }
  /**
   * Decode a JWT token without signature validation and extract the "permissions" claim.
   * This is UI-only validation - the token signature is not verified.
   *
   * @param token - The JWT token string to decode
   * @returns The permissions array from the token, or an empty array if the token is invalid or missing the permissions claim
   *
   * Error handling:
   * - If the token is invalid or cannot be decoded, returns an empty array
   * - If the token is missing the "permissions" claim, returns an empty array
   * - Errors are logged to console but do not throw exceptions
   *
   * Example:
   * - Token with permissions claim: { permissions: ["customers:Create", "customers:Read"] } → returns ["customers:Create", "customers:Read"]
   * - Invalid token: "invalid.token.string" → returns []
   * - Token without permissions claim: { sub: "user123" } → returns []
   */
  decodeJWT(token) {
    try {
      if (!token || typeof token !== "string") {
        return [];
      }
      const decoded = jwtDecode(token);
      if (!decoded || typeof decoded !== "object") {
        return [];
      }
      const permissions = decoded.permissions;
      if (Array.isArray(permissions)) {
        return permissions;
      }
      if (permissions && typeof permissions === "object") {
        const flat = [];
        for (const [module, actions] of Object.entries(permissions)) {
          if (Array.isArray(actions)) {
            actions.forEach((action) => {
              const actionStr = typeof action === "string" ? action : action.action;
              if (actionStr) {
                flat.push(`${module}:${actionStr}`);
              }
            });
          }
        }
        return flat;
      }
      return [];
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return [];
    }
  }
  /**
   * Get the first accessible route based on user permissions.
   * Returns the path to navigate to, or null if no routes are accessible.
   */
  getFirstAccessibleRoute() {
    const posRoute = this.getPosEntryRoute();
    if (posRoute) {
      return posRoute;
    }
    const routes = [
      { path: "/customers", permissions: ["customers:Read", "customers:ViewMenu", "customers:Leer"] },
      { path: "/leads", permissions: ["leads:Read", "leads:ViewMenu"] },
      { path: "/properties", permissions: ["properties:Read", "properties:ViewMenu"] },
      { path: "/contracts", permissions: ["contracts:Read", "contracts:ViewMenu"] },
      { path: "/purchase-orders", permissions: ["purchaseOrders:Read", "purchase_orders:read", "purchase_orders:ViewMenu"] },
      { path: "/inventory", permissions: ["inventory:Read", "inventory:ViewMenu"] },
      { path: "/sales-orders", permissions: ["salesOrders:Read", "sales_orders:read", "sales_orders:ViewMenu"] },
      { path: "/marketing", permissions: ["marketing:ViewDashboard", "marketing:ViewMenu"] },
      { path: "/pos/ventas", permissions: ["pos:Create", "pos:ViewMenu"] },
      { path: "/pos/cobranza", permissions: ["pos:Update", "pos:Read", "pos:ViewMenu"] }
    ];
    for (const route of routes) {
      const hasPermission = route.permissions.some((p) => this.hasPermission(p));
      if (hasPermission) {
        return route.path;
      }
    }
    return null;
  }
  /**
   * Ruta POS según tipo de terminal del usuario logueado.
   * Solo aplica si is_pos_user es true en la sesión.
   */
  getPosEntryRoute() {
    if (!this.isPosTerminalUser()) {
      return null;
    }
    const type = this.getPosUserType();
    if (type === "COBRANZA") {
      return "/pos/cobranza";
    }
    if (type === "VENTAS") {
      return "/pos/ventas";
    }
    return null;
  }
  /**
   * Ruta destino tras login según perfil POS o módulos ERP.
   */
  resolvePostLoginRoute() {
    if (this.isPosTerminalUser()) {
      return this.getPosEntryRoute();
    }
    return this.getFirstAccessibleRoute();
  }
  isPosTerminalUser() {
    if (this.normalizePosFlag(this.user_info?.is_pos_user)) {
      return true;
    }
    return this.getPosUserType() != null;
  }
  /**
   * Perfil POS ya viene en login/refresh — no se consulta GET /tenant/users/:id.
   */
  ensurePosProfile() {
    this.restoreSessionUser();
    this.posProfileLoaded = true;
    return of(void 0);
  }
  getBillingBranchId() {
    const id = this.user_info?.billing_branch_id;
    return id != null && String(id).trim() !== "" ? String(id) : null;
  }
  applySessionUser(source) {
    if (!source || typeof source !== "object") {
      return;
    }
    const profile = {
      is_pos_user: this.normalizePosFlag(source["is_pos_user"]),
      pos_user_type: this.normalizePosUserType(source["pos_user_type"]),
      billing_branch_id: source["billing_branch_id"] != null ? String(source["billing_branch_id"]) : null
    };
    localStorage.setItem(this.user_profile_key, JSON.stringify(profile));
    this.mergePosProfile(source);
    this.posProfileLoaded = true;
  }
  parseAuthResponse(response) {
    const root = response?.data && typeof response.data === "object" && !Array.isArray(response.data) ? response.data : response;
    const token = root?.access_token ?? root?.token ?? response?.access_token ?? response?.token ?? null;
    const profile = this.pickUserProfile(root?.user) ?? this.pickUserProfile(response?.user) ?? this.pickUserProfile(root) ?? null;
    return { token: token ? String(token) : null, profile };
  }
  pickUserProfile(candidate) {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      return null;
    }
    const obj = candidate;
    if ("is_pos_user" in obj || "pos_user_type" in obj || "billing_branch_id" in obj) {
      return obj;
    }
    return null;
  }
  normalizePosFlag(value) {
    return value === true || value === 1 || value === "1" || String(value).toLowerCase() === "true";
  }
  normalizePosUserType(value) {
    if (typeof value !== "string") {
      return null;
    }
    const normalized = value.trim().toUpperCase();
    return normalized === "VENTAS" || normalized === "COBRANZA" ? normalized : null;
  }
  mergePosClaimsFromUserInfo() {
    if (!this.user_info) {
      return;
    }
    this.mergePosProfile(this.user_info);
  }
  restoreSessionUser() {
    if (!this.user_info) {
      return;
    }
    try {
      const raw = localStorage.getItem(this.user_profile_key);
      if (!raw) {
        return;
      }
      const profile = JSON.parse(raw);
      this.mergePosProfile(profile);
    } catch (error) {
      console.warn("[AuthService] No se pudo restaurar perfil de sesi\xF3n", error);
    }
  }
  getPosUserType() {
    return this.normalizePosUserType(this.user_info?.pos_user_type);
  }
  isPosCobranzaTerminal() {
    return this.getPosUserType() === "COBRANZA";
  }
  isPosVentasTerminal() {
    return this.getPosUserType() === "VENTAS";
  }
  mergePosProfile(source) {
    if (!this.user_info || !source) {
      return;
    }
    if (source["is_pos_user"] != null) {
      this.user_info.is_pos_user = this.normalizePosFlag(source["is_pos_user"]);
    }
    const type = this.normalizePosUserType(source["pos_user_type"]);
    if (type) {
      this.user_info.pos_user_type = type;
    }
    if (source["billing_branch_id"] !== void 0) {
      const branchId = source["billing_branch_id"];
      this.user_info.billing_branch_id = branchId != null && String(branchId).trim() !== "" ? String(branchId) : null;
    }
  }
  resetPosProfileCache() {
    this.posProfileLoaded = false;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(Router), \u0275\u0275inject(HttpClient), \u0275\u0275inject(ActivatedRoute));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Router }, { type: HttpClient }, { type: ActivatedRoute }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-B7UOHVOJ.js.map

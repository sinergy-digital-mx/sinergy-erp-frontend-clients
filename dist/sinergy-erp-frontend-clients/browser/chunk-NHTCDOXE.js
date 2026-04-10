import {
  HttpClient,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  BehaviorSubject,
  Injectable,
  Observable,
  __spreadValues,
  map,
  setClassMetadata,
  shareReplay,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/rbac-tenant-ui/services/data-mapper.service.ts
var DataMapperService = class _DataMapperService {
  /**
   * Maps backend user response to frontend User model
   * Handles status as both string and object
   */
  mapUser(backendUser) {
    return __spreadValues({
      id: backendUser.id,
      email: backendUser.email,
      status: this.normalizeStatus(backendUser.status),
      createdAt: backendUser.createdAt || backendUser.created_at || backendUser.creationDate,
      updatedAt: backendUser.updatedAt || backendUser.updated_at,
      first_name: backendUser.first_name || backendUser.firstName || "",
      last_name: backendUser.last_name || backendUser.lastName || "",
      phone: backendUser.phone || "",
      tenant_id: backendUser.tenant_id || backendUser.tenantId || "",
      last_login_at: backendUser.last_login_at || backendUser.lastLoginAt
    }, backendUser);
  }
  /**
   * Maps array of backend users to frontend User models
   * Handles both array and object with users property
   */
  mapUsers(backendUsers) {
    console.log("mapUsers received:", backendUsers, "type:", typeof backendUsers, "isArray:", Array.isArray(backendUsers));
    let usersArray = [];
    if (Array.isArray(backendUsers)) {
      usersArray = backendUsers;
    } else if (backendUsers && typeof backendUsers === "object") {
      usersArray = backendUsers.users || backendUsers.data || backendUsers.items || [];
    }
    console.log("usersArray:", usersArray);
    return usersArray.map((user) => this.mapUser(user));
  }
  /**
   * Maps backend role response to frontend Role model
   */
  mapRole(backendRole) {
    return __spreadValues({
      id: backendRole.id,
      name: backendRole.name,
      description: backendRole.description || "",
      permissions: backendRole.permissions || [],
      createdAt: backendRole.createdAt,
      updatedAt: backendRole.updatedAt
    }, backendRole);
  }
  /**
   * Maps array of backend roles to frontend Role models
   * Handles both array and object with roles property
   */
  mapRoles(backendRoles) {
    console.log("mapRoles received:", backendRoles, "type:", typeof backendRoles, "isArray:", Array.isArray(backendRoles));
    let rolesArray = [];
    if (Array.isArray(backendRoles)) {
      rolesArray = backendRoles;
    } else if (backendRoles && typeof backendRoles === "object") {
      rolesArray = backendRoles.roles || backendRoles.data || backendRoles.items || [];
    }
    console.log("rolesArray after extraction:", rolesArray, "isArray:", Array.isArray(rolesArray));
    if (!Array.isArray(rolesArray)) {
      console.error("rolesArray is not an array!", rolesArray);
      return [];
    }
    return rolesArray.map((role) => this.mapRole(role));
  }
  /**
   * Maps backend module response to frontend Module model
   */
  mapModule(backendModule) {
    return __spreadValues({
      id: backendModule.id,
      name: backendModule.name,
      permissions: backendModule.permissions || []
    }, backendModule);
  }
  /**
   * Maps array of backend modules to frontend Module models
   * Handles both array and object with modules property
   */
  mapModules(backendModules) {
    const modulesArray = Array.isArray(backendModules) ? backendModules : backendModules?.modules || [];
    return modulesArray.map((module) => this.mapModule(module));
  }
  /**
   * Normalizes status from backend format to string
   * Handles both string and object formats
   */
  normalizeStatus(status) {
    if (typeof status === "string") {
      return status;
    }
    if (status && typeof status === "object" && status.code) {
      return status.code;
    }
    return "active";
  }
  static \u0275fac = function DataMapperService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataMapperService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DataMapperService, factory: _DataMapperService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataMapperService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/rbac-tenant-ui/services/user.service.ts
var UserService = class _UserService {
  http;
  dataMapper;
  usersCache$ = new BehaviorSubject(null);
  api = environment.api;
  constructor(http, dataMapper) {
    this.http = http;
    this.dataMapper = dataMapper;
  }
  /**
   * Fetches all users for the current tenant
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<User[]> - Array of users
   */
  getUsers() {
    if (this.usersCache$.value) {
      return new Observable((observer) => {
        observer.next(this.usersCache$.value);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/tenant/users`).pipe(map((backendUsers) => this.dataMapper.mapUsers(backendUsers)), tap((users) => this.usersCache$.next(users)), shareReplay(1));
  }
  /**
   * Fetches all roles assigned to a specific user
   * @param userId - The ID of the user
   * @returns Observable<Role[]> - Array of roles assigned to the user
   */
  getUserRoles(userId) {
    return this.http.get(`${this.api}/tenant/users/${userId}/roles`).pipe(map((backendRoles) => this.dataMapper.mapRoles(backendRoles)), shareReplay(1));
  }
  /**
   * Assigns a role to a user
   * @param userId - The ID of the user
   * @param roleId - The ID of the role to assign
   * @returns Observable<void>
   */
  assignRoleToUser(userId, roleId) {
    return this.http.post(`${this.api}/tenant/users/${userId}/roles/${roleId}`, {}).pipe(tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Replaces a user's existing role with a new role
   * @param userId - The ID of the user
   * @param oldRoleId - The ID of the role to replace
   * @param newRoleId - The ID of the new role
   * @returns Observable<void>
   */
  replaceUserRole(userId, oldRoleId, newRoleId) {
    return this.http.put(`${this.api}/tenant/users/${userId}/roles/${oldRoleId}`, { new_role_id: newRoleId }).pipe(tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Deletes a role from a user
   * @param userId - The ID of the user
   * @param roleId - The ID of the role to delete
   * @returns Observable<void>
   */
  deleteRoleFromUser(userId, roleId) {
    return this.http.delete(`${this.api}/tenant/users/${userId}/roles/${roleId}`).pipe(tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Creates a new user
   * @param userData - The user data to create
   * @returns Observable<void>
   */
  createUser(userData) {
    return this.http.post(`${this.api}/tenant/users`, userData).pipe(tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Updates an existing user
   * @param userId - The ID of the user to update
   * @param userData - The user data to update
   * @returns Observable<User>
   */
  updateUser(userId, userData) {
    return this.http.put(`${this.api}/tenant/users/${userId}`, userData).pipe(map((backendUser) => this.dataMapper.mapUser(backendUser)), tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Clears the user cache
   * Useful for forcing a refresh of user data
   */
  clearCache() {
    this.usersCache$.next(null);
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DataMapperService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: DataMapperService }], null);
})();

export {
  DataMapperService,
  UserService
};
//# sourceMappingURL=chunk-NHTCDOXE.js.map

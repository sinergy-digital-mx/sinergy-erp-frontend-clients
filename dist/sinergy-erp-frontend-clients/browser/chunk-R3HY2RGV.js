import {
  AuthService
} from "./chunk-MDAYJWTZ.js";
import {
  Router
} from "./chunk-SH63266R.js";
import {
  inject
} from "./chunk-JD27NKNP.js";

// src/app/core/guards/permission.guard.ts
var permissionGuard = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = route.data["permissions"];
  const permissionMode = route.data["permissionMode"];
  if (!requiredPermissions) {
    return true;
  }
  const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  let hasAccess;
  if (permissionMode === "any") {
    hasAccess = permissions.some((p) => authService.hasPermission(p));
  } else {
    hasAccess = permissions.every((p) => authService.hasPermission(p));
  }
  if (!hasAccess) {
    console.warn(`Access denied to /${route.url.join("/")}. Required permissions:`, permissions);
    console.warn("User permissions:", Array.from(authService.permissions$.getValue()));
    console.warn("\u26A0\uFE0F ALLOWING ACCESS ANYWAY (temporary for development)");
    return true;
  }
  return true;
};

export {
  permissionGuard
};
//# sourceMappingURL=chunk-R3HY2RGV.js.map

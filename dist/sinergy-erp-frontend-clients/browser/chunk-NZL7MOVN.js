import {
  DIVINO_DASHBOARD_TENANT_ID
} from "./chunk-ZPMASCV3.js";
import {
  DIVINO_DASHBOARD_PERMISSIONS
} from "./chunk-F65OR5PH.js";
import {
  AuthService
} from "./chunk-B7UOHVOJ.js";
import {
  Router
} from "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import {
  inject
} from "./chunk-57S27ROJ.js";

// src/app/features/divino-dashboard/guards/divino-dashboard.guard.ts
var divinoDashboardGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tenantId = authService.user_info?.tenant_id;
  if (tenantId !== DIVINO_DASHBOARD_TENANT_ID) {
    router.navigate(["/"]);
    return false;
  }
  if (!authService.hasPermission(DIVINO_DASHBOARD_PERMISSIONS.read)) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};

// src/app/features/divino-dashboard/divino-dashboard.routes.ts
var DIVINO_DASHBOARD_ROUTES = [
  {
    path: "",
    canActivate: [divinoDashboardGuard],
    loadComponent: () => import("./chunk-67UPUQSW.js").then((m) => m.DivinoDashboardComponent),
    data: { title: "Divino Dashboard" }
  }
];
export {
  DIVINO_DASHBOARD_ROUTES
};
//# sourceMappingURL=chunk-NZL7MOVN.js.map

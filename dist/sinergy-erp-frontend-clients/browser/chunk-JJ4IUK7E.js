import {
  DIVINO_DASHBOARD_TENANT_ID
} from "./chunk-ZPMASCV3.js";
import {
  DIVINO_DASHBOARD_PERMISSIONS
} from "./chunk-F65OR5PH.js";
import {
  AuthService
} from "./chunk-QU2SCCOO.js";
import {
  Router
} from "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import {
  inject
} from "./chunk-XEFUC5ED.js";

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
    loadComponent: () => import("./chunk-UWMPWQLD.js").then((m) => m.DivinoDashboardComponent),
    data: { title: "Divino Dashboard" }
  }
];
export {
  DIVINO_DASHBOARD_ROUTES
};
//# sourceMappingURL=chunk-JJ4IUK7E.js.map

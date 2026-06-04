import {
  DIVINO_DASHBOARD_TENANT_ID
} from "./chunk-ZPMASCV3.js";
import {
  DIVINO_DASHBOARD_PERMISSIONS
} from "./chunk-C2DBVDVP.js";
import {
  AuthService
} from "./chunk-MDAYJWTZ.js";
import {
  Router
} from "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import {
  inject
} from "./chunk-JD27NKNP.js";

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
    loadComponent: () => import("./chunk-TTHHLAUD.js").then((m) => m.DivinoDashboardComponent),
    data: { title: "Divino Dashboard" }
  }
];
export {
  DIVINO_DASHBOARD_ROUTES
};
//# sourceMappingURL=chunk-GEVPWQ2W.js.map

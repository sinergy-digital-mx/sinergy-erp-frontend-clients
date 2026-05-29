import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/customers/customers.routes.ts
var CUSTOMERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-OUH2PBBT.js").then((m) => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-A2AVG4G4.js").then((m) => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  }
];
export {
  CUSTOMERS_ROUTES
};
//# sourceMappingURL=chunk-5SGJ2AWT.js.map

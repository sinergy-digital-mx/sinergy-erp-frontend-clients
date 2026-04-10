import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/customers/customers.routes.ts
var CUSTOMERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-CMAZ4PZ7.js").then((m) => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-6IUW34RC.js").then((m) => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  }
];
export {
  CUSTOMERS_ROUTES
};
//# sourceMappingURL=chunk-X5FZMV2K.js.map

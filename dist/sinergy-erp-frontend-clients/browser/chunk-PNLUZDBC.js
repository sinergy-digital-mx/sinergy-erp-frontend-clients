import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/customers/customers.routes.ts
var CUSTOMERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-TNY5MVIC.js").then((m) => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-HFNBTMUN.js").then((m) => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  }
];
export {
  CUSTOMERS_ROUTES
};
//# sourceMappingURL=chunk-PNLUZDBC.js.map

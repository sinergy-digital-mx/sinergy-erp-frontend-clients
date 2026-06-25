import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/customers/customers.routes.ts
var CUSTOMERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-BUOY6QGV.js").then((m) => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-FGTIQJXL.js").then((m) => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  }
];
export {
  CUSTOMERS_ROUTES
};
//# sourceMappingURL=chunk-RFA5WX6K.js.map

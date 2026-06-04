import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/customers/customers.routes.ts
var CUSTOMERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-MGGCP3Y3.js").then((m) => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-IJFXXQSY.js").then((m) => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  }
];
export {
  CUSTOMERS_ROUTES
};
//# sourceMappingURL=chunk-HYRNXVXQ.js.map

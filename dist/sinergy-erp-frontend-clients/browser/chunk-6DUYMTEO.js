import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/sales-orders/sales-orders.routes.ts
var SALES_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-NGC3Z237.js").then((m) => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Venta"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-KJSWN5TC.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Venta"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-KJSWN5TC.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.update],
      title: "Editar Orden de Venta"
    }
  }
];
export {
  SALES_ORDERS_ROUTES
};
//# sourceMappingURL=chunk-6DUYMTEO.js.map

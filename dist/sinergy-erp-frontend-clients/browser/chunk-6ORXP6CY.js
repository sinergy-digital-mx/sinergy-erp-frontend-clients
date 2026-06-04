import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/sales-orders/sales-orders.routes.ts
var SALES_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-D3YVXYGK.js").then((m) => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Venta"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-CQG7CWE3.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Venta"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-CQG7CWE3.js").then((m) => m.SalesOrderFormComponent),
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
//# sourceMappingURL=chunk-6ORXP6CY.js.map

import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/sales-orders/sales-orders.routes.ts
var SALES_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-ZUY5JXWX.js").then((m) => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Venta"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-EGFGHZAM.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Venta"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-EGFGHZAM.js").then((m) => m.SalesOrderFormComponent),
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
//# sourceMappingURL=chunk-K5HAURCS.js.map

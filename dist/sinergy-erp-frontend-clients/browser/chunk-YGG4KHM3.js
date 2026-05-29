import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/sales-orders/sales-orders.routes.ts
var SALES_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-CW45HISW.js").then((m) => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Venta"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-BOGYINMR.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Venta"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-BOGYINMR.js").then((m) => m.SalesOrderFormComponent),
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
//# sourceMappingURL=chunk-YGG4KHM3.js.map

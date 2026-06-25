import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  permissionGuard
} from "./chunk-3TGAE7IB.js";
import "./chunk-7QZ6JYNG.js";
import "./chunk-524KR27D.js";
import "./chunk-MNFUR22A.js";
import "./chunk-CJAGDKD4.js";

// src/app/features/sales-orders/sales-orders.routes.ts
var SALES_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-RQOCWGVR.js").then((m) => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Venta"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-NYXMPPCJ.js").then((m) => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Venta"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-NYXMPPCJ.js").then((m) => m.SalesOrderFormComponent),
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
//# sourceMappingURL=chunk-SLMFHBGT.js.map

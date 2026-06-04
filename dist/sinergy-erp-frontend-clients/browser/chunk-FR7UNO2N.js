import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/purchase-orders/purchase-orders.routes.ts
var PURCHASE_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-2VLZZEYH.js").then((m) => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Compra"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-5SLH4HK5.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Compra"
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-BHE4C6MA.js").then((m) => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: "Detalle de Orden"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-5SLH4HK5.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.update],
      title: "Editar Orden de Compra"
    }
  }
];
export {
  PURCHASE_ORDERS_ROUTES
};
//# sourceMappingURL=chunk-FR7UNO2N.js.map

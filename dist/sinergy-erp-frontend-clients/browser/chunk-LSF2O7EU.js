import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  permissionGuard
} from "./chunk-3TGAE7IB.js";
import "./chunk-7QZ6JYNG.js";
import "./chunk-524KR27D.js";
import "./chunk-MNFUR22A.js";
import "./chunk-CJAGDKD4.js";

// src/app/features/purchase-orders/purchase-orders.routes.ts
var PURCHASE_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-4K6UXRD7.js").then((m) => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Compra"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-KA4DDYZG.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Compra"
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-DCHAP3JO.js").then((m) => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: "Detalle de Orden"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-KA4DDYZG.js").then((m) => m.PurchaseOrderFormComponent),
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
//# sourceMappingURL=chunk-LSF2O7EU.js.map

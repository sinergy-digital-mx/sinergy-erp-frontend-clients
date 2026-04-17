import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/purchase-orders/purchase-orders.routes.ts
var PURCHASE_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-MS7NAWAU.js").then((m) => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Compra"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-WTTEPC3R.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Compra"
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-VDXOXSUD.js").then((m) => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: "Detalle de Orden"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-WTTEPC3R.js").then((m) => m.PurchaseOrderFormComponent),
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
//# sourceMappingURL=chunk-U6OTW54O.js.map

import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/purchase-orders/purchase-orders.routes.ts
var PURCHASE_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-VCA7POVJ.js").then((m) => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Compra"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-CJASU4R4.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Compra"
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-LKKADMNH.js").then((m) => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: "Detalle de Orden"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-CJASU4R4.js").then((m) => m.PurchaseOrderFormComponent),
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
//# sourceMappingURL=chunk-5MJTQX25.js.map

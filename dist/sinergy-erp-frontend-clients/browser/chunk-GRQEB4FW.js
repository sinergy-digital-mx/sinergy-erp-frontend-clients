import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/purchase-orders/purchase-orders.routes.ts
var PURCHASE_ORDERS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-TXNG3L6W.js").then((m) => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: "\xD3rdenes de Compra"
    }
  },
  {
    path: "create",
    loadComponent: () => import("./chunk-CO4OCI5T.js").then((m) => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: "Crear Orden de Compra"
    }
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-2CM7HJSN.js").then((m) => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: "Detalle de Orden"
    }
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./chunk-CO4OCI5T.js").then((m) => m.PurchaseOrderFormComponent),
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
//# sourceMappingURL=chunk-GRQEB4FW.js.map

import {
  INVENTORY_PERMISSIONS
} from "./chunk-XPSKNRZU.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-RXJLUMD5.js").then((m) => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Inventario"
    }
  },
  {
    path: "transfers",
    loadComponent: () => import("./chunk-47JOADAI.js").then((m) => m.TransferListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Transferencias de inventario"
    }
  }
];
export {
  INVENTORY_ROUTES
};
//# sourceMappingURL=chunk-3BXH3KPY.js.map

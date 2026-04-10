import {
  INVENTORY_PERMISSIONS
} from "./chunk-GOGMGDDG.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-M32SA2FI.js").then((m) => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Inventario"
    }
  }
];
export {
  INVENTORY_ROUTES
};
//# sourceMappingURL=chunk-PCFF3AY2.js.map

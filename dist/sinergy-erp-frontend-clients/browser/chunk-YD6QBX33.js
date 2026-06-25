import {
  INVENTORY_PERMISSIONS
} from "./chunk-XPSKNRZU.js";
import {
  permissionGuard
} from "./chunk-3TGAE7IB.js";
import "./chunk-7QZ6JYNG.js";
import "./chunk-524KR27D.js";
import "./chunk-MNFUR22A.js";
import "./chunk-CJAGDKD4.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-NLVEYLUY.js").then((m) => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Inventario"
    }
  },
  {
    path: "transfers",
    loadComponent: () => import("./chunk-DIRB6AWF.js").then((m) => m.TransferListComponent),
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
//# sourceMappingURL=chunk-YD6QBX33.js.map

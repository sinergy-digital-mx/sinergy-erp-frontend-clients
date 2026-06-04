import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/properties/properties.routes.ts
var PROPERTIES_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-P2A4JLJ2.js").then((m) => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
export {
  PROPERTIES_ROUTES
};
//# sourceMappingURL=chunk-IX4THMP6.js.map

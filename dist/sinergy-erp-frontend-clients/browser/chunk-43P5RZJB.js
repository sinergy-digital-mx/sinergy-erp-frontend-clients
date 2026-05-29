import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/properties/properties.routes.ts
var PROPERTIES_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-RU24JBVN.js").then((m) => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
export {
  PROPERTIES_ROUTES
};
//# sourceMappingURL=chunk-43P5RZJB.js.map

import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/properties/properties.routes.ts
var PROPERTIES_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-U7KSU4JS.js").then((m) => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
export {
  PROPERTIES_ROUTES
};
//# sourceMappingURL=chunk-NNAF6XEQ.js.map

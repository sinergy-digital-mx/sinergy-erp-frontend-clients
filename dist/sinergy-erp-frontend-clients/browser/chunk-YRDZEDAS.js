import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/properties/properties.routes.ts
var PROPERTIES_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-B5GPYKVH.js").then((m) => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
export {
  PROPERTIES_ROUTES
};
//# sourceMappingURL=chunk-YRDZEDAS.js.map

import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/properties/properties.routes.ts
var PROPERTIES_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-AG5O4URD.js").then((m) => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
export {
  PROPERTIES_ROUTES
};
//# sourceMappingURL=chunk-KARJ6DQN.js.map

import {
  HttpClient,
  environment
} from "./chunk-RBFB2ZTY.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-GBHDNI6X.js";

// src/app/features/pos/models/pos-session.model.ts
function posSessionUserLabel(session) {
  const user = session?.user;
  if (!user) {
    return "Usuario desconocido";
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return name || user.email || "Usuario desconocido";
}
function posSessionEquipmentLabel(session, fallback) {
  const cfg = session?.posConfiguration;
  if (!cfg) {
    return fallback || "Equipo POS";
  }
  const parts = [cfg.code, cfg.modelo].filter(Boolean);
  return parts.join(" \xB7 ") || fallback || "Equipo POS";
}
function parsePosMoney(value) {
  if (value === null || value === void 0 || value === "") {
    return 0;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  const parsed = parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}
function formatPosCurrency(amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(amount);
}
function sessionTurnLabel(session) {
  if (session?.session_number != null) {
    return `#${session.session_number}`;
  }
  return "\u2014";
}
function sessionIsOpen(session) {
  if (!session) {
    return false;
  }
  const status = String(session.status || "").toLowerCase();
  if (status === "open") {
    return true;
  }
  if (status === "closed") {
    return false;
  }
  return !session.closed_at;
}
function sessionOpeningCash(session) {
  return parsePosMoney(session?.opening_cash ?? session?.initial_cash);
}
function sessionTotalSales(session) {
  return parsePosMoney(session?.total_sales);
}
function sessionExpectedCash(session) {
  const explicit = parsePosMoney(session?.expected_cash);
  if (explicit > 0) {
    return explicit;
  }
  return sessionOpeningCash(session) + sessionTotalSales(session);
}
function resolveSessionBranchLabel(session, branches) {
  const cfg = session?.posConfiguration;
  const branchFromCfg = cfg?.branch;
  if (branchFromCfg) {
    const name = branchFromCfg.display_name || branchFromCfg.name || branchFromCfg.code;
    if (name) {
      return name;
    }
  }
  const sucursalId = cfg?.sucursal?.trim();
  if (sucursalId && branches.length) {
    const match = branches.find((b) => b.id === sucursalId);
    if (match) {
      return match.display_name || match.code || "\u2014";
    }
  }
  return "\u2014";
}
function formatPosDateTime(value) {
  if (!value) {
    return "\u2014";
  }
  return new Date(value).toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// src/app/features/settings/services/pos-equipment.service.ts
var PosEquipmentService = class _PosEquipmentService {
  http;
  baseUrl = `${environment.api}/tenant/pos-configurations`;
  constructor(http) {
    this.http = http;
  }
  getPosConfigurations(params) {
    return this.http.get(this.baseUrl, {
      params
    });
  }
  getPosConfiguration(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createPosConfiguration(data) {
    return this.http.post(this.baseUrl, data);
  }
  updatePosConfiguration(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deletePosConfiguration(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  /** @deprecated use getPosConfigurations */
  getPosEquipments(params) {
    return this.getPosConfigurations(params);
  }
  /** @deprecated use getPosConfiguration */
  getPosEquipment(id) {
    return this.getPosConfiguration(id);
  }
  /** @deprecated use createPosConfiguration */
  createPosEquipment(data) {
    return this.createPosConfiguration(data);
  }
  /** @deprecated use updatePosConfiguration */
  updatePosEquipment(id, data) {
    return this.updatePosConfiguration(id, data);
  }
  /** @deprecated use deletePosConfiguration */
  deletePosEquipment(id) {
    return this.deletePosConfiguration(id);
  }
  static \u0275fac = function PosEquipmentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PosEquipmentService, factory: _PosEquipmentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  posSessionUserLabel,
  posSessionEquipmentLabel,
  parsePosMoney,
  formatPosCurrency,
  sessionTurnLabel,
  sessionIsOpen,
  sessionOpeningCash,
  sessionTotalSales,
  sessionExpectedCash,
  resolveSessionBranchLabel,
  formatPosDateTime,
  PosEquipmentService
};
//# sourceMappingURL=chunk-UEGXBWFG.js.map

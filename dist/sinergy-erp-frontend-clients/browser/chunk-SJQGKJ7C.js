import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-XEFUC5ED.js";

// src/app/core/pipes/remove-trailing-zeros.pipe.ts
var RemoveTrailingZerosPipe = class _RemoveTrailingZerosPipe {
  transform(value) {
    if (value === null || value === void 0)
      return "";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num))
      return "";
    const str = num.toString();
    if (!str.includes(".")) {
      return str;
    }
    return str.replace(/\.?0+$/, "");
  }
  static \u0275fac = function RemoveTrailingZerosPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoveTrailingZerosPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "removeTrailingZeros", type: _RemoveTrailingZerosPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoveTrailingZerosPipe, [{
    type: Pipe,
    args: [{
      name: "removeTrailingZeros",
      standalone: true
    }]
  }], null, null);
})();

// src/app/core/config/order-detail-dialog.config.ts
var ORDER_DETAIL_DIALOG_OPTIONS = {
  width: "92vw",
  maxWidth: "1680px",
  height: "94vh",
  maxHeight: "94vh",
  panelClass: "order-detail-dialog-container"
};

export {
  RemoveTrailingZerosPipe,
  ORDER_DETAIL_DIALOG_OPTIONS
};
//# sourceMappingURL=chunk-SJQGKJ7C.js.map

import {
  ContractDetailModalComponent
} from "./chunk-PBP4LXTZ.js";
import {
  CustomerEditModalComponent
} from "./chunk-XGVGRBFF.js";
import {
  CustomerService
} from "./chunk-EFTXQRRM.js";
import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-ADUVL4TN.js";
import "./chunk-NHTCDOXE.js";
import "./chunk-SWPKLNPW.js";
import {
  PhoneComponent,
  Tag,
  TagModule
} from "./chunk-RBESK2KT.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-LYQXEO3O.js";
import "./chunk-JWKB62XF.js";
import {
  PrimeTemplate
} from "./chunk-X6ESXIRL.js";
import {
  InterceptorService
} from "./chunk-K22JBEUE.js";
import "./chunk-Y4MZBWJH.js";
import "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  Activity,
  Download,
  FileCheck,
  FileText,
  FileX,
  Image,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  BidiModule,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  _getAnimationsState
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  AuthService
} from "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
  TitleCasePipe
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NO_ERRORS_SCHEMA,
  NgModule,
  Subject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// node_modules/@angular/material/fesm2022/card.mjs
var _c0 = ["*"];
var _c1 = [[["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], [["", "mat-card-image", ""], ["", "matCardImage", ""], ["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""], ["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""], ["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""], ["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]], "*"];
var _c2 = ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]", "*"];
var _c3 = [[["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]], [["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], "*"];
var _c4 = ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"];
var MAT_CARD_CONFIG = new InjectionToken("MAT_CARD_CONFIG");
var MatCard = class _MatCard {
  appearance;
  constructor() {
    const config = inject(MAT_CARD_CONFIG, {
      optional: true
    });
    this.appearance = config?.appearance || "raised";
  }
  static \u0275fac = function MatCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCard,
    selectors: [["mat-card"]],
    hostAttrs: [1, "mat-mdc-card", "mdc-card"],
    hostVars: 8,
    hostBindings: function MatCard_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-card-outlined", ctx.appearance === "outlined")("mdc-card--outlined", ctx.appearance === "outlined")("mat-mdc-card-filled", ctx.appearance === "filled")("mdc-card--filled", ctx.appearance === "filled");
      }
    },
    inputs: {
      appearance: "appearance"
    },
    exportAs: ["matCard"],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MatCard_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCard, [{
    type: Component,
    args: [{
      selector: "mat-card",
      host: {
        "class": "mat-mdc-card mdc-card",
        "[class.mat-mdc-card-outlined]": 'appearance === "outlined"',
        "[class.mdc-card--outlined]": 'appearance === "outlined"',
        "[class.mat-mdc-card-filled]": 'appearance === "filled"',
        "[class.mdc-card--filled]": 'appearance === "filled"'
      },
      exportAs: "matCard",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>\n",
      styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}\n']
    }]
  }], () => [], {
    appearance: [{
      type: Input
    }]
  });
})();
var MatCardTitle = class _MatCardTitle {
  static \u0275fac = function MatCardTitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardTitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardTitle,
    selectors: [["mat-card-title"], ["", "mat-card-title", ""], ["", "matCardTitle", ""]],
    hostAttrs: [1, "mat-mdc-card-title"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
      host: {
        "class": "mat-mdc-card-title"
      }
    }]
  }], null, null);
})();
var MatCardTitleGroup = class _MatCardTitleGroup {
  static \u0275fac = function MatCardTitleGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardTitleGroup)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCardTitleGroup,
    selectors: [["mat-card-title-group"]],
    hostAttrs: [1, "mat-mdc-card-title-group"],
    ngContentSelectors: _c2,
    decls: 4,
    vars: 0,
    template: function MatCardTitleGroup_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c1);
        \u0275\u0275domElementStart(0, "div");
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(2, 1);
        \u0275\u0275projection(3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitleGroup, [{
    type: Component,
    args: [{
      selector: "mat-card-title-group",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-title-group"
      },
      template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardContent = class _MatCardContent {
  static \u0275fac = function MatCardContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardContent,
    selectors: [["mat-card-content"]],
    hostAttrs: [1, "mat-mdc-card-content"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardContent, [{
    type: Directive,
    args: [{
      selector: "mat-card-content",
      host: {
        "class": "mat-mdc-card-content"
      }
    }]
  }], null, null);
})();
var MatCardSubtitle = class _MatCardSubtitle {
  static \u0275fac = function MatCardSubtitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardSubtitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardSubtitle,
    selectors: [["mat-card-subtitle"], ["", "mat-card-subtitle", ""], ["", "matCardSubtitle", ""]],
    hostAttrs: [1, "mat-mdc-card-subtitle"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSubtitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
      host: {
        "class": "mat-mdc-card-subtitle"
      }
    }]
  }], null, null);
})();
var MatCardActions = class _MatCardActions {
  align = "start";
  static \u0275fac = function MatCardActions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardActions)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardActions,
    selectors: [["mat-card-actions"]],
    hostAttrs: [1, "mat-mdc-card-actions", "mdc-card__actions"],
    hostVars: 2,
    hostBindings: function MatCardActions_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-card-actions-align-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align"
    },
    exportAs: ["matCardActions"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardActions, [{
    type: Directive,
    args: [{
      selector: "mat-card-actions",
      exportAs: "matCardActions",
      host: {
        "class": "mat-mdc-card-actions mdc-card__actions",
        "[class.mat-mdc-card-actions-align-end]": 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
var MatCardHeader = class _MatCardHeader {
  static \u0275fac = function MatCardHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCardHeader,
    selectors: [["mat-card-header"]],
    hostAttrs: [1, "mat-mdc-card-header"],
    ngContentSelectors: _c4,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-card-header-text"]],
    template: function MatCardHeader_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c3);
        \u0275\u0275projection(0);
        \u0275\u0275domElementStart(1, "div", 0);
        \u0275\u0275projection(2, 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardHeader, [{
    type: Component,
    args: [{
      selector: "mat-card-header",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-header"
      },
      template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var MatCardFooter = class _MatCardFooter {
  static \u0275fac = function MatCardFooter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardFooter)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardFooter,
    selectors: [["mat-card-footer"]],
    hostAttrs: [1, "mat-mdc-card-footer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardFooter, [{
    type: Directive,
    args: [{
      selector: "mat-card-footer",
      host: {
        "class": "mat-mdc-card-footer"
      }
    }]
  }], null, null);
})();
var MatCardImage = class _MatCardImage {
  static \u0275fac = function MatCardImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardImage,
    selectors: [["", "mat-card-image", ""], ["", "matCardImage", ""]],
    hostAttrs: [1, "mat-mdc-card-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-image], [matCardImage]",
      host: {
        "class": "mat-mdc-card-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardSmImage = class _MatCardSmImage {
  static \u0275fac = function MatCardSmImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardSmImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardSmImage,
    selectors: [["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""]],
    hostAttrs: [1, "mat-mdc-card-sm-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSmImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-sm-image], [matCardImageSmall]",
      host: {
        "class": "mat-mdc-card-sm-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardMdImage = class _MatCardMdImage {
  static \u0275fac = function MatCardMdImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardMdImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardMdImage,
    selectors: [["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""]],
    hostAttrs: [1, "mat-mdc-card-md-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardMdImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-md-image], [matCardImageMedium]",
      host: {
        "class": "mat-mdc-card-md-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardLgImage = class _MatCardLgImage {
  static \u0275fac = function MatCardLgImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardLgImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardLgImage,
    selectors: [["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-lg-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardLgImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-lg-image], [matCardImageLarge]",
      host: {
        "class": "mat-mdc-card-lg-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardXlImage = class _MatCardXlImage {
  static \u0275fac = function MatCardXlImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardXlImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardXlImage,
    selectors: [["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-xl-image", "mdc-card__media"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardXlImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-xl-image], [matCardImageXLarge]",
      host: {
        "class": "mat-mdc-card-xl-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var MatCardAvatar = class _MatCardAvatar {
  static \u0275fac = function MatCardAvatar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardAvatar)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatCardAvatar,
    selectors: [["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]],
    hostAttrs: [1, "mat-mdc-card-avatar"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardAvatar, [{
    type: Directive,
    args: [{
      selector: "[mat-card-avatar], [matCardAvatar]",
      host: {
        "class": "mat-mdc-card-avatar"
      }
    }]
  }], null, null);
})();
var CARD_DIRECTIVES = [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage];
var MatCardModule = class _MatCardModule {
  static \u0275fac = function MatCardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCardModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatCardModule,
    imports: [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage],
    exports: [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardModule, [{
    type: NgModule,
    args: [{
      imports: CARD_DIRECTIVES,
      exports: [CARD_DIRECTIVES, BidiModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/progress-spinner.mjs
var _c02 = ["determinateSpinner"];
function MatProgressSpinner_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "circle", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("viewBox", ctx_r0._viewBox());
    \u0275\u0275advance();
    \u0275\u0275styleProp("stroke-dasharray", ctx_r0._strokeCircumference(), "px")("stroke-dashoffset", ctx_r0._strokeCircumference() / 2, "px")("stroke-width", ctx_r0._circleStrokeWidth(), "%");
    \u0275\u0275attribute("r", ctx_r0._circleRadius());
  }
}
var MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new InjectionToken("mat-progress-spinner-default-options", {
  providedIn: "root",
  factory: () => ({
    diameter: BASE_SIZE
  })
});
var BASE_SIZE = 100;
var BASE_STROKE_WIDTH = 10;
var MatProgressSpinner = class _MatProgressSpinner {
  _elementRef = inject(ElementRef);
  _noopAnimations;
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  _determinateCircle;
  constructor() {
    const defaults = inject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS);
    const animationsState = _getAnimationsState();
    const element = this._elementRef.nativeElement;
    this._noopAnimations = animationsState === "di-disabled" && !!defaults && !defaults._forceAnimations;
    this.mode = element.nodeName.toLowerCase() === "mat-spinner" ? "indeterminate" : "determinate";
    if (!this._noopAnimations && animationsState === "reduced-motion") {
      element.classList.add("mat-progress-spinner-reduced-motion");
    }
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }
      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }
  mode;
  get value() {
    return this.mode === "determinate" ? this._value : 0;
  }
  set value(v) {
    this._value = Math.max(0, Math.min(100, v || 0));
  }
  _value = 0;
  get diameter() {
    return this._diameter;
  }
  set diameter(size) {
    this._diameter = size || 0;
  }
  _diameter = BASE_SIZE;
  get strokeWidth() {
    return this._strokeWidth ?? this.diameter / 10;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 0;
  }
  _strokeWidth;
  _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }
  _viewBox() {
    const viewBox = this._circleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }
  _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius();
  }
  _strokeDashOffset() {
    if (this.mode === "determinate") {
      return this._strokeCircumference() * (100 - this._value) / 100;
    }
    return null;
  }
  _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }
  static \u0275fac = function MatProgressSpinner_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinner)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressSpinner,
    selectors: [["mat-progress-spinner"], ["mat-spinner"]],
    viewQuery: function MatProgressSpinner_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._determinateCircle = _t.first);
      }
    },
    hostAttrs: ["role", "progressbar", "tabindex", "-1", 1, "mat-mdc-progress-spinner", "mdc-circular-progress"],
    hostVars: 18,
    hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuemin", 0)("aria-valuemax", 100)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275styleProp("width", ctx.diameter, "px")("height", ctx.diameter, "px")("--mat-progress-spinner-size", ctx.diameter + "px")("--mat-progress-spinner-active-indicator-width", ctx.diameter + "px");
        \u0275\u0275classProp("_mat-animation-noopable", ctx._noopAnimations)("mdc-circular-progress--indeterminate", ctx.mode === "indeterminate");
      }
    },
    inputs: {
      color: "color",
      mode: "mode",
      value: [2, "value", "value", numberAttribute],
      diameter: [2, "diameter", "diameter", numberAttribute],
      strokeWidth: [2, "strokeWidth", "strokeWidth", numberAttribute]
    },
    exportAs: ["matProgressSpinner"],
    decls: 14,
    vars: 11,
    consts: [["circle", ""], ["determinateSpinner", ""], ["aria-hidden", "true", 1, "mdc-circular-progress__determinate-container"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__determinate-circle-graphic"], ["cx", "50%", "cy", "50%", 1, "mdc-circular-progress__determinate-circle"], ["aria-hidden", "true", 1, "mdc-circular-progress__indeterminate-container"], [1, "mdc-circular-progress__spinner-layer"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-left"], [3, "ngTemplateOutlet"], [1, "mdc-circular-progress__gap-patch"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-right"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__indeterminate-circle-graphic"], ["cx", "50%", "cy", "50%"]],
    template: function MatProgressSpinner_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MatProgressSpinner_ng_template_0_Template, 2, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div", 2, 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 3);
        \u0275\u0275element(5, "circle", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7);
        \u0275\u0275elementContainer(9, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 9);
        \u0275\u0275elementContainer(11, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 10);
        \u0275\u0275elementContainer(13, 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const circle_r2 = \u0275\u0275reference(1);
        \u0275\u0275advance(4);
        \u0275\u0275attribute("viewBox", ctx._viewBox());
        \u0275\u0275advance();
        \u0275\u0275styleProp("stroke-dasharray", ctx._strokeCircumference(), "px")("stroke-dashoffset", ctx._strokeDashOffset(), "px")("stroke-width", ctx._circleStrokeWidth(), "%");
        \u0275\u0275attribute("r", ctx._circleRadius());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
      }
    },
    dependencies: [NgTemplateOutlet],
    styles: [".mat-mdc-progress-spinner{--mat-progress-spinner-animation-multiplier: 1;display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mat-progress-spinner-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mat-progress-spinner-reduced-motion{--mat-progress-spinner-animation-multiplier: 1.25}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate calc(1568.2352941176ms*var(--mat-progress-spinner-animation-multiplier)) linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate calc(5332ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinner, [{
    type: Component,
    args: [{
      selector: "mat-progress-spinner, mat-spinner",
      exportAs: "matProgressSpinner",
      host: {
        "role": "progressbar",
        "class": "mat-mdc-progress-spinner mdc-circular-progress",
        "tabindex": "-1",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": `_noopAnimations`,
        "[class.mdc-circular-progress--indeterminate]": 'mode === "indeterminate"',
        "[style.width.px]": "diameter",
        "[style.height.px]": "diameter",
        "[style.--mat-progress-spinner-size]": 'diameter + "px"',
        "[style.--mat-progress-spinner-active-indicator-width]": 'diameter + "px"',
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[attr.aria-valuenow]": 'mode === "determinate" ? value : null',
        "[attr.mode]": "mode"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NgTemplateOutlet],
      template: '<ng-template #circle>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__indeterminate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeCircumference() / 2"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            cx="50%" cy="50%"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class="mdc-circular-progress__determinate-container" aria-hidden="true" #determinateSpinner>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__determinate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeDashOffset()"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            class="mdc-circular-progress__determinate-circle"\n            cx="50%" cy="50%"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class="mdc-circular-progress__indeterminate-container" aria-hidden="true">\n  <div class="mdc-circular-progress__spinner-layer">\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__gap-patch">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-progress-spinner{--mat-progress-spinner-animation-multiplier: 1;display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mat-progress-spinner-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mat-progress-spinner-reduced-motion{--mat-progress-spinner-animation-multiplier: 1.25}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate calc(1568.2352941176ms*var(--mat-progress-spinner-animation-multiplier)) linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin calc(1333ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate calc(5332ms*var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _determinateCircle: [{
      type: ViewChild,
      args: ["determinateSpinner"]
    }],
    mode: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    diameter: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var MatSpinner = MatProgressSpinner;
var MatProgressSpinnerModule = class _MatProgressSpinnerModule {
  static \u0275fac = function MatProgressSpinnerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinnerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressSpinnerModule,
    imports: [MatProgressSpinner, MatSpinner],
    exports: [MatProgressSpinner, MatSpinner, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinnerModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, BidiModule]
    }]
  }], null, null);
})();

// src/app/features/customers/services/customer-document.service.ts
var CustomerDocumentService = class _CustomerDocumentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getDocumentTypes() {
    return this.http.get(`${this.api}/tenant/document-types`);
  }
  getCustomerDocuments(customerId) {
    return this.http.get(`${this.api}/tenant/customers/${customerId}/documents`);
  }
  uploadDocument(customerId, formData) {
    return this.http.post(`${this.api}/tenant/customers/${customerId}/documents`, formData);
  }
  updateDocumentStatus(customerId, documentId, data) {
    return this.http.patch(`${this.api}/tenant/customers/${customerId}/documents/${documentId}/status`, data);
  }
  deleteDocument(customerId, documentId) {
    return this.http.delete(`${this.api}/tenant/customers/${customerId}/documents/${documentId}`);
  }
  static \u0275fac = function CustomerDocumentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerDocumentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CustomerDocumentService, factory: _CustomerDocumentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerDocumentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/customers/components/document-upload-modal/document-upload-modal.component.ts
function DocumentUploadModalComponent_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r1.name, " ");
  }
}
function DocumentUploadModalComponent_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u2713 ", ctx_r1.selectedFile.name, " (", ctx_r1.formatFileSize(ctx_r1.selectedFile.size), ") ");
  }
}
var DocumentUploadModalComponent = class _DocumentUploadModalComponent {
  data;
  dialogRef;
  documentService;
  interceptorService;
  documentTypes = signal([], ...ngDevMode ? [{ debugName: "documentTypes" }] : []);
  uploading = signal(false, ...ngDevMode ? [{ debugName: "uploading" }] : []);
  selectedFile = null;
  selectedTypeId = "";
  expirationDate = "";
  notes = "";
  Upload = Upload;
  X = X;
  constructor(data, dialogRef, documentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.documentService = documentService;
    this.interceptorService = interceptorService;
    this.loadDocumentTypes();
  }
  loadDocumentTypes() {
    this.documentService.getDocumentTypes().subscribe({
      next: (types) => {
        this.documentTypes.set(types);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los tipos de documento"
        });
      }
    });
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "El archivo es muy grande (m\xE1ximo 10MB)"
        });
        return;
      }
      this.selectedFile = file;
    }
  }
  uploadDocument() {
    if (!this.selectedFile || !this.selectedTypeId) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Selecciona un archivo y tipo de documento"
      });
      return;
    }
    this.uploading.set(true);
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    formData.append("document_type_id", this.selectedTypeId);
    if (this.expirationDate) {
      formData.append("expiration_date", this.expirationDate);
    }
    if (this.notes) {
      formData.append("notes", this.notes);
    }
    this.documentService.uploadDocument(this.data.customerId, formData).subscribe({
      next: () => {
        this.uploading.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Documento subido correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.uploading.set(false);
        let message = "Error al subir documento";
        if (err.status === 413) {
          message = "Archivo muy grande (m\xE1ximo 10MB)";
        } else if (err.status === 415) {
          message = "Tipo de archivo no permitido";
        }
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  static \u0275fac = function DocumentUploadModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentUploadModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(CustomerDocumentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentUploadModalComponent, selectors: [["app-document-upload-modal"]], decls: 35, vars: 10, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content"], [1, "form-grid"], [1, "form-field"], [1, "field-label"], [1, "field-input", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "file-input-wrapper"], ["type", "file", "accept", ".jpg,.jpeg,.png,.pdf,.doc,.docx", "id", "fileInput", 1, "field-input", "file-input", 3, "change"], ["class", "file-info", 4, "ngIf"], ["type", "date", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "form-field", "full-width"], ["placeholder", "Notas adicionales...", "rows", "3", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "help-text"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Subir Documento", "custom_class", "btn_primary", 3, "clicked", "loading", "disabled", "icon"], [3, "value"], [1, "file-info"]], template: function DocumentUploadModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Subir Documento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function DocumentUploadModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "label", 8);
      \u0275\u0275text(10, "Tipo de Documento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function DocumentUploadModalComponent_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedTypeId, $event) || (ctx.selectedTypeId = $event);
        return $event;
      });
      \u0275\u0275elementStart(12, "option", 10);
      \u0275\u0275text(13, "Selecciona un tipo de documento");
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, DocumentUploadModalComponent_option_14_Template, 2, 2, "option", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 7)(16, "label", 8);
      \u0275\u0275text(17, "Archivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 12)(19, "input", 13);
      \u0275\u0275listener("change", function DocumentUploadModalComponent_Template_input_change_19_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(20, DocumentUploadModalComponent_p_20_Template, 2, 2, "p", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 7)(22, "label", 8);
      \u0275\u0275text(23, "Fecha de Expiraci\xF3n (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function DocumentUploadModalComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.expirationDate, $event) || (ctx.expirationDate = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 16)(26, "label", 8);
      \u0275\u0275text(27, "Notas (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "textarea", 17);
      \u0275\u0275twoWayListener("ngModelChange", function DocumentUploadModalComponent_Template_textarea_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event);
        return $event;
      });
      \u0275\u0275text(29, "        ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "p", 18);
      \u0275\u0275text(31, " Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 19)(33, "app-button", 20);
      \u0275\u0275listener("clicked", function DocumentUploadModalComponent_Template_app_button_clicked_33_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "app-button", 21);
      \u0275\u0275listener("clicked", function DocumentUploadModalComponent_Template_app_button_clicked_34_listener() {
        return ctx.uploadDocument();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedTypeId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.documentTypes());
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.selectedFile);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.expirationDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.notes);
      \u0275\u0275advance(6);
      \u0275\u0275property("loading", ctx.uploading())("disabled", !ctx.selectedFile || !ctx.selectedTypeId)("icon", ctx.Upload);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: [`

.dialog[_ngcontent-%COMP%] {
  width: 100dvw;
  max-width: 600px;
}
.dialog-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}
.dialog-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.dialog-title[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-button[_ngcontent-%COMP%] {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}
.close-button[_ngcontent-%COMP%]:hover {
  background-color: #f3f4f6;
  color: #111827;
}
.dialog-content[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-field.full-width[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.field-label[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.field-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: #ffffff;
  cursor: pointer;
}
.field-input[_ngcontent-%COMP%]:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}
.field-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background-color: #ffffff;
}
.field-input[_ngcontent-%COMP%]:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.6;
}
select.field-input[_ngcontent-%COMP%] {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}
select.field-input[_ngcontent-%COMP%]:hover {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
}
input[type=file].field-input[_ngcontent-%COMP%] {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
input[type=file].field-input[_ngcontent-%COMP%]::file-selector-button {
  padding: 0.375rem 0.75rem;
  margin-right: 0.75rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
input[type=file].field-input[_ngcontent-%COMP%]::file-selector-button:hover {
  background-color: #4f46e5;
}
textarea.field-input[_ngcontent-%COMP%] {
  resize: vertical;
  font-family: inherit;
}
.file-info[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: #059669;
  margin-top: 0.5rem;
  font-weight: 500;
}
.file-input-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.help-text[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 1rem;
  margin-bottom: 0;
}
.dialog-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}
/*# sourceMappingURL=document-upload-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentUploadModalComponent, [{
    type: Component,
    args: [{ selector: "app-document-upload-modal", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      ButtonComponent,
      LucideAngularModule
    ], template: '<div class="dialog-container">\r\n  <div class="dialog-header">\r\n    <h2 class="dialog-title">Subir Documento</h2>\r\n    <button (click)="close()" class="close-button">\r\n      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <div class="dialog-content">\r\n    <div class="form-grid">\r\n      <div class="form-field">\r\n        <label class="field-label">Tipo de Documento</label>\r\n        <select \r\n          [(ngModel)]="selectedTypeId"\r\n          class="field-input">\r\n          <option value="" disabled selected>Selecciona un tipo de documento</option>\r\n          <option *ngFor="let type of documentTypes()" [value]="type.id">\r\n            {{ type.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class="form-field">\r\n        <label class="field-label">Archivo</label>\r\n        <div class="file-input-wrapper">\r\n          <input \r\n            type="file"\r\n            (change)="onFileSelected($event)"\r\n            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"\r\n            class="field-input file-input"\r\n            id="fileInput">\r\n        </div>\r\n        <p *ngIf="selectedFile" class="file-info">\r\n          \u2713 {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})\r\n        </p>\r\n      </div>\r\n\r\n      <div class="form-field">\r\n        <label class="field-label">Fecha de Expiraci\xF3n (Opcional)</label>\r\n        <input \r\n          type="date"\r\n          [(ngModel)]="expirationDate"\r\n          class="field-input">\r\n      </div>\r\n\r\n      <div class="form-field full-width">\r\n        <label class="field-label">Notas (Opcional)</label>\r\n        <textarea \r\n          [(ngModel)]="notes"\r\n          placeholder="Notas adicionales..."\r\n          rows="3"\r\n          class="field-input">\r\n        </textarea>\r\n      </div>\r\n    </div>\r\n\r\n    <p class="help-text">\r\n      Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB)\r\n    </p>\r\n  </div>\r\n\r\n  <div class="dialog-footer">\r\n    <app-button\r\n      text="Cancelar"\r\n      custom_class="btn_secondary"\r\n      (clicked)="close()">\r\n    </app-button>\r\n    <app-button\r\n      text="Subir Documento"\r\n      custom_class="btn_primary"\r\n      [loading]="uploading()"\r\n      [disabled]="!selectedFile || !selectedTypeId"\r\n      [icon]="Upload"\r\n      (clicked)="uploadDocument()">\r\n    </app-button>\r\n  </div>\r\n</div>\r\n', styles: [`/* src/app/features/customers/components/document-upload-modal/document-upload-modal.component.scss */
.dialog {
  width: 100dvw;
  max-width: 600px;
}
.dialog-container {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}
.close-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}
.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-field.full-width {
  grid-column: 1/-1;
}
.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.field-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: #ffffff;
  cursor: pointer;
}
.field-input:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}
.field-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background-color: #ffffff;
}
.field-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.6;
}
select.field-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}
select.field-input:hover {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
}
input[type=file].field-input {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
input[type=file].field-input::file-selector-button {
  padding: 0.375rem 0.75rem;
  margin-right: 0.75rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
input[type=file].field-input::file-selector-button:hover {
  background-color: #4f46e5;
}
textarea.field-input {
  resize: vertical;
  font-family: inherit;
}
.file-info {
  font-size: 0.75rem;
  color: #059669;
  margin-top: 0.5rem;
  font-weight: 500;
}
.file-input-wrapper {
  position: relative;
}
.help-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 1rem;
  margin-bottom: 0;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}
/*# sourceMappingURL=document-upload-modal.component.css.map */
`] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: CustomerDocumentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentUploadModalComponent, { className: "DocumentUploadModalComponent", filePath: "src/app/features/customers/components/document-upload-modal/document-upload-modal.component.ts", lineNumber: 24 });
})();

// src/app/features/customers/components/customer-documents/customer-documents.component.ts
function CustomerDocumentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p", 8);
    \u0275\u0275text(2, "Cargando documentos...");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDocumentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 10);
    \u0275\u0275text(2, "No hay documentos subidos");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDocumentsComponent_div_7_div_1_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "span");
    \u0275\u0275text(2, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 27);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Vence: ", \u0275\u0275pipeBind2(5, 1, doc_r2.expiration_date, "mediumDate"));
  }
}
function CustomerDocumentsComponent_div_7_div_1_p_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r2.notes);
  }
}
function CustomerDocumentsComponent_div_7_div_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "button", 30);
    \u0275\u0275listener("click", function CustomerDocumentsComponent_div_7_div_1_div_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "approved"));
    });
    \u0275\u0275element(2, "lucide-icon", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 31);
    \u0275\u0275listener("click", function CustomerDocumentsComponent_div_7_div_1_div_24_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "rejected"));
    });
    \u0275\u0275element(4, "lucide-icon", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileCheck)("size", 18);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileX)("size", 18);
  }
}
function CustomerDocumentsComponent_div_7_div_1_a_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 32);
    \u0275\u0275element(1, "lucide-icon", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", doc_r2.download_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r3.Download)("size", 18);
  }
}
function CustomerDocumentsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275element(2, "lucide-icon", 15);
    \u0275\u0275elementStart(3, "div", 16)(4, "div", 17)(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 19)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, CustomerDocumentsComponent_div_7_div_1_span_21_Template, 6, 4, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, CustomerDocumentsComponent_div_7_div_1_p_22_Template, 2, 1, "p", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 22);
    \u0275\u0275template(24, CustomerDocumentsComponent_div_7_div_1_div_24_Template, 5, 4, "div", 23)(25, CustomerDocumentsComponent_div_7_div_1_a_25_Template, 2, 3, "a", 24);
    \u0275\u0275elementStart(26, "button", 25);
    \u0275\u0275listener("click", function CustomerDocumentsComponent_div_7_div_1_Template_button_click_26_listener() {
      const doc_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteDocument(doc_r2));
    });
    \u0275\u0275element(27, "lucide-icon", 26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.getFileIcon(doc_r2.mime_type))("size", 24);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r2.file_name);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(doc_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(doc_r2.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(doc_r2.document_type.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.formatFileSize(doc_r2.file_size));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 15, doc_r2.created_at, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.expiration_date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r2.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r2.download_url);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.Trash2)("size", 18);
  }
}
function CustomerDocumentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, CustomerDocumentsComponent_div_7_div_1_Template, 28, 18, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.documents());
  }
}
var CustomerDocumentsComponent = class _CustomerDocumentsComponent {
  documentService;
  interceptorService;
  dialog;
  customerId;
  documents = signal([], ...ngDevMode ? [{ debugName: "documents" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  Plus = Plus;
  Download = Download;
  Trash2 = Trash2;
  FileText = FileText;
  Image = Image;
  FileCheck = FileCheck;
  FileX = FileX;
  constructor(documentService, interceptorService, dialog) {
    this.documentService = documentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadDocuments();
  }
  loadDocuments() {
    this.loading.set(true);
    this.documentService.getCustomerDocuments(this.customerId).subscribe({
      next: (docs) => {
        this.documents.set(docs);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los documentos"
        });
      }
    });
  }
  openUploadModal() {
    const dialogRef = this.dialog.open(DocumentUploadModalComponent, {
      data: { customerId: this.customerId }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDocuments();
      }
    });
  }
  deleteDocument(doc) {
    if (!confirm(`\xBFEliminar documento "${doc.file_name}"?`))
      return;
    this.documentService.deleteDocument(this.customerId, doc.id).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Documento eliminado"
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo eliminar el documento"
        });
      }
    });
  }
  updateStatus(doc, status) {
    this.documentService.updateDocumentStatus(this.customerId, doc.id, { status }).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Estado actualizado"
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo actualizar el estado"
        });
      }
    });
  }
  getStatusClass(status) {
    const statusMap = {
      "pending": "bg-yellow-100 text-yellow-800",
      "approved": "bg-green-100 text-green-800",
      "rejected": "bg-red-100 text-red-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status]}`;
  }
  getStatusLabel(status) {
    const labels = {
      "pending": "Pendiente",
      "approved": "Aprobado",
      "rejected": "Rechazado"
    };
    return labels[status];
  }
  getFileIcon(mimeType) {
    if (mimeType.startsWith("image/"))
      return this.Image;
    if (mimeType.includes("pdf"))
      return this.FileText;
    return this.FileText;
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  static \u0275fac = function CustomerDocumentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerDocumentsComponent)(\u0275\u0275directiveInject(CustomerDocumentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerDocumentsComponent, selectors: [["app-customer-documents"]], inputs: { customerId: "customerId" }, decls: 8, vars: 5, consts: [[1, "bg-white", "shadow-md", "rounded-xl", "p-6", "border", "border-gray-100", "mb-6"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-gray-800"], ["text", "Subir Documento", "variant", "primary", "size", "sm", 3, "clicked", "fullWidth", "icon"], ["class", "text-center py-8", 4, "ngIf"], ["class", "text-center py-8 text-gray-500", 4, "ngIf"], ["class", "space-y-3", 4, "ngIf"], [1, "text-center", "py-8"], [1, "text-gray-500"], [1, "text-center", "py-8", "text-gray-500"], [1, "text-sm"], [1, "space-y-3"], ["class", "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-between", "p-4", "border", "border-gray-200", "rounded-lg", "hover:bg-gray-50", "transition-colors"], [1, "flex", "items-center", "gap-3", "flex-1"], [1, "text-gray-400", 3, "img", "size"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "flex", "items-center", "gap-3", "text-xs", "text-gray-500"], [4, "ngIf"], ["class", "text-xs text-gray-600 mt-1", 4, "ngIf"], [1, "flex", "items-center", "gap-2"], ["class", "flex gap-1", 4, "ngIf"], ["target", "_blank", "class", "p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors", "title", "Descargar", 3, "href", 4, "ngIf"], ["title", "Eliminar", 1, "p-2", "text-red-600", "hover:bg-red-50", "rounded-lg", "transition-colors", 3, "click"], [3, "img", "size"], [1, "text-orange-600"], [1, "text-xs", "text-gray-600", "mt-1"], [1, "flex", "gap-1"], ["title", "Aprobar", 1, "p-2", "text-green-600", "hover:bg-green-50", "rounded-lg", "transition-colors", 3, "click"], ["title", "Rechazar", 1, "p-2", "text-red-600", "hover:bg-red-50", "rounded-lg", "transition-colors", 3, "click"], ["target", "_blank", "title", "Descargar", 1, "p-2", "text-indigo-600", "hover:bg-indigo-50", "rounded-lg", "transition-colors", 3, "href"]], template: function CustomerDocumentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Documentos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-button", 3);
      \u0275\u0275listener("clicked", function CustomerDocumentsComponent_Template_app_button_clicked_4_listener() {
        return ctx.openUploadModal();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(5, CustomerDocumentsComponent_div_5_Template, 3, 0, "div", 4)(6, CustomerDocumentsComponent_div_6_Template, 3, 0, "div", 5)(7, CustomerDocumentsComponent_div_7_Template, 2, 1, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("fullWidth", false)("icon", ctx.Plus);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.documents().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.documents().length > 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent,
    DatePipe
  ], styles: ["\n\n/*# sourceMappingURL=customer-documents.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerDocumentsComponent, [{
    type: Component,
    args: [{ selector: "app-customer-documents", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      LucideAngularModule
    ], template: `<div class="bg-white shadow-md rounded-xl p-6 border border-gray-100 mb-6">\r
  <div class="flex items-center justify-between mb-4">\r
    <h3 class="text-lg font-semibold text-gray-800">Documentos</h3>\r
    <app-button\r
      text="Subir Documento"\r
      variant="primary"\r
      size="sm"\r
      [fullWidth]="false"\r
      [icon]="Plus"\r
      (clicked)="openUploadModal()">\r
    </app-button>\r
  </div>\r
\r
  <!-- Loading State -->\r
  <div *ngIf="loading()" class="text-center py-8">\r
    <p class="text-gray-500">Cargando documentos...</p>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading() && documents().length === 0" class="text-center py-8 text-gray-500">\r
    <p class="text-sm">No hay documentos subidos</p>\r
  </div>\r
\r
  <!-- Documents List -->\r
  <div *ngIf="!loading() && documents().length > 0" class="space-y-3">\r
    <div *ngFor="let doc of documents()" \r
         class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">\r
      \r
      <div class="flex items-center gap-3 flex-1">\r
        <lucide-icon \r
          [img]="getFileIcon(doc.mime_type)"\r
          class="text-gray-400"\r
          [size]="24">\r
        </lucide-icon>\r
\r
        <div class="flex-1 min-w-0">\r
          <div class="flex items-center gap-2 mb-1">\r
            <span class="text-sm font-medium text-gray-900 truncate">{{ doc.file_name }}</span>\r
            <span [class]="getStatusClass(doc.status)">\r
              {{ getStatusLabel(doc.status) }}\r
            </span>\r
          </div>\r
          \r
          <div class="flex items-center gap-3 text-xs text-gray-500">\r
            <span>{{ doc.document_type.name }}</span>\r
            <span>\u2022</span>\r
            <span>{{ formatFileSize(doc.file_size) }}</span>\r
            <span>\u2022</span>\r
            <span>{{ doc.created_at | date:'mediumDate' }}</span>\r
            <span *ngIf="doc.expiration_date">\r
              <span>\u2022</span>\r
              <span class="text-orange-600">Vence: {{ doc.expiration_date | date:'mediumDate' }}</span>\r
            </span>\r
          </div>\r
\r
          <p *ngIf="doc.notes" class="text-xs text-gray-600 mt-1">{{ doc.notes }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-center gap-2">\r
        <!-- Status Actions -->\r
        <div *ngIf="doc.status === 'pending'" class="flex gap-1">\r
          <button\r
            (click)="updateStatus(doc, 'approved')"\r
            class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"\r
            title="Aprobar">\r
            <lucide-icon [img]="FileCheck" [size]="18"></lucide-icon>\r
          </button>\r
          <button\r
            (click)="updateStatus(doc, 'rejected')"\r
            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"\r
            title="Rechazar">\r
            <lucide-icon [img]="FileX" [size]="18"></lucide-icon>\r
          </button>\r
        </div>\r
\r
        <!-- Download -->\r
        <a \r
          *ngIf="doc.download_url"\r
          [href]="doc.download_url"\r
          target="_blank"\r
          class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"\r
          title="Descargar">\r
          <lucide-icon [img]="Download" [size]="18"></lucide-icon>\r
        </a>\r
\r
        <!-- Delete -->\r
        <button\r
          (click)="deleteDocument(doc)"\r
          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"\r
          title="Eliminar">\r
          <lucide-icon [img]="Trash2" [size]="18"></lucide-icon>\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/customers/components/customer-documents/customer-documents.component.scss */\n/*# sourceMappingURL=customer-documents.component.css.map */\n"] }]
  }], () => [{ type: CustomerDocumentService }, { type: InterceptorService }, { type: MatDialog }], { customerId: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerDocumentsComponent, { className: "CustomerDocumentsComponent", filePath: "src/app/features/customers/components/customer-documents/customer-documents.component.ts", lineNumber: 22 });
})();

// src/app/core/directives/has-permission.directive.ts
var HasPermissionDirective = class _HasPermissionDirective {
  templateRef;
  viewContainer;
  authService;
  hasPermission;
  hasPermissionMode = "all";
  permissionsSubscription;
  hasView = false;
  constructor(templateRef, viewContainer, authService) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.authService = authService;
  }
  ngOnInit() {
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.updateView();
    });
  }
  ngOnDestroy() {
    this.permissionsSubscription?.unsubscribe();
  }
  updateView() {
    const hasAccess = this.checkPermissions();
    if (hasAccess && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  checkPermissions() {
    if (!this.hasPermission) {
      return true;
    }
    const permissions = Array.isArray(this.hasPermission) ? this.hasPermission : [this.hasPermission];
    if (this.hasPermissionMode === "any") {
      return permissions.some((p) => this.authService.hasPermission(p));
    } else {
      return permissions.every((p) => this.authService.hasPermission(p));
    }
  }
  static \u0275fac = function HasPermissionDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HasPermissionDirective)(\u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HasPermissionDirective, selectors: [["", "hasPermission", ""]], inputs: { hasPermission: "hasPermission", hasPermissionMode: "hasPermissionMode" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HasPermissionDirective, [{
    type: Directive,
    args: [{
      selector: "[hasPermission]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }, { type: ViewContainerRef }, { type: AuthService }], { hasPermission: [{
    type: Input
  }], hasPermissionMode: [{
    type: Input
  }] });
})();

// src/app/features/customers/pages/customer-detail/customer-detail.ts
var _c03 = (a0, a1, a2) => ({ "bg-green-100 text-green-800": a0, "bg-gray-100 text-gray-800": a1, "bg-red-100 text-red-800": a2 });
var _forTrack0 = ($index, $item) => $item.id;
function CustomerDetail_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "mat-spinner", 3);
    \u0275\u0275elementStart(2, "p", 4);
    \u0275\u0275text(3, "Cargando detalles del cliente...");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 6);
    \u0275\u0275listener("click", function CustomerDetail_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadCustomer());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.error().message);
  }
}
function CustomerDetail_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", "mailto:" + ctx_r1.customer().email, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.customer().email, " ");
  }
}
function CustomerDetail_Conditional_3_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function CustomerDetail_Conditional_3_div_57_Conditional_4_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 30)(1, "td", 31)(2, "span", 32);
    \u0275\u0275listener("click", function CustomerDetail_Conditional_3_div_57_Conditional_4_For_18_Template_span_click_2_listener($event) {
      const contract_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      ctx_r1.openPropertyModal(contract_r5.property.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 33);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 31)(12, "span", 35);
    \u0275\u0275listener("click", function CustomerDetail_Conditional_3_div_57_Conditional_4_For_18_Template_span_click_12_listener($event) {
      const contract_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      ctx_r1.openContractModal(contract_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 31)(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "titlecase");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const contract_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", contract_r5.property.code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(contract_r5.property.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", contract_r5.property.total_area, " m\xB2");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 7, contract_r5.total_price, contract_r5.currency));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", contract_r5.contract_number, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(12, _c03, contract_r5.status === "activo", contract_r5.status === "completado", contract_r5.status === "cancelado"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 10, contract_r5.status), " ");
  }
}
function CustomerDetail_Conditional_3_div_57_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "table", 26)(2, "thead", 27)(3, "tr")(4, "th", 28);
    \u0275\u0275text(5, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 28);
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 28);
    \u0275\u0275text(9, "\xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 28);
    \u0275\u0275text(11, "Precio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 28);
    \u0275\u0275text(13, "Contrato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 28);
    \u0275\u0275text(15, "Estado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 29);
    \u0275\u0275repeaterCreate(17, CustomerDetail_Conditional_3_div_57_Conditional_4_For_18_Template, 18, 16, "tr", 30, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.customer().contracts);
  }
}
function CustomerDetail_Conditional_3_div_57_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 37);
    \u0275\u0275text(2, "No hay contratos asociados");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_3_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 22)(2, "h3", 23);
    \u0275\u0275text(3, " Propiedades y Contratos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, CustomerDetail_Conditional_3_div_57_Conditional_4_Template, 19, 0, "div", 24)(5, CustomerDetail_Conditional_3_div_57_Conditional_5_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.customer().contracts && ctx_r1.customer().contracts.length > 0 ? 4 : 5);
  }
}
function CustomerDetail_Conditional_3_app_customer_documents_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-customer-documents", 38);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("customerId", ctx_r1.customer().id);
  }
}
function CustomerDetail_Conditional_3_div_59_Conditional_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "C\xF3digo postal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Pa\xEDs");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_3_div_59_Conditional_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const address_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.street_address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.city);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.state);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.postal_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(address_r6.country);
  }
}
function CustomerDetail_Conditional_3_div_59_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-table", 40);
    \u0275\u0275template(1, CustomerDetail_Conditional_3_div_59_Conditional_5_ng_template_1_Template, 13, 0, "ng-template", 41)(2, CustomerDetail_Conditional_3_div_59_Conditional_5_ng_template_2_Template, 13, 6, "ng-template", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", ctx_r1.customer().addresses);
  }
}
function CustomerDetail_Conditional_3_div_59_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 37);
    \u0275\u0275text(2, "No hay direcciones agregadas");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_3_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 22)(2, "h3", 23);
    \u0275\u0275text(3, " Direcciones ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-button", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomerDetail_Conditional_3_div_59_Conditional_5_Template, 3, 1, "p-table", 40)(6, CustomerDetail_Conditional_3_div_59_Conditional_6_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r1.MapPinIcon);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customer().addresses && ctx_r1.customer().addresses.length > 0 ? 5 : 6);
  }
}
function CustomerDetail_Conditional_3_div_60_Conditional_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Fecha de actividad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Duraci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_3_div_60_Conditional_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 43);
    \u0275\u0275element(2, "p-tag", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 46);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 47);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275element(9, "p-tag", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const activity_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("value", activity_r7.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", activity_r7.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", activity_r7.description, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", activity_r7.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(12, 6, activity_r7.activity_date, "medium"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", activity_r7.duration_minutes, " min ");
  }
}
function CustomerDetail_Conditional_3_div_60_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-table", 40);
    \u0275\u0275template(1, CustomerDetail_Conditional_3_div_60_Conditional_5_ng_template_1_Template, 11, 0, "ng-template", 41)(2, CustomerDetail_Conditional_3_div_60_Conditional_5_ng_template_2_Template, 15, 9, "ng-template", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", ctx_r1.customer().activities);
  }
}
function CustomerDetail_Conditional_3_div_60_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 37);
    \u0275\u0275text(2, "No hay actividades agregadas");
    \u0275\u0275elementEnd()();
  }
}
function CustomerDetail_Conditional_3_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 22)(2, "h3", 23);
    \u0275\u0275text(3, " Actividades ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-button", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomerDetail_Conditional_3_div_60_Conditional_5_Template, 3, 1, "p-table", 40)(6, CustomerDetail_Conditional_3_div_60_Conditional_6_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r1.ActivityIcon);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.customer().activities && ctx_r1.customer().activities.length > 0 ? 5 : 6);
  }
}
function CustomerDetail_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div")(2, "h2", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "app-button", 10);
    \u0275\u0275listener("clicked", function CustomerDetail_Conditional_3_Template_app_button_clicked_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCustomer());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 11)(8, "h3", 12);
    \u0275\u0275text(9, " Informaci\xF3n del Cliente ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 13)(11, "div")(12, "span", 14);
    \u0275\u0275text(13, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "span", 14);
    \u0275\u0275text(18, "Apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 15);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "span", 14);
    \u0275\u0275text(23, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, CustomerDetail_Conditional_3_Conditional_24_Template, 2, 2, "a", 16)(25, CustomerDetail_Conditional_3_Conditional_25_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "span", 14);
    \u0275\u0275text(28, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "app-phone", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div")(31, "span", 14);
    \u0275\u0275text(32, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 15);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div")(36, "span", 14);
    \u0275\u0275text(37, "Grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 15);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div")(41, "span", 14);
    \u0275\u0275text(42, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div");
    \u0275\u0275element(44, "p-tag", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div")(46, "span", 14);
    \u0275\u0275text(47, "Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 15);
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 19)(52, "span", 14);
    \u0275\u0275text(53, "Actualizado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span", 15);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(57, CustomerDetail_Conditional_3_div_57_Template, 6, 1, "div", 20)(58, CustomerDetail_Conditional_3_app_customer_documents_58_Template, 1, 1, "app-customer-documents", 21)(59, CustomerDetail_Conditional_3_div_59_Template, 7, 3, "div", 20)(60, CustomerDetail_Conditional_3_div_60_Template, 7, 3, "div", 20);
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.customer().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.customer().email);
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", false)("icon", ctx_r1.PencilIcon);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.customer().name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.customer().lastname || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.customer().email ? 24 : 25);
    \u0275\u0275advance(5);
    \u0275\u0275property("phone", ctx_r1.customer().phone)("countryCode", ctx_r1.customer().phone_country)("countryPhoneCode", ctx_r1.customer().phone_code);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.customer().company_name || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_12_0 = ctx_r1.customer().group) == null ? null : tmp_12_0.name) || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ((tmp_13_0 = ctx_r1.customer().status) == null ? null : tmp_13_0.name) || ctx_r1.customer().status_id || "Desconocido")("severity", ctx_r1.getSeverity(((tmp_14_0 = ctx_r1.customer().status) == null ? null : tmp_14_0.name) || ctx_r1.customer().status_id || ""));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(50, 20, ctx_r1.customer().created_at, "medium"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(56, 23, ctx_r1.customer().updated_at, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275property("hasPermission", "contracts:read");
    \u0275\u0275advance();
    \u0275\u0275property("hasPermission", "customers:read");
    \u0275\u0275advance();
    \u0275\u0275property("hasPermission", "customers:read");
    \u0275\u0275advance();
    \u0275\u0275property("hasPermission", "customers:read");
  }
}
var CustomerDetail = class _CustomerDetail {
  route;
  router;
  customerService;
  propertyService;
  dialog;
  customer = signal(null, ...ngDevMode ? [{ debugName: "customer" }] : []);
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  customerId = null;
  destroy$ = new Subject();
  PencilIcon = Pencil;
  MapPinIcon = MapPin;
  ActivityIcon = Activity;
  constructor(route, router, customerService, propertyService, dialog) {
    this.route = route;
    this.router = router;
    this.customerService = customerService;
    this.propertyService = propertyService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.customerId = Number(params["id"]);
      if (this.customerId) {
        this.loadCustomer();
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Load customer details
   */
  loadCustomer() {
    if (!this.customerId)
      return;
    this.isLoading.set(true);
    this.error.set(null);
    this.customerService.getCustomer(String(this.customerId)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (customer) => {
        this.customer.set(customer);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Edit customer
   */
  editCustomer() {
    if (!this.customer())
      return;
    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      width: "500px",
      data: { customer: this.customer() }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCustomer();
      }
    });
  }
  /**
   * Go back to customers list
   */
  goBack() {
    this.router.navigate(["/customers"]);
  }
  /**
   * Navigate to property detail
   */
  navigateToProperty(propertyId) {
    this.router.navigate(["/properties/detail", propertyId]);
  }
  /**
   * Open property modal
   */
  openPropertyModal(propertyId) {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, {
          data: { property }
        });
      },
      error: (error) => {
        console.error("Error loading property:", error);
      }
    });
  }
  /**
   * Open contract modal
   */
  openContractModal(contract) {
    this.dialog.open(ContractDetailModalComponent, {
      data: { contract }
    });
  }
  getSeverity(s) {
    const map = {
      "Validado": "success",
      "Al corriente": "success",
      "Pagado": "success",
      "Pendiente": "warn",
      "Atrasado": "danger",
      "active": "success",
      "inactive": "danger"
    };
    return map[s] ?? "secondary";
  }
  static \u0275fac = function CustomerDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerDetail)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerDetail, selectors: [["app-customer-detail"]], decls: 4, vars: 3, consts: [[1, "space-y-10", "min-h-screen"], [1, "flex", "items-center", "justify-center", "py-12"], [1, "bg-red-50", "border", "border-red-200", "rounded-lg", "p-4"], ["diameter", "40"], [1, "ml-4"], [1, "text-red-800"], ["pButton", "", "label", "Reintentar", 1, "p-button-sm", "mt-2", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-bold", "text-gray-900"], [1, "text-sm", "text-gray-500"], ["text", "Editar cliente", "variant", "primary", "size", "sm", 3, "clicked", "fullWidth", "icon"], [1, "bg-white", "shadow-md", "rounded-xl", "p-6", "border", "border-gray-100"], [1, "text-lg", "font-semibold", "text-gray-800", "mb-4"], [1, "grid", "grid-cols-2", "gap-4", "text-sm"], [1, "block", "text-xs", "font-semibold", "text-gray-500", "mb-1"], [1, "text-gray-900"], [1, "text-indigo-600", "hover:text-indigo-800", "break-all", 3, "href"], [3, "phone", "countryCode", "countryPhoneCode"], ["rounded", "true", 3, "value", "severity"], [1, "col-span-2"], ["class", "bg-white shadow-md rounded-xl p-6 border border-gray-100", 4, "hasPermission"], [3, "customerId", 4, "hasPermission"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-gray-800"], [1, "overflow-x-auto"], [1, "text-center", "py-8", "text-gray-500"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "bg-white", "divide-y", "divide-gray-200"], [1, "hover:bg-gray-50"], [1, "px-4", "py-3", "whitespace-nowrap"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "cursor-pointer", "hover:bg-green-200", "transition-colors", 3, "click"], [1, "px-4", "py-3", "text-sm", "text-gray-900"], [1, "px-4", "py-3", "text-sm", "text-gray-600"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800", "cursor-pointer", "hover:bg-purple-200", "transition-colors", 3, "click"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded-full", "text-xs", "font-medium", 3, "ngClass"], [1, "text-sm"], [3, "customerId"], ["text", "Agregar direcci\xF3n", "variant", "primary", "size", "sm", 3, "fullWidth", "icon"], ["responsiveLayout", "scroll", "styleClass", "p-datatable-sm w-full", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "capitalize"], ["text", "Agregar actividad", "variant", "primary", "size", "sm", 3, "fullWidth", "icon"], ["severity", "info", "rounded", "true", 3, "value"], [1, "font-medium", "text-gray-800"], [1, "text-xs", "text-gray-500"], ["severity", "success", "rounded", "true", 3, "value"]], template: function CustomerDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CustomerDetail_Conditional_1_Template, 4, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, CustomerDetail_Conditional_2_Template, 4, 1, "div", 2);
      \u0275\u0275conditionalCreate(3, CustomerDetail_Conditional_3_Template, 61, 26);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() && !ctx.isLoading() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.customer() && !ctx.isLoading() && !ctx.error() ? 3 : -1);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    TagModule,
    Tag,
    PrimeTemplate,
    ButtonModule,
    ButtonDirective,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    PhoneComponent,
    CustomerDocumentsComponent,
    ButtonComponent,
    HasPermissionDirective,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerDetail, [{
    type: Component,
    args: [{ selector: "app-customer-detail", standalone: true, schemas: [NO_ERRORS_SCHEMA], imports: [
      CommonModule,
      TagModule,
      ButtonModule,
      MatCardModule,
      MatProgressSpinnerModule,
      PhoneComponent,
      CustomerDocumentsComponent,
      ButtonComponent,
      HasPermissionDirective
    ], template: `<div class="space-y-10 min-h-screen">\r
\r
    <!-- LOADING STATE -->\r
    @if (isLoading()) {\r
      <div class="flex items-center justify-center py-12">\r
        <mat-spinner diameter="40"></mat-spinner>\r
        <p class="ml-4">Cargando detalles del cliente...</p>\r
      </div>\r
    }\r
\r
    <!-- ERROR STATE -->\r
    @if (error() && !isLoading()) {\r
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">\r
        <p class="text-red-800">{{ error().message }}</p>\r
        <button\r
          pButton\r
          label="Reintentar"\r
          (click)="loadCustomer()"\r
          class="p-button-sm mt-2">\r
        </button>\r
      </div>\r
    }\r
\r
    <!-- CUSTOMER DETAILS -->\r
    @if (customer() && !isLoading() && !error()) {\r
      <!-- HEADER -->\r
      <div class="flex items-center justify-between">\r
        <div>\r
          <h2 class="text-3xl font-bold text-gray-900">{{ customer()!.name }}</h2>\r
          <p class="text-sm text-gray-500">{{ customer()!.email }}</p>\r
        </div>\r
        <app-button\r
          text="Editar cliente"\r
          variant="primary"\r
          size="sm"\r
          [fullWidth]="false"\r
          [icon]="PencilIcon"\r
          (clicked)="editCustomer()">\r
        </app-button>\r
      </div>\r
\r
      <!-- CUSTOMER INFORMATION -->\r
      <div class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
        <h3 class="text-lg font-semibold text-gray-800 mb-4">\r
          Informaci\xF3n del Cliente\r
        </h3>\r
\r
        <div class="grid grid-cols-2 gap-4 text-sm">\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Nombre</span>\r
            <span class="text-gray-900">{{ customer()!.name }}</span>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Apellido</span>\r
            <span class="text-gray-900">{{ customer()!.lastname || '\u2014' }}</span>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Email</span>\r
            @if (customer()!.email) {\r
              <a [href]="'mailto:' + customer()!.email" class="text-indigo-600 hover:text-indigo-800 break-all">\r
                {{ customer()!.email }}\r
              </a>\r
            } @else {\r
              <span class="text-gray-900">\u2014</span>\r
            }\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Tel\xE9fono</span>\r
            <app-phone \r
              [phone]="customer()!.phone"\r
              [countryCode]="customer()!.phone_country"\r
              [countryPhoneCode]="customer()!.phone_code">\r
            </app-phone>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Empresa</span>\r
            <span class="text-gray-900">{{ customer()!.company_name || '\u2014' }}</span>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Grupo</span>\r
            <span class="text-gray-900">{{ customer()!.group?.name || '\u2014' }}</span>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Estado</span>\r
            <div>\r
              <p-tag \r
                [value]="customer()!.status?.name || customer()!.status_id || 'Desconocido'" \r
                [severity]="getSeverity(customer()!.status?.name || customer()!.status_id || '')" \r
                rounded="true">\r
              </p-tag>\r
            </div>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Creado</span>\r
            <span class="text-gray-900">{{ customer()!.created_at | date:'medium' }}</span>\r
          </div>\r
\r
          <div class="col-span-2">\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Actualizado</span>\r
            <span class="text-gray-900">{{ customer()!.updated_at | date:'medium' }}</span>\r
          </div>\r
\r
        </div>\r
      </div>\r
\r
      <!-- CONTRACTS AND PROPERTIES SECTION -->\r
      <div *hasPermission="'contracts:read'" class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
        <div class="flex items-center justify-between mb-4">\r
          <h3 class="text-lg font-semibold text-gray-800">\r
            Propiedades y Contratos\r
          </h3>\r
        </div>\r
\r
        @if (customer()!.contracts && customer()!.contracts.length > 0) {\r
          <div class="overflow-x-auto">\r
            <table class="min-w-full divide-y divide-gray-200">\r
              <thead class="bg-gray-50">\r
                <tr>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C\xF3digo</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\xC1rea</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrato</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>\r
                </tr>\r
              </thead>\r
              <tbody class="bg-white divide-y divide-gray-200">\r
                @for (contract of customer()!.contracts; track contract.id) {\r
                  <tr class="hover:bg-gray-50">\r
                    <td class="px-4 py-3 whitespace-nowrap">\r
                      <span \r
                        (click)="openPropertyModal(contract.property.id); $event.stopPropagation()"\r
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors">\r
                        {{ contract.property.code }}\r
                      </span>\r
                    </td>\r
                    <td class="px-4 py-3 text-sm text-gray-900">{{ contract.property.name }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-600">{{ contract.property.total_area }} m\xB2</td>\r
                    <td class="px-4 py-3 text-sm text-gray-900">{{ contract.total_price | currency:contract.currency }}</td>\r
                    <td class="px-4 py-3 whitespace-nowrap">\r
                      <span \r
                        (click)="openContractModal(contract); $event.stopPropagation()"\r
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 cursor-pointer hover:bg-purple-200 transition-colors">\r
                        {{ contract.contract_number }}\r
                      </span>\r
                    </td>\r
                    <td class="px-4 py-3 whitespace-nowrap">\r
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"\r
                            [ngClass]="{\r
                              'bg-green-100 text-green-800': contract.status === 'activo',\r
                              'bg-gray-100 text-gray-800': contract.status === 'completado',\r
                              'bg-red-100 text-red-800': contract.status === 'cancelado'\r
                            }">\r
                        {{ contract.status | titlecase }}\r
                      </span>\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        } @else {\r
          <div class="text-center py-8 text-gray-500">\r
            <p class="text-sm">No hay contratos asociados</p>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- CUSTOMER DOCUMENTS SECTION -->\r
      <app-customer-documents *hasPermission="'customers:read'" [customerId]="customer()!.id"></app-customer-documents>\r
\r
      <!-- ADDRESSES SECTION -->\r
      <div *hasPermission="'customers:read'" class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
        <div class="flex items-center justify-between mb-4">\r
          <h3 class="text-lg font-semibold text-gray-800">\r
            Direcciones\r
          </h3>\r
          <app-button\r
            text="Agregar direcci\xF3n"\r
            variant="primary"\r
            size="sm"\r
            [fullWidth]="false"\r
            [icon]="MapPinIcon">\r
          </app-button>\r
        </div>\r
\r
        @if (customer()!.addresses && customer()!.addresses.length > 0) {\r
          <p-table\r
            [value]="customer()!.addresses"\r
            responsiveLayout="scroll"\r
            styleClass="p-datatable-sm w-full">\r
            <ng-template pTemplate="header">\r
              <tr>\r
                <th>Tipo</th>\r
                <th>Direcci\xF3n</th>\r
                <th>Ciudad</th>\r
                <th>Estado</th>\r
                <th>C\xF3digo postal</th>\r
                <th>Pa\xEDs</th>\r
              </tr>\r
            </ng-template>\r
            <ng-template pTemplate="body" let-address>\r
              <tr>\r
                <td class="capitalize">{{ address.type }}</td>\r
                <td>{{ address.street_address }}</td>\r
                <td>{{ address.city }}</td>\r
                <td>{{ address.state }}</td>\r
                <td>{{ address.postal_code }}</td>\r
                <td>{{ address.country }}</td>\r
              </tr>\r
            </ng-template>\r
          </p-table>\r
        } @else {\r
          <div class="text-center py-8 text-gray-500">\r
            <p class="text-sm">No hay direcciones agregadas</p>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- ACTIVITIES SECTION -->\r
      <div *hasPermission="'customers:read'" class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
        <div class="flex items-center justify-between mb-4">\r
          <h3 class="text-lg font-semibold text-gray-800">\r
            Actividades\r
          </h3>\r
          <app-button\r
            text="Agregar actividad"\r
            variant="primary"\r
            size="sm"\r
            [fullWidth]="false"\r
            [icon]="ActivityIcon">\r
          </app-button>\r
        </div>\r
\r
        @if (customer()!.activities && customer()!.activities.length > 0) {\r
          <p-table\r
            [value]="customer()!.activities"\r
            responsiveLayout="scroll"\r
            styleClass="p-datatable-sm w-full">\r
            <ng-template pTemplate="header">\r
              <tr>\r
                <th>Tipo</th>\r
                <th>T\xEDtulo</th>\r
                <th>Estado</th>\r
                <th>Fecha de actividad</th>\r
                <th>Duraci\xF3n</th>\r
              </tr>\r
            </ng-template>\r
            <ng-template pTemplate="body" let-activity>\r
              <tr>\r
                <td class="capitalize">\r
                  <p-tag\r
                    [value]="activity.type"\r
                    severity="info"\r
                    rounded="true">\r
                  </p-tag>\r
                </td>\r
                <td>\r
                  <div class="font-medium text-gray-800">\r
                    {{ activity.title }}\r
                  </div>\r
                  <div class="text-xs text-gray-500">\r
                    {{ activity.description }}\r
                  </div>\r
                </td>\r
                <td>\r
                  <p-tag\r
                    [value]="activity.status"\r
                    severity="success"\r
                    rounded="true">\r
                  </p-tag>\r
                </td>\r
                <td>\r
                  {{ activity.activity_date | date:'medium' }}\r
                </td>\r
                <td>\r
                  {{ activity.duration_minutes }} min\r
                </td>\r
              </tr>\r
            </ng-template>\r
          </p-table>\r
        } @else {\r
          <div class="text-center py-8 text-gray-500">\r
            <p class="text-sm">No hay actividades agregadas</p>\r
          </div>\r
        }\r
      </div>\r
    }\r
</div>` }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: CustomerService }, { type: PropertyService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerDetail, { className: "CustomerDetail", filePath: "src/app/features/customers/pages/customer-detail/customer-detail.ts", lineNumber: 41 });
})();
export {
  CustomerDetail
};
//# sourceMappingURL=chunk-6IUW34RC.js.map

import {
  CustomSnackbarComponent
} from "./chunk-Y4MZBWJH.js";
import {
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  AuthService
} from "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgClass
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  Inject,
  Injectable,
  catchError,
  setClassMetadata,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/alert-dialog/alert-dialog.component.ts
var _c0 = (a0, a1, a2) => ({ icon_success: a0, icon_error: a1, icon_warning: a2 });
var _c1 = (a0, a1) => ({ "fi-sr-shield-check": a0, "fi-ss-shield-exclamation": a1 });
function AlertDialogComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Error!");
    \u0275\u0275elementEnd();
  }
}
function AlertDialogComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Success!");
    \u0275\u0275elementEnd();
  }
}
function AlertDialogComponent_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Warning!");
    \u0275\u0275elementEnd();
  }
}
function AlertDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, AlertDialogComponent_Conditional_5_Conditional_1_Template, 2, 0, "span");
    \u0275\u0275conditionalCreate(2, AlertDialogComponent_Conditional_5_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275conditionalCreate(3, AlertDialogComponent_Conditional_5_Conditional_3_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.type == "error" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.type == "success" || ctx_r0.data.type == "success_confirm" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.type == "warning" || ctx_r0.data.type == "message" ? 3 : -1);
  }
}
function AlertDialogComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.data.title);
  }
}
function AlertDialogComponent_Conditional_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function AlertDialogComponent_Conditional_10_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeDialog(true));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.data.text_accept ? ctx_r0.data.text_accept : "ACCEPT");
  }
}
function AlertDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
    \u0275\u0275listener("click", function AlertDialogComponent_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDialog(false));
    });
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, AlertDialogComponent_Conditional_10_Conditional_4_Template, 3, 1, "button", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.data.text_cancel ? ctx_r0.data.text_cancel : "CLOSE");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.type == "warning" || ctx_r0.data.type == "success_confirm" ? 4 : -1);
  }
}
function AlertDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "button", 8);
    \u0275\u0275listener("click", function AlertDialogComponent_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDialog(false));
    });
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.data.text_cancel ? ctx_r0.data.text_cancel : "CLOSE");
  }
}
var AlertDialogComponent = class _AlertDialogComponent {
  dialog_ref;
  data;
  constructor(dialog_ref, data) {
    this.dialog_ref = dialog_ref;
    this.data = data;
  }
  ngOnInit() {
  }
  closeDialog(response) {
    this.dialog_ref.close(response);
  }
  static \u0275fac = function AlertDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AlertDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AlertDialogComponent, selectors: [["app-alert-dialog"]], decls: 12, vars: 14, consts: [[1, "container"], [1, "dialog_main"], [1, "body"], [1, "icon_container", "animate__animated", "animate__heartBeat", 3, "ngClass"], [1, "fi", 3, "ngClass"], [1, "footer"], [1, "button-primary-outline", 3, "click"], [1, "button-primary-solid"], [1, "button-primary-solid", 3, "click"]], template: function AlertDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, AlertDialogComponent_Conditional_5_Template, 4, 3, "div");
      \u0275\u0275conditionalCreate(6, AlertDialogComponent_Conditional_6_Template, 3, 1, "div");
      \u0275\u0275elementStart(7, "div")(8, "p");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, AlertDialogComponent_Conditional_10_Template, 5, 2, "div", 5);
      \u0275\u0275conditionalCreate(11, AlertDialogComponent_Conditional_11_Template, 4, 1, "div", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(7, _c0, ctx.data.type == "success" || ctx.data.type == "success_confirm", ctx.data.type == "error", ctx.data.type == "warning" || ctx.data.type == "message"));
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c1, ctx.data.type == "success" || ctx.data.type == "success_confirm", ctx.data.type != "success" && ctx.data.type != "success_confirm"));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.data.title ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.title ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.message);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type == "warning" || ctx.data.type == "success_confirm" ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type != "warning" && ctx.data.type != "success_confirm" ? 11 : -1);
    }
  }, dependencies: [CommonModule, NgClass], styles: ["\n\n.btn[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.container[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n}\n.dialog_main[_ngcontent-%COMP%] {\n  width: auto;\n  height: 240px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 24px;\n  height: 100%;\n  row-gap: 10px;\n}\n.header[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n}\n.header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #d5d7e3;\n  cursor: pointer;\n}\n.body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.icon_container[_ngcontent-%COMP%] {\n  height: 80px;\n  width: 80px;\n  border-radius: 50%;\n  display: flex;\n  margin-bottom: 20px;\n  justify-content: center;\n  align-items: center;\n}\n.icon_container[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  font-size: 40px;\n}\n.icon_success[_ngcontent-%COMP%] {\n  background: #c8e6c9;\n}\n.icon_success[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.icon_warning[_ngcontent-%COMP%] {\n  background: #fff59d;\n}\n.icon_warning[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  color: #f57f17;\n}\n.icon_error[_ngcontent-%COMP%] {\n  background: #ffcdd2;\n}\n.icon_error[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  color: #d32f2f;\n}\n.body[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2)    > span[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 28px;\n}\n.body[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(3) {\n  font-size: 14px;\n  line-height: 18px;\n  color: #656565;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  word-break: break-word;\n  overflow: auto;\n  max-height: 300px;\n}\n.footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: auto;\n  column-gap: 20px;\n  row-gap: 15px;\n}\n.footer[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n@media (max-width: 440px) {\n  .container[_ngcontent-%COMP%] {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n  }\n  button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    row-gap: 15px;\n  }\n}\n/*# sourceMappingURL=alert-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertDialogComponent, [{
    type: Component,
    args: [{ selector: "app-alert-dialog", standalone: true, imports: [CommonModule], template: `<div class="container">\r
  <div class="dialog_main">\r
    <div class="body">\r
      <div\r
        class="icon_container animate__animated animate__heartBeat"\r
        [ngClass]="{\r
          icon_success: data.type == 'success' || data.type == 'success_confirm',\r
          icon_error: data.type == 'error',\r
          icon_warning: data.type == 'warning' || data.type == 'message'\r
        }"\r
        >\r
        <i\r
          class="fi"\r
          [ngClass]="{\r
            'fi-sr-shield-check': data.type == 'success' || data.type == 'success_confirm',\r
            'fi-ss-shield-exclamation': data.type != 'success' && data.type != 'success_confirm'\r
          }"\r
        ></i>\r
      </div>\r
      @if (!data.title) {\r
        <div>\r
          @if (data.type == 'error') {\r
            <span>Error!</span>\r
          }\r
          @if (data.type == 'success' || data.type == 'success_confirm') {\r
            <span>Success!</span>\r
          }\r
          @if (data.type == 'warning' || data.type == 'message') {\r
            <span>Warning!</span>\r
          }\r
        </div>\r
      }\r
      @if (data.title) {\r
        <div>\r
          <span>{{ data.title }}</span>\r
        </div>\r
      }\r
      <div>\r
        <p>{{ data.message }}</p>\r
      </div>\r
    </div>\r
    @if (data.type == 'warning' || data.type == 'success_confirm') {\r
      <div class="footer">\r
        <button class="button-primary-outline" (click)="closeDialog(false)">\r
          <span>{{ data.text_cancel ? data.text_cancel : 'CLOSE' }}</span>\r
        </button>\r
        @if (data.type == 'warning' || data.type == 'success_confirm') {\r
          <button\r
            class="button-primary-solid"\r
            (click)="closeDialog(true)"\r
            >\r
            <span>{{ data.text_accept ? data.text_accept : 'ACCEPT' }}</span>\r
          </button>\r
        }\r
      </div>\r
    }\r
    @if (data.type != 'warning' && data.type != 'success_confirm') {\r
      <div class="footer">\r
        <button class="button-primary-solid" (click)="closeDialog(false)">\r
          <span>{{ data.text_cancel ? data.text_cancel : 'CLOSE' }}</span>\r
        </button>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/core/components/alert-dialog/alert-dialog.component.scss */\n.btn {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.container {\n  height: 100%;\n  border-radius: 3px;\n}\n.dialog_main {\n  width: auto;\n  height: 240px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 24px;\n  height: 100%;\n  row-gap: 10px;\n}\n.header {\n  height: 30px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n}\n.header > span {\n  color: #d5d7e3;\n  cursor: pointer;\n}\n.body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.icon_container {\n  height: 80px;\n  width: 80px;\n  border-radius: 50%;\n  display: flex;\n  margin-bottom: 20px;\n  justify-content: center;\n  align-items: center;\n}\n.icon_container > i {\n  font-size: 40px;\n}\n.icon_success {\n  background: #c8e6c9;\n}\n.icon_success > i {\n  color: #388e3c;\n}\n.icon_warning {\n  background: #fff59d;\n}\n.icon_warning > i {\n  color: #f57f17;\n}\n.icon_error {\n  background: #ffcdd2;\n}\n.icon_error > i {\n  color: #d32f2f;\n}\n.body > div:nth-child(2) > span {\n  display: flex;\n  width: 100%;\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 28px;\n}\n.body > div:nth-child(3) {\n  font-size: 14px;\n  line-height: 18px;\n  color: #656565;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  word-break: break-word;\n  overflow: auto;\n  max-height: 300px;\n}\n.footer {\n  display: flex;\n  justify-content: center;\n  margin-top: auto;\n  column-gap: 20px;\n  row-gap: 15px;\n}\n.footer > button {\n  width: 100%;\n}\n@media (max-width: 440px) {\n  .container {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n  }\n  button {\n    width: 100%;\n  }\n  .footer {\n    flex-direction: column;\n    row-gap: 15px;\n  }\n}\n/*# sourceMappingURL=alert-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AlertDialogComponent, { className: "AlertDialogComponent", filePath: "src/app/core/components/alert-dialog/alert-dialog.component.ts", lineNumber: 12 });
})();

// src/app/core/services/interceptor.service.ts
var InterceptorService = class _InterceptorService {
  router;
  auth_service;
  dialog;
  snackBar;
  route;
  constructor(router, auth_service, dialog, snackBar, route) {
    this.router = router;
    this.auth_service = auth_service;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.route = route;
  }
  intercept(req, next) {
    const token = window.localStorage.getItem(this.auth_service.name_token);
    console.log();
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
          // si tu API usa Bearer, usa: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(tap((event) => {
      if (event?.body?.errormessage === "Token Not Valid") {
        this.auth_service.logout();
      }
    }), catchError((error) => {
      if (error.status === 401) {
        this.auth_service.logout();
      }
      return throwError(() => error);
    }));
  }
  alertDialog(params) {
    return new Promise((resolve) => {
      this.dialog.open(AlertDialogComponent, {
        panelClass: "alert_dialog",
        data: params
      }).afterClosed().subscribe((res) => resolve(res));
    });
  }
  openSnackbar(options) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: options.duration ?? 3e3,
      verticalPosition: options.vertical_position ?? "top",
      horizontalPosition: options.horizontal_position ?? "right",
      data: {
        title: options.title,
        message: options.message,
        type: options.type
      }
    });
  }
  static \u0275fac = function InterceptorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InterceptorService)(\u0275\u0275inject(Router), \u0275\u0275inject(AuthService), \u0275\u0275inject(MatDialog), \u0275\u0275inject(MatSnackBar), \u0275\u0275inject(ActivatedRoute));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InterceptorService, factory: _InterceptorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterceptorService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Router }, { type: AuthService }, { type: MatDialog }, { type: MatSnackBar }, { type: ActivatedRoute }], null);
})();

export {
  AlertDialogComponent,
  InterceptorService
};
//# sourceMappingURL=chunk-K22JBEUE.js.map

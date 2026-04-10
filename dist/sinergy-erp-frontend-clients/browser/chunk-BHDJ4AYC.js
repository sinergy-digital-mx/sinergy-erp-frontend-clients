import {
  POSService
} from "./chunk-MGEJLMJK.js";
import {
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/features/pos/pages/pending-orders/pending-orders.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PendingOrdersComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11);
    \u0275\u0275domElement(1, "div", 13);
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3, "Cargando \xF3rdenes...");
    \u0275\u0275domElementEnd()();
  }
}
function PendingOrdersComponent_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 16);
    \u0275\u0275domElement(2, "path", 17)(3, "polyline", 18);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "No hay \xF3rdenes");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "Las \xF3rdenes creadas aparecer\xE1n aqu\xED");
    \u0275\u0275domElementEnd()();
  }
}
function PendingOrdersComponent_Conditional_16_For_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 25)(1, "span", 26);
    \u0275\u0275text(2, "Cliente:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span", 27);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const order_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(order_r2.customer.name);
  }
}
function PendingOrdersComponent_Conditional_16_For_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 25)(1, "span", 26);
    \u0275\u0275text(2, "Almac\xE9n:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span", 27);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const order_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(order_r2.warehouse.name);
  }
}
function PendingOrdersComponent_Conditional_16_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 19);
    \u0275\u0275domListener("click", function PendingOrdersComponent_Conditional_16_For_3_Template_div_click_0_listener() {
      const order_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewOrder(order_r2.id));
    });
    \u0275\u0275domElementStart(1, "div", 20)(2, "div", 21)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p", 22);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 23);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 24);
    \u0275\u0275conditionalCreate(10, PendingOrdersComponent_Conditional_16_For_3_Conditional_10_Template, 5, 1, "div", 25);
    \u0275\u0275conditionalCreate(11, PendingOrdersComponent_Conditional_16_For_3_Conditional_11_Template, 5, 1, "div", 25);
    \u0275\u0275domElementStart(12, "div", 25)(13, "span", 26);
    \u0275\u0275text(14, "Items:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "span", 27);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(17, "div", 28)(18, "div", 29)(19, "span");
    \u0275\u0275text(20, "Total:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "button", 30);
    \u0275\u0275text(24, " Ver Detalles ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(25, "svg", 31);
    \u0275\u0275domElement(26, "polyline", 32);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Orden #", order_r2.order_number || order_r2.id.substring(0, 8));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(order_r2.created_at));
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + (order_r2.status || "pending"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(order_r2.status || "pending"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(order_r2.customer ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(order_r2.warehouse ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", (order_r2 == null ? null : order_r2.items_count) || 0, " productos");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(order_r2.total || 0));
  }
}
function PendingOrdersComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12);
    \u0275\u0275conditionalCreate(1, PendingOrdersComponent_Conditional_16_Conditional_1_Template, 8, 0, "div", 14);
    \u0275\u0275repeaterCreate(2, PendingOrdersComponent_Conditional_16_For_3_Template, 27, 9, "div", 15, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.orders().length === 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.orders());
  }
}
var PendingOrdersComponent = class _PendingOrdersComponent {
  posService;
  router;
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  constructor(posService, router) {
    this.posService = posService;
    this.router = router;
  }
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading.set(true);
    this.posService.getOrders().subscribe({
      next: (response) => {
        const ordersArray = Array.isArray(response) ? response : response.data || [];
        console.log("Orders loaded:", ordersArray);
        console.log("First order items_count:", ordersArray[0]?.items_count);
        this.orders.set(ordersArray);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        this.loading.set(false);
      }
    });
  }
  viewOrder(orderId) {
    this.router.navigate(["/pos/payment"], { queryParams: { orderId } });
  }
  goBack() {
    this.router.navigate(["/pos"]);
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  formatDate(date) {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  getStatusLabel(status) {
    const statusMap = {
      "pending": "Pendiente",
      "completed": "Completada",
      "cancelled": "Cancelada",
      "in_progress": "En Proceso"
    };
    return statusMap[status] || status;
  }
  static \u0275fac = function PendingOrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PendingOrdersComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingOrdersComponent, selectors: [["app-pending-orders"]], decls: 17, vars: 2, consts: [[1, "pending-orders-container"], [1, "header"], [1, "btn-back", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "btn-refresh", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "23 4 23 10 17 10"], ["points", "1 20 1 14 7 14"], ["d", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"], [1, "loading-state"], [1, "orders-list"], [1, "spinner"], [1, "empty-state"], [1, "order-card"], ["xmlns", "http://www.w3.org/2000/svg", "width", "80", "height", "80", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], [1, "order-card", 3, "click"], [1, "order-header"], [1, "order-info"], [1, "order-date"], [1, "order-status"], [1, "order-details"], [1, "detail-row"], [1, "label"], [1, "value"], [1, "order-footer"], [1, "order-total"], [1, "btn-view"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "9 18 15 12 9 6"]], template: function PendingOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275domListener("click", function PendingOrdersComponent_Template_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 3);
      \u0275\u0275domElement(4, "line", 4)(5, "polyline", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(6, " Volver ");
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(7, "h1");
      \u0275\u0275text(8, "\xD3rdenes POS");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "button", 6);
      \u0275\u0275domListener("click", function PendingOrdersComponent_Template_button_click_9_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(10, "svg", 7);
      \u0275\u0275domElement(11, "polyline", 8)(12, "polyline", 9)(13, "path", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(14, " Actualizar ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(15, PendingOrdersComponent_Conditional_15_Template, 4, 0, "div", 11);
      \u0275\u0275conditionalCreate(16, PendingOrdersComponent_Conditional_16_Template, 4, 1, "div", 12);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.loading() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 16 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.pending-orders-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #f5f5f5;\n  padding: 2rem;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  background: white;\n  padding: 1.5rem;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.btn-back[_ngcontent-%COMP%], \n.btn-refresh[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.25rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  background: white;\n  color: #6b7280;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover, \n.btn-refresh[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-back[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.btn-refresh[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem;\n  background: white;\n  border-radius: 12px;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.orders-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem;\n  background: white;\n  border-radius: 12px;\n  text-align: center;\n}\n.empty-state[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #d1d5db;\n  margin-bottom: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin: 0;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-header[_ngcontent-%COMP%]   .order-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.25rem 0;\n}\n.order-header[_ngcontent-%COMP%]   .order-info[_ngcontent-%COMP%]   .order-date[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  margin: 0;\n}\n.order-header[_ngcontent-%COMP%]   .order-status[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.order-header[_ngcontent-%COMP%]   .order-status.status-pending[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.order-header[_ngcontent-%COMP%]   .order-status.status-completed[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.order-header[_ngcontent-%COMP%]   .order-status.status-cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.order-header[_ngcontent-%COMP%]   .order-status.status-in_progress[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.order-details[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.order-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.order-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-weight: 500;\n}\n.order-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-weight: 600;\n}\n.order-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.order-footer[_ngcontent-%COMP%]   .order-total[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.order-footer[_ngcontent-%COMP%]   .order-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-footer[_ngcontent-%COMP%]   .order-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #667eea;\n}\n.order-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.order-footer[_ngcontent-%COMP%]   .btn-view[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .pending-orders-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    order: -1;\n  }\n  .header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%], \n   .header[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .orders-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pending-orders.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PendingOrdersComponent, [{
    type: Component,
    args: [{ selector: "app-pending-orders", standalone: true, imports: [CommonModule], template: `<div class="pending-orders-container">\r
  <!-- Header -->\r
  <div class="header">\r
    <button class="btn-back" (click)="goBack()">\r
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <line x1="19" y1="12" x2="5" y2="12"></line>\r
        <polyline points="12 19 5 12 12 5"></polyline>\r
      </svg>\r
      Volver\r
    </button>\r
    <h1>\xD3rdenes POS</h1>\r
    <button class="btn-refresh" (click)="loadOrders()">\r
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <polyline points="23 4 23 10 17 10"></polyline>\r
        <polyline points="1 20 1 14 7 14"></polyline>\r
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>\r
      </svg>\r
      Actualizar\r
    </button>\r
  </div>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="loading-state">\r
      <div class="spinner"></div>\r
      <p>Cargando \xF3rdenes...</p>\r
    </div>\r
  }\r
\r
  <!-- Orders List -->\r
  @if (!loading()) {\r
    <div class="orders-list">\r
      @if (orders().length === 0) {\r
        <div class="empty-state">\r
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>\r
            <polyline points="14 2 14 8 20 8"></polyline>\r
          </svg>\r
          <h3>No hay \xF3rdenes</h3>\r
          <p>Las \xF3rdenes creadas aparecer\xE1n aqu\xED</p>\r
        </div>\r
      }\r
\r
      @for (order of orders(); track order.id) {\r
        <div class="order-card" (click)="viewOrder(order.id)">\r
          <div class="order-header">\r
            <div class="order-info">\r
              <h3>Orden #{{ order.order_number || order.id.substring(0, 8) }}</h3>\r
              <p class="order-date">{{ formatDate(order.created_at) }}</p>\r
            </div>\r
            <div class="order-status" [class]="'status-' + (order.status || 'pending')">\r
              {{ getStatusLabel(order.status || 'pending') }}\r
            </div>\r
          </div>\r
\r
          <div class="order-details">\r
            @if (order.customer) {\r
              <div class="detail-row">\r
                <span class="label">Cliente:</span>\r
                <span class="value">{{ order.customer.name }}</span>\r
              </div>\r
            }\r
            \r
            @if (order.warehouse) {\r
              <div class="detail-row">\r
                <span class="label">Almac\xE9n:</span>\r
                <span class="value">{{ order.warehouse.name }}</span>\r
              </div>\r
            }\r
\r
            <div class="detail-row">\r
              <span class="label">Items:</span>\r
              <span class="value">{{ order?.items_count || 0 }} productos</span>\r
            </div>\r
          </div>\r
\r
          <div class="order-footer">\r
            <div class="order-total">\r
              <span>Total:</span>\r
              <strong>{{ formatCurrency(order.total || 0) }}</strong>\r
            </div>\r
            <button class="btn-view">\r
              Ver Detalles\r
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="9 18 15 12 9 6"></polyline>\r
              </svg>\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/pos/pages/pending-orders/pending-orders.component.scss */\n.pending-orders-container {\n  min-height: 100vh;\n  background: #f5f5f5;\n  padding: 2rem;\n}\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  background: white;\n  padding: 1.5rem;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.header h1 {\n  flex: 1;\n  text-align: center;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.btn-back,\n.btn-refresh {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.25rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  background: white;\n  color: #6b7280;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back:hover,\n.btn-refresh:hover {\n  background: #f9fafb;\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-back svg,\n.btn-refresh svg {\n  flex-shrink: 0;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem;\n  background: white;\n  border-radius: 12px;\n}\n.loading-state .spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state p {\n  color: #6b7280;\n  font-size: 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.orders-list {\n  display: grid;\n  gap: 1.5rem;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n}\n.empty-state {\n  grid-column: 1/-1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem;\n  background: white;\n  border-radius: 12px;\n  text-align: center;\n}\n.empty-state svg {\n  color: #d1d5db;\n  margin-bottom: 1.5rem;\n}\n.empty-state h3 {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.empty-state p {\n  color: #6b7280;\n  margin: 0;\n}\n.order-card {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);\n}\n.order-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-header .order-info h3 {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.25rem 0;\n}\n.order-header .order-info .order-date {\n  font-size: 0.875rem;\n  color: #6b7280;\n  margin: 0;\n}\n.order-header .order-status {\n  padding: 0.375rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.order-header .order-status.status-pending {\n  background: #fef3c7;\n  color: #92400e;\n}\n.order-header .order-status.status-completed {\n  background: #d1fae5;\n  color: #065f46;\n}\n.order-header .order-status.status-cancelled {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.order-header .order-status.status-in_progress {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.order-details {\n  margin-bottom: 1rem;\n}\n.order-details .detail-row {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.order-details .detail-row .label {\n  color: #6b7280;\n  font-weight: 500;\n}\n.order-details .detail-row .value {\n  color: #1f2937;\n  font-weight: 600;\n}\n.order-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.order-footer .order-total {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.order-footer .order-total span {\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-footer .order-total strong {\n  font-size: 1.25rem;\n  color: #667eea;\n}\n.order-footer .btn-view {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-footer .btn-view:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.order-footer .btn-view svg {\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .pending-orders-container {\n    padding: 1rem;\n  }\n  .header {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .header h1 {\n    order: -1;\n  }\n  .header .btn-back,\n  .header .btn-refresh {\n    width: 100%;\n    justify-content: center;\n  }\n  .orders-list {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pending-orders.component.css.map */\n"] }]
  }], () => [{ type: POSService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingOrdersComponent, { className: "PendingOrdersComponent", filePath: "src/app/features/pos/pages/pending-orders/pending-orders.component.ts", lineNumber: 13 });
})();
export {
  PendingOrdersComponent
};
//# sourceMappingURL=chunk-BHDJ4AYC.js.map

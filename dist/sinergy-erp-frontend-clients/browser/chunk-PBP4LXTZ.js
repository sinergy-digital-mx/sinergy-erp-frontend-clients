import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-ADUVL4TN.js";
import {
  UserService
} from "./chunk-NHTCDOXE.js";
import {
  MAT_FORM_FIELD,
  MAT_OPTGROUP,
  MAT_OPTION_PARENT_COMPONENT,
  MatOption,
  MatOptionModule,
  MatOptionSelectionChange,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition
} from "./chunk-SWPKLNPW.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  InterceptorService
} from "./chunk-K22JBEUE.js";
import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import {
  DollarSign,
  Download,
  FileCheck,
  FileText,
  FileX,
  Image,
  LucideAngularComponent,
  LucideAngularModule,
  Mail,
  Plus,
  RotateCcw,
  SquarePen,
  Trash2,
  Upload,
  X
} from "./chunk-XYBC4MWB.js";
import {
  A11yModule,
  ActiveDescendantKeyManager,
  AriaDescriber,
  BidiModule,
  BreakpointObserver,
  Breakpoints,
  CdkScrollableModule,
  ComponentPortal,
  DOWN_ARROW,
  Directionality,
  ENTER,
  ESCAPE,
  FocusMonitor,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MediaMatcher,
  OverlayConfig,
  OverlayModule,
  Platform,
  ScrollDispatcher,
  TAB,
  TemplatePortal,
  UP_ARROW,
  ViewportRuler,
  _IdGenerator,
  _animationsDisabled,
  _getEventTarget,
  _getFocusedElementPierceShadowDom,
  addAriaReferencedId,
  coerceArray,
  coerceBooleanProperty,
  coerceNumberProperty,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  hasModifierKey,
  removeAriaReferencedId
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TXPVZZCM.js";
import {
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
  TitleCasePipe
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  Pipe,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadValues,
  afterNextRender,
  booleanAttribute,
  debounceTime,
  defer,
  delay,
  distinctUntilChanged,
  filter,
  forwardRef,
  inject,
  map,
  merge,
  of,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs
var _c0 = ["tooltip"];
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: () => ({
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  })
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = {
  passive: true
};
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _ariaDescriber = inject(AriaDescriber);
  _focusMonitor = inject(FocusMonitor);
  _dir = inject(Directionality);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _mediaMatcher = inject(MediaMatcher);
  _document = inject(DOCUMENT);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaultOptions = inject(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef = null;
  _tooltipInstance = null;
  _overlayPanelClass;
  _portal;
  _position = "below";
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = "mat-mdc";
  _ariaDescriptionPending = false;
  _dirSubscribed = false;
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = coerceBooleanProperty(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  _showDelay;
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  touchGestures = "auto";
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = "";
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  _eventCleanups = [];
  _touchstartTimeout = null;
  _destroyed = new Subject();
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._eventCleanups.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  show(delay2 = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay2);
  }
  hide(delay2 = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay2);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors).withPopoverLocation("global");
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = createOverlayRef(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
        event.preventDefault();
        event.stopPropagation();
        this._ngZone.run(() => this.hide(0));
      }
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      afterNextRender(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass instanceof Set ? Array.from(tooltipClass) : tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._eventCleanups.length) {
      return;
    }
    if (!this._isTouchPlatform()) {
      this._addListener("mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._addListener("touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(void 0, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      });
    }
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    if (!this._isTouchPlatform()) {
      this._addListener("mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      });
      this._addListener("wheel", (event) => {
        if (this._isTooltipVisible()) {
          const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
          const element = this._elementRef.nativeElement;
          if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
            this.hide();
          }
        }
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      this._addListener("touchend", touchendListener);
      this._addListener("touchcancel", touchendListener);
    }
  }
  _addListener(name, listener) {
    this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement, name, listener, passiveListenerOptions));
  }
  _isTouchPlatform() {
    if (this._platform.IOS || this._platform.ANDROID) {
      return true;
    } else if (!this._platform.isBrowser) {
      return false;
    }
    return !!this._defaultOptions?.detectHoverCapability && this._mediaMatcher.matchMedia("(any-hover: none)").matches;
  }
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style.userSelect = style.msUserSelect = style.webkitUserSelect = style.MozUserSelect = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style.webkitUserDrag = "none";
      }
      style.touchAction = "none";
      style.webkitTapHighlightColor = "transparent";
    }
  }
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, "tooltip");
    if (!this._isDestroyed) {
      afterNextRender({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  static \u0275fac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltip)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      }
    }]
  }], () => [], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _isMultiline = false;
  message;
  tooltipClass;
  _showTimeoutId;
  _hideTimeoutId;
  _triggerElement;
  _mouseLeaveHideDelay;
  _animationsDisabled = _animationsDisabled();
  _tooltip;
  _closeOnInteraction = false;
  _isVisible = false;
  _onHide = new Subject();
  _showAnimation = "mat-mdc-tooltip-show";
  _hideAnimation = "mat-mdc-tooltip-hide";
  constructor() {
  }
  show(delay2) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay2);
  }
  hide(delay2) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay2);
  }
  afterHidden() {
    return this._onHide;
  }
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static \u0275fac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _TooltipComponent,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function TooltipComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
    },
    decls: 4,
    vars: 5,
    consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
    template: function TooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275domElementStart(0, "div", 1, 0);
        \u0275\u0275domListener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleAnimationEnd($event));
        });
        \u0275\u0275domElementStart(2, "div", 2);
        \u0275\u0275text(3);
        \u0275\u0275domElementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.tooltipClass);
        \u0275\u0275classProp("mdc-tooltip--multiline", ctx._isMultiline);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.message);
      }
    },
    styles: ['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      template: '<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [class]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',
      styles: ['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n']
    }]
  }], () => [], {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        static: true
      }]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/tooltip.mjs
var MatTooltipModule = class _MatTooltipModule {
  static \u0275fac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [A11yModule, OverlayModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
    }]
  }], null, null);
})();

// src/app/features/contracts/services/contract.service.ts
var ContractService = class _ContractService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getContracts(params) {
    return this.http.get(`${this.api}/tenant/contracts`, { params });
  }
  getContract(id) {
    return this.http.get(`${this.api}/tenant/contracts/${id}`);
  }
  getContractByNumber(contractNumber) {
    return this.http.get(`${this.api}/tenant/contracts/by-number/${contractNumber}`);
  }
  getContractStats() {
    return this.http.get(`${this.api}/tenant/contracts/stats`);
  }
  createContract(data) {
    return this.http.post(`${this.api}/tenant/contracts`, data);
  }
  updateContract(id, data) {
    return this.http.put(`${this.api}/tenant/contracts/${id}`, data);
  }
  deleteContract(id) {
    return this.http.delete(`${this.api}/tenant/contracts/${id}`);
  }
  exportToExcel() {
    return this.http.get(`${this.api}/tenant/contracts/export/excel`, {
      responseType: "blob"
    });
  }
  getContractStatement(id) {
    return this.http.get(`${this.api}/tenant/contracts/${id}/pdf`, {
      responseType: "blob"
    });
  }
  static \u0275fac = function ContractService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ContractService, factory: _ContractService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// node_modules/@angular/material/fesm2022/autocomplete.mjs
var _c02 = ["panel"];
var _c1 = ["*"];
function MatAutocomplete_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1, 0);
    \u0275\u0275projection(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const formFieldId_r1 = ctx.id;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1._classList);
    \u0275\u0275classProp("mat-mdc-autocomplete-visible", ctx_r1.showPanel)("mat-mdc-autocomplete-hidden", !ctx_r1.showPanel)("mat-autocomplete-panel-animations-enabled", !ctx_r1._animationsDisabled)("mat-primary", ctx_r1._color === "primary")("mat-accent", ctx_r1._color === "accent")("mat-warn", ctx_r1._color === "warn");
    \u0275\u0275domProperty("id", ctx_r1.id);
    \u0275\u0275attribute("aria-label", ctx_r1.ariaLabel || null)("aria-labelledby", ctx_r1._getPanelAriaLabelledby(formFieldId_r1));
  }
}
var MatAutocompleteSelectedEvent = class {
  source;
  option;
  constructor(source, option) {
    this.source = source;
    this.option = option;
  }
};
var MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken("mat-autocomplete-default-options", {
  providedIn: "root",
  factory: () => ({
    autoActiveFirstOption: false,
    autoSelectActiveOption: false,
    hideSingleSelectionIndicator: false,
    requireSelection: false,
    hasBackdrop: false
  })
});
var MatAutocomplete = class _MatAutocomplete {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS);
  _animationsDisabled = _animationsDisabled();
  _activeOptionChanges = Subscription.EMPTY;
  _keyManager;
  showPanel = false;
  get isOpen() {
    return this._isOpen && this.showPanel;
  }
  _isOpen = false;
  _latestOpeningTrigger;
  _setColor(value) {
    this._color = value;
    this._changeDetectorRef.markForCheck();
  }
  _color;
  template;
  panel;
  options;
  optionGroups;
  ariaLabel;
  ariaLabelledby;
  displayWith = null;
  autoActiveFirstOption;
  autoSelectActiveOption;
  requireSelection;
  panelWidth;
  disableRipple = false;
  optionSelected = new EventEmitter();
  opened = new EventEmitter();
  closed = new EventEmitter();
  optionActivated = new EventEmitter();
  set classList(value) {
    this._classList = value;
    this._elementRef.nativeElement.className = "";
  }
  _classList;
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._syncParentProperties();
  }
  _hideSingleSelectionIndicator;
  _syncParentProperties() {
    if (this.options) {
      for (const option of this.options) {
        option._changeDetectorRef.markForCheck();
      }
    }
  }
  id = inject(_IdGenerator).getId("mat-autocomplete-");
  inertGroups;
  constructor() {
    const platform = inject(Platform);
    this.inertGroups = platform?.SAFARI || false;
    this.autoActiveFirstOption = !!this._defaults.autoActiveFirstOption;
    this.autoSelectActiveOption = !!this._defaults.autoSelectActiveOption;
    this.requireSelection = !!this._defaults.requireSelection;
    this._hideSingleSelectionIndicator = this._defaults.hideSingleSelectionIndicator ?? false;
  }
  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap().skipPredicate(this._skipPredicate);
    this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
      if (this.isOpen) {
        this.optionActivated.emit({
          source: this,
          option: this.options.toArray()[index] || null
        });
      }
    });
    this._setVisibility();
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._activeOptionChanges.unsubscribe();
  }
  _setScrollTop(scrollTop) {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }
  _getScrollTop() {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }
  _setVisibility() {
    this.showPanel = !!this.options?.length;
    this._changeDetectorRef.markForCheck();
  }
  _emitSelectEvent(option) {
    const event = new MatAutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }
  _getPanelAriaLabelledby(labelId) {
    if (this.ariaLabel) {
      return null;
    }
    const labelExpression = labelId ? labelId + " " : "";
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }
  _skipPredicate() {
    return false;
  }
  static \u0275fac = function MatAutocomplete_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocomplete)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatAutocomplete,
    selectors: [["mat-autocomplete"]],
    contentQueries: function MatAutocomplete_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatOption, 5)(dirIndex, MAT_OPTGROUP, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.options = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.optionGroups = _t);
      }
    },
    viewQuery: function MatAutocomplete_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7)(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-autocomplete"],
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      displayWith: "displayWith",
      autoActiveFirstOption: [2, "autoActiveFirstOption", "autoActiveFirstOption", booleanAttribute],
      autoSelectActiveOption: [2, "autoSelectActiveOption", "autoSelectActiveOption", booleanAttribute],
      requireSelection: [2, "requireSelection", "requireSelection", booleanAttribute],
      panelWidth: "panelWidth",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      classList: [0, "class", "classList"],
      hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute]
    },
    outputs: {
      optionSelected: "optionSelected",
      opened: "opened",
      closed: "closed",
      optionActivated: "optionActivated"
    },
    exportAs: ["matAutocomplete"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_OPTION_PARENT_COMPONENT,
      useExisting: _MatAutocomplete
    }])],
    ngContentSelectors: _c1,
    decls: 1,
    vars: 0,
    consts: [["panel", ""], ["role", "listbox", 1, "mat-mdc-autocomplete-panel", "mdc-menu-surface", "mdc-menu-surface--open", 3, "id"]],
    template: function MatAutocomplete_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, MatAutocomplete_ng_template_0_Template, 3, 17, "ng-template");
      }
    },
    styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,.cdk-overlay-pane:has(>.mat-mdc-autocomplete-hidden){visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocomplete, [{
    type: Component,
    args: [{
      selector: "mat-autocomplete",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: "matAutocomplete",
      host: {
        "class": "mat-mdc-autocomplete"
      },
      providers: [{
        provide: MAT_OPTION_PARENT_COMPONENT,
        useExisting: MatAutocomplete
      }],
      template: `<ng-template let-formFieldId="id">
  <div
    class="mat-mdc-autocomplete-panel mdc-menu-surface mdc-menu-surface--open"
    role="listbox"
    [id]="id"
    [class]="_classList"
    [class.mat-mdc-autocomplete-visible]="showPanel"
    [class.mat-mdc-autocomplete-hidden]="!showPanel"
    [class.mat-autocomplete-panel-animations-enabled]="!_animationsDisabled"
    [class.mat-primary]="_color === 'primary'"
    [class.mat-accent]="_color === 'accent'"
    [class.mat-warn]="_color === 'warn'"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="_getPanelAriaLabelledby(formFieldId)"
    #panel>
    <ng-content></ng-content>
  </div>
</ng-template>
`,
      styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,.cdk-overlay-pane:has(>.mat-mdc-autocomplete-hidden){visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"]
    }]
  }], () => [], {
    template: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    panel: [{
      type: ViewChild,
      args: ["panel"]
    }],
    options: [{
      type: ContentChildren,
      args: [MatOption, {
        descendants: true
      }]
    }],
    optionGroups: [{
      type: ContentChildren,
      args: [MAT_OPTGROUP, {
        descendants: true
      }]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    displayWith: [{
      type: Input
    }],
    autoActiveFirstOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoSelectActiveOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    requireSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelWidth: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optionSelected: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    optionActivated: [{
      type: Output
    }],
    classList: [{
      type: Input,
      args: ["class"]
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteOrigin = class _MatAutocompleteOrigin {
  elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function MatAutocompleteOrigin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteOrigin)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteOrigin,
    selectors: [["", "matAutocompleteOrigin", ""]],
    exportAs: ["matAutocompleteOrigin"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteOrigin, [{
    type: Directive,
    args: [{
      selector: "[matAutocompleteOrigin]",
      exportAs: "matAutocompleteOrigin"
    }]
  }], () => [], null);
})();
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatAutocompleteTrigger),
  multi: true
};
function getMatAutocompleteMissingPanelError() {
  return Error("Attempting to open an undefined instance of `mat-autocomplete`. Make sure that the id passed to the `matAutocomplete` is correct and that you're attempting to open it after the ngAfterContentInit hook.");
}
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken("mat-autocomplete-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
var MatAutocompleteTrigger = class _MatAutocompleteTrigger {
  _environmentInjector = inject(EnvironmentInjector);
  _element = inject(ElementRef);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _zone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _formField = inject(MAT_FORM_FIELD, {
    optional: true,
    host: true
  });
  _viewportRuler = inject(ViewportRuler);
  _scrollStrategy = inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef = null;
  _portal;
  _componentDestroyed = false;
  _initialized = new Subject();
  _keydownSubscription;
  _outsideClickSubscription;
  _cleanupWindowBlur;
  _previousValue = null;
  _valueOnAttach = null;
  _valueOnLastKeydown = null;
  _positionStrategy;
  _manuallyFloatingLabel = false;
  _closingActionsSubscription;
  _viewportSubscription = Subscription.EMPTY;
  _breakpointObserver = inject(BreakpointObserver);
  _handsetLandscapeSubscription = Subscription.EMPTY;
  _canOpenOnNextFocus = true;
  _valueBeforeAutoSelection;
  _pendingAutoselectedOption = null;
  _closeKeyEventStream = new Subject();
  _overlayPanelClass = coerceArray(this._defaults?.overlayPanelClass || []);
  _windowBlurHandler = () => {
    this._canOpenOnNextFocus = this.panelOpen || !this._hasFocus();
  };
  _onChange = () => {
  };
  _onTouched = () => {
  };
  autocomplete;
  position = "auto";
  connectedTo;
  autocompleteAttribute = "off";
  autocompleteDisabled = false;
  constructor() {
  }
  _aboveClass = "mat-mdc-autocomplete-panel-above";
  ngAfterViewInit() {
    this._initialized.next();
    this._initialized.complete();
    this._cleanupWindowBlur = this._renderer.listen("window", "blur", this._windowBlurHandler);
  }
  ngOnChanges(changes) {
    if (changes["position"] && this._positionStrategy) {
      this._setStrategyPositions(this._positionStrategy);
      if (this.panelOpen) {
        this._overlayRef.updatePosition();
      }
    }
  }
  ngOnDestroy() {
    this._cleanupWindowBlur?.();
    this._handsetLandscapeSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
    this._componentDestroyed = true;
    this._destroyPanel();
    this._closeKeyEventStream.complete();
    this._clearFromModal();
  }
  get panelOpen() {
    return this._overlayAttached && this.autocomplete.showPanel;
  }
  _overlayAttached = false;
  openPanel() {
    this._openPanelInternal();
  }
  closePanel() {
    this._resetLabel();
    if (!this._overlayAttached) {
      return;
    }
    if (this.panelOpen) {
      this._zone.run(() => {
        this.autocomplete.closed.emit();
      });
    }
    if (this.autocomplete._latestOpeningTrigger === this) {
      this.autocomplete._isOpen = false;
      this.autocomplete._latestOpeningTrigger = null;
    }
    this._overlayAttached = false;
    this._pendingAutoselectedOption = null;
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
      this._closingActionsSubscription.unsubscribe();
    }
    this._updatePanelState();
    if (!this._componentDestroyed) {
      this._changeDetectorRef.detectChanges();
    }
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", this.autocomplete.id);
    }
  }
  updatePosition() {
    if (this._overlayAttached) {
      this._overlayRef.updatePosition();
    }
  }
  get panelClosingActions() {
    return merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)), this._closeKeyEventStream, this._getOutsideClickStream(), this._overlayRef ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) : of()).pipe(map((event) => event instanceof MatOptionSelectionChange ? event : null));
  }
  optionSelections = defer(() => {
    const options = this.autocomplete ? this.autocomplete.options : null;
    if (options) {
      return options.changes.pipe(startWith(options), switchMap(() => merge(...options.map((option) => option.onSelectionChange))));
    }
    return this._initialized.pipe(switchMap(() => this.optionSelections));
  });
  get activeOption() {
    if (this.autocomplete && this.autocomplete._keyManager) {
      return this.autocomplete._keyManager.activeItem;
    }
    return null;
  }
  _getOutsideClickStream() {
    return new Observable((observer) => {
      const listener = (event) => {
        const clickTarget = _getEventTarget(event);
        const formField = this._formField ? this._formField.getConnectedOverlayOrigin().nativeElement : null;
        const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
        if (this._overlayAttached && clickTarget !== this._element.nativeElement && !this._hasFocus() && (!formField || !formField.contains(clickTarget)) && (!customOrigin || !customOrigin.contains(clickTarget)) && !!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget)) {
          observer.next(event);
        }
      };
      const cleanups = [this._renderer.listen("document", "click", listener), this._renderer.listen("document", "auxclick", listener), this._renderer.listen("document", "touchend", listener)];
      return () => {
        cleanups.forEach((current) => current());
      };
    });
  }
  writeValue(value) {
    Promise.resolve(null).then(() => this._assignOptionValue(value));
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._element.nativeElement.disabled = isDisabled;
  }
  _handleKeydown(e) {
    const event = e;
    const keyCode = event.keyCode;
    const hasModifier = hasModifierKey(event);
    if (keyCode === ESCAPE && !hasModifier) {
      event.preventDefault();
    }
    this._valueOnLastKeydown = this._element.nativeElement.value;
    if (this.activeOption && keyCode === ENTER && this.panelOpen && !hasModifier) {
      this.activeOption._selectViaInteraction();
      this._resetActiveItem();
      event.preventDefault();
    } else if (this.autocomplete) {
      const prevActiveItem = this.autocomplete._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
      if (keyCode === TAB || isArrowKey && !hasModifier && this.panelOpen) {
        this.autocomplete._keyManager.onKeydown(event);
      } else if (isArrowKey && this._canOpen()) {
        this._openPanelInternal(this._valueOnLastKeydown);
      }
      if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
        this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
        if (this.autocomplete.autoSelectActiveOption && this.activeOption) {
          if (!this._pendingAutoselectedOption) {
            this._valueBeforeAutoSelection = this._valueOnLastKeydown;
          }
          this._pendingAutoselectedOption = this.activeOption;
          this._assignOptionValue(this.activeOption.value);
        }
      }
    }
  }
  _handleInput(event) {
    let target = event.target;
    let value = target.value;
    if (target.type === "number") {
      value = value == "" ? null : parseFloat(value);
    }
    if (this._previousValue !== value) {
      this._previousValue = value;
      this._pendingAutoselectedOption = null;
      if (!this.autocomplete || !this.autocomplete.requireSelection) {
        this._onChange(value);
      }
      if (!value) {
        this._clearPreviousSelectedOption(null, false);
      } else if (this.panelOpen && !this.autocomplete.requireSelection) {
        const selectedOption = this.autocomplete.options?.find((option) => option.selected);
        if (selectedOption) {
          const display = this._getDisplayValue(selectedOption.value);
          if (value !== display) {
            selectedOption.deselect(false);
          }
        }
      }
      if (this._canOpen() && this._hasFocus()) {
        const valueOnAttach = this._valueOnLastKeydown ?? this._element.nativeElement.value;
        this._valueOnLastKeydown = null;
        this._openPanelInternal(valueOnAttach);
      }
    }
  }
  _handleFocus() {
    if (!this._canOpenOnNextFocus) {
      this._canOpenOnNextFocus = true;
    } else if (this._canOpen()) {
      this._previousValue = this._element.nativeElement.value;
      this._attachOverlay(this._previousValue);
      this._floatLabel(true);
    }
  }
  _handleClick() {
    if (this._canOpen() && !this.panelOpen) {
      this._openPanelInternal();
    }
  }
  _hasFocus() {
    return _getFocusedElementPierceShadowDom() === this._element.nativeElement;
  }
  _floatLabel(shouldAnimate = false) {
    if (this._formField && this._formField.floatLabel === "auto") {
      if (shouldAnimate) {
        this._formField._animateAndLockLabel();
      } else {
        this._formField.floatLabel = "always";
      }
      this._manuallyFloatingLabel = true;
    }
  }
  _resetLabel() {
    if (this._manuallyFloatingLabel) {
      if (this._formField) {
        this._formField.floatLabel = "auto";
      }
      this._manuallyFloatingLabel = false;
    }
  }
  _subscribeToClosingActions() {
    const initialRender = new Observable((subscriber) => {
      afterNextRender(() => {
        subscriber.next();
      }, {
        injector: this._environmentInjector
      });
    });
    const optionChanges = this.autocomplete.options?.changes.pipe(tap(() => this._positionStrategy.reapplyLastPosition()), delay(0)) ?? of();
    return merge(initialRender, optionChanges).pipe(switchMap(() => this._zone.run(() => {
      const wasOpen = this.panelOpen;
      this._resetActiveItem();
      this._updatePanelState();
      this._changeDetectorRef.detectChanges();
      if (this.panelOpen) {
        this._overlayRef.updatePosition();
      }
      if (wasOpen !== this.panelOpen) {
        if (this.panelOpen) {
          this._emitOpened();
        } else {
          this.autocomplete.closed.emit();
        }
      }
      return this.panelClosingActions;
    })), take(1)).subscribe((event) => this._setValueAndClose(event));
  }
  _emitOpened() {
    this.autocomplete.opened.emit();
  }
  _destroyPanel() {
    if (this._overlayRef) {
      this.closePanel();
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }
  _getDisplayValue(value) {
    const autocomplete = this.autocomplete;
    return autocomplete && autocomplete.displayWith ? autocomplete.displayWith(value) : value;
  }
  _assignOptionValue(value) {
    const toDisplay = this._getDisplayValue(value);
    if (value == null) {
      this._clearPreviousSelectedOption(null, false);
    }
    this._updateNativeInputValue(toDisplay != null ? toDisplay : "");
  }
  _updateNativeInputValue(value) {
    if (this._formField) {
      this._formField._control.value = value;
    } else {
      this._element.nativeElement.value = value;
    }
    this._previousValue = value;
  }
  _setValueAndClose(event) {
    const panel = this.autocomplete;
    const toSelect = event ? event.source : this._pendingAutoselectedOption;
    if (toSelect) {
      this._clearPreviousSelectedOption(toSelect);
      this._assignOptionValue(toSelect.value);
      this._onChange(toSelect.value);
      panel._emitSelectEvent(toSelect);
      this._element.nativeElement.focus();
    } else if (panel.requireSelection && this._element.nativeElement.value !== this._valueOnAttach) {
      this._clearPreviousSelectedOption(null);
      this._assignOptionValue(null);
      this._onChange(null);
    }
    this.closePanel();
  }
  _clearPreviousSelectedOption(skip, emitEvent) {
    this.autocomplete?.options?.forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect(emitEvent);
      }
    });
  }
  _openPanelInternal(valueOnAttach = this._element.nativeElement.value) {
    this._attachOverlay(valueOnAttach);
    this._floatLabel();
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      addAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
  }
  _attachOverlay(valueOnAttach) {
    if (!this.autocomplete) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        throw getMatAutocompleteMissingPanelError();
      } else {
        return;
      }
    }
    let overlayRef = this._overlayRef;
    if (!overlayRef) {
      this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef, {
        id: this._formField?.getLabelId()
      });
      overlayRef = createOverlayRef(this._injector, this._getOverlayConfig());
      this._overlayRef = overlayRef;
      this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
        if (this.panelOpen && overlayRef) {
          overlayRef.updateSize({
            width: this._getPanelWidth()
          });
        }
      });
      this._handsetLandscapeSubscription = this._breakpointObserver.observe(Breakpoints.HandsetLandscape).subscribe((result) => {
        const isHandsetLandscape = result.matches;
        if (isHandsetLandscape) {
          this._positionStrategy.withFlexibleDimensions(true).withGrowAfterOpen(true).withViewportMargin(8);
        } else {
          this._positionStrategy.withFlexibleDimensions(false).withGrowAfterOpen(false).withViewportMargin(0);
        }
      });
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      overlayRef.updateSize({
        width: this._getPanelWidth()
      });
    }
    if (overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(this._portal);
      this._valueOnAttach = valueOnAttach;
      this._valueOnLastKeydown = null;
      this._closingActionsSubscription = this._subscribeToClosingActions();
    }
    const wasOpen = this.panelOpen;
    this.autocomplete._isOpen = this._overlayAttached = true;
    this.autocomplete._latestOpeningTrigger = this;
    this.autocomplete._setColor(this._formField?.color);
    this._updatePanelState();
    this._applyModalPanelOwnership();
    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this._emitOpened();
    }
  }
  _handlePanelKeydown = (event) => {
    if (event.keyCode === ESCAPE && !hasModifierKey(event) || event.keyCode === UP_ARROW && hasModifierKey(event, "altKey")) {
      if (this._pendingAutoselectedOption) {
        this._updateNativeInputValue(this._valueBeforeAutoSelection ?? "");
        this._pendingAutoselectedOption = null;
      }
      this._closeKeyEventStream.next();
      this._resetActiveItem();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  _updatePanelState() {
    this.autocomplete._setVisibility();
    if (this.panelOpen) {
      const overlayRef = this._overlayRef;
      if (!this._keydownSubscription) {
        this._keydownSubscription = overlayRef.keydownEvents().subscribe(this._handlePanelKeydown);
      }
      if (!this._outsideClickSubscription) {
        this._outsideClickSubscription = overlayRef.outsidePointerEvents().subscribe();
      }
    } else {
      this._keydownSubscription?.unsubscribe();
      this._outsideClickSubscription?.unsubscribe();
      this._keydownSubscription = this._outsideClickSubscription = void 0;
    }
  }
  _getOverlayConfig() {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this._scrollStrategy(),
      width: this._getPanelWidth(),
      direction: this._dir ?? void 0,
      hasBackdrop: this._defaults?.hasBackdrop,
      backdropClass: this._defaults?.backdropClass || "cdk-overlay-transparent-backdrop",
      panelClass: this._overlayPanelClass,
      disableAnimations: this._animationsDisabled
    });
  }
  _getOverlayPosition() {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getConnectedElement()).withFlexibleDimensions(false).withPush(false).withPopoverLocation("inline");
    this._setStrategyPositions(strategy);
    this._positionStrategy = strategy;
    return strategy;
  }
  _setStrategyPositions(positionStrategy) {
    const belowPositions = [{
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }];
    const panelClass = this._aboveClass;
    const abovePositions = [{
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom",
      panelClass
    }, {
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom",
      panelClass
    }];
    let positions;
    if (this.position === "above") {
      positions = abovePositions;
    } else if (this.position === "below") {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }
    positionStrategy.withPositions(positions);
  }
  _getConnectedElement() {
    if (this.connectedTo) {
      return this.connectedTo.elementRef;
    }
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
  }
  _getPanelWidth() {
    return this.autocomplete.panelWidth || this._getHostWidth();
  }
  _getHostWidth() {
    return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
  }
  _resetActiveItem() {
    const autocomplete = this.autocomplete;
    if (autocomplete.autoActiveFirstOption) {
      let firstEnabledOptionIndex = -1;
      for (let index = 0; index < autocomplete.options.length; index++) {
        const option = autocomplete.options.get(index);
        if (!option.disabled) {
          firstEnabledOptionIndex = index;
          break;
        }
      }
      autocomplete._keyManager.setActiveItem(firstEnabledOptionIndex);
    } else {
      autocomplete._keyManager.setActiveItem(-1);
    }
  }
  _canOpen() {
    const element = this._element.nativeElement;
    return !element.readOnly && !element.disabled && !this.autocompleteDisabled;
  }
  _scrollToOption(index) {
    const autocomplete = this.autocomplete;
    const labelCount = _countGroupLabelsBeforeOption(index, autocomplete.options, autocomplete.optionGroups);
    if (index === 0 && labelCount === 1) {
      autocomplete._setScrollTop(0);
    } else if (autocomplete.panel) {
      const option = autocomplete.options.toArray()[index];
      if (option) {
        const element = option._getHostElement();
        const newScrollPosition = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, autocomplete._getScrollTop(), autocomplete.panel.nativeElement.offsetHeight);
        autocomplete._setScrollTop(newScrollPosition);
      }
    }
  }
  _trackedModal = null;
  _applyModalPanelOwnership() {
    const modal = this._element.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');
    if (!modal) {
      return;
    }
    const panelId = this.autocomplete.id;
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
    addAriaReferencedId(modal, "aria-owns", panelId);
    this._trackedModal = modal;
  }
  _clearFromModal() {
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
      this._trackedModal = null;
    }
  }
  static \u0275fac = function MatAutocompleteTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteTrigger,
    selectors: [["input", "matAutocomplete", ""], ["textarea", "matAutocomplete", ""]],
    hostAttrs: [1, "mat-mdc-autocomplete-trigger"],
    hostVars: 7,
    hostBindings: function MatAutocompleteTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focusin", function MatAutocompleteTrigger_focusin_HostBindingHandler() {
          return ctx._handleFocus();
        })("blur", function MatAutocompleteTrigger_blur_HostBindingHandler() {
          return ctx._onTouched();
        })("input", function MatAutocompleteTrigger_input_HostBindingHandler($event) {
          return ctx._handleInput($event);
        })("keydown", function MatAutocompleteTrigger_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        })("click", function MatAutocompleteTrigger_click_HostBindingHandler() {
          return ctx._handleClick();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("autocomplete", ctx.autocompleteAttribute)("role", ctx.autocompleteDisabled ? null : "combobox")("aria-autocomplete", ctx.autocompleteDisabled ? null : "list")("aria-activedescendant", ctx.panelOpen && ctx.activeOption ? ctx.activeOption.id : null)("aria-expanded", ctx.autocompleteDisabled ? null : ctx.panelOpen.toString())("aria-controls", ctx.autocompleteDisabled || !ctx.panelOpen ? null : ctx.autocomplete == null ? null : ctx.autocomplete.id)("aria-haspopup", ctx.autocompleteDisabled ? null : "listbox");
      }
    },
    inputs: {
      autocomplete: [0, "matAutocomplete", "autocomplete"],
      position: [0, "matAutocompletePosition", "position"],
      connectedTo: [0, "matAutocompleteConnectedTo", "connectedTo"],
      autocompleteAttribute: [0, "autocomplete", "autocompleteAttribute"],
      autocompleteDisabled: [2, "matAutocompleteDisabled", "autocompleteDisabled", booleanAttribute]
    },
    exportAs: ["matAutocompleteTrigger"],
    features: [\u0275\u0275ProvidersFeature([MAT_AUTOCOMPLETE_VALUE_ACCESSOR]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteTrigger, [{
    type: Directive,
    args: [{
      selector: `input[matAutocomplete], textarea[matAutocomplete]`,
      host: {
        "class": "mat-mdc-autocomplete-trigger",
        "[attr.autocomplete]": "autocompleteAttribute",
        "[attr.role]": 'autocompleteDisabled ? null : "combobox"',
        "[attr.aria-autocomplete]": 'autocompleteDisabled ? null : "list"',
        "[attr.aria-activedescendant]": "(panelOpen && activeOption) ? activeOption.id : null",
        "[attr.aria-expanded]": "autocompleteDisabled ? null : panelOpen.toString()",
        "[attr.aria-controls]": "(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id",
        "[attr.aria-haspopup]": 'autocompleteDisabled ? null : "listbox"',
        "(focusin)": "_handleFocus()",
        "(blur)": "_onTouched()",
        "(input)": "_handleInput($event)",
        "(keydown)": "_handleKeydown($event)",
        "(click)": "_handleClick()"
      },
      exportAs: "matAutocompleteTrigger",
      providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
    }]
  }], () => [], {
    autocomplete: [{
      type: Input,
      args: ["matAutocomplete"]
    }],
    position: [{
      type: Input,
      args: ["matAutocompletePosition"]
    }],
    connectedTo: [{
      type: Input,
      args: ["matAutocompleteConnectedTo"]
    }],
    autocompleteAttribute: [{
      type: Input,
      args: ["autocomplete"]
    }],
    autocompleteDisabled: [{
      type: Input,
      args: [{
        alias: "matAutocompleteDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteModule = class _MatAutocompleteModule {
  static \u0275fac = function MatAutocompleteModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatAutocompleteModule,
    imports: [OverlayModule, MatOptionModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
    exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, BidiModule, MatAutocompleteTrigger, MatAutocompleteOrigin]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [OverlayModule, MatOptionModule, CdkScrollableModule, MatOptionModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, MatOptionModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
      exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, BidiModule, MatAutocompleteTrigger, MatAutocompleteOrigin]
    }]
  }], null, null);
})();

// src/app/features/contracts/services/contract-document.service.ts
var ContractDocumentService = class _ContractDocumentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getContractDocuments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/documents`);
  }
  uploadDocument(contractId, formData) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/documents`, formData);
  }
  updateDocumentStatus(contractId, documentId, data) {
    return this.http.patch(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}/status`, data);
  }
  deleteDocument(contractId, documentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}`);
  }
  static \u0275fac = function ContractDocumentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ContractDocumentService, factory: _ContractDocumentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.ts
function ContractDocumentUploadModalComponent_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u2713 ", ctx_r0.selectedFile.name, " (", ctx_r0.formatFileSize(ctx_r0.selectedFile.size), ") ");
  }
}
var ContractDocumentUploadModalComponent = class _ContractDocumentUploadModalComponent {
  data;
  dialogRef;
  documentService;
  interceptorService;
  uploading = signal(false, ...ngDevMode ? [{ debugName: "uploading" }] : []);
  selectedFile = null;
  notes = "";
  Upload = Upload;
  X = X;
  constructor(data, dialogRef, documentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.documentService = documentService;
    this.interceptorService = interceptorService;
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
    if (!this.selectedFile) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Selecciona un archivo"
      });
      return;
    }
    this.uploading.set(true);
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    if (this.notes) {
      formData.append("notes", this.notes);
    }
    this.documentService.uploadDocument(this.data.contractId, formData).subscribe({
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
  static \u0275fac = function ContractDocumentUploadModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentUploadModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ContractDocumentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDocumentUploadModalComponent, selectors: [["app-contract-document-upload-modal"]], decls: 24, vars: 7, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content"], [1, "form-grid"], [1, "form-field", "full-width"], [1, "field-label"], [1, "file-input-wrapper"], ["type", "file", "accept", ".jpg,.jpeg,.png,.pdf,.doc,.docx", "id", "fileInput", 1, "field-input", "file-input", 3, "change"], ["class", "file-info", 4, "ngIf"], ["placeholder", "Notas adicionales...", "rows", "3", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "help-text"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Subir Documento", "custom_class", "btn_primary", 3, "clicked", "loading", "disabled", "icon"], [1, "file-info"]], template: function ContractDocumentUploadModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Subir Documento del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function ContractDocumentUploadModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "label", 8);
      \u0275\u0275text(10, "Archivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9)(12, "input", 10);
      \u0275\u0275listener("change", function ContractDocumentUploadModalComponent_Template_input_change_12_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, ContractDocumentUploadModalComponent_p_13_Template, 2, 2, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 7)(15, "label", 8);
      \u0275\u0275text(16, "Notas (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "textarea", 12);
      \u0275\u0275twoWayListener("ngModelChange", function ContractDocumentUploadModalComponent_Template_textarea_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event);
        return $event;
      });
      \u0275\u0275text(18, "        ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "p", 13);
      \u0275\u0275text(20, " Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 14)(22, "app-button", 15);
      \u0275\u0275listener("clicked", function ContractDocumentUploadModalComponent_Template_app_button_clicked_22_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-button", 16);
      \u0275\u0275listener("clicked", function ContractDocumentUploadModalComponent_Template_app_button_clicked_23_listener() {
        return ctx.uploadDocument();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.selectedFile);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.notes);
      \u0275\u0275advance(6);
      \u0275\u0275property("loading", ctx.uploading())("disabled", !ctx.selectedFile)("icon", ctx.Upload);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.field-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n  background-color: #ffffff;\n  cursor: pointer;\n}\n.field-input[_ngcontent-%COMP%]:hover {\n  border-color: #9ca3af;\n  background-color: #f9fafb;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  background-color: #ffffff;\n}\n.field-input[_ngcontent-%COMP%]:disabled {\n  background-color: #f9fafb;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\ninput[type=file].field-input[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n}\ninput[type=file].field-input[_ngcontent-%COMP%]::file-selector-button {\n  padding: 0.375rem 0.75rem;\n  margin-right: 0.75rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\ninput[type=file].field-input[_ngcontent-%COMP%]::file-selector-button:hover {\n  background-color: #4f46e5;\n}\ntextarea.field-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.file-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #059669;\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.file-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.help-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=contract-document-upload-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentUploadModalComponent, [{
    type: Component,
    args: [{ selector: "app-contract-document-upload-modal", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      ButtonComponent,
      LucideAngularModule
    ], template: '<div class="dialog-container">\r\n  <div class="dialog-header">\r\n    <h2 class="dialog-title">Subir Documento del Contrato</h2>\r\n    <button (click)="close()" class="close-button">\r\n      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <div class="dialog-content">\r\n    <div class="form-grid">\r\n      <div class="form-field full-width">\r\n        <label class="field-label">Archivo</label>\r\n        <div class="file-input-wrapper">\r\n          <input \r\n            type="file"\r\n            (change)="onFileSelected($event)"\r\n            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"\r\n            class="field-input file-input"\r\n            id="fileInput">\r\n        </div>\r\n        <p *ngIf="selectedFile" class="file-info">\r\n          \u2713 {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})\r\n        </p>\r\n      </div>\r\n\r\n      <div class="form-field full-width">\r\n        <label class="field-label">Notas (Opcional)</label>\r\n        <textarea \r\n          [(ngModel)]="notes"\r\n          placeholder="Notas adicionales..."\r\n          rows="3"\r\n          class="field-input">\r\n        </textarea>\r\n      </div>\r\n    </div>\r\n\r\n    <p class="help-text">\r\n      Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB)\r\n    </p>\r\n  </div>\r\n\r\n  <div class="dialog-footer">\r\n    <app-button\r\n      text="Cancelar"\r\n      custom_class="btn_secondary"\r\n      (clicked)="close()">\r\n    </app-button>\r\n    <app-button\r\n      text="Subir Documento"\r\n      custom_class="btn_primary"\r\n      [loading]="uploading()"\r\n      [disabled]="!selectedFile"\r\n      [icon]="Upload"\r\n      (clicked)="uploadDocument()">\r\n    </app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field.full-width {\n  grid-column: 1/-1;\n}\n.field-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.field-input {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n  background-color: #ffffff;\n  cursor: pointer;\n}\n.field-input:hover {\n  border-color: #9ca3af;\n  background-color: #f9fafb;\n}\n.field-input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  background-color: #ffffff;\n}\n.field-input:disabled {\n  background-color: #f9fafb;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\ninput[type=file].field-input {\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n}\ninput[type=file].field-input::file-selector-button {\n  padding: 0.375rem 0.75rem;\n  margin-right: 0.75rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\ninput[type=file].field-input::file-selector-button:hover {\n  background-color: #4f46e5;\n}\ntextarea.field-input {\n  resize: vertical;\n  font-family: inherit;\n}\n.file-info {\n  font-size: 0.75rem;\n  color: #059669;\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.file-input-wrapper {\n  position: relative;\n}\n.help-text {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=contract-document-upload-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: ContractDocumentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDocumentUploadModalComponent, { className: "ContractDocumentUploadModalComponent", filePath: "src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.ts", lineNumber: 23 });
})();

// src/app/features/contracts/components/contract-documents/contract-documents.component.ts
function ContractDocumentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p", 8);
    \u0275\u0275text(2, "Cargando documentos...");
    \u0275\u0275elementEnd()();
  }
}
function ContractDocumentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 10);
    \u0275\u0275text(2, "No hay documentos subidos");
    \u0275\u0275elementEnd()();
  }
}
function ContractDocumentsComponent_div_7_div_1_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r2.notes);
  }
}
function ContractDocumentsComponent_div_7_div_1_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 28);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_div_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "approved"));
    });
    \u0275\u0275element(2, "lucide-icon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 29);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_div_19_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "rejected"));
    });
    \u0275\u0275element(4, "lucide-icon", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileCheck)("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileX)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_div_1_a_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 30);
    \u0275\u0275element(1, "lucide-icon", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", doc_r2.download_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r3.Download)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_div_1_Template(rf, ctx) {
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
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, ContractDocumentsComponent_div_7_div_1_p_17_Template, 2, 1, "p", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 21);
    \u0275\u0275template(19, ContractDocumentsComponent_div_7_div_1_div_19_Template, 5, 4, "div", 22)(20, ContractDocumentsComponent_div_7_div_1_a_20_Template, 2, 3, "a", 23);
    \u0275\u0275elementStart(21, "button", 24);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_Template_button_click_21_listener() {
      const doc_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteDocument(doc_r2));
    });
    \u0275\u0275element(22, "lucide-icon", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.getFileIcon(doc_r2.mime_type))("size", 20);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r2.file_name);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(doc_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(doc_r2.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatFileSize(doc_r2.file_size));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 13, doc_r2.created_at, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r2.download_url);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.Trash2)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, ContractDocumentsComponent_div_7_div_1_Template, 23, 16, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.documents());
  }
}
var ContractDocumentsComponent = class _ContractDocumentsComponent {
  documentService;
  interceptorService;
  dialog;
  contractId;
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
    this.documentService.getContractDocuments(this.contractId).subscribe({
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
    const dialogRef = this.dialog.open(ContractDocumentUploadModalComponent, {
      data: { contractId: this.contractId }
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
    this.documentService.deleteDocument(this.contractId, doc.id).subscribe({
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
    this.documentService.updateDocumentStatus(this.contractId, doc.id, { status }).subscribe({
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
  static \u0275fac = function ContractDocumentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentsComponent)(\u0275\u0275directiveInject(ContractDocumentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDocumentsComponent, selectors: [["app-contract-documents"]], inputs: { contractId: "contractId" }, decls: 8, vars: 4, consts: [[1, "documents-section"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-base", "font-semibold", "text-gray-800"], ["text", "Subir Documento", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "icon"], ["class", "text-center py-6", 4, "ngIf"], ["class", "text-center py-6 text-gray-500", 4, "ngIf"], ["class", "space-y-2", 4, "ngIf"], [1, "text-center", "py-6"], [1, "text-sm", "text-gray-500"], [1, "text-center", "py-6", "text-gray-500"], [1, "text-sm"], [1, "space-y-2"], ["class", "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-between", "p-3", "border", "border-gray-200", "rounded-lg", "hover:bg-gray-50", "transition-colors"], [1, "flex", "items-center", "gap-3", "flex-1", "min-w-0"], [1, "text-gray-400", "flex-shrink-0", 3, "img", "size"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "flex", "items-center", "gap-2", "text-xs", "text-gray-500"], ["class", "text-xs text-gray-600 mt-1 truncate", 4, "ngIf"], [1, "flex", "items-center", "gap-1", "flex-shrink-0"], ["class", "flex gap-1", 4, "ngIf"], ["target", "_blank", "class", "p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors", "title", "Descargar", 3, "href", 4, "ngIf"], ["title", "Eliminar", 1, "p-1.5", "text-red-600", "hover:bg-red-50", "rounded", "transition-colors", 3, "click"], [3, "img", "size"], [1, "text-xs", "text-gray-600", "mt-1", "truncate"], [1, "flex", "gap-1"], ["title", "Aprobar", 1, "p-1.5", "text-green-600", "hover:bg-green-50", "rounded", "transition-colors", 3, "click"], ["title", "Rechazar", 1, "p-1.5", "text-red-600", "hover:bg-red-50", "rounded", "transition-colors", 3, "click"], ["target", "_blank", "title", "Descargar", 1, "p-1.5", "text-indigo-600", "hover:bg-indigo-50", "rounded", "transition-colors", 3, "href"]], template: function ContractDocumentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4", 2);
      \u0275\u0275text(3, "Documentos del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-button", 3);
      \u0275\u0275listener("clicked", function ContractDocumentsComponent_Template_app_button_clicked_4_listener() {
        return ctx.openUploadModal();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(5, ContractDocumentsComponent_div_5_Template, 3, 0, "div", 4)(6, ContractDocumentsComponent_div_6_Template, 3, 0, "div", 5)(7, ContractDocumentsComponent_div_7_Template, 2, 1, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("icon", ctx.Plus);
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
  ], styles: ["\n\n.documents-section[_ngcontent-%COMP%] {\n  margin-top: 0;\n  padding-top: 0;\n  border-top: none;\n}\n/*# sourceMappingURL=contract-documents.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-documents", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      LucideAngularModule
    ], template: `<div class="documents-section">\r
  <div class="flex items-center justify-between mb-4">\r
    <h4 class="text-base font-semibold text-gray-800">Documentos del Contrato</h4>\r
    <app-button\r
      text="Subir Documento"\r
      custom_class="btn_primary"\r
      size="sm"\r
      [icon]="Plus"\r
      (clicked)="openUploadModal()">\r
    </app-button>\r
  </div>\r
\r
  <!-- Loading State -->\r
  <div *ngIf="loading()" class="text-center py-6">\r
    <p class="text-sm text-gray-500">Cargando documentos...</p>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading() && documents().length === 0" class="text-center py-6 text-gray-500">\r
    <p class="text-sm">No hay documentos subidos</p>\r
  </div>\r
\r
  <!-- Documents List -->\r
  <div *ngIf="!loading() && documents().length > 0" class="space-y-2">\r
    <div *ngFor="let doc of documents()" \r
         class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">\r
      \r
      <div class="flex items-center gap-3 flex-1 min-w-0">\r
        <lucide-icon \r
          [img]="getFileIcon(doc.mime_type)"\r
          class="text-gray-400 flex-shrink-0"\r
          [size]="20">\r
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
          <div class="flex items-center gap-2 text-xs text-gray-500">\r
            <span>{{ formatFileSize(doc.file_size) }}</span>\r
            <span>\u2022</span>\r
            <span>{{ doc.created_at | date:'mediumDate' }}</span>\r
          </div>\r
\r
          <p *ngIf="doc.notes" class="text-xs text-gray-600 mt-1 truncate">{{ doc.notes }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-center gap-1 flex-shrink-0">\r
        <!-- Status Actions -->\r
        <div *ngIf="doc.status === 'pending'" class="flex gap-1">\r
          <button\r
            (click)="updateStatus(doc, 'approved')"\r
            class="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"\r
            title="Aprobar">\r
            <lucide-icon [img]="FileCheck" [size]="16"></lucide-icon>\r
          </button>\r
          <button\r
            (click)="updateStatus(doc, 'rejected')"\r
            class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"\r
            title="Rechazar">\r
            <lucide-icon [img]="FileX" [size]="16"></lucide-icon>\r
          </button>\r
        </div>\r
\r
        <!-- Download -->\r
        <a \r
          *ngIf="doc.download_url"\r
          [href]="doc.download_url"\r
          target="_blank"\r
          class="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"\r
          title="Descargar">\r
          <lucide-icon [img]="Download" [size]="16"></lucide-icon>\r
        </a>\r
\r
        <!-- Delete -->\r
        <button\r
          (click)="deleteDocument(doc)"\r
          class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"\r
          title="Eliminar">\r
          <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-documents/contract-documents.component.scss */\n.documents-section {\n  margin-top: 0;\n  padding-top: 0;\n  border-top: none;\n}\n/*# sourceMappingURL=contract-documents.component.css.map */\n"] }]
  }], () => [{ type: ContractDocumentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDocumentsComponent, { className: "ContractDocumentsComponent", filePath: "src/app/features/contracts/components/contract-documents/contract-documents.component.ts", lineNumber: 22 });
})();

// src/app/features/contracts/services/payment.service.ts
var PaymentService = class _PaymentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  generatePayments(contractId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/generate`, {});
  }
  getPayments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments`);
  }
  getPaymentStats(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/stats`);
  }
  getPayment(contractId, paymentId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }
  updatePayment(contractId, paymentId, data) {
    return this.http.put(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`, data);
  }
  markAsPaid(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }
  cancelPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/cancel`, {});
  }
  deletePayment(contractId, paymentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }
  registerPartialPayment(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }
  resetPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/reset`, {});
  }
  uploadDocument(contractId, paymentId, file, document_type, notes) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", document_type);
    if (notes) {
      formData.append("notes", notes);
    }
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`, formData);
  }
  getDocuments(contractId, paymentId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`);
  }
  getDocumentUrl(contractId, paymentId, documentId, expiresIn = 3600) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}/url?expiresIn=${expiresIn}`);
  }
  deleteDocument(contractId, paymentId, documentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}`);
  }
  static \u0275fac = function PaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.ts
function PartialPaymentModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" El monto no puede exceder ", \u0275\u0275pipeBind2(2, 1, ctx_r0.amountPending, ctx_r0.data.currency), " ");
  }
}
function PartialPaymentModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-green-600", ctx_r0.isFullPayment)("text-blue-600", !ctx_r0.isFullPayment);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.paymentTypeMessage, " ");
  }
}
var PartialPaymentModalComponent = class _PartialPaymentModalComponent {
  data;
  dialogRef;
  fb;
  paymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, paymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.paymentService = paymentService;
    this.interceptorService = interceptorService;
    const today = this.getLocalDateString(/* @__PURE__ */ new Date());
    this.form = this.fb.group({
      amount: ["", [Validators.required, Validators.min(0.01), this.maxAmountValidator.bind(this)]],
      payment_date: [today, Validators.required],
      payment_method: ["", Validators.required],
      reference_number: [""],
      notes: [""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
    this.form.get("amount")?.setValue(this.data.payment.amount_pending);
  }
  getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  maxAmountValidator(control) {
    if (!control.value)
      return null;
    const amount = parseFloat(control.value);
    if (amount > this.data.payment.amount_pending) {
      return { maxAmount: { max: this.data.payment.amount_pending, actual: amount } };
    }
    return null;
  }
  get amountPending() {
    return this.data.payment.amount_pending;
  }
  get isFullPayment() {
    const amount = parseFloat(this.form.get("amount")?.value || 0);
    const pending = this.amountPending;
    return Math.abs(amount - pending) < 0.01;
  }
  get paymentTypeMessage() {
    if (this.isFullPayment) {
      return "Se marcar\xE1 como pagado completo";
    }
    return "Se registrar\xE1 como pago parcial";
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos correctamente"
      });
      return;
    }
    this.saving.set(true);
    this.paymentService.registerPartialPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago registrado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al registrar el pago"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function PartialPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartialPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartialPaymentModalComponent, selectors: [["app-partial-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 35, vars: 15, consts: [[1, "modal-container"], [1, "modal-header"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "font-semibold", "text-orange-600"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], ["label", "Monto a Pagar", "type", "number", "placeholder", "Ingresa el monto", 3, "form_control"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["class", "text-xs mt-1", 3, "text-green-600", "text-blue-600", 4, "ngIf"], ["label", "Fecha de Pago", "type", "date", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar Pago", "custom_class", "btn_primary", 3, "clicked", "loading"], [1, "text-xs", "text-red-600", "mt-1"], [1, "text-xs", "mt-1"]], template: function PartialPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Registrar Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementStart(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "currency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function PartialPaymentModalComponent_Template_button_click_10_listener() {
        return ctx.close();
      });
      \u0275\u0275element(11, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "form", 8)(14, "div");
      \u0275\u0275element(15, "app-input", 9);
      \u0275\u0275template(16, PartialPaymentModalComponent_p_16_Template, 3, 4, "p", 10)(17, PartialPaymentModalComponent_p_17_Template, 2, 5, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div");
      \u0275\u0275element(19, "app-input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div")(21, "label", 13);
      \u0275\u0275text(22, " M\xE9todo de Pago ");
      \u0275\u0275elementStart(23, "span", 14);
      \u0275\u0275text(24, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(25, "app-select", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div");
      \u0275\u0275element(27, "app-input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 13);
      \u0275\u0275text(30, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "textarea", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 18)(33, "app-button", 19);
      \u0275\u0275listener("clicked", function PartialPaymentModalComponent_Template_app_button_clicked_33_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "app-button", 20);
      \u0275\u0275listener("clicked", function PartialPaymentModalComponent_Template_app_button_clicked_34_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" Pago #", ctx.data.payment.payment_number, " - Monto pendiente: ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 12, ctx.amountPending, ctx.data.currency));
      \u0275\u0275advance(3);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("amount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.hasError("maxAmount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.hasError("maxAmount")) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.value));
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("payment_date"));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("reference_number"));
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CurrencyPipe
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button[_ngcontent-%COMP%] {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartialPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-partial-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule
    ], providers: [DatePipe], template: `<div class="modal-container">\r
  <!-- Header -->\r
  <div class="modal-header">\r
    <div>\r
      <h2 class="text-xl font-semibold text-gray-800">Registrar Pago</h2>\r
      <p class="text-sm text-gray-600 mt-1">\r
        Pago #{{ data.payment.payment_number }} - Monto pendiente: \r
        <span class="font-semibold text-orange-600">{{ amountPending | currency:data.currency }}</span>\r
      </p>\r
    </div>\r
    <button (click)="close()" class="close-button" type="button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <!-- Body -->\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <!-- Amount -->\r
      <div>\r
        <app-input\r
          label="Monto a Pagar"\r
          type="number"\r
          placeholder="Ingresa el monto"\r
          [form_control]="form.get('amount')">\r
        </app-input>\r
        <p *ngIf="form.get('amount')?.hasError('maxAmount')" class="text-xs text-red-600 mt-1">\r
          El monto no puede exceder {{ amountPending | currency:data.currency }}\r
        </p>\r
        <p *ngIf="!form.get('amount')?.hasError('maxAmount') && form.get('amount')?.value" class="text-xs mt-1" [class.text-green-600]="isFullPayment" [class.text-blue-600]="!isFullPayment">\r
          {{ paymentTypeMessage }}\r
        </p>\r
      </div>\r
\r
      <!-- Payment Date -->\r
      <div>\r
        <app-input\r
          label="Fecha de Pago"\r
          type="date"\r
          [form_control]="form.get('payment_date')">\r
        </app-input>\r
      </div>\r
\r
      <!-- Payment Method -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago <span class="text-red-500">*</span>\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <!-- Reference Number -->\r
      <div>\r
        <app-input\r
          label="N\xFAmero de Referencia"\r
          type="text"\r
          placeholder="Ej: REF123456"\r
          [form_control]="form.get('reference_number')">\r
        </app-input>\r
      </div>\r
\r
      <!-- Notes -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago..."></textarea>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <!-- Footer -->\r
  <div class="modal-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      text="Registrar Pago"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.scss */\n.modal-container {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: PaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartialPaymentModalComponent, { className: "PartialPaymentModalComponent", filePath: "src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.ts", lineNumber: 29 });
})();

// src/app/core/pipes/local-date.pipe.ts
var LocalDatePipe = class _LocalDatePipe {
  datePipe;
  constructor(datePipe) {
    this.datePipe = datePipe;
  }
  transform(value, format = "mediumDate") {
    if (!value)
      return null;
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);
      return this.datePipe.transform(localDate, format);
    }
    return this.datePipe.transform(value, format);
  }
  static \u0275fac = function LocalDatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalDatePipe)(\u0275\u0275directiveInject(DatePipe, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "localDate", type: _LocalDatePipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalDatePipe, [{
    type: Pipe,
    args: [{
      name: "localDate",
      standalone: true
    }]
  }], () => [{ type: DatePipe }], null);
})();

// src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.ts
var EditPaymentModalComponent = class _EditPaymentModalComponent {
  data;
  dialogRef;
  fb;
  paymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, paymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.paymentService = paymentService;
    this.interceptorService = interceptorService;
    const isPaid = this.data.payment.status === "pagado";
    this.form = this.fb.group({
      amount_paid: [this.data.payment.amount_paid || this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      due_date: [this.data.payment.due_date, Validators.required],
      paid_date: [this.data.payment.paid_date || "", isPaid ? Validators.required : []],
      payment_method: [this.data.payment.payment_method || "", isPaid ? Validators.required : []],
      reference_number: [this.data.payment.reference_number || ""],
      notes: [this.data.payment.notes || ""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    this.paymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago actualizado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al actualizar el pago"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function EditPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EditPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditPaymentModalComponent, selectors: [["app-edit-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 33, vars: 17, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content", 3, "formGroup"], [1, "mb-3", "p-2", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "text-blue-900"], [1, "font-semibold"], [1, "space-y-4"], ["label", "Monto Pagado", "type", "number", 3, "form_control"], ["label", "Fecha de Vencimiento", "type", "date", 3, "form_control"], ["type", "date", 3, "label", "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function EditPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function EditPaymentModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "p", 7)(9, "span", 8);
      \u0275\u0275text(10, "Estado:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7)(13, "span", 8);
      \u0275\u0275text(14, "Vencimiento Original:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "localDate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275element(18, "app-input", 10)(19, "app-input", 11)(20, "app-input", 12);
      \u0275\u0275elementStart(21, "div")(22, "label", 13);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "app-select", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-input", 15);
      \u0275\u0275elementStart(26, "div")(27, "label", 13);
      \u0275\u0275text(28, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "textarea", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 17)(31, "app-button", 18);
      \u0275\u0275listener("clicked", function EditPaymentModalComponent_Template_app_button_clicked_31_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "app-button", 19);
      \u0275\u0275listener("clicked", function EditPaymentModalComponent_Template_app_button_clicked_32_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Editar Pago #", ctx.data.payment.payment_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.data.payment.status, " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(16, 14, ctx.data.payment.due_date, "mediumDate"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("form_control", ctx.form.controls["amount_paid"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["due_date"]);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Fecha de Pago" + (ctx.data.payment.status === "pagado" ? " *" : ""))("form_control", ctx.form.controls["paid_date"]);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" M\xE9todo de Pago ", ctx.data.payment.status === "pagado" ? "*" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["reference_number"]);
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    LocalDatePipe
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-edit-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2 class="dialog-title">Editar Pago #{{ data.payment.payment_number }}</h2>\r
    <button (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content" [formGroup]="form">\r
    <div class="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">\r
      <p class="text-sm text-blue-900">\r
        <span class="font-semibold">Estado:</span> {{ data.payment.status }}\r
      </p>\r
      <p class="text-sm text-blue-900">\r
        <span class="font-semibold">Vencimiento Original:</span> {{ data.payment.due_date | localDate:'mediumDate' }}\r
      </p>\r
    </div>\r
\r
    <div class="space-y-4">\r
      <app-input\r
        label="Monto Pagado"\r
        type="number"\r
        [form_control]="form.controls['amount_paid']">\r
      </app-input>\r
\r
      <app-input\r
        label="Fecha de Vencimiento"\r
        type="date"\r
        [form_control]="form.controls['due_date']">\r
      </app-input>\r
\r
      <!-- Payment Date -->\r
      <app-input\r
        [label]="'Fecha de Pago' + (data.payment.status === 'pagado' ? ' *' : '')"\r
        type="date"\r
        [form_control]="form.controls['paid_date']">\r
      </app-input>\r
\r
      <!-- Payment Method -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago {{ data.payment.status === 'pagado' ? '*' : '' }}\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <!-- Reference Number -->\r
      <app-input\r
        label="N\xFAmero de Referencia"\r
        type="text"\r
        placeholder="Ej: REF123456"\r
        [form_control]="form.controls['reference_number']">\r
      </app-input>\r
\r
      <!-- Notes -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago..."></textarea>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      text="Guardar Cambios"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.scss */\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: PaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditPaymentModalComponent, { className: "EditPaymentModalComponent", filePath: "src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/contracts/components/contract-payments/contract-payments.component.ts
function ContractPaymentsComponent_app_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 8);
    \u0275\u0275listener("clicked", function ContractPaymentsComponent_app_button_3_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generatePayments());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", ctx_r1.Plus)("loading", ctx_r1.generating());
  }
}
function ContractPaymentsComponent_div_4_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "p", 50);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 51);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("+ Parcial: ", \u0275\u0275pipeBind2(3, 2, ctx_r1.stats().paid_amount_partial, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(6, 5, ctx_r1.stats().total_paid_from_payments || 0, ctx_r1.currency));
  }
}
function ContractPaymentsComponent_div_4_div_43_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "!");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_4_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 52)(2, "p", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ContractPaymentsComponent_div_4_div_43_span_4_Template, 2, 0, "span", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 50);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 55);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Pago #", ctx_r1.stats().partial_payment.installment_number);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment.is_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Abonado: ", \u0275\u0275pipeBind2(7, 4, ctx_r1.stats().partial_payment.amount_paid || 0, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Faltante: ", \u0275\u0275pipeBind2(10, 7, ctx_r1.stats().partial_payment.remaining_amount, ctx_r1.currency));
  }
}
function ContractPaymentsComponent_div_4_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.stats().partial_overdue_count, " vencidos");
  }
}
function ContractPaymentsComponent_div_4_p_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + 1 pago con saldo de ", \u0275\u0275pipeBind2(2, 1, ctx_r1.stats().partial_payment.remaining_amount, ctx_r1.currency), " ");
  }
}
function ContractPaymentsComponent_div_4_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.stats().pending_overdue_count, " vencidos");
  }
}
function ContractPaymentsComponent_div_4_div_77_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.stats().pending_overdue_count, " pendientes");
  }
}
function ContractPaymentsComponent_div_4_div_77_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.stats().partial_overdue_count, " parciales");
  }
}
function ContractPaymentsComponent_div_4_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275template(1, ContractPaymentsComponent_div_4_div_77_p_1_Template, 2, 1, "p", 61)(2, ContractPaymentsComponent_div_4_div_77_p_2_Template, 2, 1, "p", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().pending_overdue_count > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_overdue_count > 0);
  }
}
function ContractPaymentsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "p", 12);
    \u0275\u0275text(4, "Total Pagos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 13)(6, "span", 14);
    \u0275\u0275text(7, "#");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "p", 15);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 16);
    \u0275\u0275text(11, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 17);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 18)(16, "div", 11)(17, "p", 19);
    \u0275\u0275text(18, "Pagados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 20)(20, "span", 21);
    \u0275\u0275text(21, "\u2713");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "p", 22);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 23);
    \u0275\u0275text(25, "completos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 24)(27, "p", 25);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 19);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, ContractPaymentsComponent_div_4_div_33_Template, 7, 8, "div", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 27)(35, "div", 11)(36, "p", 28);
    \u0275\u0275text(37, "Parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 29)(39, "span", 30);
    \u0275\u0275text(40, "\u25D0");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "p", 31);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275template(43, ContractPaymentsComponent_div_4_div_43_Template, 11, 10, "div", 32)(44, ContractPaymentsComponent_div_4_div_44_Template, 3, 1, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 34)(46, "div", 11)(47, "p", 35);
    \u0275\u0275text(48, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 36)(50, "span", 37);
    \u0275\u0275text(51, "\u23F3");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "p", 38);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 39);
    \u0275\u0275text(55, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 40);
    \u0275\u0275template(57, ContractPaymentsComponent_div_4_p_57_Template, 3, 4, "p", 41);
    \u0275\u0275elementStart(58, "p", 35);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(61, ContractPaymentsComponent_div_4_div_61_Template, 3, 1, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 42)(63, "div", 11)(64, "p", 43);
    \u0275\u0275text(65, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 44)(67, "span", 45);
    \u0275\u0275text(68, "!");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "p", 46);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "p", 47);
    \u0275\u0275text(72, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 40)(74, "p", 43);
    \u0275\u0275text(75);
    \u0275\u0275pipe(76, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(77, ContractPaymentsComponent_div_4_div_77_Template, 3, 2, "div", 48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().total_payments);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 17, ctx_r1.stats().financed_amount || 0, ctx_r1.currency));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.stats().paid_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.stats().paid_count, " \xD7 ", \u0275\u0275pipeBind2(29, 20, ctx_r1.stats().paid_amount_complete / ctx_r1.stats().paid_count, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(32, 23, ctx_r1.stats().paid_amount_complete || 0, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.stats().paid_amount_partial > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.stats().partial_count || 0) + (ctx_r1.stats().partial_overdue_count || 0));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_overdue_count > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.stats().pending_count || 0) + (ctx_r1.stats().pending_overdue_count || 0));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(60, 26, ctx_r1.stats().total_pending || 0, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.stats().pending_overdue_count > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().overdue_count || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(76, 29, ctx_r1.stats().total_pending || 0, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (ctx_r1.stats().partial_overdue_count || 0) > 0 || (ctx_r1.stats().pending_overdue_count || 0) > 0);
  }
}
function ContractPaymentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "p", 64);
    \u0275\u0275text(2, "Cargando pagos...");
    \u0275\u0275elementEnd()();
  }
}
function ContractPaymentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "p", 66);
    \u0275\u0275text(2, "No hay pagos generados");
    \u0275\u0275elementEnd()();
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "localDate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, payment_r4.paid_date, "mediumDate"));
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "localDate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Primer pago: ", \u0275\u0275pipeBind2(2, 1, payment_r4.first_partial_payment_date, "mediumDate"), " ");
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_7_tr_25_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 89);
    \u0275\u0275text(1, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.registerPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Registrar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.DollarSign)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Editar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Edit)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 92);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Resetear Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 73)(1, "td", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 75);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 76);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 76);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 77);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 77);
    \u0275\u0275template(16, ContractPaymentsComponent_div_7_tr_25_div_16_Template, 3, 4, "div", 78)(17, ContractPaymentsComponent_div_7_tr_25_div_17_Template, 3, 4, "div", 79)(18, ContractPaymentsComponent_div_7_tr_25_div_18_Template, 2, 0, "div", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 80)(20, "div", 81)(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ContractPaymentsComponent_div_7_tr_25_span_23_Template, 2, 0, "span", 82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td", 77);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "td", 77);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 80)(29, "div", 83);
    \u0275\u0275template(30, ContractPaymentsComponent_div_7_tr_25_button_30_Template, 2, 3, "button", 84)(31, ContractPaymentsComponent_div_7_tr_25_button_31_Template, 2, 3, "button", 85)(32, ContractPaymentsComponent_div_7_tr_25_button_32_Template, 2, 3, "button", 86);
    \u0275\u0275elementStart(33, "button", 87);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_Template_button_click_33_listener() {
      const payment_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendPaymentEmail(payment_r4));
    });
    \u0275\u0275element(34, "lucide-icon", 88);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const payment_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.payment_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 28, payment_r4.amount, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-blue-600", payment_r4.status === "parcial")("font-medium", payment_r4.status === "parcial");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 31, payment_r4.amount_paid, ctx_r1.currency), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-orange-600", payment_r4.status === "parcial")("font-medium", payment_r4.status === "parcial");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 34, payment_r4.amount_pending, ctx_r1.currency), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 37, payment_r4.due_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", payment_r4.paid_date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !payment_r4.paid_date && payment_r4.first_partial_payment_date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !payment_r4.paid_date && !payment_r4.first_partial_payment_date);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getStatusClass(payment_r4.status, payment_r4.is_overdue));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(payment_r4.status, payment_r4.is_overdue), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.is_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.payment_method || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.reference_number || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canRegisterPayment(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canResetPayment(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Enviar por Correo");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Mail)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "table", 68)(2, "thead", 69)(3, "tr")(4, "th", 70);
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 70);
    \u0275\u0275text(7, "Monto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 70);
    \u0275\u0275text(9, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 70);
    \u0275\u0275text(11, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 70);
    \u0275\u0275text(13, "Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 70);
    \u0275\u0275text(15, "Fecha Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 70);
    \u0275\u0275text(17, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 70);
    \u0275\u0275text(19, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 70);
    \u0275\u0275text(21, "Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 70);
    \u0275\u0275text(23, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "tbody", 71);
    \u0275\u0275template(25, ContractPaymentsComponent_div_7_tr_25_Template, 35, 40, "tr", 72);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(25);
    \u0275\u0275property("ngForOf", ctx_r1.payments());
  }
}
var ContractPaymentsComponent = class _ContractPaymentsComponent {
  paymentService;
  interceptorService;
  dialog;
  contractId;
  currency = "USD";
  dataChanged = new EventEmitter();
  payments = signal([], ...ngDevMode ? [{ debugName: "payments" }] : []);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  Plus = Plus;
  Edit = SquarePen;
  Trash2 = Trash2;
  X = X;
  DollarSign = DollarSign;
  RotateCcw = RotateCcw;
  Mail = Mail;
  constructor(paymentService, interceptorService, dialog) {
    this.paymentService = paymentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadPayments();
    this.loadStats();
  }
  loadPayments() {
    this.loading.set(true);
    this.paymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los pagos"
        });
      }
    });
  }
  loadStats() {
    this.paymentService.getPaymentStats(this.contractId).subscribe({
      next: (stats) => {
        console.log("Payment stats received:", stats);
        this.stats.set(stats);
      },
      error: () => {
      }
    });
  }
  generatePayments() {
    if (!confirm("\xBFGenerar todos los pagos del contrato? Esta acci\xF3n solo se puede realizar una vez."))
      return;
    this.generating.set(true);
    this.paymentService.generatePayments(this.contractId).subscribe({
      next: () => {
        this.generating.set(false);
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pagos generados correctamente"
        });
      },
      error: (err) => {
        this.generating.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al generar pagos"
        });
      }
    });
  }
  editPayment(payment) {
    const dialogRef = this.dialog.open(EditPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("\u270F\uFE0F Payment edited, emitting dataChanged event");
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  cancelPayment(payment) {
    if (!confirm(`\xBFCancelar el pago #${payment.payment_number}?`))
      return;
    this.paymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago cancelado"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo cancelar el pago"
        });
      }
    });
  }
  deletePayment(payment) {
    if (!confirm(`\xBFEliminar permanentemente el pago #${payment.payment_number}? Esta acci\xF3n no se puede deshacer.`))
      return;
    this.paymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago eliminado"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo eliminar el pago"
        });
      }
    });
  }
  getStatusClass(status, isOverdue = false) {
    let baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ";
    if (isOverdue && (status === "pendiente" || status === "parcial")) {
      return baseClass + "bg-red-500 text-white shadow-sm";
    }
    const statusMap = {
      "pendiente": "bg-amber-500 text-white shadow-sm",
      "pagado": "bg-emerald-500 text-white shadow-sm",
      "parcial": "bg-blue-500 text-white shadow-sm",
      "cancelado": "bg-gray-500 text-white shadow-sm"
    };
    return baseClass + (statusMap[status] || "bg-gray-500 text-white shadow-sm");
  }
  getStatusLabel(status, isOverdue = false) {
    if (status === "parcial" && isOverdue) {
      return "Parcial Vencido";
    } else if (status === "pendiente" && isOverdue) {
      return "Pendiente Vencido";
    } else if (status === "parcial") {
      return "Parcial";
    } else if (status === "pendiente") {
      return "Pendiente";
    } else if (status === "pagado") {
      return "Pagado";
    } else if (status === "cancelado") {
      return "Cancelado";
    } else {
      return status;
    }
  }
  canEdit(payment) {
    return payment.status === "pendiente" || payment.status === "pagado" || payment.status === "parcial";
  }
  canDelete(payment) {
    return payment.status !== "pagado";
  }
  canCancel(payment) {
    return payment.status === "pendiente";
  }
  canRegisterPayment(payment) {
    return payment.status === "pendiente" || payment.status === "parcial";
  }
  canResetPayment(payment) {
    return payment.status === "pagado" || payment.status === "parcial";
  }
  resetPayment(payment) {
    if (!confirm(`\xBFResetear el pago #${payment.payment_number}? Esto volver\xE1 el pago a estado pendiente y eliminar\xE1 toda la informaci\xF3n de pago.`))
      return;
    this.paymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago reseteado correctamente"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo resetear el pago"
        });
      }
    });
  }
  sendPaymentEmail(payment) {
    console.log("Enviar correo para pago:", payment);
  }
  registerPayment(payment) {
    const dialogRef = this.dialog.open(PartialPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("\u{1F4B0} Payment registered, emitting dataChanged event");
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  static \u0275fac = function ContractPaymentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractPaymentsComponent)(\u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractPaymentsComponent, selectors: [["app-contract-payments"]], inputs: { contractId: "contractId", currency: "currency" }, outputs: { dataChanged: "dataChanged" }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 8, vars: 5, consts: [[1, "payments-container"], [1, "flex", "items-center", "justify-end", "mb-1"], [1, "flex", "gap-2"], ["text", "Generar Pagos", "custom_class", "btn_primary", "size", "sm", 3, "icon", "loading", "clicked", 4, "ngIf"], ["class", "grid grid-cols-5 gap-4 mb-6 w-full", 4, "ngIf"], ["class", "text-center py-8", 4, "ngIf"], ["class", "text-center py-8 text-gray-500", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["text", "Generar Pagos", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "icon", "loading"], [1, "grid", "grid-cols-5", "gap-4", "mb-6", "w-full"], [1, "bg-gray-50", "p-4", "rounded-lg", "border", "border-gray-200"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "w-6", "h-6", "bg-gray-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-gray-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-gray-900", "mb-1"], [1, "text-xs", "text-gray-500", "mb-2"], [1, "text-sm", "font-medium", "text-gray-700"], [1, "bg-green-50", "p-4", "rounded-lg", "border", "border-green-200"], [1, "text-sm", "font-medium", "text-green-700"], [1, "w-6", "h-6", "bg-green-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-green-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-green-800", "mb-1"], [1, "text-xs", "text-green-600", "mb-2"], [1, "mt-3", "space-y-1"], [1, "text-xs", "text-green-600"], ["class", "pt-1 border-t border-green-200", 4, "ngIf"], [1, "bg-blue-50", "p-4", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "font-medium", "text-blue-700"], [1, "w-6", "h-6", "bg-blue-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-blue-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-blue-800", "mb-1"], ["class", "mt-3 space-y-1", 4, "ngIf"], ["class", "mt-2", 4, "ngIf"], [1, "bg-yellow-50", "p-4", "rounded-lg", "border", "border-yellow-200"], [1, "text-sm", "font-medium", "text-yellow-700"], [1, "w-6", "h-6", "bg-yellow-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-yellow-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-yellow-800", "mb-1"], [1, "text-xs", "text-yellow-600", "mb-2"], [1, "space-y-1"], ["class", "text-xs text-orange-600", 4, "ngIf"], [1, "bg-red-50", "p-4", "rounded-lg", "border", "border-red-200"], [1, "text-sm", "font-medium", "text-red-700"], [1, "w-6", "h-6", "bg-red-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-red-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-red-800", "mb-1"], [1, "text-xs", "text-red-600", "mb-2"], ["class", "pt-1 border-t border-red-200 space-y-1", 4, "ngIf"], [1, "pt-1", "border-t", "border-green-200"], [1, "text-xs", "text-blue-600"], [1, "text-sm", "font-bold", "text-green-800", "mt-1"], [1, "flex", "items-center", "gap-1"], [1, "text-xs", "font-medium", "text-blue-700"], ["class", "text-red-500 text-xs", 4, "ngIf"], [1, "text-xs", "font-medium", "text-orange-600"], [1, "text-red-500", "text-xs"], [1, "mt-2"], [1, "inline-block", "px-2", "py-1", "bg-red-100", "rounded", "text-xs", "font-medium", "text-red-600"], [1, "text-xs", "text-orange-600"], [1, "pt-1", "border-t", "border-red-200", "space-y-1"], ["class", "text-xs text-red-600", 4, "ngIf"], [1, "text-xs", "text-red-600"], [1, "text-center", "py-8"], [1, "text-sm", "text-gray-500"], [1, "text-center", "py-8", "text-gray-500"], [1, "text-sm"], [1, "overflow-x-auto"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-3", "py-2", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase"], [1, "bg-white", "divide-y", "divide-gray-200"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "hover:bg-gray-50"], [1, "px-3", "py-2", "text-sm", "font-medium", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-900"], [1, "px-3", "py-2", "text-sm"], [1, "px-3", "py-2", "text-sm", "text-gray-600"], [4, "ngIf"], ["class", "text-xs text-blue-600", 4, "ngIf"], [1, "px-3", "py-2"], [1, "flex", "items-center", "gap-2"], ["class", "text-red-500 text-xs", "title", "Vencido", 4, "ngIf"], [1, "flex", "gap-1.5"], ["class", "p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["class", "p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["class", "p-1.5 text-purple-600 hover:text-white hover:bg-purple-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["matTooltipPosition", "above", 1, "p-1.5", "text-indigo-600", "hover:text-white", "hover:bg-indigo-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], [3, "img", "size"], ["title", "Vencido", 1, "text-red-500", "text-xs"], ["matTooltipPosition", "above", 1, "p-1.5", "text-blue-600", "hover:text-white", "hover:bg-blue-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], ["matTooltipPosition", "above", 1, "p-1.5", "text-gray-600", "hover:text-white", "hover:bg-gray-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], ["matTooltipPosition", "above", 1, "p-1.5", "text-purple-600", "hover:text-white", "hover:bg-purple-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"]], template: function ContractPaymentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275template(3, ContractPaymentsComponent_app_button_3_Template, 1, 2, "app-button", 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(4, ContractPaymentsComponent_div_4_Template, 78, 32, "div", 4)(5, ContractPaymentsComponent_div_5_Template, 3, 0, "div", 5)(6, ContractPaymentsComponent_div_6_Template, 3, 0, "div", 6)(7, ContractPaymentsComponent_div_7_Template, 26, 1, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.payments().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.stats());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent,
    MatTooltipModule,
    MatTooltip,
    CurrencyPipe,
    LocalDatePipe
  ], styles: ["\n\ntable[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=contract-payments.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractPaymentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-payments", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      LucideAngularModule,
      LocalDatePipe,
      MatTooltipModule
    ], providers: [DatePipe], template: `<div class="payments-container">\r
  <!-- Header -->\r
  <div class="flex items-center justify-end mb-1">\r
    <div class="flex gap-2">\r
      <app-button\r
        *ngIf="payments().length === 0"\r
        text="Generar Pagos"\r
        custom_class="btn_primary"\r
        size="sm"\r
        [icon]="Plus"\r
        [loading]="generating()"\r
        (clicked)="generatePayments()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <!-- Stats Cards -->\r
  <div *ngIf="stats()" class="grid grid-cols-5 gap-4 mb-6 w-full">\r
    <!-- Total Pagos -->\r
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-gray-600">Total Pagos</p>\r
        <div class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">\r
          <span class="text-gray-600 text-xs font-bold">#</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-gray-900 mb-1">{{ stats()!.total_payments }}</p>\r
      <p class="text-xs text-gray-500 mb-2">meses</p>\r
      <p class="text-sm font-medium text-gray-700">{{ (stats()!.financed_amount || 0) | currency:currency }}</p>\r
    </div>\r
\r
    <!-- Pagados -->\r
    <div class="bg-green-50 p-4 rounded-lg border border-green-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-green-700">Pagados</p>\r
        <div class="w-6 h-6 bg-green-100 rounded flex items-center justify-center">\r
          <span class="text-green-600 text-xs font-bold">\u2713</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-green-800 mb-1">{{ stats()!.paid_count }}</p>\r
      <p class="text-xs text-green-600 mb-2">completos</p>\r
      \r
      <div class="mt-3 space-y-1">\r
        <p class="text-xs text-green-600">{{ stats()!.paid_count }} \xD7 {{ (stats()!.paid_amount_complete / stats()!.paid_count) | currency:currency }}</p>\r
        <p class="text-sm font-medium text-green-700">{{ (stats()!.paid_amount_complete || 0) | currency:currency }}</p>\r
        \r
        <div *ngIf="stats()!.paid_amount_partial > 0" class="pt-1 border-t border-green-200">\r
          <p class="text-xs text-blue-600">+ Parcial: {{ stats()!.paid_amount_partial | currency:currency }}</p>\r
          <p class="text-sm font-bold text-green-800 mt-1">Total: {{ (stats()!.total_paid_from_payments || 0) | currency:currency }}</p>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Parciales -->\r
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-blue-700">Parciales</p>\r
        <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">\r
          <span class="text-blue-600 text-xs font-bold">\u25D0</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-blue-800 mb-1">{{ (stats()!.partial_count || 0) + (stats()!.partial_overdue_count || 0) }}</p>\r
      \r
      <div *ngIf="stats()!.partial_payment" class="mt-3 space-y-1">\r
        <div class="flex items-center gap-1">\r
          <p class="text-xs font-medium text-blue-700">Pago #{{ stats()!.partial_payment!.installment_number }}</p>\r
          <span *ngIf="stats()!.partial_payment!.is_overdue" class="text-red-500 text-xs">!</span>\r
        </div>\r
        <p class="text-xs text-blue-600">Abonado: {{ (stats()!.partial_payment!.amount_paid || 0) | currency:currency }}</p>\r
        <p class="text-xs font-medium text-orange-600">Faltante: {{ stats()!.partial_payment!.remaining_amount | currency:currency }}</p>\r
      </div>\r
      \r
      <div *ngIf="stats()!.partial_overdue_count > 0" class="mt-2">\r
        <span class="inline-block px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-600">{{ stats()!.partial_overdue_count }} vencidos</span>\r
      </div>\r
    </div>\r
\r
    <!-- Pendientes -->\r
    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-yellow-700">Pendientes</p>\r
        <div class="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">\r
          <span class="text-yellow-600 text-xs font-bold">\u23F3</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-yellow-800 mb-1">{{ (stats()!.pending_count || 0) + (stats()!.pending_overdue_count || 0) }}</p>\r
      <p class="text-xs text-yellow-600 mb-2">meses</p>\r
      \r
      <div class="space-y-1">\r
        <p *ngIf="stats()!.partial_payment" class="text-xs text-orange-600">\r
          + 1 pago con saldo de {{ stats()!.partial_payment!.remaining_amount | currency:currency }}\r
        </p>\r
        <p class="text-sm font-medium text-yellow-700">{{ (stats()!.total_pending || 0) | currency:currency }}</p>\r
      </div>\r
      \r
      <div *ngIf="stats()!.pending_overdue_count > 0" class="mt-2">\r
        <span class="inline-block px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-600">{{ stats()!.pending_overdue_count }} vencidos</span>\r
      </div>\r
    </div>\r
\r
    <!-- Vencidos -->\r
    <div class="bg-red-50 p-4 rounded-lg border border-red-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-red-700">Vencidos</p>\r
        <div class="w-6 h-6 bg-red-100 rounded flex items-center justify-center">\r
          <span class="text-red-600 text-xs font-bold">!</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-red-800 mb-1">{{ stats()!.overdue_count || 0 }}</p>\r
      <p class="text-xs text-red-600 mb-2">meses</p>\r
      \r
      <div class="space-y-1">\r
        <p class="text-sm font-medium text-red-700">{{ (stats()!.total_pending || 0) | currency:currency }}</p>\r
        \r
        <div *ngIf="(stats()!.partial_overdue_count || 0) > 0 || (stats()!.pending_overdue_count || 0) > 0" class="pt-1 border-t border-red-200 space-y-1">\r
          <p *ngIf="stats()!.pending_overdue_count > 0" class="text-xs text-red-600">{{ stats()!.pending_overdue_count }} pendientes</p>\r
          <p *ngIf="stats()!.partial_overdue_count > 0" class="text-xs text-red-600">{{ stats()!.partial_overdue_count }} parciales</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Loading -->\r
  <div *ngIf="loading()" class="text-center py-8">\r
    <p class="text-sm text-gray-500">Cargando pagos...</p>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading() && payments().length === 0" class="text-center py-8 text-gray-500">\r
    <p class="text-sm">No hay pagos generados</p>\r
  </div>\r
\r
  <!-- Payments Table -->\r
  <div *ngIf="!loading() && payments().length > 0" class="overflow-x-auto">\r
    <table class="min-w-full divide-y divide-gray-200">\r
      <thead class="bg-gray-50">\r
        <tr>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pagado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pendiente</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha Pago</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">M\xE9todo</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>\r
        </tr>\r
      </thead>\r
      <tbody class="bg-white divide-y divide-gray-200">\r
        <tr *ngFor="let payment of payments()" class="hover:bg-gray-50">\r
          <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ payment.payment_number }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm" [class.text-blue-600]="payment.status === 'parcial'" [class.font-medium]="payment.status === 'parcial'">\r
            {{ payment.amount_paid | currency:currency }}\r
          </td>\r
          <td class="px-3 py-2 text-sm" [class.text-orange-600]="payment.status === 'parcial'" [class.font-medium]="payment.status === 'parcial'">\r
            {{ payment.amount_pending | currency:currency }}\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.due_date | localDate:'mediumDate' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">\r
            <div *ngIf="payment.paid_date">{{ payment.paid_date | localDate:'mediumDate' }}</div>\r
            <div *ngIf="!payment.paid_date && payment.first_partial_payment_date" class="text-xs text-blue-600">\r
              Primer pago: {{ payment.first_partial_payment_date | localDate:'mediumDate' }}\r
            </div>\r
            <div *ngIf="!payment.paid_date && !payment.first_partial_payment_date">\u2014</div>\r
          </td>\r
          <td class="px-3 py-2">\r
            <div class="flex items-center gap-2">\r
              <span [class]="getStatusClass(payment.status, payment.is_overdue)">\r
                {{ getStatusLabel(payment.status, payment.is_overdue) }}\r
              </span>\r
              <span *ngIf="payment.is_overdue" class="text-red-500 text-xs" title="Vencido">\u26A0\uFE0F</span>\r
            </div>\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.payment_method || '\u2014' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.reference_number || '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <div class="flex gap-1.5">\r
              <button\r
                *ngIf="canRegisterPayment(payment)"\r
                (click)="registerPayment(payment)"\r
                class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Registrar Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="DollarSign" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canEdit(payment)"\r
                (click)="editPayment(payment)"\r
                class="p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Editar Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="Edit" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canResetPayment(payment)"\r
                (click)="resetPayment(payment)"\r
                class="p-1.5 text-purple-600 hover:text-white hover:bg-purple-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Resetear Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="sendPaymentEmail(payment)"\r
                class="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Enviar por Correo'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="Mail" [size]="16"></lucide-icon>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-payments/contract-payments.component.scss */\ntable {\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=contract-payments.component.css.map */\n"] }]
  }], () => [{ type: PaymentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }], currency: [{
    type: Input
  }], dataChanged: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractPaymentsComponent, { className: "ContractPaymentsComponent", filePath: "src/app/features/contracts/components/contract-payments/contract-payments.component.ts", lineNumber: 28 });
})();

// src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts
function GenerateHoaDialogComponent_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " La fecha de inicio es requerida ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " La fecha de fin es requerida ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " La fecha de fin debe ser posterior a la fecha de inicio ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " El monto es requerido y debe ser mayor a 0 ");
    \u0275\u0275elementEnd();
  }
}
var GenerateHoaDialogComponent = class _GenerateHoaDialogComponent {
  dialogRef;
  data;
  fb;
  form;
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  constructor(dialogRef, data, fb) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    this.form = this.fb.group({
      start_date: [this.data.contract.contract_date, Validators.required],
      end_date: ["", Validators.required],
      amount: ["", [Validators.required, Validators.min(0.01)]]
    }, { validators: this.dateRangeValidator });
  }
  dateRangeValidator(group) {
    const startDate = group.get("start_date")?.value;
    const endDate = group.get("end_date")?.value;
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { endDateBeforeStart: true };
    }
    return null;
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  static \u0275fac = function GenerateHoaDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GenerateHoaDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GenerateHoaDialogComponent, selectors: [["app-generate-hoa-dialog"]], decls: 38, vars: 14, consts: [[1, "dialog-overlay"], [1, "dialog-container"], [1, "dialog-header"], [1, "text-xl", "font-semibold", "text-gray-900"], ["type", "button", 1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "text-sm", "text-gray-600", "mb-4"], [1, "space-y-4"], ["for", "start_date", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "start_date", "type", "date", "formControlName", "start_date", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["class", "mt-1 text-xs text-red-600", 4, "ngIf"], ["for", "end_date", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "end_date", "type", "date", "formControlName", "end_date", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["for", "amount", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "transform", "-translate-y-1/2", "text-gray-500", "text-sm"], ["id", "amount", "type", "number", "step", "0.01", "min", "0", "formControlName", "amount", "placeholder", "0.00", 1, "w-full", "rounded-lg", "border", "border-gray-300", "pl-7", "pr-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], [1, "dialog-footer"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-green-600", "rounded-lg", "hover:bg-green-700", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"], [1, "mt-1", "text-xs", "text-red-600"]], template: function GenerateHoaDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Generar Pagos de HOA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function GenerateHoaDialogComponent_Template_button_click_5_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(6, " \u2715 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5);
      \u0275\u0275listener("ngSubmit", function GenerateHoaDialogComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "div", 6)(9, "p", 7);
      \u0275\u0275text(10, " Genera pagos mensuales de HOA para el contrato ");
      \u0275\u0275elementStart(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div")(15, "label", 9);
      \u0275\u0275text(16, " Fecha de Inicio ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 10);
      \u0275\u0275template(18, GenerateHoaDialogComponent_p_18_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "label", 12);
      \u0275\u0275text(21, " Fecha de Fin ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 13);
      \u0275\u0275template(23, GenerateHoaDialogComponent_p_23_Template, 2, 0, "p", 11)(24, GenerateHoaDialogComponent_p_24_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "label", 14);
      \u0275\u0275text(27, " Monto Mensual ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 15)(29, "span", 16);
      \u0275\u0275text(30, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275template(32, GenerateHoaDialogComponent_p_32_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "div", 18)(34, "button", 19);
      \u0275\u0275listener("click", function GenerateHoaDialogComponent_Template_button_click_34_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(35, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 20);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.contract.contract_number);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-red-500", ((tmp_2_0 = ctx.form.get("start_date")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("start_date")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("start_date")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("start_date")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_4_0 = ctx.form.get("end_date")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("end_date")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("end_date")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("end_date")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.form.hasError("endDateBeforeStart"));
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-red-500", ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.generating());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.generating() ? "Generando..." : "Generar Pagos", " ");
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-hoa-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GenerateHoaDialogComponent, [{
    type: Component,
    args: [{ selector: "app-generate-hoa-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="text-xl font-semibold text-gray-900">Generar Pagos de HOA</h2>
          <button
            type="button"
            (click)="closeDialog()"
            class="text-gray-400 hover:text-gray-600 transition-colors">
            \u2715
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="dialog-body">
            <p class="text-sm text-gray-600 mb-4">
              Genera pagos mensuales de HOA para el contrato <strong>{{ data.contract.contract_number }}</strong>
            </p>

            <div class="space-y-4">
              <!-- Fecha de Inicio -->
              <div>
                <label for="start_date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Inicio
                </label>
                <input
                  id="start_date"
                  type="date"
                  formControlName="start_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('start_date')?.invalid && form.get('start_date')?.touched">
                <p *ngIf="form.get('start_date')?.invalid && form.get('start_date')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de inicio es requerida
                </p>
              </div>

              <!-- Fecha de Fin -->
              <div>
                <label for="end_date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Fin
                </label>
                <input
                  id="end_date"
                  type="date"
                  formControlName="end_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('end_date')?.invalid && form.get('end_date')?.touched">
                <p *ngIf="form.get('end_date')?.invalid && form.get('end_date')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de fin es requerida
                </p>
                <p *ngIf="form.hasError('endDateBeforeStart')" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de fin debe ser posterior a la fecha de inicio
                </p>
              </div>

              <!-- Monto -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                  Monto Mensual
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    formControlName="amount"
                    placeholder="0.00"
                    class="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="form.get('amount')?.invalid && form.get('amount')?.touched">
                </div>
                <p *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  El monto es requerido y debe ser mayor a 0
                </p>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button
              type="button"
              (click)="closeDialog()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || generating()"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ generating() ? 'Generando...' : 'Generar Pagos' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;eb90fb5abb6ba153121faac447b382d310ceb899275f5776a468564ea02eb351;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts */\n.dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body {\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-hoa-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GenerateHoaDialogComponent, { className: "GenerateHoaDialogComponent", filePath: "src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts", lineNumber: 155 });
})();

// src/app/features/contracts/components/contract-detail-modal/contract-detail-modal.component.ts
var _c03 = ["vendorAutocompleteTrigger"];
var _c12 = (a0, a1, a2, a3) => ({ "bg-green-100 text-green-800": a0, "bg-blue-100 text-blue-800": a1, "bg-red-100 text-red-800": a2, "bg-yellow-100 text-yellow-800": a3 });
function ContractDetailModalComponent_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1, "\u2022");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailModalComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275listener("click", function ContractDetailModalComponent_span_10_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateToCustomer());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCustomerName(), " ");
  }
}
function ContractDetailModalComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, " \u24D8 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r2.getPendingBreakdown());
  }
}
function ContractDetailModalComponent_span_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275listener("click", function ContractDetailModalComponent_span_94_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openPropertyModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.data.contract.property.code, " ");
  }
}
function ContractDetailModalComponent_span_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailModalComponent_button_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ContractDetailModalComponent_button_102_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearSeller());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailModalComponent_mat_option_105_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 69);
    \u0275\u0275listener("click", function ContractDetailModalComponent_mat_option_105_Template_mat_option_click_0_listener() {
      const seller_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSellerSelected(seller_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const seller_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", seller_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displaySeller(seller_r7), " ");
  }
}
function ContractDetailModalComponent_mat_option_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 70)(1, "span", 71);
    \u0275\u0275text(2, "No se encontraron vendedores");
    \u0275\u0275elementEnd()();
  }
}
function ContractDetailModalComponent_app_button_145_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 72);
    \u0275\u0275listener("clicked", function ContractDetailModalComponent_app_button_145_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveContract());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r2.saving());
  }
}
var ContractDetailModalComponent = class _ContractDetailModalComponent {
  dialog;
  dialog_ref;
  data;
  router;
  propertyService;
  contractService;
  paymentService;
  userService;
  interceptorService;
  fb;
  cdr;
  X = X;
  vendorAutocompleteTrigger;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  deleting = signal(false, ...ngDevMode ? [{ debugName: "deleting" }] : []);
  activeTab = signal("edit", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  paymentStats = signal(null, ...ngDevMode ? [{ debugName: "paymentStats" }] : []);
  // Vendor signals
  vendors = signal([], ...ngDevMode ? [{ debugName: "vendors" }] : []);
  filteredVendors = signal([], ...ngDevMode ? [{ debugName: "filteredVendors" }] : []);
  statusSelectConfig = {
    placeholder: "Selecciona un estado",
    data: [
      { value: "activo", label: "Activo" },
      { value: "completado", label: "Completado" },
      { value: "cancelado", label: "Cancelado" },
      { value: "suspendido", label: "Suspendido" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(dialog, dialog_ref, data, router, propertyService, contractService, paymentService, userService, interceptorService, fb, cdr) {
    this.dialog = dialog;
    this.dialog_ref = dialog_ref;
    this.data = data;
    this.router = router;
    this.propertyService = propertyService;
    this.contractService = contractService;
    this.paymentService = paymentService;
    this.userService = userService;
    this.interceptorService = interceptorService;
    this.fb = fb;
    this.cdr = cdr;
    this.form = this.fb.group({
      contract_date: [this.data.contract.contract_date, Validators.required],
      total_price: [this.data.contract.total_price, [Validators.required, Validators.min(0)]],
      down_payment: [this.data.contract.down_payment, [Validators.required, Validators.min(0)]],
      remaining_balance: [{ value: this.data.contract.remaining_balance, disabled: true }, [Validators.required, Validators.min(0)]],
      payment_months: [this.data.contract.payment_months, [Validators.required, Validators.min(0)]],
      monthly_payment: [{ value: this.data.contract.monthly_payment, disabled: true }, [Validators.required, Validators.min(0)]],
      first_payment_date: [this.data.contract.first_payment_date, Validators.required],
      currency: [this.data.contract.currency || "USD", Validators.required],
      status: [this.data.contract.status, Validators.required],
      notes: [this.data.contract.notes || ""],
      seller_search: [""],
      seller_id: [this.data.contract.seller_id || null]
    });
    this.statusSelectConfig.form_control = this.form.get("status");
  }
  ngOnInit() {
    console.log("\u{1F50D} Contract Detail Modal - Contract ID:", this.data.contract.id);
    this.loadSellers();
    this.initializeSellerSearch();
    this.loadContractDetails();
  }
  loadContractDetails() {
    this.contractService.getContract(this.data.contract.id).subscribe({
      next: (contract) => {
        console.log("\u{1F4CB} Contract loaded:", contract);
        console.log("\u{1F9D1} Seller data:", contract.seller);
        this.data.contract = contract;
        if (contract.seller) {
          console.log("\u2705 Adding seller to vendors list");
          const sellerExists = this.vendors().some((v) => v.id === contract.seller.id);
          if (!sellerExists) {
            this.vendors.set([contract.seller, ...this.vendors()]);
            this.filteredVendors.set([contract.seller, ...this.filteredVendors()]);
          }
          console.log("\u2705 Setting seller display:", this.displaySeller(contract.seller));
        } else {
          console.log("\u274C No seller data found");
        }
        this.form.patchValue({
          contract_date: contract.contract_date,
          total_price: contract.total_price,
          down_payment: contract.down_payment,
          remaining_balance: contract.remaining_balance,
          payment_months: contract.payment_months,
          monthly_payment: contract.monthly_payment,
          first_payment_date: contract.first_payment_date,
          currency: contract.currency || "USD",
          status: contract.status,
          notes: contract.notes || "",
          seller_id: contract.seller_id || null,
          seller_search: contract.seller ? this.displaySeller(contract.seller) : ""
        });
        this.loadPaymentStats();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading contract details:", err);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los detalles del contrato"
        });
      }
    });
  }
  loadPaymentStats() {
    this.paymentService.getPaymentStats(this.data.contract.id).subscribe({
      next: (stats) => {
        this.paymentStats.set(stats);
      },
      error: () => {
      }
    });
  }
  refreshContractData() {
    console.log("\u{1F504} Refreshing contract data...");
    this.loadContractDetails();
  }
  loadSellers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        const userData = Array.isArray(response) ? response : [];
        this.vendors.set(userData);
        this.filteredVendors.set(userData);
      },
      error: (err) => {
        console.error("Error loading sellers:", err);
      }
    });
  }
  initializeSellerSearch() {
    this.form.get("seller_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.filterSellers(searchTerm || "");
    });
  }
  filterSellers(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.userService.getUsers().subscribe({
        next: (response) => {
          const userData = Array.isArray(response) ? response : [];
          this.filteredVendors.set(userData);
        },
        error: (err) => {
          console.error("Error loading sellers:", err);
        }
      });
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.vendors().filter((user) => user.first_name?.toLowerCase().includes(term) || "" || (user.last_name?.toLowerCase().includes(term) || "") || (user.email?.toLowerCase().includes(term) || ""));
    this.filteredVendors.set(filtered);
  }
  onSellerSelected(seller) {
    console.log("\u{1F9D1} Seller selected:", seller);
    this.form.patchValue({
      seller_id: seller.id,
      seller_search: this.displaySeller(seller)
    }, { emitEvent: false });
    this.vendorAutocompleteTrigger?.closePanel();
    this.cdr.markForCheck();
  }
  clearSeller() {
    this.form.patchValue({
      seller_id: null,
      seller_search: ""
    });
  }
  onSellerSearchFocus() {
    this.form.patchValue({
      seller_search: ""
    }, { emitEvent: true });
    setTimeout(() => {
      this.vendorAutocompleteTrigger?.openPanel();
    }, 100);
  }
  onSellerSearchBlur() {
    const searchValue = this.form.get("seller_search")?.value;
    const sellerId = this.form.get("seller_id")?.value;
    if (!searchValue && sellerId) {
      const selectedSeller = this.vendors().find((v) => v.id === sellerId);
      if (selectedSeller) {
        this.form.patchValue({
          seller_search: this.displaySeller(selectedSeller)
        }, { emitEvent: false });
      }
    }
  }
  displaySeller(seller) {
    if (!seller)
      return "";
    if (typeof seller === "string")
      return seller;
    return seller ? `${seller.first_name} ${seller.last_name} (${seller.email})` : "";
  }
  getPendingBreakdown() {
    const stats = this.paymentStats();
    if (!stats)
      return "";
    const currency = this.data.contract.currency || "USD";
    const monthlyPayment = this.formatCurrency(this.data.contract.monthly_payment, currency);
    const partialAmount = stats.partial_payment ? this.formatCurrency(stats.partial_payment.remaining_amount, currency) : "";
    const total = this.formatCurrency(stats.total_pending_amount, currency);
    let breakdown = `${stats.pending_full_payments} pagos \xD7 ${monthlyPayment}`;
    if (stats.partial_payment) {
      breakdown += ` + ${partialAmount} (pago parcial #${stats.partial_payment.installment_number})`;
    }
    breakdown += ` = ${total}`;
    return breakdown;
  }
  formatCurrency(amount, currency) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(amount);
  }
  setActiveTab(tab) {
    this.activeTab.set(tab);
  }
  downloadStatement() {
    this.contractService.getContractStatement(this.data.contract.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `estado-cuenta-${this.data.contract.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Estado de cuenta descargado correctamente"
        });
      },
      error: (err) => {
        console.error("Error downloading statement:", err);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo descargar el estado de cuenta"
        });
      }
    });
  }
  openGenerateHOADialog() {
    const dialogRef = this.dialog.open(GenerateHoaDialogComponent, {
      width: "500px",
      data: { contract: this.data.contract }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("\u{1F3E0} Generating HOA payments:", result);
        this.interceptorService.openSnackbar({
          type: "info",
          title: "Generando",
          message: "Generando pagos de HOA..."
        });
      }
    });
  }
  saveContract() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Por favor completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    const payload = {
      contract_date: this.form.get("contract_date")?.value,
      total_price: this.form.get("total_price")?.value,
      down_payment: this.form.get("down_payment")?.value,
      payment_months: this.form.get("payment_months")?.value,
      first_payment_date: this.form.get("first_payment_date")?.value,
      currency: this.form.get("currency")?.value,
      status: this.form.get("status")?.value,
      notes: this.form.get("notes")?.value,
      seller_id: this.form.get("seller_id")?.value || null
    };
    this.contractService.updateContract(this.data.contract.id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Contrato actualizado correctamente"
        });
        this.loadContractDetails();
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: error.error?.message || "Error al actualizar el contrato"
        });
      }
    });
  }
  closeDialog() {
    this.dialog_ref.close();
  }
  navigateToCustomer() {
    if (this.data.contract.customer) {
      this.dialog_ref.close();
      this.router.navigate(["/customers/detail", this.data.contract.customer.id]);
    }
  }
  openPropertyModal() {
    if (this.data.contract.property) {
      this.propertyService.getProperty(this.data.contract.property.id).subscribe({
        next: (property) => {
          this.dialog.open(PropertyEditModalComponent, {
            data: { property }
          });
        }
      });
    }
  }
  getStatusClass(status) {
    const statusMap = {
      "activo": "bg-green-100 text-green-800",
      "completado": "bg-blue-100 text-blue-800",
      "cancelado": "bg-red-100 text-red-800",
      "suspendido": "bg-yellow-100 text-yellow-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || "bg-gray-100 text-gray-800"}`;
  }
  getStatusLabel(status) {
    const labels = {
      "activo": "Activo",
      "completado": "Completado",
      "cancelado": "Cancelado",
      "suspendido": "Suspendido"
    };
    return labels[status] || status;
  }
  getCustomerName() {
    if (!this.data.contract.customer)
      return "\u2014";
    return `${this.data.contract.customer.name} ${this.data.contract.customer.lastname}`;
  }
  deleteContract() {
    const contractNumber = this.data.contract.contract_number;
    const customerName = this.getCustomerName();
    const confirmMessage = `\xBFEst\xE1s seguro de que deseas eliminar el contrato ${contractNumber}${customerName !== "\u2014" ? ` de ${customerName}` : ""}?

Esta acci\xF3n no se puede deshacer y eliminar\xE1:
\u2022 El contrato y todos sus datos
\u2022 Todos los pagos asociados
\u2022 Todos los documentos asociados`;
    if (!confirm(confirmMessage))
      return;
    this.deleting.set(true);
    this.contractService.deleteContract(this.data.contract.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Contrato eliminado correctamente"
        });
        this.dialog_ref.close("deleted");
      },
      error: (error) => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: error.error?.message || "Error al eliminar el contrato"
        });
      }
    });
  }
  static \u0275fac = function ContractDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDetailModalComponent)(\u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(ContractService), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDetailModalComponent, selectors: [["app-contract-detail-modal"]], viewQuery: function ContractDetailModalComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5, MatAutocompleteTrigger);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.vendorAutocompleteTrigger = _t.first);
    }
  }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 146, vars: 96, consts: [["sellerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoSeller", "matAutocomplete"], [1, "dialog"], [1, "dialog__header"], [1, "flex-1"], [1, "flex", "items-center", "gap-2", "mb-2"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", 3, "ngClass"], ["class", "text-gray-400", 4, "ngIf"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors", 3, "click", 4, "ngIf"], [1, "grid", "grid-cols-7", "gap-3", "text-xs", "pb-3"], [1, "block", "text-gray-500", "font-medium"], [1, "text-gray-900", "font-semibold"], [1, "text-green-600", "font-semibold"], [1, "flex", "items-center", "gap-1", "text-gray-500", "font-medium"], ["class", "cursor-help text-gray-400 hover:text-gray-600", "matTooltipPosition", "above", "matTooltipShowDelay", "100", 3, "matTooltip", 4, "ngIf"], [1, "text-red-600", "font-semibold"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "tabs", "px-6", "pt-2"], [1, "tab", 3, "click"], [1, "dialog__body"], [1, "tab-content"], [1, "mb-2", "p-1.5", "bg-gray-50", "rounded-lg", "border", "border-gray-200"], [1, "grid", "grid-cols-2", "gap-2", "text-xs"], [1, "block", "font-semibold", "text-gray-500", "mb-0.5"], [1, "text-gray-600"], [1, "space-y-2.5", 3, "formGroup"], [1, "grid", "grid-cols-2", "gap-2.5"], [1, "block", "text-xs", "font-semibold", "text-gray-500", "mb-1"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors", 3, "click", 4, "ngIf"], ["class", "text-gray-900", 4, "ngIf"], ["for", "seller-search", 1, "block", "text-xs", "font-semibold", "text-gray-500", "mb-1"], [1, "relative"], ["id", "seller-search", "type", "text", "formControlName", "seller_search", "aria-label", "Buscar vendedor", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none", 3, "focus", "blur", "placeholder", "matAutocomplete"], ["type", "button", "class", "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600", 3, "click", 4, "ngIf"], [3, "value", "click", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], ["label", "Fecha del Contrato", "type", "date", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["label", "Precio Total", "type", "number", "disabled", "true", 3, "form_control"], ["label", "Enganche", "type", "number", "disabled", "true", 3, "form_control"], ["label", "Saldo Pendiente", "type", "number", 3, "form_control"], ["label", "Meses de Pago", "type", "number", 3, "form_control"], ["label", "Pago Mensual", "type", "number", 3, "form_control"], ["label", "Fecha Primer Pago", "type", "date", 3, "form_control"], ["label", "Notas", "type", "textarea", 3, "form_control"], [3, "dataChanged", "contractId", "currency"], [1, "p-6", "text-center", "text-gray-500"], [1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-base", "font-semibold", "text-gray-800"], ["text", "Generar Pagos", "custom_class", "btn_primary", "size", "sm", 3, "clicked"], [3, "contractId"], [1, "p-6", "text-center"], [1, "mb-4"], [1, "text-gray-600", "mb-4"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "transition-colors", "font-medium", 3, "click"], [1, "dialog__footer"], [1, "flex", "justify-between", "w-full"], ["text", "Eliminar Contrato", "variant", "danger", "customClass", "btn-outline-danger", 3, "clicked", "loading"], [1, "flex", "gap-2"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "loading", "clicked", 4, "ngIf"], [1, "text-gray-400"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], ["matTooltipPosition", "above", "matTooltipShowDelay", "100", 1, "cursor-help", "text-gray-400", "hover:text-gray-600", 3, "matTooltip"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "cursor-pointer", "hover:bg-green-200", "transition-colors", 3, "click"], [1, "text-gray-900"], ["type", "button", 1, "absolute", "right-2", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400", "hover:text-red-600", 3, "click"], [3, "click", "value"], ["disabled", ""], [1, "text-sm", "text-gray-500"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function ContractDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "h2");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "titlecase");
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, ContractDetailModalComponent_span_9_Template, 2, 0, "span", 7)(10, ContractDetailModalComponent_span_10_Template, 2, 1, "span", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9)(12, "div")(13, "span", 10);
      \u0275\u0275text(14, "Fecha Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 11);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "localDate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div")(19, "span", 10);
      \u0275\u0275text(20, "Precio Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 11);
      \u0275\u0275text(22);
      \u0275\u0275pipe(23, "currency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div")(25, "span", 10);
      \u0275\u0275text(26, "Enganche");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 11);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "currency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div")(31, "span", 10);
      \u0275\u0275text(32, "Total Pagado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 12);
      \u0275\u0275text(34);
      \u0275\u0275pipe(35, "currency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div")(37, "span", 13);
      \u0275\u0275text(38, " Saldo Pendiente ");
      \u0275\u0275template(39, ContractDetailModalComponent_span_39_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 15);
      \u0275\u0275text(41);
      \u0275\u0275pipe(42, "currency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div")(44, "span", 10);
      \u0275\u0275text(45, "Meses de Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "span", 11);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div")(49, "span", 10);
      \u0275\u0275text(50, "Pago Mensual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span", 11);
      \u0275\u0275text(52);
      \u0275\u0275pipe(53, "currency");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(54, "lucide-icon", 16);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_lucide_icon_click_54_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDialog());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 17)(56, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_56_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("edit"));
      });
      \u0275\u0275text(57, " Editar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_58_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("payments"));
      });
      \u0275\u0275text(59, " Pagos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_60_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("down_payments"));
      });
      \u0275\u0275text(61, " Enganche en Pagos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("hoa"));
      });
      \u0275\u0275text(63, " HOA ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_64_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("documents"));
      });
      \u0275\u0275text(65, " Documentos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "button", 18);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_66_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setActiveTab("statement"));
      });
      \u0275\u0275text(67, " Estado de Cuenta ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 19)(69, "div", 20)(70, "div", 21)(71, "div", 22)(72, "div")(73, "span", 23);
      \u0275\u0275text(74, "Creado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "span", 24);
      \u0275\u0275text(76);
      \u0275\u0275pipe(77, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div")(79, "span", 23);
      \u0275\u0275text(80, "Actualizado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "span", 24);
      \u0275\u0275text(82);
      \u0275\u0275pipe(83, "date");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(84, "div", 25)(85, "div", 26)(86, "div")(87, "span", 27);
      \u0275\u0275text(88, "N\xFAmero de Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "span", 28);
      \u0275\u0275text(90);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(91, "div")(92, "span", 27);
      \u0275\u0275text(93, "Lote");
      \u0275\u0275elementEnd();
      \u0275\u0275template(94, ContractDetailModalComponent_span_94_Template, 2, 1, "span", 29)(95, ContractDetailModalComponent_span_95_Template, 2, 0, "span", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(96, "div")(97, "label", 31);
      \u0275\u0275text(98, "Vendido Por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "div", 32)(100, "input", 33, 0);
      \u0275\u0275listener("focus", function ContractDetailModalComponent_Template_input_focus_100_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSellerSearchFocus());
      })("blur", function ContractDetailModalComponent_Template_input_blur_100_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSellerSearchBlur());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(102, ContractDetailModalComponent_button_102_Template, 2, 0, "button", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "mat-autocomplete", null, 1);
      \u0275\u0275template(105, ContractDetailModalComponent_mat_option_105_Template, 2, 2, "mat-option", 35)(106, ContractDetailModalComponent_mat_option_106_Template, 3, 0, "mat-option", 36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(107, "div", 26);
      \u0275\u0275element(108, "app-input", 37);
      \u0275\u0275elementStart(109, "div")(110, "label", 38);
      \u0275\u0275text(111, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275element(112, "app-select", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275element(113, "app-input", 40)(114, "app-input", 41)(115, "app-input", 42)(116, "app-input", 43)(117, "app-input", 44)(118, "app-input", 45);
      \u0275\u0275elementEnd();
      \u0275\u0275element(119, "app-input", 46);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(120, "div", 20)(121, "app-contract-payments", 47);
      \u0275\u0275listener("dataChanged", function ContractDetailModalComponent_Template_app_contract_payments_dataChanged_121_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.refreshContractData());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(122, "div", 20)(123, "div", 48)(124, "p");
      \u0275\u0275text(125, "Contenido de Enganche en Pagos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(126, "div", 20)(127, "div", 49)(128, "div", 50)(129, "h4", 51);
      \u0275\u0275text(130, "Pagos de HOA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "app-button", 52);
      \u0275\u0275listener("clicked", function ContractDetailModalComponent_Template_app_button_clicked_131_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openGenerateHOADialog());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(132, "div", 20);
      \u0275\u0275element(133, "app-contract-documents", 53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(134, "div", 20)(135, "div", 54)(136, "div", 55)(137, "p", 56);
      \u0275\u0275text(138, "Descarga el estado de cuenta en formato PDF");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "button", 57);
      \u0275\u0275listener("click", function ContractDetailModalComponent_Template_button_click_139_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadStatement());
      });
      \u0275\u0275text(140, " \u{1F4E5} Descargar Estado de Cuenta ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(141, "div", 58)(142, "div", 59)(143, "app-button", 60);
      \u0275\u0275listener("clicked", function ContractDetailModalComponent_Template_app_button_clicked_143_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.deleteContract());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "div", 61);
      \u0275\u0275template(145, ContractDetailModalComponent_app_button_145_Template, 1, 1, "app-button", 62);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_32_0;
      const autoSeller_r9 = \u0275\u0275reference(104);
      \u0275\u0275classProp("dialog--wide", ctx.activeTab() === "payments");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Contrato ", ctx.data.contract.contract_number);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(91, _c12, ctx.data.contract.status === "activo", ctx.data.contract.status === "completado", ctx.data.contract.status === "cancelado", ctx.data.contract.status === "suspendido"));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 65, ctx.data.contract.status), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.data.contract.customer);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.data.contract.customer);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 67, ctx.data.contract.contract_date, "mediumDate"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(23, 70, ctx.data.contract.total_price, ctx.data.contract.currency));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 73, ctx.data.contract.down_payment, ctx.data.contract.currency));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(35, 76, ctx.data.contract.total_price - ctx.data.contract.remaining_balance, ctx.data.contract.currency));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.paymentStats());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(42, 79, ctx.data.contract.remaining_balance, ctx.data.contract.currency));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.data.contract.payment_months, " meses");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(53, 82, ctx.data.contract.monthly_payment, ctx.data.contract.currency));
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "edit");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "payments");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "down_payments");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "hoa");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "documents");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "statement");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.activeTab() === "edit");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(77, 85, ctx.data.contract.created_at, "medium"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(83, 88, ctx.data.contract.updated_at, "medium"));
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.data.contract.contract_number, " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.data.contract.property);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.data.contract.property);
      \u0275\u0275advance(5);
      \u0275\u0275property("placeholder", ctx.data.contract.seller ? "Buscar nuevo vendedor..." : "Buscar por nombre o email")("matAutocomplete", autoSeller_r9);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.data.contract.seller && ((tmp_32_0 = ctx.form.get("seller_search")) == null ? null : tmp_32_0.value));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.filteredVendors());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredVendors().length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["contract_date"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["total_price"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["down_payment"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["remaining_balance"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["payment_months"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["monthly_payment"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["first_payment_date"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["notes"]);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "payments");
      \u0275\u0275advance();
      \u0275\u0275property("contractId", ctx.data.contract.id)("currency", ctx.data.contract.currency);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "down_payments");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "hoa");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.activeTab() === "documents");
      \u0275\u0275advance();
      \u0275\u0275property("contractId", ctx.data.contract.id);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "statement");
      \u0275\u0275advance(9);
      \u0275\u0275property("loading", ctx.deleting());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.activeTab() === "edit");
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    MatTooltipModule,
    MatTooltip,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ContractDocumentsComponent,
    ContractPaymentsComponent,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    LocalDatePipe
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 90vw;\n  max-width: 1400px;\n  height: 90vh;\n  max-height: 95vh;\n  margin: 0.5rem auto;\n  display: flex;\n  flex-direction: column;\n  transition: max-width 0.3s ease;\n}\n.dialog.dialog--wide[_ngcontent-%COMP%] {\n  max-width: 1400px;\n}\n.dialog__header[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n}\n.dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.dialog__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.5rem 1rem;\n  min-height: 0;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  padding: 0.625rem 1rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.625rem;\n  flex-shrink: 0;\n}\n.dialog__footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger) {\n  background: transparent !important;\n  color: #dc2626 !important;\n  border: 2px solid #dc2626 !important;\n}\n.dialog__footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger):hover {\n  background: #fef2f2 !important;\n  border-color: #b91c1c !important;\n  color: #b91c1c !important;\n}\n.dialog__footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger):disabled {\n  background: transparent !important;\n  color: #fca5a5 !important;\n  border-color: #fca5a5 !important;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 0.5rem;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.tab.active[_ngcontent-%COMP%] {\n  color: #6366f1;\n  border-bottom-color: #6366f1;\n}\n.tab-content[_ngcontent-%COMP%] {\n  display: none;\n}\n.tab-content.active[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=contract-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-contract-detail-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      MatTooltipModule,
      MatAutocompleteModule,
      ContractDocumentsComponent,
      ContractPaymentsComponent,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="dialog" [class.dialog--wide]="activeTab() === 'payments'">\r
  <div class="dialog__header">\r
    <div class="flex-1">\r
      <div class="flex items-center gap-2 mb-2">\r
        <h2>Contrato {{ data.contract.contract_number }}</h2>\r
        <span \r
          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"\r
          [ngClass]="{\r
            'bg-green-100 text-green-800': data.contract.status === 'activo',\r
            'bg-blue-100 text-blue-800': data.contract.status === 'completado',\r
            'bg-red-100 text-red-800': data.contract.status === 'cancelado',\r
            'bg-yellow-100 text-yellow-800': data.contract.status === 'suspendido'\r
          }">\r
          {{ data.contract.status | titlecase }}\r
        </span>\r
        <span *ngIf="data.contract.customer" class="text-gray-400">\u2022</span>\r
        <span \r
          *ngIf="data.contract.customer"\r
          (click)="navigateToCustomer()"\r
          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors">\r
          {{ getCustomerName() }}\r
        </span>\r
      </div>\r
      \r
      <!-- Stats inline -->\r
      <div class="grid grid-cols-7 gap-3 text-xs pb-3">\r
        <div>\r
          <span class="block text-gray-500 font-medium">Fecha Contrato</span>\r
          <span class="text-gray-900 font-semibold">{{ data.contract.contract_date | localDate:'mediumDate' }}</span>\r
        </div>\r
        <div>\r
          <span class="block text-gray-500 font-medium">Precio Total</span>\r
          <span class="text-gray-900 font-semibold">{{ data.contract.total_price | currency:data.contract.currency }}</span>\r
        </div>\r
        <div>\r
          <span class="block text-gray-500 font-medium">Enganche</span>\r
          <span class="text-gray-900 font-semibold">{{ data.contract.down_payment | currency:data.contract.currency }}</span>\r
        </div>\r
        <div>\r
          <span class="block text-gray-500 font-medium">Total Pagado</span>\r
          <span class="text-green-600 font-semibold">{{ (data.contract.total_price - data.contract.remaining_balance) | currency:data.contract.currency }}</span>\r
        </div>\r
        <div>\r
          <span class="flex items-center gap-1 text-gray-500 font-medium">\r
            Saldo Pendiente\r
            <span \r
              *ngIf="paymentStats()"\r
              class="cursor-help text-gray-400 hover:text-gray-600"\r
              [matTooltip]="getPendingBreakdown()"\r
              matTooltipPosition="above"\r
              matTooltipShowDelay="100">\r
              \u24D8\r
            </span>\r
          </span>\r
          <span class="text-red-600 font-semibold">{{ data.contract.remaining_balance | currency:data.contract.currency }}</span>\r
        </div>\r
        <div>\r
          <span class="block text-gray-500 font-medium">Meses de Pago</span>\r
          <span class="text-gray-900 font-semibold">{{ data.contract.payment_months }} meses</span>\r
        </div>\r
        <div>\r
          <span class="block text-gray-500 font-medium">Pago Mensual</span>\r
          <span class="text-gray-900 font-semibold">{{ data.contract.monthly_payment | currency:data.contract.currency }}</span>\r
        </div>\r
      </div>\r
    </div>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="closeDialog()">\r
    </lucide-icon>\r
  </div>\r
\r
  <!-- Tabs -->\r
  <div class="tabs px-6 pt-2">\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'edit'"\r
      (click)="setActiveTab('edit')">\r
      Editar\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'payments'"\r
      (click)="setActiveTab('payments')">\r
      Pagos\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'down_payments'"\r
      (click)="setActiveTab('down_payments')">\r
      Enganche en Pagos\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'hoa'"\r
      (click)="setActiveTab('hoa')">\r
      HOA\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'documents'"\r
      (click)="setActiveTab('documents')">\r
      Documentos\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'statement'"\r
      (click)="setActiveTab('statement')">\r
      Estado de Cuenta\r
    </button>\r
  </div>\r
\r
  <div class="dialog__body">\r
    <!-- Tab: Editar -->\r
    <div class="tab-content" [class.active]="activeTab() === 'edit'">\r
      <!-- Fechas de Sistema -->\r
      <div class="mb-2 p-1.5 bg-gray-50 rounded-lg border border-gray-200">\r
        <div class="grid grid-cols-2 gap-2 text-xs">\r
          <div>\r
            <span class="block font-semibold text-gray-500 mb-0.5">Creado</span>\r
            <span class="text-gray-600">{{ data.contract.created_at | date:'medium' }}</span>\r
          </div>\r
          <div>\r
            <span class="block font-semibold text-gray-500 mb-0.5">Actualizado</span>\r
            <span class="text-gray-600">{{ data.contract.updated_at | date:'medium' }}</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="space-y-2.5" [formGroup]="form">\r
        <!-- N\xFAmero de Contrato y Lote (lado a lado) -->\r
        <div class="grid grid-cols-2 gap-2.5">\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">N\xFAmero de Contrato</span>\r
            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">\r
              {{ data.contract.contract_number }}\r
            </span>\r
          </div>\r
\r
          <div>\r
            <span class="block text-xs font-semibold text-gray-500 mb-1">Lote</span>\r
            <span \r
              *ngIf="data.contract.property"\r
              (click)="openPropertyModal()"\r
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors">\r
              {{ data.contract.property.code }}\r
            </span>\r
            <span *ngIf="!data.contract.property" class="text-gray-900">\u2014</span>\r
          </div>\r
        </div>\r
\r
        <!-- Vendido Por (Seller Autocomplete) -->\r
        <div>\r
          <label for="seller-search" class="block text-xs font-semibold text-gray-500 mb-1">Vendido Por</label>\r
          <div class="relative">\r
            <input\r
              #sellerAutocompleteTrigger="matAutocompleteTrigger"\r
              id="seller-search"\r
              type="text"\r
              formControlName="seller_search"\r
              [placeholder]="data.contract.seller ? 'Buscar nuevo vendedor...' : 'Buscar por nombre o email'"\r
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"\r
              (focus)="onSellerSearchFocus()"\r
              (blur)="onSellerSearchBlur()"\r
              [matAutocomplete]="autoSeller"\r
              aria-label="Buscar vendedor">\r
            <button\r
              type="button"\r
              *ngIf="data.contract.seller && form.get('seller_search')?.value"\r
              (click)="clearSeller()"\r
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600">\r
              \u2715\r
            </button>\r
          </div>\r
          <mat-autocomplete #autoSeller="matAutocomplete">\r
            <mat-option *ngFor="let seller of filteredVendors()" [value]="seller" (click)="onSellerSelected(seller)">\r
              {{ displaySeller(seller) }}\r
            </mat-option>\r
            <mat-option *ngIf="filteredVendors().length === 0" disabled>\r
              <span class="text-sm text-gray-500">No se encontraron vendedores</span>\r
            </mat-option>\r
          </mat-autocomplete>\r
        </div>\r
\r
        <div class="grid grid-cols-2 gap-2.5">\r
          <!-- Fecha del Contrato -->\r
          <app-input\r
            label="Fecha del Contrato"\r
            type="date"\r
            [form_control]="form.controls['contract_date']">\r
          </app-input>\r
\r
          <!-- Estado -->\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>\r
            <app-select [config]="statusSelectConfig"></app-select>\r
          </div>\r
\r
          <!-- Precio Total -->\r
          <app-input\r
            label="Precio Total"\r
            type="number"\r
            disabled="true"\r
            [form_control]="form.controls['total_price']">\r
          </app-input>\r
\r
          <!-- Enganche -->\r
          <app-input\r
            label="Enganche"\r
            type="number"\r
            disabled="true"\r
            [form_control]="form.controls['down_payment']">\r
          </app-input>\r
\r
          <!-- Saldo Pendiente -->\r
          <app-input\r
            label="Saldo Pendiente"\r
            type="number"\r
            [form_control]="form.controls['remaining_balance']">\r
          </app-input>\r
\r
          <!-- Meses de Pago -->\r
          <app-input\r
            label="Meses de Pago"\r
            type="number"\r
            [form_control]="form.controls['payment_months']">\r
          </app-input>\r
\r
          <!-- Pago Mensual -->\r
          <app-input\r
            label="Pago Mensual"\r
            type="number"\r
            [form_control]="form.controls['monthly_payment']">\r
          </app-input>\r
\r
          <!-- Fecha Primer Pago -->\r
          <app-input\r
            label="Fecha Primer Pago"\r
            type="date"\r
            [form_control]="form.controls['first_payment_date']">\r
          </app-input>\r
        </div>\r
\r
        <!-- Notas -->\r
        <app-input\r
          label="Notas"\r
          type="textarea"\r
          [form_control]="form.controls['notes']">\r
        </app-input>\r
      </div>\r
    </div>\r
\r
    <!-- Tab: Pagos -->\r
    <div class="tab-content" [class.active]="activeTab() === 'payments'">\r
      <app-contract-payments \r
        [contractId]="data.contract.id"\r
        [currency]="data.contract.currency"\r
        (dataChanged)="refreshContractData()">\r
      </app-contract-payments>\r
    </div>\r
\r
    <!-- Tab: Enganche en Pagos -->\r
    <div class="tab-content" [class.active]="activeTab() === 'down_payments'">\r
      <div class="p-6 text-center text-gray-500">\r
        <p>Contenido de Enganche en Pagos</p>\r
      </div>\r
    </div>\r
\r
    <!-- Tab: HOA -->\r
    <div class="tab-content" [class.active]="activeTab() === 'hoa'">\r
      <div class="p-6">\r
        <div class="flex items-center justify-between mb-4">\r
          <h4 class="text-base font-semibold text-gray-800">Pagos de HOA</h4>\r
          <app-button\r
            text="Generar Pagos"\r
            custom_class="btn_primary"\r
            size="sm"\r
            (clicked)="openGenerateHOADialog()">\r
          </app-button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Tab: Documentos -->\r
    <div class="tab-content" [class.active]="activeTab() === 'documents'">\r
      <app-contract-documents [contractId]="data.contract.id"></app-contract-documents>\r
    </div>\r
\r
    <!-- Tab: Estado de Cuenta -->\r
    <div class="tab-content" [class.active]="activeTab() === 'statement'">\r
      <div class="p-6 text-center">\r
        <div class="mb-4">\r
          <p class="text-gray-600 mb-4">Descarga el estado de cuenta en formato PDF</p>\r
          <button\r
            (click)="downloadStatement()"\r
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">\r
            \u{1F4E5} Descargar Estado de Cuenta\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog__footer">\r
    <div class="flex justify-between w-full">\r
      <!-- Bot\xF3n Eliminar a la izquierda -->\r
      <app-button\r
        text="Eliminar Contrato"\r
        variant="danger"\r
        customClass="btn-outline-danger"\r
        [loading]="deleting()"\r
        (clicked)="deleteContract()">\r
      </app-button>\r
      \r
      <!-- Bot\xF3n principal a la derecha -->\r
      <div class="flex gap-2">\r
        <app-button\r
          *ngIf="activeTab() === 'edit'"\r
          text="Guardar Cambios"\r
          custom_class="btn_primary"\r
          [loading]="saving()"\r
          (clicked)="saveContract()">\r
        </app-button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-detail-modal/contract-detail-modal.component.scss */\n.dialog {\n  width: 90vw;\n  max-width: 1400px;\n  height: 90vh;\n  max-height: 95vh;\n  margin: 0.5rem auto;\n  display: flex;\n  flex-direction: column;\n  transition: max-width 0.3s ease;\n}\n.dialog.dialog--wide {\n  max-width: 1400px;\n}\n.dialog__header {\n  padding: 0.5rem 1rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n}\n.dialog__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header .close {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.dialog__header .close:hover {\n  color: #111827;\n}\n.dialog__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.5rem 1rem;\n  min-height: 0;\n}\n.dialog__footer {\n  padding: 0.625rem 1rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.625rem;\n  flex-shrink: 0;\n}\n.dialog__footer :global(.btn-outline-danger) {\n  background: transparent !important;\n  color: #dc2626 !important;\n  border: 2px solid #dc2626 !important;\n}\n.dialog__footer :global(.btn-outline-danger):hover {\n  background: #fef2f2 !important;\n  border-color: #b91c1c !important;\n  color: #b91c1c !important;\n}\n.dialog__footer :global(.btn-outline-danger):disabled {\n  background: transparent !important;\n  color: #fca5a5 !important;\n  border-color: #fca5a5 !important;\n}\n.tabs {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 0.5rem;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.tab {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab:hover {\n  color: #111827;\n}\n.tab.active {\n  color: #6366f1;\n  border-bottom-color: #6366f1;\n}\n.tab-content {\n  display: none;\n}\n.tab-content.active {\n  display: block;\n}\n/*# sourceMappingURL=contract-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: Router }, { type: PropertyService }, { type: ContractService }, { type: PaymentService }, { type: UserService }, { type: InterceptorService }, { type: FormBuilder }, { type: ChangeDetectorRef }], { vendorAutocompleteTrigger: [{
    type: ViewChild,
    args: ["vendorAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDetailModalComponent, { className: "ContractDetailModalComponent", filePath: "src/app/features/contracts/components/contract-detail-modal/contract-detail-modal.component.ts", lineNumber: 46 });
})();

export {
  MatTooltip,
  MatTooltipModule,
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatAutocompleteModule,
  ContractService,
  ContractDetailModalComponent
};
//# sourceMappingURL=chunk-PBP4LXTZ.js.map

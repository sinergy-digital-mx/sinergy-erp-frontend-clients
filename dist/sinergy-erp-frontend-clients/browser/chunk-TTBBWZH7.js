import {
  ErrorStateMatcher,
  MAT_FORM_FIELD,
  MatFormFieldControl,
  MatFormFieldModule,
  MatSelectModule,
  _ErrorStateTracker
} from "./chunk-SWPKLNPW.js";
import {
  WarehouseService
} from "./chunk-E7QIYR5Q.js";
import {
  POSService
} from "./chunk-MGEJLMJK.js";
import {
  MatButton,
  MatButtonModule,
  getSupportedInputTypes
} from "./chunk-KNFYVOET.js";
import {
  BidiModule,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  Platform,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  coerceBooleanProperty,
  coerceElement,
  coerceNumberProperty
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControl,
  NgControlStatus,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  Validators,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  RendererFactory2,
  Subject,
  ViewEncapsulation,
  auditTime,
  booleanAttribute,
  effect,
  inject,
  isSignal,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
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
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// node_modules/@angular/cdk/fesm2022/text-field.mjs
var _CdkTextFieldStyleLoader = class __CdkTextFieldStyleLoader {
  static \u0275fac = function _CdkTextFieldStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkTextFieldStyleLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __CdkTextFieldStyleLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-text-field-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _CdkTextFieldStyleLoader_Template(rf, ctx) {
    },
    styles: ["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkTextFieldStyleLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "cdk-text-field-style-loader": ""
      },
      styles: ["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}\n"]
    }]
  }], null, null);
})();
var listenerOptions = {
  passive: true
};
var AutofillMonitor = class _AutofillMonitor {
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  _monitoredElements = /* @__PURE__ */ new Map();
  constructor() {
  }
  monitor(elementOrRef) {
    if (!this._platform.isBrowser) {
      return EMPTY;
    }
    this._styleLoader.load(_CdkTextFieldStyleLoader);
    const element = coerceElement(elementOrRef);
    const info = this._monitoredElements.get(element);
    if (info) {
      return info.subject;
    }
    const subject = new Subject();
    const cssClass = "cdk-text-field-autofilled";
    const listener = (event) => {
      if (event.animationName === "cdk-text-field-autofill-start" && !element.classList.contains(cssClass)) {
        element.classList.add(cssClass);
        this._ngZone.run(() => subject.next({
          target: event.target,
          isAutofilled: true
        }));
      } else if (event.animationName === "cdk-text-field-autofill-end" && element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
        this._ngZone.run(() => subject.next({
          target: event.target,
          isAutofilled: false
        }));
      }
    };
    const unlisten = this._ngZone.runOutsideAngular(() => {
      element.classList.add("cdk-text-field-autofill-monitored");
      return this._renderer.listen(element, "animationstart", listener, listenerOptions);
    });
    this._monitoredElements.set(element, {
      subject,
      unlisten
    });
    return subject;
  }
  stopMonitoring(elementOrRef) {
    const element = coerceElement(elementOrRef);
    const info = this._monitoredElements.get(element);
    if (info) {
      info.unlisten();
      info.subject.complete();
      element.classList.remove("cdk-text-field-autofill-monitored");
      element.classList.remove("cdk-text-field-autofilled");
      this._monitoredElements.delete(element);
    }
  }
  ngOnDestroy() {
    this._monitoredElements.forEach((_info, element) => this.stopMonitoring(element));
  }
  static \u0275fac = function AutofillMonitor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutofillMonitor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AutofillMonitor,
    factory: _AutofillMonitor.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutofillMonitor, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkAutofill = class _CdkAutofill {
  _elementRef = inject(ElementRef);
  _autofillMonitor = inject(AutofillMonitor);
  cdkAutofill = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    this._autofillMonitor.monitor(this._elementRef).subscribe((event) => this.cdkAutofill.emit(event));
  }
  ngOnDestroy() {
    this._autofillMonitor.stopMonitoring(this._elementRef);
  }
  static \u0275fac = function CdkAutofill_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAutofill)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAutofill,
    selectors: [["", "cdkAutofill", ""]],
    outputs: {
      cdkAutofill: "cdkAutofill"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAutofill, [{
    type: Directive,
    args: [{
      selector: "[cdkAutofill]"
    }]
  }], () => [], {
    cdkAutofill: [{
      type: Output
    }]
  });
})();
var CdkTextareaAutosize = class _CdkTextareaAutosize {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(Renderer2);
  _resizeEvents = new Subject();
  _previousValue;
  _initialHeight;
  _destroyed = new Subject();
  _listenerCleanups;
  _minRows;
  _maxRows;
  _enabled = true;
  _previousMinRows = -1;
  _textareaElement;
  get minRows() {
    return this._minRows;
  }
  set minRows(value) {
    this._minRows = coerceNumberProperty(value);
    this._setMinHeight();
  }
  get maxRows() {
    return this._maxRows;
  }
  set maxRows(value) {
    this._maxRows = coerceNumberProperty(value);
    this._setMaxHeight();
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    if (this._enabled !== value) {
      (this._enabled = value) ? this.resizeToFitContent(true) : this.reset();
    }
  }
  get placeholder() {
    return this._textareaElement.placeholder;
  }
  set placeholder(value) {
    this._cachedPlaceholderHeight = void 0;
    if (value) {
      this._textareaElement.setAttribute("placeholder", value);
    } else {
      this._textareaElement.removeAttribute("placeholder");
    }
    this._cacheTextareaPlaceholderHeight();
  }
  _cachedLineHeight;
  _cachedPlaceholderHeight;
  _document = inject(DOCUMENT);
  _hasFocus = false;
  _isViewInited = false;
  constructor() {
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_CdkTextFieldStyleLoader);
    this._textareaElement = this._elementRef.nativeElement;
  }
  _setMinHeight() {
    const minHeight = this.minRows && this._cachedLineHeight ? `${this.minRows * this._cachedLineHeight}px` : null;
    if (minHeight) {
      this._textareaElement.style.minHeight = minHeight;
    }
  }
  _setMaxHeight() {
    const maxHeight = this.maxRows && this._cachedLineHeight ? `${this.maxRows * this._cachedLineHeight}px` : null;
    if (maxHeight) {
      this._textareaElement.style.maxHeight = maxHeight;
    }
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._initialHeight = this._textareaElement.style.height;
      this.resizeToFitContent();
      this._ngZone.runOutsideAngular(() => {
        this._listenerCleanups = [this._renderer.listen("window", "resize", () => this._resizeEvents.next()), this._renderer.listen(this._textareaElement, "focus", this._handleFocusEvent), this._renderer.listen(this._textareaElement, "blur", this._handleFocusEvent)];
        this._resizeEvents.pipe(auditTime(16)).subscribe(() => {
          this._cachedLineHeight = this._cachedPlaceholderHeight = void 0;
          this.resizeToFitContent(true);
        });
      });
      this._isViewInited = true;
      this.resizeToFitContent(true);
    }
  }
  ngOnDestroy() {
    this._listenerCleanups?.forEach((cleanup) => cleanup());
    this._resizeEvents.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  _cacheTextareaLineHeight() {
    if (this._cachedLineHeight) {
      return;
    }
    const textareaClone = this._textareaElement.cloneNode(false);
    const cloneStyles = textareaClone.style;
    textareaClone.rows = 1;
    cloneStyles.position = "absolute";
    cloneStyles.visibility = "hidden";
    cloneStyles.border = "none";
    cloneStyles.padding = "0";
    cloneStyles.height = "";
    cloneStyles.minHeight = "";
    cloneStyles.maxHeight = "";
    cloneStyles.top = cloneStyles.bottom = cloneStyles.left = cloneStyles.right = "auto";
    cloneStyles.overflow = "hidden";
    this._textareaElement.parentNode.appendChild(textareaClone);
    this._cachedLineHeight = textareaClone.clientHeight;
    textareaClone.remove();
    this._setMinHeight();
    this._setMaxHeight();
  }
  _measureScrollHeight() {
    const element = this._textareaElement;
    const previousMargin = element.style.marginBottom || "";
    const isFirefox = this._platform.FIREFOX;
    const needsMarginFiller = this._hasFocus;
    const measuringClass = isFirefox ? "cdk-textarea-autosize-measuring-firefox" : "cdk-textarea-autosize-measuring";
    if (needsMarginFiller) {
      element.style.marginBottom = `${element.clientHeight}px`;
    }
    element.classList.add(measuringClass);
    const scrollHeight = element.scrollHeight - 4;
    element.classList.remove(measuringClass);
    if (needsMarginFiller) {
      element.style.marginBottom = previousMargin;
    }
    return scrollHeight;
  }
  _cacheTextareaPlaceholderHeight() {
    if (!this._isViewInited || this._cachedPlaceholderHeight != void 0) {
      return;
    }
    if (!this.placeholder) {
      this._cachedPlaceholderHeight = 0;
      return;
    }
    const value = this._textareaElement.value;
    this._textareaElement.value = this._textareaElement.placeholder;
    this._cachedPlaceholderHeight = this._measureScrollHeight();
    this._textareaElement.value = value;
  }
  _handleFocusEvent = (event) => {
    this._hasFocus = event.type === "focus";
  };
  ngDoCheck() {
    if (this._platform.isBrowser) {
      this.resizeToFitContent();
    }
  }
  resizeToFitContent(force = false) {
    if (!this._enabled) {
      return;
    }
    this._cacheTextareaLineHeight();
    this._cacheTextareaPlaceholderHeight();
    if (!this._cachedLineHeight) {
      return;
    }
    const textarea = this._elementRef.nativeElement;
    const value = textarea.value;
    if (!force && this._minRows === this._previousMinRows && value === this._previousValue) {
      return;
    }
    const scrollHeight = this._measureScrollHeight();
    const height = Math.max(scrollHeight, this._cachedPlaceholderHeight || 0);
    textarea.style.height = `${height}px`;
    this._ngZone.runOutsideAngular(() => {
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => this._scrollToCaretPosition(textarea));
      } else {
        setTimeout(() => this._scrollToCaretPosition(textarea));
      }
    });
    this._previousValue = value;
    this._previousMinRows = this._minRows;
  }
  reset() {
    if (this._initialHeight !== void 0) {
      this._textareaElement.style.height = this._initialHeight;
    }
  }
  _noopInputHandler() {
  }
  _scrollToCaretPosition(textarea) {
    const {
      selectionStart,
      selectionEnd
    } = textarea;
    if (!this._destroyed.isStopped && this._hasFocus) {
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }
  }
  static \u0275fac = function CdkTextareaAutosize_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTextareaAutosize)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTextareaAutosize,
    selectors: [["textarea", "cdkTextareaAutosize", ""]],
    hostAttrs: ["rows", "1", 1, "cdk-textarea-autosize"],
    hostBindings: function CdkTextareaAutosize_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function CdkTextareaAutosize_input_HostBindingHandler() {
          return ctx._noopInputHandler();
        });
      }
    },
    inputs: {
      minRows: [0, "cdkAutosizeMinRows", "minRows"],
      maxRows: [0, "cdkAutosizeMaxRows", "maxRows"],
      enabled: [2, "cdkTextareaAutosize", "enabled", booleanAttribute],
      placeholder: "placeholder"
    },
    exportAs: ["cdkTextareaAutosize"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTextareaAutosize, [{
    type: Directive,
    args: [{
      selector: "textarea[cdkTextareaAutosize]",
      exportAs: "cdkTextareaAutosize",
      host: {
        "class": "cdk-textarea-autosize",
        "rows": "1",
        "(input)": "_noopInputHandler()"
      }
    }]
  }], () => [], {
    minRows: [{
      type: Input,
      args: ["cdkAutosizeMinRows"]
    }],
    maxRows: [{
      type: Input,
      args: ["cdkAutosizeMaxRows"]
    }],
    enabled: [{
      type: Input,
      args: [{
        alias: "cdkTextareaAutosize",
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }]
  });
})();
var TextFieldModule = class _TextFieldModule {
  static \u0275fac = function TextFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextFieldModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TextFieldModule,
    imports: [CdkAutofill, CdkTextareaAutosize],
    exports: [CdkAutofill, CdkTextareaAutosize]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextFieldModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAutofill, CdkTextareaAutosize],
      exports: [CdkAutofill, CdkTextareaAutosize]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_input-value-accessor-chunk.mjs
var MAT_INPUT_VALUE_ACCESSOR = new InjectionToken("MAT_INPUT_VALUE_ACCESSOR");

// node_modules/@angular/material/fesm2022/input.mjs
function getMatInputUnsupportedTypeError(type) {
  return Error(`Input type "${type}" isn't supported by matInput.`);
}
var MAT_INPUT_INVALID_TYPES = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
var MAT_INPUT_CONFIG = new InjectionToken("MAT_INPUT_CONFIG");
var MatInput = class _MatInput {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  _autofillMonitor = inject(AutofillMonitor);
  _ngZone = inject(NgZone);
  _formField = inject(MAT_FORM_FIELD, {
    optional: true
  });
  _renderer = inject(Renderer2);
  _uid = inject(_IdGenerator).getId("mat-input-");
  _previousNativeValue;
  _inputValueAccessor;
  _signalBasedValueAccessor;
  _previousPlaceholder = null;
  _errorStateTracker;
  _config = inject(MAT_INPUT_CONFIG, {
    optional: true
  });
  _cleanupIosKeyup;
  _cleanupWebkitWheel;
  _isServer = false;
  _isNativeSelect = false;
  _isTextarea = false;
  _isInFormField = false;
  focused = false;
  stateChanges = new Subject();
  controlType = "mat-input";
  autofilled = false;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  _disabled = false;
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value || this._uid;
  }
  _id;
  placeholder;
  name;
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  _required;
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value || "text";
    this._validateType();
    if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
      this._elementRef.nativeElement.type = this._type;
    }
  }
  _type = "text";
  get errorStateMatcher() {
    return this._errorStateTracker.matcher;
  }
  set errorStateMatcher(value) {
    this._errorStateTracker.matcher = value;
  }
  userAriaDescribedBy;
  get value() {
    return this._signalBasedValueAccessor ? this._signalBasedValueAccessor.value() : this._inputValueAccessor.value;
  }
  set value(value) {
    if (value !== this.value) {
      if (this._signalBasedValueAccessor) {
        this._signalBasedValueAccessor.value.set(value);
      } else {
        this._inputValueAccessor.value = value;
      }
      this.stateChanges.next();
    }
  }
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }
  _readonly = false;
  disabledInteractive;
  get errorState() {
    return this._errorStateTracker.errorState;
  }
  set errorState(value) {
    this._errorStateTracker.errorState = value;
  }
  _neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter((t) => getSupportedInputTypes().has(t));
  constructor() {
    const parentForm = inject(NgForm, {
      optional: true
    });
    const parentFormGroup = inject(FormGroupDirective, {
      optional: true
    });
    const defaultErrorStateMatcher = inject(ErrorStateMatcher);
    const accessor = inject(MAT_INPUT_VALUE_ACCESSOR, {
      optional: true,
      self: true
    });
    const element = this._elementRef.nativeElement;
    const nodeName = element.nodeName.toLowerCase();
    if (accessor) {
      if (isSignal(accessor.value)) {
        this._signalBasedValueAccessor = accessor;
      } else {
        this._inputValueAccessor = accessor;
      }
    } else {
      this._inputValueAccessor = element;
    }
    this._previousNativeValue = this.value;
    this.id = this.id;
    if (this._platform.IOS) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupIosKeyup = this._renderer.listen(element, "keyup", this._iOSKeyupListener);
      });
    }
    this._errorStateTracker = new _ErrorStateTracker(defaultErrorStateMatcher, this.ngControl, parentFormGroup, parentForm, this.stateChanges);
    this._isServer = !this._platform.isBrowser;
    this._isNativeSelect = nodeName === "select";
    this._isTextarea = nodeName === "textarea";
    this._isInFormField = !!this._formField;
    this.disabledInteractive = this._config?.disabledInteractive || false;
    if (this._isNativeSelect) {
      this.controlType = element.multiple ? "mat-native-select-multiple" : "mat-native-select";
    }
    if (this._signalBasedValueAccessor) {
      effect(() => {
        this._signalBasedValueAccessor.value();
        this.stateChanges.next();
      });
    }
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
        this.autofilled = event.isAutofilled;
        this.stateChanges.next();
      });
    }
  }
  ngOnChanges() {
    this.stateChanges.next();
  }
  ngOnDestroy() {
    this.stateChanges.complete();
    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    this._cleanupIosKeyup?.();
    this._cleanupWebkitWheel?.();
  }
  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
      if (this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled) {
        this.disabled = this.ngControl.disabled;
        this.stateChanges.next();
      }
    }
    this._dirtyCheckNativeValue();
    this._dirtyCheckPlaceholder();
  }
  focus(options) {
    this._elementRef.nativeElement.focus(options);
  }
  updateErrorState() {
    this._errorStateTracker.updateErrorState();
  }
  _focusChanged(isFocused) {
    if (isFocused === this.focused) {
      return;
    }
    if (!this._isNativeSelect && isFocused && this.disabled && this.disabledInteractive) {
      const element = this._elementRef.nativeElement;
      if (element.type === "number") {
        element.type = "text";
        element.setSelectionRange(0, 0);
        element.type = "number";
      } else {
        element.setSelectionRange(0, 0);
      }
    }
    this.focused = isFocused;
    this.stateChanges.next();
  }
  _onInput() {
  }
  _dirtyCheckNativeValue() {
    const newValue = this._elementRef.nativeElement.value;
    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }
  _dirtyCheckPlaceholder() {
    const placeholder = this._getPlaceholder();
    if (placeholder !== this._previousPlaceholder) {
      const element = this._elementRef.nativeElement;
      this._previousPlaceholder = placeholder;
      placeholder ? element.setAttribute("placeholder", placeholder) : element.removeAttribute("placeholder");
    }
  }
  _getPlaceholder() {
    return this.placeholder || null;
  }
  _validateType() {
    if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatInputUnsupportedTypeError(this._type);
    }
  }
  _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }
  _isBadInput() {
    let validity = this._elementRef.nativeElement.validity;
    return validity && validity.badInput;
  }
  get empty() {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
  }
  get shouldLabelFloat() {
    if (this._isNativeSelect) {
      const selectElement = this._elementRef.nativeElement;
      const firstOption = selectElement.options[0];
      return this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label);
    } else {
      return this.focused && !this.disabled || !this.empty;
    }
  }
  get describedByIds() {
    const element = this._elementRef.nativeElement;
    const existingDescribedBy = element.getAttribute("aria-describedby");
    return existingDescribedBy?.split(" ") || [];
  }
  setDescribedByIds(ids) {
    const element = this._elementRef.nativeElement;
    if (ids.length) {
      element.setAttribute("aria-describedby", ids.join(" "));
    } else {
      element.removeAttribute("aria-describedby");
    }
  }
  onContainerClick() {
    if (!this.focused) {
      this.focus();
    }
  }
  _isInlineSelect() {
    const element = this._elementRef.nativeElement;
    return this._isNativeSelect && (element.multiple || element.size > 1);
  }
  _iOSKeyupListener = (event) => {
    const el = event.target;
    if (!el.value && el.selectionStart === 0 && el.selectionEnd === 0) {
      el.setSelectionRange(1, 1);
      el.setSelectionRange(0, 0);
    }
  };
  _getReadonlyAttribute() {
    if (this._isNativeSelect) {
      return null;
    }
    if (this.readonly || this.disabled && this.disabledInteractive) {
      return "true";
    }
    return null;
  }
  static \u0275fac = function MatInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatInput)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatInput,
    selectors: [["input", "matInput", ""], ["textarea", "matInput", ""], ["select", "matNativeControl", ""], ["input", "matNativeControl", ""], ["textarea", "matNativeControl", ""]],
    hostAttrs: [1, "mat-mdc-input-element"],
    hostVars: 21,
    hostBindings: function MatInput_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focus", function MatInput_focus_HostBindingHandler() {
          return ctx._focusChanged(true);
        })("blur", function MatInput_blur_HostBindingHandler() {
          return ctx._focusChanged(false);
        })("input", function MatInput_input_HostBindingHandler() {
          return ctx._onInput();
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id)("disabled", ctx.disabled && !ctx.disabledInteractive)("required", ctx.required);
        \u0275\u0275attribute("name", ctx.name || null)("readonly", ctx._getReadonlyAttribute())("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null)("aria-invalid", ctx.empty && ctx.required ? null : ctx.errorState)("aria-required", ctx.required)("id", ctx.id);
        \u0275\u0275classProp("mat-input-server", ctx._isServer)("mat-mdc-form-field-textarea-control", ctx._isInFormField && ctx._isTextarea)("mat-mdc-form-field-input-control", ctx._isInFormField)("mat-mdc-input-disabled-interactive", ctx.disabledInteractive)("mdc-text-field__input", ctx._isInFormField)("mat-mdc-native-select-inline", ctx._isInlineSelect());
      }
    },
    inputs: {
      disabled: "disabled",
      id: "id",
      placeholder: "placeholder",
      name: "name",
      required: "required",
      type: "type",
      errorStateMatcher: "errorStateMatcher",
      userAriaDescribedBy: [0, "aria-describedby", "userAriaDescribedBy"],
      value: "value",
      readonly: "readonly",
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
    },
    exportAs: ["matInput"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatFormFieldControl,
      useExisting: _MatInput
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatInput, [{
    type: Directive,
    args: [{
      selector: `input[matInput], textarea[matInput], select[matNativeControl],
      input[matNativeControl], textarea[matNativeControl]`,
      exportAs: "matInput",
      host: {
        "class": "mat-mdc-input-element",
        "[class.mat-input-server]": "_isServer",
        "[class.mat-mdc-form-field-textarea-control]": "_isInFormField && _isTextarea",
        "[class.mat-mdc-form-field-input-control]": "_isInFormField",
        "[class.mat-mdc-input-disabled-interactive]": "disabledInteractive",
        "[class.mdc-text-field__input]": "_isInFormField",
        "[class.mat-mdc-native-select-inline]": "_isInlineSelect()",
        "[id]": "id",
        "[disabled]": "disabled && !disabledInteractive",
        "[required]": "required",
        "[attr.name]": "name || null",
        "[attr.readonly]": "_getReadonlyAttribute()",
        "[attr.aria-disabled]": 'disabled && disabledInteractive ? "true" : null',
        "[attr.aria-invalid]": "(empty && required) ? null : errorState",
        "[attr.aria-required]": "required",
        "[attr.id]": "id",
        "(focus)": "_focusChanged(true)",
        "(blur)": "_focusChanged(false)",
        "(input)": "_onInput()"
      },
      providers: [{
        provide: MatFormFieldControl,
        useExisting: MatInput
      }]
    }]
  }], () => [], {
    disabled: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    errorStateMatcher: [{
      type: Input
    }],
    userAriaDescribedBy: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    value: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatInputModule = class _MatInputModule {
  static \u0275fac = function MatInputModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatInputModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatInputModule,
    imports: [MatFormFieldModule, MatInput],
    exports: [MatInput, MatFormFieldModule, TextFieldModule, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatFormFieldModule, MatFormFieldModule, TextFieldModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatInputModule, [{
    type: NgModule,
    args: [{
      imports: [MatFormFieldModule, MatInput],
      exports: [MatInput, MatFormFieldModule, TextFieldModule, BidiModule]
    }]
  }], null, null);
})();

// src/app/features/pos/components/open-shift-dialog/open-shift-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OpenShiftDialogComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Cargando almacenes...");
    \u0275\u0275elementEnd();
  }
}
function OpenShiftDialogComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r1 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(warehouse_r1.name);
  }
}
function OpenShiftDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "No se encontraron almacenes");
    \u0275\u0275elementEnd();
  }
}
var OpenShiftDialogComponent = class _OpenShiftDialogComponent {
  dialogRef;
  warehouseService;
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  selectedWarehouseId = signal("", ...ngDevMode ? [{ debugName: "selectedWarehouseId" }] : []);
  openingBalance = signal(1e3, ...ngDevMode ? [{ debugName: "openingBalance" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  constructor(dialogRef, warehouseService) {
    this.dialogRef = dialogRef;
    this.warehouseService = warehouseService;
  }
  ngOnInit() {
    this.loadWarehouses();
    const lastWarehouse = localStorage.getItem("pos_warehouse_id");
    if (lastWarehouse) {
      this.selectedWarehouseId.set(lastWarehouse);
    }
  }
  loadWarehouses() {
    this.loading.set(true);
    this.warehouseService.getWarehouses().subscribe({
      next: (response) => {
        console.log("Warehouse response:", response);
        const warehousesList = response.data || [];
        console.log("Warehouses list:", warehousesList);
        this.warehouses.set(warehousesList);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error loading warehouses:", error);
        this.loading.set(false);
      }
    });
  }
  onConfirm() {
    if (!this.selectedWarehouseId() || this.openingBalance() < 0) {
      return;
    }
    this.dialogRef.close({
      warehouse_id: this.selectedWarehouseId(),
      opening_balance: this.openingBalance(),
      notes: this.notes()
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function OpenShiftDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OpenShiftDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(WarehouseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OpenShiftDialogComponent, selectors: [["app-open-shift-dialog"]], decls: 38, vars: 7, consts: [[1, "dialog-container"], ["mat-dialog-title", ""], [1, "form-content"], [1, "form-field"], ["for", "warehouse"], [1, "loading-message"], ["id", "warehouse", "required", "", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], [1, "error-message"], ["for", "balance"], [1, "currency-input"], [1, "currency-symbol"], ["type", "number", "id", "balance", "min", "0", "step", "0.01", "required", "", 3, "ngModelChange", "ngModel"], ["for", "notes"], ["id", "notes", "rows", "3", "placeholder", "Ej: Turno matutino, Caja principal, etc.", 3, "ngModelChange", "ngModel"], [1, "info-message"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "16", "x2", "12", "y2", "12"], ["x1", "12", "y1", "8", "x2", "12.01", "y2", "8"], ["align", "end"], ["mat-button", "", 1, "btn-cancel", 3, "click"], ["mat-raised-button", "", 1, "btn-confirm", 3, "click", "disabled"]], template: function OpenShiftDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Abrir Turno de Caja");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "mat-dialog-content")(4, "div", 2)(5, "div", 3)(6, "label", 4);
      \u0275\u0275text(7, "Almac\xE9n *");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, OpenShiftDialogComponent_Conditional_8_Template, 2, 0, "div", 5);
      \u0275\u0275elementStart(9, "select", 6);
      \u0275\u0275listener("ngModelChange", function OpenShiftDialogComponent_Template_select_ngModelChange_9_listener($event) {
        return ctx.selectedWarehouseId.set($event);
      });
      \u0275\u0275elementStart(10, "option", 7);
      \u0275\u0275text(11, "Selecciona un almac\xE9n");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(12, OpenShiftDialogComponent_For_13_Template, 2, 2, "option", 8, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, OpenShiftDialogComponent_Conditional_14_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 3)(16, "label", 10);
      \u0275\u0275text(17, "Monto Inicial de Efectivo *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 11)(19, "span", 12);
      \u0275\u0275text(20, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 13);
      \u0275\u0275listener("ngModelChange", function OpenShiftDialogComponent_Template_input_ngModelChange_21_listener($event) {
        return ctx.openingBalance.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 3)(23, "label", 14);
      \u0275\u0275text(24, "Notas (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "textarea", 15);
      \u0275\u0275listener("ngModelChange", function OpenShiftDialogComponent_Template_textarea_ngModelChange_25_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 16);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(27, "svg", 17);
      \u0275\u0275element(28, "circle", 18)(29, "line", 19)(30, "line", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32, "El turno se asociar\xE1 autom\xE1ticamente a tu usuario. Aseg\xFArate de contar el efectivo inicial antes de abrir el turno.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(33, "mat-dialog-actions", 21)(34, "button", 22);
      \u0275\u0275listener("click", function OpenShiftDialogComponent_Template_button_click_34_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(35, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 23);
      \u0275\u0275listener("click", function OpenShiftDialogComponent_Template_button_click_36_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275text(37, " Abrir Turno ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.loading() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.selectedWarehouseId())("disabled", ctx.loading());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading() && ctx.warehouses().length === 0 ? 14 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.openingBalance());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.notes());
      \u0275\u0275advance(11);
      \u0275\u0275property("disabled", !ctx.selectedWarehouseId() || ctx.openingBalance() < 0);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    RequiredValidator,
    MinValidator,
    NgModel,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  min-width: 500px;\n  max-width: 600px;\n}\n.dialog-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n  padding: 1.5rem 1.5rem 1rem;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  padding: 0 1.5rem 1.5rem;\n  overflow-y: auto;\n  max-height: 70vh;\n}\n.form-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-family: inherit;\n  transition: border-color 0.2s;\n}\n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background: #f9fafb;\n  cursor: not-allowed;\n}\n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n  background: white;\n}\n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-field[_ngcontent-%COMP%]   .loading-message[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 8px;\n  color: #0369a1;\n  font-size: 0.875rem;\n  text-align: center;\n}\n.form-field[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 0.875rem;\n  text-align: center;\n}\n.currency-input[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-input[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1rem;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #667eea;\n  pointer-events: none;\n}\n.currency-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 2.5rem;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.info-message[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  padding: 1rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 8px;\n}\n.info-message[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #3b82f6;\n  margin-top: 0.125rem;\n}\n.info-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #1e40af;\n  line-height: 1.5;\n}\nmat-dialog-actions[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  margin: 0;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 640px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n  mat-dialog-content[_ngcontent-%COMP%] {\n    max-height: 60vh;\n  }\n}\n/*# sourceMappingURL=open-shift-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OpenShiftDialogComponent, [{
    type: Component,
    args: [{ selector: "app-open-shift-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule
    ], template: '<div class="dialog-container">\r\n  <h2 mat-dialog-title>Abrir Turno de Caja</h2>\r\n  \r\n  <mat-dialog-content>\r\n    <div class="form-content">\r\n      <!-- Warehouse Selection -->\r\n      <div class="form-field">\r\n        <label for="warehouse">Almac\xE9n *</label>\r\n        @if (loading()) {\r\n          <div class="loading-message">Cargando almacenes...</div>\r\n        }\r\n        <select \r\n          id="warehouse"\r\n          [ngModel]="selectedWarehouseId()"\r\n          (ngModelChange)="selectedWarehouseId.set($event)"\r\n          [disabled]="loading()"\r\n          required\r\n        >\r\n          <option value="">Selecciona un almac\xE9n</option>\r\n          @for (warehouse of warehouses(); track warehouse.id) {\r\n            <option [value]="warehouse.id">{{ warehouse.name }}</option>\r\n          }\r\n        </select>\r\n        @if (!loading() && warehouses().length === 0) {\r\n          <div class="error-message">No se encontraron almacenes</div>\r\n        }\r\n      </div>\r\n\r\n      <!-- Opening Balance -->\r\n      <div class="form-field">\r\n        <label for="balance">Monto Inicial de Efectivo *</label>\r\n        <div class="currency-input">\r\n          <span class="currency-symbol">$</span>\r\n          <input \r\n            type="number" \r\n            id="balance"\r\n            [ngModel]="openingBalance()"\r\n            (ngModelChange)="openingBalance.set($event)"\r\n            min="0"\r\n            step="0.01"\r\n            required\r\n          />\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Notes -->\r\n      <div class="form-field">\r\n        <label for="notes">Notas (opcional)</label>\r\n        <textarea \r\n          id="notes"\r\n          [ngModel]="notes()"\r\n          (ngModelChange)="notes.set($event)"\r\n          rows="3"\r\n          placeholder="Ej: Turno matutino, Caja principal, etc."\r\n        ></textarea>\r\n      </div>\r\n\r\n      <div class="info-message">\r\n        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r\n          <circle cx="12" cy="12" r="10"></circle>\r\n          <line x1="12" y1="16" x2="12" y2="12"></line>\r\n          <line x1="12" y1="8" x2="12.01" y2="8"></line>\r\n        </svg>\r\n        <p>El turno se asociar\xE1 autom\xE1ticamente a tu usuario. Aseg\xFArate de contar el efectivo inicial antes de abrir el turno.</p>\r\n      </div>\r\n    </div>\r\n  </mat-dialog-content>\r\n\r\n  <mat-dialog-actions align="end">\r\n    <button \r\n      mat-button \r\n      (click)="onCancel()"\r\n      class="btn-cancel"\r\n    >\r\n      Cancelar\r\n    </button>\r\n    <button \r\n      mat-raised-button \r\n      (click)="onConfirm()"\r\n      class="btn-confirm"\r\n      [disabled]="!selectedWarehouseId() || openingBalance() < 0"\r\n    >\r\n      Abrir Turno\r\n    </button>\r\n  </mat-dialog-actions>\r\n</div>\r\n', styles: ["/* src/app/features/pos/components/open-shift-dialog/open-shift-dialog.component.scss */\n.dialog-container {\n  min-width: 500px;\n  max-width: 600px;\n}\n.dialog-container h2 {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n  padding: 1.5rem 1.5rem 1rem;\n}\nmat-dialog-content {\n  padding: 0 1.5rem 1.5rem;\n  overflow-y: auto;\n  max-height: 70vh;\n}\n.form-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.form-field select,\n.form-field input,\n.form-field textarea {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-family: inherit;\n  transition: border-color 0.2s;\n}\n.form-field select:focus,\n.form-field input:focus,\n.form-field textarea:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-field select:disabled,\n.form-field input:disabled,\n.form-field textarea:disabled {\n  background: #f9fafb;\n  cursor: not-allowed;\n}\n.form-field select {\n  cursor: pointer;\n  background: white;\n}\n.form-field textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-field .loading-message {\n  padding: 0.75rem 1rem;\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 8px;\n  color: #0369a1;\n  font-size: 0.875rem;\n  text-align: center;\n}\n.form-field .error-message {\n  padding: 0.75rem 1rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 0.875rem;\n  text-align: center;\n}\n.currency-input {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-input .currency-symbol {\n  position: absolute;\n  left: 1rem;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #667eea;\n  pointer-events: none;\n}\n.currency-input input {\n  padding-left: 2.5rem;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.info-message {\n  display: flex;\n  gap: 0.75rem;\n  padding: 1rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 8px;\n}\n.info-message svg {\n  flex-shrink: 0;\n  color: #3b82f6;\n  margin-top: 0.125rem;\n}\n.info-message p {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #1e40af;\n  line-height: 1.5;\n}\nmat-dialog-actions {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  margin: 0;\n}\nmat-dialog-actions button {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\nmat-dialog-actions .btn-cancel {\n  color: #6b7280;\n}\nmat-dialog-actions .btn-cancel:hover {\n  background: #f9fafb;\n}\nmat-dialog-actions .btn-confirm {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\nmat-dialog-actions .btn-confirm:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\nmat-dialog-actions .btn-confirm:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 640px) {\n  .dialog-container {\n    min-width: auto;\n    width: 100%;\n  }\n  mat-dialog-content {\n    max-height: 60vh;\n  }\n}\n/*# sourceMappingURL=open-shift-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: WarehouseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OpenShiftDialogComponent, { className: "OpenShiftDialogComponent", filePath: "src/app/features/pos/components/open-shift-dialog/open-shift-dialog.component.ts", lineNumber: 26 });
})();

// src/app/features/pos/components/close-shift-dialog/close-shift-dialog.component.ts
function CloseShiftDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "div", 28);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando reporte del turno...");
    \u0275\u0275elementEnd()();
  }
}
function CloseShiftDialogComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h3");
    \u0275\u0275text(2, "Resumen de Ventas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 5)(4, "div", 6)(5, "span", 7);
    \u0275\u0275text(6, "Total \xD3rdenes:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
    \u0275\u0275text(11, "Ventas Totales:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 6)(15, "span", 7);
    \u0275\u0275text(16, "Impuestos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 8);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 6)(20, "span", 7);
    \u0275\u0275text(21, "Propinas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 8);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.shiftReport().sales_summary.total_orders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().sales_summary.total_sales));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().sales_summary.total_tax));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().sales_summary.total_tips));
  }
}
function CloseShiftDialogComponent_Conditional_31_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "\u{1F4B5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32)(4, "span", 33);
    \u0275\u0275text(5, "Efectivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.shiftReport().payments_by_method.cash.count, " pagos");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().payments_by_method.cash.total));
  }
}
function CloseShiftDialogComponent_Conditional_31_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32)(4, "span", 33);
    \u0275\u0275text(5, "Tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.shiftReport().payments_by_method.card.count, " pagos");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().payments_by_method.card.total));
  }
}
function CloseShiftDialogComponent_Conditional_31_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "\u{1F3E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32)(4, "span", 33);
    \u0275\u0275text(5, "Transferencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.shiftReport().payments_by_method.transfer.count, " pagos");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.shiftReport().payments_by_method.transfer.total));
  }
}
function CloseShiftDialogComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3");
    \u0275\u0275text(2, "Pagos por M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29);
    \u0275\u0275conditionalCreate(4, CloseShiftDialogComponent_Conditional_31_Conditional_4_Template, 10, 2, "div", 30);
    \u0275\u0275conditionalCreate(5, CloseShiftDialogComponent_Conditional_31_Conditional_5_Template, 10, 2, "div", 30);
    \u0275\u0275conditionalCreate(6, CloseShiftDialogComponent_Conditional_31_Conditional_6_Template, 10, 2, "div", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.shiftReport().payments_by_method.cash ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftReport().payments_by_method.card ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftReport().payments_by_method.transfer ? 6 : -1);
  }
}
function CloseShiftDialogComponent_Conditional_41_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 40)(2, "polyline", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Cuadre Exacto");
    \u0275\u0275elementEnd();
  }
}
function CloseShiftDialogComponent_Conditional_41_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "circle", 42)(2, "line", 43)(3, "line", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Sobrante");
    \u0275\u0275elementEnd();
  }
}
function CloseShiftDialogComponent_Conditional_41_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "circle", 42)(2, "line", 45)(3, "line", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Faltante");
    \u0275\u0275elementEnd();
  }
}
function CloseShiftDialogComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37);
    \u0275\u0275conditionalCreate(2, CloseShiftDialogComponent_Conditional_41_Conditional_2_Template, 5, 0)(3, CloseShiftDialogComponent_Conditional_41_Conditional_3_Template, 6, 0)(4, CloseShiftDialogComponent_Conditional_41_Conditional_4_Template, 6, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.differenceType);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.differenceType === "exact" ? 2 : ctx_r0.differenceType === "surplus" ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(ctx_r0.Math.abs(ctx_r0.difference)), " ");
  }
}
var CloseShiftDialogComponent = class _CloseShiftDialogComponent {
  dialogRef;
  data;
  posService;
  closingBalance = signal(0, ...ngDevMode ? [{ debugName: "closingBalance" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  shiftReport = signal(null, ...ngDevMode ? [{ debugName: "shiftReport" }] : []);
  loadingReport = signal(false, ...ngDevMode ? [{ debugName: "loadingReport" }] : []);
  Math = Math;
  // Expose Math to template
  parseFloat = parseFloat;
  // Expose parseFloat to template
  constructor(dialogRef, data, posService) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.posService = posService;
    console.log("Close Shift Dialog - Shift data:", data.shift);
    console.log("Close Shift Dialog - initial_cash:", data.shift?.initial_cash);
    console.log("Close Shift Dialog - initial_cash type:", typeof data.shift?.initial_cash);
    if (data.shift?.initial_cash) {
      const parsedValue = parseFloat(data.shift.initial_cash);
      console.log("Close Shift Dialog - Parsed initial_cash:", parsedValue);
      this.closingBalance.set(parsedValue);
    }
  }
  ngOnInit() {
    this.loadShiftReport();
  }
  loadShiftReport() {
    if (!this.data.shift?.id) {
      return;
    }
    this.loadingReport.set(true);
    this.posService.getCashShiftReport(this.data.shift.id).subscribe({
      next: (report) => {
        console.log("Shift report loaded:", report);
        this.shiftReport.set(report);
        if (report.cash_summary?.expected_cash) {
          this.closingBalance.set(report.cash_summary.expected_cash);
        }
        this.loadingReport.set(false);
      },
      error: (error) => {
        console.error("Error loading shift report:", error);
        this.loadingReport.set(false);
      }
    });
  }
  get shift() {
    return this.data.shift;
  }
  get expectedCash() {
    const report = this.shiftReport();
    if (report?.cash_summary?.expected_cash) {
      return parseFloat(report.cash_summary.expected_cash);
    }
    if (this.shift?.expected_cash) {
      return parseFloat(this.shift.expected_cash);
    }
    return this.shift?.initial_cash ? parseFloat(this.shift.initial_cash) : 0;
  }
  get difference() {
    return this.closingBalance() - this.expectedCash;
  }
  get differenceType() {
    const diff = this.difference;
    if (diff > 0)
      return "surplus";
    if (diff < 0)
      return "shortage";
    return "exact";
  }
  onConfirm() {
    if (this.closingBalance() < 0) {
      return;
    }
    this.dialogRef.close({
      closing_balance: this.closingBalance(),
      notes: this.notes()
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  formatDate(date) {
    return new Date(date).toLocaleString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  static \u0275fac = function CloseShiftDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CloseShiftDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(POSService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CloseShiftDialogComponent, selectors: [["app-close-shift-dialog"]], decls: 58, vars: 11, consts: [[1, "dialog-container"], ["mat-dialog-title", ""], [1, "form-content"], [1, "loading-state"], [1, "shift-summary"], [1, "summary-grid"], [1, "summary-item"], [1, "label"], [1, "value"], [1, "sales-summary"], [1, "payments-summary"], [1, "form-field"], ["for", "closing-balance"], [1, "field-description"], [1, "currency-input"], [1, "currency-symbol"], ["type", "number", "id", "closing-balance", "min", "0", "step", "0.01", "required", "", "autofocus", "", 3, "ngModelChange", "ngModel"], [1, "difference-display", 3, "class"], ["for", "notes"], ["id", "notes", "rows", "3", "placeholder", "Ej: Billetes rotos, gastos menores, observaciones...", 3, "ngModelChange", "ngModel"], [1, "warning-message"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["align", "end"], ["mat-button", "", 1, "btn-cancel", 3, "click"], ["mat-raised-button", "", 1, "btn-confirm", 3, "click", "disabled"], [1, "spinner"], [1, "payment-methods"], [1, "payment-method-item"], [1, "method-icon"], [1, "method-details"], [1, "method-name"], [1, "method-count"], [1, "method-total"], [1, "difference-display"], [1, "difference-header"], [1, "difference-amount"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 10 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["x1", "15", "y1", "9", "x2", "9", "y2", "15"], ["x1", "9", "y1", "9", "x2", "15", "y2", "15"]], template: function CloseShiftDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Cerrar Turno de Caja");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "mat-dialog-content")(4, "div", 2);
      \u0275\u0275conditionalCreate(5, CloseShiftDialogComponent_Conditional_5_Template, 4, 0, "div", 3);
      \u0275\u0275elementStart(6, "div", 4)(7, "h3");
      \u0275\u0275text(8, "Informaci\xF3n del Turno");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5)(10, "div", 6)(11, "span", 7);
      \u0275\u0275text(12, "Turno ID:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 8);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 6)(16, "span", 7);
      \u0275\u0275text(17, "Apertura:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 8);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 6)(21, "span", 7);
      \u0275\u0275text(22, "Efectivo Inicial:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 8);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 6)(26, "span", 7);
      \u0275\u0275text(27, "Efectivo Esperado:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 8);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(30, CloseShiftDialogComponent_Conditional_30_Template, 24, 4, "div", 9);
      \u0275\u0275conditionalCreate(31, CloseShiftDialogComponent_Conditional_31_Template, 7, 3, "div", 10);
      \u0275\u0275elementStart(32, "div", 11)(33, "label", 12);
      \u0275\u0275text(34, "Efectivo Final Contado *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p", 13);
      \u0275\u0275text(36, "Cuenta el efectivo f\xEDsico en la caja y registra el monto total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 14)(38, "span", 15);
      \u0275\u0275text(39, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "input", 16);
      \u0275\u0275listener("ngModelChange", function CloseShiftDialogComponent_Template_input_ngModelChange_40_listener($event) {
        return ctx.closingBalance.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(41, CloseShiftDialogComponent_Conditional_41_Template, 7, 4, "div", 17);
      \u0275\u0275elementStart(42, "div", 11)(43, "label", 18);
      \u0275\u0275text(44, "Notas (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "textarea", 19);
      \u0275\u0275listener("ngModelChange", function CloseShiftDialogComponent_Template_textarea_ngModelChange_45_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 20);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(47, "svg", 21);
      \u0275\u0275element(48, "path", 22)(49, "line", 23)(50, "line", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(51, "p");
      \u0275\u0275text(52, "Esta acci\xF3n no se puede deshacer. Aseg\xFArate de haber contado correctamente el efectivo antes de cerrar el turno.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(53, "mat-dialog-actions", 25)(54, "button", 26);
      \u0275\u0275listener("click", function CloseShiftDialogComponent_Template_button_click_54_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(55, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "button", 27);
      \u0275\u0275listener("click", function CloseShiftDialogComponent_Template_button_click_56_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275text(57, " Cerrar Turno ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loadingReport() ? 5 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate((ctx.shift == null ? null : ctx.shift.id == null ? null : ctx.shift.id.substring(0, 8)) || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.shift == null ? null : ctx.shift.opened_at) ? ctx.formatDate(ctx.shift.opened_at) : "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.shift == null ? null : ctx.shift.initial_cash) ? ctx.formatCurrency(ctx.parseFloat(ctx.shift.initial_cash)) : ctx.formatCurrency(0));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.expectedCash));
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_5_0 = ctx.shiftReport()) == null ? null : tmp_5_0.sales_summary) ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_6_0 = ctx.shiftReport()) == null ? null : tmp_6_0.payments_by_method) ? 31 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("ngModel", ctx.closingBalance());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.closingBalance() >= 0 ? 41 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.notes());
      \u0275\u0275advance(11);
      \u0275\u0275property("disabled", ctx.closingBalance() < 0);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    RequiredValidator,
    MinValidator,
    NgModel,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  min-width: 550px;\n  max-width: 650px;\n}\n.dialog-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n  padding: 1.5rem 1.5rem 1rem;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  padding: 0 1.5rem 1.5rem;\n  overflow-y: auto;\n  max-height: 70vh;\n}\n.form-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.shift-summary[_ngcontent-%COMP%], \n.sales-summary[_ngcontent-%COMP%], \n.payments-summary[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 1.25rem;\n}\n.shift-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.sales-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.payments-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0 0 1rem 0;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.summary-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.summary-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-methods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.payment-method-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n.payment-method-item[_ngcontent-%COMP%]   .method-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  flex-shrink: 0;\n}\n.payment-method-item[_ngcontent-%COMP%]   .method-details[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.payment-method-item[_ngcontent-%COMP%]   .method-details[_ngcontent-%COMP%]   .method-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-method-item[_ngcontent-%COMP%]   .method-details[_ngcontent-%COMP%]   .method-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.payment-method-item[_ngcontent-%COMP%]   .method-total[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  gap: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.form-field[_ngcontent-%COMP%]   .field-description[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin: -0.25rem 0 0.25rem 0;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-family: inherit;\n  transition: border-color 0.2s;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.currency-input[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-input[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #667eea;\n  pointer-events: none;\n}\n.currency-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 3rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.difference-display[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  border: 2px solid;\n}\n.difference-display.exact[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  border-color: #10b981;\n  color: #065f46;\n}\n.difference-display.surplus[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  border-color: #f59e0b;\n  color: #92400e;\n}\n.difference-display.shortage[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n.difference-display[_ngcontent-%COMP%]   .difference-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.difference-display[_ngcontent-%COMP%]   .difference-header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.difference-display[_ngcontent-%COMP%]   .difference-amount[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  text-align: center;\n}\n.warning-message[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  padding: 1rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n}\n.warning-message[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #dc2626;\n  margin-top: 0.125rem;\n}\n.warning-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #991b1b;\n  line-height: 1.5;\n}\nmat-dialog-actions[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  margin: 0;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444 0%,\n      #dc2626 100%);\n  color: white;\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);\n}\nmat-dialog-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 640px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n  mat-dialog-content[_ngcontent-%COMP%] {\n    max-height: 60vh;\n  }\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=close-shift-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CloseShiftDialogComponent, [{
    type: Component,
    args: [{ selector: "app-close-shift-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule
    ], template: `<div class="dialog-container">\r
  <h2 mat-dialog-title>Cerrar Turno de Caja</h2>\r
  \r
  <mat-dialog-content>\r
    <div class="form-content">\r
      <!-- Loading State -->\r
      @if (loadingReport()) {\r
        <div class="loading-state">\r
          <div class="spinner"></div>\r
          <p>Cargando reporte del turno...</p>\r
        </div>\r
      }\r
      \r
      <!-- Shift Information -->\r
      <div class="shift-summary">\r
        <h3>Informaci\xF3n del Turno</h3>\r
        <div class="summary-grid">\r
          <div class="summary-item">\r
            <span class="label">Turno ID:</span>\r
            <span class="value">{{ shift?.id?.substring(0, 8) || 'N/A' }}</span>\r
          </div>\r
          <div class="summary-item">\r
            <span class="label">Apertura:</span>\r
            <span class="value">{{ shift?.opened_at ? formatDate(shift.opened_at) : 'N/A' }}</span>\r
          </div>\r
          <div class="summary-item">\r
            <span class="label">Efectivo Inicial:</span>\r
            <span class="value">{{ shift?.initial_cash ? formatCurrency(parseFloat(shift.initial_cash)) : formatCurrency(0) }}</span>\r
          </div>\r
          <div class="summary-item">\r
            <span class="label">Efectivo Esperado:</span>\r
            <span class="value">{{ formatCurrency(expectedCash) }}</span>\r
          </div>\r
        </div>\r
      </div>\r
      \r
      <!-- Sales Summary (from report) -->\r
      @if (shiftReport()?.sales_summary) {\r
        <div class="sales-summary">\r
          <h3>Resumen de Ventas</h3>\r
          <div class="summary-grid">\r
            <div class="summary-item">\r
              <span class="label">Total \xD3rdenes:</span>\r
              <span class="value">{{ shiftReport().sales_summary.total_orders }}</span>\r
            </div>\r
            <div class="summary-item">\r
              <span class="label">Ventas Totales:</span>\r
              <span class="value">{{ formatCurrency(shiftReport().sales_summary.total_sales) }}</span>\r
            </div>\r
            <div class="summary-item">\r
              <span class="label">Impuestos:</span>\r
              <span class="value">{{ formatCurrency(shiftReport().sales_summary.total_tax) }}</span>\r
            </div>\r
            <div class="summary-item">\r
              <span class="label">Propinas:</span>\r
              <span class="value">{{ formatCurrency(shiftReport().sales_summary.total_tips) }}</span>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
      \r
      <!-- Payments by Method (from report) -->\r
      @if (shiftReport()?.payments_by_method) {\r
        <div class="payments-summary">\r
          <h3>Pagos por M\xE9todo</h3>\r
          <div class="payment-methods">\r
            @if (shiftReport().payments_by_method.cash) {\r
              <div class="payment-method-item">\r
                <span class="method-icon">\u{1F4B5}</span>\r
                <div class="method-details">\r
                  <span class="method-name">Efectivo</span>\r
                  <span class="method-count">{{ shiftReport().payments_by_method.cash.count }} pagos</span>\r
                </div>\r
                <span class="method-total">{{ formatCurrency(shiftReport().payments_by_method.cash.total) }}</span>\r
              </div>\r
            }\r
            @if (shiftReport().payments_by_method.card) {\r
              <div class="payment-method-item">\r
                <span class="method-icon">\u{1F4B3}</span>\r
                <div class="method-details">\r
                  <span class="method-name">Tarjeta</span>\r
                  <span class="method-count">{{ shiftReport().payments_by_method.card.count }} pagos</span>\r
                </div>\r
                <span class="method-total">{{ formatCurrency(shiftReport().payments_by_method.card.total) }}</span>\r
              </div>\r
            }\r
            @if (shiftReport().payments_by_method.transfer) {\r
              <div class="payment-method-item">\r
                <span class="method-icon">\u{1F3E6}</span>\r
                <div class="method-details">\r
                  <span class="method-name">Transferencia</span>\r
                  <span class="method-count">{{ shiftReport().payments_by_method.transfer.count }} pagos</span>\r
                </div>\r
                <span class="method-total">{{ formatCurrency(shiftReport().payments_by_method.transfer.total) }}</span>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Closing Balance Input -->\r
      <div class="form-field">\r
        <label for="closing-balance">Efectivo Final Contado *</label>\r
        <p class="field-description">Cuenta el efectivo f\xEDsico en la caja y registra el monto total</p>\r
        <div class="currency-input">\r
          <span class="currency-symbol">$</span>\r
          <input \r
            type="number" \r
            id="closing-balance"\r
            [ngModel]="closingBalance()"\r
            (ngModelChange)="closingBalance.set($event)"\r
            min="0"\r
            step="0.01"\r
            required\r
            autofocus\r
          />\r
        </div>\r
      </div>\r
\r
      <!-- Difference Display -->\r
      @if (closingBalance() >= 0) {\r
        <div class="difference-display" [class]="differenceType">\r
          <div class="difference-header">\r
            @if (differenceType === 'exact') {\r
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path d="M22 11.08V12a10 10 10 1 1-5.93-9.14"></path>\r
                <polyline points="22 4 12 14.01 9 11.01"></polyline>\r
              </svg>\r
              <span>Cuadre Exacto</span>\r
            } @else if (differenceType === 'surplus') {\r
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <circle cx="12" cy="12" r="10"></circle>\r
                <line x1="12" y1="8" x2="12" y2="12"></line>\r
                <line x1="12" y1="16" x2="12.01" y2="16"></line>\r
              </svg>\r
              <span>Sobrante</span>\r
            } @else {\r
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <circle cx="12" cy="12" r="10"></circle>\r
                <line x1="15" y1="9" x2="9" y2="15"></line>\r
                <line x1="9" y1="9" x2="15" y2="15"></line>\r
              </svg>\r
              <span>Faltante</span>\r
            }\r
          </div>\r
          <div class="difference-amount">\r
            {{ formatCurrency(Math.abs(difference)) }}\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Notes -->\r
      <div class="form-field">\r
        <label for="notes">Notas (opcional)</label>\r
        <textarea \r
          id="notes"\r
          [ngModel]="notes()"\r
          (ngModelChange)="notes.set($event)"\r
          rows="3"\r
          placeholder="Ej: Billetes rotos, gastos menores, observaciones..."\r
        ></textarea>\r
      </div>\r
\r
      <!-- Warning Message -->\r
      <div class="warning-message">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>\r
          <line x1="12" y1="9" x2="12" y2="13"></line>\r
          <line x1="12" y1="17" x2="12.01" y2="17"></line>\r
        </svg>\r
        <p>Esta acci\xF3n no se puede deshacer. Aseg\xFArate de haber contado correctamente el efectivo antes de cerrar el turno.</p>\r
      </div>\r
    </div>\r
  </mat-dialog-content>\r
\r
  <mat-dialog-actions align="end">\r
    <button \r
      mat-button \r
      (click)="onCancel()"\r
      class="btn-cancel"\r
    >\r
      Cancelar\r
    </button>\r
    <button \r
      mat-raised-button \r
      (click)="onConfirm()"\r
      class="btn-confirm"\r
      [disabled]="closingBalance() < 0"\r
    >\r
      Cerrar Turno\r
    </button>\r
  </mat-dialog-actions>\r
</div>\r
`, styles: ["/* src/app/features/pos/components/close-shift-dialog/close-shift-dialog.component.scss */\n.dialog-container {\n  min-width: 550px;\n  max-width: 650px;\n}\n.dialog-container h2 {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n  padding: 1.5rem 1.5rem 1rem;\n}\nmat-dialog-content {\n  padding: 0 1.5rem 1.5rem;\n  overflow-y: auto;\n  max-height: 70vh;\n}\n.form-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.shift-summary,\n.sales-summary,\n.payments-summary {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 1.25rem;\n}\n.shift-summary h3,\n.sales-summary h3,\n.payments-summary h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0 0 1rem 0;\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.summary-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.summary-item .label {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.summary-item .value {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-methods {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.payment-method-item {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n.payment-method-item .method-icon {\n  font-size: 1.5rem;\n  flex-shrink: 0;\n}\n.payment-method-item .method-details {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.payment-method-item .method-details .method-name {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-method-item .method-details .method-count {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.payment-method-item .method-total {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  gap: 1rem;\n}\n.loading-state .spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n.loading-state p {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.form-field .field-description {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin: -0.25rem 0 0.25rem 0;\n}\n.form-field input,\n.form-field textarea {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-family: inherit;\n  transition: border-color 0.2s;\n}\n.form-field input:focus,\n.form-field textarea:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.form-field textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.currency-input {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-input .currency-symbol {\n  position: absolute;\n  left: 1rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #667eea;\n  pointer-events: none;\n}\n.currency-input input {\n  padding-left: 3rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.difference-display {\n  padding: 1.25rem;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  border: 2px solid;\n}\n.difference-display.exact {\n  background: #d1fae5;\n  border-color: #10b981;\n  color: #065f46;\n}\n.difference-display.surplus {\n  background: #fef3c7;\n  border-color: #f59e0b;\n  color: #92400e;\n}\n.difference-display.shortage {\n  background: #fee2e2;\n  border-color: #ef4444;\n  color: #991b1b;\n}\n.difference-display .difference-header {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.difference-display .difference-header svg {\n  flex-shrink: 0;\n}\n.difference-display .difference-amount {\n  font-size: 2rem;\n  font-weight: 700;\n  text-align: center;\n}\n.warning-message {\n  display: flex;\n  gap: 0.75rem;\n  padding: 1rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n}\n.warning-message svg {\n  flex-shrink: 0;\n  color: #dc2626;\n  margin-top: 0.125rem;\n}\n.warning-message p {\n  margin: 0;\n  font-size: 0.875rem;\n  color: #991b1b;\n  line-height: 1.5;\n}\nmat-dialog-actions {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  margin: 0;\n}\nmat-dialog-actions button {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\nmat-dialog-actions .btn-cancel {\n  color: #6b7280;\n}\nmat-dialog-actions .btn-cancel:hover {\n  background: #f9fafb;\n}\nmat-dialog-actions .btn-confirm {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444 0%,\n      #dc2626 100%);\n  color: white;\n}\nmat-dialog-actions .btn-confirm:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);\n}\nmat-dialog-actions .btn-confirm:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 640px) {\n  .dialog-container {\n    min-width: auto;\n    width: 100%;\n  }\n  mat-dialog-content {\n    max-height: 60vh;\n  }\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=close-shift-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: POSService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CloseShiftDialogComponent, { className: "CloseShiftDialogComponent", filePath: "src/app/features/pos/components/close-shift-dialog/close-shift-dialog.component.ts", lineNumber: 28 });
})();

export {
  OpenShiftDialogComponent,
  CloseShiftDialogComponent
};
//# sourceMappingURL=chunk-TTBBWZH7.js.map

import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { VendorService } from '../../../settings/services/vendor.service';
import { WarehouseService } from '../../services/warehouse.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { Vendor } from '../../../settings/models/vendor.model';
import { Warehouse } from '../../models/warehouse.model';
import { VendorCatalogProduct, VendorCatalogUom } from '../../models/vendor-catalog.model';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { LineItem } from '../../models/line-item.model';
import {
  WritePurchaseOrderDto,
  PurchaseOrderApiLineItem,
  LineItemFormData,
  PurchaseOrderFormData
} from '../../models/filters.model';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { validateQuantity, validatePrice, validateTaxPercentage, getErrorMessage } from '../../utils/order-validators';
import { isInternationalPurchaseOrder, PEDIMENTO_MAX_LENGTH } from '../../utils/purchase-order-display.util';
import {
  VendorCostCurrency,
  currencyMismatchMessage,
  normalizeVendorCostCurrency,
} from '../../../settings/utils/vendor-cost-currency.util';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.scss']
})
export class PurchaseOrderFormComponent implements OnInit, OnDestroy {
  /** En edición queda null hasta que termina la carga; el template no debe enlazar el formulario antes. */
  orderForm: FormGroup | null = null;
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  loadError = signal<string | null>(null);
  /** Folio de la OC cargada: el listado busca por folio, no por UUID. */
  loadedOrderFolio = signal<string | null>(null);
  loadedOrder = signal<PurchaseOrder | null>(null);
  readonly pedimentoMaxLength = PEDIMENTO_MAX_LENGTH;

  vendors = signal<Vendor[]>([]);
  fiscalConfigurations = signal<FiscalConfiguration[]>([]);
  /** Productos del proveedor seleccionado (misma API que el modal de creación OC). */
  vendorProducts = signal<VendorCatalogProduct[]>([]);
  warehouses = signal<Warehouse[]>([]);

  totalCalculations = signal({
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  });

  private lineItemsValueSub?: Subscription;
  private vendorIdSub?: Subscription;

  get lineItems(): FormArray {
    if (!this.orderForm) {
      return this.fb.array([]) as FormArray;
    }
    return this.orderForm.get('line_items') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private taxCalculator: TaxCalculatorService,
    private vendorService: VendorService,
    private warehouseService: WarehouseService,
    private fiscalConfigurationService: FiscalConfigurationService
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loadOrder(id);
    } else {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this.lineItemsValueSub?.unsubscribe();
    this.vendorIdSub?.unsubscribe();
  }

  initForm(order?: PurchaseOrder): void {
    this.lineItemsValueSub?.unsubscribe();

    const fiscalId =
      (order as PurchaseOrder & { fiscal_configuration_id?: string })?.fiscal_configuration_id ??
      order?.fiscal_configuration?.id ??
      '';

    this.orderForm = this.fb.group({
      fiscal_configuration_id: [fiscalId, Validators.required],
      vendor_id: [order?.vendor_id || '', Validators.required],
      purpose: [order?.notes ?? order?.purpose ?? '', this.isEditMode() ? [] : [Validators.required]],
      warehouse_id: [order?.warehouse_id || '', Validators.required],
      tentative_receipt_date: [
        this.dateOnlyForInput(order?.expected_delivery_date || order?.tentative_receipt_date),
        Validators.required
      ],
      payment_status: [this.paymentStatusToForm(order?.payment_status)],
      pedimento_number: [order?.pedimento_number ?? '', [Validators.maxLength(PEDIMENTO_MAX_LENGTH)]],
      line_items: this.fb.array([], Validators.minLength(1))
    });

    if (order?.line_items) {
      order.line_items.forEach((item) => {
        this.addLineItem(item);
      });
    }

    this.lineItemsValueSub = this.orderForm.get('line_items')?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });

    this.vendorIdSub?.unsubscribe();
    const vendorCtrl = this.orderForm.get('vendor_id');
    this.vendorIdSub = vendorCtrl?.valueChanges.pipe(distinctUntilChanged()).subscribe((vid) => {
      this.loadVendorProducts(typeof vid === 'string' ? vid : '');
      if (!this.isEditMode()) {
        this.lineItems.clear();
      }
      if (!this.isInternationalVendor()) {
        this.orderForm?.get('pedimento_number')?.setValue('', { emitEvent: false });
      }
    });
    const initialVendor = vendorCtrl?.value as string | undefined;
    if (initialVendor) {
      this.loadVendorProducts(initialVendor);
    } else {
      this.vendorProducts.set([]);
    }
  }

  /**
   * Catálogo del proveedor (productos y UOM por línea de negocio del proveedor).
   */
  loadVendorProducts(vendorId: string): void {
    if (!vendorId) {
      this.vendorProducts.set([]);
      return;
    }
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (res) => {
        let list: VendorCatalogProduct[] = [];
        if (Array.isArray(res)) {
          list = res as VendorCatalogProduct[];
        } else if (res && typeof res === 'object' && Array.isArray((res as { data?: unknown }).data)) {
          list = (res as { data: VendorCatalogProduct[] }).data;
        }
        this.vendorProducts.set(list);
      },
      error: () => this.vendorProducts.set([])
    });
  }

  calculateTotals(): void {
    const lineItems = this.lineItems?.value;
    if (!lineItems || lineItems.length === 0) {
      this.totalCalculations.set({
        total_subtotal: 0,
        total_iva: 0,
        total_ieps: 0,
        grand_total: 0
      });
      return;
    }

    let total_subtotal = 0;
    let total_iva = 0;
    let total_ieps = 0;
    let grand_total = 0;

    lineItems.forEach((item: LineItemFormData) => {
      const calculations = this.taxCalculator.calculateLineItem(
        item.quantity || 0,
        item.unit_price || 0,
        item.iva_percentage || 0,
        item.ieps_percentage || 0
      );

      total_subtotal += calculations.subtotal;
      total_iva += calculations.iva_amount;
      total_ieps += calculations.ieps_amount;
      grand_total += calculations.line_total;
    });

    this.totalCalculations.set({
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }

  loadDropdownData(): void {
    this.vendorService.getAllActiveVendors().subscribe({
      next: (vendors) => {
        this.vendors.set(vendors);
      },
      error: (error) => console.error('Error loading vendors:', error)
    });

    this.fiscalConfigurationService.listFiscalConfigurations({ limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalConfigurations.set(res.data || []);
      },
      error: (e) => console.error('Error loading fiscal configurations:', e)
    });

    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses)
          ? warehouses
          : (warehouses as { data?: Warehouse[] }).data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => console.error('Error loading warehouses:', error)
    });
  }

  loadOrder(id: string): void {
    this.loading.set(true);
    this.loadError.set(null);

    this.purchaseOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.loadedOrderFolio.set(order.folio?.trim() || null);
        this.loadedOrder.set(order);
        this.initForm(order);
        if (this.orderForm) {
          this.orderForm.get('vendor_id')?.disable({ emitEvent: false });
        }
        this.calculateTotals();
        this.loading.set(false);
      },
      error: (error) => {
        this.loadError.set(error.message || 'No se pudo cargar la orden');
        this.loading.set(false);
      }
    });
  }

  get orderCurrency(): VendorCostCurrency | null {
    const fromOrder = normalizeVendorCostCurrency(this.loadedOrder()?.payment_currency);
    if (fromOrder) return fromOrder;
    const first = this.lineItems.at(0)?.get('currency')?.value;
    return normalizeVendorCostCurrency(first);
  }

  createLineItemFormGroup(item?: Partial<LineItem>): FormGroup {
    const unitCost = this.toNum(item?.unit_price ?? item?.unit_total);
    const currency = normalizeVendorCostCurrency(item?.currency) ?? this.orderCurrency ?? 'MXN';
    return this.fb.group({
      product_id: [item?.product_id || '', Validators.required],
      uom_id: [item?.uom_id || item?.product_uom_id || '', Validators.required],
      quantity: [item?.quantity ?? 1, [Validators.required, validateQuantity()]],
      unit_price: [unitCost, [Validators.required, validatePrice()]],
      iva_percentage: [item?.iva_percentage ?? 16, [Validators.required, validateTaxPercentage()]],
      ieps_percentage: [item?.ieps_percentage ?? 0, [Validators.required, validateTaxPercentage()]],
      currency: [currency]
    });
  }

  addLineItem(item?: Partial<LineItem>): void {
    this.lineItems.push(this.createLineItemFormGroup(item));
  }

  removeLineItem(index: number): void {
    this.lineItems.removeAt(index);
  }

  getVendorProduct(productId: string): VendorCatalogProduct | undefined {
    if (!productId) return undefined;
    return this.vendorProducts().find((p) => p.product_id === productId);
  }

  getVendorLineUoms(index: number): VendorCatalogUom[] {
    const pid = this.getLineProductId(index);
    return this.getVendorProduct(pid)?.uoms ?? [];
  }

  hasVendorSelected(): boolean {
    if (!this.orderForm) return false;
    return !!this.orderForm.getRawValue().vendor_id;
  }

  isInternationalVendor(): boolean {
    const order = this.loadedOrder();
    if (this.isEditMode() && order) {
      return isInternationalPurchaseOrder(order);
    }
    const vendorId = this.orderForm?.getRawValue()?.vendor_id as string | undefined;
    return this.vendors().some((vendor) => vendor.id === vendorId && vendor.vendor_type === 'INTERNATIONAL');
  }

  onProductSelect(index: number, productId: string): void {
    const vp = this.getVendorProduct(productId);
    if (vp?.uoms?.length) {
      const u = vp.uoms[0];
      this.applyCatalogUomToLine(index, u);
      return;
    }
    this.lineItems.at(index).patchValue({
      uom_id: '',
      unit_price: 0,
      iva_percentage: 0,
      ieps_percentage: 0,
      currency: this.orderCurrency ?? 'MXN',
    });
  }

  onVendorUomChange(index: number, uomId: string): void {
    const pid = this.getLineProductId(index);
    const vp = this.getVendorProduct(pid);
    const u = vp?.uoms?.find((x) => x.uom_id === uomId);
    if (u) {
      this.applyCatalogUomToLine(index, u);
    }
  }

  private applyCatalogUomToLine(index: number, u: VendorCatalogUom): void {
    const uomCurrency = normalizeVendorCostCurrency(u.currency);
    const order = this.orderCurrency;
    if (uomCurrency && order && uomCurrency !== order) {
      alert(currencyMismatchMessage(order, uomCurrency));
    }
    this.lineItems.at(index).patchValue({
      uom_id: u.uom_id,
      unit_price: u.cost ?? 0,
      iva_percentage: u.iva_percentage ?? 0,
      ieps_percentage: u.ieps_percentage ?? 0,
      currency: uomCurrency ?? order ?? 'MXN',
    });
  }

  getLineCalculations(index: number): ReturnType<TaxCalculatorService['calculateLineItem']> {
    if (!this.orderForm) {
      return { subtotal: 0, iva_amount: 0, ieps_amount: 0, line_total: 0 };
    }
    const item = this.lineItems.at(index).getRawValue() as LineItemFormData;
    return this.taxCalculator.calculateLineItem(
      item.quantity || 0,
      item.unit_price || 0,
      item.iva_percentage || 0,
      item.ieps_percentage || 0
    );
  }

  getFieldError(fieldName: string): string | null {
    if (!this.orderForm) return null;
    return getErrorMessage(this.orderForm.get(fieldName), fieldName);
  }

  getLineItemFieldError(index: number, fieldName: string): string | null {
    if (!this.orderForm) return null;
    return getErrorMessage(this.lineItems.at(index).get(fieldName), fieldName);
  }

  save(): void {
    if (!this.orderForm) {
      return;
    }
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    this.saving.set(true);
    const dto = this.buildWritePurchaseOrderDto();

    if (this.isEditMode()) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.purchaseOrderService.updateOrder(id, dto).subscribe({
        next: (updated) => {
          alert('Orden actualizada exitosamente');
          this.navigateToOrdersListWithSearch(updated);
          this.saving.set(false);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
      return;
    }

    this.purchaseOrderService.createOrder(dto).subscribe({
      next: (order) => {
        alert('Orden creada exitosamente');
        this.navigateToOrdersListWithSearch(order);
      },
      error: (error) => {
        alert(`Error: ${error.message}`);
        this.saving.set(false);
      }
    });
  }

  /**
   * Misma forma que CreatePurchaseOrderDto: notes, expected_delivery_date, unit_total en líneas, etc.
   */
  private buildWritePurchaseOrderDto(): WritePurchaseOrderDto {
    const raw = this.orderForm!.getRawValue() as PurchaseOrderFormData;
    const paymentCurrency = this.orderCurrency ?? 'MXN';
    const line_items: PurchaseOrderApiLineItem[] = raw.line_items.map((row) => ({
      product_id: row.product_id,
      uom_id: row.uom_id,
      quantity: this.toNum(row.quantity),
      unit_total: this.toNum(row.unit_price),
      iva_percentage: this.toNum(row.iva_percentage),
      ieps_percentage: this.toNum(row.ieps_percentage),
      currency: normalizeVendorCostCurrency(row.currency) ?? paymentCurrency
    }));

    const body: WritePurchaseOrderDto = {
      fiscal_configuration_id: raw.fiscal_configuration_id,
      warehouse_id: raw.warehouse_id,
      vendor_id: raw.vendor_id,
      expected_delivery_date: this.dateOnlyForInput(raw.tentative_receipt_date),
      payment_currency: paymentCurrency,
      line_items
    };

    const ps = (raw.payment_status || '').trim();
    if (ps) {
      body.payment_status = this.mapPaymentStatusForApi(ps);
    }

    const notes = (raw.purpose || '').trim();
    if (notes) {
      body.notes = notes;
    }

    if (this.isInternationalVendor()) {
      const rawForm = this.orderForm!.getRawValue() as PurchaseOrderFormData & { pedimento_number?: string };
      const pedimento = String(rawForm.pedimento_number || '').trim();
      body.pedimento_number = pedimento || null;
    }

    return body;
  }

  /** API de ejemplo usa "Pagado"; el modelo a veces trae "Pagada". */
  private mapPaymentStatusForApi(v: string): string {
    if (v === 'Pagada') return 'Pagado';
    return v;
  }

  private paymentStatusToForm(ps: string | undefined): string {
    if (!ps) return 'Pendiente';
    if (ps === 'Pagada') return 'Pagado';
    return ps;
  }

  private dateOnlyForInput(value: string | undefined | null): string {
    if (!value) return '';
    const s = String(value).trim();
    return s.length >= 10 ? s.slice(0, 10) : s;
  }

  private toNum(value: unknown): number {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    const n = typeof value === 'number' ? value : parseFloat(String(value));
    return Number.isFinite(n) ? n : 0;
  }

  cancel(): void {
    if (confirm('¿Descartar cambios?')) {
      this.goToPurchaseOrderList();
    }
  }

  goToPurchaseOrderList(): void {
    this.router.navigate(['/purchase-orders']);
  }

  /**
   * Vuelve al listado filtrando por folio (lo que entiende el backend en `search`), no por id.
   */
  private navigateToOrdersListWithSearch(order: PurchaseOrder | Record<string, unknown> | null | undefined): void {
    const folioFromResponse =
      order && typeof order === 'object' && 'folio' in order
        ? String((order as PurchaseOrder).folio || '').trim()
        : '';
    const term = folioFromResponse || this.loadedOrderFolio()?.trim() || '';
    void this.router.navigate(['/purchase-orders'], {
      queryParams: term ? { search: term } : {}
    });
  }

  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  getLineProductId(index: number): string {
    if (!this.orderForm) {
      return '';
    }
    const g = this.lineItems.at(index) as FormGroup;
    return String(g.getRawValue().product_id || '');
  }
}

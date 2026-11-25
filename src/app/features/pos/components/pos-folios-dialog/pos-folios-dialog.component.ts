import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Check, ChevronDown, Copy, Hash, X } from 'lucide-angular';
import { Subject, forkJoin, of } from 'rxjs';
import { catchError, debounceTime, takeUntil } from 'rxjs/operators';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { Quotation, QuotationLineItem } from '../../../quotations/models/quotation.model';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder, SalesOrderLineItem } from '../../../sales-orders/models/sales-order.model';
import { POSService } from '../../services/pos.service';
import { PosCartSlotId, PosCartSlotLine } from '../../services/pos-cart-slots.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

export interface PosFoliosSlotChoice {
  id: PosCartSlotId;
  count: number;
  active: boolean;
}

export interface PosFoliosDialogData {
  mode: 'ventas' | 'caja';
  branchId: string;
  branchLabel: string;
  fiscalConfigurationId: string;
  hasOpenShift: boolean;
  slots: PosFoliosSlotChoice[];
  onAbonoRecorded?: () => void;
}

export interface PosFolioCartPick {
  slot: PosCartSlotId;
  folio: string;
  customerId: string | null;
  customerName: string;
  walkInName: string;
  walkInRfc: string;
  lines: PosCartSlotLine[];
}

type AbonoMethod = 'cash' | 'card' | 'transfer' | 'check';

interface FolioRow {
  key: string;
  kind: 'quotation' | 'sale';
  id: string;
  folio: string;
  customerName: string;
  status: string;
  total: number;
  createdAt: string;
  paymentStatus: string;
  isCredit: boolean;
  pending: number | null;
}

@Component({
  selector: 'app-pos-folios-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './pos-folios-dialog.component.html',
  styleUrl: './pos-folios-dialog.component.scss',
})
export class PosFoliosDialogComponent implements OnInit, OnDestroy {
  readonly Hash = Hash;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly ChevronDown = ChevronDown;
  readonly X = X;
  private copiedTimer: ReturnType<typeof setTimeout> | null = null;

  readonly loading = signal(false);
  readonly error = signal('');
  readonly rows = signal<FolioRow[]>([]);
  readonly razonSocial = signal('');
  readonly copiedFolio = signal('');
  readonly search = signal('');
  readonly takingId = signal('');
  readonly readingFor = signal<'lines' | 'cart' | ''>('');
  readonly openKey = signal('');
  readonly cartAskKey = signal('');
  readonly cartAsk = signal<PosFolioCartPick | null>(null);
  readonly previews = signal<Record<string, PosFolioCartPick>>({});

  readonly abonoRow = signal<FolioRow | null>(null);
  readonly abonoPending = signal<number | null>(null);
  readonly abonoLoading = signal(false);
  readonly abonoSaving = signal(false);
  readonly abonoError = signal('');
  readonly abonoMethod = signal<AbonoMethod>('cash');
  abonoAmount = '';
  abonoReference = '';

  private readonly search$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosFoliosDialogData,
    private dialogRef: MatDialogRef<PosFoliosDialogComponent, PosFolioCartPick | undefined>,
    private quotations: QuotationService,
    private salesOrders: SalesOrderService,
    private posService: POSService,
    private fiscalConfigs: FiscalConfigurationService,
  ) {}

  ngOnInit(): void {
    this.fiscalConfigs.getFiscalConfiguration(this.data.fiscalConfigurationId).subscribe({
      next: (config) => this.noteCompany(config?.razon_social),
      error: () => undefined,
    });
    this.search$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => this.load());
    this.load();
  }

  ngOnDestroy(): void {
    if (this.copiedTimer) clearTimeout(this.copiedTimer);
    this.destroy$.next();
    this.destroy$.complete();
  }

  scopeLine(): string {
    const company = this.razonSocial().trim();
    return company ? `${this.data.branchLabel} · ${company}` : this.data.branchLabel;
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.search$.next(value);
  }

  close(): void {
    this.dialogRef.close();
  }

  copyFolio(folio: string, event: Event): void {
    event.stopPropagation();
    const text = folio.trim();
    if (!text) return;
    navigator.clipboard?.writeText(text).then(
      () => {
        this.copiedFolio.set(text);
        if (this.copiedTimer) clearTimeout(this.copiedTimer);
        this.copiedTimer = setTimeout(() => this.copiedFolio.set(''), 1200);
      },
      () => this.error.set('No se pudo copiar el folio'),
    );
  }

  kindLabel(row: FolioRow): string {
    return row.kind === 'quotation' ? 'Cotización' : 'Orden';
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Creada':
        return 'dt-status-pill dt-status-pill--info';
      case 'En Selección':
        return 'dt-status-pill dt-status-pill--warning';
      case 'Lista para entrega':
      case 'En Camino':
        return 'dt-status-pill dt-status-pill--sky';
      case 'Surtida':
      case 'Convertida':
        return 'dt-status-pill dt-status-pill--success';
      case 'Cancelada':
        return 'dt-status-pill dt-status-pill--danger';
      default:
        return 'dt-status-pill dt-status-pill--neutral';
    }
  }

  paymentClass(status: string): string {
    switch (status) {
      case 'Pagado':
        return 'dt-status-pill dt-status-pill--success';
      case 'Parcial':
        return 'dt-status-pill dt-status-pill--warning';
      case 'Pendiente':
        return 'dt-status-pill dt-status-pill--danger';
      default:
        return 'dt-status-pill dt-status-pill--neutral';
    }
  }

  formatQty(value: number): string {
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(
      Number.isFinite(value) ? value : 0,
    );
  }

  toggleLines(row: FolioRow): void {
    if (this.openKey() === row.key) {
      this.openKey.set('');
      return;
    }
    this.openKey.set(row.key);
    if (this.previews()[row.key]) return;
    this.readDetail(row, () => undefined, 'lines');
  }

  previewLines(row: FolioRow): PosCartSlotLine[] {
    return this.previews()[row.key]?.lines ?? [];
  }

  formatMoney(value: number | null | undefined): string {
    const amount = Number(value ?? 0);
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
      Number.isFinite(amount) ? amount : 0,
    );
  }

  takeToCart(row: FolioRow): void {
    if (this.takingId()) return;
    this.error.set('');
    this.readDetail(row, (pick) => {
      if (!pick.lines.length) {
        this.error.set(`${row.folio} no tiene productos para el carrito`);
        return;
      }
      this.cartAsk.set(pick);
      this.cartAskKey.set(row.key);
    }, 'cart');
  }

  confirmSlot(slot: PosCartSlotId): void {
    const pick = this.cartAsk();
    if (!pick) return;
    this.dialogRef.close({ ...pick, slot });
  }

  cancelAsk(): void {
    this.cartAsk.set(null);
    this.cartAskKey.set('');
  }

  private readDetail(
    row: FolioRow,
    done: (pick: PosFolioCartPick) => void,
    purpose: 'lines' | 'cart',
  ): void {
    const cached = this.previews()[row.key];
    if (cached) {
      done(cached);
      return;
    }
    this.takingId.set(row.id);
    this.readingFor.set(purpose);
    const onDetail = (detail: unknown) => {
      this.takingId.set('');
      this.readingFor.set('');
      const pick = this.pickFromDetail(row, detail);
      this.previews.update((current) => ({ ...current, [row.key]: pick }));
      done(pick);
    };
    const onError = (error: unknown) => {
      this.takingId.set('');
      this.readingFor.set('');
      this.error.set(resolveHttpErrorMessage(error, 'No se pudo leer el folio'));
    };
    if (row.kind === 'quotation') {
      this.quotations.getDetail(row.id).subscribe({ next: onDetail, error: onError });
      return;
    }
    this.salesOrders.getOrderDetailById(row.id).subscribe({ next: onDetail, error: onError });
  }

  openAbono(row: FolioRow): void {
    this.abonoRow.set(row);
    this.abonoError.set('');
    this.abonoAmount = '';
    this.abonoReference = '';
    this.abonoMethod.set('cash');
    this.abonoPending.set(row.pending);
    this.abonoLoading.set(true);
    this.salesOrders.getPayments(row.id).subscribe({
      next: (result) => {
        this.abonoLoading.set(false);
        const pending = Number(result.summary?.amount_pending ?? row.pending ?? 0);
        this.abonoPending.set(Number.isFinite(pending) ? pending : 0);
        if (!(pending > 0.009)) {
          this.abonoError.set('Esa orden ya no tiene saldo');
        }
      },
      error: (error: unknown) => {
        this.abonoLoading.set(false);
        this.abonoError.set(resolveHttpErrorMessage(error, 'No se pudo leer el saldo'));
      },
    });
  }

  closeAbono(): void {
    this.abonoRow.set(null);
    this.abonoError.set('');
  }

  needsReference(): boolean {
    const method = this.abonoMethod();
    return method === 'transfer' || method === 'check';
  }

  submitAbono(): void {
    const row = this.abonoRow();
    const pending = this.abonoPending();
    if (!row || pending == null || this.abonoSaving()) return;
    if (!this.data.hasOpenShift) {
      this.abonoError.set('No hay corte abierto. El abono no se registró.');
      return;
    }
    const amount = Math.round(Number(this.abonoAmount) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) {
      this.abonoError.set('Escribe el monto del abono');
      return;
    }
    if (amount > pending + 0.001) {
      this.abonoError.set(`El monto no puede pasar de ${this.formatMoney(pending)}`);
      return;
    }
    const reference = this.abonoReference.trim();
    if (this.needsReference() && !reference) {
      this.abonoError.set('La referencia es obligatoria');
      return;
    }
    this.abonoSaving.set(true);
    this.abonoError.set('');
    this.posService
      .registerShiftAbono(row.id, {
        amount,
        payment_date: todayIso(),
        payment_method: this.abonoMethod(),
        reference_number: reference || undefined,
        billing_branch_id: this.data.branchId,
      })
      .subscribe({
        next: () => {
          this.abonoSaving.set(false);
          this.abonoRow.set(null);
          this.data.onAbonoRecorded?.();
          this.load();
        },
        error: (error: unknown) => {
          this.abonoSaving.set(false);
          this.abonoError.set(resolveHttpErrorMessage(error, 'No se pudo registrar el abono'));
        },
      });
  }

  private load(): void {
    this.loading.set(true);
    this.error.set('');
    const search = this.search().trim();
    const branchId = this.data.branchId;
    const fiscalId = this.data.fiscalConfigurationId;
    if (this.data.mode === 'caja') {
      this.salesOrders
        .getOrders(
          {
            search: search || undefined,
            billing_branch_id: branchId,
            fiscal_configuration_id: fiscalId,
            payment_status: 'Pendiente',
          },
          { page: 1, limit: 40 },
        )
        .pipe(catchError(() => of({ data: [] as SalesOrder[] })))
        .subscribe((page) => {
          this.rows.set(this.salesRows(page.data ?? []).filter((row) => row.status !== 'Cancelada'));
          this.loading.set(false);
        });
      return;
    }

    forkJoin({
      quotations: this.quotations
        .getQuotations(
          { search: search || undefined, billing_branch_id: branchId, fiscal_configuration_id: fiscalId },
          { page: 1, limit: 30 },
        )
        .pipe(catchError(() => of({ data: [] as Quotation[] }))),
      sales: this.salesOrders
        .getOrders(
          { search: search || undefined, billing_branch_id: branchId, fiscal_configuration_id: fiscalId },
          { page: 1, limit: 30 },
        )
        .pipe(catchError(() => of({ data: [] as SalesOrder[] }))),
    }).subscribe({
      next: ({ quotations, sales }) => {
        const mixed = [
          ...this.quotationRows(quotations.data ?? []),
          ...this.salesRows(sales.data ?? []),
        ].filter((row) => row.status !== 'Cancelada');
        mixed.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        this.rows.set(mixed);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('No se pudieron cargar los folios');
      },
    });
  }

  private noteCompany(value?: string | null): void {
    const name = String(value ?? '').trim();
    if (!name || this.razonSocial()) {
      return;
    }
    this.razonSocial.set(name);
  }

  private quotationRows(rows: Quotation[]): FolioRow[] {
    return rows.map((row) => {
      this.noteCompany(row.fiscal_razon_social || row.razon_social);
      return {
      key: `q:${row.id}`,
      kind: 'quotation',
      id: row.id,
      folio: row.folio || row.id.slice(0, 8),
      customerName: partyName(row.customer, row.customer_display_name),
      status: row.general_status,
      total: Number(row.total ?? 0),
      createdAt: row.created_at || '',
      paymentStatus: '',
      isCredit: false,
      pending: null,
    };
    });
  }

  private salesRows(rows: SalesOrder[]): FolioRow[] {
    return rows.map((row) => {
      this.noteCompany(row.fiscal_razon_social);
      const pendingRaw = row.payments_summary?.amount_pending;
      const pending = pendingRaw == null ? null : Number(pendingRaw);
      return {
        key: `s:${row.id}`,
        kind: 'sale' as const,
        id: row.id,
        folio: row.folio || row.id.slice(0, 8),
        customerName: partyName(row.customer, row.customer_display_name),
        status: row.general_status || row.status || '',
        total: Number(row.total ?? row.grand_total ?? 0),
        createdAt: (row as { created_at?: string }).created_at || '',
        paymentStatus: row.payment_status || '',
        isCredit: row.is_credit === true,
        pending: pending != null && Number.isFinite(pending) ? pending : null,
      };
    });
  }

  private pickFromDetail(row: FolioRow, detail: unknown): PosFolioCartPick {
    const payload = (detail ?? {}) as {
      header?: {
        customer_id?: number | string;
        customer?: { is_walk_in?: boolean };
        customer_summary?: { is_walk_in?: boolean };
        walk_in_name?: string | null;
        walk_in_rfc?: string | null;
        line_items?: Array<QuotationLineItem | SalesOrderLineItem>;
      };
      line_items?: Array<QuotationLineItem | SalesOrderLineItem>;
      customer_id?: number | string;
      customer?: { is_walk_in?: boolean };
      customer_summary?: { is_walk_in?: boolean };
      walk_in_name?: string | null;
      walk_in_rfc?: string | null;
    };
    const header = payload.header ?? payload;
    const lines = (payload.line_items ?? header.line_items ?? []).map((line) => mapLine(line));
    const walkIn =
      header.customer?.is_walk_in === true || header.customer_summary?.is_walk_in === true;
    const customerId = walkIn ? null : header.customer_id != null ? String(header.customer_id) : null;
    const walkInName =
      'walk_in_name' in header && header.walk_in_name ? String(header.walk_in_name) : '';
    const walkInRfc = 'walk_in_rfc' in header && header.walk_in_rfc ? String(header.walk_in_rfc) : '';
    return {
      slot: 1,
      folio: row.folio,
      customerId,
      customerName: walkIn ? walkInName || 'Público en General' : row.customerName,
      walkInName,
      walkInRfc,
      lines: lines.filter((line) => line.quantity > 0),
    };
  }
}

function documentPrice(value: number | string | undefined): number | undefined {
  const price = Number(value);
  return Number.isFinite(price) && price > 0 ? price : undefined;
}

function todayIso(): string {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function partyName(
  customer?: { name?: string; lastname?: string; company_name?: string; display_name?: string },
  displayName?: string,
): string {
  const company = customer?.company_name?.trim();
  const person = [customer?.name, customer?.lastname].filter(Boolean).join(' ').trim();
  return company || customer?.display_name?.trim() || displayName?.trim() || person || 'Público en General';
}

function mapLine(line: QuotationLineItem | SalesOrderLineItem): PosCartSlotLine {
  const raw = line as {
    product_discount_id?: string | null;
    applied_product_discount?: { id?: string } | null;
  };
  const discountId = raw.product_discount_id || raw.applied_product_discount?.id || null;
  const percent = discountId ? 0 : Number(line.discount_percentage ?? 0);
  const product = 'product' in line ? line.product : undefined;
  return {
    productId: String(line.product_id),
    productUomId: String(line.product_uom_id),
    quantity: Number(line.quantity) || 0,
    productDiscountId: discountId ? String(discountId) : null,
    priceDiscountPercentage: Number.isFinite(percent) && percent > 0 ? percent : 0,
    productName:
      ('custom_description' in line && line.custom_description) || product?.name || 'Producto',
    productSku: product?.sku || '',
    uomName: line.uom_name || 'Pieza',
    documentUnitPrice: documentPrice(line.unit_price),
  };
}

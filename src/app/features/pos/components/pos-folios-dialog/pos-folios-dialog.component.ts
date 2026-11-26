import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Check, ChevronDown, Copy, Hash, X } from 'lucide-angular';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, takeUntil } from 'rxjs/operators';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { Quotation, QuotationLineItem } from '../../../quotations/models/quotation.model';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder, SalesOrderLineItem } from '../../../sales-orders/models/sales-order.model';
import { POSService } from '../../services/pos.service';
import {
  AdvanceWizardDialogComponent,
  wizardLinesFromQuotation,
} from '../../../quotations/components/advance-wizard-dialog/advance-wizard-dialog.component';
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
  /** Anticipo ya timbrado. El carrito completa esa cotización o su venta. */
  advance?: {
    documentId: string;
    quotationId: string;
    quotationFolio: string;
    invoiceId: string | null;
    paid: number;
    environment: 'demo' | 'production' | null;
    kind: 'sale' | 'advance';
  };
}

type AbonoMethod = 'cash' | 'card' | 'transfer' | 'check';

interface FolioRow {
  key: string;
  kind: 'quotation' | 'sale';
  id: string;
  folio: string;
  customerName: string;
  companyName: string;
  personName: string;
  status: string;
  total: number;
  createdAt: string;
  paymentStatus: string;
  isCredit: boolean;
  pending: number | null;
  advanceRequested?: number | null;
  hasAdvance?: boolean;
  hasSale?: boolean;
  saleFolio?: string | null;
}

type FolioListKind = 'sale' | 'quotation';

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
  readonly notice = signal('');
  readonly rows = signal<FolioRow[]>([]);
  readonly razonSocial = signal('');
  readonly copiedFolio = signal('');
  readonly search = signal('');
  /** Anticipos es el proceso. Copiar orden es la búsqueda aparte. */
  readonly intent = signal<'advance' | 'copy'>('advance');
  readonly listKind = signal<FolioListKind>('sale');
  readonly withAdvance = signal(false);
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
  private loadSeq = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosFoliosDialogData,
    private dialogRef: MatDialogRef<PosFoliosDialogComponent, PosFolioCartPick | undefined>,
    private quotations: QuotationService,
    private dialog: MatDialog,
    private salesOrders: SalesOrderService,
    private posService: POSService,
    private fiscalConfigs: FiscalConfigurationService,
  ) {}

  ngOnInit(): void {
    if (this.data.mode === 'ventas') {
      this.listKind.set('quotation');
      this.withAdvance.set(true);
    }
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

  folioTitle(): string {
    if (this.data.mode === 'caja') return 'Folios con saldo';
    return this.intent() === 'copy' ? 'Copiar orden' : 'Anticipos';
  }

  folioHint(): string {
    if (this.data.mode === 'caja') return this.scopeLine();
    if (this.intent() === 'copy') {
      return 'Busca un folio o un cliente. La copia cobra el precio vigente.';
    }
    return `${this.scopeLine()}. Al continuar se elige el carrito.`;
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.search$.next(value);
  }

  setIntent(intent: 'advance' | 'copy'): void {
    if (this.data.mode === 'caja' || this.intent() === intent) return;
    this.intent.set(intent);
    this.openKey.set('');
    this.cancelAsk();
    if (intent === 'advance') {
      this.listKind.set('quotation');
      this.withAdvance.set(true);
    } else {
      this.listKind.set('sale');
      this.withAdvance.set(false);
    }
    this.load();
  }

  setListKind(kind: FolioListKind): void {
    if (this.data.mode === 'caja' || this.intent() !== 'copy' || this.listKind() === kind) return;
    this.listKind.set(kind);
    this.openKey.set('');
    this.cancelAsk();
    this.load();
  }

  emptyLabel(): string {
    if (this.data.mode === 'caja') {
      return this.search().trim() ? 'Nada coincide con la búsqueda.' : 'No hay órdenes con saldo.';
    }
    if (this.intent() === 'copy') {
      if (this.search().trim().length < 2) return 'Escribe un folio o un cliente.';
      return 'Nada coincide con la búsqueda.';
    }
    return this.search().trim()
      ? 'No hay un anticipo con ese dato.'
      : 'No hay cotizaciones con anticipo.';
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

  openAdvanceSale(row: FolioRow): void {
    this.error.set('');
    this.notice.set('');
    this.quotations.getDetail(row.id).subscribe({
      next: (detail) => {
        const header = detail.header;
        if (!header?.can_close_advance) {
          this.error.set(
            header?.advance_invoice
              ? 'Ese anticipo ya se aplicó.'
              : 'El anticipo sigue en caja. Primero tiene que cobrarse.',
          );
          return;
        }
        const paid = Number(header.advance_invoice?.total ?? header.amount_paid ?? 0);
        this.dialog
          .open(AdvanceWizardDialogComponent, {
            width: '560px',
            maxWidth: '95vw',
            autoFocus: false,
            panelClass: 'advance-wizard-dialog',
            data: {
              mode: 'close',
              quotationId: header.id,
              folio: header.folio,
              paid,
              warehouseId: header.warehouse_id,
              billingBranchId: header.billing_branch_id,
              lines: wizardLinesFromQuotation(detail.line_items ?? []),
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (!result || result.mode !== 'close') return;
            const extra = result.difference > 0.009
              ? ` Caja cobra ${this.formatMoney(result.difference)}.`
              : ' No hay diferencia por cobrar.';
            this.notice.set(`Venta ${result.salesOrderFolio} generada.${extra}`);
            this.load();
          });
      },
      error: (error: unknown) => {
        this.error.set(resolveHttpErrorMessage(error, 'No se pudo leer la cotización'));
      },
    });
  }

  takeToCart(row: FolioRow): void {
    if (this.takingId()) return;
    this.error.set('');
    if (row.kind === 'quotation') {
      this.takingId.set(row.id);
      this.readingFor.set('cart');
      this.quotations.getDetail(row.id).subscribe({
        next: (detail) => this.routeQuotationToCart(row, detail),
        error: (error: unknown) => {
          this.takingId.set('');
          this.readingFor.set('');
          this.error.set(resolveHttpErrorMessage(error, 'No se pudo leer la cotización'));
        },
      });
      return;
    }
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

  private routeQuotationToCart(row: FolioRow, detail: { header?: Quotation; line_items?: QuotationLineItem[] }): void {
    const header = detail.header;
    const invoice = header?.advance_invoice;
    const openAdvance = !!invoice?.uuid && invoice.applied !== true;
    if (header?.general_status === 'Convertida' && header.converted_to_sales_order_id) {
      if (!openAdvance) {
        this.takingId.set('');
        this.readingFor.set('');
        this.error.set('Esa cotización ya es una venta. Ábrela en Copiar orden.');
        return;
      }
      const orderId = header.converted_to_sales_order_id;
      this.salesOrders.getOrderDetailById(orderId).subscribe({
        next: (order) => {
          this.takingId.set('');
          this.readingFor.set('');
          const stage = order.header?.pos_stage;
          if (stage && stage !== 'ventas') {
            this.error.set('Esa venta ya está en caja.');
            return;
          }
          const saleRow: FolioRow = {
            ...row,
            kind: 'sale',
            id: order.header.id,
            folio: order.header.folio || row.folio,
          };
          const pick = this.pickFromDetail(saleRow, order);
          pick.lines = pick.lines.filter((line) => line.productSku !== 'anticipo_CFDI');
          pick.advance = {
            documentId: order.header.id,
            quotationId: header.id,
            quotationFolio: header.folio || row.folio,
            invoiceId: invoice?.id ?? null,
            paid: Number(invoice?.total ?? header.advance_requested_total ?? 0),
            environment:
              header.advance_stamp_environment === 'demo' || header.advance_stamp_environment === 'production'
                ? header.advance_stamp_environment
                : null,
            kind: 'sale',
          };
          this.cartAsk.set(pick);
          this.cartAskKey.set(row.key);
        },
        error: (error: unknown) => {
          this.takingId.set('');
          this.readingFor.set('');
          this.error.set(resolveHttpErrorMessage(error, 'No se pudo leer la venta'));
        },
      });
      return;
    }
    this.takingId.set('');
    this.readingFor.set('');
    const pick = this.pickFromDetail(row, detail);
    pick.lines = pick.lines.filter((line) => line.productSku !== 'anticipo_CFDI');
    if (openAdvance && header) {
      pick.advance = {
        documentId: header.id,
        quotationId: header.id,
        quotationFolio: header.folio || row.folio,
        invoiceId: invoice?.id ?? null,
        paid: Number(invoice?.total ?? header.advance_requested_total ?? 0),
        environment:
          header.advance_stamp_environment === 'demo' || header.advance_stamp_environment === 'production'
            ? header.advance_stamp_environment
            : null,
        kind: 'advance',
      };
      this.cartAsk.set(pick);
      this.cartAskKey.set(row.key);
      return;
    }
    if (!pick.lines.length) {
      this.error.set(`${row.folio} no tiene productos para el carrito`);
      return;
    }
    this.cartAsk.set(pick);
    this.cartAskKey.set(row.key);
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
    const seq = ++this.loadSeq;
    this.loading.set(true);
    this.error.set('');
    const search = this.search().trim();
    if (this.data.mode === 'ventas' && this.intent() === 'copy' && search.length < 2) {
      this.rows.set([]);
      this.loading.set(false);
      this.error.set('');
      return;
    }
    const branchId = this.data.branchId;
    const fiscalId = this.data.fiscalConfigurationId;
    const filters = {
      search: search || undefined,
      billing_branch_id: branchId,
      fiscal_configuration_id: fiscalId,
      ...(this.withAdvance() ? { has_advance: true } : {}),
    };
    const apply = (rows: FolioRow[]) => {
      if (seq !== this.loadSeq) return;
      this.rows.set(rows.filter((row) => row.status !== 'Cancelada'));
      this.loading.set(false);
    };

    if (this.data.mode === 'caja' || this.listKind() === 'sale') {
      this.salesOrders
        .getOrders(
          {
            ...filters,
            ...(this.data.mode === 'caja' ? { payment_status: 'Pendiente' as const } : {}),
          },
          { page: 1, limit: this.data.mode === 'caja' ? 40 : 30 },
        )
        .pipe(catchError(() => of({ data: [] as SalesOrder[] })))
        .subscribe((page) => apply(this.salesRows(page.data ?? [])));
      return;
    }

    this.posService
      .getFolioQuotations({ ...filters, page: 1, limit: 200 })
      .subscribe({
        next: (page) => apply(this.quotationRows(page.data ?? [])),
        error: (error: unknown) => {
          if (seq !== this.loadSeq) return;
          this.rows.set([]);
          this.loading.set(false);
          this.error.set(resolveHttpErrorMessage(error, 'No se pudieron cargar las cotizaciones'));
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
      const party = partyFrom(row.customer, row.customer_summary, row.customer_display_name);
      return {
      key: `q:${row.id}`,
      kind: 'quotation',
      id: row.id,
      folio: row.folio || row.id.slice(0, 8),
      ...party,
      status: row.general_status,
      total: Number(row.total ?? 0),
      createdAt: row.created_at || '',
      paymentStatus: '',
      isCredit: false,
      pending: null,
      advanceRequested: Number(row.advance_requested_total ?? 0) || null,
      hasAdvance: this.withAdvance() || Number(row.advance_requested_total ?? 0) > 0.009,
      hasSale: row.general_status === 'Convertida' || !!row.converted_to_sales_order_id,
      saleFolio: row.converted_sales_order_folio || null,
    };
    });
  }

  private salesRows(rows: SalesOrder[]): FolioRow[] {
    return rows.map((row) => {
      this.noteCompany(row.fiscal_razon_social);
      const pendingRaw = row.payments_summary?.amount_pending;
      const pending = pendingRaw == null ? null : Number(pendingRaw);
      const party = partyFrom(
        row.customer,
        row.customer_summary,
        row.customer_display_name,
        row.walk_in_name,
      );
      return {
        key: `s:${row.id}`,
        kind: 'sale' as const,
        id: row.id,
        folio: row.folio || row.id.slice(0, 8),
        ...party,
        status: row.general_status || row.status || '',
        total: Number(row.total ?? row.grand_total ?? 0),
        createdAt: (row as { created_at?: string }).created_at || '',
        paymentStatus: row.payment_status || '',
        isCredit: row.is_credit === true,
        pending: pending != null && Number.isFinite(pending) ? pending : null,
        hasAdvance:
          this.withAdvance() ||
          !!(row as SalesOrder & { advance_invoice_id?: string | null }).advance_invoice_id,
      };
    });
  }

  private pickFromDetail(row: FolioRow, detail: unknown): PosFolioCartPick {
    const payload = (detail ?? {}) as {
      header?: {
        customer_id?: number | string;
        customer?: { id?: number | string; is_walk_in?: boolean };
        customer_summary?: { id?: number | string; is_walk_in?: boolean };
        walk_in_name?: string | null;
        walk_in_rfc?: string | null;
        line_items?: Array<QuotationLineItem | SalesOrderLineItem>;
      };
      line_items?: Array<QuotationLineItem | SalesOrderLineItem>;
      customer_id?: number | string;
      customer?: { id?: number | string; is_walk_in?: boolean };
      customer_summary?: { id?: number | string; is_walk_in?: boolean };
      walk_in_name?: string | null;
      walk_in_rfc?: string | null;
    };
    const header = payload.header ?? payload;
    const lines = (payload.line_items ?? header.line_items ?? []).map((line) => mapLine(line));
    const customer = header.customer ?? payload.customer;
    const summary = header.customer_summary ?? payload.customer_summary;
    const rawId = header.customer_id ?? payload.customer_id ?? customer?.id ?? summary?.id;
    const markedWalkIn = customer?.is_walk_in === true || summary?.is_walk_in === true;
    const walkIn = rawId == null || rawId === '' || (markedWalkIn && isPublicName(row.customerName));
    const customerId = walkIn || rawId == null || rawId === '' ? null : String(rawId);
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

const PUBLIC_NAMES = new Set(['público en general', 'publico en general', 'venta de mostrador']);

function cleanName(value?: string | null): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function isPublicName(value: string): boolean {
  return PUBLIC_NAMES.has(value.trim().toLowerCase());
}

function joinPerson(source?: { name?: string; lastname?: string } | null): string {
  return [cleanName(source?.name), cleanName(source?.lastname)].filter(Boolean).join(' ');
}

function partyFrom(
  customer?: { name?: string; lastname?: string; company_name?: string; display_name?: string } | null,
  summary?: { name?: string; lastname?: string; company_name?: string; display_name?: string } | null,
  displayName?: string,
  walkInName?: string | null,
): { customerName: string; companyName: string; personName: string } {
  const company = cleanName(customer?.company_name) || cleanName(summary?.company_name);
  let person = joinPerson(customer) || joinPerson(summary);
  const walkIn = cleanName(walkInName);
  if (walkIn && (!person || isPublicName(person))) {
    person = walkIn;
  }
  if (company && person && company.toLowerCase() === person.toLowerCase()) {
    person = '';
  }
  if (company && isPublicName(person)) {
    person = '';
  }
  const fallback =
    cleanName(customer?.display_name) || cleanName(summary?.display_name) || cleanName(displayName);
  const customerName = company || person || (isPublicName(fallback) ? '' : fallback) || 'Público en General';
  return { customerName, companyName: company, personName: person };
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

import { Component, Input, OnInit, Output, EventEmitter, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ELECTRONIC_INVOICING_PERMISSIONS } from '../../config/electronic-invoicing-permissions.config';
import {
  FinkokConfigurationsResponse,
  InvoiceValidationIssue,
  SalesOrderElectronicInvoice,
  isLocalStampHost,
} from '../../models/sales-order-electronic-invoice.model';
import { SalesOrder, SalesOrderLineItem, Customer } from '../../models/sales-order.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import {
  countPendingSyncInvoices,
  countVigenteInvoices,
  fiveDigitPostalCode,
  getInvoiceStatusClass,
  getInvoiceStatusLabel,
  isGenericPublicReceptor,
} from '../../utils/cfdi-xml-builder.util';
import { resolveSalesOrderCustomerId } from '../../utils/customer-display.util';
import {
  SalesOrderInvoiceCancelDialogComponent,
  SalesOrderInvoiceCancelDialogResult,
} from '../sales-order-invoice-cancel-dialog/sales-order-invoice-cancel-dialog.component';
import {
  SalesOrderInvoiceStampDialogComponent,
  SalesOrderInvoiceStampDialogResult,
} from '../sales-order-invoice-stamp-dialog/sales-order-invoice-stamp-dialog.component';
import { FiscalConfigurationModalComponent } from '../../../settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';

@Component({
  selector: 'app-sales-order-invoicing-tab',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './sales-order-invoicing-tab.component.html',
  styleUrl: './sales-order-invoicing-tab.component.scss',
})
export class SalesOrderInvoicingTabComponent implements OnInit {
  @Input({ required: true }) orderId!: string;
  @Input({ required: true }) order!: SalesOrder;
  @Input({ required: true }) lineItems: SalesOrderLineItem[] = [];
  @Input() onCustomerEdit?: () => void;
  @Input() onFiscalEdit?: () => void;
  @Output() invoicesChanged = new EventEmitter<void>();

  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly fiscalConfigService = inject(FiscalConfigurationService);
  private readonly customerService = inject(CustomerService);

  invoices = signal<SalesOrderElectronicInvoice[]>([]);
  finkokConfig = signal<FinkokConfigurationsResponse | null>(null);
  loading = signal(true);
  stamping = signal(false);
  syncingId = signal<string | null>(null);
  cancellingId = signal<string | null>(null);
  previewingPdfId = signal<string | null>(null);
  downloadingXmlId = signal<string | null>(null);

  canViewTab = computed(() =>
    this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.viewMenu) &&
    this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.read)
  );

  canStamp = computed(() => this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.stamp));
  canCancel = computed(
    () =>
      this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.cancel) ||
      this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.stamp)
  );
  canSyncSat = computed(() => this.hasInvoicePermission(ELECTRONIC_INVOICING_PERMISSIONS.syncSat));

  summaryText = computed(() => {
    const list = this.visibleInvoices();
    return `${list.length} factura${list.length === 1 ? '' : 's'} · ${countVigenteInvoices(list)} vigente${countVigenteInvoices(list) === 1 ? '' : 's'} · ${countPendingSyncInvoices(list)} pendientes sync`;
  });

  validationIssues = computed(() => this.buildValidationIssues());
  canStampInvoice = computed(() => this.canStamp() && this.validationIssues().length === 0);

  activeInvoiceWarning = computed(() => {
    const vigentesProd = this.visibleInvoices().filter((invoice) => {
      if (this.getInvoiceEnvironment(invoice) !== 'production') return false;
      const stamp = (invoice.stamp_status || '').toLowerCase();
      const sat = (invoice.sat_status || '').toLowerCase();
      return stamp === 'stamped' && !/\bcancelad[oa]\b/.test(sat);
    });
    if (vigentesProd.length > 0 && this.canStamp()) {
      return 'Ya existe una factura activa en producción. Cancela la anterior antes de timbrar otra factura en PROD.';
    }
    return null;
  });

  demoStampedCount = computed(() =>
    this.visibleInvoices().filter((invoice) => !!String(invoice.uuid || '').trim() && this.isStamped(invoice)).length
  );

  demoCancelledCount = computed(() =>
    this.visibleInvoices().filter((invoice) => this.isCancelledStatus(invoice)).length
  );

  visibleInvoices = computed(() =>
    this.invoices().filter((invoice) => {
      const stamp = (invoice.stamp_status || '').toLowerCase();
      return (
        stamp === 'stamped' ||
        stamp === 'cancel_pending' ||
        stamp === 'cancelled' ||
        stamp === 'cancel_error'
      );
    })
  );

  ngOnInit(): void {
    if (this.canViewTab()) {
      this.loadTabData();
    } else {
      this.loading.set(false);
    }
  }

  loadTabData(silent = false): void {
    if (!silent) {
      this.loading.set(true);
    }
    this.invoiceService.getInvoices(this.orderId).subscribe({
      next: (invoices) => {
        this.invoices.set(invoices.map((invoice) => this.mapInvoice(invoice)));
        this.loading.set(false);
        this.invoicesChanged.emit();
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al cargar facturas'));
      },
    });

    this.invoiceService.getFinkokConfiguration().subscribe({
      next: (config) => this.finkokConfig.set(config),
      error: () => this.finkokConfig.set(null),
    });
  }

  private buildValidationIssues(): InvoiceValidationIssue[] {
    const issues: InvoiceValidationIssue[] = [];
    const order = this.order;
    const fiscal = order.fiscal_configuration as
      | (SalesOrder['fiscal_configuration'] & {
          finkok_registration_status?: string;
        })
      | undefined;
    const customer = order.customer;

    if (fiscal?.finkok_registration_status && fiscal.finkok_registration_status !== 'registered') {
      issues.push({
        id: 'fiscal-finkok',
        message: 'La razón emisora no está registrada en Finkok.',
        action: 'fiscal',
      });
    }

    const rfc = customer?.fiscal_rfc;
    const genericPublic = isGenericPublicReceptor(order);
    if (!genericPublic && (!rfc || !String(rfc).trim())) {
      issues.push({
        id: 'customer-rfc',
        message: 'El cliente no tiene RFC fiscal configurado.',
        action: 'customer',
      });
    }

    if (!genericPublic && !String(customer?.fiscal_razon_social ?? '').trim()) {
      issues.push({
        id: 'customer-razon',
        message: 'El cliente no tiene razón social SAT. Debe coincidir letra por letra con la CSF.',
        action: 'customer',
      });
    }

    if (!genericPublic && !fiveDigitPostalCode(customer?.fiscal_postal_code) && !fiveDigitPostalCode(customer?.fiscal_zip_code)) {
      issues.push({
        id: 'customer-cp',
        message: 'El cliente no tiene código postal fiscal de 5 dígitos (CSF).',
        action: 'customer',
      });
    }

    if (!fiveDigitPostalCode(order.billing_branch?.postal_code)) {
      issues.push({
        id: 'branch-cp',
        message: 'La sucursal de facturación no tiene código postal de expedición.',
        action: 'fiscal',
      });
    }

    const status = order.general_status ?? order.status;
    if (status === 'Cancelada') {
      issues.push({
        id: 'order-cancelled',
        message: 'No se puede timbrar una orden cancelada.',
      });
    }

    return issues;
  }

  openNewInvoice(): void {
    if (!this.canStampInvoice() || this.stamping()) return;

    const fiscalId = this.order.fiscal_configuration?.id ?? this.order.fiscal_configuration_id;
    const hasPrefix = !!String(this.order.fiscal_configuration?.prefix ?? '').trim();
    const customerId = resolveSalesOrderCustomerId(this.order);

    const fiscal$ =
      fiscalId && !hasPrefix
        ? this.fiscalConfigService.getFiscalConfiguration(fiscalId).pipe(catchError(() => of(null)))
        : of(null);

    const customer$ = customerId
      ? this.customerService.getCustomer(String(customerId)).pipe(catchError(() => of(null)))
      : of(null);

    this.stamping.set(true);
    forkJoin({ fiscal: fiscal$, customer: customer$ }).subscribe({
      next: ({ fiscal, customer }) => {
        this.stamping.set(false);
        this.openStampDialog(this.orderForStamp(fiscal, customer));
      },
      error: () => {
        this.stamping.set(false);
        this.openStampDialog(this.order);
      },
    });
  }

  private orderForStamp(fiscal: FiscalConfiguration | null, customerRaw: unknown): SalesOrder {
    const customer = this.unwrapCustomerPayload(customerRaw);
    return {
      ...this.order,
      fiscal_configuration: fiscal
        ? { ...this.order.fiscal_configuration, ...fiscal }
        : this.order.fiscal_configuration,
      customer: customer
        ? {
            ...(this.order.customer ?? { id: customer.id, name: customer.name }),
            ...customer,
            fiscal_rfc: customer.fiscal_rfc ?? this.order.customer?.fiscal_rfc,
            fiscal_razon_social: customer.fiscal_razon_social ?? this.order.customer?.fiscal_razon_social,
            fiscal_postal_code: customer.fiscal_postal_code ?? this.order.customer?.fiscal_postal_code,
          }
        : this.order.customer,
    };
  }

  private unwrapCustomerPayload(raw: unknown): Customer | null {
    if (!raw || typeof raw !== 'object') return null;
    const obj = raw as Record<string, unknown>;
    const source =
      obj['data'] && typeof obj['data'] === 'object' && !Array.isArray(obj['data'])
        ? (obj['data'] as Record<string, unknown>)
        : obj;
    if (source['id'] == null && !source['fiscal_rfc'] && !source['fiscal_postal_code']) {
      return null;
    }
    const str = (value: unknown): string | undefined => {
      if (value == null) return undefined;
      const text = String(value).trim();
      return text || undefined;
    };
    return {
      id: (source['id'] as Customer['id']) ?? this.order.customer?.id ?? '',
      name: str(source['name']) || this.order.customer?.name || '',
      lastname: str(source['lastname']),
      company_name: str(source['company_name']),
      email: str(source['email']),
      phone: str(source['phone']),
      fiscal_rfc: str(source['fiscal_rfc']),
      fiscal_razon_social: str(source['fiscal_razon_social']),
      fiscal_postal_code: str(source['fiscal_postal_code']),
      fiscal_zip_code: str(source['fiscal_zip_code']),
    };
  }

  private openStampDialog(order: SalesOrder): void {
    const dialogRef = this.dialog.open(SalesOrderInvoiceStampDialogComponent, {
      width: '860px',
      maxWidth: '95vw',
      panelClass: 'invoice-stamp-dialog-panel',
      data: {
        orderId: this.orderId,
        order,
        lineItems: this.lineItems,
        finkokConfig: this.finkokConfig(),
        validationIssues: this.validationIssues(),
        canStamp: this.canStampInvoice(),
      },
    });

    dialogRef.afterClosed().subscribe((result: SalesOrderInvoiceStampDialogResult | undefined) => {
      if (!result?.stamped) return;
      this.loadTabData();
    });
  }

  openCancelInvoice(invoice: SalesOrderElectronicInvoice): void {
    const invoiceId = this.invoiceRecordId(invoice);
    if (!invoiceId) {
      this.toast.error('No se encontró el id de la factura para cancelar');
      return;
    }

    this.dialog
      .open(SalesOrderInvoiceCancelDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { invoice },
      })
      .afterClosed()
      .subscribe((result: SalesOrderInvoiceCancelDialogResult | undefined) => {
        if (!result?.payload) return;
        this.cancellingId.set(invoiceId);
        this.invoiceService.cancelInvoice(this.orderId, invoiceId, result.payload).subscribe({
          next: () => {
            this.cancellingId.set(null);
            this.toast.success('Solicitud de cancelación enviada');
            this.loadTabData();
          },
          error: (error) => {
            this.cancellingId.set(null);
            this.toast.error(resolveHttpErrorMessage(error, 'Error al cancelar factura'), {
              duration: 12000,
            });
          },
        });
      });
  }

  syncSat(invoice: SalesOrderElectronicInvoice): void {
    if (!this.canShowSyncSat(invoice) || this.syncingId()) return;
    const invoiceId = this.invoiceRecordId(invoice);
    if (!invoiceId) {
      this.toast.error('No se encontró el id de la factura para sincronizar');
      return;
    }

    this.syncingId.set(invoiceId);
    this.invoiceService.syncSat(this.orderId, invoiceId).subscribe({
      next: (updated) => {
        this.syncingId.set(null);
        this.patchInvoice(updated, invoiceId);
        this.toast.success('Estatus SAT actualizado');
        this.loadTabData(true);
      },
      error: (error) => {
        this.syncingId.set(null);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al sincronizar con SAT'), {
          duration: 12000,
        });
      },
    });
  }

  canShowXml(invoice: SalesOrderElectronicInvoice): boolean {
    return !!String(invoice.uuid || '').trim();
  }

  downloadXml(invoice: SalesOrderElectronicInvoice): void {
    const invoiceId = this.invoiceRecordId(invoice);
    if (!invoiceId || this.downloadingXmlId()) return;

    this.downloadingXmlId.set(invoiceId);
    this.invoiceService.getInvoiceXml(this.orderId, invoiceId).subscribe({
      next: (blob) => {
        this.downloadingXmlId.set(null);
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = this.getInvoiceXmlFileName(invoice);
        anchor.rel = 'noopener';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.downloadingXmlId.set(null);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al descargar el XML'), {
          duration: 12000,
        });
      },
    });
  }

  canShowPdf(invoice: SalesOrderElectronicInvoice): boolean {
    const uuid = String(invoice.uuid || '').trim();
    if (!uuid) return false;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return stamp === 'stamped' || stamp === 'cancel_pending' || stamp === 'cancelled';
  }

  openInvoicePdf(invoice: SalesOrderElectronicInvoice): void {
    const invoiceId = this.invoiceRecordId(invoice);
    if (!invoiceId || this.previewingPdfId() || !this.canShowPdf(invoice)) return;

    this.previewingPdfId.set(invoiceId);
    this.invoiceService.getInvoicePdf(this.orderId, invoiceId).subscribe({
      next: (response) => {
        this.previewingPdfId.set(null);
        if (!response.signedUrl) {
          this.toast.error('No se recibió la URL del PDF');
          return;
        }
        window.open(response.signedUrl, '_blank', 'noopener,noreferrer');
      },
      error: (error) => {
        this.previewingPdfId.set(null);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al obtener el PDF'), {
          duration: 12000,
        });
      },
    });
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = Number(value);
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number.isFinite(n) ? n : 0);
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? value : d.toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
  }

  getSeriesFolio(invoice: SalesOrderElectronicInvoice): string {
    const parts = [invoice.series, invoice.folio].filter(Boolean);
    return parts.length ? parts.join('-') : '—';
  }

  getInvoiceFileName(invoice: SalesOrderElectronicInvoice): string {
    const orderRef = this.order.folio || this.order.id.substring(0, 8);
    const seriesFolio = this.getSeriesFolio(invoice).replace('—', 'SIN-FOLIO');
    const stampedAt = invoice.stamped_at || invoice.issued_at;
    const datePart = stampedAt
      ? new Date(stampedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    return `OV_FACTURA_${orderRef}_${seriesFolio}_${datePart}.pdf`;
  }

  getInvoiceXmlFileName(invoice: SalesOrderElectronicInvoice): string {
    const uuid = String(invoice.uuid || '').trim();
    return uuid ? `${uuid}.xml` : 'factura.xml';
  }

  showDemoAltaBanner(): boolean {
    return isLocalStampHost() || this.finkokConfig()?.stamping_environment === 'demo';
  }

  getInvoiceEnvironment(invoice: SalesOrderElectronicInvoice): 'demo' | 'production' | null {
    const raw = String(invoice.metadata?.finkok_environment || '').trim().toLowerCase();
    if (raw === 'demo' || raw === 'production') return raw;
    return null;
  }

  getInvoiceEnvironmentLabel(invoice: SalesOrderElectronicInvoice): 'DEMO' | 'PROD' | null {
    const env = this.getInvoiceEnvironment(invoice);
    if (env === 'demo') return 'DEMO';
    if (env === 'production') return 'PROD';
    return null;
  }

  getSystemStatusLabel(invoice: SalesOrderElectronicInvoice): string {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamped') return 'Activa en sistema';
    if (stamp === 'stamp_error') return 'Error de timbrado';
    if (stamp === 'cancel_pending') return 'Cancelación pendiente';
    if (stamp === 'cancel_error') return 'Error de cancelación';
    if (stamp === 'cancelled') return 'Cancelada';
    if (stamp === 'pending' || stamp === 'pending_stamp') return 'Pendiente';
    return invoice.status || '—';
  }

  getSystemStatusClass(invoice: SalesOrderElectronicInvoice): string {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamped') return 'status-pill--success';
    if (stamp === 'stamp_error' || stamp === 'cancelled' || stamp === 'cancel_error') {
      return 'status-pill--danger';
    }
    if (stamp === 'cancel_pending' || stamp === 'pending' || stamp === 'pending_stamp') {
      return 'status-pill--warning';
    }
    return 'status-pill--neutral';
  }

  getSatStatusLabel(invoice: SalesOrderElectronicInvoice): string {
    const sat = invoice.sat_status?.trim();
    if (sat) return sat;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamp_error') return 'Error timbrado';
    if (stamp === 'stamped' || stamp === 'cancel_pending') return 'Sin verificar';
    return '—';
  }

  getSatStatusClass(invoice: SalesOrderElectronicInvoice): string {
    const label = (invoice.sat_status || '').toLowerCase();
    if (label.includes('vigente')) return 'status-pill--success';
    if (label.includes('cancelad')) return 'status-pill--danger';
    if (label.includes('no encontrado') || label.includes('desconocido')) return 'status-pill--warning';
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'cancel_pending') return 'status-pill--warning';
    if (stamp === 'cancel_error' || stamp === 'stamp_error') return 'status-pill--danger';
    return 'status-pill--neutral';
  }

  getEmisorRfc(): string {
    return this.order.fiscal_configuration?.rfc || '—';
  }

  getReceptorRfc(): string {
    return this.order.customer?.fiscal_rfc?.trim() || '—';
  }

  getInvoiceSubtotal(invoice: SalesOrderElectronicInvoice): number {
    const metadata = invoice.metadata as { subtotal?: string | number } | undefined;
    if (metadata?.subtotal != null) return Number(metadata.subtotal) || 0;
    const orderSubtotal = this.order.subtotal ?? this.order.requested_subtotal ?? this.order.delivered_subtotal;
    return Number(orderSubtotal) || Number(invoice.total) || 0;
  }

  getInvoiceTaxes(invoice: SalesOrderElectronicInvoice): number {
    const metadata = invoice.metadata as { taxes?: string | number; impuestos?: string | number } | undefined;
    if (metadata?.taxes != null) return Number(metadata.taxes) || 0;
    if (metadata?.impuestos != null) return Number(metadata.impuestos) || 0;
    const iva = Number(this.order.iva_total ?? this.order.requested_iva_total ?? 0) || 0;
    const ieps = Number(this.order.ieps_total ?? this.order.requested_ieps_total ?? 0) || 0;
    const total = Number(invoice.total) || 0;
    const subtotal = this.getInvoiceSubtotal(invoice);
    if (total > subtotal) return total - subtotal;
    return iva + ieps;
  }

  getStampedBy(invoice: SalesOrderElectronicInvoice): string {
    const metadata = invoice.metadata as { stamped_by?: string; stamped_by_name?: string } | undefined;
    return metadata?.stamped_by_name || metadata?.stamped_by || '—';
  }

  getSatStatusCode(invoice: SalesOrderElectronicInvoice): string {
    const fromInvoice = invoice.sat_codigo_estatus?.trim();
    if (fromInvoice) return fromInvoice;
    const metadata = invoice.metadata as { sat_codigo_estatus?: string; sat_status_code?: string } | undefined;
    return metadata?.sat_codigo_estatus?.trim() || metadata?.sat_status_code?.trim() || '—';
  }

  getSatCancelStatus(invoice: SalesOrderElectronicInvoice): string {
    const fromInvoice = invoice.sat_estatus_cancelacion?.trim();
    if (fromInvoice) return fromInvoice;
    const metadata = invoice.metadata as { sat_estatus_cancelacion?: string; sat_cancel_status?: string } | undefined;
    return metadata?.sat_estatus_cancelacion?.trim() || metadata?.sat_cancel_status?.trim() || '—';
  }

  openSatPortal(invoice: SalesOrderElectronicInvoice): void {
    const uuid = invoice.uuid?.trim();
    if (!uuid) {
      this.toast.info('UUID no disponible para verificar en SAT');
      return;
    }

    const emisor = this.getEmisorRfc();
    const receptor = this.getReceptorRfc();
    const total = Number(invoice.total) || 0;
    const params = new URLSearchParams({
      id: uuid,
      re: emisor !== '—' ? emisor : '',
      rr: receptor !== '—' ? receptor : '',
      tt: total.toFixed(6),
    });
    window.open(
      `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?${params.toString()}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  getStatusLabel = getInvoiceStatusLabel;
  getStatusClass = getInvoiceStatusClass;

  handleValidationAction(issue: InvoiceValidationIssue): void {
    if (issue.action === 'customer') {
      this.onCustomerEdit?.();
      return;
    }
    if (issue.action === 'finkok') {
      void this.router.navigate(['/settings/fiscal-configurations'], {
        queryParams: { tab: 'finkok' },
      });
      return;
    }
    if (issue.action === 'fiscal') {
      this.openFiscalConfig();
    }
  }

  private openFiscalConfig(): void {
    if (this.onFiscalEdit) {
      this.onFiscalEdit();
      return;
    }

    const fiscalId = this.order.fiscal_configuration?.id ?? this.order.fiscal_configuration_id;
    if (!fiscalId) return;

    this.fiscalConfigService.getFiscalConfiguration(fiscalId).subscribe({
      next: (config) => this.openFiscalModal(config),
      error: () => {
        if (this.order.fiscal_configuration) {
          this.openFiscalModal({ ...this.order.fiscal_configuration, id: fiscalId } as FiscalConfiguration);
        }
      },
    });
  }

  private openFiscalModal(fiscalConfig: FiscalConfiguration): void {
    this.dialog.open(FiscalConfigurationModalComponent, {
      width: '92vw',
      maxWidth: '760px',
      data: { fiscalConfig },
    });
  }

  getInvoiceErrorTooltip(invoice: SalesOrderElectronicInvoice): string {
    const parts = [invoice.stamp_error_message];
    const incidencias = invoice.metadata?.finkok_incidencias ?? [];
    for (const inc of incidencias) {
      if (inc.message) parts.push(inc.message);
    }
    return parts.filter(Boolean).join(' · ') || 'Error de timbrado';
  }

  canShowCancel(invoice: SalesOrderElectronicInvoice): boolean {
    if (!this.canCancel()) return false;
    const uuid = String(invoice.uuid || '').trim();
    if (!uuid) return false;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return stamp === 'stamped' || stamp === 'cancel_pending';
  }

  canShowSyncSat(invoice: SalesOrderElectronicInvoice): boolean {
    if (!this.canSyncSat()) return false;
    const uuid = String(invoice.uuid || '').trim();
    if (!uuid) return false;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return (
      stamp === 'stamped' ||
      stamp === 'cancel_pending' ||
      stamp === 'cancelled' ||
      stamp === 'cancel_error'
    );
  }

  isStampError(invoice: SalesOrderElectronicInvoice): boolean {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return stamp === 'stamp_error' || (!String(invoice.uuid || '').trim() && stamp !== 'cancel_pending' && stamp !== 'cancelled');
  }

  private isStamped(invoice: SalesOrderElectronicInvoice): boolean {
    return (invoice.stamp_status || '').toLowerCase() === 'stamped';
  }

  private isCancelledStatus(invoice: SalesOrderElectronicInvoice): boolean {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    const sat = (invoice.sat_status || '').toLowerCase();
    return stamp === 'cancelled' || stamp === 'cancel_pending' || /\bcancelad[oa]\b/.test(sat);
  }

  invoiceRecordId(invoice: SalesOrderElectronicInvoice): string {
    const row = invoice as SalesOrderElectronicInvoice & Record<string, unknown>;
    const nested = row['invoice'];
    const nestedId =
      nested && typeof nested === 'object' ? String((nested as { id?: string }).id || '') : '';
    return String(
      invoice.id || row['invoice_id'] || row['_id'] || row['electronic_invoice_id'] || nestedId || ''
    ).trim();
  }

  private patchInvoice(updated: SalesOrderElectronicInvoice, fallbackId: string): void {
    const mapped = this.mapInvoice(updated);
    const updatedId = this.invoiceRecordId(mapped) || fallbackId;
    this.invoices.update((list) =>
      list.map((invoice) => (this.invoiceRecordId(invoice) === updatedId ? { ...invoice, ...mapped, id: updatedId } : invoice))
    );
  }

  private pickText(row: Record<string, unknown>, ...keys: string[]): string | null {
    for (const key of keys) {
      const value = row[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return null;
  }

  private mapInvoice(invoice: SalesOrderElectronicInvoice): SalesOrderElectronicInvoice {
    const row = invoice as SalesOrderElectronicInvoice & Record<string, unknown>;
    const nested =
      row['invoice'] && typeof row['invoice'] === 'object'
        ? (row['invoice'] as SalesOrderElectronicInvoice)
        : invoice;
    const source = { ...nested, ...invoice };
    const sourceRow = source as SalesOrderElectronicInvoice & Record<string, unknown>;
    const uuid =
      source.uuid ||
      (sourceRow['cfdi_uuid'] as string) ||
      (sourceRow['fiscal_uuid'] as string) ||
      null;
    const stampStatus =
      source.stamp_status ||
      (sourceRow['stampStatus'] as string) ||
      (!uuid ? 'stamp_error' : undefined);
    const metadata: NonNullable<SalesOrderElectronicInvoice['metadata']> = {
      ...(nested.metadata || {}),
      ...(source.metadata || {}),
    };
    const finkokEnv =
      this.pickText(metadata as Record<string, unknown>, 'finkok_environment', 'finkokEnvironment') ||
      this.pickText(sourceRow, 'finkok_environment', 'finkokEnvironment');
    if (finkokEnv) {
      metadata.finkok_environment = finkokEnv;
    }
    return {
      ...source,
      id: this.invoiceRecordId(source),
      uuid,
      stamp_status: stampStatus,
      metadata,
      sat_status: this.pickText(sourceRow, 'sat_status', 'satStatus') || source.sat_status,
      sat_es_cancelable: this.pickText(sourceRow, 'sat_es_cancelable', 'satEsCancelable'),
      sat_estatus_cancelacion: this.pickText(
        sourceRow,
        'sat_estatus_cancelacion',
        'satEstatusCancelacion'
      ),
      sat_codigo_estatus: this.pickText(sourceRow, 'sat_codigo_estatus', 'satCodigoEstatus'),
      sat_last_sync_at: this.pickText(sourceRow, 'sat_last_sync_at', 'satLastSyncAt'),
    };
  }

  private hasInvoicePermission(permission: string): boolean {
    return this.authService.hasAdminRole() || this.authService.hasPermission(permission);
  }

  /** "Cancelado/Cancelada", no "Cancelable". */
  private isCancelledSatOrStamp(invoice: SalesOrderElectronicInvoice): boolean {
    const sat = (invoice.sat_status || '').toLowerCase();
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return /\bcancelad[oa]\b/.test(sat) || stamp === 'cancelled';
  }
}

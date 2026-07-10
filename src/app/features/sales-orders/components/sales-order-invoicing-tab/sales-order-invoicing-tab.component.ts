import { Component, Input, OnInit, Output, EventEmitter, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ELECTRONIC_INVOICING_PERMISSIONS } from '../../config/electronic-invoicing-permissions.config';
import {
  FinkokConfigurationsResponse,
  hasFinkokCredentials,
  InvoiceValidationIssue,
  SalesOrderElectronicInvoice,
} from '../../models/sales-order-electronic-invoice.model';
import { SalesOrder, SalesOrderLineItem, Customer } from '../../models/sales-order.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import {
  countPendingSyncInvoices,
  countVigenteInvoices,
  getInvoiceStatusClass,
  getInvoiceStatusLabel,
} from '../../utils/cfdi-xml-builder.util';
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
  imports: [CommonModule],
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

  invoices = signal<SalesOrderElectronicInvoice[]>([]);
  finkokConfig = signal<FinkokConfigurationsResponse | null>(null);
  loading = signal(true);
  stamping = signal(false);
  syncingId = signal<string | null>(null);
  cancellingId = signal<string | null>(null);
  previewingPdfId = signal<string | null>(null);

  canViewTab = computed(() =>
    this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.viewMenu) &&
    this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.read)
  );

  canStamp = computed(() => this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.stamp));
  canCancel = computed(() => this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.cancel));
  canSyncSat = computed(() => this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.syncSat));

  summaryText = computed(() => {
    const list = this.invoices();
    return `${list.length} factura${list.length === 1 ? '' : 's'} · ${countVigenteInvoices(list)} vigente${countVigenteInvoices(list) === 1 ? '' : 's'} · ${countPendingSyncInvoices(list)} pendientes sync`;
  });

  validationIssues = computed(() => this.buildValidationIssues());
  canStampInvoice = computed(() => this.canStamp() && this.validationIssues().length === 0);

  activeInvoiceWarning = computed(() => {
    const env = this.finkokConfig()?.stamping_environment;
    if (env !== 'production') return null;
    const vigentes = countVigenteInvoices(this.invoices());
    if (vigentes > 0 && this.canStamp()) {
      return 'Ya existe una factura activa en producción. Cancela la anterior antes de timbrar otra factura en PROD.';
    }
    return null;
  });

  ngOnInit(): void {
    if (this.canViewTab()) {
      this.loadTabData();
    } else {
      this.loading.set(false);
    }
  }

  loadTabData(): void {
    this.loading.set(true);
    this.invoiceService.getInvoices(this.orderId).subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
        this.loading.set(false);
        this.invoicesChanged.emit();
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(error?.message || 'Error al cargar facturas');
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
    const finkok = this.finkokConfig();

    if (!hasFinkokCredentials(finkok)) {
      issues.push({
        id: 'finkok',
        message: 'No hay credenciales Finkok activas. Configúralas en Configuración Fiscal → Integración Finkok.',
        action: 'finkok',
      });
    }

    if (fiscal?.finkok_registration_status && fiscal.finkok_registration_status !== 'registered') {
      issues.push({
        id: 'fiscal-finkok',
        message: 'La razón emisora no está registrada en Finkok.',
        action: 'fiscal',
      });
    }

    const rfc = customer?.fiscal_rfc;
    if (!rfc || !String(rfc).trim()) {
      issues.push({
        id: 'customer-rfc',
        message: 'El cliente no tiene RFC fiscal configurado.',
        action: 'customer',
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
    if (!this.canStampInvoice()) return;

    const dialogRef = this.dialog.open(SalesOrderInvoiceStampDialogComponent, {
      width: '860px',
      maxWidth: '95vw',
      panelClass: 'invoice-stamp-dialog-panel',
      data: {
        order: this.order,
        lineItems: this.lineItems,
        finkokConfig: this.finkokConfig(),
        validationIssues: this.validationIssues(),
        canStamp: this.canStampInvoice(),
      },
    });

    dialogRef.afterClosed().subscribe((result: SalesOrderInvoiceStampDialogResult | undefined) => {
      if (!result?.payload) return;
      this.stamping.set(true);
      this.invoiceService.stampInvoice(this.orderId, result.payload).subscribe({
        next: () => {
          this.stamping.set(false);
          this.toast.success('Factura timbrada correctamente');
          this.loadTabData();
        },
        error: (error) => {
          this.stamping.set(false);
          this.toast.error(error?.message || 'Error al timbrar factura');
          this.loadTabData();
        },
      });
    });
  }

  openCancelInvoice(invoice: SalesOrderElectronicInvoice): void {
    if (!this.canCancel() || !invoice.id) return;

    this.dialog
      .open(SalesOrderInvoiceCancelDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { invoice },
      })
      .afterClosed()
      .subscribe((result: SalesOrderInvoiceCancelDialogResult | undefined) => {
        if (!result?.payload) return;
        this.cancellingId.set(invoice.id);
        this.invoiceService.cancelInvoice(this.orderId, invoice.id, result.payload).subscribe({
          next: () => {
            this.cancellingId.set(null);
            this.toast.success('Solicitud de cancelación enviada');
            this.loadTabData();
          },
          error: (error) => {
            this.cancellingId.set(null);
            this.toast.error(error?.message || 'Error al cancelar factura');
          },
        });
      });
  }

  syncSat(invoice: SalesOrderElectronicInvoice): void {
    if (!this.canSyncSat() || !invoice.id || this.syncingId()) return;

    this.syncingId.set(invoice.id);
    this.invoiceService.syncSat(this.orderId, invoice.id).subscribe({
      next: () => {
        this.syncingId.set(null);
        this.toast.success('Estatus SAT actualizado');
        this.loadTabData();
      },
      error: (error) => {
        this.syncingId.set(null);
        this.toast.error(error?.message || 'Error al sincronizar con SAT');
      },
    });
  }

  viewXml(invoice: SalesOrderElectronicInvoice): void {
    const xml = invoice.xml_stamped;
    if (!xml) {
      this.toast.info('XML no disponible');
      return;
    }
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  canShowPdfPreview(invoice: SalesOrderElectronicInvoice): boolean {
    if (!this.isDemoEnvironment() || !invoice.xml_unsigned) return false;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    return stamp === 'stamp_error' || stamp === 'pending_stamp' || stamp === 'pending';
  }

  openPdfPreview(invoice: SalesOrderElectronicInvoice): void {
    if (!invoice.id || this.previewingPdfId() || !this.canShowPdfPreview(invoice)) return;

    this.previewingPdfId.set(invoice.id);
    this.invoiceService.getInvoicePdf(this.orderId, invoice.id, { preview: true }).subscribe({
      next: (response) => {
        this.previewingPdfId.set(null);
        if (!response.signedUrl) {
          this.toast.error('No se recibió la URL del PDF de vista previa');
          return;
        }
        window.open(response.signedUrl, '_blank', 'noopener,noreferrer');
      },
      error: (error) => {
        this.previewingPdfId.set(null);
        this.toast.error(error?.message || 'Error al generar vista previa PDF');
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

  isDemoEnvironment(): boolean {
    return this.finkokConfig()?.stamping_environment === 'demo';
  }

  getEnvironmentLabel(): string {
    return this.isDemoEnvironment() ? 'DEMO' : 'PROD';
  }

  getSystemStatusLabel(invoice: SalesOrderElectronicInvoice): string {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamped') return 'Activa en sistema';
    if (stamp === 'stamp_error') return 'Error de timbrado';
    if (stamp === 'cancel_pending') return 'Cancelación pendiente';
    if (stamp === 'cancelled') return 'Cancelada';
    if (stamp === 'pending' || stamp === 'pending_stamp') return 'Pendiente';
    return invoice.status || '—';
  }

  getSystemStatusClass(invoice: SalesOrderElectronicInvoice): string {
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamped') return 'status-pill--success';
    if (stamp === 'stamp_error' || stamp === 'cancelled') return 'status-pill--danger';
    if (stamp === 'cancel_pending' || stamp === 'pending' || stamp === 'pending_stamp') return 'status-pill--warning';
    return 'status-pill--neutral';
  }

  getSatStatusLabel(invoice: SalesOrderElectronicInvoice): string {
    const sat = invoice.sat_status?.trim();
    if (sat) return sat;
    const stamp = (invoice.stamp_status || '').toLowerCase();
    if (stamp === 'stamp_error') return 'Error timbrado';
    if (stamp === 'stamped') return 'Sin verificar';
    return '—';
  }

  getSatStatusClass(invoice: SalesOrderElectronicInvoice): string {
    const label = (invoice.sat_status || invoice.stamp_status || '').toLowerCase();
    if (label.includes('vigente')) return 'status-pill--success';
    if (label.includes('cancel') && !label.includes('pending')) return 'status-pill--danger';
    if (label.includes('error') || label.includes('no encontrado')) return 'status-pill--warning';
    if (label.includes('pending')) return 'status-pill--warning';
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
    const metadata = invoice.metadata as { sat_status_code?: string } | undefined;
    if (metadata?.sat_status_code) return metadata.sat_status_code;
    const incidencias = invoice.metadata?.finkok_incidencias ?? [];
    const first = incidencias.find((inc) => inc.code || inc.message);
    if (first?.code && first?.message) return `${first.code}: ${first.message}`;
    if (first?.message) return first.message;
    if (invoice.stamp_error_message) return invoice.stamp_error_message;
    return '—';
  }

  getSatCancelStatus(invoice: SalesOrderElectronicInvoice): string {
    const metadata = invoice.metadata as { sat_cancel_status?: string } | undefined;
    return metadata?.sat_cancel_status || '—';
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
    const status = (invoice.sat_status || invoice.stamp_status || '').toLowerCase();
    return this.canCancel() && !status.includes('cancel');
  }
}

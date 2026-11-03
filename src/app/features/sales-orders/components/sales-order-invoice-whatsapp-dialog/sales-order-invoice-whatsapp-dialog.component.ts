import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { WhatsappGroup } from '../../../settings/models/whatsapp.model';
import { WhatsappService } from '../../../settings/services/whatsapp.service';
import { InvoiceWhatsappCompose } from '../../models/sales-order-invoice-email.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';

export interface SalesOrderInvoiceWhatsappDialogData {
  orderId: string;
  invoiceId: string;
  invoiceFolio?: string;
}

export interface SalesOrderInvoiceWhatsappDialogResult {
  sent?: boolean;
  sent_to?: string;
}

@Component({
  selector: 'app-sales-order-invoice-whatsapp-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-order-invoice-whatsapp-dialog.component.html',
  styleUrl: './sales-order-invoice-whatsapp-dialog.component.scss',
})
export class SalesOrderInvoiceWhatsappDialogComponent implements OnInit {
  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  sending = signal(false);
  compose = signal<InvoiceWhatsappCompose | null>(null);
  dest = signal<'phone' | 'group'>('phone');
  phone = signal('');
  groupId = signal('');
  groups = signal<WhatsappGroup[]>([]);
  groupsLoading = signal(false);
  groupsError = signal<string | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderInvoiceWhatsappDialogData,
    private dialogRef: MatDialogRef<
      SalesOrderInvoiceWhatsappDialogComponent,
      SalesOrderInvoiceWhatsappDialogResult
    >,
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoiceWhatsappCompose(this.data.orderId, this.data.invoiceId).subscribe({
      next: (compose) => {
        this.compose.set(compose);
        this.phone.set(compose.phone || '');
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo preparar el envío'));
      },
    });
    this.loadGroups();
  }

  close(): void {
    if (this.sending()) return;
    this.dialogRef.close();
  }

  loadGroups(): void {
    this.groupsLoading.set(true);
    this.groupsError.set(null);
    this.whatsapp.groups().subscribe({
      next: (page) => {
        this.groups.set(page.data ?? []);
        this.groupsLoading.set(false);
      },
      error: (error) => {
        this.groups.set([]);
        this.groupsLoading.set(false);
        this.groupsError.set(resolveHttpErrorMessage(error, 'No se pudieron cargar los grupos'));
      },
    });
  }

  onPhonePaste(event: ClipboardEvent): void {
    event.preventDefault();
    this.phone.set(this.cleanPhone(event.clipboardData?.getData('text') ?? ''));
  }

  onPhoneInput(value: string): void {
    this.phone.set(value);
  }

  send(): void {
    if (this.sending()) return;
    const compose = this.compose();
    if (compose && !compose.can_send) {
      this.toast.error(compose.block_reason || 'Esta factura no se puede enviar');
      return;
    }
    const payload =
      this.dest() === 'group'
        ? { group_id: this.groupId().trim() }
        : { phone: this.cleanPhone(this.phone()) };
    if (this.dest() === 'group' && !payload.group_id) {
      this.toast.error('Selecciona un grupo de WhatsApp');
      return;
    }
    if (this.dest() === 'phone' && !payload.phone) {
      this.toast.error('Indica el teléfono de WhatsApp');
      return;
    }

    this.sending.set(true);
    this.invoiceService.sendInvoiceWhatsapp(this.data.orderId, this.data.invoiceId, payload).subscribe({
      next: (result) => {
        this.sending.set(false);
        const to = result.sent_to.includes('@g.us') ? result.sent_to : `+${result.sent_to}`;
        this.toast.success(
          result.xml_sent
            ? `Factura y XML en cola para ${to}`
            : `Factura en cola para ${to}`,
        );
        this.dialogRef.close({ sent: true, sent_to: result.sent_to });
      },
      error: (error) => {
        this.sending.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo enviar por WhatsApp'));
      },
    });
  }

  private cleanPhone(value: string): string {
    const trimmed = (value ?? '').trim();
    const digits = trimmed.replace(/\D/g, '');
    return trimmed.startsWith('+') ? `+${digits}` : digits;
  }
}

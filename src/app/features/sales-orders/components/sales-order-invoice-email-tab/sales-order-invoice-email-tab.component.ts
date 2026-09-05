import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ELECTRONIC_INVOICING_PERMISSIONS } from '../../config/electronic-invoicing-permissions.config';
import { SalesOrderInvoiceEmail } from '../../models/sales-order-invoice-email.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import { SalesOrderInvoiceEmailTemplateEditorComponent } from '../sales-order-invoice-email-template-editor/sales-order-invoice-email-template-editor.component';

@Component({
  selector: 'app-sales-order-invoice-email-tab',
  standalone: true,
  imports: [CommonModule, SalesOrderInvoiceEmailTemplateEditorComponent],
  templateUrl: './sales-order-invoice-email-tab.component.html',
  styleUrl: './sales-order-invoice-email-tab.component.scss',
})
export class SalesOrderInvoiceEmailTabComponent implements OnInit {
  @Input({ required: true }) orderId!: string;
  @Output() emailsChanged = new EventEmitter<number>();

  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);

  emails = signal<SalesOrderInvoiceEmail[]>([]);
  loadingHistory = signal(true);

  get canView(): boolean {
    return (
      this.authService.hasAdminRole() ||
      (this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.viewMenu) &&
        this.authService.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.read))
    );
  }

  ngOnInit(): void {
    if (this.canView) {
      this.loadHistory();
    } else {
      this.loadingHistory.set(false);
    }
  }

  loadHistory(): void {
    this.loadingHistory.set(true);
    this.invoiceService.listInvoiceEmails(this.orderId).subscribe({
      next: (rows) => {
        this.emails.set(rows);
        this.loadingHistory.set(false);
        this.emailsChanged.emit(rows.length);
      },
      error: (error) => {
        this.loadingHistory.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo cargar el historial'));
      },
    });
  }

  senderLabel(row: SalesOrderInvoiceEmail): string {
    return row.sent_by?.display_name || '—';
  }
}

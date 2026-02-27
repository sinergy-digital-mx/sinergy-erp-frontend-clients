import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { Contract } from '../../models/contract.model';
import { ContractService } from '../../services/contract.service';
import { PaymentService } from '../../services/payment.service';
import { PaymentStats } from '../../models/payment.model';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { PropertyService } from '../../../properties/services/property.service';
import { ContractDocumentsComponent } from '../contract-documents/contract-documents.component';
import { ContractPaymentsComponent } from '../contract-payments/contract-payments.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';

@Component({
  selector: 'app-contract-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    MatTooltipModule,
    ContractDocumentsComponent,
    ContractPaymentsComponent,
    LocalDatePipe
  ],
  providers: [DatePipe],
  templateUrl: './contract-detail-modal.component.html',
  styleUrls: ['./contract-detail-modal.component.scss']
})
export class ContractDetailModalComponent implements OnInit {
  readonly X = X;

  form: FormGroup;
  saving = signal(false);
  activeTab = signal<'edit' | 'payments' | 'documents'>('edit');
  paymentStats = signal<PaymentStats | null>(null);

  statusSelectConfig: ISelect = {
    placeholder: 'Selecciona un estado',
    data: [
      { value: 'activo', label: 'Activo' },
      { value: 'completado', label: 'Completado' },
      { value: 'cancelado', label: 'Cancelado' },
      { value: 'suspendido', label: 'Suspendido' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  constructor(
    public dialog: MatDialog,
    public dialog_ref: MatDialogRef<ContractDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contract: Contract },
    private router: Router,
    private propertyService: PropertyService,
    private contractService: ContractService,
    private paymentService: PaymentService,
    private interceptorService: InterceptorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      contract_date: [this.data.contract.contract_date, Validators.required],
      total_price: [this.data.contract.total_price, [Validators.required, Validators.min(0)]],
      down_payment: [this.data.contract.down_payment, [Validators.required, Validators.min(0)]],
      remaining_balance: [{value: this.data.contract.remaining_balance, disabled: true}, [Validators.required, Validators.min(0)]],
      payment_months: [this.data.contract.payment_months, [Validators.required, Validators.min(0)]],
      monthly_payment: [{value: this.data.contract.monthly_payment, disabled: true}, [Validators.required, Validators.min(0)]],
      first_payment_date: [this.data.contract.first_payment_date, Validators.required],
      currency: [this.data.contract.currency || 'USD', Validators.required],
      status: [this.data.contract.status, Validators.required],
      notes: [this.data.contract.notes || '']
    });

    // Link form control to select
    this.statusSelectConfig.form_control = this.form.get('status');
  }

  ngOnInit() {
    this.loadPaymentStats();
  }

  loadPaymentStats() {
    this.paymentService.getPaymentStats(this.data.contract.id).subscribe({
      next: (stats) => {
        this.paymentStats.set(stats);
      },
      error: () => {
        // Stats are optional
      }
    });
  }

  getPendingBreakdown(): string {
    const stats = this.paymentStats();
    if (!stats) return '';
    
    const currency = this.data.contract.currency || 'USD';
    const monthlyPayment = this.formatCurrency(this.data.contract.monthly_payment, currency);
    const partialAmount = stats.partial_payment ? this.formatCurrency(stats.partial_payment.remaining_amount, currency) : '';
    const total = this.formatCurrency(stats.total_pending_amount, currency);
    
    let breakdown = `${stats.pending_full_payments} pagos × ${monthlyPayment}`;
    if (stats.partial_payment) {
      breakdown += ` + ${partialAmount} (pago parcial #${stats.partial_payment.installment_number})`;
    }
    breakdown += ` = ${total}`;
    return breakdown;
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: currency }).format(amount);
  }

  setActiveTab(tab: 'edit' | 'payments' | 'documents') {
    this.activeTab.set(tab);
  }

  saveContract() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Por favor completa todos los campos requeridos'
      });
      return;
    }

    this.saving.set(true);

    this.contractService.updateContract(this.data.contract.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato actualizado correctamente'
        });
        this.dialog_ref.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error.error?.message || 'Error al actualizar el contrato'
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
      this.router.navigate(['/customers/detail', this.data.contract.customer.id]);
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

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'activo': 'bg-green-100 text-green-800',
      'completado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800',
      'suspendido': 'bg-yellow-100 text-yellow-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-100 text-gray-800'}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'activo': 'Activo',
      'completado': 'Completado',
      'cancelado': 'Cancelado',
      'suspendido': 'Suspendido'
    };
    return labels[status] || status;
  }

  getCustomerName(): string {
    if (!this.data.contract.customer) return '—';
    return `${this.data.contract.customer.name} ${this.data.contract.customer.lastname}`;
  }
}

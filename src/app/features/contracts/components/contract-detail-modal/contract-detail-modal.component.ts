import { Component, Inject, signal, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { GenerateHoaDialogComponent } from '../generate-hoa-dialog/generate-hoa-dialog.component';

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
    MatAutocompleteModule,
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

  @ViewChild('vendorAutocompleteTrigger', { read: MatAutocompleteTrigger }) vendorAutocompleteTrigger: MatAutocompleteTrigger;

  form: FormGroup;
  saving = signal(false);
  deleting = signal(false);
  activeTab = signal<'edit' | 'payments' | 'down_payments' | 'hoa' | 'documents' | 'statement'>('edit');
  paymentStats = signal<PaymentStats | null>(null);

  // Vendor signals
  vendors = signal<any[]>([]);
  filteredVendors = signal<any[]>([]);

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
    private userService: UserService,
    private interceptorService: InterceptorService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
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
      notes: [this.data.contract.notes || ''],
      seller_search: [''],
      seller_id: [this.data.contract.seller_id || null]
    });

    // Link form control to select
    this.statusSelectConfig.form_control = this.form.get('status');
  }

  ngOnInit() {
    console.log('🔍 Contract Detail Modal - Contract ID:', this.data.contract.id);
    this.loadSellers();
    this.initializeSellerSearch();
    this.loadContractDetails();
  }

  loadContractDetails(): void {
    this.contractService.getContract(this.data.contract.id).subscribe({
      next: (contract) => {
        console.log('📋 Contract loaded:', contract);
        console.log('🧑 Seller data:', contract.seller);
        
        // Actualizar data del contrato
        this.data.contract = contract;
        
        // Si hay un vendedor asignado, agregarlo a la lista de vendedores
        if (contract.seller) {
          console.log('✅ Adding seller to vendors list');
          // Agregar el vendedor a la lista si no está ya
          const sellerExists = this.vendors().some(v => v.id === contract.seller.id);
          if (!sellerExists) {
            this.vendors.set([contract.seller, ...this.vendors()]);
            this.filteredVendors.set([contract.seller, ...this.filteredVendors()]);
          }
          console.log('✅ Setting seller display:', this.displaySeller(contract.seller));
        } else {
          console.log('❌ No seller data found');
        }
        
        // Actualizar form con nuevos valores
        this.form.patchValue({
          contract_date: contract.contract_date,
          total_price: contract.total_price,
          down_payment: contract.down_payment,
          remaining_balance: contract.remaining_balance,
          payment_months: contract.payment_months,
          monthly_payment: contract.monthly_payment,
          first_payment_date: contract.first_payment_date,
          currency: contract.currency || 'USD',
          status: contract.status,
          notes: contract.notes || '',
          seller_id: contract.seller_id || null,
          seller_search: contract.seller ? this.displaySeller(contract.seller) : ''
        });

        this.loadPaymentStats();
        
        // Forzar detección de cambios inmediatamente
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading contract details:', err);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los detalles del contrato'
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
        // Stats are optional
      }
    });
  }

  refreshContractData(): void {
    console.log('🔄 Refreshing contract data...');
    this.loadContractDetails();
  }

  loadSellers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        const userData = Array.isArray(response) ? response : [];
        this.vendors.set(userData);
        this.filteredVendors.set(userData);
      },
      error: (err) => {
        console.error('Error loading sellers:', err);
      }
    });
  }

  initializeSellerSearch(): void {
    this.form.get('seller_search')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterSellers(searchTerm || '');
      });
  }

  filterSellers(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.userService.getUsers().subscribe({
        next: (response: any) => {
          const userData = Array.isArray(response) ? response : [];
          this.filteredVendors.set(userData);
        },
        error: (err) => {
          console.error('Error loading sellers:', err);
        }
      });
      return;
    }

    // Filter locally by name or email
    const term = searchTerm.toLowerCase();
    const filtered = this.vendors().filter(user =>
      (user.first_name?.toLowerCase().includes(term) || '') ||
      (user.last_name?.toLowerCase().includes(term) || '') ||
      (user.email?.toLowerCase().includes(term) || '')
    );
    this.filteredVendors.set(filtered);
  }

  onSellerSelected(seller: any): void {
    console.log('🧑 Seller selected:', seller);
    // Prevent the autocomplete from setting the value
    this.form.patchValue({
      seller_id: seller.id,
      seller_search: this.displaySeller(seller)
    }, { emitEvent: false });
    // Close the autocomplete panel
    this.vendorAutocompleteTrigger?.closePanel();
    // Force change detection
    this.cdr.markForCheck();
  }

  clearSeller(): void {
    this.form.patchValue({
      seller_id: null,
      seller_search: ''
    });
  }

  onSellerSearchFocus(): void {
    // Cuando hace focus, limpiar el campo para que pueda buscar
    this.form.patchValue({
      seller_search: ''
    }, { emitEvent: true });
    // Abrir el dropdown del autocomplete
    setTimeout(() => {
      this.vendorAutocompleteTrigger?.openPanel();
    }, 100);
  }

  onSellerSearchBlur(): void {
    // Cuando pierde focus sin seleccionar nada, restaurar el vendedor actual
    const searchValue = this.form.get('seller_search')?.value;
    const sellerId = this.form.get('seller_id')?.value;
    
    // Si no hay búsqueda y hay un vendedor seleccionado, restaurar su nombre
    if (!searchValue && sellerId) {
      const selectedSeller = this.vendors().find(v => v.id === sellerId);
      if (selectedSeller) {
        this.form.patchValue({
          seller_search: this.displaySeller(selectedSeller)
        }, { emitEvent: false });
      }
    }
  }

  displaySeller(seller: any): string {
    if (!seller) return '';
    if (typeof seller === 'string') return seller;
    return seller ? `${seller.first_name} ${seller.last_name} (${seller.email})` : '';
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

  setActiveTab(tab: 'edit' | 'payments' | 'down_payments' | 'hoa' | 'documents' | 'statement') {
    this.activeTab.set(tab);
  }

  downloadStatement(): void {
    this.contractService.getContractStatement(this.data.contract.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `estado-cuenta-${this.data.contract.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Estado de cuenta descargado correctamente'
        });
      },
      error: (err) => {
        console.error('Error downloading statement:', err);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudo descargar el estado de cuenta'
        });
      }
    });
  }

  openGenerateHOADialog(): void {
    const dialogRef = this.dialog.open(GenerateHoaDialogComponent, {
      width: '500px',
      data: { contract: this.data.contract }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('🏠 Generating HOA payments:', result);
        // TODO: Call the endpoint with result.start_date and result.end_date
        this.interceptorService.openSnackbar({
          type: 'info',
          title: 'Generando',
          message: 'Generando pagos de HOA...'
        });
      }
    });
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

    const payload = {
      contract_date: this.form.get('contract_date')?.value,
      total_price: this.form.get('total_price')?.value,
      down_payment: this.form.get('down_payment')?.value,
      payment_months: this.form.get('payment_months')?.value,
      first_payment_date: this.form.get('first_payment_date')?.value,
      currency: this.form.get('currency')?.value,
      status: this.form.get('status')?.value,
      notes: this.form.get('notes')?.value,
      seller_id: this.form.get('seller_id')?.value || null
    };

    this.contractService.updateContract(this.data.contract.id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato actualizado correctamente'
        });
        // Refrescar data después de actualizar
        this.loadContractDetails();
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

  deleteContract() {
    const contractNumber = this.data.contract.contract_number;
    const customerName = this.getCustomerName();
    
    const confirmMessage = `¿Estás seguro de que deseas eliminar el contrato ${contractNumber}${customerName !== '—' ? ` de ${customerName}` : ''}?\n\nEsta acción no se puede deshacer y eliminará:\n• El contrato y todos sus datos\n• Todos los pagos asociados\n• Todos los documentos asociados`;
    
    if (!confirm(confirmMessage)) return;

    this.deleting.set(true);

    this.contractService.deleteContract(this.data.contract.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato eliminado correctamente'
        });
        this.dialog_ref.close('deleted');
      },
      error: (error) => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error.error?.message || 'Error al eliminar el contrato'
        });
      }
    });
  }
}

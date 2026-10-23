import { Component, OnInit, ViewChild, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LucideAngularModule, ArrowLeft, Info } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { Contract, ContractProperty, ContractStatus, UpdateContractDto, getDownPaymentTarget } from '../../models/contract.model';
import { ContractService } from '../../services/contract.service';
import { PaymentService } from '../../services/payment.service';
import { PaymentStats } from '../../models/payment.model';
import { Property } from '../../../properties/models/property.model';
import { ContractDocumentsComponent } from '../../components/contract-documents/contract-documents.component';
import { ContractPaymentsComponent } from '../../components/contract-payments/contract-payments.component';
import { ContractHoaPaymentsComponent } from '../../components/contract-hoa-payments/contract-hoa-payments.component';
import { ContractDownpaymentPaymentsComponent } from '../../components/contract-downpayment-payments/contract-downpayment-payments.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { ContractLotSectionComponent } from '../../components/contract-lot-section/contract-lot-section.component';
import { buildPendingBalanceTooltip } from '../../utils/pending-balance-tooltip.util';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { ContractFiscalOption, emptyFiscalSelectConfig, toFiscalSelectData } from '../../utils/contract-fiscal-select.util';
import { ReceiptBrandingComponent } from '../../components/receipt-branding/receipt-branding.component';
import {
  DEFAULT_LATE_INTEREST_GRACE_DAYS,
  DEFAULT_LATE_INTEREST_RATE_PERCENT,
} from '../../utils/late-interest';

@Component({
  selector: 'app-contract-detail-page',
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
    ContractHoaPaymentsComponent,
    ContractDownpaymentPaymentsComponent,
    ContractLotSectionComponent,
    LocalDatePipe
  ],
  providers: [DatePipe],
  templateUrl: './contract-detail-page.component.html',
  styleUrl: './contract-detail-page.component.scss'
})
export class ContractDetailPageComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly InfoIcon = Info;
  readonly getDownPaymentTarget = getDownPaymentTarget;
  @ViewChild('vendorAutocompleteTrigger', { read: MatAutocompleteTrigger }) vendorAutocompleteTrigger: MatAutocompleteTrigger;

  contract = signal<Contract | null>(null);
  loading = signal(true);
  form: FormGroup;
  saving = signal(false);
  deleting = signal(false);
  activeTab = signal<'edit' | 'payments' | 'down_payments' | 'hoa' | 'documents' | 'statement'>('edit');
  paymentStats = signal<PaymentStats | null>(null);
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

  fiscalSelectConfig: ISelect = emptyFiscalSelectConfig();
  private fiscalRows: ContractFiscalOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contractService: ContractService,
    private paymentService: PaymentService,
    private userService: UserService,
    private interceptorService: InterceptorService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fiscalConfigService: FiscalConfigurationService,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      contract_date: ['', Validators.required],
      total_price: [0, [Validators.required, Validators.min(0)]],
      down_payment: [0, [Validators.required, Validators.min(0)]],
      remaining_balance: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      payment_months: [0, [Validators.required, Validators.min(0)]],
      monthly_payment: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      first_payment_date: ['', Validators.required],
      interest_rate: [DEFAULT_LATE_INTEREST_RATE_PERCENT],
      payment_due_day: [DEFAULT_LATE_INTEREST_GRACE_DAYS],
      currency: ['USD', Validators.required],
      status: ['activo', Validators.required],
      fiscal_configuration_id: [null, Validators.required],
      notes: [''],
      seller_search: [''],
      seller_id: [null]
    });

    this.statusSelectConfig.form_control = this.form.get('status');
    this.fiscalSelectConfig.form_control = this.form.get('fiscal_configuration_id');
  }

  ngOnInit(): void {
    this.loadSellers();
    this.loadFiscalConfigurations();
    this.initializeSellerSearch();
    this.route.paramMap.subscribe((params) => {
      const contractId = params.get('id');
      if (!contractId) {
        this.navigateBackToList();
        return;
      }
      this.loadContract(contractId);
    });
  }

  loadContract(contractId: string): void {
    this.loading.set(true);
    this.contractService.getContract(contractId).subscribe({
      next: (contract) => {
        const normalizedStatus = this.normalizeStatus(contract.status as unknown);
        const normalizedContract = { ...contract, status: normalizedStatus };
        this.contract.set(normalizedContract);
        this.patchFormFromContract(normalizedContract);
        this.loadPaymentStats();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los detalles del contrato'
        });
        this.navigateBackToList();
      }
    });
  }

  patchFormFromContract(contract: Contract): void {
    if (contract.seller) {
      const sellerExists = this.vendors().some(v => v.id === contract.seller!.id);
      if (!sellerExists) {
        this.vendors.set([contract.seller, ...this.vendors()]);
        this.filteredVendors.set([contract.seller, ...this.filteredVendors()]);
      }
    }

    this.form.patchValue({
      contract_date: contract.contract_date,
      total_price: contract.total_price,
      down_payment: contract.down_payment,
      remaining_balance: contract.remaining_balance,
      payment_months: contract.payment_months,
      monthly_payment: contract.monthly_payment,
      first_payment_date: contract.first_payment_date,
      interest_rate: contract.interest_rate ?? DEFAULT_LATE_INTEREST_RATE_PERCENT,
      payment_due_day: contract.payment_due_day ?? DEFAULT_LATE_INTEREST_GRACE_DAYS,
      currency: contract.currency || 'USD',
      status: this.normalizeStatus(contract.status),
      fiscal_configuration_id: contract.fiscal_configuration_id || null,
      notes: contract.notes || '',
      seller_id: contract.seller_id || null,
      seller_search: contract.seller ? this.displaySeller(contract.seller) : ''
    });
    this.refreshFiscalSelect();
  }

  loadPaymentStats(): void {
    const current = this.contract();
    if (!current) return;
    this.paymentService.getPaymentStats(current.id).subscribe({
      next: (stats) => this.paymentStats.set(stats),
      error: () => {}
    });
  }

  refreshContractData(): void {
    const current = this.contract();
    if (!current) return;
    this.loadContract(current.id);
  }

  loadSellers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        const userData = Array.isArray(response) ? response : [];
        this.vendors.set(userData);
        this.filteredVendors.set(userData);
      },
      error: () => {}
    });
  }

  private loadFiscalConfigurations(): void {
    this.fiscalConfigService.listFiscalConfigurations({ status: 'active', limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalRows = res?.data ?? [];
        this.refreshFiscalSelect();
        this.fiscalSelectConfig = { ...this.fiscalSelectConfig, loading: false };
      },
      error: () => {
        this.fiscalSelectConfig = { ...this.fiscalSelectConfig, loading: false };
      },
    });
  }

  private refreshFiscalSelect(): void {
    this.fiscalSelectConfig = {
      ...this.fiscalSelectConfig,
      data: toFiscalSelectData(this.fiscalRows, this.contract()?.fiscal_configuration),
    };
  }

  initializeSellerSearch(): void {
    this.form.get('seller_search')!.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => this.filterSellers(searchTerm || ''));
  }

  filterSellers(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.filteredVendors.set(this.vendors());
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = this.vendors().filter(user =>
      (user.first_name?.toLowerCase().includes(term) || '') ||
      (user.last_name?.toLowerCase().includes(term) || '') ||
      (user.email?.toLowerCase().includes(term) || '')
    );
    this.filteredVendors.set(filtered);
  }

  onSellerSelected(seller: any): void {
    this.form.patchValue({
      seller_id: seller.id,
      seller_search: this.displaySeller(seller)
    }, { emitEvent: false });
    this.vendorAutocompleteTrigger?.closePanel();
    this.cdr.markForCheck();
  }

  clearSeller(): void {
    this.form.patchValue({ seller_id: null, seller_search: '' });
  }

  onSellerSearchFocus(): void {
    this.form.patchValue({ seller_search: '' }, { emitEvent: true });
    setTimeout(() => this.vendorAutocompleteTrigger?.openPanel(), 100);
  }

  onSellerSearchBlur(): void {
    const searchValue = this.form.get('seller_search')?.value;
    const sellerId = this.form.get('seller_id')?.value;
    if (!searchValue && sellerId) {
      const selectedSeller = this.vendors().find(v => v.id === sellerId);
      if (selectedSeller) {
        this.form.patchValue({ seller_search: this.displaySeller(selectedSeller) }, { emitEvent: false });
      }
    }
  }

  displaySeller(seller: any): string {
    if (!seller) return '';
    if (typeof seller === 'string') return seller;
    return `${seller.first_name} ${seller.last_name} (${seller.email})`;
  }

  openReceiptBranding(): void {
    const current = this.contract();
    if (!current) return;
    this.dialog.open(ReceiptBrandingComponent, {
      width: '480px',
      maxWidth: '96vw',
      data: { contractId: current.id },
    });
  }

  headerDownPaymentTarget(contract: Contract): number | null {
    const target = getDownPaymentTarget(contract);
    return target != null && target > 0 ? target : null;
  }

  getPendingBreakdown(): string {
    const current = this.contract();
    if (!current) return '';
    return buildPendingBalanceTooltip(current, this.paymentStats());
  }

  setActiveTab(tab: 'edit' | 'payments' | 'down_payments' | 'hoa' | 'documents' | 'statement'): void {
    this.activeTab.set(tab);
  }

  get badgeStatus(): ContractStatus {
    const current = this.contract();
    return this.normalizeStatus(current?.status);
  }

  normalizeStatus(raw: unknown): ContractStatus {
    if (raw == null || raw === '') return 'activo';
    const key = String(typeof raw === 'object' && raw !== null && 'code' in (raw as Record<string, unknown>)
      ? (raw as { code: string }).code
      : raw).trim().toLowerCase();
    const direct: ContractStatus[] = ['activo', 'completado', 'cancelado', 'suspendido'];
    if (direct.includes(key as ContractStatus)) return key as ContractStatus;
    const map: Record<string, ContractStatus> = {
      active: 'activo',
      completed: 'completado',
      cancelled: 'cancelado',
      canceled: 'cancelado',
      suspended: 'suspendido'
    };
    return map[key] ?? 'activo';
  }

  downloadStatement(): void {
    const current = this.contract();
    if (!current) return;
    this.contractService.getContractStatement(current.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `estado-cuenta-${current.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudo descargar el estado de cuenta'
        });
      }
    });
  }

  saveContract(): void {
    const current = this.contract();
    if (!current) return;
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Por favor completa todos los campos requeridos'
      });
      return;
    }
    this.saving.set(true);
    const payload: UpdateContractDto = {
      contract_date: this.form.get('contract_date')?.value,
      total_price: this.form.get('total_price')?.value,
      down_payment: this.form.get('down_payment')?.value,
      payment_months: this.form.get('payment_months')?.value,
      first_payment_date: this.form.get('first_payment_date')?.value,
      interest_rate: this.toOptionalNumber(this.form.get('interest_rate')?.value),
      payment_due_day: this.toOptionalNumber(this.form.get('payment_due_day')?.value),
      currency: this.form.get('currency')?.value,
      status: this.normalizeStatus(this.form.get('status')?.value),
      fiscal_configuration_id: this.form.get('fiscal_configuration_id')?.value || null,
      notes: this.form.get('notes')?.value,
      seller_id: this.form.get('seller_id')?.value || null
    };
    this.contractService.updateContract(current.id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato actualizado correctamente'
        });
        this.loadContract(current.id);
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

  navigateBack(): void {
    this.location.back();
  }

  navigateBackToList(): void {
    this.router.navigate(['/contracts']);
  }

  navigateToCustomer(): void {
    const current = this.contract();
    if (current?.customer) {
      this.router.navigate(['/customers/detail', current.customer.id]);
    }
  }

  onLotUpdated(property: Property): void {
    const current = this.contract();
    if (!current) {
      return;
    }

    this.contract.set({
      ...current,
      property: this.toContractProperty(property, current.property)
    });
  }

  private toContractProperty(property: Property, previous?: Contract['property']): ContractProperty {
    return {
      id: property.id,
      code: property.code,
      name: property.name,
      block: property.block ?? '',
      lot_number: property.lot_number ?? null,
      cadastral_key: property.cadastral_key ?? null,
      total_area: property.total_area,
      total_price: property.total_price,
      list_price: previous?.list_price ?? null,
      status: property.status
    };
  }

  private toOptionalNumber(value: unknown): number | null {
    if (value === '' || value == null) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  getCustomerName(): string {
    const current = this.contract();
    if (!current?.customer) return '—';
    return `${current.customer.name} ${current.customer.lastname}`;
  }

  deleteContract(): void {
    const current = this.contract();
    if (!current) return;
    const customerName = this.getCustomerName();
    const confirmMessage = `¿Estás seguro de que deseas eliminar el contrato ${current.contract_number}${customerName !== '—' ? ` de ${customerName}` : ''}?\n\nEsta acción no se puede deshacer y eliminará:\n• El contrato y todos sus datos\n• Todos los pagos asociados\n• Todos los documentos asociados`;
    if (!confirm(confirmMessage)) return;
    this.deleting.set(true);
    this.contractService.deleteContract(current.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato eliminado correctamente'
        });
        this.navigateBackToList();
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

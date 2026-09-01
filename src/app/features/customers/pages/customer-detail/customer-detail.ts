import { Component, OnInit, OnDestroy, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../../core/services/customer.service';
import { PropertyService } from '../../../properties/services/property.service';
import { CustomerEditModalComponent } from '../../components/customer-edit-modal/customer-edit-modal.component';
import { CustomerDocumentsComponent } from '../../components/customer-documents/customer-documents.component';
import { CustomerSalesOrdersComponent } from '../../components/customer-sales-orders/customer-sales-orders.component';
import { CustomerProductInsightsComponent } from '../../components/customer-product-insights/customer-product-insights.component';
import { CustomerActivitiesComponent } from '../../components/customer-activities/customer-activities.component';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG, PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ContractDetailModalComponent } from '../../../contracts/components/contract-detail-modal/contract-detail-modal.component';
import { Customer, CustomerAddress, CustomerStatus } from '../../models/customer-group.model';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { Pencil, MapPin } from 'lucide-angular';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import {
  getCustomerStatusLabel,
  getCustomerStatusPillClass,
} from '../../utils/customer-status.util';
import { getFiscalPersonTypeLabel } from '../../utils/fiscal-person-type.util';
import {
  resolveFiscalCountryLabel,
  resolveFiscalMunicipio,
  resolveFiscalStreet,
} from '../../utils/fiscal-domicile.util';
import { formatAssignedSellerLabel, formatRegisteredByUserLabel } from '../../utils/customer-registration.util';
import { CustomerAddressDialogComponent } from '../../components/customer-address-dialog/customer-address-dialog.component';
import { SlimSwitchComponent } from '../../../../core/components/slim-switch/slim-switch.component';
import { CustomerFiscalCreditsComponent } from '../../components/customer-fiscal-credits/customer-fiscal-credits.component';
import { CustomerAssignmentHistoryComponent } from '../../components/customer-assignment-history/customer-assignment-history.component';
import { unwrapCustomerPayload } from '../../utils/customer-credit.util';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    MatCardModule,
    PhoneComponent,
    CustomerDocumentsComponent,
    CustomerSalesOrdersComponent,
    CustomerProductInsightsComponent,
    CustomerActivitiesComponent,
    ButtonComponent,
    HasPermissionDirective,
    TabComponent,
    SlimSwitchComponent,
    CustomerFiscalCreditsComponent,
    SpinnerComponent,
    CustomerAssignmentHistoryComponent,
  ],
  templateUrl: 'customer-detail.html',
  styleUrl: 'customer-detail.scss'
})
export class CustomerDetail implements OnInit, OnDestroy {
  customer = signal<Customer | null>(null);
  isLoading = signal(true);
  error = signal<any>(null);
  /** Persona adicional en detalle: colapsable (mismo criterio que el modal). */
  additionalPersonExpanded = signal(false);
  activeInfoTab = signal<'customer' | 'credit' | 'fiscal' | 'registration'>('customer');
  statuses = signal<CustomerStatus[]>([]);
  statusUpdating = signal(false);
  infoTabs: TabItem[] = [
    { id: 'customer', title: 'Información del Cliente' },
    { id: 'credit', title: 'Credito' },
    { id: 'fiscal', title: 'Información Fiscal' },
    { id: 'registration', title: 'Registro' }
  ];
  invoicePrefSaving = signal(false);
  customerId: number | null = null;
  private destroy$ = new Subject<void>();

  readonly PencilIcon = Pencil;
  readonly MapPinIcon = MapPin;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private authService: AuthService,
    private interceptorService: InterceptorService
  ) {}

  ngOnInit() {
    this.loadStatuses();
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.customerId = Number(params['id']);
      if (this.customerId) {
        this.loadCustomer();
      }
    });
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const tab = query.get('tab');
      if (tab === 'credit' || tab === 'fiscal' || tab === 'customer' || tab === 'registration') {
        this.activeInfoTab.set(tab);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get canEditStatus(): boolean {
    return this.authService.hasPermission('customers:Update');
  }

  loadStatuses(): void {
    this.customerService.getCustomerStatuses().pipe(takeUntil(this.destroy$)).subscribe({
      next: (list) => this.statuses.set(list),
    });
  }

  getStatusLabel(customer: Customer): string {
    return getCustomerStatusLabel(customer);
  }

  getStatusPillClass(customer: Customer): string {
    return getCustomerStatusPillClass(customer);
  }

  currentStatusId(customer: Customer): number | null {
    const raw = customer.status_id ?? customer.status?.id;
    if (raw == null || raw === '') return null;
    const id = Number(raw);
    return Number.isFinite(id) ? id : null;
  }

  onStatusChange(nextId: number | string): void {
    const customer = this.customer();
    if (!customer || !this.canEditStatus) return;

    const statusId = Number(nextId);
    if (!Number.isFinite(statusId) || statusId === this.currentStatusId(customer)) {
      return;
    }

    this.statusUpdating.set(true);
    this.customerService
      .updateCustomer(String(customer.id), { status_id: statusId })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const selected = this.statuses().find((s) => s.id === statusId);
          this.customer.set({
            ...customer,
            status_id: statusId,
            status: selected ?? customer.status,
          });
          this.statusUpdating.set(false);
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Estatus actualizado',
          });
        },
        error: () => {
          this.statusUpdating.set(false);
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No se pudo actualizar el estatus',
          });
        },
      });
  }

  /**
   * Load customer details + addresses (addresses come from a separate endpoint).
   */
  loadCustomer() {
    if (!this.customerId) return;

    const id = String(this.customerId);
    this.isLoading.set(true);
    this.error.set(null);

    forkJoin({
      customer: this.customerService.getCustomer(id),
      addresses: this.customerService.getCustomerAddresses(id).pipe(
        catchError(() => of([] as CustomerAddress[]))
      ),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ customer, addresses }) => {
          const unwrapped = unwrapCustomerPayload(customer) ?? (customer as Customer);
          this.customer.set({
            ...unwrapped,
            addresses: this.normalizeAddresses(addresses),
          });
          this.additionalPersonExpanded.set(false);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set(error);
          this.isLoading.set(false);
        },
      });
  }

  private normalizeAddresses(payload: unknown): CustomerAddress[] {
    if (Array.isArray(payload)) {
      return payload as CustomerAddress[];
    }
    if (payload && typeof payload === 'object') {
      const data = (payload as { data?: unknown }).data;
      if (Array.isArray(data)) {
        return data as CustomerAddress[];
      }
    }
    return [];
  }

  /**
   * Edit customer
   */
  editCustomer() {
    if (!this.customer()) return;

    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      ...CUSTOMER_FORM_DIALOG_CONFIG,
      data: { customer: this.customer() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomer();
      }
    });
  }

  /**
   * Go back to customers list
   */
  goBack() {
    this.router.navigate(['/customers']);
  }

  /**
   * Navigate to property detail
   */
  navigateToProperty(propertyId: string) {
    this.router.navigate(['/properties/detail', propertyId]);
  }

  /**
   * Open property modal
   */
  openPropertyModal(propertyId: string) {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, {
          ...PROPERTY_FORM_DIALOG_CONFIG,
          data: { property }
        });
      },
      error: (error) => {
        console.error('Error loading property:', error);
      }
    });
  }

  /**
   * Open contract modal
   */
  openContractModal(contract: any) {
    this.dialog
      .open(ContractDetailModalComponent, {
        data: { contract }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true || result === 'deleted') {
          this.loadCustomer();
        }
      });
  }

  openAddressDialog(address?: CustomerAddress): void {
    const customer = this.customer();
    if (!customer?.id) return;

    this.dialog
      .open(CustomerAddressDialogComponent, {
        width: '980px',
        maxWidth: '95vw',
        data: {
          customerId: String(customer.id),
          address: address ?? null,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadCustomer();
        }
      });
  }

  toggleAdditionalPerson(): void {
    this.additionalPersonExpanded.update((v) => !v);
  }

  setActiveInfoTab(tab: string): void {
    if (tab === 'customer' || tab === 'credit' || tab === 'fiscal' || tab === 'registration') {
      this.activeInfoTab.set(tab);
    }
  }

  isWalkInCustomer(customer: Customer): boolean {
    return customer.is_walk_in === true;
  }

  onAutoGenerateInvoiceChange(enabled: boolean): void {
    const customer = this.customer();
    if (!customer || !this.canEditStatus || this.invoicePrefSaving()) {
      return;
    }
    this.invoicePrefSaving.set(true);
    this.customerService
      .updateCustomer(String(customer.id), { auto_generate_invoice: enabled })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.invoicePrefSaving.set(false);
          this.customer.set({ ...customer, auto_generate_invoice: enabled });
        },
        error: () => {
          this.invoicePrefSaving.set(false);
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No se pudo guardar la preferencia de factura',
          });
        },
      });
  }

  registeredFiscalLabel(customer: Customer): string {
    return customer.registered_fiscal_configuration?.razon_social?.trim() || '—';
  }

  registeredBranchLabel(customer: Customer): string {
    return customer.registered_billing_branch?.code?.trim() || '—';
  }

  registeredByLabel(customer: Customer): string {
    return formatRegisteredByUserLabel(customer.registered_by_user);
  }

  assignedSellerLabel(customer: Customer): string {
    return formatAssignedSellerLabel(customer.assigned_seller_user, 'Sin vendedor');
  }

  assignmentHistory(customer: Customer) {
    return customer.assignment_history ?? [];
  }

  /** True si el API devolvió algún dato de contacto adicional. */
  hasAdditionalContact(c: Customer): boolean {
    const t = (s: string | null | undefined) => (s ?? '').trim();
    return !!(
      t(c.additional_name) ||
      t(c.additional_lastname) ||
      t(c.additional_email) ||
      t(c.additional_phone)
    );
  }

  getSeverity(s: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null {
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'> = {
      'Validado': 'success',
      'Al corriente': 'success',
      'Pagado': 'success',
      'Pendiente': 'warn',
      'Atrasado': 'danger',
      'active': 'success',
      'inactive': 'danger'
    };
    return map[s] ?? 'secondary';
  }

  getFiscalPersonTypeLabel = getFiscalPersonTypeLabel;

  fiscalStreetLabel(customer: Customer): string {
    return resolveFiscalStreet(customer) || '—';
  }

  fiscalMunicipioLabel(customer: Customer): string {
    return resolveFiscalMunicipio(customer) || '—';
  }

  fiscalCountryLabel(customer: Customer): string {
    return resolveFiscalCountryLabel(customer);
  }

  getAddressTypeLabel(type: string | null | undefined): string {
    const map: Record<string, string> = {
      delivery: 'Entrega',
      billing: 'Facturación',
      other: 'Otra',
    };
    const key = (type ?? '').toLowerCase();
    return map[key] ?? (type ? type.charAt(0).toUpperCase() + type.slice(1) : '—');
  }

  formatAddressLocation(address: CustomerAddress): string {
    return [address.city, address.state, address.postal_code, address.country]
      .map((part) => (part ?? '').trim())
      .filter(Boolean)
      .join(', ');
  }
}

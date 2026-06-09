import { Component, OnInit, OnDestroy, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../../core/services/customer.service';
import { PropertyService } from '../../../properties/services/property.service';
import { CustomerEditModalComponent } from '../../components/customer-edit-modal/customer-edit-modal.component';
import { CustomerDocumentsComponent } from '../../components/customer-documents/customer-documents.component';
import { CustomerSalesOrdersComponent } from '../../components/customer-sales-orders/customer-sales-orders.component';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG, PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ContractDetailModalComponent } from '../../../contracts/components/contract-detail-modal/contract-detail-modal.component';
import { Customer } from '../../models/customer-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { Pencil, MapPin, Activity } from 'lucide-angular';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PhoneComponent,
    CustomerDocumentsComponent,
    CustomerSalesOrdersComponent,
    ButtonComponent,
    HasPermissionDirective,
    TabComponent
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
  activeInfoTab = signal<'customer' | 'credit' | 'fiscal'>('customer');
  infoTabs: TabItem[] = [
    { id: 'customer', title: 'Información del Cliente' },
    { id: 'credit', title: 'Credito' },
    { id: 'fiscal', title: 'Información Fiscal' }
  ];
  private readonly fiscalRegimenLabels: Record<string, string> = {
    '601': 'REGIMEN GENERAL DE LEY PERSONAS MORALES',
    '602': 'REGIMEN SIMPLIFICADO DE LEY PERSONAS MORALES',
    '603': 'PERSONAS MORALES CON FINES NO LUCRATIVOS',
    '604': 'REGIMEN DE PEQUENOS CONTRIBUYENTES',
    '605': 'REGIMEN DE SUELDOS Y SALARIOS E INGRESOS ASIMILADOS A SALARIOS',
    '606': 'REGIMEN DE ARRENDAMIENTO',
    '607': 'REGIMEN DE ENAJENACION O ADQUISICION DE BIENES',
    '608': 'REGIMEN DE LOS DEMAS INGRESOS',
    '609': 'REGIMEN DE CONSOLIDACION',
    '610': 'REGIMEN RESIDENTES EN EL EXTRANJERO SIN ESTABLECIMIENTO PERMANENTE EN MEXICO',
    '611': 'REGIMEN DE INGRESOS POR DIVIDENDOS (SOCIOS Y ACCIONISTAS)',
    '612': 'REGIMEN DE LAS PERSONAS FISICAS CON ACTIVIDADES EMPRESARIALES Y PROFESIONALES',
    '613': 'REGIMEN INTERMEDIO DE LAS PERSONAS FISICAS CON ACTIVIDADES EMPRESARIALES',
    '614': 'REGIMEN DE LOS INGRESOS POR INTERESES',
    '615': 'REGIMEN DE LOS INGRESOS POR OBTENCION DE PREMIOS',
    '616': 'SIN OBLIGACIONES FISCALES',
    '617': 'PEMEX',
    '618': 'REGIMEN SIMPLIFICADO DE LEY PERSONAS FISICAS',
    '619': 'INGRESOS POR LA OBTENCION DE PRESTAMOS',
    '620': 'SOCIEDADES COOPERATIVAS DE PRODUCCION QUE OPTAN POR DIFERIR SUS INGRESOS',
    '621': 'REGIMEN DE INCORPORACION FISCAL',
    '622': 'REGIMEN DE ACTIVIDADES AGRICOLAS, GANADERAS, SILVICOLAS Y PESQUERAS PM',
    '623': 'REGIMEN DE OPCIONAL PARA GRUPOS DE SOCIEDADES',
    '624': 'REGIMEN DE LOS COORDINADOS',
    '625': 'REGIMEN DE LAS ACTIVIDADES EMPRESARIALES CON INGRESOS A TRAVES DE PLATAFORMAS TECNOLOGICAS',
    '626': 'REGIMEN SIMPLIFICADO DE CONFIANZA'
  };
  customerId: number | null = null;
  private destroy$ = new Subject<void>();

  readonly PencilIcon = Pencil;
  readonly MapPinIcon = MapPin;
  readonly ActivityIcon = Activity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private propertyService: PropertyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.customerId = Number(params['id']);
      if (this.customerId) {
        this.loadCustomer();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load customer details
   */
  loadCustomer() {
    if (!this.customerId) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.customerService.getCustomer(String(this.customerId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (customer) => {
          this.customer.set(customer);
          this.additionalPersonExpanded.set(false);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set(error);
          this.isLoading.set(false);
        }
      });
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

  toggleAdditionalPerson(): void {
    this.additionalPersonExpanded.update((v) => !v);
  }

  setActiveInfoTab(tab: string): void {
    if (tab === 'customer' || tab === 'credit' || tab === 'fiscal') {
      this.activeInfoTab.set(tab);
    }
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

  getFiscalRegimenLabel(value: string | null | undefined): string {
    const code = (value ?? '').trim();
    if (!code) return '—';
    const label = this.fiscalRegimenLabels[code];
    return label ? `${code} - ${label}` : code;
  }
}

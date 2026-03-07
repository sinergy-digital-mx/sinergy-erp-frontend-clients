import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../../core/services/customer.service';
import { PropertyService } from '../../../properties/services/property.service';
import { CustomerEditModalComponent } from '../../components/customer-edit-modal/customer-edit-modal.component';
import { CustomerDocumentsComponent } from '../../components/customer-documents/customer-documents.component';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { ContractDetailModalComponent } from '../../../contracts/components/contract-detail-modal/contract-detail-modal.component';
import { Customer } from '../../models/customer-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PhoneComponent,
    CustomerDocumentsComponent
  ],
  templateUrl: 'customer-detail.html',
  styleUrl: 'customer-detail.scss'
})
export class CustomerDetail implements OnInit, OnDestroy {
  customer = signal<Customer | null>(null);
  isLoading = signal(true);
  error = signal<any>(null);
  customerId: number | null = null;
  private destroy$ = new Subject<void>();

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
      width: '500px',
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
    this.dialog.open(ContractDetailModalComponent, {
      data: { contract }
    });
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
}

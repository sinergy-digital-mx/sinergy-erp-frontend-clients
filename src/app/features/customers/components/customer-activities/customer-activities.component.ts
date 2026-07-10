import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LucideAngularModule, Plus, Pencil } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { CustomerActivityService } from '../../services/customer-activity.service';
import {
  ActivitySummary,
  ActivityStatus,
  ActivityType,
  CustomerActivity,
} from '../../models/customer-group.model';
import { CustomerActivityFormDialogComponent } from '../customer-activity-form-dialog/customer-activity-form-dialog.component';
import { CUSTOMER_ACTIVITY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import {
  getActivityOutcomeLabel,
  getActivityStatusClass,
  getActivityStatusLabel,
  getActivityTypeClass,
  getActivityTypeLabel,
} from '../../utils/activity-label.util';

@Component({
  selector: 'app-customer-activities',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './customer-activities.component.html',
  styleUrl: './customer-activities.component.scss',
})
export class CustomerActivitiesComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) customerId!: number | string;

  activities = signal<CustomerActivity[]>([]);
  summary = signal<ActivitySummary | null>(null);
  loading = signal(false);
  summaryLoading = signal(false);
  total = signal(0);
  page = signal(1);
  readonly pageSize = 10;

  readonly PlusIcon = Plus;
  readonly PencilIcon = Pencil;

  readonly activityTypes = Object.values(ActivityType);
  readonly activityStatuses = Object.values(ActivityStatus);

  selectedType = signal<string>('');
  selectedStatus = signal<string>('');

  private destroy$ = new Subject<void>();

  constructor(
    private activityService: CustomerActivityService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService
  ) {}

  ngOnInit(): void {
    this.reloadIfReady();
  }

  ngOnChanges(): void {
    this.reloadIfReady();
  }

  private reloadIfReady(): void {
    if (this.customerId == null || this.customerId === '') {
      return;
    }
    this.loadActivities(1);
    this.loadSummary();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get numericCustomerId(): number {
    return Number(this.customerId);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize));
  }

  get hasPrevPage(): boolean {
    return this.page() > 1;
  }

  get hasNextPage(): boolean {
    return this.page() < this.totalPages;
  }

  loadActivities(page = this.page()): void {
    this.loading.set(true);
    this.page.set(page);

    const filters: Record<string, string> = {
      sort_by: 'activity_date',
      sort_order: 'DESC',
    };
    if (this.selectedType()) filters['type'] = this.selectedType();
    if (this.selectedStatus()) filters['status'] = this.selectedStatus();

    this.activityService
      .getActivities(this.numericCustomerId, page, this.pageSize, filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.activities.set(response.activities);
          this.total.set(response.total);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No se pudieron cargar las actividades',
          });
        },
      });
  }

  loadSummary(): void {
    this.summaryLoading.set(true);

    this.activityService
      .getActivitySummary(this.numericCustomerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (summary) => {
          this.summary.set(summary);
          this.summaryLoading.set(false);
        },
        error: () => {
          this.summaryLoading.set(false);
        },
      });
  }

  onFilterChange(): void {
    this.loadActivities(1);
  }

  clearFilters(): void {
    this.selectedType.set('');
    this.selectedStatus.set('');
    this.loadActivities(1);
  }

  goToPrevPage(): void {
    if (this.hasPrevPage) {
      this.loadActivities(this.page() - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage) {
      this.loadActivities(this.page() + 1);
    }
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CustomerActivityFormDialogComponent, {
      ...CUSTOMER_ACTIVITY_FORM_DIALOG_CONFIG,
      data: { customerId: this.numericCustomerId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Actividad registrada correctamente',
        });
        this.loadActivities(1);
        this.loadSummary();
      }
    });
  }

  openEditModal(activity: CustomerActivity): void {
    const dialogRef = this.dialog.open(CustomerActivityFormDialogComponent, {
      ...CUSTOMER_ACTIVITY_FORM_DIALOG_CONFIG,
      data: { customerId: this.numericCustomerId, activity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Actividad actualizada correctamente',
        });
        this.loadActivities();
        this.loadSummary();
      }
    });
  }

  getTypeLabel = getActivityTypeLabel;
  getStatusLabel = getActivityStatusLabel;
  getOutcomeLabel = getActivityOutcomeLabel;
  getStatusClass = getActivityStatusClass;
  getTypeClass = getActivityTypeClass;
}

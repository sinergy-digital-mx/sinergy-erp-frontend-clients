import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { LucideAngularModule, Pencil, Check, ChevronDown, ExternalLink } from 'lucide-angular';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { CUSTOMER_ACTIVITY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { CustomerActivityFormDialogComponent } from '../../../customers/components/customer-activity-form-dialog/customer-activity-form-dialog.component';
import { ActivityStatus, ActivityType, CustomerActivity } from '../../../customers/models/customer-group.model';
import { CustomerActivityService } from '../../../customers/services/customer-activity.service';
import {
  getActivityStatusClass,
  getActivityStatusLabel,
  getActivityTypeClass,
  getActivityTypeLabel,
} from '../../../customers/utils/activity-label.util';
import { CRM_PERMISSIONS } from '../../config/permissions.config';
import {
  CrmActivity,
  CrmActivityAuthor,
  CrmActivityStatsResponse,
  CrmAttentionFilter,
} from '../../models/crm-inbox.model';
import { CrmInboxService } from '../../services/crm-inbox.service';

const ALL_AUTHORS: CrmActivityAuthor = {
  id: '',
  first_name: null,
  last_name: null,
  email: null,
  display_name: 'Todos los usuarios',
  activity_count: 0,
};

@Component({
  selector: 'app-crm-inbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ReportPeriodSelectorComponent,
    SpinnerComponent,
    ApiDatePipe,
    LucideAngularModule,
  ],
  templateUrl: './crm-inbox.component.html',
  styleUrl: './crm-inbox.component.scss',
})
export class CrmInboxComponent implements OnInit, OnDestroy {
  readonly PencilIcon = Pencil;
  readonly CheckIcon = Check;
  readonly ChevronDown = ChevronDown;
  readonly ExternalLinkIcon = ExternalLink;
  readonly activityTypes = Object.values(ActivityType);
  readonly activityStatuses = Object.values(ActivityStatus);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly typeControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl('', { nonNullable: true });
  readonly authorSearchControl = new FormControl('', { nonNullable: true });

  datePreset: ReportPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';

  activities = signal<CrmActivity[]>([]);
  stats = signal<CrmActivityStatsResponse | null>(null);
  authors = signal<CrmActivityAuthor[]>([]);
  authorTerm = signal('');
  selectedAuthor = signal<CrmActivityAuthor | null>(null);
  attention = signal<CrmAttentionFilter | null>(null);
  isCrmAdmin = signal(false);
  loading = signal(false);
  statsLoading = signal(false);
  total = signal(0);
  page = signal(1);
  readonly pageSize = 20;

  private readonly destroy$ = new Subject<void>();

  readonly filteredAuthors = computed(() => {
    const term = this.authorTerm().trim().toLowerCase();
    const rows = this.authors();
    if (!term || this.selectedAuthor()) {
      return rows;
    }
    return rows.filter((author) => this.authorMatches(author, term));
  });

  get rangeIncomplete(): boolean {
    return this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo);
  }

  constructor(
    private readonly crmInboxService: CrmInboxService,
    private readonly activityService: CustomerActivityService,
    private readonly dialog: MatDialog,
    private readonly interceptorService: InterceptorService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  get canUpdate(): boolean {
    return this.authService.hasPermission(CRM_PERMISSIONS.updateActivity);
  }

  ngOnInit(): void {
    this.isCrmAdmin.set(this.authService.isCrmAdminUser());
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.reload(1));

    this.typeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.reload(1));
    this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.reload(1));
    this.authorSearchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.authorTerm.set(value);
      const selected = this.selectedAuthor();
      if (selected && value !== selected.display_name) {
        this.selectedAuthor.set(null);
        if (!value.trim()) {
          this.reload(1);
        }
      }
    });

    this.loadAuthors();
    this.reload(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPeriodChange(preset: ReportPeriod): void {
    this.datePreset = preset;
    if (preset !== 'range') {
      this.customDateFrom = '';
      this.customDateTo = '';
      this.reload(1);
    }
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.customDateFrom = range.dateFrom;
    this.customDateTo = range.dateTo;
    this.datePreset = 'range';
    this.reload(1);
  }

  onAuthorSelected(value: CrmActivityAuthor): void {
    if (!value?.id) {
      this.selectedAuthor.set(null);
      this.authorTerm.set('');
      this.authorSearchControl.setValue('', { emitEvent: false });
      this.reload(1);
      return;
    }
    this.selectedAuthor.set(value);
    this.authorTerm.set(value.display_name);
    this.authorSearchControl.setValue(value.display_name, { emitEvent: false });
    this.reload(1);
  }

  displayAuthor = (author: CrmActivityAuthor | string | null): string => {
    if (!author) {
      return '';
    }
    if (typeof author === 'string') {
      return author;
    }
    return author.display_name;
  };

  clearAuthor(): void {
    this.selectedAuthor.set(null);
    this.authorTerm.set('');
    this.authorSearchControl.setValue('', { emitEvent: false });
    this.reload(1);
  }

  setAttention(filter: CrmAttentionFilter | null): void {
    this.attention.set(this.attention() === filter ? null : filter);
    this.reload(1);
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.typeControl.setValue('', { emitEvent: false });
    this.statusControl.setValue('', { emitEvent: false });
    this.attention.set(null);
    this.clearAuthor();
  }

  get hasActiveFilters(): boolean {
    return Boolean(
      this.searchControl.value ||
        this.typeControl.value ||
        this.statusControl.value ||
        this.selectedAuthor() ||
        this.attention(),
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize));
  }

  goToPrevPage(): void {
    if (this.page() > 1) {
      this.loadActivities(this.page() - 1);
    }
  }

  goToNextPage(): void {
    if (this.page() < this.totalPages) {
      this.loadActivities(this.page() + 1);
    }
  }

  openCustomer(activity: CrmActivity): void {
    void this.router.navigate(['/customers/detail', activity.customer_id]);
  }

  openEdit(activity: CrmActivity): void {
    if (!this.canUpdate) {
      return;
    }
    const dialogRef = this.dialog.open(CustomerActivityFormDialogComponent, {
      ...CUSTOMER_ACTIVITY_FORM_DIALOG_CONFIG,
      data: {
        customerId: activity.customer_id,
        activity: this.toCustomerActivity(activity),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Actividad actualizada correctamente',
        });
        this.reload();
      }
    });
  }

  markCompleted(activity: CrmActivity, event: Event): void {
    event.stopPropagation();
    if (!this.canUpdate || activity.status === ActivityStatus.COMPLETED) {
      return;
    }

    this.activityService
      .updateActivity(activity.customer_id, activity.id, { status: ActivityStatus.COMPLETED })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Seguimiento marcado como completado',
          });
          this.reload();
        },
        error: () => {
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No se pudo completar la actividad',
          });
        },
      });
  }

  getTypeLabel = getActivityTypeLabel;
  getStatusLabel = getActivityStatusLabel;
  getStatusClass = getActivityStatusClass;
  getTypeClass = getActivityTypeClass;

  private reload(page = this.page()): void {
    if (this.rangeIncomplete) {
      return;
    }
    this.loadStats();
    this.loadActivities(page);
  }

  private loadAuthors(): void {
    this.crmInboxService
      .getAuthors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isCrmAdmin.set(response.is_crm_admin);
          this.authors.set(response.authors ?? []);
        },
        error: () => {
          this.authors.set([]);
        },
      });
  }

  private loadStats(): void {
    this.statsLoading.set(true);
    this.crmInboxService
      .getStats(this.currentQuery())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.stats.set(response);
          this.isCrmAdmin.set(response.is_crm_admin);
          this.statsLoading.set(false);
        },
        error: () => {
          this.statsLoading.set(false);
        },
      });
  }

  private loadActivities(page: number): void {
    this.loading.set(true);
    this.page.set(page);
    this.crmInboxService
      .getActivities({ ...this.currentQuery(), page, limit: this.pageSize })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.activities.set(response.activities ?? []);
          this.total.set(response.total ?? 0);
          this.isCrmAdmin.set(response.is_crm_admin);
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

  private currentQuery() {
    return {
      search: this.searchControl.value.trim() || undefined,
      type: this.typeControl.value || undefined,
      status: this.statusControl.value || undefined,
      user_id: this.selectedAuthor()?.id || undefined,
      period: this.datePreset,
      date_from: this.datePreset === 'range' ? this.customDateFrom : undefined,
      date_to: this.datePreset === 'range' ? this.customDateTo : undefined,
      attention: this.attention() ?? undefined,
    };
  }

  private authorMatches(author: CrmActivityAuthor, term: string): boolean {
    return [author.display_name, author.first_name, author.last_name, author.email]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(term));
  }

  private toCustomerActivity(activity: CrmActivity): CustomerActivity {
    return {
      id: activity.id,
      customer_id: activity.customer_id,
      type: activity.type as ActivityType,
      status: activity.status as ActivityStatus,
      title: activity.title,
      description: activity.description ?? undefined,
      notes: activity.notes ?? undefined,
      activity_date: activity.activity_date,
      follow_up_date: activity.follow_up_date ?? undefined,
      duration_minutes: activity.duration_minutes ?? undefined,
      outcome: activity.outcome as CustomerActivity['outcome'],
      created_at: activity.created_at,
      updated_at: activity.updated_at,
    };
  }

  readonly allAuthorsOption = ALL_AUTHORS;
}

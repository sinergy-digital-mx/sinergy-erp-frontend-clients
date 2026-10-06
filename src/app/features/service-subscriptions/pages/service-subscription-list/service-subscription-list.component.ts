import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ServiceSubscriptionService } from '../../services/service-subscription.service';
import { ServiceSubscriptionListItem, ServiceSubscriptionStatus } from '../../models/service-subscription.model';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ToastService } from '../../../../core/services/toast.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SERVICE_SUBSCRIPTION_PERMISSIONS } from '../../config/permissions.config';
import {
  coveragePercent,
  moneyMx,
  subscriptionStatusLabel,
} from '../../utils/service-subscription-display.util';

type StatusFilter = '' | ServiceSubscriptionStatus;

@Component({
  selector: 'app-service-subscription-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SpinnerComponent,
    EmptyStageComponent,
    LucideAngularModule,
  ],
  templateUrl: './service-subscription-list.component.html',
  styleUrl: '../../styles/service-subscriptions.scss',
})
export class ServiceSubscriptionListComponent {
  private readonly api = inject(ServiceSubscriptionService);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly load$ = new Subject<void>();

  readonly Search = Search;
  readonly X = X;
  readonly money = moneyMx;
  readonly statusLabel = subscriptionStatusLabel;
  readonly coverage = coveragePercent;
  readonly statuses: Array<{ id: StatusFilter; label: string }> = [
    { id: '', label: 'Todas' },
    { id: 'active', label: 'Activas' },
    { id: 'completed', label: 'Terminadas' },
    { id: 'cancelled', label: 'Canceladas' },
  ];

  readonly loading = signal(true);
  readonly items = signal<ServiceSubscriptionListItem[]>([]);
  readonly status = signal<StatusFilter>('');
  readonly page = signal(1);
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly canCreate = this.auth.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.create);

  constructor() {
    this.load$
      .pipe(
        switchMap(() => {
          this.loading.set(true);
          return this.api.list(this.searchControl.value, this.page(), this.status()).pipe(
            catchError((err) => {
              this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las suscripciones'));
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((page) => {
        this.loading.set(false);
        if (!page) return;
        this.items.set(page.data || []);
        this.total.set(page.total ?? 0);
        this.totalPages.set(page.totalPages ?? 0);
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => {
        this.page.set(1);
        this.load$.next();
      });

    this.load$.next();
  }

  setStatus(status: StatusFilter): void {
    if (this.status() === status) return;
    this.status.set(status);
    this.page.set(1);
    this.load$.next();
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  open(id: string): void {
    this.router.navigate(['/service-subscriptions', id]);
  }

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.page.set(page);
    this.load$.next();
  }

  get filteredEmpty(): boolean {
    return !!this.searchControl.value.trim() || !!this.status();
  }
}

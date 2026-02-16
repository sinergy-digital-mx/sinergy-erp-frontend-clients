import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerActivityService } from '../../services/customer-activity.service';
import { ActivitySummary } from '../../models/customer-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-activity-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  template: `<div class="activity-summary">
  <h3>Resumen de Actividades</h3>

  <div *ngIf="isLoading" class="loading-container">
    <mat-spinner diameter="40"></mat-spinner>
    <p>Cargando resumen...</p>
  </div>

  <div *ngIf="error && !isLoading" class="error-container">
    <p class="error-message">{{ error.message }}</p>
  </div>

  <div *ngIf="!isLoading && !error && summary" class="summary-grid">
    <mat-card class="summary-card">
      <mat-card-content>
        <div class="card-value">{{ summary.total_activities }}</div>
        <div class="card-label">Total de Actividades</div>
      </mat-card-content>
    </mat-card>

    <mat-card class="summary-card">
      <mat-card-content>
        <div class="card-value">{{ summary.last_activity_date | date:'mediumDate' }}</div>
        <div class="card-label">Última Actividad</div>
      </mat-card-content>
    </mat-card>

    <mat-card class="summary-card">
      <mat-card-content>
        <div class="card-value">{{ summary.next_follow_up | date:'mediumDate' }}</div>
        <div class="card-label">Próximo Seguimiento</div>
      </mat-card-content>
    </mat-card>

    <mat-card class="summary-card">
      <mat-card-content>
        <div class="activities-by-type">
          <div class="type-item" *ngFor="let item of getActivitiesByType()">
            <span class="type-label">{{ item.type }}:</span>
            <span class="type-count">{{ item.count }}</span>
          </div>
        </div>
        <div class="card-label">Actividades por Tipo</div>
      </mat-card-content>
    </mat-card>

    <mat-card class="summary-card">
      <mat-card-content>
        <div class="activities-by-status">
          <div class="status-item" *ngFor="let item of getActivitiesByStatus()">
            <span class="status-label">{{ item.status }}:</span>
            <span class="status-count">{{ item.count }}</span>
          </div>
        </div>
        <div class="card-label">Actividades por Estado</div>
      </mat-card-content>
    </mat-card>
  </div>

  <div *ngIf="!isLoading && !error && !summary" class="empty-state">
    <p>No hay datos de actividades disponibles</p>
  </div>
</div>`,
  styles: [`
.activity-summary {
  padding: 1rem;
}

.activity-summary h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.loading-container,
.error-container,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.summary-card {
  padding: 1rem;
}

.card-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.card-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.activities-by-type,
.activities-by-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.type-item,
.status-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.type-label,
.status-label {
  color: #6b7280;
}

.type-count,
.status-count {
  font-weight: 600;
  color: #1e40af;
}

@media (max-width: 767px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
  `],
})
export class CustomerActivitySummaryComponent implements OnInit, OnDestroy {
  @Input() customerId!: number;

  summary: ActivitySummary | null = null;
  isLoading = false;
  error: any = null;
  private destroy$ = new Subject<void>();

  constructor(private activityService: CustomerActivityService) {}

  ngOnInit() {
    this.loadSummary();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load activity summary
   */
  loadSummary() {
    if (!this.customerId) return;

    this.isLoading = true;
    this.error = null;

    this.activityService.getActivitySummary(this.customerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (summary) => {
          this.summary = summary;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        }
      });
  }

  /**
   * Get activities by type as array
   */
  getActivitiesByType() {
    if (!this.summary?.activities_by_type) return [];
    return Object.entries(this.summary.activities_by_type).map(([type, count]) => ({
      type,
      count
    }));
  }

  /**
   * Get activities by status as array
   */
  getActivitiesByStatus() {
    if (!this.summary?.activities_by_status) return [];
    return Object.entries(this.summary.activities_by_status).map(([status, count]) => ({
      status,
      count
    }));
  }
}

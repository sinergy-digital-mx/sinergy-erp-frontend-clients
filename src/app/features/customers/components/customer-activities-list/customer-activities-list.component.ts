import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerActivityService } from '../../services/customer-activity.service';
import { CustomerActivity } from '../../models/customer-group.model';
import { CreateActivityModalComponent } from '../create-activity-modal/create-activity-modal.component';
import { EditActivityModalComponent } from '../edit-activity-modal/edit-activity-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-activities-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `<div class="activities-list">
  <div class="activities-header">
    <h3>Actividades</h3>
    <button mat-raised-button color="primary" (click)="openCreateActivityModal()">
      Nueva Actividad
    </button>
  </div>

  <div *ngIf="isLoading" class="loading-container">
    <mat-spinner diameter="40"></mat-spinner>
    <p>Cargando actividades...</p>
  </div>

  <div *ngIf="error && !isLoading" class="error-container">
    <p class="error-message">{{ error.message }}</p>
    <button mat-raised-button (click)="loadActivities()">Reintentar</button>
  </div>

  <div *ngIf="!isLoading && !error && activities.length === 0" class="empty-state">
    <p>No hay actividades registradas</p>
  </div>

  <table *ngIf="!isLoading && !error && activities.length > 0" mat-table [dataSource]="activities" class="activities-table">
    <!-- Type Column -->
    <ng-container matColumnDef="type">
      <th mat-header-cell *matHeaderCellDef>Tipo</th>
      <td mat-cell *matCellDef="let element">{{ element.type }}</td>
    </ng-container>

    <!-- Title Column -->
    <ng-container matColumnDef="title">
      <th mat-header-cell *matHeaderCellDef>Título</th>
      <td mat-cell *matCellDef="let element">{{ element.title }}</td>
    </ng-container>

    <!-- Status Column -->
    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef>Estado</th>
      <td mat-cell *matCellDef="let element">{{ element.status }}</td>
    </ng-container>

    <!-- Date Column -->
    <ng-container matColumnDef="activity_date">
      <th mat-header-cell *matHeaderCellDef>Fecha</th>
      <td mat-cell *matCellDef="let element">{{ element.activity_date | date:'mediumDate' }}</td>
    </ng-container>

    <!-- Duration Column -->
    <ng-container matColumnDef="duration_minutes">
      <th mat-header-cell *matHeaderCellDef>Duración</th>
      <td mat-cell *matCellDef="let element">{{ element.duration_minutes ? element.duration_minutes + ' min' : '-' }}</td>
    </ng-container>

    <!-- Outcome Column -->
    <ng-container matColumnDef="outcome">
      <th mat-header-cell *matHeaderCellDef>Resultado</th>
      <td mat-cell *matCellDef="let element">{{ element.outcome || '-' }}</td>
    </ng-container>

    <!-- Actions Column -->
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef>Acciones</th>
      <td mat-cell *matCellDef="let element">
        <button mat-icon-button (click)="editActivity(element)" title="Editar">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button (click)="deleteActivity(element.id)" title="Eliminar">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator
    *ngIf="!isLoading && !error && activities.length > 0"
    [length]="totalResults"
    [pageSize]="pageSize"
    [pageSizeOptions]="[5, 10, 25]"
    (page)="onPageChange($event)">
  </mat-paginator>
</div>`,
  styles: [`
.activities-list {
  padding: 1rem;
}

.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.activities-header h3 {
  margin: 0;
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

.activities-table {
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 767px) {
  .activities-header {
    flex-direction: column;
    gap: 1rem;
  }

  .activities-header button {
    width: 100%;
  }
}
  `],
})
export class CustomerActivitiesListComponent implements OnInit, OnDestroy {
  @Input() customerId!: number;

  activities: CustomerActivity[] = [];
  isLoading = false;
  error: any = null;
  page = 1;
  pageSize = 10;
  totalResults = 0;
  displayedColumns: string[] = ['type', 'title', 'status', 'activity_date', 'duration_minutes', 'outcome', 'actions'];
  private destroy$ = new Subject<void>();

  constructor(
    private activityService: CustomerActivityService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadActivities();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load activities for the customer
   */
  loadActivities() {
    if (!this.customerId) return;

    this.isLoading = true;
    this.error = null;

    this.activityService.getActivities(this.customerId, this.page, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.activities = response.data || [];
          this.totalResults = response.total || 0;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        }
      });
  }

  /**
   * Handle pagination change
   */
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActivities();
  }

  /**
   * Open create activity modal
   */
  openCreateActivityModal() {
    const dialogRef = this.dialog.open(CreateActivityModalComponent, {
      width: '600px',
      data: { customerId: this.customerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivities();
      }
    });
  }

  /**
   * Edit activity
   */
  editActivity(activity: CustomerActivity) {
    const dialogRef = this.dialog.open(EditActivityModalComponent, {
      width: '600px',
      data: { customerId: this.customerId, activity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivities();
      }
    });
  }

  /**
   * Delete activity
   */
  deleteActivity(activityId: string) {
    if (!this.customerId) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.activityService.deleteActivity(this.customerId, activityId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadActivities();
          },
          error: (error) => {
            console.error('Error deleting activity:', error);
          }
        });
    }
  }
}

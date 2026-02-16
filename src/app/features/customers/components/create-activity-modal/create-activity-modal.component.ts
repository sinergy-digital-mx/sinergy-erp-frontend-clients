import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivityType, ActivityStatus, ActivityOutcome, CreateActivityRequest } from '../../models/customer-group.model';
import { CustomerActivityService } from '../../services/customer-activity.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-activity-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  template: `<div class="create-modal">
  <h2 mat-dialog-title>Nueva Actividad</h2>
  
  <mat-dialog-content>
    <form [formGroup]="activityForm">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Tipo</mat-label>
        <mat-select formControlName="type" required>
          <mat-option *ngFor="let type of activityTypes" [value]="type">
            {{ type }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="activityForm.get('type')?.hasError('required')">
          El tipo es requerido
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Título</mat-label>
        <input matInput formControlName="title" required>
        <mat-error *ngIf="activityForm.get('title')?.hasError('required')">
          El título es requerido
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Descripción</mat-label>
        <textarea matInput formControlName="description" rows="4"></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Estado</mat-label>
        <mat-select formControlName="status" required>
          <mat-option *ngFor="let status of activityStatuses" [value]="status">
            {{ status }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="activityForm.get('status')?.hasError('required')">
          El estado es requerido
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Duración (minutos)</mat-label>
        <input matInput formControlName="duration_minutes" type="number">
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Resultado</mat-label>
        <mat-select formControlName="outcome">
          <mat-option [value]="null">Sin resultado</mat-option>
          <mat-option *ngFor="let outcome of activityOutcomes" [value]="outcome">
            {{ outcome }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Fecha de Seguimiento</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="follow_up_date">
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Notas</mat-label>
        <textarea matInput formControlName="notes" rows="3"></textarea>
      </mat-form-field>

      <div *ngIf="submitError" class="error-message">
        {{ submitError }}
      </div>
    </form>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button mat-button (click)="onCancel()">Cancelar</button>
    <button 
      mat-raised-button 
      color="primary" 
      (click)="onSave()"
      [disabled]="!activityForm.valid || isSubmitting">
      {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
    </button>
  </mat-dialog-actions>
</div>`,
  styles: [`
.create-modal {
  min-width: 500px;
}

.full-width {
  width: 100%;
  margin-bottom: 1rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee2e2;
  border-radius: 0.375rem;
}

mat-dialog-actions {
  padding: 1rem 0 0 0;
}
  `],
})
export class CreateActivityModalComponent implements OnInit, OnDestroy {
  activityForm: FormGroup;
  activityTypes = Object.values(ActivityType);
  activityStatuses = Object.values(ActivityStatus);
  activityOutcomes = Object.values(ActivityOutcome);
  isSubmitting = false;
  submitError: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CreateActivityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number },
    private fb: FormBuilder,
    private activityService: CustomerActivityService
  ) {
    this.activityForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      duration_minutes: [null],
      outcome: [null],
      follow_up_date: [null],
      notes: ['']
    });
  }

  ngOnInit() {
    // Set default status to scheduled
    this.activityForm.patchValue({
      status: ActivityStatus.SCHEDULED
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Save new activity
   */
  onSave() {
    if (!this.activityForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const request: CreateActivityRequest = this.activityForm.value;

    this.activityService.createActivity(this.data.customerId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = error.message || 'Error al crear la actividad';
          console.error('Error creating activity:', error);
        }
      });
  }

  /**
   * Cancel and close modal
   */
  onCancel() {
    this.dialogRef.close();
  }
}

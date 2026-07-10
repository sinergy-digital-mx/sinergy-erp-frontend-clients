import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import {
  ActivityOutcome,
  ActivityStatus,
  ActivityType,
  CreateActivityRequest,
  CustomerActivity,
  UpdateActivityRequest,
} from '../../models/customer-group.model';
import { CustomerActivityService } from '../../services/customer-activity.service';
import {
  getActivityOutcomeLabel,
  getActivityStatusLabel,
  getActivityTypeLabel,
} from '../../utils/activity-label.util';

export interface CustomerActivityFormDialogData {
  customerId: number;
  activity?: CustomerActivity | null;
}

@Component({
  selector: 'app-customer-activity-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule,
  ],
  templateUrl: './customer-activity-form-dialog.component.html',
  styleUrl: './customer-activity-form-dialog.component.scss',
})
export class CustomerActivityFormDialogComponent implements OnDestroy {
  readonly X = X;

  form: FormGroup;
  saving = signal(false);
  submitError = signal<string | null>(null);
  readonly isEdit: boolean;

  readonly activityTypes = Object.values(ActivityType);
  readonly activityStatuses = Object.values(ActivityStatus);
  readonly activityOutcomes = Object.values(ActivityOutcome);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private activityService: CustomerActivityService,
    private dialogRef: MatDialogRef<CustomerActivityFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerActivityFormDialogData
  ) {
    this.isEdit = !!data.activity;
    this.form = this.fb.group({
      type: [ActivityType.NOTE, Validators.required],
      title: ['', Validators.required],
      description: [''],
      status: [ActivityStatus.COMPLETED, Validators.required],
      duration_minutes: [null],
      outcome: [null],
      follow_up_date: [null],
      notes: [''],
    });

    if (data.activity) {
      this.patchActivity(data.activity);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTypeLabel = getActivityTypeLabel;
  getStatusLabel = getActivityStatusLabel;
  getOutcomeLabel = getActivityOutcomeLabel;

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const payload = this.buildPayload();
    const request$ = this.isEdit
      ? this.activityService.updateActivity(
          this.data.customerId,
          this.data.activity!.id,
          payload as UpdateActivityRequest
        )
      : this.activityService.createActivity(
          this.data.customerId,
          payload as CreateActivityRequest
        );

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving.set(false);
        this.dialogRef.close(result);
      },
      error: (error) => {
        this.saving.set(false);
        this.submitError.set(error?.message || 'No se pudo guardar la actividad');
      },
    });
  }

  private patchActivity(activity: CustomerActivity): void {
    this.form.patchValue({
      type: activity.type,
      title: activity.title,
      description: activity.description || '',
      status: activity.status,
      duration_minutes: activity.duration_minutes ?? null,
      outcome: activity.outcome ?? null,
      follow_up_date: activity.follow_up_date ? activity.follow_up_date.slice(0, 10) : null,
      notes: activity.notes || '',
    });
  }

  private buildPayload(): CreateActivityRequest | UpdateActivityRequest {
    const raw = this.form.getRawValue();
    const payload: CreateActivityRequest = {
      type: raw.type,
      status: raw.status,
      title: String(raw.title ?? '').trim(),
      description: String(raw.description ?? '').trim() || undefined,
      notes: String(raw.notes ?? '').trim() || undefined,
    };

    if (raw.duration_minutes != null && raw.duration_minutes !== '') {
      payload.duration_minutes = Number(raw.duration_minutes);
    }
    if (raw.outcome) {
      payload.outcome = raw.outcome;
    }
    if (raw.follow_up_date) {
      payload.follow_up_date = raw.follow_up_date;
    }

    return payload;
  }
}

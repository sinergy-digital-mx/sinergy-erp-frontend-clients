import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';

import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from '../../../../core/services/leads.service';

@Component({
  selector: 'app-lead-activity-dialog',
  standalone: true,
  styleUrls: ['./lead-activity-dialog.scss'],
  imports: [
    CommonModule,
    LucideAngularModule,
    InputComponent,
    ButtonComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
],
  templateUrl: 'lead-activity-dialog.html',
})
export class LeadActivityDialog {

  readonly X = X;

  loading = false;
  form: FormGroup;
  update = signal(false)

  // Opciones de tipo de actividad
  activityTypes = [
    { label: 'Call', value: 'call' },
    { label: 'Email', value: 'email' },
    { label: 'Meeting', value: 'meeting' },
    { label: 'Note', value: 'note' },
    { label: 'Task', value: 'task' },
    { label: 'Follow up', value: 'follow_up' },
  ];

  lead_id:any = signal(null)

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeadActivityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { lead_id: number },
    public route: ActivatedRoute,
    public leads_service:LeadService
  ) {
    this.lead_id.set(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      type: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      notes: ['']
    });
  }

  closeDialog(): void {
    if (!this.loading) {
      this.dialogRef.close(this.update());
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      lead_id: this.lead_id,
      ...this.form.value,
    };

    this.leads_service.createActivity(payload).subscribe(res=>{
      this.update.set(true)
      this.closeDialog()
    })
  }
}

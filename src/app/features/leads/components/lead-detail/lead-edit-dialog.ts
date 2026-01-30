import { Component, Inject ,signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadService } from '../../../../core/services/leads.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';

@Component({
  selector: 'app-lead-edit-dialog',
  standalone: true,
  styleUrls: ['./lead-edit-dialog.scss'],
  imports: [CommonModule, TableModule, TagModule, ButtonModule,ButtonComponent,LucideAngularModule,InputComponent, ReactiveFormsModule],
  templateUrl: 'lead-edit-dialog.html',
})
export class LeadEditDialog {

  loading = signal(false);
  update = signal(false);

  readonly X = X;
  form:FormGroup
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog:MatDialog, public dialog_ref:MatDialogRef<LeadEditDialog>,
    @Inject(MAT_DIALOG_DATA)public data:any,
    public lead_service: LeadService,
    public interceptor_service:InterceptorService
    // private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['',],
      phone: ['', [Validators.required]],
      phone_code: ['+1', [Validators.required]],
      phone_country: ['US', [Validators.required]],
      source: ['', [Validators.required]],
      status_id: [null, [Validators.required]],
      company_name: [null, []],
      website: [null, []],
    });

    this.form.patchValue({
      name: this.data.name,
      lastname: this.data.lastname,
      email: this.data.email,
      phone: this.data.phone,
      phone_code: this.data.phone_code,
      phone_country: this.data.phone_country,
      source: this.data.source,
      status_id: this.data?.status?.id,
      company_name: this.data.company_name,
      website: this.data.website,
    })
  }

  ngOnInit(){
    
  }

  closeDialog(){
    if(!this.loading()){
      this.dialog_ref.close(this.update());
    }
  }

  submmit(){
    console.log(this.data)
    console.log(this.form.invalid)
    console.log(this.form.value)
    if(this.data.id){
      this.updateLead()
    }
  }

  updateLead(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    this.loading.set(true);
  
    const payload = {
      id: this.data.id,
      ...this.form.value,
    };

  
    this.lead_service.updateLead(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
  
        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Success',
          message: 'Lead updated successfully.',
        });
      },
      error: () => {
        this.loading.set(false);
  
        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'We couldn’t update the lead. Please try again.',
        });
      },
    });
  }
  

}

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-edit-dialog',
  standalone: true,
  styleUrls: ['./lead-edit-dialog.scss'],
  imports: [CommonModule, TableModule, TagModule, ButtonModule,ButtonComponent,LucideAngularModule,InputComponent],
  templateUrl: 'lead-edit-dialog.html',
})
export class LeadEditDialog {

  loading = false;
  update = false;

  readonly X = X;
  form:FormGroup
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog:MatDialog, public dialog_ref:MatDialogRef<LeadEditDialog>,
    @Inject(MAT_DIALOG_DATA)public data:any
    // private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      phone_code: ['+1', [Validators.required]],
      phone_country: ['US', [Validators.required]],
      source: ['', [Validators.required]],
      status_id: [null, [Validators.required]],
    });

    this.form.patchValue({
      name: this.data.name,
      lastname: this.data.lastname,
      email: this.data.email,
      phone: this.data.phone,
      phone_code: this.data.phone_code,
      phone_country: this.data.phone_country,
      source: this.data.source,
      status_id: this.data.status_id
    })
  }

  ngOnInit(){
    
  }

  closeDialog(){
    if(!this.loading){
      this.dialog_ref.close(this.update);
    }
  }

  submmit(){

  }

}

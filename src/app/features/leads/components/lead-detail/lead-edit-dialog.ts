import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-edit-dialog',
  standalone: true,
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
    public dialog:MatDialog, public dialog_ref:MatDialogRef<LeadEditDialog>
    // private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rfc: ['', [Validators.required]],
    });
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

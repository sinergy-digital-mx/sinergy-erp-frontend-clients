import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadEditDialog } from '../../components/lead-detail/lead-edit-dialog';
import { LeadService } from '../../../../core/services/leads.service';
import { ActivatedRoute } from '@angular/router';
import { LeadActivityDialog } from '../../components/lead-activity-dialog/lead-activity-dialog';
import { LeadAddressDialog } from '../../components/lead-address-dialog/lead-address-dialog';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: 'lead-detail.html',
})
export class LeadDetail {


  lead_id = signal(null)
  lead:any = signal({})
  activities:any = signal([])

  constructor(public dialog:MatDialog, public leads_service: LeadService, public route:ActivatedRoute){
    this.lead_id.set(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(){
    this.getDetail()
  }


  openEdit(){
    this.dialog.open(LeadEditDialog, {
      data: this.lead()
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getDetail()
      }
    })
  }

  getDetail(){
    this.leads_service.getDetail(this.lead_id()).subscribe(res=>{
      this.lead.set(res)
    })
  }

  createActivity(){
    this.dialog.open(LeadActivityDialog,{
      data: {
        lead_id: this.lead_id()
      }
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getDetail()
      }
    })
  }

  createAddress(){
    this.dialog.open(LeadAddressDialog,{
      data: {
        lead_id: this.lead_id()
      }
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getDetail()
      }
    })
  }

}

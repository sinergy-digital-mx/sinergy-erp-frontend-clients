import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LeadService } from '../../../../core/services/leads.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-leads-list',
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, FloatLabelModule, TagModule, ButtonModule],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss',
})
export class LeadsList {

  search = '';

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'created_at', header: 'Created at' },
    { field: 'actions', header: 'Actions' },
  ];

  leads = signal([]);

  constructor(private router: Router, public leads_service:LeadService) { }

  ngOnInit(){
    this.getLeads()
  }

  getLeads(){
    this.leads_service.getLeads({}).subscribe(res =>{
      this.leads.set(res)
    })
  }
  
  getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'Al corriente': return 'success';
      case 'Atrasado': return 'danger';
      case 'Sin iniciar': return 'info';
      default: return 'warn';
    }
  }

  viewDetail(row: any) {
    this.router.navigate(['/leads/detail', row.id]);
  }

}

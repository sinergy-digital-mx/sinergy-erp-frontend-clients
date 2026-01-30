import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LeadService } from '../../../../core/services/leads.service';
import { signal } from '@angular/core';
import { ITable, TableComponent } from '../../../../core/components/table/table.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-leads-list',
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, FloatLabelModule, TagModule, ButtonModule,TableComponent,SearchComponent],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss',
})
export class LeadsList {

  table_config = signal<ITable>({
    title: null,
    empty_state: { title: 'No results', subtitle: 'No leads found' },
    header: ['Name', 'Email','Phone', 'Created at', 'Actions'],
    columns: '1fr 2fr 1fr 1fr 1fr',
    checkbox: false,
    click: true,
    data: [],
    page: 1,
    total_results: 0,
    pagination: true,
    limit: 15,
    active_infinite_scroll: false,
    loading: false as any,
    activate_params:true
  });

  search = '';

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'created_at', header: 'Created at' },
    { field: 'actions', header: 'Actions' },
  ];

  leads = signal([]);
  constructor(private router: Router, public leads_service: LeadService, public route: ActivatedRoute) {
    this.route.queryParams.subscribe((query) => {
      this.search=query?.search ?? ''
  
      this.table_config.update(c => ({
        ...c,
        page: query?.page ? Number(query.page) : c.page,
        limit: query?.limit ? Number(query.limit) : c.limit,
      }));
  
      this.getLeads();
    });
  }

  

  ngOnInit(){
  
  }

  getLeads(){
    this.table_config.update(c => ({ ...c, loading: true }));
    let data ={
      search: this.search,
      page: this.table_config().page,
      limit: this.table_config().limit
    }
    this.leads_service.getLeads(data).subscribe(res =>{
      this.table_config.update(c => ({
        ...c,
        data: res?.data ?? [],
        total_results: res?.total ?? 0,
        loading: false,
      }));
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

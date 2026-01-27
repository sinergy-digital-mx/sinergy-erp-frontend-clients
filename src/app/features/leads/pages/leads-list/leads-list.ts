import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

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

  leads = [
    {
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 55 1234 5678',
      created_at: '2024-11-12'
    },
    {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+52 33 9876 5432',
      created_at: '2024-11-15'
    },
    {
      name: 'Carlos Ramírez',
      email: 'carlos.ramirez@email.com',
      phone: '+1 305 555 8912',
      created_at: '2024-12-01'
    },
    {
      name: 'Ana López',
      email: 'ana.lopez@email.com',
      phone: '+34 612 345 678',
      created_at: '2024-12-05'
    },
    {
      name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      phone: '+57 300 456 7890',
      created_at: '2025-01-10'
    }
  ];

  constructor(private router: Router) { }
  
  getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'Al corriente': return 'success';
      case 'Atrasado': return 'danger';
      case 'Sin iniciar': return 'info';
      default: return 'warn';
    }
  }

  viewDetail(row: any) {
    this.router.navigate(['/leads/detail', 1]);
  }

}

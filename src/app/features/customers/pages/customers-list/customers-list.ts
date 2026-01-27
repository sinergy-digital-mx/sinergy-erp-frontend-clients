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
  selector: 'app-customers-list',
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, FloatLabelModule, TagModule, ButtonModule],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.scss',
})
export class CustomersList {

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
      name: 'Sofía Martínez',
      email: 'sofia.martinez@empresa.com',
      phone: '+52 81 2345 6789',
      created_at: '2024-10-18',
    },
    {
      name: 'Diego Herrera',
      email: 'diego.herrera@empresa.com',
      phone: '+54 11 5678 1234',
      created_at: '2024-11-03',
    },
    {
      name: 'Valentina Cruz',
      email: 'valentina.cruz@empresa.com',
      phone: '+56 9 8765 4321',
      created_at: '2024-11-27',
    },
    {
      name: 'Andrés Molina',
      email: 'andres.molina@empresa.com',
      phone: '+57 311 890 2345',
      created_at: '2024-12-14',
    },
    {
      name: 'Camila Torres',
      email: 'camila.torres@empresa.com',
      phone: '+1 646 555 7721',
      created_at: '2025-01-05',
    },
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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadEditDialog } from '../../components/lead-detail/lead-edit-dialog';
import { LeadService } from '../../../../core/services/leads.service';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: 'lead-detail.html',
})
export class LeadDetail {
  client = {
    commercialName: 'Rodolfo Rodriguez',
    legalName: 'Rodolfo Rodriguez',
    rfc: 'CDU820122JFA',
    taxRegime: '601 - General de Ley Personas Morales',
    paymentTerms: '5 días',
    address: 'Mzne ejercito nacional Despacho 1, Polanco I Sección, Miguel Hidalgo, CDMX, 11510',
    status: 'Validado',
    email: 'rodolfo@gmail.com',
    phone: '55 1234 5678',
    contracts: [
      {
        code: 'CT-1001', paymentTerms: 'Mensual (cada 10)',
        totalAmount: 120000, paidAmount: 80000, dueAmount: 40000,
        nextPayment: '2025-11-10', status: 'Al corriente',
        payments: [
          { date: '2025-09-10', amount: 4000, method: 'Transferencia', status: 'Pagado' },
          { date: '2025-10-10', amount: 4000, method: 'Efectivo', status: 'Pagado' },
        ]
      },
      {
        code: 'CT-1002', paymentTerms: 'Mensual (cada 25)',
        totalAmount: 90000, paidAmount: 30000, dueAmount: 60000,
        nextPayment: '2025-11-25', status: 'Pendiente',
        payments: [
          { date: '2025-08-20', amount: 4500, method: 'Transferencia', status: 'Pagado' },
          { date: '2025-09-20', amount: 4500, method: 'Transferencia', status: 'Atrasado' },
        ]
      }
    ]
  };

  constructor(public dialog:MatDialog, public leads_service: LeadService){

  }

  getSeverity(s: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null {
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'> = {
      'Validado': 'success',
      'Al corriente': 'success',
      'Pagado': 'success',
      'Pendiente': 'warn',
      'Atrasado': 'danger'
    };
    return map[s] ?? 'secondary';
  }



  payments = [
    { date: '2025-10-10', amount: 4500, method: 'Transferencia', status: 'Pagado' },
    { date: '2025-09-10', amount: 4500, method: 'Efectivo', status: 'Pagado' },
    { date: '2025-08-10', amount: 4500, method: 'Transferencia', status: 'Atrasado' },
  ];

  openEdit(){
    this.dialog.open(LeadEditDialog, {
      data: this.client
    }).afterClosed().subscribe(res=>{

    })
  }


}

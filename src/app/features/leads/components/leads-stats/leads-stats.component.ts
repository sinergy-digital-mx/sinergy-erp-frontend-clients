import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from '../../../../core/services/leads.service';
import { LeadsStats } from '../../models/lead-group.model';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  gradient: string;
  filter: string | null;
}

@Component({
  selector: 'app-leads-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leads-stats.component.html',
  styleUrl: './leads-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsStatsComponent implements OnInit {
  @Input() activeFilter: string | null = null;
  @Output() filterChange = new EventEmitter<string | null>();

  stats: StatCard[] = [];
  loading = false;

  constructor(private leadsService: LeadService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.cdr.markForCheck();
    
    this.leadsService.getLeadsStats().subscribe({
      next: (data: LeadsStats) => {
        this.stats = [
          {
            title: 'Total de Leads',
            value: data.total_leads,
            icon: '📊',
            gradient: 'from-blue-500 to-blue-600',
            filter: null,
          },
          {
            title: 'No Contactados',
            value: data.not_contacted,
            icon: '📧',
            gradient: 'from-gray-500 to-gray-600',
            filter: 'not_contacted',
          },
          {
            title: 'Contactados',
            value: data.customer_responded_no_reply,
            icon: '⏳',
            gradient: 'from-orange-500 to-orange-600',
            filter: 'contacted_no_response',
          },
          {
            title: 'Cliente Respondió',
            value: data.customer_responded,
            icon: '✅',
            gradient: 'from-green-500 to-green-600',
            filter: 'customer_responded',
          },
        ];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onCardClick(filter: string | null) {
    this.filterChange.emit(filter);
  }

  isActive(filter: string | null): boolean {
    return this.activeFilter === filter;
  }
}

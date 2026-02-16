import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from '../../../../core/services/leads.service';

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
  @Output() filterChange = new EventEmitter<string | null>();

  stats: StatCard[] = [];
  loading = false;
  activeFilter: string | null = null;

  constructor(private leadsService: LeadService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.cdr.markForCheck();
    
    this.leadsService.getLeadsStats().subscribe({
      next: (data) => {
        this.stats = [
          {
            title: 'Total Leads',
            value: data.total_leads,
            icon: '📊',
            gradient: 'from-blue-500 to-blue-600',
            filter: null,
          },
          {
            title: 'Contacted via Email',
            value: data.contacted_via_email,
            icon: '✉️',
            gradient: 'from-purple-500 to-purple-600',
            filter: 'email_contacted',
          },
          {
            title: 'Customer Responded',
            value: data.customer_responded,
            icon: '💬',
            gradient: 'from-green-500 to-green-600',
            filter: 'customer_answered',
          },
          {
            title: 'Awaiting Our Reply',
            value: data.customer_responded_no_reply,
            icon: '⏳',
            gradient: 'from-orange-500 to-orange-600',
            filter: 'contacted_no_reply',
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
    this.activeFilter = filter;
    this.filterChange.emit(filter);
  }

  isActive(filter: string | null): boolean {
    return this.activeFilter === filter;
  }
}

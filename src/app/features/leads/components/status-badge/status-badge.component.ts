import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Lead, CommunicationStatus, StatusBadgeData } from '../../models/lead-group.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, TooltipModule, TagModule],
  template: `<div 
  *ngIf="badgeData"
  class="status-badge"
  [style.backgroundColor]="getBgColor()"
  [style.borderColor]="getBorderColor()"
  [style.borderStyle]="getBorderStyle()"
  [pTooltip]="badgeData.tooltip"
  tooltipPosition="top"
  (click)="onBadgeClick()"
  [ngClass]="{ 'active-filter': isFilterActive }">
  <i [class]="'pi ' + badgeData.icon" [style.color]="badgeData.color"></i>
  <span [style.color]="badgeData.color">{{ badgeData.label }}</span>
</div>`,
  styles: [`
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #E5E7EB;
  white-space: nowrap;
}

.status-badge i {
  font-size: 0.75rem;
  flex-shrink: 0;
}

.status-badge span {
  flex-shrink: 0;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-badge.active-filter {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}
  `],
})
export class StatusBadgeComponent implements OnInit {
  @Input() lead: Lead;
  @Input() isFilterActive: boolean = false;
  @Output() statusFilterChange = new EventEmitter<CommunicationStatus>();

  badgeData: StatusBadgeData | null = null;
  CommunicationStatus = CommunicationStatus;

  private statusConfig = {
    [CommunicationStatus.NOT_CONTACTED]: {
      label: 'No Contactado',
      icon: 'pi-envelope-open',
      color: '#9CA3AF',
      bgColor: '#F3F4F6',
      tooltip: 'Sin contactar'
    },
    [CommunicationStatus.CONTACTED]: {
      label: 'Contactado',
      icon: 'pi-envelope',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      tooltip: (date: string | null) => {
        if (!date) return 'Fecha no disponible';
        return `Contactado: ${this.formatDate(date)}`;
      }
    },
    [CommunicationStatus.RESPONDED]: {
      label: 'Respondido',
      icon: 'pi-check',
      color: '#10B981',
      bgColor: '#ECFDF5',
      tooltip: (date: string | null) => {
        if (!date) return 'Fecha no disponible';
        return `Respondido: ${this.formatDate(date)}`;
      }
    }
  };

  ngOnInit() {
    this.updateBadgeData();
  }

  ngOnChanges() {
    this.updateBadgeData();
  }

  /**
   * Determine the communication status based on lead properties
   */
  private getStatusFromLead(lead: Lead): CommunicationStatus {
    if (lead.customer_answered) {
      return CommunicationStatus.RESPONDED;
    } else if (lead.email_contacted) {
      return CommunicationStatus.CONTACTED;
    } else {
      return CommunicationStatus.NOT_CONTACTED;
    }
  }

  /**
   * Update badge data based on lead status
   */
  private updateBadgeData() {
    if (!this.lead) return;

    const status = this.getStatusFromLead(this.lead);
    const config = this.statusConfig[status];
    
    let tooltip = '';
    if (typeof config.tooltip === 'function') {
      const dateField = status === CommunicationStatus.CONTACTED 
        ? this.lead.first_email_sent_at 
        : this.lead.customer_answered_at;
      tooltip = config.tooltip(dateField);
    } else {
      tooltip = config.tooltip;
    }

    this.badgeData = {
      status,
      label: config.label,
      icon: config.icon,
      color: config.color,
      tooltip
    };
  }

  /**
   * Format date to dd/MM/yyyy HH:mm format
   */
  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return 'Fecha no disponible';
    }
  }

  /**
   * Handle badge click to filter by status
   */
  onBadgeClick() {
    if (this.badgeData) {
      this.statusFilterChange.emit(this.badgeData.status);
    }
  }

  /**
   * Get the background color for the badge
   */
  getBgColor(): string {
    if (!this.badgeData) return '#F3F4F6';
    return this.statusConfig[this.badgeData.status].bgColor;
  }

  /**
   * Get the border style for active filter
   */
  getBorderStyle(): string {
    return this.isFilterActive ? '2px solid' : '1px solid';
  }

  /**
   * Get the border color
   */
  getBorderColor(): string {
    if (!this.badgeData) return '#E5E7EB';
    return this.isFilterActive ? this.badgeData.color : '#E5E7EB';
  }
}

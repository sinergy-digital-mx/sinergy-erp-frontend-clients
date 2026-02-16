import { Component, effect, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
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
import { SearchComponent } from '../../../../core/components/search/search.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { LeadEditDialog } from '../../components/lead-edit-dialog/lead-edit-dialog';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IColumn, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { LeadsStatsComponent } from '../../components/leads-stats/leads-stats.component';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { GroupDropdownComponent } from '../../components/group-dropdown/group-dropdown.component';
import { FilterIndicatorComponent } from '../../components/filter-indicator/filter-indicator.component';
import { CommunicationStatus } from '../../models/lead-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';

@Component({
  selector: 'app-leads-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    FloatLabelModule,
    TagModule,
    ButtonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    LeadsStatsComponent,
    StatusBadgeComponent,
    GroupDropdownComponent,
    FilterIndicatorComponent,
    PhoneComponent,
  ],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss',
})
export class LeadsList implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Name', prop: 'name', sortable: true, canAutoResize: true },
      { name: 'Status', prop: 'status', sortable: false, canAutoResize: true },
      { name: 'Email', prop: 'email', sortable: true, canAutoResize: true },
      { name: 'Phone', prop: 'phone', sortable: true, canAutoResize: true },
      { name: 'Created at', prop: 'created_at', sortable: true, canAutoResize: true },
      { name: 'Actions', prop: 'actions', sortable: false, canAutoResize: true },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'No results', subtitle: 'No leads found' },
    columnMode: 'force',
    reorderable: false,
  });

  readonly ArrowRight = ArrowRight;
  search = '';
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  activeFilter: string | null = null;
  activeStatusFilter: CommunicationStatus | null = null;
  activeGroupId: string | null = null;
  activeGroupName: string | null = null;

  constructor(private router: Router, public leads_service: LeadService, public route: ActivatedRoute, public dialog: MatDialog) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      
      // Only process if query params actually changed
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';

      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 15;

      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 15 : limit,
      }));

      // Handle status filter from query params
      if (query?.email_contacted === 'true') {
        this.activeStatusFilter = CommunicationStatus.CONTACTED;
      } else if (query?.customer_answered === 'true') {
        this.activeStatusFilter = CommunicationStatus.RESPONDED;
      } else if (query?.contacted_no_reply === 'true') {
        this.activeStatusFilter = CommunicationStatus.CONTACTED;
      } else {
        this.activeStatusFilter = null;
      }

      // Handle group filter from query params
      if (query?.group_id) {
        this.activeGroupId = query.group_id;
      } else {
        this.activeGroupId = null;
      }

      this.getLeads();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getLeads() {
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 15 : config.limit;
    
    let data: any = {
      search: this.search,
      page: page,
      limit: limit
    };

    // Add status filter if active
    if (this.activeStatusFilter === CommunicationStatus.CONTACTED) {
      data.email_contacted = true;
    } else if (this.activeStatusFilter === CommunicationStatus.RESPONDED) {
      data.customer_answered = true;
    }

    // Add group filter if active
    if (this.activeGroupId) {
      data.group_id = this.activeGroupId;
    }

    this.leads_service.getLeads(data).subscribe(res => {
      this.table_config.update(c => ({
        ...c,
        rows: res?.data ?? [],
        totalResults: res?.total ?? 0,
        hasNext: res?.hasNext ?? false,
        loading: false,
      }));
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.table_config.update(c => ({
      ...c,
      page: event.page,
      limit: event.limit,
    }));
    this.updateUrlParams();
  }

  onSortChange(event: ISortEvent) {
    // Handle sort change - for now just log it
    // In a real scenario, you might pass sort parameters to the API
    console.log('Sort changed:', event);
  }

  updateUrlParams() {
    const config = this.table_config();
    const params: any = {
      page: config.page,
      limit: config.limit,
      search: this.search || undefined,
    };

    // Add status filter if active
    if (this.activeStatusFilter === CommunicationStatus.CONTACTED) {
      params.email_contacted = 'true';
    } else if (this.activeStatusFilter === CommunicationStatus.RESPONDED) {
      params.customer_answered = 'true';
    }

    // Add group filter if active
    if (this.activeGroupId) {
      params.group_id = this.activeGroupId;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
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

  createLead() {
    this.dialog.open(LeadEditDialog, {
      data: {
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getLeads();
      }
    });
  }

  onFilterChange(filter: string | null) {
    this.activeFilter = filter;
    this.table_config.update(c => ({ ...c, page: 1 }));
    
    const params: any = { page: 1, limit: this.table_config().limit };
    
    if (filter === 'email_contacted') {
      params.email_contacted = true;
    } else if (filter === 'customer_answered') {
      params.customer_answered = true;
    } else if (filter === 'contacted_no_reply') {
      params.contacted_no_reply = true;
    }
    
    if (this.search) {
      params.search = this.search;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Handle status badge filter change
   */
  onStatusFilterChange(status: CommunicationStatus) {
    if (this.activeStatusFilter === status) {
      // Toggle off if already active
      this.activeStatusFilter = null;
    } else {
      // Set new status filter
      this.activeStatusFilter = status;
    }
    
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.updateUrlParams();
  }

  /**
   * Handle group dropdown selection
   */
  onGroupDropdownSelect(event: { groupId: string | null; groupName: string | null }) {
    this.activeGroupId = event.groupId;
    this.activeGroupName = event.groupName;
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.updateUrlParams();
  }

  /**
   * Handle filter clearing
   */
  onFilterClear(filterType: 'status' | 'group' | 'all') {
    if (filterType === 'status' || filterType === 'all') {
      this.activeStatusFilter = null;
    }
    if (filterType === 'group' || filterType === 'all') {
      this.activeGroupId = null;
      this.activeGroupName = null;
    }
    
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.updateUrlParams();
  }

  /**
   * Check if a status is the active filter
   */
  isStatusFilterActive(leadId: string): boolean {
    return this.activeStatusFilter !== null;
  }
}

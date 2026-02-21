import { Component, effect, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
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
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IColumn, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { LeadsStatsComponent } from '../../components/leads-stats/leads-stats.component';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { FilterIndicatorComponent } from '../../components/filter-indicator/filter-indicator.component';
import { CommunicationStatus } from '../../models/lead-group.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';
import { GroupFetchService } from '../../services/group-fetch.service';

@Component({
  selector: 'app-leads-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    LeadsStatsComponent,
    StatusBadgeComponent,
    SelectComponent,
    FilterIndicatorComponent,
    PhoneComponent,
  ],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss',
})
export class LeadsList implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: false, width: 75 },
      { name: 'Contacto', prop: 'contact_status', sortable: false, canAutoResize: false, width: 85 },
      { name: 'Grupo', prop: 'group', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Email', prop: 'email', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Teléfono', prop: 'phone', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 75 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 45 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron leads' },
    columnMode: 'force',
    reorderable: false,
  });

  search = '';
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  activeFilter: string | null = null;
  activeStatusFilter: CommunicationStatus | null = null;
  activeGroupId: string | null = null;
  activeGroupName: string | null = null;
  
  groupSelectConfig: ISelect = {
    placeholder: 'Filtrar por grupo',
    data: [],
    value: 'id',
    option: 'name',
    all: true,
    all_message: 'Ver Todos',
    loading: false,
    error: false,
    value_default: null
  };

  constructor(private router: Router, public leads_service: LeadService, public route: ActivatedRoute, public dialog: MatDialog, private groupFetchService: GroupFetchService) {
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
      if (query?.email_contacted === 'false') {
        this.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;
        this.activeFilter = 'not_contacted';
      } else if (query?.email_contacted === 'true' && query?.customer_answered === 'false') {
        this.activeStatusFilter = CommunicationStatus.CONTACTED;
        this.activeFilter = 'contacted_no_response';
      } else if (query?.email_contacted === 'true' && query?.customer_answered === 'true') {
        this.activeStatusFilter = CommunicationStatus.RESPONDED;
        this.activeFilter = 'customer_responded';
      } else {
        this.activeStatusFilter = null;
        this.activeFilter = null;
      }

      // Handle group filter from query params
      if (query?.group_id) {
        this.activeGroupId = query.group_id;
      } else {
        this.activeGroupId = null;
      }

      this.getLeads();
    });
    
    // Load groups for the select
    this.loadGroups();
  }

  /**
   * Load groups for the select dropdown
   */
  loadGroups() {
    this.groupSelectConfig.loading = true;
    this.groupSelectConfig.error = false;

    this.groupFetchService.fetchGroups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (groups) => {
          this.groupSelectConfig.data = groups.map(group => ({
            id: group.id,
            name: `${group.name} (${group.lead_count || 0})`,
            lead_count: group.lead_count || 0
          }));
          this.groupSelectConfig.loading = false;
        },
        error: (error) => {
          this.groupSelectConfig.loading = false;
          this.groupSelectConfig.error = true;
          console.error('Error loading groups:', error);
        }
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
    if (this.activeFilter === 'not_contacted') {
      data.email_contacted = false;
    } else if (this.activeFilter === 'contacted_no_response') {
      data.email_contacted = true;
      data.customer_answered = false;
    } else if (this.activeFilter === 'customer_responded') {
      data.email_contacted = true;
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
    };

    // Add search if present
    if (this.search) {
      params.search = this.search;
    }

    // Add status filter if active
    if (this.activeFilter === 'not_contacted') {
      params.email_contacted = 'false';
    } else if (this.activeFilter === 'contacted_no_response') {
      params.email_contacted = 'true';
      params.customer_answered = 'false';
    } else if (this.activeFilter === 'customer_responded') {
      params.email_contacted = 'true';
      params.customer_answered = 'true';
    }

    // Add group filter if active
    if (this.activeGroupId) {
      params.group_id = this.activeGroupId;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
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
    // Clear all previous filters first
    this.activeFilter = filter;
    this.activeStatusFilter = null;
    
    this.table_config.update(c => ({ ...c, page: 1 }));
    
    // Update the status filter based on the selected filter
    if (filter === 'not_contacted') {
      this.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;
    } else if (filter === 'contacted_no_response') {
      this.activeStatusFilter = CommunicationStatus.CONTACTED;
    } else if (filter === 'customer_responded') {
      this.activeStatusFilter = CommunicationStatus.RESPONDED;
    }
    
    // Update URL parameters and trigger data reload
    this.updateUrlParams();
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
   * Handle group select change (new method for app-select)
   */
  onGroupSelectChange(event: any) {
    const selectedGroupId = event.value;
    const selectedGroup = this.groupSelectConfig.data.find(g => g.id === selectedGroupId);
    const groupName = selectedGroup?.name?.split(' (')[0] || null; // Remove count from name
    
    this.activeGroupId = selectedGroupId;
    this.activeGroupName = groupName;
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.updateUrlParams();
  }

  /**
   * Handle filter clearing
   */
  onFilterClear(filterType: 'status' | 'group' | 'all') {
    if (filterType === 'status' || filterType === 'all') {
      this.activeStatusFilter = null;
      this.activeFilter = null;
    }
    if (filterType === 'group' || filterType === 'all') {
      this.activeGroupId = null;
      this.activeGroupName = null;
    }
    
    this.table_config.update(c => ({ ...c, page: 1 }));
    
    // Navigate to clean URL without filters
    const params: any = { 
      page: 1, 
      limit: this.table_config().limit 
    };
    
    if (this.search) {
      params.search = this.search;
    }

    // Keep only non-cleared filters
    if (filterType !== 'status' && filterType !== 'all' && this.activeFilter) {
      // Re-apply status filter if not clearing status
      if (this.activeFilter === 'not_contacted') {
        params.email_contacted = 'false';
      } else if (this.activeFilter === 'contacted_no_response') {
        params.email_contacted = 'true';
        params.customer_answered = 'false';
      } else if (this.activeFilter === 'customer_responded') {
        params.email_contacted = 'true';
        params.customer_answered = 'true';
      }
    }

    if (filterType !== 'group' && filterType !== 'all' && this.activeGroupId) {
      params.group_id = this.activeGroupId;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }

  /**
   * Check if a status is the active filter
   */
  isStatusFilterActive(leadId: string): boolean {
    return this.activeStatusFilter !== null;
  }
}

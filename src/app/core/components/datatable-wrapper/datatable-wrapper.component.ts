import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  HostListener,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { EmptyStageComponent } from '../empty-stage/empty-stage.component';
import {
  IDatatableConfig,
  IColumn,
  IPaginationEvent,
  ISortEvent,
} from './datatable-wrapper.interface';

@Component({
  selector: 'app-datatable-wrapper',
  templateUrl: './datatable-wrapper.component.html',
  styleUrls: ['./datatable-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, SpinnerComponent, EmptyStageComponent],
})
export class DatatableWrapperComponent implements OnInit, OnChanges {
  @Input() config: IDatatableConfig;
  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<IPaginationEvent>();
  @Output() sortChange = new EventEmitter<ISortEvent>();
  @Output() rowClick = new EventEmitter<any>();

  // Internal state
  isMobile: boolean = false;
  currentSortColumn: IColumn | null = null;
  currentSortDirection: 'asc' | 'desc' | '' = '';
  sortCycleState: Map<string, number> = new Map(); // Track sort cycle state per column
  private lastEmittedPage: number = 0;
  private lastEmittedLimit: number = 0;

  // Default configuration
  private defaultConfig: Partial<IDatatableConfig> = {
    externalPaging: true,
    externalSorting: true,
    columnMode: 'force',
    reorderable: false,
    loading: false,
    emptyState: {
      title: 'No result found',
      subtitle: '',
    },
  };

  // Empty state parameters for the empty-stage component
  emptyStateParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };

  constructor() {
    this.checkMobileView();
  }

  ngOnInit(): void {
    this.mergeConfig();
    this.checkMobileView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.mergeConfig();
    }
  }

  /**
   * Merge provided config with default config
   */
  private mergeConfig(): void {
    if (!this.config) {
      this.config = this.defaultConfig as IDatatableConfig;
    } else {
      this.config = {
        ...this.defaultConfig,
        ...this.config,
      } as IDatatableConfig;
    }
  }

  /**
   * Check if the current viewport is mobile
   */
  @HostListener('window:resize')
  onResize(): void {
    this.checkMobileView();
  }

  checkMobileView(): void {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.emptyStateParams = {
        ...this.emptyStateParams,
        width: 40,
        height: 40,
        icon_size: 20,
      };
    } else {
      this.emptyStateParams = {
        ...this.emptyStateParams,
        width: 52,
        height: 52,
        icon_size: 28,
      };
    }
  }

  /**
   * Handle pagination change event from ngx-datatable
   */
  onPageChange(event: any): void {
    const page = event.pageIndex + 1; // ngx-datatable uses 0-based indexing
    const limit = event.pageSize;

    // Only emit if page or limit actually changed
    if (page === this.lastEmittedPage && limit === this.lastEmittedLimit) {
      return;
    }

    this.lastEmittedPage = page;
    this.lastEmittedLimit = limit;

    const paginationEvent: IPaginationEvent = {
      page: page,
      limit: limit,
    };
    this.pageChange.emit(paginationEvent);
  }

  /**
   * Handle sort change event from ngx-datatable
   */
  onSortChange(event: any): void {
    if (!event.column) {
      return;
    }

    const column = event.column;
    const columnProp = column.prop;

    // Get current cycle state for this column (0 = no sort, 1 = asc, 2 = desc)
    const currentState = this.sortCycleState.get(columnProp) || 0;
    const nextState = (currentState + 1) % 3;

    // Update cycle state
    this.sortCycleState.set(columnProp, nextState);

    // Reset other columns
    this.sortCycleState.forEach((_, key) => {
      if (key !== columnProp) {
        this.sortCycleState.set(key, 0);
      }
    });

    // Determine sort direction based on cycle state
    let direction: 'asc' | 'desc' | '' = '';
    if (nextState === 1) {
      direction = 'asc';
    } else if (nextState === 2) {
      direction = 'desc';
    }

    this.currentSortColumn = column;
    this.currentSortDirection = direction;

    const sortEvent: ISortEvent = {
      column: {
        name: column.name,
        prop: column.prop,
        width: column.width,
        sortable: column.sortable,
        canAutoResize: column.canAutoResize,
      },
      direction: direction,
    };

    this.sortChange.emit(sortEvent);
  }

  /**
   * Handle row click event
   */
  onRowClick(event: any): void {
    // Only emit if the click target is not a button or interactive element
    if (event.target && this.isInteractiveElement(event.target)) {
      return;
    }
    this.rowClick.emit(event.data);
  }

  /**
   * Check if the clicked element is interactive (button, link, etc.)
   */
  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveSelectors = ['button', 'a', 'input', 'select', 'textarea'];
    if (interactiveSelectors.includes(element.tagName.toLowerCase())) {
      return true;
    }
    // Check if element has click handler or is inside an interactive element
    if (element.closest('button, a, [role="button"]')) {
      return true;
    }
    return false;
  }

  /**
   * Get the sort direction indicator for a column
   */
  getSortIndicator(column: IColumn): string {
    if (this.currentSortColumn?.prop !== column.prop) {
      return '';
    }
    if (this.currentSortDirection === 'asc') {
      return '↑';
    } else if (this.currentSortDirection === 'desc') {
      return '↓';
    }
    return '';
  }

  /**
   * Check if a column is currently sorted
   */
  isColumnSorted(column: IColumn): boolean {
    return this.currentSortColumn?.prop === column.prop && this.currentSortDirection !== '';
  }

  /**
   * Get the CSS class for the sort indicator
   */
  getSortIndicatorClass(column: IColumn): string {
    if (!this.isColumnSorted(column)) {
      return '';
    }
    if (this.currentSortDirection === 'asc') {
      return this.config?.cssClasses?.sortAscending || 'sort-asc';
    } else {
      return this.config?.cssClasses?.sortDescending || 'sort-desc';
    }
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByIndex(index: number): number {
    return index;
  }

  /**
   * Handle next page
   */
  onNextPage(): void {
    if (this.config?.hasNext) {
      this.onPageChange({ pageIndex: (this.config.page || 1), pageSize: this.config.limit });
    }
  }

  /**
   * Handle previous page
   */
  onPrevPage(): void {
    if ((this.config?.page || 1) > 1) {
      this.onPageChange({ pageIndex: (this.config.page || 1) - 2, pageSize: this.config.limit });
    }
  }
}

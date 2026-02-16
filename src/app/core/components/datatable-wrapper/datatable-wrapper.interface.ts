/**
 * Configuration interface for the datatable wrapper component
 * Provides a consistent interface for pages using ngx-datatable
 */
export interface IDatatableConfig {
  // Data
  rows: any[];
  columns: IColumn[];

  // Pagination
  externalPaging: boolean;
  externalSorting: boolean;
  page: number;
  limit: number;
  totalResults: number;
  hasNext?: boolean;

  // UI
  loading: boolean;
  emptyState: {
    title: string;
    subtitle: string;
  };

  // Features
  columnMode: 'force' | 'standard';
  selectionType?: string;
  reorderable: boolean;

  // Styling
  cssClasses?: {
    sortAscending?: string;
    sortDescending?: string;
  };
}

/**
 * Column definition interface
 * Defines the structure and properties of a table column
 */
export interface IColumn {
  name: string;
  prop: string;
  width?: number;
  sortable?: boolean;
  canAutoResize?: boolean;
}

/**
 * Pagination event interface
 * Emitted when pagination changes (page or limit)
 */
export interface IPaginationEvent {
  page: number;
  limit: number;
}

/**
 * Sort event interface
 * Emitted when column sorting changes
 */
export interface ISortEvent {
  column: IColumn;
  direction: 'asc' | 'desc' | '';
}

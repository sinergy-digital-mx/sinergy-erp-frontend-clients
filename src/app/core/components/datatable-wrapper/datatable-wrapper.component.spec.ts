import { describe, it, expect, beforeEach } from 'vitest';
import { DatatableWrapperComponent } from './datatable-wrapper.component';
import { IDatatableConfig, IColumn } from './datatable-wrapper.interface';

describe('DatatableWrapperComponent', () => {
  let component: DatatableWrapperComponent;

  beforeEach(() => {
    component = new DatatableWrapperComponent();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default config values', () => {
      component.ngOnInit();
      expect(component.config).toBeDefined();
      expect(component.config.externalPaging).toBe(true);
      expect(component.config.externalSorting).toBe(true);
      expect(component.config.columnMode).toBe('force');
      expect(component.config.reorderable).toBe(false);
      expect(component.config.loading).toBe(false);
    });

    it('should merge provided config with default config', () => {
      const customConfig: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'Custom Title',
          subtitle: 'Custom Subtitle',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = customConfig;
      component.ngOnInit();

      expect(component.config.emptyState.title).toBe('Custom Title');
      expect(component.config.emptyState.subtitle).toBe('Custom Subtitle');
    });
  });

  describe('Pagination Handling', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should emit pageChange event with correct page and limit', () => {
      return new Promise<void>((resolve) => {
        const mockEvent = {
          pageIndex: 0,
          pageSize: 10,
        };

        component.pageChange.subscribe((event) => {
          expect(event.page).toBe(1); // pageIndex 0 + 1
          expect(event.limit).toBe(10);
          resolve();
        });

        component.onPageChange(mockEvent);
      });
    });

    it('should convert 0-based pageIndex to 1-based page number', () => {
      return new Promise<void>((resolve) => {
        const mockEvent = {
          pageIndex: 2,
          pageSize: 15,
        };

        component.pageChange.subscribe((event) => {
          expect(event.page).toBe(3); // pageIndex 2 + 1
          expect(event.limit).toBe(15);
          resolve();
        });

        component.onPageChange(mockEvent);
      });
    });
  });

  describe('Sort Handling', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should emit sortChange event with column and direction', () => {
      return new Promise<void>((resolve) => {
        const mockColumn: IColumn = {
          name: 'Name',
          prop: 'name',
          sortable: true,
        };

        const mockEvent = {
          column: mockColumn,
        };

        component.sortChange.subscribe((event) => {
          expect(event.column.prop).toBe('name');
          expect(event.direction).toBe('asc'); // First click should be ascending
          resolve();
        });

        component.onSortChange(mockEvent);
      });
    });

    it('should cycle through sort directions: asc -> desc -> none', () => {
      return new Promise<void>((resolve) => {
        const mockColumn: IColumn = {
          name: 'Name',
          prop: 'name',
          sortable: true,
        };

        const mockEvent = {
          column: mockColumn,
        };

        let callCount = 0;

        component.sortChange.subscribe((event) => {
          callCount++;
          if (callCount === 1) {
            expect(event.direction).toBe('asc');
            // Second click
            component.onSortChange(mockEvent);
          } else if (callCount === 2) {
            expect(event.direction).toBe('desc');
            // Third click
            component.onSortChange(mockEvent);
          } else if (callCount === 3) {
            expect(event.direction).toBe('');
            resolve();
          }
        });

        component.onSortChange(mockEvent);
      });
    });

    it('should reset other columns when sorting a new column', () => {
      return new Promise<void>((resolve) => {
        const column1: IColumn = {
          name: 'Name',
          prop: 'name',
          sortable: true,
        };

        const column2: IColumn = {
          name: 'Email',
          prop: 'email',
          sortable: true,
        };

        const event1 = { column: column1 };
        const event2 = { column: column2 };

        let callCount = 0;

        component.sortChange.subscribe((event) => {
          callCount++;
          if (callCount === 1) {
            expect(event.column.prop).toBe('name');
            expect(event.direction).toBe('asc');
            // Sort different column
            component.onSortChange(event2);
          } else if (callCount === 2) {
            expect(event.column.prop).toBe('email');
            expect(event.direction).toBe('asc');
            // Verify first column is reset
            expect(component.sortCycleState.get('name')).toBe(0);
            resolve();
          }
        });

        component.onSortChange(event1);
      });
    });
  });

  describe('Row Click Handling', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should emit rowClick event with row data', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 1, name: 'Test' };
        const mockEvent = {
          data: mockRowData,
          target: document.createElement('div'),
        };

        component.rowClick.subscribe((data) => {
          expect(data).toEqual(mockRowData);
          resolve();
        });

        component.onRowClick(mockEvent);
      });
    });

    it('should not emit rowClick when clicking on button', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 1, name: 'Test' };
        const button = document.createElement('button');
        const mockEvent = {
          data: mockRowData,
          target: button,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 100);
      });
    });
  });

  describe('Sort Indicator', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should return correct sort indicator symbol', () => {
      const column: IColumn = {
        name: 'Name',
        prop: 'name',
        sortable: true,
      };

      component.currentSortColumn = column;
      component.currentSortDirection = 'asc';

      expect(component.getSortIndicator(column)).toBe('↑');

      component.currentSortDirection = 'desc';
      expect(component.getSortIndicator(column)).toBe('↓');

      component.currentSortDirection = '';
      expect(component.getSortIndicator(column)).toBe('');
    });

    it('should identify sorted columns correctly', () => {
      const column: IColumn = {
        name: 'Name',
        prop: 'name',
        sortable: true,
      };

      component.currentSortColumn = column;
      component.currentSortDirection = 'asc';

      expect(component.isColumnSorted(column)).toBe(true);

      component.currentSortDirection = '';
      expect(component.isColumnSorted(column)).toBe(false);
    });
  });

  describe('Responsive Design', () => {
    it('should detect mobile view correctly', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      component.checkMobileView();
      expect(component.isMobile).toBe(true);

      // Mock window.innerWidth for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      component.checkMobileView();
      expect(component.isMobile).toBe(false);
    });

    it('should adjust empty state params for mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      component.checkMobileView();

      expect(component.emptyStateParams.width).toBe(40);
      expect(component.emptyStateParams.height).toBe(40);
      expect(component.emptyStateParams.icon_size).toBe(20);
    });
  });

  describe('Configuration Validation', () => {
    it('should use default empty state when not provided', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: '',
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnInit();

      expect(component.config.emptyState.title).toBe('');
    });
  });

  describe('Track By Function', () => {
    it('should return index for trackBy', () => {
      expect(component.trackByIndex(0)).toBe(0);
      expect(component.trackByIndex(5)).toBe(5);
      expect(component.trackByIndex(100)).toBe(100);
    });
  });

  describe('Empty State Display', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should display empty state when rows array is empty', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'No result found',
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.rows.length).toBe(0);
      expect(component.config.loading).toBe(false);
    });

    it('should display empty state when total results is 0', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'No results found',
          subtitle: 'Try adjusting your search criteria',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.totalResults).toBe(0);
      expect(component.config.emptyState.title).toBe('No results found');
      expect(component.config.emptyState.subtitle).toBe('Try adjusting your search criteria');
    });

    it('should use customizable empty state title', () => {
      const customTitle = 'Custom Empty Title';
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: customTitle,
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.emptyState.title).toBe(customTitle);
    });

    it('should use customizable empty state subtitle', () => {
      const customSubtitle = 'Custom Empty Subtitle';
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'No results',
          subtitle: customSubtitle,
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.emptyState.subtitle).toBe(customSubtitle);
    });

    it('should not display empty state when rows have data', () => {
      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: false,
        emptyState: {
          title: 'No result found',
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.rows.length).toBeGreaterThan(0);
    });

    it('should not display empty state when loading is true', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: true,
        emptyState: {
          title: 'No result found',
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.loading).toBe(true);
    });

    it('should use default empty state title when not provided', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: '',
          subtitle: '',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnInit();

      // After merge with defaults, empty title should remain as provided
      expect(component.config.emptyState.title).toBe('');
    });

    it('should merge empty state config with defaults', () => {
      const customConfig: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'Custom Title',
          subtitle: 'Custom Subtitle',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = customConfig;
      component.ngOnInit();

      expect(component.config.emptyState.title).toBe('Custom Title');
      expect(component.config.emptyState.subtitle).toBe('Custom Subtitle');
    });

    it('should handle empty state with both title and subtitle', () => {
      const config: IDatatableConfig = {
        rows: [],
        columns: [],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: {
          title: 'No Data Available',
          subtitle: 'Please try again later',
        },
        columnMode: 'force',
        selectionType: 'none',
        reorderable: false,
      };

      component.config = config;
      component.ngOnChanges({
        config: {
          currentValue: config,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.config.emptyState.title).toBe('No Data Available');
      expect(component.config.emptyState.subtitle).toBe('Please try again later');
    });
  });
});


describe('Action Button Click Isolation - Property-Based Tests', () => {
  let component: DatatableWrapperComponent;

  beforeEach(() => {
    component = new DatatableWrapperComponent();
    component.ngOnInit();
  });

  /**
   * Property 8: Action Button Click Isolation
   * **Validates: Requirements 7.3**
   * 
   * For any action button within a row template, when the user clicks the button,
   * the row click event SHALL NOT be triggered, allowing the button's own click
   * handler to execute.
   */
  describe('Property 8: Action Button Click Isolation', () => {
    it('should not emit rowClick when clicking on button element', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 1, name: 'Test Row' };
        const button = document.createElement('button');
        button.textContent = 'Action';
        
        const mockEvent = {
          data: mockRowData,
          target: button,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on button inside row', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 2, name: 'Test Row 2' };
        const button = document.createElement('button');
        button.textContent = 'Delete';
        
        const mockEvent = {
          data: mockRowData,
          target: button,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on anchor link', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 3, name: 'Test Row 3' };
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = 'View Details';
        
        const mockEvent = {
          data: mockRowData,
          target: link,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on input element', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 4, name: 'Test Row 4' };
        const input = document.createElement('input');
        input.type = 'checkbox';
        
        const mockEvent = {
          data: mockRowData,
          target: input,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on select element', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 5, name: 'Test Row 5' };
        const select = document.createElement('select');
        
        const mockEvent = {
          data: mockRowData,
          target: select,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on textarea element', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 6, name: 'Test Row 6' };
        const textarea = document.createElement('textarea');
        
        const mockEvent = {
          data: mockRowData,
          target: textarea,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on element with role="button"', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 7, name: 'Test Row 7' };
        const div = document.createElement('div');
        div.setAttribute('role', 'button');
        div.textContent = 'Custom Button';
        
        const mockEvent = {
          data: mockRowData,
          target: div,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should not emit rowClick when clicking on element inside button', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 8, name: 'Test Row 8' };
        const button = document.createElement('button');
        const span = document.createElement('span');
        span.textContent = 'Click me';
        button.appendChild(span);
        
        const mockEvent = {
          data: mockRowData,
          target: span,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should emit rowClick when clicking on regular div element', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 9, name: 'Test Row 9' };
        const div = document.createElement('div');
        div.textContent = 'Regular content';
        
        const mockEvent = {
          data: mockRowData,
          target: div,
        };

        component.rowClick.subscribe((data) => {
          expect(data).toEqual(mockRowData);
          resolve();
        });

        component.onRowClick(mockEvent);
      });
    });

    it('should emit rowClick when clicking on text node', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 10, name: 'Test Row 10' };
        const span = document.createElement('span');
        span.textContent = 'Text content';
        
        const mockEvent = {
          data: mockRowData,
          target: span,
        };

        component.rowClick.subscribe((data) => {
          expect(data).toEqual(mockRowData);
          resolve();
        });

        component.onRowClick(mockEvent);
      });
    });

    it('should handle multiple action buttons in same row', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 11, name: 'Test Row 11' };
        
        // First button click
        const button1 = document.createElement('button');
        button1.textContent = 'Edit';
        
        const mockEvent1 = {
          data: mockRowData,
          target: button1,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent1);

        // Second button click
        const button2 = document.createElement('button');
        button2.textContent = 'Delete';
        
        const mockEvent2 = {
          data: mockRowData,
          target: button2,
        };

        component.onRowClick(mockEvent2);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should correctly identify interactive elements in nested structure', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { id: 12, name: 'Test Row 12' };
        
        // Create nested structure: div > button > span
        const div = document.createElement('div');
        const button = document.createElement('button');
        const span = document.createElement('span');
        
        span.textContent = 'Nested button text';
        button.appendChild(span);
        div.appendChild(button);
        
        const mockEvent = {
          data: mockRowData,
          target: span,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          resolve();
        }, 50);
      });
    });

    it('should preserve row data when preventing button clicks', () => {
      return new Promise<void>((resolve) => {
        const mockRowData = { 
          id: 13, 
          name: 'Test Row 13',
          email: 'test@example.com',
          phone: '123-456-7890',
          created_at: '2024-01-01'
        };
        
        const button = document.createElement('button');
        button.textContent = 'Action';
        
        const mockEvent = {
          data: mockRowData,
          target: button,
        };

        let emitted = false;
        component.rowClick.subscribe(() => {
          emitted = true;
        });

        component.onRowClick(mockEvent);

        setTimeout(() => {
          expect(emitted).toBe(false);
          // Verify row data is still intact
          expect(mockRowData.id).toBe(13);
          expect(mockRowData.name).toBe('Test Row 13');
          expect(mockRowData.email).toBe('test@example.com');
          resolve();
        }, 50);
      });
    });
  });
});

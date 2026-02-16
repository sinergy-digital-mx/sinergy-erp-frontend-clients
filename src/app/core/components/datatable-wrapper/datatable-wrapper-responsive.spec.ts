import { describe, it, expect, beforeEach } from 'vitest';
import { DatatableWrapperComponent } from './datatable-wrapper.component';
import { IDatatableConfig, IColumn } from './datatable-wrapper.interface';

/**
 * Property-Based Tests for Responsive Design
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4
 */
describe('DatatableWrapperComponent - Responsive Design', () => {
  let component: DatatableWrapperComponent;

  beforeEach(() => {
    component = new DatatableWrapperComponent();
    component.ngOnInit();
  });

  describe('Property 9: Responsive Layout Adaptation', () => {
    /**
     * Property: For any viewport width change, the ngx-datatable SHALL adapt its layout 
     * appropriately, showing all columns on desktop and using a mobile-friendly layout 
     * on smaller screens.
     * 
     * Validates: Requirements 5.1, 5.2, 5.3, 5.4
     */

    it('should detect mobile view when viewport width is less than 768px', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(true);
    });

    it('should detect mobile view when viewport width is 768px', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      // Act
      component.checkMobileView();

      // Assert - 768px is considered mobile (<=)
      expect(component.isMobile).toBe(true);
    });

    it('should detect desktop view when viewport width is greater than 768px', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(false);
    });

    it('should adjust empty state params for mobile view', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(true);
      expect(component.emptyStateParams.width).toBe(40);
      expect(component.emptyStateParams.height).toBe(40);
      expect(component.emptyStateParams.icon_size).toBe(20);
    });

    it('should adjust empty state params for desktop view', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(false);
      expect(component.emptyStateParams.width).toBe(52);
      expect(component.emptyStateParams.height).toBe(52);
      expect(component.emptyStateParams.icon_size).toBe(28);
    });

    it('should respond to window resize events', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      component.checkMobileView();
      expect(component.isMobile).toBe(false);

      // Act - Simulate resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      component.onResize();

      // Assert
      expect(component.isMobile).toBe(true);
    });

    it('should handle multiple resize events', () => {
      // Arrange
      const viewportWidths = [1200, 500, 769, 400, 1024, 600];
      const expectedMobileStates = [false, true, false, true, false, true];

      // Act & Assert
      viewportWidths.forEach((width, index) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        component.onResize();
        expect(component.isMobile).toBe(expectedMobileStates[index]);
      });
    });

    it('should maintain responsive state through config changes', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      component.checkMobileView();
      expect(component.isMobile).toBe(true);

      // Act - Change config
      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: false,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
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

      // Assert - Mobile state should be maintained
      expect(component.isMobile).toBe(true);
    });

    it('should handle edge case: viewport width exactly at 768px boundary', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      // Act
      component.checkMobileView();

      // Assert - 768px should be considered mobile (<=)
      expect(component.isMobile).toBe(true);
    });

    it('should handle edge case: viewport width just below 768px', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      // Act
      component.checkMobileView();

      // Assert - 767px should be considered mobile
      expect(component.isMobile).toBe(true);
    });

    it('should handle very small mobile viewports', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(true);
      expect(component.emptyStateParams.width).toBe(40);
      expect(component.emptyStateParams.height).toBe(40);
    });

    it('should handle very large desktop viewports', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 2560,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(false);
      expect(component.emptyStateParams.width).toBe(52);
      expect(component.emptyStateParams.height).toBe(52);
    });

    it('should initialize with correct mobile state on component creation', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      // Act
      const newComponent = new DatatableWrapperComponent();

      // Assert
      expect(newComponent.isMobile).toBe(true);
    });

    it('should initialize with correct desktop state on component creation', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      // Act
      const newComponent = new DatatableWrapperComponent();

      // Assert
      expect(newComponent.isMobile).toBe(false);
    });

    it('should preserve table data during responsive layout changes', () => {
      // Arrange
      const rows = [
        { id: 1, name: 'Test 1', email: 'test1@example.com' },
        { id: 2, name: 'Test 2', email: 'test2@example.com' },
        { id: 3, name: 'Test 3', email: 'test3@example.com' },
      ];

      const config: IDatatableConfig = {
        rows: rows,
        columns: [
          { name: 'Name', prop: 'name' },
          { name: 'Email', prop: 'email' },
        ],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 3,
        loading: false,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;

      // Act - Resize from desktop to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      component.onResize();

      // Assert - Data should be preserved
      expect(component.config.rows.length).toBe(3);
      expect(component.config.rows[0].name).toBe('Test 1');
      expect(component.config.rows[1].email).toBe('test2@example.com');
      expect(component.isMobile).toBe(true);
    });

    it('should handle responsive changes with pagination', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Test ${i}` })),
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 2,
        limit: 10,
        totalResults: 50,
        loading: false,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;

      // Act - Resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      component.onResize();

      // Assert - Pagination state should be preserved
      expect(component.config.page).toBe(2);
      expect(component.config.limit).toBe(10);
      expect(component.config.totalResults).toBe(50);
      expect(component.isMobile).toBe(true);
    });

    it('should handle responsive changes with sorting', () => {
      // Arrange
      const column: IColumn = {
        name: 'Name',
        prop: 'name',
        sortable: true,
      };

      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [column],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: false,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;
      component.currentSortColumn = column;
      component.currentSortDirection = 'asc';

      // Act - Resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      component.onResize();

      // Assert - Sort state should be preserved
      expect(component.currentSortColumn).toBe(column);
      expect(component.currentSortDirection).toBe('asc');
      expect(component.isMobile).toBe(true);
    });

    it('should handle rapid viewport changes', () => {
      // Arrange
      const viewportWidths = [1200, 500, 1200, 500, 1200, 500];

      // Act & Assert
      viewportWidths.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        component.onResize();
        const expectedMobile = width < 768;
        expect(component.isMobile).toBe(expectedMobile);
      });
    });

    it('should maintain empty state params consistency across viewport changes', () => {
      // Arrange
      const mobileWidth = 500;
      const desktopWidth = 1200;

      // Act & Assert - Mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: mobileWidth,
      });
      component.checkMobileView();
      const mobileParams = { ...component.emptyStateParams };

      // Act & Assert - Desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: desktopWidth,
      });
      component.checkMobileView();
      const desktopParams = { ...component.emptyStateParams };

      // Act & Assert - Back to Mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: mobileWidth,
      });
      component.checkMobileView();

      // Assert - Mobile params should be consistent
      expect(component.emptyStateParams.width).toBe(mobileParams.width);
      expect(component.emptyStateParams.height).toBe(mobileParams.height);
      expect(component.emptyStateParams.icon_size).toBe(mobileParams.icon_size);
    });
  });

  describe('Responsive Design Edge Cases', () => {
    it('should handle zero viewport width gracefully', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 0,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(true);
    });

    it('should handle negative viewport width gracefully', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: -100,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(true);
    });

    it('should handle very large viewport width', () => {
      // Arrange
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 10000,
      });

      // Act
      component.checkMobileView();

      // Assert
      expect(component.isMobile).toBe(false);
    });
  });
});

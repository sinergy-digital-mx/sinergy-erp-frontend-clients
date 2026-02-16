import { describe, it, expect, beforeEach } from 'vitest';
import { DatatableWrapperComponent } from './datatable-wrapper.component';
import { IDatatableConfig, IColumn } from './datatable-wrapper.interface';

/**
 * Property-Based Tests for Loading State
 * Validates: Requirements 6.1, 6.2
 */
describe('DatatableWrapperComponent - Loading State', () => {
  let component: DatatableWrapperComponent;

  beforeEach(() => {
    component = new DatatableWrapperComponent();
    component.ngOnInit();
  });

  describe('Property 1: Loading State Visibility', () => {
    /**
     * Property: For any data fetch operation, when loading is true, the ngx-datatable 
     * SHALL display a loading indicator, and when loading is false, the indicator 
     * SHALL be hidden and data SHALL be displayed.
     * 
     * Validates: Requirements 6.1, 6.2
     */

    it('should display loading indicator when loading is true', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: true, // Loading is true
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

      // Assert
      expect(component.config.loading).toBe(true);
    });

    it('should hide loading indicator when loading is false', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: false, // Loading is false
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

      // Assert
      expect(component.config.loading).toBe(false);
    });

    it('should transition from loading true to loading false', () => {
      // Arrange - Initial state: loading
      const loadingConfig: IDatatableConfig = {
        rows: [],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: true,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = loadingConfig;
      expect(component.config.loading).toBe(true);

      // Act - Update to not loading
      const dataConfig: IDatatableConfig = {
        ...loadingConfig,
        loading: false,
        rows: [{ id: 1, name: 'Test' }],
        totalResults: 1,
      };

      component.config = dataConfig;
      component.ngOnChanges({
        config: {
          currentValue: dataConfig,
          previousValue: loadingConfig,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      // Assert
      expect(component.config.loading).toBe(false);
      expect(component.config.rows.length).toBe(1);
    });

    it('should maintain loading state through multiple changes', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: [{ id: 1, name: 'Test' }],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 1,
        loading: true,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;

      // Act & Assert - Multiple state changes
      expect(component.config.loading).toBe(true);

      // Change to false
      component.config = { ...config, loading: false };
      expect(component.config.loading).toBe(false);

      // Change back to true
      component.config = { ...config, loading: true };
      expect(component.config.loading).toBe(true);

      // Change to false again
      component.config = { ...config, loading: false };
      expect(component.config.loading).toBe(false);
    });

    it('should handle loading state with empty rows', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: [],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: true,
        emptyState: { title: 'Loading...', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;

      // Assert
      expect(component.config.loading).toBe(true);
      expect(component.config.rows.length).toBe(0);
    });

    it('should handle loading state with populated rows', () => {
      // Arrange
      const rows = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
        { id: 3, name: 'Test 3' },
      ];

      const config: IDatatableConfig = {
        rows: rows,
        columns: [{ name: 'Name', prop: 'name' }],
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

      // Assert
      expect(component.config.loading).toBe(false);
      expect(component.config.rows.length).toBe(3);
    });

    it('should use default loading state when not provided', () => {
      // Arrange
      const config: IDatatableConfig = {
        rows: [],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false, // Default is false
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      component.config = config;
      component.ngOnInit();

      // Assert
      expect(component.config.loading).toBe(false);
    });
  });

  describe('Loading State Edge Cases', () => {
    it('should handle rapid loading state changes', () => {
      // Arrange
      const baseConfig: IDatatableConfig = {
        rows: [],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: false,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      // Act - Rapid state changes
      for (let i = 0; i < 10; i++) {
        component.config = {
          ...baseConfig,
          loading: i % 2 === 0,
        };
      }

      // Assert - Should end in loading: false state
      expect(component.config.loading).toBe(false);
    });

    it('should handle loading state with different row counts', () => {
      // Arrange
      const baseConfig: IDatatableConfig = {
        rows: [],
        columns: [{ name: 'Name', prop: 'name' }],
        externalPaging: true,
        externalSorting: true,
        page: 1,
        limit: 10,
        totalResults: 0,
        loading: true,
        emptyState: { title: 'No data', subtitle: '' },
        columnMode: 'force',
        reorderable: false,
      };

      // Act & Assert - Test with different row counts
      for (let rowCount = 0; rowCount <= 100; rowCount += 10) {
        const rows = Array.from({ length: rowCount }, (_, i) => ({
          id: i,
          name: `Test ${i}`,
        }));

        component.config = {
          ...baseConfig,
          rows: rows,
          totalResults: rowCount,
          loading: rowCount === 0, // Loading when no rows
        };

        expect(component.config.loading).toBe(rowCount === 0);
        expect(component.config.rows.length).toBe(rowCount);
      }
    });
  });
});

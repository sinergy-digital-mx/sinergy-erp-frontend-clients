import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterIndicatorComponent } from './filter-indicator.component';
import { ButtonModule } from 'primeng/button';

describe('FilterIndicatorComponent', () => {
  let component: FilterIndicatorComponent;
  let fixture: ComponentFixture<FilterIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterIndicatorComponent, ButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterIndicatorComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not show filter indicator when no filters are active', () => {
      component.activeStatusFilter = null;
      component.activeGroupId = null;
      component.activeSearchTerm = null;
      fixture.detectChanges();

      const indicator = fixture.nativeElement.querySelector('.filter-indicator');
      expect(indicator).toBeFalsy();
    });
  });

  describe('Active Filters Display', () => {
    it('should show status filter', () => {
      component.activeStatusFilter = 'active';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.activeFilters.length).toBe(1);
      expect(component.activeFilters[0].type).toBe('status');
      expect(component.activeFilters[0].label).toContain('Estado');
    });

    it('should show group filter', () => {
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.activeFilters.length).toBe(1);
      expect(component.activeFilters[0].type).toBe('group');
      expect(component.activeFilters[0].label).toContain('Enterprise');
    });

    it('should show search filter', () => {
      component.activeSearchTerm = 'test search';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.activeFilters.length).toBe(1);
      expect(component.activeFilters[0].type).toBe('search');
      expect(component.activeFilters[0].label).toContain('test search');
    });

    it('should show multiple filters', () => {
      component.activeStatusFilter = 'active';
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise';
      component.activeSearchTerm = 'test';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.activeFilters.length).toBe(3);
    });

    it('should display filter indicator when filters are active', () => {
      component.activeStatusFilter = 'active';
      component.ngOnChanges();
      fixture.detectChanges();

      const indicator = fixture.nativeElement.querySelector('.filter-indicator');
      expect(indicator).toBeTruthy();
    });
  });

  describe('Filter Clearing', () => {
    it('should emit clear event for specific filter', (done) => {
      component.filterClear.subscribe(filterType => {
        expect(filterType).toBe('status');
        done();
      });

      component.clearFilter('status');
    });

    it('should emit clear event for all filters', (done) => {
      component.filterClear.subscribe(filterType => {
        expect(filterType).toBe('all');
        done();
      });

      component.clearAllFilters();
    });

    it('should have correct icons for filter types', () => {
      expect(component.getFilterIcon('status')).toBe('pi-filter');
      expect(component.getFilterIcon('group')).toBe('pi-tag');
      expect(component.getFilterIcon('search')).toBe('pi-search');
    });
  });

  describe('hasActiveFilters', () => {
    it('should return true when filters are active', () => {
      component.activeStatusFilter = 'active';
      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(true);
    });

    it('should return false when no filters are active', () => {
      component.activeStatusFilter = null;
      component.activeGroupId = null;
      component.activeSearchTerm = null;
      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(false);
    });
  });
});

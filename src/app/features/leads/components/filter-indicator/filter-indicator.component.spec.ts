import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterIndicatorComponent } from './filter-indicator.component';
import { CommunicationStatus } from '../../models/lead-group.model';
import { ButtonModule } from 'primeng/button';
import { vi } from 'vitest';

describe('FilterIndicatorComponent', () => {
  let component: FilterIndicatorComponent;
  let fixture: ComponentFixture<FilterIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterIndicatorComponent, ButtonModule],
    }).compileComponents();

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(FilterIndicatorComponent);
    component = fixture.componentInstance;
  });

  describe('Filter Display', () => {
    it('should not display when no filters are active', () => {
      component.activeStatusFilter = null;
      component.activeGroupId = null;

      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(false);
    });

    it('should display when status filter is active', () => {
      component.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;

      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(true);
    });

    it('should display when group filter is active', () => {
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise Clients';

      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(true);
    });

    it('should display when both filters are active', () => {
      component.activeStatusFilter = CommunicationStatus.CONTACTED;
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise Clients';

      component.ngOnChanges();

      expect(component.hasActiveFilters()).toBe(true);
      expect(component.activeFilters.length).toBe(2);
    });
  });

  describe('Status Filter Display', () => {
    it('should display NOT_CONTACTED status filter label', () => {
      component.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;

      component.ngOnChanges();

      expect(component.activeFilters[0].label).toBe('No Contactado');
    });

    it('should display CONTACTED status filter label', () => {
      component.activeStatusFilter = CommunicationStatus.CONTACTED;

      component.ngOnChanges();

      expect(component.activeFilters[0].label).toBe('Contactado');
    });

    it('should display RESPONDED status filter label', () => {
      component.activeStatusFilter = CommunicationStatus.RESPONDED;

      component.ngOnChanges();

      expect(component.activeFilters[0].label).toBe('Respondido');
    });
  });

  describe('Group Filter Display', () => {
    it('should display group filter with group name', () => {
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise Clients';

      component.ngOnChanges();

      expect(component.activeFilters[0].label).toContain('Grupo: Enterprise Clients');
    });

    it('should not display group filter when only groupId is set without name', () => {
      component.activeGroupId = 'group-1';
      component.activeGroupName = null;

      component.ngOnChanges();

      expect(component.activeFilters.length).toBe(0);
    });
  });

  describe('Filter Clearing', () => {
    it('should emit filterClear event with "status" when clearing status filter', () => {
      const emitSpy = vi.spyOn(component.filterClear, 'emit');

      component.clearFilter('status');

      expect(emitSpy).toHaveBeenCalledWith('status');
    });

    it('should emit filterClear event with "group" when clearing group filter', () => {
      const emitSpy = vi.spyOn(component.filterClear, 'emit');

      component.clearFilter('group');

      expect(emitSpy).toHaveBeenCalledWith('group');
    });

    it('should emit filterClear event with "all" when clearing all filters', () => {
      const emitSpy = vi.spyOn(component.filterClear, 'emit');

      component.clearAllFilters();

      expect(emitSpy).toHaveBeenCalledWith('all');
    });
  });

  describe('Filter Icons', () => {
    it('should return correct icon for status filter', () => {
      const icon = component.getFilterIcon('status');

      expect(icon).toBe('pi-filter');
    });

    it('should return correct icon for group filter', () => {
      const icon = component.getFilterIcon('group');

      expect(icon).toBe('pi-tag');
    });
  });

  describe('Combined Filters', () => {
    it('should display both status and group filters when both are active', () => {
      component.activeStatusFilter = CommunicationStatus.CONTACTED;
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Enterprise Clients';

      component.ngOnChanges();

      expect(component.activeFilters.length).toBe(2);
      expect(component.activeFilters[0].type).toBe('status');
      expect(component.activeFilters[1].type).toBe('group');
    });

    it('should maintain filter order: status first, then group', () => {
      component.activeStatusFilter = CommunicationStatus.RESPONDED;
      component.activeGroupId = 'group-2';
      component.activeGroupName = 'SMB Clients';

      component.ngOnChanges();

      expect(component.activeFilters[0].type).toBe('status');
      expect(component.activeFilters[1].type).toBe('group');
    });
  });

  describe('Filter Updates', () => {
    it('should update filters when activeStatusFilter changes', () => {
      component.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;
      component.ngOnChanges();

      expect(component.activeFilters.length).toBe(1);

      component.activeStatusFilter = CommunicationStatus.CONTACTED;
      component.ngOnChanges();

      expect(component.activeFilters[0].label).toBe('Contactado');
    });

    it('should update filters when activeGroupId changes', () => {
      component.activeGroupId = 'group-1';
      component.activeGroupName = 'Group 1';
      component.ngOnChanges();

      expect(component.activeFilters.length).toBe(1);

      component.activeGroupId = 'group-2';
      component.activeGroupName = 'Group 2';
      component.ngOnChanges();

      expect(component.activeFilters[0].label).toContain('Group 2');
    });
  });
});

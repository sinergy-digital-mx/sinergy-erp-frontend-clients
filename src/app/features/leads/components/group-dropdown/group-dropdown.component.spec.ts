import '@angular/compiler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GroupDropdownComponent } from './group-dropdown.component';
import { GroupFetchService } from '../../services/group-fetch.service';
import { of, throwError, delay } from 'rxjs';
import { LeadGroup } from '../../models/lead-group.model';

describe('GroupDropdownComponent', () => {
  let component: GroupDropdownComponent;
  let groupFetchService: GroupFetchService;

  const mockGroups: LeadGroup[] = [
    { id: '1', name: 'Sales' },
    { id: '2', name: 'Marketing' },
    { id: '3', name: 'Support' },
  ];

  beforeEach(() => {
    groupFetchService = {
      fetchGroups: vi.fn().mockReturnValue(of(mockGroups)),
    } as any;

    component = new GroupDropdownComponent(groupFetchService);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with null selectedGroupId', () => {
      expect(component.selectedGroupId()).toBeNull();
    });

    it('should initialize with empty groups', () => {
      expect(component.groups()).toEqual([]);
    });

    it('should initialize with no loading state', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('should initialize with no error', () => {
      expect(component.error()).toBeNull();
    });
  });

  describe('Group Loading', () => {
    it('should load groups on init', async () => {
      component.ngOnInit();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(groupFetchService.fetchGroups).toHaveBeenCalled();
      expect(component.groups()).toEqual(mockGroups);
    });

    it('should set selectedGroupId to currentGroupId on init', () => {
      component.currentGroupId = '1';
      component.ngOnInit();

      expect(component.selectedGroupId()).toBe('1');
    });

    it('should display loading state while fetching groups', () => {
      // Create a mock that returns a delayed observable
      vi.mocked(groupFetchService.fetchGroups).mockReturnValueOnce(
        of(mockGroups).pipe(delay(100))
      );

      component.loadGroups();

      // The loading state should be true immediately after calling loadGroups
      expect(component.isLoading()).toBe(true);
    });

    it('should populate groups after successful fetch', async () => {
      component.loadGroups();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(component.groups()).toEqual(mockGroups);
      expect(component.isLoading()).toBe(false);
      expect(component.error()).toBeNull();
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Network error');
      vi.mocked(groupFetchService.fetchGroups).mockReturnValueOnce(
        throwError(() => error)
      );

      component.loadGroups();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(component.isLoading()).toBe(false);
      expect(component.error()).toBeTruthy();
    });

    it('should clear error on retry', async () => {
      vi.mocked(groupFetchService.fetchGroups).mockReturnValueOnce(
        of(mockGroups)
      );

      component.error.set('Previous error');
      component.retryLoadGroups();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(component.error()).toBeNull();
    });
  });

  describe('Group Selection', () => {
    beforeEach(() => {
      component.groups.set(mockGroups);
    });

    it('should emit groupSelected event when group is selected', () => {
      const emitSpy = vi.spyOn(component.groupSelected, 'emit');

      component.selectGroup('1');

      expect(emitSpy).toHaveBeenCalledWith('1');
    });

    it('should update selectedGroupId when group is selected', () => {
      component.selectGroup('2');

      expect(component.selectedGroupId()).toBe('2');
    });

    it('should emit null when clear option is selected', () => {
      const emitSpy = vi.spyOn(component.groupSelected, 'emit');

      component.selectGroup(null);

      expect(emitSpy).toHaveBeenCalledWith(null);
      expect(component.selectedGroupId()).toBeNull();
    });
  });

  describe('Form Modification Detection', () => {
    beforeEach(() => {
      component.currentGroupId = '1';
      component.groups.set(mockGroups);
    });

    it('should mark form as modified when selection differs from current', () => {
      component.selectGroup('2');

      expect(component.isModified()).toBe(true);
    });

    it('should not mark form as modified when selection equals current', () => {
      component.selectGroup('1');

      expect(component.isModified()).toBe(false);
    });

    it('should mark form as modified when clearing a selected group', () => {
      component.selectGroup(null);

      expect(component.isModified()).toBe(true);
    });
  });

  describe('Display Names', () => {
    beforeEach(() => {
      component.groups.set(mockGroups);
    });

    it('should return correct current group name', () => {
      component.currentGroupId = '1';

      expect(component.getCurrentGroupName()).toBe('Sales');
    });

    it('should return placeholder when no current group', () => {
      component.currentGroupId = null;

      expect(component.getCurrentGroupName()).toBe('No group selected');
    });

    it('should return correct selected group name', () => {
      component.selectGroup('2');

      expect(component.getSelectedGroupName()).toBe('Marketing');
    });

    it('should return placeholder when no selected group', () => {
      component.selectGroup(null);

      expect(component.getSelectedGroupName()).toBe('No group selected');
    });
  });

  describe('Empty Groups List', () => {
    it('should handle empty groups list', async () => {
      vi.mocked(groupFetchService.fetchGroups).mockReturnValueOnce(of([]));

      component.loadGroups();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(component.groups()).toEqual([]);
      expect(component.isLoading()).toBe(false);
    });
  });
});

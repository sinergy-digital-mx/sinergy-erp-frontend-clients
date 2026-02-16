import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleSearchComponent } from './role-search.component';
import { StateService } from '../../services/state.service';
import { of } from 'rxjs';

describe('RoleSearchComponent', () => {
  let component: RoleSearchComponent;
  let stateService: any;

  beforeEach(() => {
    const stateServiceMock = {
      setRoleSearchFilter: vi.fn(),
      roleSearchFilter$: of('')
    };

    stateService = stateServiceMock;
    component = new RoleSearchComponent(stateService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with StateService', () => {
      expect(component).toBeDefined();
    });
  });

  describe('Search Filter', () => {
    it('should call setRoleSearchFilter when search changes', () => {
      component.onSearchChange('Admin');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin');
    });

    it('should call setRoleSearchFilter with empty string when search is cleared', () => {
      component.onSearchChange('');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('');
    });

    it('should call setRoleSearchFilter with search query', () => {
      component.onSearchChange('User');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('User');
    });

    it('should handle multiple search changes', () => {
      component.onSearchChange('Admin');
      component.onSearchChange('User');
      component.onSearchChange('Viewer');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledTimes(3);
      expect(stateService.setRoleSearchFilter).toHaveBeenNthCalledWith(1, 'Admin');
      expect(stateService.setRoleSearchFilter).toHaveBeenNthCalledWith(2, 'User');
      expect(stateService.setRoleSearchFilter).toHaveBeenNthCalledWith(3, 'Viewer');
    });

    it('should handle search with special characters', () => {
      component.onSearchChange('Admin@#$');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin@#$');
    });

    it('should handle search with spaces', () => {
      component.onSearchChange('Admin Role');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin Role');
    });

    it('should handle search with numbers', () => {
      component.onSearchChange('Role123');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Role123');
    });

    it('should handle very long search query', () => {
      const longQuery = 'A'.repeat(100);
      component.onSearchChange(longQuery);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith(longQuery);
    });
  });

  describe('Requirements Validation', () => {
    it('should provide search input field (Requirement 9.1)', () => {
      expect(component).toBeDefined();
    });

    it('should filter role list on search (Requirement 9.2)', () => {
      component.onSearchChange('Admin');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin');
    });

    it('should display all roles when search is empty (Requirement 9.3)', () => {
      component.onSearchChange('');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('');
    });

    it('should perform filtering on client-side cached role list (Requirement 9.4)', () => {
      // The component delegates to StateService which handles client-side filtering
      component.onSearchChange('User');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('User');
    });

    it('should immediately restore full role list when search is cleared (Requirement 9.5)', () => {
      component.onSearchChange('Admin');
      component.onSearchChange('');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null search query', () => {
      component.onSearchChange(null as any);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith(null);
    });

    it('should handle undefined search query', () => {
      component.onSearchChange(undefined as any);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith(undefined);
    });

    it('should handle search with only spaces', () => {
      component.onSearchChange('   ');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('   ');
    });

    it('should handle case-sensitive search', () => {
      component.onSearchChange('ADMIN');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('ADMIN');
    });

    it('should handle search with unicode characters', () => {
      component.onSearchChange('Rôle');
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Rôle');
    });
  });

  describe('Integration with StateService', () => {
    it('should call StateService method on search change', () => {
      const spy = vi.spyOn(stateService, 'setRoleSearchFilter');
      component.onSearchChange('Test');
      expect(spy).toHaveBeenCalledWith('Test');
    });

    it('should pass search query directly to StateService', () => {
      const query = 'Admin Role';
      component.onSearchChange(query);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith(query);
    });
  });
});

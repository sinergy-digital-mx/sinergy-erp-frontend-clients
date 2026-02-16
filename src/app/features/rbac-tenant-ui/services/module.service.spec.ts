import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModuleService } from './module.service';
import { Module } from '../models';

describe('ModuleService', () => {
  let service: ModuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModuleService],
    });
    service = TestBed.inject(ModuleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.clearCache();
    httpMock.verify();
  });

  describe('getModules', () => {
    it('should fetch modules from API on first call', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [
            { id: 'leads.read', type: 'read', displayName: 'Read Leads' },
            { id: 'leads.create', type: 'create', displayName: 'Create Leads' },
          ],
        },
      ];

      const promise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const req = httpMock.expectOne('/api/tenant/modules');
      expect(req.request.method).toBe('GET');
      req.flush(mockModules);

      const modules = await promise;
      expect(modules).toEqual(mockModules);
    });

    it('should return cached modules on subsequent calls without making API request', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [{ id: 'leads.read', type: 'read', displayName: 'Read Leads' }],
        },
      ];

      // First call
      const firstPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const req = httpMock.expectOne('/api/tenant/modules');
      req.flush(mockModules);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/modules');

      expect(firstResult).toEqual(mockModules);
      expect(secondResult).toEqual(mockModules);
    });

    /**
     * Property 1: Module Caching
     * For any module fetch operation, fetching modules a second time should return
     * the same modules without making another API call.
     * Validates: Requirements 1.1, 1.5
     */
    it('Property 1: Module Caching - fetching modules twice returns same data without second API call', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [
            { id: 'leads.read', type: 'read', displayName: 'Read Leads' },
            { id: 'leads.create', type: 'create', displayName: 'Create Leads' },
          ],
        },
        {
          id: '2',
          name: 'Customers',
          permissions: [
            { id: 'customers.read', type: 'read', displayName: 'Read Customers' },
          ],
        },
      ];

      // First call
      const firstPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => resolve(modules));
      });

      const req1 = httpMock.expectOne('/api/tenant/modules');
      req1.flush(mockModules);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => resolve(modules));
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/modules');

      // Both results should be identical
      expect(firstResult).toEqual(secondResult);
      expect(firstResult).toEqual(mockModules);
    });
  });

  describe('getModulePermissions', () => {
    it('should fetch module permissions from API on first call', async () => {
      const mockPermissions = [
        { id: 'leads.read', moduleId: '1', moduleName: 'Leads', permissionType: 'read' as const, displayName: 'Read Leads' },
        { id: 'leads.create', moduleId: '1', moduleName: 'Leads', permissionType: 'create' as const, displayName: 'Create Leads' },
      ];

      const promise = new Promise<any[]>((resolve) => {
        service.getModulePermissions().subscribe((permissions) => {
          resolve(permissions);
        });
      });

      const req = httpMock.expectOne('/api/tenant/module-permissions');
      expect(req.request.method).toBe('GET');
      req.flush(mockPermissions);

      const permissions = await promise;
      expect(permissions).toEqual(mockPermissions);
    });

    it('should return cached permissions on subsequent calls without making API request', async () => {
      const mockPermissions = [
        { id: 'leads.read', moduleId: '1', moduleName: 'Leads', permissionType: 'read' as const, displayName: 'Read Leads' },
      ];

      // First call
      const firstPromise = new Promise<any[]>((resolve) => {
        service.getModulePermissions().subscribe((permissions) => {
          resolve(permissions);
        });
      });

      const req = httpMock.expectOne('/api/tenant/module-permissions');
      req.flush(mockPermissions);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<any[]>((resolve) => {
        service.getModulePermissions().subscribe((permissions) => {
          resolve(permissions);
        });
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/module-permissions');

      expect(firstResult).toEqual(mockPermissions);
      expect(secondResult).toEqual(mockPermissions);
    });
  });

  describe('clearCache', () => {
    it('should clear the cache and allow fresh API calls', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [{ id: 'leads.read', type: 'read', displayName: 'Read Leads' }],
        },
      ];

      // First call
      const firstPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const req1 = httpMock.expectOne('/api/tenant/modules');
      req1.flush(mockModules);
      await firstPromise;

      // Clear cache
      service.clearCache();

      // Second call - should make new API request
      const secondPromise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const req2 = httpMock.expectOne('/api/tenant/modules');
      req2.flush(mockModules);
      await secondPromise;
    });
  });

  describe('Module Grouping', () => {
    /**
     * Property 2: Module Grouping Completeness
     * For any set of modules and their permissions, all permissions should be grouped
     * by their module, with no loss or duplication.
     * Validates: Requirements 1.2, 1.3
     */
    it('Property 2: Module Grouping Completeness - all permissions are grouped by module with no loss or duplication', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [
            { id: 'leads.read', type: 'read', displayName: 'Read Leads' },
            { id: 'leads.create', type: 'create', displayName: 'Create Leads' },
            { id: 'leads.edit', type: 'edit', displayName: 'Edit Leads' },
          ],
        },
        {
          id: '2',
          name: 'Customers',
          permissions: [
            { id: 'customers.read', type: 'read', displayName: 'Read Customers' },
            { id: 'customers.delete', type: 'delete', displayName: 'Delete Customers' },
          ],
        },
      ];

      let result: Module[] | undefined;
      let error: any;

      service.getModules().subscribe(
        (modules) => {
          result = modules;
        },
        (err) => {
          error = err;
        }
      );

      const req = httpMock.expectOne('/api/tenant/modules');
      req.flush(mockModules);

      // Wait for the subscription to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(error).toBeUndefined();
      expect(result).toBeDefined();

      if (!result) {
        throw new Error('Result is undefined');
      }

      // Count total permissions in input
      const totalInputPermissions = mockModules.reduce((sum, module) => sum + module.permissions.length, 0);

      // Count total permissions in output
      const totalOutputPermissions = result.reduce((sum, module) => sum + module.permissions.length, 0);

      // Verify no permissions were lost
      expect(totalOutputPermissions).toBe(totalInputPermissions);

      // Verify each module's permissions are preserved
      result.forEach((resultModule) => {
        const inputModule = mockModules.find((m) => m.id === resultModule.id);
        expect(inputModule).toBeDefined();
        expect(resultModule.permissions.length).toBe(inputModule!.permissions.length);

        // Verify no duplicate permissions within a module
        const permissionIds = resultModule.permissions.map((p) => p.id);
        const uniquePermissionIds = new Set(permissionIds);
        expect(uniquePermissionIds.size).toBe(permissionIds.length);
      });
    });

    it('should group permissions by module correctly', async () => {
      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Leads',
          permissions: [
            { id: 'leads.read', type: 'read', displayName: 'Read Leads' },
            { id: 'leads.create', type: 'create', displayName: 'Create Leads' },
            { id: 'leads.edit', type: 'edit', displayName: 'Edit Leads' },
          ],
        },
        {
          id: '2',
          name: 'Customers',
          permissions: [
            { id: 'customers.read', type: 'read', displayName: 'Read Customers' },
            { id: 'customers.delete', type: 'delete', displayName: 'Delete Customers' },
          ],
        },
      ];

      const promise = new Promise<Module[]>((resolve) => {
        service.getModules().subscribe((modules) => {
          resolve(modules);
        });
      });

      const req = httpMock.expectOne('/api/tenant/modules');
      req.flush(mockModules);

      const modules = await promise;

      // Verify modules are grouped correctly
      expect(modules.length).toBe(2);

      const leadsModule = modules.find((m) => m.name === 'Leads');
      expect(leadsModule).toBeDefined();
      expect(leadsModule!.permissions.length).toBe(3);

      const customersModule = modules.find((m) => m.name === 'Customers');
      expect(customersModule).toBeDefined();
      expect(customersModule!.permissions.length).toBe(2);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleService } from './role.service';
import { Role, RoleDefinition } from '../models';

describe('RoleService', () => {
  let service: RoleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService],
    });
    service = TestBed.inject(RoleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.clearCache();
    httpMock.verify();
  });

  describe('getRoles', () => {
    it('should fetch roles from API on first call', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read', 'leads.create'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          name: 'Editor',
          description: 'Editor role',
          permissions: ['leads.read', 'leads.edit'],
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      const promise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => {
          resolve(roles);
        });
      });

      const req = httpMock.expectOne('/api/tenant/roles');
      expect(req.request.method).toBe('GET');
      req.flush(mockRoles);

      const roles = await promise;
      expect(roles).toEqual(mockRoles);
    });

    /**
     * Property 15: Role Caching
     * For any role fetch operation, fetching roles a second time should return
     * the same roles without making another API call.
     * Validates: Requirements 8.1, 8.5
     */
    it('Property 15: Role Caching - fetching roles twice returns same data without second API call', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read', 'leads.create', 'customers.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          name: 'Editor',
          description: 'Editor role',
          permissions: ['leads.edit', 'customers.edit'],
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      // First call
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req1 = httpMock.expectOne('/api/tenant/roles');
      req1.flush(mockRoles);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/roles');

      // Both results should be identical
      expect(firstResult).toEqual(secondResult);
      expect(firstResult).toEqual(mockRoles);
    });

    it('should return cached roles on subsequent calls without making API request', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read', 'leads.create'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First call
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => {
          resolve(roles);
        });
      });

      const req = httpMock.expectOne('/api/tenant/roles');
      req.flush(mockRoles);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => {
          resolve(roles);
        });
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/roles');

      expect(firstResult).toEqual(mockRoles);
      expect(secondResult).toEqual(mockRoles);
    });
  });

  describe('getRoleById', () => {
    it('should fetch a specific role by ID from API', async () => {
      const roleId = 'role1';
      const mockRole: Role = {
        id: 'role1',
        name: 'Admin',
        description: 'Administrator role',
        permissions: ['leads.read', 'leads.create', 'customers.read'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      const promise = new Promise<Role>((resolve) => {
        service.getRoleById(roleId).subscribe((role) => {
          resolve(role);
        });
      });

      const req = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRole);

      const role = await promise;
      expect(role).toEqual(mockRole);
    });
  });

  describe('createRole', () => {
    /**
     * Property 20: Role Creation API Call
     * For any role name, description, and permission set, creating a role should send
     * an API request with the correct parameters.
     * Validates: Requirements 11.4
     */
    it('Property 20: Role Creation API Call - creates role with correct parameters', async () => {
      const roleDefinition: RoleDefinition = {
        name: 'Viewer',
        description: 'Viewer role with read-only access',
        permissions: ['leads.read', 'customers.read'],
      };

      const mockCreatedRole: Role = {
        id: 'role3',
        ...roleDefinition,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      };

      const promise = new Promise<Role>((resolve) => {
        service.createRole(roleDefinition).subscribe((role) => {
          resolve(role);
        });
      });

      const req = httpMock.expectOne('/api/tenant/roles');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(roleDefinition);
      req.flush(mockCreatedRole);

      const role = await promise;
      expect(role).toEqual(mockCreatedRole);
    });

    it('should send POST request with role definition', async () => {
      const roleDefinition: RoleDefinition = {
        name: 'Viewer',
        description: 'Viewer role',
        permissions: ['leads.read'],
      };

      const mockCreatedRole: Role = {
        id: 'role3',
        ...roleDefinition,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      };

      const promise = new Promise<Role>((resolve) => {
        service.createRole(roleDefinition).subscribe((role) => {
          resolve(role);
        });
      });

      const req = httpMock.expectOne('/api/tenant/roles');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(roleDefinition);
      req.flush(mockCreatedRole);

      await promise;
    });

    it('should clear cache after successful role creation', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First, populate the cache
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req1 = httpMock.expectOne('/api/tenant/roles');
      req1.flush(mockRoles);
      await firstPromise;

      // Now create a role
      const roleDefinition: RoleDefinition = {
        name: 'Viewer',
        description: 'Viewer role',
        permissions: ['leads.read'],
      };

      const mockCreatedRole: Role = {
        id: 'role3',
        ...roleDefinition,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      };

      const createPromise = new Promise<Role>((resolve) => {
        service.createRole(roleDefinition).subscribe((role) => resolve(role));
      });

      const req2 = httpMock.expectOne('/api/tenant/roles');
      req2.flush(mockCreatedRole);
      await createPromise;

      // Next getRoles call should make a new API request (cache was cleared)
      const thirdPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req3 = httpMock.expectOne('/api/tenant/roles');
      req3.flush(mockRoles);
      await thirdPromise;
    });
  });

  describe('updateRole', () => {
    /**
     * Property 23: Role Update API Call
     * For any role with modified permissions, saving should send an API request
     * with the updated permission set.
     * Validates: Requirements 12.3
     */
    it('Property 23: Role Update API Call - updates role with correct parameters', async () => {
      const roleId = 'role1';
      const roleDefinition: RoleDefinition = {
        name: 'Admin',
        description: 'Updated administrator role',
        permissions: ['leads.read', 'leads.create', 'leads.edit', 'customers.read'],
      };

      const mockUpdatedRole: Role = {
        id: roleId,
        ...roleDefinition,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-03'),
      };

      const promise = new Promise<Role>((resolve) => {
        service.updateRole(roleId, roleDefinition).subscribe((role) => {
          resolve(role);
        });
      });

      const req = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(roleDefinition);
      req.flush(mockUpdatedRole);

      const role = await promise;
      expect(role).toEqual(mockUpdatedRole);
    });

    it('should send PUT request with updated role definition', async () => {
      const roleId = 'role1';
      const roleDefinition: RoleDefinition = {
        name: 'Admin',
        description: 'Updated administrator role',
        permissions: ['leads.read', 'leads.create'],
      };

      const mockUpdatedRole: Role = {
        id: roleId,
        ...roleDefinition,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-03'),
      };

      const promise = new Promise<Role>((resolve) => {
        service.updateRole(roleId, roleDefinition).subscribe((role) => {
          resolve(role);
        });
      });

      const req = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(roleDefinition);
      req.flush(mockUpdatedRole);

      await promise;
    });

    it('should clear cache after successful role update', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First, populate the cache
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req1 = httpMock.expectOne('/api/tenant/roles');
      req1.flush(mockRoles);
      await firstPromise;

      // Now update a role
      const roleId = 'role1';
      const roleDefinition: RoleDefinition = {
        name: 'Admin',
        description: 'Updated administrator role',
        permissions: ['leads.read', 'leads.create'],
      };

      const mockUpdatedRole: Role = {
        id: roleId,
        ...roleDefinition,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-03'),
      };

      const updatePromise = new Promise<Role>((resolve) => {
        service.updateRole(roleId, roleDefinition).subscribe((role) => resolve(role));
      });

      const req2 = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      req2.flush(mockUpdatedRole);
      await updatePromise;

      // Next getRoles call should make a new API request (cache was cleared)
      const thirdPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req3 = httpMock.expectOne('/api/tenant/roles');
      req3.flush(mockRoles);
      await thirdPromise;
    });
  });

  describe('deleteRole', () => {
    /**
     * Property 26: Role Deletion API Call
     * For any role, deleting it should send an API request with the correct role ID.
     * Validates: Requirements 13.4
     */
    it('Property 26: Role Deletion API Call - deletes role with correct parameters', async () => {
      const roleId = 'role1';

      const promise = new Promise<void>((resolve) => {
        service.deleteRole(roleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      await promise;
    });

    it('should send DELETE request with correct role ID', async () => {
      const roleId = 'role1';

      const promise = new Promise<void>((resolve) => {
        service.deleteRole(roleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      await promise;
    });

    it('should clear cache after successful role deletion', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First, populate the cache
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req1 = httpMock.expectOne('/api/tenant/roles');
      req1.flush(mockRoles);
      await firstPromise;

      // Now delete a role
      const roleId = 'role1';
      const deletePromise = new Promise<void>((resolve) => {
        service.deleteRole(roleId).subscribe(() => resolve());
      });

      const req2 = httpMock.expectOne(`/api/tenant/roles/${roleId}`);
      req2.flush(null);
      await deletePromise;

      // Next getRoles call should make a new API request (cache was cleared)
      const thirdPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => resolve(roles));
      });

      const req3 = httpMock.expectOne('/api/tenant/roles');
      req3.flush(mockRoles);
      await thirdPromise;
    });
  });

  describe('clearCache', () => {
    it('should clear the cache and allow fresh API calls', async () => {
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First call
      const firstPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => {
          resolve(roles);
        });
      });

      const req1 = httpMock.expectOne('/api/tenant/roles');
      req1.flush(mockRoles);
      await firstPromise;

      // Clear cache
      service.clearCache();

      // Second call - should make new API request
      const secondPromise = new Promise<Role[]>((resolve) => {
        service.getRoles().subscribe((roles) => {
          resolve(roles);
        });
      });

      const req2 = httpMock.expectOne('/api/tenant/roles');
      req2.flush(mockRoles);
      await secondPromise;
    });
  });
});

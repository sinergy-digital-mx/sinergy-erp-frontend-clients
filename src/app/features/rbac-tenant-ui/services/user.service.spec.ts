import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, Role } from '../models';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.clearCache();
    httpMock.verify();
  });

  describe('getUsers', () => {
    it('should fetch users from API on first call', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          email: 'user2@example.com',
          status: 'inactive',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      const promise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => {
          resolve(users);
        });
      });

      const req = httpMock.expectOne('/api/tenant/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);

      const users = await promise;
      expect(users).toEqual(mockUsers);
    });

    /**
     * Property 3: User Caching
     * For any user fetch operation, fetching users a second time should return
     * the same users without making another API call.
     * Validates: Requirements 2.1, 2.5
     */
    it('Property 3: User Caching - fetching users twice returns same data without second API call', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          email: 'user2@example.com',
          status: 'inactive',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      // First call
      const firstPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const req1 = httpMock.expectOne('/api/tenant/users');
      req1.flush(mockUsers);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/users');

      // Both results should be identical
      expect(firstResult).toEqual(secondResult);
      expect(firstResult).toEqual(mockUsers);
    });

    it('should return cached users on subsequent calls without making API request', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First call
      const firstPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => {
          resolve(users);
        });
      });

      const req = httpMock.expectOne('/api/tenant/users');
      req.flush(mockUsers);
      const firstResult = await firstPromise;

      // Second call - should use cache
      const secondPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => {
          resolve(users);
        });
      });

      const secondResult = await secondPromise;

      // Verify no second HTTP request was made
      httpMock.expectNone('/api/tenant/users');

      expect(firstResult).toEqual(mockUsers);
      expect(secondResult).toEqual(mockUsers);
    });
  });

  describe('getUserRoles', () => {
    it('should fetch user roles from API', async () => {
      const userId = 'user1';
      const mockRoles: Role[] = [
        {
          id: 'role1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read', 'leads.create'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      const promise = new Promise<Role[]>((resolve) => {
        service.getUserRoles(userId).subscribe((roles) => {
          resolve(roles);
        });
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRoles);

      const roles = await promise;
      expect(roles).toEqual(mockRoles);
    });

    /**
     * Property 8: User Roles Fetch
     * For any user, fetching their roles should return all roles currently assigned to that user.
     * Validates: Requirements 5.3, 5.4
     */
    it('Property 8: User Roles Fetch - fetching user roles returns all assigned roles', async () => {
      const userId = 'user1';
      const mockRoles: Role[] = [
        {
          id: 'role1',
          name: 'Admin',
          description: 'Administrator role',
          permissions: ['leads.read', 'leads.create', 'customers.read'],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: 'role2',
          name: 'Editor',
          description: 'Editor role',
          permissions: ['leads.edit', 'customers.edit'],
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      const promise = new Promise<Role[]>((resolve) => {
        service.getUserRoles(userId).subscribe((roles) => resolve(roles));
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles`);
      req.flush(mockRoles);

      const roles = await promise;

      // Verify all roles are returned
      expect(roles.length).toBe(2);
      expect(roles).toEqual(mockRoles);

      // Verify each role has required properties
      roles.forEach((role) => {
        expect(role.id).toBeDefined();
        expect(role.name).toBeDefined();
        expect(role.permissions).toBeDefined();
        expect(Array.isArray(role.permissions)).toBe(true);
      });
    });
  });

  describe('assignRoleToUser', () => {
    /**
     * Property 9: Role Assignment API Call
     * For any user and role, assigning the role should send an API request with the correct user ID and role ID.
     * Validates: Requirements 6.3
     */
    it('Property 9: Role Assignment API Call - assigns role with correct parameters', async () => {
      const userId = 'user1';
      const roleId = 'role1';

      const promise = new Promise<void>((resolve) => {
        service.assignRoleToUser(userId, roleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ roleId });
      req.flush(null);

      await promise;
    });

    it('should send POST request with correct parameters', async () => {
      const userId = 'user1';
      const roleId = 'role1';

      const promise = new Promise<void>((resolve) => {
        service.assignRoleToUser(userId, roleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ roleId });
      req.flush(null);

      await promise;
    });

    it('should clear cache after successful role assignment', async () => {
      const userId = 'user1';
      const roleId = 'role1';
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First, populate the cache
      const firstPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const req1 = httpMock.expectOne('/api/tenant/users');
      req1.flush(mockUsers);
      await firstPromise;

      // Now assign a role
      const assignPromise = new Promise<void>((resolve) => {
        service.assignRoleToUser(userId, roleId).subscribe(() => resolve());
      });

      const req2 = httpMock.expectOne(`/api/tenant/users/${userId}/roles`);
      req2.flush(null);
      await assignPromise;

      // Next getUsers call should make a new API request (cache was cleared)
      const thirdPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const req3 = httpMock.expectOne('/api/tenant/users');
      req3.flush(mockUsers);
      await thirdPromise;
    });
  });

  describe('replaceUserRole', () => {
    /**
     * Property 12: Role Replacement API Call
     * For any user and new role, replacing the user's role should send an API request with the correct parameters.
     * Validates: Requirements 7.2
     */
    it('Property 12: Role Replacement API Call - replaces role with correct parameters', async () => {
      const userId = 'user1';
      const oldRoleId = 'role1';
      const newRoleId = 'role2';

      const promise = new Promise<void>((resolve) => {
        service.replaceUserRole(userId, oldRoleId, newRoleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles/${oldRoleId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ newRoleId });
      req.flush(null);

      await promise;
    });

    it('should send PUT request with correct parameters', async () => {
      const userId = 'user1';
      const oldRoleId = 'role1';
      const newRoleId = 'role2';

      const promise = new Promise<void>((resolve) => {
        service.replaceUserRole(userId, oldRoleId, newRoleId).subscribe(() => {
          resolve();
        });
      });

      const req = httpMock.expectOne(`/api/tenant/users/${userId}/roles/${oldRoleId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ newRoleId });
      req.flush(null);

      await promise;
    });

    it('should clear cache after successful role replacement', async () => {
      const userId = 'user1';
      const oldRoleId = 'role1';
      const newRoleId = 'role2';
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First, populate the cache
      const firstPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const req1 = httpMock.expectOne('/api/tenant/users');
      req1.flush(mockUsers);
      await firstPromise;

      // Now replace a role
      const replacePromise = new Promise<void>((resolve) => {
        service.replaceUserRole(userId, oldRoleId, newRoleId).subscribe(() => resolve());
      });

      const req2 = httpMock.expectOne(`/api/tenant/users/${userId}/roles/${oldRoleId}`);
      req2.flush(null);
      await replacePromise;

      // Next getUsers call should make a new API request (cache was cleared)
      const thirdPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => resolve(users));
      });

      const req3 = httpMock.expectOne('/api/tenant/users');
      req3.flush(mockUsers);
      await thirdPromise;
    });
  });

  describe('clearCache', () => {
    it('should clear the cache and allow fresh API calls', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      // First call
      const firstPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => {
          resolve(users);
        });
      });

      const req1 = httpMock.expectOne('/api/tenant/users');
      req1.flush(mockUsers);
      await firstPromise;

      // Clear cache
      service.clearCache();

      // Second call - should make new API request
      const secondPromise = new Promise<User[]>((resolve) => {
        service.getUsers().subscribe((users) => {
          resolve(users);
        });
      });

      const req2 = httpMock.expectOne('/api/tenant/users');
      req2.flush(mockUsers);
      await secondPromise;
    });
  });
});

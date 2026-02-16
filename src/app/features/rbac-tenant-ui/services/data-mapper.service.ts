import { Injectable } from '@angular/core';
import { User, Role, Module } from '../models';

/**
 * DataMapperService
 * Transforms backend API responses to match frontend models
 * Handles different data structures from the backend
 */
@Injectable({
  providedIn: 'root'
})
export class DataMapperService {
  /**
   * Maps backend user response to frontend User model
   * Handles status as both string and object
   */
  mapUser(backendUser: any): User {
    return {
      id: backendUser.id,
      email: backendUser.email,
      status: this.normalizeStatus(backendUser.status),
      createdAt: backendUser.createdAt || backendUser.created_at || backendUser.creationDate,
      updatedAt: backendUser.updatedAt || backendUser.updated_at,
      first_name: backendUser.first_name || backendUser.firstName || '',
      last_name: backendUser.last_name || backendUser.lastName || '',
      phone: backendUser.phone || '',
      tenant_id: backendUser.tenant_id || backendUser.tenantId || '',
      last_login_at: backendUser.last_login_at || backendUser.lastLoginAt,
      ...backendUser // Include any additional fields
    };
  }

  /**
   * Maps array of backend users to frontend User models
   * Handles both array and object with users property
   */
  mapUsers(backendUsers: any): User[] {
    console.log('mapUsers received:', backendUsers, 'type:', typeof backendUsers, 'isArray:', Array.isArray(backendUsers));
    
    // Handle case where response is {users: [...]}
    let usersArray: any[] = [];
    
    if (Array.isArray(backendUsers)) {
      usersArray = backendUsers;
    } else if (backendUsers && typeof backendUsers === 'object') {
      // Try to find the users array in the object
      usersArray = backendUsers.users || backendUsers.data || backendUsers.items || [];
    }
    
    console.log('usersArray:', usersArray);
    return usersArray.map((user: any) => this.mapUser(user));
  }

  /**
   * Maps backend role response to frontend Role model
   */
  mapRole(backendRole: any): Role {
    return {
      id: backendRole.id,
      name: backendRole.name,
      description: backendRole.description || '',
      permissions: backendRole.permissions || [],
      createdAt: backendRole.createdAt,
      updatedAt: backendRole.updatedAt,
      ...backendRole // Include any additional fields
    };
  }

  /**
   * Maps array of backend roles to frontend Role models
   * Handles both array and object with roles property
   */
  mapRoles(backendRoles: any): Role[] {
    console.log('mapRoles received:', backendRoles, 'type:', typeof backendRoles, 'isArray:', Array.isArray(backendRoles));
    
    // Handle case where response is {roles: [...]}
    let rolesArray: any[] = [];
    
    if (Array.isArray(backendRoles)) {
      rolesArray = backendRoles;
    } else if (backendRoles && typeof backendRoles === 'object') {
      // Try to find the roles array in the object
      rolesArray = backendRoles.roles || backendRoles.data || backendRoles.items || [];
    }
    
    console.log('rolesArray after extraction:', rolesArray, 'isArray:', Array.isArray(rolesArray));
    
    if (!Array.isArray(rolesArray)) {
      console.error('rolesArray is not an array!', rolesArray);
      return [];
    }
    
    return rolesArray.map((role: any) => this.mapRole(role));
  }

  /**
   * Maps backend module response to frontend Module model
   */
  mapModule(backendModule: any): Module {
    return {
      id: backendModule.id,
      name: backendModule.name,
      permissions: backendModule.permissions || [],
      ...backendModule // Include any additional fields
    };
  }

  /**
   * Maps array of backend modules to frontend Module models
   * Handles both array and object with modules property
   */
  mapModules(backendModules: any): Module[] {
    // Handle case where response is {modules: [...]}
    const modulesArray = Array.isArray(backendModules) ? backendModules : backendModules?.modules || [];
    return modulesArray.map((module: any) => this.mapModule(module));
  }

  /**
   * Normalizes status from backend format to string
   * Handles both string and object formats
   */
  private normalizeStatus(status: any): string {
    if (typeof status === 'string') {
      return status;
    }
    if (status && typeof status === 'object' && status.code) {
      return status.code;
    }
    return 'active'; // Default fallback
  }
}

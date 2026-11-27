import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role, AvailableModule, AvailablePermissionsResponse } from '../../models';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { PermissionSyncService } from '../../../../core/services/permission-sync.service';

interface PermissionItem {
  id: string;
  name: string;
  description: string;
  isAssigned: boolean;
}

interface ModulePermissions {
  module_id: string;
  module_name: string;
  permissions: PermissionItem[];
  isExpanded?: boolean;
}

interface CategoryPermissions {
  code: string;
  label: string;
  sort_order: number;
  modules: ModulePermissions[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-role-permissions-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './role-permissions-manager.component.html',
  styleUrl: './role-permissions-manager.component.scss',
})
export class RolePermissionsManagerComponent implements OnInit, OnChanges {
  @Input() role: Role | null = null;
  @Output() permissionsUpdated = new EventEmitter<Role>();

  categoryPermissions: CategoryPermissions[] = [];
  loading = false;
  saving = false;
  hasChanges = false;
  permissionSearch = '';
  assignmentFilter: 'all' | 'assigned' | 'unassigned' = 'all';
  readonly skeletonSlots = [0, 1, 2, 3];
  originalPermissions: Set<string> = new Set();
  private openCategories = new Set<string>();
  private openModules = new Set<string>();
  private searchAutoExpand = true;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private permissionSyncService: PermissionSyncService
  ) {}

  ngOnInit() {
    if (this.role) {
      this.loadPermissions();
    }
  }

  ngOnChanges() {
    if (this.role) {
      this.permissionSearch = '';
      this.assignmentFilter = 'all';
      this.searchAutoExpand = true;
      this.loadPermissions();
    }
  }

  get filteredCategories(): CategoryPermissions[] {
    const query = this.permissionSearch.trim().toLowerCase();
    const result: CategoryPermissions[] = [];

    for (const category of this.categoryPermissions) {
      const modules: ModulePermissions[] = [];

      for (const module of category.modules) {
        if (!this.moduleMatchesAssignment(module)) {
          continue;
        }

        const moduleMatches = !query || module.module_name.toLowerCase().includes(query);
        const permissions = !query
          ? module.permissions
          : module.permissions.filter(permission =>
              moduleMatches ||
              permission.name.toLowerCase().includes(query) ||
              permission.description.toLowerCase().includes(query)
            );

        if (!moduleMatches && permissions.length === 0) {
          continue;
        }

        modules.push({
          ...module,
          permissions: moduleMatches ? module.permissions : permissions,
        });
      }

      if (modules.length === 0) {
        continue;
      }

      result.push({
        ...category,
        modules,
      });
    }

    return result;
  }

  get hasActiveSearch(): boolean {
    return this.permissionSearch.trim().length > 0;
  }

  private loadPermissions() {
    if (!this.role) return;

    this.loading = true;
    this.hasChanges = false;
    this.cdr.markForCheck();

    this.roleService.getRolePermissionsAvailable(this.role.id).subscribe({
      next: (response) => {
        this.processPermissions(response);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || 'Error al cargar permisos',
            type: 'error'
          },
          duration: 5000
        });
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private processPermissions(response: AvailablePermissionsResponse) {
    if (!response) {
      this.categoryPermissions = [];
      return;
    }

    const modules = this.extractModules(response);
    if (modules.length === 0) {
      this.categoryPermissions = [];
      return;
    }

    this.originalPermissions = new Set(
      modules
        .flatMap(module => module.permissions || [])
        .filter(permission => permission.assigned)
        .map(permission => permission.id)
    );

    this.categoryPermissions = this.buildCategories(response, modules);
    this.openCategories = new Set(this.categoryPermissions.map(category => category.code));
    this.openModules.clear();
    this.searchAutoExpand = true;
  }

  private extractModules(response: AvailablePermissionsResponse): AvailableModule[] {
    if (response.categories?.length) {
      return response.categories.flatMap(category => category.modules || []);
    }
    return response.modules || [];
  }

  private buildCategories(
    response: AvailablePermissionsResponse,
    modules: AvailableModule[]
  ): CategoryPermissions[] {
    if (response.categories?.length) {
      return response.categories
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(category => ({
          code: category.code,
          label: category.label,
          sort_order: category.sort_order,
          modules: (category.modules || []).map(module => this.mapModule(module)),
          isExpanded: true
        }));
    }

    const grouped = new Map<string, { label: string; sort_order: number; modules: AvailableModule[] }>();

    for (const module of modules) {
      const code = module.category || 'other';
      const label = module.category_label || 'Otros';
      const sortOrder = module.sort_order ?? 999;

      if (!grouped.has(code)) {
        grouped.set(code, { label, sort_order: sortOrder, modules: [] });
      }
      grouped.get(code)!.modules.push(module);
    }

    return Array.from(grouped.entries())
      .map(([code, group]) => ({
        code,
        label: group.label,
        sort_order: group.sort_order,
        modules: group.modules
          .slice()
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map(module => this.mapModule(module)),
        isExpanded: true
      }))
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  private mapModule(module: AvailableModule): ModulePermissions {
    return {
      module_id: module.id,
      module_name: module.name,
      permissions: (module.permissions || []).map(permission => ({
        id: permission.id,
        name: this.formatPermissionLabel(permission),
        description: permission.description || '',
        isAssigned: permission.assigned || false
      })),
      isExpanded: false
    };
  }

  private formatPermissionLabel(permission: AvailableModule['permissions'][number]): string {
    if (permission.entity) {
      return `${permission.entity}:${permission.action}`;
    }
    return permission.action;
  }

  private getAllModules(): ModulePermissions[] {
    return this.categoryPermissions.flatMap(category => category.modules);
  }

  onPermissionSearchChange(): void {
    this.searchAutoExpand = true;
    if (!this.permissionSearch.trim()) {
      return;
    }
    for (const category of this.filteredCategories) {
      this.openCategories.add(category.code);
    }
  }

  clearPermissionSearch(): void {
    this.permissionSearch = '';
    this.searchAutoExpand = true;
  }

  setAssignmentFilter(filter: 'all' | 'assigned' | 'unassigned'): void {
    this.assignmentFilter = filter;
    if (filter !== 'all') {
      this.openCategories = new Set(this.categoryPermissions.map(category => category.code));
    }
  }

  showAll(): void {
    this.searchAutoExpand = true;
    this.openCategories = new Set(this.categoryPermissions.map(category => category.code));
    this.openModules = new Set(this.getAllModules().map(module => module.module_id));
  }

  collapseAll(): void {
    this.searchAutoExpand = false;
    this.openCategories.clear();
    this.openModules.clear();
  }

  isCategoryOpen(category: CategoryPermissions): boolean {
    return this.openCategories.has(category.code);
  }

  isModuleOpen(module: ModulePermissions): boolean {
    if (this.hasActiveSearch && this.searchAutoExpand) {
      return true;
    }
    return this.openModules.has(module.module_id);
  }

  toggleCategory(category: CategoryPermissions) {
    if (this.openCategories.has(category.code)) {
      this.openCategories.delete(category.code);
      return;
    }
    this.openCategories.add(category.code);
  }

  toggleModule(module: ModulePermissions) {
    if (this.hasActiveSearch && this.searchAutoExpand) {
      this.openModules = new Set(
        this.filteredCategories.flatMap(category => category.modules.map(item => item.module_id))
      );
      this.searchAutoExpand = false;
    }
    if (this.openModules.has(module.module_id)) {
      this.openModules.delete(module.module_id);
      return;
    }
    this.openModules.add(module.module_id);
  }

  togglePermission(permission: PermissionItem) {
    permission.isAssigned = !permission.isAssigned;
    this.checkForChanges();
  }

  toggleAllModulePermissions(module: ModulePermissions) {
    const isFullyAssigned = this.isModuleFullyAssigned(module);
    module.permissions.forEach(permission => {
      permission.isAssigned = !isFullyAssigned;
    });
    this.checkForChanges();
  }

  isModuleFullyAssigned(module: ModulePermissions): boolean {
    return module.permissions.length > 0 && module.permissions.every(p => p.isAssigned);
  }

  getModuleAssignedCount(module: ModulePermissions): number {
    return module.permissions.filter(p => p.isAssigned).length;
  }

  getCategoryAssignedCount(category: CategoryPermissions): number {
    return category.modules.reduce(
      (total, module) => total + this.getModuleAssignedCount(module),
      0
    );
  }

  getCategoryTotalPermissions(category: CategoryPermissions): number {
    return category.modules.reduce((total, module) => total + module.permissions.length, 0);
  }

  getTotalAssignedPermissions(): number {
    return this.getAllModules().reduce(
      (total, module) => total + this.getModuleAssignedCount(module),
      0
    );
  }

  get totalModuleCount(): number {
    return this.getAllModules().length;
  }

  get assignedModuleCount(): number {
    return this.getAllModules().filter(module => this.getModuleAssignedCount(module) > 0).length;
  }

  get unassignedModuleCount(): number {
    return this.totalModuleCount - this.assignedModuleCount;
  }

  categoryAssignedPermissions(code: string): number {
    const category = this.findCategory(code);
    return category ? this.getCategoryAssignedCount(category) : 0;
  }

  categoryTotalPermissions(code: string): number {
    const category = this.findCategory(code);
    return category ? this.getCategoryTotalPermissions(category) : 0;
  }

  categoryAssignedModules(code: string): number {
    const category = this.findCategory(code);
    if (!category) {
      return 0;
    }
    return category.modules.filter(module => this.getModuleAssignedCount(module) > 0).length;
  }

  categoryTotalModules(code: string): number {
    return this.findCategory(code)?.modules.length ?? 0;
  }

  moduleAssigned(moduleId: string): number {
    const module = this.findModule(moduleId);
    return module ? this.getModuleAssignedCount(module) : 0;
  }

  moduleTotal(moduleId: string): number {
    return this.findModule(moduleId)?.permissions.length ?? 0;
  }

  moduleStatus(moduleId: string): 'full' | 'partial' | 'empty' {
    const total = this.moduleTotal(moduleId);
    const assigned = this.moduleAssigned(moduleId);
    if (total === 0 || assigned === 0) {
      return 'empty';
    }
    if (assigned === total) {
      return 'full';
    }
    return 'partial';
  }

  private moduleMatchesAssignment(module: ModulePermissions): boolean {
    const assigned = this.getModuleAssignedCount(module);
    if (this.assignmentFilter === 'assigned') {
      return assigned > 0;
    }
    if (this.assignmentFilter === 'unassigned') {
      return assigned === 0;
    }
    return true;
  }

  private findCategory(code: string): CategoryPermissions | undefined {
    return this.categoryPermissions.find(category => category.code === code);
  }

  private findModule(moduleId: string): ModulePermissions | undefined {
    for (const category of this.categoryPermissions) {
      const module = category.modules.find(item => item.module_id === moduleId);
      if (module) {
        return module;
      }
    }
    return undefined;
  }

  private checkForChanges() {
    const currentPermissions = new Set(
      this.getAllModules()
        .flatMap(module => module.permissions)
        .filter(p => p.isAssigned)
        .map(p => p.id)
    );

    this.hasChanges = !this.setsEqual(this.originalPermissions, currentPermissions);
  }

  private setsEqual(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
      if (!set2.has(item)) return false;
    }
    return true;
  }

  savePermissions() {
    if (!this.role || this.saving || !this.hasChanges) return;

    this.saving = true;

    const assignedPermissionIds = this.getAllModules()
      .flatMap(module => module.permissions)
      .filter(p => p.isAssigned)
      .map(p => p.id);

    this.roleService.updateRolePermissions(this.role.id, assignedPermissionIds).subscribe({
      next: (updatedRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: 'Permisos actualizados correctamente',
            type: 'success'
          },
          duration: 3000
        });

        this.originalPermissions = new Set(assignedPermissionIds);
        this.hasChanges = false;
        this.saving = false;

        this.permissionSyncService.syncAfterRbacChange();
        this.permissionsUpdated.emit(updatedRole);
      },
      error: (error) => {
        console.error('Error saving permissions:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || 'Error al guardar permisos',
            type: 'error'
          },
          duration: 5000
        });
        this.saving = false;
      }
    });
  }
}

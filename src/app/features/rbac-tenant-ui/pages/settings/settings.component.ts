import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ArrowLeftRight,
  Building2,
  ChevronRight,
  FileDown,
  FolderOpen,
  Landmark,
  LucideAngularModule,
  LucideIconData,
  Mail,
  Monitor,
  Package,
  Search,
  Send,
  Shield,
  Tag,
  Target,
  UserCog,
  Users,
} from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { MADERERIA_INVENTORY_IMPORT_PERMISSIONS } from '../../../madereria-inventory-import/config/permissions.config';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIconData;
  route: string;
  permissions: string[];
}

/**
 * SettingsComponent
 * Main settings page with grid menu for navigating to different management sections
 * Displays Users and Roles management options
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen">
      <div class="px-2 py-2">
        <div class="settings-header mb-6">
          <div class="settings-header__titles">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
            <p class="text-gray-600">Gestiona usuarios, roles y permisos de tu empresa</p>
          </div>
          <div class="settings-search">
            <lucide-icon class="settings-search__icon" [img]="Search" [size]="18"></lucide-icon>
            <input
              type="search"
              class="settings-search__input"
              [(ngModel)]="searchQuery"
              placeholder="Buscar configuración…"
              aria-label="Buscar en configuración"
              autocomplete="off" />
          </div>
        </div>

        <div class="mb-8" *ngIf="visibleAccessSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Accesos y Permisos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ng-container *ngFor="let section of visibleAccessSections">
              <ng-container *ngTemplateOutlet="sectionCard; context: { $implicit: section }"></ng-container>
            </ng-container>
          </div>
        </div>

        <div class="mb-8" *ngIf="visibleCompanySections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Empresa</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ng-container *ngFor="let section of visibleCompanySections">
              <ng-container *ngTemplateOutlet="sectionCard; context: { $implicit: section }"></ng-container>
            </ng-container>
          </div>
        </div>

        <div class="mb-8" *ngIf="showEmployeePortal">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Mi Portal</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div (click)="navigateTo('/employee-portal')"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              <div class="flex flex-col h-full">
                <span class="settings-card__icon">
                  <lucide-icon [img]="UserCog" [size]="22"></lucide-icon>
                </span>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Portal de empleado</h3>
                <p class="text-gray-600 text-sm mb-4 grow">Consulta tu información, tus días de vacaciones y envía solicitudes de ausencia</p>
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a mi portal
                  <lucide-icon [img]="ChevronRight" [size]="16" class="ml-2"></lucide-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8" *ngIf="visibleCommunicationSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Comunicación</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ng-container *ngFor="let section of visibleCommunicationSections">
              <ng-container *ngTemplateOutlet="sectionCard; context: { $implicit: section }"></ng-container>
            </ng-container>
          </div>
        </div>

        <div
          class="settings-empty"
          *ngIf="hasActiveSearch && !hasAnyVisibleSection">
          <p class="settings-empty__title">Sin resultados</p>
          <p class="settings-empty__subtitle">No hay opciones que coincidan con “{{ searchQuery.trim() }}”.</p>
        </div>
      </div>
    </div>

    <ng-template #sectionCard let-section>
      <div (click)="navigateTo(section.route)"
           class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
        <div class="flex flex-col h-full">
          <span class="settings-card__icon">
            <lucide-icon [img]="section.icon" [size]="22"></lucide-icon>
          </span>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
          <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
            Ir a {{ section.title }}
            <lucide-icon [img]="ChevronRight" [size]="16" class="ml-2"></lucide-icon>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .settings-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1rem 1.5rem;
    }

    .settings-header__titles {
      min-width: 0;
      flex: 1 1 16rem;
    }

    .settings-search {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 0 1 20rem;
      width: 100%;
      max-width: 20rem;
      height: 2.5rem;
      padding: 0 0.9rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.625rem;
      background: #fff;
      box-sizing: border-box;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .settings-search:focus-within {
      border-color: #a5b4fc;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    .settings-search__icon {
      flex-shrink: 0;
      display: inline-flex;
      color: #9ca3af;
      pointer-events: none;
    }

    .settings-search__input {
      flex: 1;
      min-width: 0;
      height: 100%;
      padding: 0;
      border: none;
      background: transparent;
      font-size: 0.875rem;
      color: #334155;
      outline: none;
      box-shadow: none;
      appearance: none;
      -webkit-appearance: none;
    }

    .settings-search__input::-webkit-search-decoration,
    .settings-search__input::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }

    .settings-search__input::placeholder {
      color: #9ca3af;
    }

    .settings-card__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.75rem;
      border-radius: 0.75rem;
      background: #eef2ff;
      color: #4f46e5;
    }

    .settings-empty {
      margin-top: 2rem;
      padding: 2.5rem 1rem;
      text-align: center;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
    }

    .settings-empty__title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #334155;
    }

    .settings-empty__subtitle {
      margin: 0.35rem 0 0;
      font-size: 0.875rem;
      color: #9ca3af;
    }
  `]
})
export class SettingsComponent implements OnInit, OnDestroy {
  readonly ChevronRight = ChevronRight;
  readonly UserCog = UserCog;
  readonly Search = Search;

  searchQuery = '';

  accessSections: SettingsSection[] = [
    {
      id: 'users',
      title: 'Usuarios',
      description: 'Gestiona usuarios, asigna roles y controla permisos de acceso de forma centralizada',
      icon: Users,
      route: 'users',
      permissions: ['user:ViewMenu']
    },
    {
      id: 'roles',
      title: 'Roles y Permisos',
      description: 'Crea y gestiona roles personalizados, define permisos granulares y organiza el control de acceso',
      icon: Shield,
      route: 'roles',
      permissions: ['role:ViewMenu']
    }
  ];

  companySections: SettingsSection[] = [
    {
      id: 'fiscal-configurations',
      title: 'Razones Sociales y Sucursales',
      description: 'Gestiona razones sociales, sucursales, almacenes, RFC, régimen fiscal y certificados digitales',
      icon: Landmark,
      route: 'fiscal-configurations',
      permissions: ['billing:ViewMenu', 'warehouses:ViewMenu']
    },
    {
      id: 'madereria-inventory-import',
      title: 'Importación de inventario',
      description: 'Importa productos, precios, costos y lotes desde el Excel de inventario de Madereria',
      icon: FileDown,
      route: 'madereria-inventory-import',
      permissions: [MADERERIA_INVENTORY_IMPORT_PERMISSIONS.viewMenu]
    },
    {
      id: 'vendors',
      title: 'Proveedores',
      description: 'Gestiona proveedores, información de contacto, RFC y datos fiscales de tus proveedores',
      icon: Building2,
      route: 'vendors',
      permissions: ['vendors:ViewMenu']
    },
    {
      id: 'products',
      title: 'Productos',
      description: 'Gestiona el catálogo de productos, SKU, nombres y descripciones de tus productos',
      icon: Package,
      route: 'products',
      permissions: ['products:ViewMenu']
    },
    {
      id: 'pos-configuration',
      title: 'Punto de Venta',
      description: 'Configura y gestiona tu punto de venta, terminales, cajas y configuraciones de ventas',
      icon: Monitor,
      route: 'pos-configuration',
      permissions: ['pos_configuration:ViewMenu']
    },
    {
      id: 'exchange-rates',
      title: 'Tipo de Cambio',
      description: 'Registra y consulta el tipo de cambio diario USD/MXN para operaciones financieras',
      icon: ArrowLeftRight,
      route: 'exchange-rates',
      permissions: ['exchangerate:ViewMenu', 'exchangerate:Read', 'exchangerate:Update']
    },
    {
      id: 'goals',
      title: 'Metas',
      description: 'Define metas de venta por sucursal y periodo, y configura la comisión activa del reporte',
      icon: Target,
      route: 'goals',
      permissions: ['goals:ViewMenu', 'goals:Read']
    },
    {
      id: 'global-discounts',
      title: 'Descuentos globales',
      description: 'Administra descuentos generales de orden para POS (porcentaje o monto fijo)',
      icon: Tag,
      route: 'global-discounts',
      permissions: ['global_discounts:ViewMenu', 'global_discounts:Read', 'globalDiscount:ViewMenu', 'globalDiscount:Read']
    },
    {
      id: 'customer-groups',
      title: 'Grupos de clientes',
      description: 'Administra el catálogo de grupos de clientes de tu organización',
      icon: FolderOpen,
      route: 'customer-groups',
      permissions: ['CustomerGroup:ViewMenu']
    }
  ];

  communicationSections: SettingsSection[] = [
    {
      id: 'email-templates',
      title: 'Plantillas de Correo',
      description: 'Crea y gestiona plantillas de correo personalizadas para notificaciones y comunicaciones',
      icon: Mail,
      route: 'email-templates',
      permissions: [
        'email-templates:ViewMenu',
        'email-templates:Read',
        'email-templates:Create',
        'email-templates:Update',
        'email-templates:Delete',
        'emailtemplates:ViewMenu',
        'email_templates:Read',
        'email_templates:Create',
        'email_templates:Update',
        'email_templates:Delete'
      ]
    },
    {
      id: 'mailer-configurations',
      title: 'Configuración de Correo',
      description: 'Configura el proveedor de envío de correos, incluyendo Resend y la configuración activa',
      icon: Send,
      route: 'mailer-configurations',
      permissions: []
    }
  ];

  sections: SettingsSection[] = [];
  private permissionsSubscription?: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.permissionsSubscription?.unsubscribe();
  }

  /**
   * Check if user has permission to access a section
   */
  hasAccess(section: SettingsSection): boolean {
    if (this.authService.hasAdminRole()) {
      return true;
    }
    if (!section.permissions || section.permissions.length === 0) {
      return true;
    }
    return section.permissions.some(permission => this.authService.hasPermission(permission));
  }

  get hasActiveSearch(): boolean {
    return this.searchQuery.trim().length > 0;
  }

  get hasAnyVisibleSection(): boolean {
    return (
      this.visibleAccessSections.length > 0 ||
      this.visibleCompanySections.length > 0 ||
      this.visibleCommunicationSections.length > 0 ||
      this.showEmployeePortal
    );
  }

  /**
   * Get filtered sections based on user permissions
   */
  get visibleAccessSections(): SettingsSection[] {
    return this.filterSections(this.accessSections);
  }

  get visibleCompanySections(): SettingsSection[] {
    return this.filterSections(this.companySections);
  }

  get visibleCommunicationSections(): SettingsSection[] {
    return this.filterSections(this.communicationSections);
  }

  /** The employee self-service portal is only shown to employee users. */
  get showEmployeePortal(): boolean {
    if (!this.authService.isEmployeeUser()) {
      return false;
    }
    return this.matchesSearch(
      'Portal de empleado',
      'Consulta tu información, tus días de vacaciones y envía solicitudes de ausencia',
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  private filterSections(sections: SettingsSection[]): SettingsSection[] {
    return sections.filter(
      (section) => this.hasAccess(section) && this.matchesSearch(section.title, section.description),
    );
  }

  private matchesSearch(title: string, description: string): boolean {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return true;
    return title.toLowerCase().includes(q) || description.toLowerCase().includes(q);
  }
}

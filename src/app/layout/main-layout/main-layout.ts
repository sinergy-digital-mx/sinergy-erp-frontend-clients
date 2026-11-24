import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { PermissionSyncService } from '../../core/services/permission-sync.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { PolluxBrandTextComponent } from '../../core/components/pollux-brand-text/pollux-brand-text.component';
import { SystemLogoService } from '../../core/services/system-logo.service';
import { SystemBrandService } from '../../core/services/system-brand.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, LucideAngularModule, PolluxBrandTextComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit, OnDestroy {
  private static readonly chromeClass = 'has-app-chrome';

  readonly icons = { Menu };
  readonly isMobileMenuOpen: Signal<boolean>;
  private desktopNavQuery: MediaQueryList | null = null;
  private readonly onDesktopNavChange = (): void => {
    this.syncDesktopNav();
  };

  constructor(
    private permissionSyncService: PermissionSyncService,
    private sidebarService: SidebarService,
    private systemLogoService: SystemLogoService,
    private systemBrand: SystemBrandService,
    private auth: AuthService,
  ) {
    this.isMobileMenuOpen = this.sidebarService.isMobileOpen.asReadonly();
  }

  ngOnInit(): void {
    this.permissionSyncService.initialize();
    this.systemBrand.applyForCurrentTenant();
    this.systemLogoService.refresh();
    document.documentElement.classList.add(MainLayout.chromeClass);
    document.body.classList.add(MainLayout.chromeClass);
    this.watchDesktopNav();
  }

  ngOnDestroy(): void {
    this.desktopNavQuery?.removeEventListener('change', this.onDesktopNavChange);
    this.sidebarService.closeMobile();
    document.documentElement.classList.remove(MainLayout.chromeClass);
    document.body.classList.remove(MainLayout.chromeClass);
    if (!this.auth.token) {
      this.systemBrand.releaseStatusBar();
      this.systemLogoService.endSession();
    }
  }

  openMobileMenu(): void {
    if (this.desktopNavQuery?.matches) {
      return;
    }
    this.sidebarService.openMobile();
  }

  /** En escritorio el drawer móvil no debe quedar abierto ni pintar etiquetas en el rail. */
  private watchDesktopNav(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    this.desktopNavQuery = window.matchMedia('(min-width: 1024px)');
    this.desktopNavQuery.addEventListener('change', this.onDesktopNavChange);
    this.syncDesktopNav();
  }

  private syncDesktopNav(): void {
    if (this.desktopNavQuery?.matches) {
      this.sidebarService.closeMobile();
    }
  }
}

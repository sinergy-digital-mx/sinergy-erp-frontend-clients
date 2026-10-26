import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { PermissionSyncService } from '../../core/services/permission-sync.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { PolluxBrandTextComponent } from '../../core/components/pollux-brand-text/pollux-brand-text.component';
import { SystemLogoService } from '../../core/services/system-logo.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, LucideAngularModule, PolluxBrandTextComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit, OnDestroy {
  /** Índigo de arriba del sidebar. Pinta la barra del sistema en el celular. */
  private static readonly mobileThemeColor = '#1e1b4b';
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
  ) {
    this.isMobileMenuOpen = this.sidebarService.isMobileOpen.asReadonly();
  }

  ngOnInit(): void {
    this.permissionSyncService.initialize();
    this.systemLogoService.refresh();
    this.setMobileThemeColor(MainLayout.mobileThemeColor);
    document.documentElement.classList.add(MainLayout.chromeClass);
    document.body.classList.add(MainLayout.chromeClass);
    this.watchDesktopNav();
  }

  ngOnDestroy(): void {
    this.desktopNavQuery?.removeEventListener('change', this.onDesktopNavChange);
    this.sidebarService.closeMobile();
    document.documentElement.classList.remove(MainLayout.chromeClass);
    document.body.classList.remove(MainLayout.chromeClass);
  }

  private setMobileThemeColor(color: string | null): void {
    const existing = document.querySelector('meta[name="theme-color"]');
    if (!color) {
      existing?.remove();
      return;
    }
    const meta = existing ?? document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', color);
    if (!existing) {
      document.head.appendChild(meta);
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

import { Component, OnDestroy, OnInit } from '@angular/core';
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

  readonly icons = { Menu };

  constructor(
    private permissionSyncService: PermissionSyncService,
    private sidebarService: SidebarService,
    private systemLogoService: SystemLogoService,
  ) {}

  ngOnInit(): void {
    this.permissionSyncService.initialize();
    this.systemLogoService.refresh();
    this.setMobileThemeColor(MainLayout.mobileThemeColor);
  }

  ngOnDestroy(): void {
    this.setMobileThemeColor(null);
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
    this.sidebarService.openMobile();
  }
}

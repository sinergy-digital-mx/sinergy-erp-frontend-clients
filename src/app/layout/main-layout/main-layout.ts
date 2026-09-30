import { Component, OnInit } from '@angular/core';
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
export class MainLayout implements OnInit {
  readonly icons = { Menu };

  constructor(
    private permissionSyncService: PermissionSyncService,
    private sidebarService: SidebarService,
    private systemLogoService: SystemLogoService,
  ) {}

  ngOnInit(): void {
    this.permissionSyncService.initialize();
    this.systemLogoService.refresh();
  }

  openMobileMenu(): void {
    this.sidebarService.openMobile();
  }
}

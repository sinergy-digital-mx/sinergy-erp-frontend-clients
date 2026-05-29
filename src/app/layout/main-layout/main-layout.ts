import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { PermissionSyncService } from '../../core/services/permission-sync.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  constructor(private permissionSyncService: PermissionSyncService) {}

  ngOnInit(): void {
    // Replace stale JWT from localStorage with fresh permissions from backend
    this.permissionSyncService.initialize();
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppUpdateService } from './core/services/app-update.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('sinergy-erp-frontend-clients');
  private readonly appUpdateService = inject(AppUpdateService);

  ngOnInit(): void {
    this.appUpdateService.init();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../core/components/back-button/back-button.component';

/**
 * BulkEmailsComponent
 * Displays bulk email management
 */
@Component({
  selector: 'app-bulk-emails',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-3 mb-6">
        <app-back-button (clicked)="goBack()"></app-back-button>
        <h1 class="text-2xl font-semibold text-gray-900">Correos Masivos</h1>
      </div>

      <!-- Content -->
      <div class="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
        <p class="text-gray-600 text-lg">Gestión de correos masivos</p>
        <p class="text-gray-500 text-sm mt-2">Esta sección está en desarrollo</p>
      </div>
    </div>
  `,
  styles: []
})
export class BulkEmailsComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/marketing']);
  }
}

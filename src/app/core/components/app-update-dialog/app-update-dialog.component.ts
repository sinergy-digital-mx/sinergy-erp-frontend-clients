import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

export interface AppUpdateDialogData {
  version?: string;
  buildId?: string;
}

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent],
  template: `
    <div class="app-update-dialog">
      <h2 class="app-update-dialog__title">Hay una actualización</h2>
      <p class="app-update-dialog__message">
        Hay una nueva versión de Pollux disponible.
        @if (data.version) {
          <span class="app-update-dialog__version">Versión {{ data.version }}</span>
        }
      </p>
      <p class="app-update-dialog__hint">
        Actualiza ahora para obtener los últimos cambios y evitar errores por caché.
      </p>
      <div class="app-update-dialog__actions">
        <app-button
          text="Más tarde"
          custom_class="btn_secondary"
          (clicked)="close(false)">
        </app-button>
        <app-button
          text="Actualizar ahora"
          custom_class="btn_primary"
          (clicked)="close(true)">
        </app-button>
      </div>
    </div>
  `,
  styles: [`
    .app-update-dialog {
      padding: 0.25rem 0;
    }

    .app-update-dialog__title {
      margin: 0 0 0.75rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }

    .app-update-dialog__message {
      margin: 0 0 0.5rem;
      font-size: 0.9375rem;
      color: #374151;
      line-height: 1.5;
    }

    .app-update-dialog__version {
      display: block;
      margin-top: 0.35rem;
      font-weight: 600;
      color: #4f46e5;
    }

    .app-update-dialog__hint {
      margin: 0 0 1.25rem;
      font-size: 0.8125rem;
      color: #6b7280;
      line-height: 1.45;
    }

    .app-update-dialog__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
  `]
})
export class AppUpdateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AppUpdateDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: AppUpdateDialogData
  ) {}

  close(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}

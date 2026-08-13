import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';

export interface AppUpdateDialogData {
  version?: string;
  buildId?: string;
}

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent, LucideAngularModule],
  template: `
    <div class="app-update-dialog">
      <div class="app-update-dialog__accent" aria-hidden="true"></div>

      <div class="app-update-dialog__header">
        <div class="app-update-dialog__icon-well" aria-hidden="true">
          <lucide-icon [img]="Sparkles" [size]="18" [strokeWidth]="2.25"></lucide-icon>
        </div>
        <div>
          <p class="app-update-dialog__eyebrow">Pollux</p>
          <h2 class="app-update-dialog__title">Hay una actualización</h2>
        </div>
      </div>

      <p class="app-update-dialog__lead">
        Hay una nueva versión de Pollux disponible.
      </p>

      @if (data.version) {
        <span class="app-update-dialog__chip">Versión {{ data.version }}</span>
      }

      <p class="app-update-dialog__hint">
        Actualiza ahora para obtener los últimos cambios y evitar errores por caché.
      </p>

      <div class="app-update-dialog__actions">
        <div class="app-update-dialog__later">
          <app-button text="Más tarde" variant="secondary" (clicked)="close(false)"></app-button>
        </div>
        <div class="app-update-dialog__now">
          <app-button text="Actualizar ahora" variant="primary" (clicked)="close(true)"></app-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .app-update-dialog {
      position: relative;
      padding: 1.5rem 1.5rem 1.35rem;
    }

    .app-update-dialog__accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4338ca 0%, #6366f1 48%, #7c3aed 100%);
    }

    .app-update-dialog__header {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 1rem;
    }

    .app-update-dialog__icon-well {
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.85rem;
      display: grid;
      place-items: center;
      color: #eef2ff;
      background: linear-gradient(160deg, #4338ca 0%, #6366f1 52%, #7c3aed 100%);
      box-shadow: 0 8px 18px rgba(79, 70, 229, 0.28);
    }

    .app-update-dialog__eyebrow {
      margin: 0 0 0.15rem;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #64748b;
    }

    .app-update-dialog__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.25;
      color: #1e293b;
    }

    .app-update-dialog__lead {
      margin: 0 0 0.85rem;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: #475569;
    }

    .app-update-dialog__chip {
      display: inline-flex;
      align-items: center;
      padding: 0.28rem 0.7rem;
      border-radius: 999px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 0.8125rem;
      font-weight: 700;
      color: #4338ca;
    }

    .app-update-dialog__hint {
      margin: 0.85rem 0 0;
      font-size: 0.8125rem;
      line-height: 1.5;
      color: #94a3b8;
    }

    .app-update-dialog__actions {
      display: flex;
      gap: 0.7rem;
      margin-top: 1.35rem;
    }

    .app-update-dialog__later,
    .app-update-dialog__now {
      flex: 1;
      min-width: 0;
    }

    .app-update-dialog__actions ::ng-deep button {
      width: 100%;
      height: 2.7rem;
      border-radius: 999px !important;
    }

    .app-update-dialog__later ::ng-deep button {
      background: #fff !important;
      color: #4338ca !important;
      border: 1.5px solid #c7d2fe !important;
      box-shadow: none !important;
    }

    .app-update-dialog__later ::ng-deep button:hover:not(:disabled) {
      background: #eef2ff !important;
      border-color: #a5b4fc !important;
    }

    .app-update-dialog__now ::ng-deep button {
      box-shadow: 0 8px 18px rgba(79, 70, 229, 0.28) !important;
    }
  `]
})
export class AppUpdateDialogComponent {
  readonly Sparkles = Sparkles;

  constructor(
    private dialogRef: MatDialogRef<AppUpdateDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: AppUpdateDialogData
  ) {}

  close(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}

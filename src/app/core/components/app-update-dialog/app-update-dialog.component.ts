import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, RefreshCw } from 'lucide-angular';
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
      <div class="app-update-dialog__visual" aria-hidden="true">
        <div class="app-update-dialog__ring app-update-dialog__ring--outer"></div>
        <div class="app-update-dialog__ring app-update-dialog__ring--inner"></div>
        <div class="app-update-dialog__icon-well">
          <lucide-icon
            class="app-update-dialog__icon"
            [img]="RefreshCw"
            [size]="28"
            [strokeWidth]="2.25">
          </lucide-icon>
        </div>
      </div>

      <div class="app-update-dialog__body">
        <p class="app-update-dialog__eyebrow">Pollux</p>
        <h2 class="app-update-dialog__title">Nueva versión disponible</h2>
        <p class="app-update-dialog__message">
          Hay una actualización lista. Recarga para aplicar los últimos cambios y evitar problemas de caché.
        </p>

        @if (data.version) {
          <div class="app-update-dialog__meta">
            <span class="app-update-dialog__chip">
              <span class="app-update-dialog__chip-dot"></span>
              Versión {{ data.version }}
            </span>
          </div>
        }
      </div>

      <div class="app-update-dialog__actions">
        <app-button
          text="Más tarde"
          variant="secondary"
          (clicked)="close(false)">
        </app-button>
        <app-button
          text="Actualizar ahora"
          variant="primary"
          (clicked)="close(true)">
        </app-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .app-update-dialog {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.75rem 1.5rem 1.5rem;
      min-width: 0;
    }

    .app-update-dialog__visual {
      position: relative;
      width: 5.5rem;
      height: 5.5rem;
      margin-bottom: 1.35rem;
      display: grid;
      place-items: center;
    }

    .app-update-dialog__ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      pointer-events: none;
    }

    .app-update-dialog__ring--outer {
      border: 1.5px solid rgba(51, 65, 85, 0.12);
      animation: app-update-pulse 2.4s ease-in-out infinite;
    }

    .app-update-dialog__ring--inner {
      inset: 0.55rem;
      border: 1.5px dashed rgba(51, 65, 85, 0.22);
      animation: app-update-spin-slow 12s linear infinite;
    }

    .app-update-dialog__icon-well {
      position: relative;
      z-index: 1;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      display: grid;
      place-items: center;
      background: linear-gradient(160deg, #334155 0%, #1e293b 100%);
      box-shadow:
        0 10px 24px rgba(30, 41, 59, 0.28),
        0 0 0 6px rgba(51, 65, 85, 0.08);
    }

    .app-update-dialog__icon {
      color: #f8fafc;
      display: block;
      animation: app-update-spin 2.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    }

    .app-update-dialog__body {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .app-update-dialog__eyebrow {
      margin: 0 0 0.4rem;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #64748b;
    }

    .app-update-dialog__title {
      margin: 0 0 0.65rem;
      font-size: 1.375rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.25;
      color: #0f172a;
    }

    .app-update-dialog__message {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.55;
      color: #475569;
    }

    .app-update-dialog__meta {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .app-update-dialog__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }

    .app-update-dialog__chip-dot {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
      animation: app-update-dot 1.6s ease-in-out infinite;
    }

    .app-update-dialog__actions {
      display: flex;
      width: 100%;
      justify-content: stretch;
      gap: 0.75rem;
    }

    .app-update-dialog__actions ::ng-deep app-button {
      flex: 1;
    }

    .app-update-dialog__actions ::ng-deep button {
      width: 100%;
    }

    @keyframes app-update-spin {
      0% { transform: rotate(0deg); }
      70% { transform: rotate(360deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes app-update-spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    @keyframes app-update-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.06);
        opacity: 0.65;
      }
    }

    @keyframes app-update-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(0.85); }
    }

    @media (prefers-reduced-motion: reduce) {
      .app-update-dialog__icon,
      .app-update-dialog__ring--outer,
      .app-update-dialog__ring--inner,
      .app-update-dialog__chip-dot {
        animation: none;
      }
    }
  `]
})
export class AppUpdateDialogComponent {
  readonly RefreshCw = RefreshCw;

  constructor(
    private dialogRef: MatDialogRef<AppUpdateDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: AppUpdateDialogData
  ) {}

  close(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}

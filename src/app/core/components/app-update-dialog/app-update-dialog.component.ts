import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, CircleArrowUp, Sparkles } from 'lucide-angular';

export interface AppUpdateDialogData {
  version?: string;
  buildId?: string;
}

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LucideAngularModule],
  template: `
    <div class="px-upd">
      <div class="px-upd__mesh" aria-hidden="true"></div>
      <div class="px-upd__shine" aria-hidden="true"></div>

      <div class="px-upd__inner">
        <div class="px-upd__icon" aria-hidden="true">
          <span class="px-upd__icon-ring"></span>
          <span class="px-upd__icon-core">
            <lucide-icon [img]="Sparkles" [size]="22" [strokeWidth]="2.1"></lucide-icon>
          </span>
        </div>

        <p class="px-upd__kicker">Pollux</p>
        <h2 class="px-upd__title">Hay una actualización</h2>

        <p class="px-upd__lead">
          Hay una nueva versión de Pollux disponible.
        </p>

        @if (data.version) {
          <div class="px-upd__chip">
            <span class="px-upd__dot" aria-hidden="true"></span>
            Versión {{ data.version }}
          </div>
        }

        <p class="px-upd__hint">
          Actualiza ahora para obtener los últimos cambios y evitar errores por caché.
        </p>
      </div>

      <div class="px-upd__footer">
        <button type="button" class="px-upd__btn px-upd__btn--ghost" (click)="close(false)">
          Más tarde
        </button>
        <button type="button" class="px-upd__btn px-upd__btn--go" (click)="close(true)">
          <lucide-icon [img]="CircleArrowUp" [size]="16" [strokeWidth]="2.4"></lucide-icon>
          Actualizar ahora
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .px-upd {
      position: relative;
      overflow: hidden;
      background: #fff;
      animation: px-upd-in 0.48s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .px-upd__mesh {
      position: absolute;
      inset: 0 0 auto;
      height: 9.5rem;
      pointer-events: none;
      background:
        radial-gradient(18rem 9rem at 12% -20%, rgba(99, 102, 241, 0.22), transparent 70%),
        radial-gradient(16rem 8rem at 92% -10%, rgba(124, 58, 237, 0.16), transparent 68%),
        linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%);
    }

    .px-upd__shine {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4338ca 0%, #6366f1 45%, #8b5cf6 100%);
      background-size: 200% 100%;
      animation: px-upd-bar 2.8s ease-in-out infinite;
    }

    .px-upd__inner {
      position: relative;
      padding: 2rem 1.85rem 0.35rem;
    }

    .px-upd__icon {
      position: relative;
      width: 3.35rem;
      height: 3.35rem;
      margin-bottom: 1.15rem;
      animation: px-upd-pop 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
    }

    .px-upd__icon-ring {
      position: absolute;
      inset: -5px;
      border-radius: 1.15rem;
      border: 1px solid rgba(99, 102, 241, 0.28);
      animation: px-upd-pulse 2.4s ease-in-out infinite;
    }

    .px-upd__icon-core {
      position: relative;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      color: #eef2ff;
      border-radius: 1rem;
      background: linear-gradient(155deg, #4338ca 0%, #6366f1 48%, #7c3aed 100%);
      box-shadow:
        0 12px 24px rgba(79, 70, 229, 0.32),
        inset 0 1px 0 rgba(255, 255, 255, 0.28);
    }

    .px-upd__kicker {
      margin: 0 0 0.35rem;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #6366f1;
      animation: px-upd-up 0.45s ease 0.12s both;
    }

    .px-upd__title {
      margin: 0 0 0.7rem;
      font-size: 1.375rem;
      font-weight: 700;
      letter-spacing: -0.038em;
      line-height: 1.2;
      color: #0f172a;
      animation: px-upd-up 0.45s ease 0.16s both;
    }

    .px-upd__lead {
      margin: 0 0 1rem;
      font-size: 0.9375rem;
      line-height: 1.55;
      color: #475569;
      animation: px-upd-up 0.45s ease 0.2s both;
    }

    .px-upd__chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.95rem;
      padding: 0.42rem 0.85rem 0.42rem 0.7rem;
      border-radius: 999px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #4338ca;
      animation: px-upd-up 0.45s ease 0.24s both;
    }

    .px-upd__dot {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: #6366f1;
      box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.55);
      animation: px-upd-live 1.8s ease-out infinite;
    }

    .px-upd__hint {
      margin: 0;
      font-size: 0.8125rem;
      line-height: 1.55;
      color: #94a3b8;
      animation: px-upd-up 0.45s ease 0.28s both;
    }

    .px-upd__footer {
      position: relative;
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
      padding: 1.15rem 1.85rem 1.5rem;
      animation: px-upd-up 0.45s ease 0.32s both;
    }

    .px-upd__btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      min-height: 2.85rem;
      padding: 0.7rem 1rem;
      border-radius: 0.9rem;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      cursor: pointer;
      transition:
        transform 0.18s ease,
        box-shadow 0.18s ease,
        background 0.18s ease,
        border-color 0.18s ease;
    }

    .px-upd__btn:focus-visible {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }

    .px-upd__btn--ghost {
      color: #4338ca;
      background: #fff;
      border: 1.5px solid #c7d2fe;
    }

    .px-upd__btn--ghost:hover {
      background: #eef2ff;
      border-color: #a5b4fc;
      transform: translateY(-1px);
    }

    .px-upd__btn--go {
      color: #fff;
      border: 0;
      background: linear-gradient(135deg, #4338ca 0%, #6366f1 48%, #7c3aed 100%);
      box-shadow: 0 10px 22px rgba(79, 70, 229, 0.32);
    }

    .px-upd__btn--go:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 26px rgba(79, 70, 229, 0.4);
    }

    .px-upd__btn:active {
      transform: translateY(0);
    }

    @keyframes px-upd-in {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes px-upd-up {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes px-upd-pop {
      from {
        opacity: 0;
        transform: scale(0.72);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes px-upd-bar {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes px-upd-pulse {
      0%, 100% { opacity: 0.55; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.06); }
    }

    @keyframes px-upd-live {
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5); }
      70% { box-shadow: 0 0 0 7px rgba(99, 102, 241, 0); }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .px-upd,
      .px-upd__shine,
      .px-upd__icon,
      .px-upd__icon-ring,
      .px-upd__dot,
      .px-upd__kicker,
      .px-upd__title,
      .px-upd__lead,
      .px-upd__chip,
      .px-upd__hint,
      .px-upd__footer {
        animation: none;
      }
    }
  `]
})
export class AppUpdateDialogComponent {
  readonly Sparkles = Sparkles;
  readonly CircleArrowUp = CircleArrowUp;

  constructor(
    private dialogRef: MatDialogRef<AppUpdateDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: AppUpdateDialogData
  ) {}

  close(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}

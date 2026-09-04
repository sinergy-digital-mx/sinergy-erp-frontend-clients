import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, RefreshCw, WifiOff } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';
import {
  resolveHttpErrorMessage,
  sanitizeClientErrorMessage,
} from '../../utils/http-error-message.util';

@Component({
  selector: 'app-pollux-error-state',
  standalone: true,
  imports: [LucideAngularModule, ButtonComponent],
  template: `
    <div
      class="px-error"
      [class.px-error--compact]="compact()"
      role="alert">
      <div class="px-error__orb px-error__orb--a" aria-hidden="true"></div>
      <div class="px-error__orb px-error__orb--b" aria-hidden="true"></div>

      <div class="px-error__icon" aria-hidden="true">
        <lucide-icon [img]="WifiOff" [size]="compact() ? 22 : 28"></lucide-icon>
      </div>

      <div class="px-error__copy">
        <h2 class="px-error__title">{{ title() }}</h2>
        <p class="px-error__message">{{ displayMessage() }}</p>
      </div>

      @if (showRetry()) {
        <div class="px-error__actions">
          <app-button
            [text]="retryLabel()"
            [icon]="RefreshCw"
            variant="primary"
            size="sm"
            [fullWidth]="false"
            (clicked)="retry.emit()" />
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .px-error {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.1rem;
      width: 100%;
      min-height: 16rem;
      padding: 2.75rem 1.5rem;
      box-sizing: border-box;
      text-align: center;
      border-radius: 1rem;
      border: 1px solid #c7d2fe;
      background:
        radial-gradient(120% 90% at 10% 0%, rgba(56, 189, 248, 0.12), transparent 55%),
        radial-gradient(100% 80% at 90% 100%, rgba(45, 212, 191, 0.1), transparent 50%),
        #ffffff;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
    }

    .px-error--compact {
      min-height: 11rem;
      padding: 1.75rem 1.25rem;
      gap: 0.85rem;
      border-radius: 0.85rem;
    }

    .px-error__orb {
      position: absolute;
      width: 12rem;
      height: 12rem;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.45;
      pointer-events: none;
      z-index: 0;
    }

    .px-error__orb--a {
      top: -4rem;
      left: -3rem;
      background: #38bdf8;
    }

    .px-error__orb--b {
      right: -3rem;
      bottom: -5rem;
      background: #2dd4bf;
    }

    .px-error__icon {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.75rem;
      height: 3.75rem;
      border-radius: 9999px;
      color: #4338ca;
      background: linear-gradient(180deg, #eef2ff 0%, #e0e7ff 100%);
      box-shadow: inset 0 0 0 1px #c7d2fe;
    }

    .px-error--compact .px-error__icon {
      width: 3rem;
      height: 3rem;
    }

    .px-error__copy {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      max-width: 26rem;
    }

    .px-error__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.02em;
      color: #1e293b;
    }

    .px-error--compact .px-error__title {
      font-size: 1rem;
    }

    .px-error__message {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 1.5;
      color: #64748b;
    }

    .px-error--compact .px-error__message {
      font-size: 0.84rem;
    }

    .px-error__actions {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      margin-top: 0.25rem;
    }
  `,
})
export class PolluxErrorStateComponent {
  /** Error HTTP crudo (HttpErrorResponse, etc.). */
  error = input<unknown>(null);
  /** Mensaje ya resuelto; tiene prioridad sobre `error`. */
  message = input<string>('');
  title = input('Algo salió mal');
  fallback = input('No se pudo completar la acción. Inténtalo de nuevo.');
  retryLabel = input('Reintentar');
  showRetry = input(true);
  compact = input(false);

  retry = output<void>();

  readonly WifiOff = WifiOff;
  readonly RefreshCw = RefreshCw;

  readonly displayMessage = computed(() => {
    const explicit = this.message().trim();
    if (explicit) {
      return sanitizeClientErrorMessage(explicit, this.fallback());
    }
    return resolveHttpErrorMessage(this.error(), this.fallback());
  });
}

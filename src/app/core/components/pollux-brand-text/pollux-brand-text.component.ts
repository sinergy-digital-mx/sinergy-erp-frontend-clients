import { Component, computed, input } from '@angular/core';

let gradientIdCounter = 0;

@Component({
  selector: 'app-pollux-brand-text',
  standalone: true,
  template: `
    <svg
      class="pollux-brand-text"
      [class.pollux-brand-text--lg]="size() === 'lg'"
      [attr.viewBox]="viewBox()"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      [attr.aria-label]="label()">
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          @if (theme() === 'dark') {
            <stop offset="0%" stop-color="#a8d4ff" />
            <stop offset="20%" stop-color="#3b7ddd" />
            <stop offset="45%" stop-color="#5eead4" />
            <stop offset="65%" stop-color="#38bdf8" />
            <stop offset="85%" stop-color="#2dd4bf" />
            <stop offset="100%" stop-color="#a8d4ff" />
          } @else {
            <stop offset="0%" stop-color="#0a2540" />
            <stop offset="20%" stop-color="#1e4a8c" />
            <stop offset="45%" stop-color="#3b7ddd" />
            <stop offset="65%" stop-color="#1ec8d4" />
            <stop offset="85%" stop-color="#2b6fd4" />
            <stop offset="100%" stop-color="#0a2540" />
          }
          <animate attributeName="x1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;200%;100%" dur="10s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <text
        x="2"
        y="28"
        [attr.fill]="'url(#' + gradientId + ')'"
        font-family="Inter, sans-serif"
        [attr.font-size]="fontSize()"
        font-weight="700"
        letter-spacing="0.06em">
        {{ label() }}
      </text>
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }

    .pollux-brand-text {
      display: block;
      height: 2rem;
      width: auto;
    }

    .pollux-brand-text--lg {
      height: 2.35rem;
    }
  `,
})
export class PolluxBrandTextComponent {
  compact = input(false);
  theme = input<'dark' | 'light'>('dark');
  size = input<'md' | 'lg'>('md');

  readonly gradientId = `pollux-grad-${++gradientIdCounter}`;

  readonly label = computed(() => (this.compact() ? 'P' : 'Pollux'));
  readonly fontSize = computed(() => (this.compact() ? 22 : this.size() === 'lg' ? 30 : 26));
  readonly viewBox = computed(() =>
    this.compact() ? '0 0 28 36' : this.size() === 'lg' ? '0 0 108 36' : '0 0 96 36'
  );
}

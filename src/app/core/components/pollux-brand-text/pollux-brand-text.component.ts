import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pollux-brand-text',
  standalone: true,
  template: `
    @if (compact()) {
      <h2
        class="pollux-brand-text pollux-brand-text--compact"
        [class.pollux-brand-text--light]="theme() === 'light'"
        role="img"
        aria-label="P">
        P
      </h2>
    } @else {
      <h2
        class="pollux-brand-text"
        [class.pollux-brand-text--lg]="size() === 'lg'"
        [class.pollux-brand-text--light]="theme() === 'light'"
        role="img"
        [attr.aria-label]="label()">
        {{ label() }}
      </h2>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .pollux-brand-text {
      margin: 0;
      font-size: 1.85rem;
      font-weight: 300;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
      user-select: none;
      color: hsl(214, 45%, 78%);
      animation: pollux-lights 5s 750ms linear infinite;
    }

    .pollux-brand-text--lg {
      font-size: 3rem;
      letter-spacing: 0.08em;
    }

    /* Sidebar colapsado: solo la P, más chica, glow contenido */
    .pollux-brand-text--compact {
      font-size: 1.65rem;
      letter-spacing: 0;
      line-height: 1;
      max-width: 100%;
      overflow: hidden;
      animation: pollux-lights-compact 5s 750ms linear infinite;
    }

    /* Login / fondos claros: base más profunda para que el glow se lea */
    .pollux-brand-text--light {
      color: hsl(214, 55%, 42%);
      animation-name: pollux-lights-light;
    }

    .pollux-brand-text--light.pollux-brand-text--compact {
      animation-name: pollux-lights-light;
    }

    @keyframes pollux-lights {
      0% {
        color: hsl(214, 40%, 78%);
        text-shadow:
          0 0 1em hsla(199, 95%, 55%, 0.25),
          0 0 0.125em hsla(199, 90%, 65%, 0.35),
          -1em -0.125em 0.5em hsla(172, 70%, 50%, 0),
          1em 0.125em 0.5em hsla(214, 75%, 55%, 0);
      }

      30% {
        color: hsl(199, 75%, 90%);
        text-shadow:
          0 0 1em hsla(199, 95%, 55%, 0.55),
          0 0 0.125em hsla(172, 80%, 55%, 0.5),
          -0.5em -0.125em 0.25em hsla(172, 70%, 50%, 0.25),
          0.5em 0.125em 0.25em hsla(214, 80%, 60%, 0.45);
      }

      40% {
        color: hsl(199, 100%, 96%);
        text-shadow:
          0 0 1em hsla(199, 95%, 55%, 0.55),
          0 0 0.125em hsla(172, 90%, 70%, 0.55),
          -0.25em -0.125em 0.125em hsla(172, 70%, 50%, 0.25),
          0.25em 0.125em 0.125em hsla(214, 80%, 60%, 0.45);
      }

      70% {
        color: hsl(199, 75%, 90%);
        text-shadow:
          0 0 1em hsla(199, 95%, 55%, 0.55),
          0 0 0.125em hsla(172, 80%, 55%, 0.5),
          0.5em -0.125em 0.25em hsla(172, 70%, 50%, 0.25),
          -0.5em 0.125em 0.25em hsla(214, 80%, 60%, 0.45);
      }

      100% {
        color: hsl(214, 40%, 78%);
        text-shadow:
          0 0 1em hsla(199, 95%, 55%, 0.25),
          0 0 0.125em hsla(199, 90%, 65%, 0.35),
          1em -0.125em 0.5em hsla(172, 70%, 50%, 0),
          -1em 0.125em 0.5em hsla(214, 75%, 55%, 0);
      }
    }

    /* Glow más corto para la P en sidebar estrecho */
    @keyframes pollux-lights-compact {
      0% {
        color: hsl(214, 40%, 78%);
        text-shadow:
          0 0 0.45em hsla(199, 95%, 55%, 0.3),
          0 0 0.08em hsla(199, 90%, 65%, 0.4);
      }

      30% {
        color: hsl(199, 75%, 90%);
        text-shadow:
          0 0 0.55em hsla(199, 95%, 55%, 0.55),
          0 0 0.1em hsla(172, 80%, 55%, 0.5),
          -0.15em 0 0.2em hsla(172, 70%, 50%, 0.25),
          0.15em 0 0.2em hsla(214, 80%, 60%, 0.4);
      }

      40% {
        color: hsl(199, 100%, 96%);
        text-shadow:
          0 0 0.6em hsla(199, 95%, 55%, 0.6),
          0 0 0.12em hsla(172, 90%, 70%, 0.55),
          -0.1em 0 0.15em hsla(172, 70%, 50%, 0.25),
          0.1em 0 0.15em hsla(214, 80%, 60%, 0.4);
      }

      70% {
        color: hsl(199, 75%, 90%);
        text-shadow:
          0 0 0.55em hsla(199, 95%, 55%, 0.55),
          0 0 0.1em hsla(172, 80%, 55%, 0.5),
          0.15em 0 0.2em hsla(172, 70%, 50%, 0.25),
          -0.15em 0 0.2em hsla(214, 80%, 60%, 0.4);
      }

      100% {
        color: hsl(214, 40%, 78%);
        text-shadow:
          0 0 0.45em hsla(199, 95%, 55%, 0.3),
          0 0 0.08em hsla(199, 90%, 65%, 0.4);
      }
    }

    @keyframes pollux-lights-light {
      0% {
        color: hsl(214, 55%, 40%);
        text-shadow:
          0 0 0.85em hsla(199, 90%, 45%, 0.2),
          0 0 0.1em hsla(214, 70%, 45%, 0.25),
          -0.75em -0.1em 0.4em hsla(172, 65%, 40%, 0),
          0.75em 0.1em 0.4em hsla(199, 80%, 45%, 0);
      }

      30% {
        color: hsl(199, 70%, 38%);
        text-shadow:
          0 0 0.85em hsla(199, 90%, 45%, 0.4),
          0 0 0.1em hsla(172, 70%, 40%, 0.35),
          -0.4em -0.1em 0.2em hsla(172, 65%, 40%, 0.2),
          0.4em 0.1em 0.2em hsla(214, 75%, 45%, 0.35);
      }

      40% {
        color: hsl(199, 85%, 36%);
        text-shadow:
          0 0 1em hsla(199, 90%, 45%, 0.45),
          0 0 0.12em hsla(172, 75%, 42%, 0.4),
          -0.2em -0.1em 0.12em hsla(172, 65%, 40%, 0.2),
          0.2em 0.1em 0.12em hsla(214, 75%, 45%, 0.35);
      }

      70% {
        color: hsl(199, 70%, 38%);
        text-shadow:
          0 0 0.85em hsla(199, 90%, 45%, 0.4),
          0 0 0.1em hsla(172, 70%, 40%, 0.35),
          0.4em -0.1em 0.2em hsla(172, 65%, 40%, 0.2),
          -0.4em 0.1em 0.2em hsla(214, 75%, 45%, 0.35);
      }

      100% {
        color: hsl(214, 55%, 40%);
        text-shadow:
          0 0 0.85em hsla(199, 90%, 45%, 0.2),
          0 0 0.1em hsla(214, 70%, 45%, 0.25),
          0.75em -0.1em 0.4em hsla(172, 65%, 40%, 0),
          -0.75em 0.1em 0.4em hsla(199, 80%, 45%, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pollux-brand-text {
        animation: none;
        color: #a8d4ff;
        text-shadow: 0 0 0.6em hsla(199, 95%, 55%, 0.35);
      }

      .pollux-brand-text--light {
        color: #1e4a8c;
        text-shadow: none;
      }
    }
  `,
})
export class PolluxBrandTextComponent {
  compact = input(false);
  theme = input<'dark' | 'light'>('dark');
  size = input<'md' | 'lg'>('md');

  readonly label = computed(() => (this.compact() ? 'P' : 'POLLUX'));
}

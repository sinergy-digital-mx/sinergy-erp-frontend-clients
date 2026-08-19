import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slim-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="slim-switch"
      [class.slim-switch--on]="checked"
      [class.slim-switch--disabled]="disabled">
      <span class="slim-switch__label">{{ label }}</span>
      <button
        type="button"
        class="slim-switch__control"
        role="switch"
        [attr.aria-checked]="checked"
        [attr.aria-label]="label"
        [disabled]="disabled"
        (click)="toggle()">
        <span class="slim-switch__track">
          <span class="slim-switch__thumb"></span>
        </span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .slim-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      width: 100%;
      min-height: 30px;
      height: 30px;
      padding: 0 0.85rem;
      border: 1px solid #e0e7ff;
      border-radius: 10px;
      background: #fafbff;
      box-sizing: border-box;
    }

    .slim-switch--on {
      border-color: #c4b5fd;
      background: #f5f3ff;
    }

    .slim-switch--disabled {
      opacity: 0.55;
      pointer-events: none;
    }

    .slim-switch__label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
      line-height: 1;
      white-space: nowrap;
    }

    .slim-switch__control {
      flex-shrink: 0;
      width: 2.75rem;
      height: 1.125rem;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
    }

    .slim-switch__track {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 999px;
      background: #d6d3e8;
      position: relative;
      transition: background 160ms ease;
    }

    .slim-switch--on .slim-switch__track {
      background: #6b46c1;
    }

    .slim-switch__thumb {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 16px;
      height: 16px;
      border-radius: 999px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(75, 62, 142, 0.28);
      transition: transform 160ms ease;
    }

    .slim-switch--on .slim-switch__thumb {
      transform: translateX(1.5rem);
    }
  `],
})
export class SlimSwitchComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.checkedChange.emit(!this.checked);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CloseButtonComponent
 * Reusable close button component for modals and dialogs
 * Similar styling to BackButtonComponent
 * Emits click event when clicked
 */
@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="onClick()"
      [title]="title"
      class="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    button:active {
      transform: scale(0.95);
    }
  `]
})
export class CloseButtonComponent {
  /**
   * Title/tooltip for the button
   */
  @Input() title: string = 'Close';

  /**
   * Event emitted when button is clicked
   */
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Thread, ErrorState } from '../../models/email-thread.model';

@Component({
  selector: 'app-thread-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'thread-list-view.component.html',
  styleUrls: ['thread-list-view.component.scss'],
})
export class ThreadListViewComponent {
  @Input() threads: Thread[] = [];
  @Input() isLoading = false;
  @Input() error: ErrorState | null = null;

  @Output() threadSelected = new EventEmitter<string>();
  @Output() retryClicked = new EventEmitter<void>();

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  }

  /**
   * Truncate message preview to 100 characters
   */
  truncatePreview(text: string, maxLength: number = 100): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  /**
   * Select a thread
   */
  selectThread(threadId: string): void {
    this.threadSelected.emit(threadId);
  }

  /**
   * Retry loading threads
   */
  retry(): void {
    this.retryClicked.emit();
  }
}

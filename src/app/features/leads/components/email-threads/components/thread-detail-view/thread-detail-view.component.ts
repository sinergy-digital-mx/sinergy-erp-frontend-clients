import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadDetail, ErrorState, ReplyRequest } from '../../models/email-thread.model';
import { ReplyComposeComponent } from '../reply-compose/reply-compose.component';

@Component({
  selector: 'app-thread-detail-view',
  standalone: true,
  imports: [CommonModule, ReplyComposeComponent],
  templateUrl: 'thread-detail-view.component.html',
  styleUrls: ['thread-detail-view.component.scss'],
})
export class ThreadDetailViewComponent {
  @Input() threadDetail: ThreadDetail | null = null;
  @Input() isLoading = false;
  @Input() error: ErrorState | null = null;
  @Input() isReplyComposeOpen = false;
  @Input() isSendingReply = false;
  @Input() sendError: ErrorState | null = null;

  @Output() backClicked = new EventEmitter<void>();
  @Output() replyClicked = new EventEmitter<void>();
  @Output() replyCancelled = new EventEmitter<void>();
  @Output() replySent = new EventEmitter<ReplyRequest>();
  @Output() retryClicked = new EventEmitter<void>();

  /**
   * Format timestamp for display
   */
  formatTimestamp(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Go back to thread list
   */
  goBack(): void {
    this.backClicked.emit();
  }

  /**
   * Open reply compose
   */
  openReply(): void {
    this.replyClicked.emit();
  }

  /**
   * Cancel reply
   */
  cancelReply(): void {
    this.replyCancelled.emit();
  }

  /**
   * Send reply
   */
  sendReply(request: ReplyRequest): void {
    this.replySent.emit(request);
  }

  /**
   * Retry loading thread detail
   */
  retry(): void {
    this.retryClicked.emit();
  }
}

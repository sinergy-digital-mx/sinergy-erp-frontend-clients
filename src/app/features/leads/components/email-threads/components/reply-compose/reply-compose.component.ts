import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReplyRequest, ErrorState } from '../../models/email-thread.model';

@Component({
  selector: 'app-reply-compose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'reply-compose.component.html',
  styleUrls: ['reply-compose.component.scss'],
})
export class ReplyComposeComponent {
  @Input() isSending = false;
  @Input() error: ErrorState | null = null;

  @Output() replySent = new EventEmitter<ReplyRequest>();
  @Output() replyCancelled = new EventEmitter<void>();

  // Form state
  messageBody = signal('');
  validationError = signal('');

  /**
   * Validate reply
   */
  validateReply(): boolean {
    const body = this.messageBody().trim();

    if (!body) {
      this.validationError.set('Message body is required');
      return false;
    }

    this.validationError.set('');
    return true;
  }

  /**
   * Submit reply
   */
  submit(): void {
    if (!this.validateReply()) {
      return;
    }

    const request: ReplyRequest = {
      body: this.messageBody(),
    };

    this.replySent.emit(request);
  }

  /**
   * Cancel reply
   */
  cancel(): void {
    this.messageBody.set('');
    this.validationError.set('');
    this.replyCancelled.emit();
  }
}

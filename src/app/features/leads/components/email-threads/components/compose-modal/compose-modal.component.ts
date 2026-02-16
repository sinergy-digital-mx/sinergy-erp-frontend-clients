import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComposeEmailRequest, ErrorState } from '../../models/email-thread.model';

@Component({
  selector: 'app-compose-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'compose-modal.component.html',
  styleUrls: ['compose-modal.component.scss'],
})
export class ComposeModalComponent {
  @Input() recipientEmail = '';
  @Input() isSending = false;
  @Input() error: ErrorState | null = null;

  @Output() emailSent = new EventEmitter<ComposeEmailRequest>();
  @Output() modalClosed = new EventEmitter<void>();

  // Form state
  formData = signal({
    recipientEmail: '',
    subject: '',
    body: '',
  });

  validationErrors = signal<{ [key: string]: string }>({});

  ngOnInit(): void {
    // Pre-populate recipient email
    const current = this.formData();
    this.formData.set({
      ...current,
      recipientEmail: this.recipientEmail,
    });
  }

  /**
   * Validate form
   */
  validateForm(): boolean {
    const errors: { [key: string]: string } = {};
    const data = this.formData();

    if (!data.subject || data.subject.trim() === '') {
      errors['subject'] = 'Subject is required';
    }

    if (!data.body || data.body.trim() === '') {
      errors['body'] = 'Message body is required';
    }

    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  /**
   * Submit form
   */
  submit(): void {
    if (!this.validateForm()) {
      return;
    }

    const data = this.formData();
    const request: ComposeEmailRequest = {
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      body: data.body,
    };

    this.emailSent.emit(request);
  }

  /**
   * Cancel and close modal
   */
  cancel(): void {
    this.modalClosed.emit();
  }

  /**
   * Close modal by clicking outside
   */
  closeOnBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }
}

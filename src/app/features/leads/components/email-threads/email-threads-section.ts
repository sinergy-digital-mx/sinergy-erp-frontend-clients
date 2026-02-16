import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailThreadService } from './services/email-thread.service';
import {
  Thread,
  ThreadDetail,
  ComposeEmailRequest,
  ReplyRequest,
  ErrorState,
  EmailThreadsComponentState,
} from './models/email-thread.model';
import { ThreadListViewComponent } from './components/thread-list-view/thread-list-view.component';
import { ThreadDetailViewComponent } from './components/thread-detail-view/thread-detail-view.component';
import { ComposeModalComponent } from './components/compose-modal/compose-modal.component';

@Component({
  selector: 'app-email-threads-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ThreadListViewComponent,
    ThreadDetailViewComponent,
    ComposeModalComponent,
  ],
  templateUrl: 'email-threads-section.html',
  styleUrls: ['email-threads-section.scss'],
})
export class EmailThreadsSection implements OnInit {
  @Input() leadId!: string;
  @Input() leadEmail!: string;

  // State management
  state = signal<EmailThreadsComponentState>({
    threads: [],
    isLoadingThreads: false,
    threadsError: null,
    selectedThreadId: null,
    selectedThreadDetails: null,
    isLoadingThreadDetail: false,
    threadDetailError: null,
    isComposeModalOpen: false,
    isReplyComposeOpen: false,
    isSendingEmail: false,
    isSendingReply: false,
    sendError: null,
    lastRefresh: 0,
  });

  constructor(private emailThreadService: EmailThreadService) {}

  ngOnInit(): void {
    this.loadThreads();
  }

  /**
   * Load threads for the current lead
   */
  loadThreads(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isLoadingThreads: true,
      threadsError: null,
    });

    this.emailThreadService.getThreads(this.leadId).subscribe({
      next: (threads) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          threads: threads,
          isLoadingThreads: false,
          lastRefresh: Date.now(),
        });
      },
      error: (error: ErrorState) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isLoadingThreads: false,
          threadsError: error,
        });
      },
    });
  }

  /**
   * Select a thread and load its details
   */
  selectThread(threadId: string): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      selectedThreadId: threadId,
      isLoadingThreadDetail: true,
      threadDetailError: null,
    });

    this.emailThreadService.getThreadDetail(threadId).subscribe({
      next: (details) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          selectedThreadDetails: details,
          isLoadingThreadDetail: false,
        });
      },
      error: (error: ErrorState) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isLoadingThreadDetail: false,
          threadDetailError: error,
        });
      },
    });
  }

  /**
   * Go back to thread list
   */
  goBackToThreadList(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      selectedThreadId: null,
      selectedThreadDetails: null,
      isReplyComposeOpen: false,
    });
  }

  /**
   * Open compose modal
   */
  openComposeModal(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isComposeModalOpen: true,
    });
  }

  /**
   * Close compose modal
   */
  closeComposeModal(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isComposeModalOpen: false,
      sendError: null,
    });
  }

  /**
   * Send a new email
   */
  sendEmail(request: ComposeEmailRequest): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isSendingEmail: true,
      sendError: null,
    });

    this.emailThreadService.sendEmail(this.leadId, request).subscribe({
      next: () => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isSendingEmail: false,
          isComposeModalOpen: false,
        });
        // Refresh thread list
        this.loadThreads();
      },
      error: (error: ErrorState) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isSendingEmail: false,
          sendError: error,
        });
      },
    });
  }

  /**
   * Send a reply to a thread
   */
  sendReply(request: ReplyRequest): void {
    const currentState = this.state();
    const threadId = currentState.selectedThreadId;

    if (!threadId) {
      return;
    }

    this.state.set({
      ...currentState,
      isSendingReply: true,
      sendError: null,
    });

    this.emailThreadService.sendReply(threadId, request).subscribe({
      next: () => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isSendingReply: false,
          isReplyComposeOpen: false,
        });
        // Refresh thread detail
        this.selectThread(threadId);
      },
      error: (error: ErrorState) => {
        const newState = this.state();
        this.state.set({
          ...newState,
          isSendingReply: false,
          sendError: error,
        });
      },
    });
  }

  /**
   * Retry last failed action
   */
  retryLastAction(): void {
    const currentState = this.state();

    if (currentState.threadsError) {
      this.loadThreads();
    } else if (currentState.threadDetailError && currentState.selectedThreadId) {
      this.selectThread(currentState.selectedThreadId);
    }
  }

  /**
   * Open reply compose
   */
  openReplyCompose(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isReplyComposeOpen: true,
    });
  }

  /**
   * Close reply compose
   */
  closeReplyCompose(): void {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      isReplyComposeOpen: false,
      sendError: null,
    });
  }
}

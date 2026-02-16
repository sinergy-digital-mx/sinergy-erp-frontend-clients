/**
 * Email Thread Models
 * Defines the data structures for email threads, messages, and related operations
 */

export interface Thread {
  id: string;
  leadId: string;
  sender: string;
  senderEmail: string;
  subject: string;
  lastMessageDate: string; // ISO 8601 timestamp
  messagePreview: string;
  messageCount: number;
}

export interface ThreadDetail {
  id: string;
  leadId: string;
  subject: string;
  messages: ThreadMessage[];
}

export interface ThreadMessage {
  id: string;
  sender: string;
  senderEmail: string;
  timestamp: string; // ISO 8601 timestamp
  body: string;
  isOutgoing: boolean; // true if sent by current user
}

export interface ComposeEmailRequest {
  recipientEmail: string;
  subject: string;
  body: string;
}

export interface ReplyRequest {
  body: string;
}

export interface ErrorState {
  type: 'network' | 'server' | 'validation';
  message: string;
  retryable: boolean;
}

export interface EmailThreadsComponentState {
  // Thread list state
  threads: Thread[];
  isLoadingThreads: boolean;
  threadsError: ErrorState | null;

  // Thread detail state
  selectedThreadId: string | null;
  selectedThreadDetails: ThreadDetail | null;
  isLoadingThreadDetail: boolean;
  threadDetailError: ErrorState | null;

  // Modal states
  isComposeModalOpen: boolean;
  isReplyComposeOpen: boolean;

  // Operation states
  isSendingEmail: boolean;
  isSendingReply: boolean;
  sendError: ErrorState | null;

  // UI state
  lastRefresh: number; // timestamp
}

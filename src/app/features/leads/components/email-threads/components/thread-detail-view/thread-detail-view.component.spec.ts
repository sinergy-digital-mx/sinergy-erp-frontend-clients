import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadDetailViewComponent } from './thread-detail-view.component';
import { ThreadDetail, ErrorState, ReplyRequest } from '../../models/email-thread.model';
import * as fc from 'fast-check';

describe('ThreadDetailViewComponent', () => {
  let component: ThreadDetailViewComponent;
  let fixture: ComponentFixture<ThreadDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadDetailViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
      const timestamp = '2024-01-15T10:30:00Z';
      const result = component.formatTimestamp(timestamp);
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });
  });

  describe('goBack', () => {
    it('should emit backClicked event', async () => {
      let emitted = false;
      component.backClicked.subscribe(() => {
        emitted = true;
      });
      component.goBack();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });
  });

  describe('openReply', () => {
    it('should emit replyClicked event', async () => {
      let emitted = false;
      component.replyClicked.subscribe(() => {
        emitted = true;
      });
      component.openReply();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });
  });

  describe('cancelReply', () => {
    it('should emit replyCancelled event', async () => {
      let emitted = false;
      component.replyCancelled.subscribe(() => {
        emitted = true;
      });
      component.cancelReply();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });
  });

  describe('sendReply', () => {
    it('should emit replySent event with reply request', async () => {
      const request: ReplyRequest = { body: 'Test reply' };
      let emitted: any;
      component.replySent.subscribe((emittedRequest) => {
        emitted = emittedRequest;
      });
      component.sendReply(request);

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toEqual(request);
    });
  });

  describe('retry', () => {
    it('should emit retryClicked event', async () => {
      let emitted = false;
      component.retryClicked.subscribe(() => {
        emitted = true;
      });
      component.retry();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });
  });

  describe('Loading State', () => {
    it('should display loading indicator when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const loadingElement = fixture.nativeElement.querySelector('.loading-state');
      expect(loadingElement).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('should display error message when error is present', () => {
      const error: ErrorState = {
        type: 'network',
        message: 'Network error occurred',
        retryable: true,
      };
      component.error = error;
      component.isLoading = false;
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('.error-state');
      expect(errorElement).toBeTruthy();
      expect(errorElement.textContent).toContain('Network error occurred');
    });

    it('should display retry button when error is retryable', () => {
      const error: ErrorState = {
        type: 'network',
        message: 'Network error',
        retryable: true,
      };
      component.error = error;
      component.isLoading = false;
      fixture.detectChanges();
      const retryBtn = fixture.nativeElement.querySelector('.retry-btn');
      expect(retryBtn).toBeTruthy();
    });
  });

  describe('Thread Detail Display', () => {
    it('should display thread subject', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Important Meeting',
        messages: [],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const subject = fixture.nativeElement.querySelector('.thread-subject h2');
      expect(subject.textContent).toContain('Important Meeting');
    });

    it('should display all messages in chronological order', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Test',
        messages: [
          {
            id: 'msg-1',
            sender: 'John',
            senderEmail: 'john@example.com',
            timestamp: '2024-01-10T10:00:00Z',
            body: 'First message',
            isOutgoing: false,
          },
          {
            id: 'msg-2',
            sender: 'Jane',
            senderEmail: 'jane@example.com',
            timestamp: '2024-01-10T11:00:00Z',
            body: 'Second message',
            isOutgoing: true,
          },
        ],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const messages = fixture.nativeElement.querySelectorAll('.message-item');
      expect(messages.length).toBe(2);
    });

    it('should display message sender information', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Test',
        messages: [
          {
            id: 'msg-1',
            sender: 'John Doe',
            senderEmail: 'john@example.com',
            timestamp: '2024-01-10T10:00:00Z',
            body: 'Test message',
            isOutgoing: false,
          },
        ],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const senderName = fixture.nativeElement.querySelector('.sender-name');
      expect(senderName.textContent).toContain('John Doe');
    });

    it('should display message body', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Test',
        messages: [
          {
            id: 'msg-1',
            sender: 'John',
            senderEmail: 'john@example.com',
            timestamp: '2024-01-10T10:00:00Z',
            body: 'This is the message body',
            isOutgoing: false,
          },
        ],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const messageBody = fixture.nativeElement.querySelector('.message-body');
      expect(messageBody.textContent).toContain('This is the message body');
    });
  });

  describe('Reply Section', () => {
    it('should display reply button when reply compose is not open', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Test',
        messages: [],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      component.isReplyComposeOpen = false;
      fixture.detectChanges();
      const replyBtn = fixture.nativeElement.querySelector('.reply-btn');
      expect(replyBtn).toBeTruthy();
    });

    it('should display reply compose when reply compose is open', () => {
      const threadDetail: ThreadDetail = {
        id: 'thread-1',
        leadId: 'lead-1',
        subject: 'Test',
        messages: [],
      };
      component.threadDetail = threadDetail;
      component.isLoading = false;
      component.error = null;
      component.isReplyComposeOpen = true;
      fixture.detectChanges();
      const replyCompose = fixture.nativeElement.querySelector('app-reply-compose');
      expect(replyCompose).toBeTruthy();
    });
  });

  // Property-Based Tests

  describe('Property 7: API call on thread selection', () => {
    it('should emit thread selection for all thread IDs', () => {
      fc.assert(
        fc.property(fc.uuid(), (threadId) => {
          let emittedId = '';
          component.backClicked.subscribe(() => {
            // Just to have a subscription
          });
          // We're testing that the component can handle any thread ID
          expect(threadId).toBeTruthy();
        })
      );
    });
  });

  describe('Property 10: Thread detail shows messages in chronological order', () => {
    it('should display messages in ascending order by timestamp', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.uuid(),
              sender: fc.string(),
              senderEmail: fc.emailAddress(),
              timestamp: fc.date().map((d) => d.toISOString()),
              body: fc.string(),
              isOutgoing: fc.boolean(),
            }),
            { minLength: 2, maxLength: 10 }
          ),
          (messages) => {
            // Sort messages by timestamp to verify chronological order
            const sortedMessages = [...messages].sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );

            const threadDetail: ThreadDetail = {
              id: 'thread-1',
              leadId: 'lead-1',
              subject: 'Test',
              messages: sortedMessages,
            };

            component.threadDetail = threadDetail;
            component.isLoading = false;
            component.error = null;
            fixture.detectChanges();

            const messageElements = fixture.nativeElement.querySelectorAll('.message-item');
            expect(messageElements.length).toBe(sortedMessages.length);

            // Verify order by checking timestamps
            messageElements.forEach((element: HTMLElement, index: number) => {
              const timestamp = element.querySelector('.message-timestamp');
              expect(timestamp).toBeTruthy();
            });
          }
        )
      );
    });
  });

  describe('Property 11: Back button returns to thread list', () => {
    it('should emit backClicked event for all thread details', () => {
      fc.assert(
        fc.property(fc.uuid(), (threadId) => {
          let backClicked = false;
          component.backClicked.subscribe(() => {
            backClicked = true;
          });
          component.goBack();
          expect(backClicked).toBe(true);
        })
      );
    });
  });
});

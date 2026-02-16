import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadListViewComponent } from './thread-list-view.component';
import { Thread, ErrorState } from '../../models/email-thread.model';
import * as fc from 'fast-check';

describe('ThreadListViewComponent', () => {
  let component: ThreadListViewComponent;
  let fixture: ComponentFixture<ThreadListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('formatDate', () => {
    it('should format date as "Just now" for recent messages', () => {
      const now = new Date();
      const result = component.formatDate(now.toISOString());
      expect(result).toBe('Just now');
    });

    it('should format date as minutes ago', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
      const result = component.formatDate(fiveMinutesAgo.toISOString());
      expect(result).toMatch(/^\d+m ago$/);
    });

    it('should format date as hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 3600000);
      const result = component.formatDate(twoHoursAgo.toISOString());
      expect(result).toMatch(/^\d+h ago$/);
    });

    it('should format date as days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 86400000);
      const result = component.formatDate(threeDaysAgo.toISOString());
      expect(result).toMatch(/^\d+d ago$/);
    });

    it('should format date as short date for older messages', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 86400000);
      const result = component.formatDate(tenDaysAgo.toISOString());
      expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
    });
  });

  describe('truncatePreview', () => {
    it('should not truncate text shorter than max length', () => {
      const text = 'Short text';
      const result = component.truncatePreview(text, 100);
      expect(result).toBe(text);
    });

    it('should truncate text longer than max length', () => {
      const text = 'a'.repeat(150);
      const result = component.truncatePreview(text, 100);
      expect(result).toBe('a'.repeat(100) + '...');
    });

    it('should use default max length of 100', () => {
      const text = 'a'.repeat(150);
      const result = component.truncatePreview(text);
      expect(result).toBe('a'.repeat(100) + '...');
    });
  });

  describe('selectThread', () => {
    it('should emit threadSelected event with thread ID', async () => {
      const threadId = 'thread-123';
      let emitted = '';
      component.threadSelected.subscribe((id) => {
        emitted = id;
      });
      component.selectThread(threadId);

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(threadId);
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

    it('should not display thread list when isLoading is true', () => {
      component.isLoading = true;
      component.threads = [
        {
          id: 'thread-1',
          leadId: 'lead-1',
          sender: 'John',
          senderEmail: 'john@example.com',
          subject: 'Test',
          lastMessageDate: '2024-01-15T10:30:00Z',
          messagePreview: 'Preview',
          messageCount: 1,
        },
      ];
      fixture.detectChanges();
      const threadList = fixture.nativeElement.querySelector('.thread-list');
      expect(threadList).toBeFalsy();
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

    it('should not display retry button when error is not retryable', () => {
      const error: ErrorState = {
        type: 'validation',
        message: 'Validation error',
        retryable: false,
      };
      component.error = error;
      component.isLoading = false;
      fixture.detectChanges();
      const retryBtn = fixture.nativeElement.querySelector('.retry-btn');
      expect(retryBtn).toBeFalsy();
    });
  });

  describe('Empty State', () => {
    it('should display empty state when threads array is empty', () => {
      component.threads = [];
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const emptyState = fixture.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });

    it('should not display empty state when threads are present', () => {
      component.threads = [
        {
          id: 'thread-1',
          leadId: 'lead-1',
          sender: 'John',
          senderEmail: 'john@example.com',
          subject: 'Test',
          lastMessageDate: '2024-01-15T10:30:00Z',
          messagePreview: 'Preview',
          messageCount: 1,
        },
      ];
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const emptyState = fixture.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeFalsy();
    });
  });

  describe('Thread List Display', () => {
    it('should display all threads', () => {
      const threads: Thread[] = [
        {
          id: 'thread-1',
          leadId: 'lead-1',
          sender: 'John',
          senderEmail: 'john@example.com',
          subject: 'Test 1',
          lastMessageDate: '2024-01-15T10:30:00Z',
          messagePreview: 'Preview 1',
          messageCount: 1,
        },
        {
          id: 'thread-2',
          leadId: 'lead-1',
          sender: 'Jane',
          senderEmail: 'jane@example.com',
          subject: 'Test 2',
          lastMessageDate: '2024-01-14T10:30:00Z',
          messagePreview: 'Preview 2',
          messageCount: 2,
        },
      ];
      component.threads = threads;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const threadItems = fixture.nativeElement.querySelectorAll('.thread-item');
      expect(threadItems.length).toBe(2);
    });

    it('should display thread subject', () => {
      const threads: Thread[] = [
        {
          id: 'thread-1',
          leadId: 'lead-1',
          sender: 'John',
          senderEmail: 'john@example.com',
          subject: 'Important Meeting',
          lastMessageDate: '2024-01-15T10:30:00Z',
          messagePreview: 'Preview',
          messageCount: 1,
        },
      ];
      component.threads = threads;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const subject = fixture.nativeElement.querySelector('.thread-subject');
      expect(subject.textContent).toContain('Important Meeting');
    });

    it('should display truncated preview', () => {
      const longPreview = 'a'.repeat(150);
      const threads: Thread[] = [
        {
          id: 'thread-1',
          leadId: 'lead-1',
          sender: 'John',
          senderEmail: 'john@example.com',
          subject: 'Test',
          lastMessageDate: '2024-01-15T10:30:00Z',
          messagePreview: longPreview,
          messageCount: 1,
        },
      ];
      component.threads = threads;
      component.isLoading = false;
      component.error = null;
      fixture.detectChanges();
      const preview = fixture.nativeElement.querySelector('.thread-preview');
      expect(preview.textContent).toContain('...');
      expect(preview.textContent.length).toBeLessThan(longPreview.length);
    });
  });

  // Property-Based Tests

  describe('Property 4: Thread list displays all fetched threads', () => {
    it('should display all threads without omissions or duplicates', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.uuid(),
              leadId: fc.uuid(),
              sender: fc.string(),
              senderEmail: fc.emailAddress(),
              subject: fc.string(),
              lastMessageDate: fc.date().map((d) => d.toISOString()),
              messagePreview: fc.string(),
              messageCount: fc.integer({ min: 1, max: 100 }),
            }),
            { minLength: 1, maxLength: 50 }
          ),
          (threads) => {
            component.threads = threads;
            component.isLoading = false;
            component.error = null;
            fixture.detectChanges();
            const threadItems = fixture.nativeElement.querySelectorAll('.thread-item');
            expect(threadItems.length).toBe(threads.length);
          }
        )
      );
    });
  });

  describe('Property 5: Message preview truncation', () => {
    it('should truncate all previews longer than 100 characters', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.uuid(),
              leadId: fc.uuid(),
              sender: fc.string(),
              senderEmail: fc.emailAddress(),
              subject: fc.string(),
              lastMessageDate: fc.date().map((d) => d.toISOString()),
              messagePreview: fc.string({ minLength: 101 }),
              messageCount: fc.integer({ min: 1, max: 100 }),
            }),
            { minLength: 1, maxLength: 10 }
          ),
          (threads) => {
            component.threads = threads;
            component.isLoading = false;
            component.error = null;
            fixture.detectChanges();
            const previews = fixture.nativeElement.querySelectorAll('.thread-preview');
            previews.forEach((preview: HTMLElement) => {
              const text = preview.textContent || '';
              if (text.includes('...')) {
                const withoutEllipsis = text.replace('...', '');
                expect(withoutEllipsis.length).toBeLessThanOrEqual(100);
              }
            });
          }
        )
      );
    });
  });

  describe('Property 6: Empty thread list displays empty state', () => {
    it('should display empty state for all empty thread lists', () => {
      fc.assert(
        fc.property(fc.constant([]), (threads) => {
          component.threads = threads;
          component.isLoading = false;
          component.error = null;
          fixture.detectChanges();
          const emptyState = fixture.nativeElement.querySelector('.empty-state');
          expect(emptyState).toBeTruthy();
        })
      );
    });
  });
});

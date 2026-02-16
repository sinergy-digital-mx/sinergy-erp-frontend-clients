import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplyComposeComponent } from './reply-compose.component';
import { ReplyRequest, ErrorState } from '../../models/email-thread.model';
import * as fc from 'fast-check';

describe('ReplyComposeComponent', () => {
  let component: ReplyComposeComponent;
  let fixture: ComponentFixture<ReplyComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyComposeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReplyComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('validateReply', () => {
    it('should return true for non-empty message body', () => {
      component.messageBody.set('This is a reply');
      const result = component.validateReply();
      expect(result).toBe(true);
      expect(component.validationError()).toBe('');
    });

    it('should return false for empty message body', () => {
      component.messageBody.set('');
      const result = component.validateReply();
      expect(result).toBe(false);
      expect(component.validationError()).toBeTruthy();
    });

    it('should return false for whitespace-only message body', () => {
      component.messageBody.set('   ');
      const result = component.validateReply();
      expect(result).toBe(false);
      expect(component.validationError()).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('should emit replySent event with valid message body', async () => {
      component.messageBody.set('This is a reply');

      let emitted: any;
      component.replySent.subscribe((request) => {
        emitted = request;
      });

      component.submit();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted.body).toBe('This is a reply');
    });

    it('should not emit replySent event when message body is empty', async () => {
      component.messageBody.set('');

      let emitted = false;
      component.replySent.subscribe(() => {
        emitted = true;
      });

      component.submit();

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(emitted).toBe(false);
    });

    it('should set validation error when message body is empty', () => {
      component.messageBody.set('');
      component.submit();
      expect(component.validationError()).toBeTruthy();
    });
  });

  describe('cancel', () => {
    it('should emit replyCancelled event', async () => {
      let emitted = false;
      component.replyCancelled.subscribe(() => {
        emitted = true;
      });
      component.cancel();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });

    it('should clear message body on cancel', () => {
      component.messageBody.set('Some text');
      component.cancel();
      expect(component.messageBody()).toBe('');
    });

    it('should clear validation error on cancel', () => {
      component.validationError.set('Some error');
      component.cancel();
      expect(component.validationError()).toBe('');
    });
  });

  describe('Form Display', () => {
    it('should display message body textarea', () => {
      fixture.detectChanges();
      const textarea = fixture.nativeElement.querySelector('.form-textarea');
      expect(textarea).toBeTruthy();
    });

    it('should display cancel button', () => {
      fixture.detectChanges();
      const cancelBtn = fixture.nativeElement.querySelector('.cancel-btn');
      expect(cancelBtn).toBeTruthy();
    });

    it('should display send button', () => {
      fixture.detectChanges();
      const sendBtn = fixture.nativeElement.querySelector('.send-btn');
      expect(sendBtn).toBeTruthy();
    });

    it('should display validation error message', () => {
      component.validationError.set('Message body is required');
      fixture.detectChanges();
      const errorText = fixture.nativeElement.querySelector('.error-text');
      expect(errorText).toBeTruthy();
      expect(errorText.textContent).toContain('Message body is required');
    });
  });

  describe('Error Display', () => {
    it('should display error message when error is present', () => {
      const error: ErrorState = {
        type: 'network',
        message: 'Network error occurred',
        retryable: true,
      };
      component.error = error;
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('Network error occurred');
    });
  });

  describe('Button States', () => {
    it('should disable send button when isSending is true', () => {
      component.isSending = true;
      fixture.detectChanges();
      const sendBtn = fixture.nativeElement.querySelector('.send-btn');
      expect(sendBtn.disabled).toBe(true);
    });

    it('should disable cancel button when isSending is true', () => {
      component.isSending = true;
      fixture.detectChanges();
      const cancelBtn = fixture.nativeElement.querySelector('.cancel-btn');
      expect(cancelBtn.disabled).toBe(true);
    });

    it('should display loading spinner when isSending is true', () => {
      component.isSending = true;
      fixture.detectChanges();
      const spinner = fixture.nativeElement.querySelector('.pi-spinner');
      expect(spinner).toBeTruthy();
    });
  });

  // Property-Based Tests

  describe('Property 18: Reply button opens reply compose', () => {
    it('should have reply compose visible for all valid states', () => {
      fc.assert(
        fc.property(fc.boolean(), (isSending) => {
          component.isSending = isSending;
          fixture.detectChanges();
          const replyCompose = fixture.nativeElement.querySelector('.reply-compose');
          expect(replyCompose).toBeTruthy();
        })
      );
    });
  });

  describe('Property 19: Reply compose cancel closes without sending', () => {
    it('should not emit replySent when cancel is clicked', () => {
      fc.assert(
        fc.property(fc.string(), (messageBody) => {
          let replySent = false;
          component.replySent.subscribe(() => {
            replySent = true;
          });

          component.messageBody.set(messageBody);
          component.cancel();
          expect(replySent).toBe(false);
        })
      );
    });
  });

  describe('Property 20: Reply validation prevents empty submission', () => {
    it('should reject submission for all empty message bodies', () => {
      fc.assert(
        fc.property(fc.constant(''), (body) => {
          component.messageBody.set(body);
          const result = component.validateReply();
          expect(result).toBe(false);
        })
      );
    });

    it('should reject submission for all whitespace-only message bodies', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }).map((s) => s.replace(/\S/g, ' ')), (body) => {
          component.messageBody.set(body);
          const result = component.validateReply();
          expect(result).toBe(false);
        })
      );
    });
  });

  describe('Property 21: Valid reply send triggers API call', () => {
    it('should emit replySent for all non-empty message bodies', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }), (body) => {
          let emitted = false;
          let emittedBody = '';

          component.replySent.subscribe((request) => {
            emitted = true;
            emittedBody = request.body;
          });

          component.messageBody.set(body);
          component.submit();

          expect(emitted).toBe(true);
          expect(emittedBody).toBe(body);
        })
      );
    });
  });

  describe('Property 23: Loading indicator during reply send', () => {
    it('should display loading indicator for all sending states', () => {
      fc.assert(
        fc.property(fc.boolean(), (isSending) => {
          component.isSending = isSending;
          fixture.detectChanges();

          if (isSending) {
            const spinner = fixture.nativeElement.querySelector('.pi-spinner');
            expect(spinner).toBeTruthy();
          } else {
            const sendIcon = fixture.nativeElement.querySelector('.pi-send');
            expect(sendIcon).toBeTruthy();
          }
        })
      );
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComposeModalComponent } from './compose-modal.component';
import { ComposeEmailRequest, ErrorState } from '../../models/email-thread.model';
import * as fc from 'fast-check';

describe('ComposeModalComponent', () => {
  let component: ComposeModalComponent;
  let fixture: ComponentFixture<ComposeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposeModalComponent);
    component = fixture.componentInstance;
    component.recipientEmail = 'test@example.com';
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should pre-populate recipient email', () => {
      component.recipientEmail = 'recipient@example.com';
      component.ngOnInit();
      expect(component.formData().recipientEmail).toBe('recipient@example.com');
    });
  });

  describe('validateForm', () => {
    it('should return true for valid form', () => {
      component.formData.set({
        recipientEmail: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
      });
      const result = component.validateForm();
      expect(result).toBe(true);
      expect(component.validationErrors()).toEqual({});
    });

    it('should return false when subject is empty', () => {
      component.formData.set({
        recipientEmail: 'test@example.com',
        subject: '',
        body: 'Test Body',
      });
      const result = component.validateForm();
      expect(result).toBe(false);
      expect(component.validationErrors()['subject']).toBeTruthy();
    });

    it('should return false when body is empty', () => {
      component.formData.set({
        recipientEmail: 'test@example.com',
        subject: 'Test Subject',
        body: '',
      });
      const result = component.validateForm();
      expect(result).toBe(false);
      expect(component.validationErrors()['body']).toBeTruthy();
    });

    it('should return false when both subject and body are empty', () => {
      component.formData.set({
        recipientEmail: 'test@example.com',
        subject: '',
        body: '',
      });
      const result = component.validateForm();
      expect(result).toBe(false);
      expect(component.validationErrors()['subject']).toBeTruthy();
      expect(component.validationErrors()['body']).toBeTruthy();
    });

    it('should trim whitespace when validating', () => {
      component.formData.set({
        recipientEmail: 'test@example.com',
        subject: '   ',
        body: '   ',
      });
      const result = component.validateForm();
      expect(result).toBe(false);
    });
  });

  describe('submit', () => {
    it('should emit emailSent event with valid form data', async () => {
      component.formData.set({
        recipientEmail: 'recipient@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
      });

      let emitted: any;
      component.emailSent.subscribe((request) => {
        emitted = request;
      });

      component.submit();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted.recipientEmail).toBe('recipient@example.com');
      expect(emitted.subject).toBe('Test Subject');
      expect(emitted.body).toBe('Test Body');
    });

    it('should not emit emailSent event when form is invalid', async () => {
      component.formData.set({
        recipientEmail: 'recipient@example.com',
        subject: '',
        body: 'Test Body',
      });

      let emitted = false;
      component.emailSent.subscribe(() => {
        emitted = true;
      });

      component.submit();

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(emitted).toBe(false);
    });
  });

  describe('cancel', () => {
    it('should emit modalClosed event', async () => {
      let emitted = false;
      component.modalClosed.subscribe(() => {
        emitted = true;
      });
      component.cancel();

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });
  });

  describe('closeOnBackdropClick', () => {
    it('should close modal when clicking on backdrop', async () => {
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: event.currentTarget, enumerable: true });

      let emitted = false;
      component.modalClosed.subscribe(() => {
        emitted = true;
      });

      component.closeOnBackdropClick(event);

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(emitted).toBe(true);
    });

    it('should not close modal when clicking inside modal', async () => {
      const backdrop = document.createElement('div');
      const modal = document.createElement('div');
      backdrop.appendChild(modal);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: modal, enumerable: true });
      Object.defineProperty(event, 'currentTarget', { value: backdrop, enumerable: true });

      let closed = false;
      component.modalClosed.subscribe(() => {
        closed = true;
      });

      component.closeOnBackdropClick(event);

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(closed).toBe(false);
    });
  });

  describe('Form Display', () => {
    it('should display recipient field with pre-populated email', () => {
      component.recipientEmail = 'test@example.com';
      component.ngOnInit();
      fixture.detectChanges();
      const recipientInput = fixture.nativeElement.querySelector('#recipient');
      expect(recipientInput.value).toBe('test@example.com');
    });

    it('should display subject field', () => {
      fixture.detectChanges();
      const subjectInput = fixture.nativeElement.querySelector('#subject');
      expect(subjectInput).toBeTruthy();
    });

    it('should display message body field', () => {
      fixture.detectChanges();
      const bodyTextarea = fixture.nativeElement.querySelector('#body');
      expect(bodyTextarea).toBeTruthy();
    });

    it('should display validation error for subject', () => {
      component.validationErrors.set({ subject: 'Subject is required' });
      fixture.detectChanges();
      const errorText = fixture.nativeElement.querySelector('.error-text');
      expect(errorText).toBeTruthy();
      expect(errorText.textContent).toContain('Subject is required');
    });

    it('should display validation error for body', () => {
      component.validationErrors.set({ body: 'Message body is required' });
      fixture.detectChanges();
      const errorTexts = fixture.nativeElement.querySelectorAll('.error-text');
      expect(errorTexts.length).toBeGreaterThan(0);
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

  describe('Property 12: Send Email button opens compose modal', () => {
    it('should have compose modal visible for all valid states', () => {
      fc.assert(
        fc.property(fc.emailAddress(), (email) => {
          component.recipientEmail = email;
          component.ngOnInit();
          fixture.detectChanges();
          const recipientInput = fixture.nativeElement.querySelector('#recipient');
          expect(recipientInput.value).toBe(email);
        })
      );
    });
  });

  describe('Property 13: Recipient field pre-populated in compose', () => {
    it('should pre-populate recipient field with lead email for all emails', () => {
      fc.assert(
        fc.property(fc.emailAddress(), (email) => {
          component.recipientEmail = email;
          component.ngOnInit();
          expect(component.formData().recipientEmail).toBe(email);
        })
      );
    });
  });

  describe('Property 14: Compose modal cancel closes without sending', () => {
    it('should not emit emailSent when cancel is clicked', () => {
      fc.assert(
        fc.property(fc.string(), (subject) => {
          let emailSent = false;
          component.emailSent.subscribe(() => {
            emailSent = true;
          });

          component.cancel();
          expect(emailSent).toBe(false);
        })
      );
    });
  });

  describe('Property 15: Compose form validation prevents empty submission', () => {
    it('should reject submission for all empty subject inputs', () => {
      fc.assert(
        fc.property(fc.string(), (body) => {
          component.formData.set({
            recipientEmail: 'test@example.com',
            subject: '',
            body: body,
          });

          const result = component.validateForm();
          expect(result).toBe(false);
        })
      );
    });

    it('should reject submission for all empty body inputs', () => {
      fc.assert(
        fc.property(fc.string(), (subject) => {
          component.formData.set({
            recipientEmail: 'test@example.com',
            subject: subject,
            body: '',
          });

          const result = component.validateForm();
          expect(result).toBe(false);
        })
      );
    });
  });

  describe('Property 16: Valid email send triggers API call', () => {
    it('should emit emailSent for all valid form submissions', () => {
      fc.assert(
        fc.property(
          fc.emailAddress(),
          fc.string({ minLength: 1 }),
          fc.string({ minLength: 1 }),
          (email, subject, body) => {
            let emitted = false;
            component.emailSent.subscribe(() => {
              emitted = true;
            });

            component.formData.set({
              recipientEmail: email,
              subject: subject,
              body: body,
            });

            component.submit();
            expect(emitted).toBe(true);
          }
        )
      );
    });
  });
});

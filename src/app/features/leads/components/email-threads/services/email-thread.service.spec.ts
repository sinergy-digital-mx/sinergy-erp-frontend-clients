import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmailThreadService } from './email-thread.service';
import { Thread, ComposeEmailRequest, ReplyRequest } from '../models/email-thread.model';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('EmailThreadService', () => {
  let service: EmailThreadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailThreadService],
    });
    service = TestBed.inject(EmailThreadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch threads for a lead', async () => {
    const leadId = 'lead-123';
    const mockThreads: Thread[] = [
      {
        id: 'thread-1',
        leadId: 'lead-123',
        sender: 'John Doe',
        senderEmail: 'john@example.com',
        subject: 'Test Subject',
        lastMessageDate: '2024-01-15T10:30:00Z',
        messagePreview: 'This is a test message',
        messageCount: 2,
      },
    ];

    let result: any;
    service.getThreads(leadId).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne(`/api/email-threads?lead_id=${leadId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ threads: mockThreads });

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result.threads).toEqual(mockThreads);
  });

  it('should handle network errors', async () => {
    const leadId = 'lead-123';
    let error: any;

    service.getThreads(leadId).subscribe({
      next: () => {},
      error: (err) => {
        error = err;
      },
    });

    const req = httpMock.expectOne(`/api/email-threads?lead_id=${leadId}`);
    req.error(new ErrorEvent('Network error'), { status: 0 });

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(error.type).toBe('network');
    expect(error.retryable).toBe(true);
  });

  it('should send a new email', async () => {
    const request: ComposeEmailRequest = {
      recipientEmail: 'recipient@example.com',
      subject: 'Test Email',
      body: 'This is a test email',
    };

    const mockThread: Thread = {
      id: 'thread-new',
      leadId: 'lead-123',
      sender: 'Sales Rep',
      senderEmail: 'sales@ourcompany.com',
      subject: 'Test Email',
      lastMessageDate: '2024-01-15T10:30:00Z',
      messagePreview: 'This is a test email',
      messageCount: 1,
    };

    let result: any;
    service.sendEmail(request).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne('/api/email-threads');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(mockThread);

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result).toEqual(mockThread);
  });

  it('should send a reply to a thread', async () => {
    const threadId = 'thread-123';
    const request: ReplyRequest = {
      body: 'This is a reply',
    };

    let result: any;
    service.sendReply(threadId, request).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne(`/api/email-threads/${threadId}/messages`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({
      id: 'msg-new',
      sender: 'Sales Rep',
      senderEmail: 'sales@ourcompany.com',
      timestamp: '2024-01-15T10:30:00Z',
      body: 'This is a reply',
      isOutgoing: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result.body).toBe('This is a reply');
  });
});

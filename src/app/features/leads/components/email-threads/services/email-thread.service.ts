import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, retryWhen, mergeMap, map } from 'rxjs/operators';
import {
  Thread,
  ThreadDetail,
  ComposeEmailRequest,
  ReplyRequest,
  ErrorState,
} from '../models/email-thread.model';

@Injectable({
  providedIn: 'root',
})
export class EmailThreadService {
  private apiUrl = '/api/tenant/email-threads';

  constructor(private http: HttpClient) {}

  /**
   * Fetch email threads for a specific lead
   * GET /api/tenant/email-threads?entityType=lead&entityId={leadId}
   */
  getThreads(leadId: string | number): Observable<Thread[]> {
    return this.http
      .get<{ success: boolean; data: Thread[] }>(`${this.apiUrl}?entityType=lead&entityId=${leadId}`)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            mergeMap((error, index) => {
              // Only retry network errors, not validation errors
              if (this.isNetworkError(error) && index < 2) {
                return timer(2000); // Retry after 2 seconds
              }
              return throwError(() => error);
            })
          )
        ),
        catchError((error) => this.handleError(error)),
        // Extract the data array from the response
        mergeMap((response) => {
          if (response.success && Array.isArray(response.data)) {
            return new Observable<Thread[]>(observer => {
              observer.next(response.data);
              observer.complete();
            });
          }
          return throwError(() => ({
            type: 'validation',
            message: 'Invalid response format',
            retryable: false
          }));
        })
      );
  }

  /**
   * Fetch full thread details + messages
   * GET /api/tenant/email-threads/{threadId}
   */
  getThreadDetail(threadId: string): Observable<ThreadDetail> {
    return this.http.get<ThreadDetail>(`${this.apiUrl}/${threadId}`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error, index) => {
            if (this.isNetworkError(error) && index < 2) {
              return timer(2000);
            }
            return throwError(() => error);
          })
        )
      ),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Send a new email (create new thread)
   * POST /api/tenant/email-threads
   */
  sendEmail(leadId: string, request: ComposeEmailRequest): Observable<Thread> {
    const payload = {
      entityType: 'lead',
      entityId: leadId,
      emailTo: request.recipientEmail,
      subject: request.subject,
      body: request.body,
    };
    return this.http.post<Thread>(this.apiUrl, payload).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Send a reply to an existing thread
   * POST /api/tenant/email-threads/{threadId}/messages
   */
  sendReply(threadId: string, request: ReplyRequest): Observable<ThreadMessage> {
    return this.http
      .post<ThreadMessage>(`${this.apiUrl}/${threadId}/messages`, request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Check if error is a network error
   */
  private isNetworkError(error: any): boolean {
    return (
      error instanceof HttpErrorResponse &&
      (error.status === 0 || error.status >= 500)
    );
  }

  /**
   * Handle HTTP errors and convert to ErrorState
   */
  private handleError(error: any): Observable<never> {
    let errorState: ErrorState;

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        // Network error
        errorState = {
          type: 'network',
          message: 'Unable to connect. Please check your internet connection.',
          retryable: true,
        };
      } else if (error.status >= 500) {
        // Server error
        errorState = {
          type: 'server',
          message: 'Server error. Please try again later.',
          retryable: true,
        };
      } else if (error.status >= 400) {
        // Validation or client error
        errorState = {
          type: 'validation',
          message: error.error?.message || 'Invalid request. Please check your input.',
          retryable: false,
        };
      } else {
        errorState = {
          type: 'server',
          message: 'An unexpected error occurred.',
          retryable: true,
        };
      }
    } else {
      errorState = {
        type: 'server',
        message: 'An unexpected error occurred.',
        retryable: true,
      };
    }

    return throwError(() => errorState);
  }
}

// Import ThreadMessage for the sendReply return type
import { ThreadMessage } from '../models/email-thread.model';

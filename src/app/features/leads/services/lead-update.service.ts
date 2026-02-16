import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Lead } from '../models/lead-group.model';

/**
 * LeadUpdateService
 * Handles updating the lead with the selected group
 */
@Injectable({
  providedIn: 'root',
})
export class LeadUpdateService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Updates a lead with the selected group
   * @param leadId - The ID of the lead to update
   * @param groupId - The ID of the group to assign (or null to clear)
   * @param leadData - Additional lead data to update
   * @returns Observable<Lead> - Updated lead object
   * @throws Error if the API request fails
   */
  updateLeadWithGroup(
    leadId: string,
    groupId: string | null,
    leadData?: any
  ): Observable<Lead> {
    const payload = {
      ...leadData,
      group_id: groupId,
    };

    return this.http.put<Lead>(`${this.api}/leads/${leadId}`, payload).pipe(
      retry(1), // Retry once on failure
      catchError((error) => {
        console.error('Error updating lead:', error);
        return throwError(
          () => new Error('Failed to update lead. Please try again.')
        );
      })
    );
  }
}

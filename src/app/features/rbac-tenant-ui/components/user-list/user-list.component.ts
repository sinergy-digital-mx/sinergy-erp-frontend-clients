import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models';

/**
 * UserListComponent
 * Presentational component for displaying a filtered list of users
 * 
 * Displays users with their email and status
 * Emits userSelected event when a user is clicked
 * 
 * Requirements: 2.2, 2.3, 5.1
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-full">
      <!-- Empty State -->
      <div *ngIf="users.length === 0" class="flex items-center justify-center flex-1">
        <p class="text-gray-500 text-center">No users found</p>
      </div>

      <!-- User List -->
      <div *ngIf="users.length > 0" class="flex-1 overflow-y-auto">
        <button
          *ngFor="let user of users"
          (click)="selectUser(user)"
          [class.bg-blue-50]="isSelected(user.id)"
          class="w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 last:border-b-0"
          [attr.data-testid]="'user-item-' + user.id"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <!-- User Email -->
              <p class="text-sm font-medium text-gray-900 truncate">{{ user.email }}</p>
              
              <!-- User Status Badge -->
              <p class="text-xs text-gray-500 mt-1">
                <span
                  [class]="getStatusBadgeClass(user.status)"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ getNormalizedStatus(user.status) | titlecase }}
                </span>
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .overflow-y-auto {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
      background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 4px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    button:hover {
      background-color: #f9fafb;
    }

    button:focus {
      outline: none;
    }
  `]
})
export class UserListComponent {
  /**
   * List of users to display
   */
  @Input() users: User[] = [];

  /**
   * ID of the currently selected user
   */
  @Input() selectedUserId: string | null = null;

  /**
   * Event emitted when a user is selected
   */
  @Output() userSelected = new EventEmitter<User>();

  /**
   * Handles user selection
   * Emits the selected user
   * @param user - The selected user
   */
  selectUser(user: User): void {
    this.userSelected.emit(user);
  }

  /**
   * Checks if a user is currently selected
   * @param userId - The user ID to check
   * @returns true if the user is selected, false otherwise
   */
  isSelected(userId: string): boolean {
    return this.selectedUserId === userId;
  }

  /**
   * Returns the CSS class for the status badge based on user status
   * @param status - The user status
   * @returns CSS class string for the status badge
   */
  getStatusBadgeClass(status: any): string {
    const normalizedStatus = this.getNormalizedStatus(status);
    switch (normalizedStatus) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Normalizes status from object or string format to string
   * @param status - The status (can be string or object)
   * @returns Normalized status string
   */
  getNormalizedStatus(status: any): string {
    if (typeof status === 'string') {
      return status;
    }
    if (status && typeof status === 'object' && status.code) {
      return status.code;
    }
    return 'active';
  }
}

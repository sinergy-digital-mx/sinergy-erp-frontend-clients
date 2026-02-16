import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Role } from '../../models';

/**
 * RoleListComponent
 * Presentational component for displaying a filtered list of roles
 * 
 * Requirements: 8.2, 8.3
 */
@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto">
      @if (roles$ | async; as roles) {
        @if (roles.length === 0) {
          <div class="p-4 text-center text-gray-500">
            <p>No roles found</p>
          </div>
        } @else {
          @for (role of roles; track role.id) {
            <div class="border-b border-gray-100 last:border-b-0">
              <button
                (click)="onRoleSelected(role)"
                [class.bg-blue-50]="(selectedRoleId$ | async) === role.id"
                class="w-full text-left p-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ role.name }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ role.permissions.length }} permission{{ role.permissions.length !== 1 ? 's' : '' }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          }
        }
      }
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
export class RoleListComponent {
  /**
   * Observable stream of roles to display
   */
  @Input() roles$!: Observable<Role[]>;

  /**
   * Observable stream of the currently selected role ID
   */
  @Input() selectedRoleId$!: Observable<string | null>;

  /**
   * Event emitted when a role is selected
   */
  @Output() roleSelected = new EventEmitter<Role>();

  /**
   * Handles role selection
   * @param role - The selected role
   */
  onRoleSelected(role: Role): void {
    this.roleSelected.emit(role);
  }
}

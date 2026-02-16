import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionPipe } from '../../core/pipes/has-permission.pipe';
import { AuthService } from '../../core/services/auth.service';

/**
 * Example component demonstrating the hasPermission pipe usage.
 * 
 * This component showcases how to use the hasPermission pipe in templates
 * with *ngIf conditions for conditional rendering.
 * 
 * The hasPermission pipe is useful when you need to combine permission checks
 * with other conditional logic, or when you prefer the *ngIf syntax over
 * the *appCan directive.
 * 
 * Key features demonstrated:
 * - Using the pipe in *ngIf conditions
 * - Combining permissions with other conditions
 * - Conditional rendering of UI elements
 * - Real-world scenarios with complex logic
 * 
 * @example
 * // In a parent component or routing configuration:
 * import { PermissionPipeExampleComponent } from './permission-pipe-example.component';
 * 
 * // Use in template:
 * <app-permission-pipe-example></app-permission-pipe-example>
 */
@Component({
  selector: 'app-permission-pipe-example',
  standalone: true,
  imports: [CommonModule, HasPermissionPipe],
  template: `
    <div class="permission-pipe-example">
      <h1>Permission-Based UI Control - Pipe Examples</h1>
      
      <!-- Section 1: Basic Permission Checks with *ngIf -->
      <section class="example-section">
        <h2>1. Basic Permission Checks with *ngIf</h2>
        <p class="description">
          The hasPermission pipe returns a boolean that can be used directly
          in *ngIf conditions for conditional rendering.
        </p>
        
        <!-- Single Permission Check -->
        <div class="example-group">
          <h3>Single Permission Checks</h3>
          <p class="explanation">
            Each button appears only if the user has the specific permission.
          </p>
          
          <div *ngIf="'customers:Create' | hasPermission" class="permission-block">
            <button class="btn btn-primary" (click)="onCreateCustomer()">
              ✓ Create Customer (customers:Create)
            </button>
          </div>
          
          <div *ngIf="'customers:Read' | hasPermission" class="permission-block">
            <button class="btn btn-info" (click)="onReadCustomers()">
              ✓ View Customers (customers:Read)
            </button>
          </div>
          
          <div *ngIf="'customers:Update' | hasPermission" class="permission-block">
            <button class="btn btn-warning" (click)="onUpdateCustomer()">
              ✓ Update Customer (customers:Update)
            </button>
          </div>
          
          <div *ngIf="'customers:Delete' | hasPermission" class="permission-block">
            <button class="btn btn-danger" (click)="onDeleteCustomer()">
              ✓ Delete Customer (customers:Delete)
            </button>
          </div>
        </div>
      </section>
      
      <!-- Section 2: Combining Permissions with Other Conditions -->
      <section class="example-section">
        <h2>2. Combining Permissions with Other Conditions</h2>
        <p class="description">
          The pipe can be combined with other conditions using logical operators
          for more complex conditional logic.
        </p>
        
        <!-- Permission AND Other Condition -->
        <div class="example-group">
          <h3>Permission AND Other Condition</h3>
          <p class="explanation">
            This example shows a button that appears only if the user has
            permission AND a customer is selected.
          </p>
          
          <div *ngIf="selectedCustomer && ('customers:Update' | hasPermission)" 
               class="permission-block">
            <p>Selected Customer: <strong>{{ selectedCustomer.name }}</strong></p>
            <button class="btn btn-warning" (click)="onUpdateSelectedCustomer()">
              Update Selected Customer
            </button>
          </div>
          
          <div *ngIf="!selectedCustomer" class="info-block">
            <p>Select a customer to enable the update button.</p>
          </div>
        </div>
        
        <!-- Permission OR Other Condition -->
        <div class="example-group">
          <h3>Permission OR Other Condition</h3>
          <p class="explanation">
            This example shows content that appears if the user has permission
            OR if they are an admin (simulated).
          </p>
          
          <div *ngIf="('users:Create' | hasPermission) || isAdmin" 
               class="permission-block">
            <p>You have administrative access to user management.</p>
            <button class="btn btn-danger" (click)="onCreateUser()">
              Create New User
            </button>
          </div>
        </div>
        
        <!-- Permission AND NOT Other Condition -->
        <div class="example-group">
          <h3>Permission AND NOT Other Condition</h3>
          <p class="explanation">
            This example shows content that appears if the user has permission
            AND the data is not loading.
          </p>
          
          <div *ngIf="('customers:Export' | hasPermission) && !isLoading" 
               class="permission-block">
            <button class="btn btn-info" (click)="onExportCustomers()">
              📤 Export Customers
            </button>
          </div>
          
          <div *ngIf="isLoading" class="info-block">
            <p>Loading data...</p>
          </div>
        </div>
      </section>
      
      <!-- Section 3: Conditional Rendering of Sections -->
      <section class="example-section">
        <h2>3. Conditional Rendering of Sections</h2>
        <p class="description">
          Use the pipe to conditionally render entire sections or components
          based on user permissions.
        </p>
        
        <!-- Customer Management Section -->
        <div *ngIf="'customers:Read' | hasPermission" class="section-block">
          <h3>Customer Management</h3>
          <p>You have access to customer management features.</p>
          
          <div class="feature-list">
            <div *ngIf="'customers:Create' | hasPermission" class="feature-item">
              <span class="feature-icon">➕</span>
              <span>Create new customers</span>
            </div>
            
            <div *ngIf="'customers:Update' | hasPermission" class="feature-item">
              <span class="feature-icon">✏️</span>
              <span>Edit existing customers</span>
            </div>
            
            <div *ngIf="'customers:Delete' | hasPermission" class="feature-item">
              <span class="feature-icon">🗑️</span>
              <span>Delete customers</span>
            </div>
            
            <div *ngIf="'customers:Export' | hasPermission" class="feature-item">
              <span class="feature-icon">📤</span>
              <span>Export customer data</span>
            </div>
          </div>
        </div>
        
        <!-- Lead Management Section -->
        <div *ngIf="'leads:Read' | hasPermission" class="section-block">
          <h3>Lead Management</h3>
          <p>You have access to lead management features.</p>
          
          <div class="feature-list">
            <div *ngIf="'leads:Create' | hasPermission" class="feature-item">
              <span class="feature-icon">➕</span>
              <span>Create new leads</span>
            </div>
            
            <div *ngIf="'leads:Update' | hasPermission" class="feature-item">
              <span class="feature-icon">✏️</span>
              <span>Update lead information</span>
            </div>
            
            <div *ngIf="'leads:Delete' | hasPermission" class="feature-item">
              <span class="feature-icon">🗑️</span>
              <span>Delete leads</span>
            </div>
          </div>
        </div>
        
        <!-- Admin Section -->
        <div *ngIf="'users:Create' | hasPermission" class="section-block admin-section">
          <h3>Administration</h3>
          <p>You have administrative access.</p>
          
          <div class="feature-list">
            <div *ngIf="'users:Create' | hasPermission" class="feature-item">
              <span class="feature-icon">👤</span>
              <span>Create users</span>
            </div>
            
            <div *ngIf="'users:Update' | hasPermission" class="feature-item">
              <span class="feature-icon">⚙️</span>
              <span>Manage user settings</span>
            </div>
            
            <div *ngIf="'users:Delete' | hasPermission" class="feature-item">
              <span class="feature-icon">🔐</span>
              <span>Delete users</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Section 4: Real-World Scenario - Form with Conditional Fields -->
      <section class="example-section">
        <h2>4. Real-World Scenario: Form with Conditional Fields</h2>
        <p class="description">
          This example demonstrates a form where certain fields and actions
          are conditionally rendered based on user permissions.
        </p>
        
        <div class="form-container">
          <h3>Customer Form</h3>
          
          <div class="form-group">
            <label>Customer Name</label>
            <input type="text" placeholder="Enter customer name" class="form-input">
          </div>
          
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter email address" class="form-input">
          </div>
          
          <!-- Conditional Field: Phone (only if user can update) -->
          <div *ngIf="'customers:Update' | hasPermission" class="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" class="form-input">
            <small>This field is only visible to users with update permissions.</small>
          </div>
          
          <!-- Conditional Field: Internal Notes (only if user can delete/admin) -->
          <div *ngIf="'customers:Delete' | hasPermission" class="form-group">
            <label>Internal Notes</label>
            <textarea placeholder="Enter internal notes" class="form-textarea"></textarea>
            <small>This field is only visible to administrators.</small>
          </div>
          
          <!-- Form Actions -->
          <div class="form-actions">
            <button *ngIf="'customers:Create' | hasPermission" 
                    class="btn btn-primary"
                    (click)="onSaveCustomer()">
              Save Customer
            </button>
            
            <button *ngIf="'customers:Delete' | hasPermission" 
                    class="btn btn-danger"
                    (click)="onDeleteCustomer()">
              Delete Customer
            </button>
            
            <button class="btn btn-secondary" (click)="onCancel()">
              Cancel
            </button>
          </div>
        </div>
      </section>
      
      <!-- Section 5: Comparison with Directive -->
      <section class="example-section">
        <h2>5. Pipe vs Directive Comparison</h2>
        <p class="description">
          Both the pipe and directive can be used for permission-based rendering.
          Choose based on your specific use case.
        </p>
        
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Pipe (*ngIf)</th>
                <th>Directive (*appCan)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Syntax</td>
                <td>*ngIf="'permission' | hasPermission"</td>
                <td>*appCan="'permission'"</td>
              </tr>
              <tr>
                <td>Combine with other conditions</td>
                <td>✓ Easy (use && and ||)</td>
                <td>✗ Not directly</td>
              </tr>
              <tr>
                <td>Single permission check</td>
                <td>✓ Good</td>
                <td>✓ Good</td>
              </tr>
              <tr>
                <td>Multiple permissions (OR)</td>
                <td>✓ Possible (verbose)</td>
                <td>✓ Easy (array syntax)</td>
              </tr>
              <tr>
                <td>Readability</td>
                <td>✓ Clear intent</td>
                <td>✓ Concise</td>
              </tr>
              <tr>
                <td>Performance</td>
                <td>✓ Good</td>
                <td>✓ Good</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- Section 6: Best Practices -->
      <section class="example-section">
        <h2>6. Best Practices for Using the Pipe</h2>
        <div class="best-practices">
          <div class="practice">
            <h3>✓ Use for Complex Conditions</h3>
            <p>
              Use the pipe when you need to combine permissions with other
              conditions using logical operators.
            </p>
          </div>
          
          <div class="practice">
            <h3>✓ Keep Conditions Simple</h3>
            <p>
              If conditions become too complex, consider extracting them to
              a component property for better readability.
            </p>
          </div>
          
          <div class="practice">
            <h3>✓ Use Directive for Simple Cases</h3>
            <p>
              For simple permission checks without additional conditions,
              prefer the *appCan directive for cleaner syntax.
            </p>
          </div>
          
          <div class="practice">
            <h3>✓ Provide User Feedback</h3>
            <p>
              When elements are hidden due to permissions, consider showing
              a message explaining why the user can't see certain features.
            </p>
          </div>
          
          <div class="practice">
            <h3>✓ Test Permission Logic</h3>
            <p>
              Write unit tests to verify that permission checks work correctly
              in your components.
            </p>
          </div>
        </div>
      </section>
      
      <!-- Current Permissions Display -->
      <section class="example-section">
        <h2>Current User Permissions</h2>
        <p class="description">
          These are the permissions currently assigned to the logged-in user.
          The pipe uses these permissions to determine what to render.
        </p>
        
        <div class="permissions-display">
          <div *ngIf="(currentPermissions$ | async) as permissions">
            <div *ngIf="(permissions | keyvalue).length > 0; else noPermissions">
              <p><strong>Total Permissions: {{ (permissions | keyvalue).length }}</strong></p>
              <ul class="permissions-list">
                <li *ngFor="let permission of getPermissionsArray(permissions)">
                  {{ permission }}
                </li>
              </ul>
            </div>
            <ng-template #noPermissions>
              <p class="no-permissions">No permissions assigned to this user.</p>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .permission-pipe-example {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    
    h1 {
      color: #333;
      border-bottom: 3px solid #28a745;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    .example-section {
      margin-bottom: 40px;
      padding: 20px;
      background-color: #f8f9fa;
      border-left: 4px solid #28a745;
      border-radius: 4px;
    }
    
    h2 {
      color: #28a745;
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .description {
      color: #666;
      font-style: italic;
      margin-bottom: 20px;
    }
    
    .example-group {
      margin-bottom: 25px;
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    h3 {
      color: #333;
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .explanation {
      color: #666;
      font-size: 0.95em;
      margin-bottom: 15px;
    }
    
    .permission-block {
      padding: 12px;
      background-color: #e8f5e9;
      border-left: 3px solid #28a745;
      margin-bottom: 10px;
      border-radius: 2px;
    }
    
    .info-block {
      padding: 12px;
      background-color: #e3f2fd;
      border-left: 3px solid #2196f3;
      margin-bottom: 10px;
      border-radius: 2px;
      color: #1565c0;
    }
    
    .btn {
      padding: 8px 16px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.95em;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #0056b3;
    }
    
    .btn-warning {
      background-color: #ffc107;
      color: #333;
    }
    
    .btn-warning:hover {
      background-color: #e0a800;
    }
    
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    
    .btn-danger:hover {
      background-color: #c82333;
    }
    
    .btn-info {
      background-color: #17a2b8;
      color: white;
    }
    
    .btn-info:hover {
      background-color: #138496;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    
    .section-block {
      padding: 20px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
      margin-bottom: 20px;
    }
    
    .section-block h3 {
      margin-top: 0;
      color: #28a745;
    }
    
    .admin-section {
      background-color: #fff3cd;
      border-color: #ffc107;
    }
    
    .admin-section h3 {
      color: #856404;
    }
    
    .feature-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    .feature-icon {
      font-size: 1.5em;
      margin-right: 10px;
    }
    
    .form-container {
      padding: 20px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }
    
    .form-input,
    .form-textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.95em;
    }
    
    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #28a745;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .form-group small {
      display: block;
      margin-top: 5px;
      color: #666;
      font-size: 0.85em;
    }
    
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }
    
    .comparison-table {
      overflow-x: auto;
      margin-top: 15px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }
    
    table thead {
      background-color: #f8f9fa;
    }
    
    table th,
    table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    table th {
      font-weight: 600;
      color: #333;
    }
    
    table tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .best-practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    
    .practice {
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border-left: 4px solid #28a745;
    }
    
    .practice h3 {
      margin-top: 0;
      color: #28a745;
    }
    
    .permissions-display {
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    .permissions-list {
      list-style: none;
      padding: 0;
      margin: 10px 0 0 0;
    }
    
    .permissions-list li {
      padding: 8px 12px;
      background-color: #e8f5e9;
      border-left: 3px solid #28a745;
      margin-bottom: 5px;
      border-radius: 2px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    .no-permissions {
      color: #666;
      font-style: italic;
    }
  `]
})
export class PermissionPipeExampleComponent implements OnInit {
  /**
   * Observable of current user permissions.
   * Used to display the current permissions in the template.
   */
  currentPermissions$: any;

  /**
   * Flag to simulate loading state for conditional rendering examples.
   */
  isLoading = false;

  /**
   * Flag to simulate admin status for conditional rendering examples.
   */
  isAdmin = false;

  /**
   * Selected customer for the conditional rendering example.
   */
  selectedCustomer: any = null;

  constructor(private authService: AuthService) {
    this.currentPermissions$ = this.authService.permissions$;
  }

  ngOnInit(): void {
    // Component initialization
    // The pipe will automatically react to permission changes
  }

  /**
   * Helper method to convert Set to array for *ngFor iteration.
   * 
   * @param permissions - The Set of permission strings
   * @returns Array of permission strings sorted alphabetically
   */
  getPermissionsArray(permissions: Set<string> | unknown): string[] {
    if (permissions instanceof Set) {
      return Array.from(permissions).sort();
    }
    return [];
  }

  // Action handlers - these would typically call services to perform operations

  onCreateCustomer(): void {
    console.log('Create Customer action triggered');
  }

  onReadCustomers(): void {
    console.log('Read Customers action triggered');
  }

  onUpdateCustomer(): void {
    console.log('Update Customer action triggered');
  }

  onUpdateSelectedCustomer(): void {
    console.log('Update Selected Customer action triggered', this.selectedCustomer);
  }

  onDeleteCustomer(): void {
    console.log('Delete Customer action triggered');
  }

  onCreateUser(): void {
    console.log('Create User action triggered');
  }

  onExportCustomers(): void {
    console.log('Export Customers action triggered');
  }

  onSaveCustomer(): void {
    console.log('Save Customer action triggered');
  }

  onCancel(): void {
    console.log('Cancel action triggered');
  }
}

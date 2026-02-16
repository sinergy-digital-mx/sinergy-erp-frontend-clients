import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDirective } from '../../core/directives/can.directive';
import { AuthService } from '../../core/services/auth.service';

/**
 * Example component demonstrating the appCan directive usage.
 * Shows all three directive syntaxes with real-world scenarios.
 */
@Component({
  selector: 'app-permission-directive-example',
  standalone: true,
  imports: [CommonModule, CanDirective],
  template: `
    <div class="permission-directive-example">
      <h1>Permission-Based UI Control - Directive Examples</h1>
      
      <!-- Section 1: Object Syntax Examples -->
      <section class="example-section">
        <h2>1. Object Syntax</h2>
        <p class="description">
          The object syntax provides explicit action and entity specification.
          This is the most readable and type-safe approach.
        </p>
        
        <!-- Create Button Example -->
        <div class="example-group">
          <h3>Create Operations</h3>
          <p class="explanation">
            These buttons only appear if the user has the corresponding Create permission.
          </p>
          
          <button 
            *appCan="{ action: 'Create', entity: 'customers' }"
            class="btn btn-primary"
            (click)="onCreateCustomer()">
            ✓ Create Customer (requires customers:Create)
          </button>
          
          <button 
            *appCan="{ action: 'Create', entity: 'leads' }"
            class="btn btn-primary"
            (click)="onCreateLead()">
            ✓ Create Lead (requires leads:Create)
          </button>
          
          <button 
            *appCan="{ action: 'Create', entity: 'users' }"
            class="btn btn-primary"
            (click)="onCreateUser()">
            ✓ Create User (requires users:Create)
          </button>
        </div>
        
        <!-- Update Button Example -->
        <div class="example-group">
          <h3>Update Operations</h3>
          <p class="explanation">
            These buttons only appear if the user has the corresponding Update permission.
          </p>
          
          <button 
            *appCan="{ action: 'Update', entity: 'customers' }"
            class="btn btn-warning"
            (click)="onUpdateCustomer()">
            ✓ Update Customer (requires customers:Update)
          </button>
          
          <button 
            *appCan="{ action: 'Update', entity: 'leads' }"
            class="btn btn-warning"
            (click)="onUpdateLead()">
            ✓ Update Lead (requires leads:Update)
          </button>
        </div>
        
        <!-- Delete Button Example -->
        <div class="example-group">
          <h3>Delete Operations</h3>
          <p class="explanation">
            These buttons only appear if the user has the corresponding Delete permission.
            Delete operations are typically restricted to admin users.
          </p>
          
          <button 
            *appCan="{ action: 'Delete', entity: 'customers' }"
            class="btn btn-danger"
            (click)="onDeleteCustomer()">
            ✓ Delete Customer (requires customers:Delete)
          </button>
          
          <button 
            *appCan="{ action: 'Delete', entity: 'leads' }"
            class="btn btn-danger"
            (click)="onDeleteLead()">
            ✓ Delete Lead (requires leads:Delete)
          </button>
        </div>
      </section>
      
      <!-- Section 2: String Syntax Examples -->
      <section class="example-section">
        <h2>2. String Syntax</h2>
        <p class="description">
          The string syntax uses the "entity:Action" format directly.
          This is more concise but less type-safe than the object syntax.
        </p>
        
        <!-- Menu Section Example -->
        <div class="example-group">
          <h3>Customer Management Menu</h3>
          <p class="explanation">
            This menu section demonstrates conditional rendering of menu items
            based on individual permissions using string syntax.
          </p>
          
          <nav class="menu">
            <button 
              *appCan="'customers:Read'"
              class="menu-item"
              (click)="onViewCustomers()">
              📋 View Customers (requires customers:Read)
            </button>
            
            <button 
              *appCan="'customers:Create'"
              class="menu-item"
              (click)="onCreateCustomer()">
              ➕ Add New Customer (requires customers:Create)
            </button>
            
            <button 
              *appCan="'customers:Update'"
              class="menu-item"
              (click)="onUpdateCustomer()">
              ✏️ Edit Customer (requires customers:Update)
            </button>
            
            <button 
              *appCan="'customers:Delete'"
              class="menu-item"
              (click)="onDeleteCustomer()">
              🗑️ Delete Customer (requires customers:Delete)
            </button>
            
            <button 
              *appCan="'customers:Export'"
              class="menu-item"
              (click)="onExportCustomers()">
              📤 Export Customers (requires customers:Export)
            </button>
          </nav>
        </div>
        
        <!-- Admin Panel Example -->
        <div class="example-group">
          <h3>Admin Operations</h3>
          <p class="explanation">
            These operations are typically restricted to administrators.
          </p>
          
          <button 
            *appCan="'users:Create'"
            class="btn btn-danger"
            (click)="onCreateUser()">
            ✓ Create User (requires users:Create)
          </button>
          
          <button 
            *appCan="'users:Delete'"
            class="btn btn-danger"
            (click)="onDeleteUser()">
            ✓ Delete User (requires users:Delete)
          </button>
        </div>
      </section>
      
      <!-- Section 3: Array Syntax Examples (OR Logic) -->
      <section class="example-section">
        <h2>3. Array Syntax (OR Logic)</h2>
        <p class="description">
          The array syntax allows multiple permissions with OR logic.
          The element renders if the user has ANY of the listed permissions.
        </p>
        
        <!-- Edit Section Example -->
        <div class="example-group">
          <h3>Edit Section (Create OR Update)</h3>
          <p class="explanation">
            This section appears if the user can either create or update customers.
            This is useful for grouping related operations.
          </p>
          
          <div 
            *appCan="['customers:Create', 'customers:Update']"
            class="edit-section">
            <h4>Customer Management</h4>
            <p>You have permission to create or update customers.</p>
            
            <button 
              *appCan="{ action: 'Create', entity: 'customers' }"
              class="btn btn-primary"
              (click)="onCreateCustomer()">
              Create New Customer
            </button>
            
            <button 
              *appCan="{ action: 'Update', entity: 'customers' }"
              class="btn btn-warning"
              (click)="onUpdateCustomer()">
              Update Existing Customer
            </button>
          </div>
        </div>
        
        <!-- Admin Section Example -->
        <div class="example-group">
          <h3>Admin Section (Multiple Admin Permissions)</h3>
          <p class="explanation">
            This section appears if the user has any admin-level permissions.
            This demonstrates grouping multiple related permissions.
          </p>
          
          <div 
            *appCan="['users:Create', 'users:Update', 'users:Delete']"
            class="admin-section">
            <h4>User Administration</h4>
            <p>You have administrative access to user management.</p>
            
            <button 
              *appCan="'users:Create'"
              class="btn btn-danger"
              (click)="onCreateUser()">
              Create User
            </button>
            
            <button 
              *appCan="'users:Update'"
              class="btn btn-danger"
              (click)="onUpdateUser()">
              Update User
            </button>
            
            <button 
              *appCan="'users:Delete'"
              class="btn btn-danger"
              (click)="onDeleteUser()">
              Delete User
            </button>
          </div>
        </div>
        
        <!-- Report Section Example -->
        <div class="example-group">
          <h3>Report Section (Download OR Export)</h3>
          <p class="explanation">
            This section appears if the user can download or export reports.
          </p>
          
          <div 
            *appCan="['reports:Download', 'reports:Export']"
            class="report-section">
            <h4>Report Options</h4>
            <p>You can access report generation features.</p>
            
            <button 
              *appCan="'reports:Download'"
              class="btn btn-info"
              (click)="onDownloadReport()">
              Download Report
            </button>
            
            <button 
              *appCan="'reports:Export'"
              class="btn btn-info"
              (click)="onExportReport()">
              Export Report
            </button>
          </div>
        </div>
      </section>
      
      <!-- Section 4: Real-World Scenario - Data Table with Conditional Columns -->
      <section class="example-section">
        <h2>4. Real-World Scenario: Data Table with Conditional Actions</h2>
        <p class="description">
          This example demonstrates a realistic data table where action buttons
          are conditionally rendered based on user permissions.
        </p>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let customer of sampleCustomers">
                <td [textContent]="customer.id"></td>
                <td [textContent]="customer.name"></td>
                <td [textContent]="customer.email"></td>
                <td class="actions">
                  <button 
                    *appCan="'customers:Read'"
                    class="btn btn-sm btn-info"
                    (click)="onViewCustomer(customer)">
                    View
                  </button>
                  
                  <button 
                    *appCan="'customers:Update'"
                    class="btn btn-sm btn-warning"
                    (click)="onEditCustomer(customer)">
                    Edit
                  </button>
                  
                  <button 
                    *appCan="'customers:Delete'"
                    class="btn btn-sm btn-danger"
                    (click)="onDeleteCustomer(customer)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- Section 5: Best Practices -->
      <section class="example-section">
        <h2>5. Best Practices</h2>
        <div class="best-practices">
          <div class="practice">
            <h3>Use Object Syntax for Clarity</h3>
            <p>Prefer the object syntax for better readability and type safety.</p>
          </div>
          
          <div class="practice">
            <h3>Use Array Syntax for Related Permissions</h3>
            <p>Use array syntax when grouping related permissions with OR logic.</p>
          </div>
          
          <div class="practice">
            <h3>Combine with ngIf for Complex Logic</h3>
            <p>Use the hasPermission pipe with ngIf for more complex conditional logic.</p>
          </div>
          
          <div class="practice">
            <h3>Group Related Operations</h3>
            <p>Group related operations to improve UX and reduce visual clutter.</p>
          </div>
          
          <div class="practice">
            <h3>Provide User Feedback</h3>
            <p>When elements are hidden, consider providing feedback to users.</p>
          </div>
        </div>
      </section>
      
      <!-- Current Permissions Display -->
      <section class="example-section">
        <h2>Current User Permissions</h2>
        <p class="description">
          These are the permissions currently assigned to the logged-in user.
        </p>
        
        <div class="permissions-display">
          <div *ngIf="(currentPermissions$ | async) as permissions">
            <div *ngIf="(permissions | keyvalue).length > 0; else noPermissions">
              <p><strong>Total Permissions: <span [textContent]="(permissions | keyvalue).length"></span></strong></p>
              <ul class="permissions-list">
                <li *ngFor="let permission of getPermissionsArray(permissions)" [textContent]="permission">
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
    .permission-directive-example {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    h1 {
      color: #333;
      border-bottom: 3px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    .example-section {
      margin-bottom: 40px;
      padding: 20px;
      background-color: #f8f9fa;
      border-left: 4px solid #007bff;
      border-radius: 4px;
    }
    
    h2 {
      color: #007bff;
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
    
    .btn-sm {
      padding: 4px 8px;
      font-size: 0.85em;
      margin-right: 5px;
    }
    
    .menu {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .menu-item {
      padding: 10px 15px;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s ease;
    }
    
    .menu-item:hover {
      background-color: #dee2e6;
      border-color: #adb5bd;
    }
    
    .edit-section,
    .admin-section,
    .report-section {
      padding: 15px;
      background-color: #e7f3ff;
      border: 1px solid #b3d9ff;
      border-radius: 4px;
      margin-top: 10px;
    }
    
    .edit-section h4,
    .admin-section h4,
    .report-section h4 {
      margin-top: 0;
      color: #004085;
    }
    
    .table-container {
      overflow-x: auto;
      margin-top: 15px;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }
    
    .data-table thead {
      background-color: #f8f9fa;
    }
    
    .data-table th,
    .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    .data-table th {
      font-weight: 600;
      color: #333;
    }
    
    .data-table tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .actions {
      white-space: nowrap;
    }
    
    .best-practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
      background-color: #e7f3ff;
      border-left: 3px solid #007bff;
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
export class PermissionDirectiveExampleComponent implements OnInit {
  currentPermissions$: any;

  sampleCustomers = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com' },
    { id: 2, name: 'Tech Innovations Inc', email: 'info@techinnovations.com' },
    { id: 3, name: 'Global Solutions Ltd', email: 'support@globalsolutions.com' },
  ];

  constructor(private authService: AuthService) {
    this.currentPermissions$ = this.authService.permissions$;
  }

  ngOnInit(): void {
    // Component initialization
  }

  getPermissionsArray(permissions: Set<string> | unknown): string[] {
    if (permissions instanceof Set) {
      return Array.from(permissions).sort();
    }
    return [];
  }

  onCreateCustomer(): void {
    console.log('Create Customer action triggered');
  }

  onCreateLead(): void {
    console.log('Create Lead action triggered');
  }

  onCreateUser(): void {
    console.log('Create User action triggered');
  }

  onUpdateCustomer(customer?: any): void {
    console.log('Update Customer action triggered', customer);
  }

  onUpdateLead(): void {
    console.log('Update Lead action triggered');
  }

  onUpdateUser(): void {
    console.log('Update User action triggered');
  }

  onDeleteCustomer(customer?: any): void {
    console.log('Delete Customer action triggered', customer);
  }

  onDeleteLead(): void {
    console.log('Delete Lead action triggered');
  }

  onDeleteUser(): void {
    console.log('Delete User action triggered');
  }

  onViewCustomers(): void {
    console.log('View Customers action triggered');
  }

  onViewCustomer(customer: any): void {
    console.log('View Customer action triggered', customer);
  }

  onEditCustomer(customer: any): void {
    console.log('Edit Customer action triggered', customer);
  }

  onExportCustomers(): void {
    console.log('Export Customers action triggered');
  }

  onDownloadReport(): void {
    console.log('Download Report action triggered');
  }

  onExportReport(): void {
    console.log('Export Report action triggered');
  }
}

# Design Document: Modal UI Improvements

## Overview

This design document specifies the visual and structural improvements to confirmation modals in the RBAC application. The improvements focus on enhancing the ConfirmDialogComponent to provide better visual hierarchy, clearer action differentiation, and improved user experience for role assignment and deletion operations.

The design maintains compatibility with Angular Material while introducing custom styling for buttons, spacing, and typography. The implementation will use SCSS for styling and Angular Material's dialog system as the foundation.

## Architecture

### Component Structure

The improved modal system consists of:

1. **ConfirmDialogComponent** (Enhanced)
   - Base confirmation dialog component
   - Handles both role assignment and deletion scenarios
   - Configurable title, message, and button labels
   - Supports different button color schemes (primary/warning)

2. **Modal Styling System**
   - Centralized SCSS variables for colors, spacing, and typography
   - Reusable button styling classes
   - Responsive design utilities

3. **Dialog Configuration Interface**
   - Defines modal appearance and behavior
   - Specifies button labels, colors, and actions
   - Supports context-specific styling

### Design Decisions

- **Material Design Foundation**: Leverage Angular Material's dialog system for accessibility and consistency
- **Custom Button Styling**: Override Material buttons with custom styling for better visual hierarchy
- **CSS Variables**: Use CSS custom properties for theme colors to support future theming
- **SCSS Mixins**: Create reusable mixins for button states and spacing patterns
- **Semantic HTML**: Maintain proper heading hierarchy and semantic structure

## Components and Interfaces

### ConfirmDialogComponent

**Purpose**: Display a confirmation dialog with customizable title, message, and action buttons.

**Inputs**:
```typescript
@Input() title: string;              // Modal title
@Input() message: string;            // Modal message/content
@Input() primaryButtonLabel: string; // Primary action button label
@Input() secondaryButtonLabel: string; // Secondary action button label
@Input() isPrimaryButtonWarning: boolean; // Use warning color for primary button
@Input() primaryButtonDisabled: boolean; // Disable primary button
```

**Outputs**:
```typescript
@Output() primaryAction = new EventEmitter<void>();  // Emitted when primary button clicked
@Output() secondaryAction = new EventEmitter<void>(); // Emitted when secondary button clicked
```

**Template Structure**:
```
<div class="confirm-dialog-container">
  <div class="dialog-header">
    <h2 class="dialog-title">{{ title }}</h2>
  </div>
  
  <div class="dialog-content">
    <p class="dialog-message">{{ message }}</p>
  </div>
  
  <div class="dialog-actions">
    <button class="btn btn-secondary" (click)="onSecondaryAction()">
      {{ secondaryButtonLabel }}
    </button>
    <button class="btn btn-primary" 
            [class.btn-warning]="isPrimaryButtonWarning"
            [disabled]="primaryButtonDisabled"
            (click)="onPrimaryAction()">
      {{ primaryButtonLabel }}
    </button>
  </div>
</div>
```

### Button Styling Classes

**Primary Button** (`.btn-primary`):
- Background: Primary brand color (e.g., #1976d2)
- Text: White
- Padding: 12px 24px
- Border radius: 4px
- Hover: Darker shade of primary color
- Disabled: 50% opacity, cursor not-allowed

**Secondary Button** (`.btn-secondary`):
- Background: Light gray (#f5f5f5)
- Text: Dark gray (#333)
- Padding: 12px 24px
- Border radius: 4px
- Hover: Slightly darker gray (#e0e0e0)
- Disabled: 50% opacity, cursor not-allowed

**Warning Button** (`.btn-warning`):
- Background: Warning color (e.g., #d32f2f for red)
- Text: White
- Hover: Darker shade of warning color
- Used for destructive actions (delete)

### Dialog Actions Container

**Layout**: Flexbox horizontal layout
- Justify-content: flex-end (buttons aligned to the right)
- Gap: 16px (spacing between buttons)
- Padding: 16px
- Background: Slightly lighter than modal background

## Data Models

### DialogConfig Interface

```typescript
interface DialogConfig {
  title: string;
  message: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  isPrimaryButtonWarning?: boolean;
  primaryButtonDisabled?: boolean;
  context?: 'assign' | 'delete';
}
```

### Role Assignment Context

When assigning a role, the dialog displays:
- Title: "Assign Role"
- Message: "Assign [RoleName] to [UserName]?"
- Primary Button: "Assign" (primary color)
- Secondary Button: "Cancel" (neutral color)

### Role Deletion Context

When deleting a role, the dialog displays:
- Title: "Delete Role" (with warning styling)
- Message: "Are you sure you want to delete [RoleName]? This action cannot be undone."
- Primary Button: "Delete" (warning/red color)
- Secondary Button: "Cancel" (neutral color)
- Header Color: Warning color (red/orange)

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Primary Button Styling Consistency

*For any* confirmation dialog, the primary button should always have the primary brand color background with white text, regardless of the dialog context.

**Validates: Requirements 1.1**

### Property 2: Secondary Button Styling Consistency

*For any* confirmation dialog, the secondary button should always have a neutral gray background with dark text.

**Validates: Requirements 1.2**

### Property 3: Button Hover State Changes

*For any* primary button in a confirmation dialog, hovering over it should change the background color to a darker shade of the primary color.

**Validates: Requirements 1.3**

### Property 4: Secondary Button Hover State

*For any* secondary button in a confirmation dialog, hovering over it should change the background color to a darker shade of gray.

**Validates: Requirements 1.4**

### Property 5: Button Padding Consistency

*For any* button in a confirmation dialog, the button should have exactly 12px horizontal and 8px vertical padding.

**Validates: Requirements 1.5, 1.6**

### Property 6: Disabled Button Opacity

*For any* disabled button in a confirmation dialog, the button should have 50% opacity and a cursor of "not-allowed".

**Validates: Requirements 1.7**

### Property 7: Button Horizontal Alignment

*For any* confirmation dialog with multiple buttons, the buttons should be aligned horizontally at the bottom of the modal.

**Validates: Requirements 2.1**

### Property 8: Button Spacing

*For any* confirmation dialog with multiple buttons, the gap between buttons should be exactly 16px.

**Validates: Requirements 2.2**

### Property 9: Button Container Padding

*For any* confirmation dialog, the button container should have exactly 16px padding from the modal edges.

**Validates: Requirements 2.3**

### Property 10: Button Order

*For any* confirmation dialog with multiple buttons, the primary button should be positioned to the right of the secondary button.

**Validates: Requirements 2.4**

### Property 11: Button Minimum Width

*For any* button in a confirmation dialog, the button should have a minimum width of 100px.

**Validates: Requirements 2.5**

### Property 12: Role Assignment Modal Content

*For any* role assignment confirmation dialog, the modal should display the user name and role being assigned in the message.

**Validates: Requirements 3.2**

### Property 13: Role Assignment Button Actions

*For any* role assignment confirmation dialog, clicking the "Assign" button should close the modal and emit the primary action event.

**Validates: Requirements 3.5**

### Property 14: Cancel Button Behavior

*For any* confirmation dialog, clicking the "Cancel" button should close the modal without emitting the primary action event.

**Validates: Requirements 3.6, 4.8**

### Property 15: Role Deletion Modal Header Color

*For any* role deletion confirmation dialog, the modal header should use a warning color (red/orange).

**Validates: Requirements 4.4**

### Property 16: Role Deletion Button Color

*For any* role deletion confirmation dialog, the primary "Delete" button should have a warning color background.

**Validates: Requirements 4.5**

### Property 17: Role Deletion Modal Content

*For any* role deletion confirmation dialog, the modal should display the role name that will be deleted.

**Validates: Requirements 4.2**

### Property 18: Role Deletion Button Action

*For any* role deletion confirmation dialog, clicking the "Delete" button should close the modal and emit the primary action event.

**Validates: Requirements 4.7**

### Property 19: Modal Content Padding

*For any* confirmation dialog, the modal content should have exactly 24px padding on all sides.

**Validates: Requirements 5.1**

### Property 20: Modal Title Typography

*For any* confirmation dialog, the modal title should have a font size between 18-20px and font weight of 600.

**Validates: Requirements 5.2**

### Property 21: Modal Body Typography

*For any* confirmation dialog, the modal body text should have a font size between 14-16px and font weight of 400.

**Validates: Requirements 5.3**

### Property 22: Modal Text Line Spacing

*For any* confirmation dialog with multiple lines of text, the lines should be separated by 12px vertical spacing.

**Validates: Requirements 5.4**

### Property 23: Modal Background Contrast

*For any* confirmation dialog, the modal background should be white or light color with sufficient contrast (WCAG AA standard) against the text.

**Validates: Requirements 5.5**

## Error Handling

### Button Click Errors

If a button click handler throws an error:
- Log the error to the console
- Display a toast notification to the user
- Keep the modal open to allow retry

### Invalid Configuration

If the dialog receives invalid configuration:
- Use default values for missing properties
- Log a warning to the console
- Display the dialog with sensible defaults

### Accessibility Issues

If accessibility attributes are missing:
- Automatically generate ARIA labels from title and message
- Ensure focus management works correctly
- Provide keyboard navigation support

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Button Rendering**
   - Verify primary button renders with correct label
   - Verify secondary button renders with correct label
   - Verify warning button styling applies correctly

2. **Dialog Content**
   - Verify title displays correctly
   - Verify message displays correctly
   - Verify user and role information displays in assignment context

3. **Button Click Handlers**
   - Verify primary button click emits primaryAction event
   - Verify secondary button click emits secondaryAction event
   - Verify modal closes after button click

4. **Styling Edge Cases**
   - Verify disabled button styling
   - Verify button hover states
   - Verify responsive layout on mobile

### Property-Based Tests

Property-based tests will verify universal properties across all inputs:

1. **Button Styling Properties**
   - For all primary buttons: background color is primary brand color
   - For all secondary buttons: background color is neutral gray
   - For all disabled buttons: opacity is 50%

2. **Layout Properties**
   - For all button containers: buttons are horizontally aligned
   - For all button containers: gap between buttons is 16px
   - For all buttons: minimum width is 100px

3. **Typography Properties**
   - For all titles: font size is 18-20px and weight is 600
   - For all body text: font size is 14-16px and weight is 400
   - For all modals: content padding is 24px

4. **Behavior Properties**
   - For all assignment dialogs: clicking "Assign" closes modal and emits event
   - For all deletion dialogs: clicking "Delete" closes modal and emits event
   - For all dialogs: clicking "Cancel" closes modal without emitting primary event

### Test Configuration

- Minimum 100 iterations per property test
- Use Angular testing utilities (TestBed, ComponentFixture)
- Mock Material Dialog service
- Test both light and dark theme variants (if applicable)
- Verify accessibility with axe-core or similar tools

### Testing Tools

- **Unit Testing**: Jasmine/Karma
- **Property-Based Testing**: fast-check (JavaScript/TypeScript)
- **Accessibility Testing**: axe-core
- **Visual Regression**: Percy or similar (optional)

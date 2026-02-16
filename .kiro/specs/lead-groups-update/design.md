# Design Document: Lead Groups in Update Lead

## Overview

The Lead Groups in Update Lead feature extends the lead edit form with group management capabilities. The design implements a dropdown field that fetches available groups from the API, displays the current group selection, and allows users to select, change, or clear group assignments. The implementation handles loading and error states gracefully and maintains responsive design across all screen sizes.

## Architecture

The feature follows a component-based architecture with clear separation of concerns:

```
Lead Edit Form
├── Group Dropdown Component
│   ├── Group Fetch Service
│   ├── Group Selection Handler
│   └── Error/Loading State Manager
└── Lead Update Service
    └── API Integration (PUT /api/leads/{id})
```

The architecture separates:
- **UI Layer**: Lead edit form and group dropdown component
- **Service Layer**: Group fetching and lead update operations
- **State Management**: Form state, loading states, and error handling

## Components and Interfaces

### GroupDropdownComponent

Responsible for displaying available groups and handling group selection.

```typescript
interface GroupDropdownComponent {
  // Inputs
  currentGroupId: string | null;
  disabled: boolean;
  
  // Outputs
  groupSelected: EventEmitter<string | null>;
  
  // Methods
  loadGroups(): Promise<void>;
  selectGroup(groupId: string | null): void;
  retryLoadGroups(): void;
}
```

### GroupFetchService

Handles fetching available groups from the API.

```typescript
interface GroupFetchService {
  // Methods
  fetchGroups(): Promise<LeadGroup[]>;
  
  // Returns
  // Array of LeadGroup objects with id and name properties
}
```

### LeadUpdateService

Handles updating the lead with the selected group.

```typescript
interface LeadUpdateService {
  // Methods
  updateLeadWithGroup(leadId: string, groupId: string | null): Promise<Lead>;
  
  // Returns
  // Updated Lead object
}
```

### Data Models

```typescript
interface LeadGroup {
  id: string;
  name: string;
  description?: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  group_id: string | null;
  // ... other lead properties
}

interface FormState {
  selectedGroupId: string | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}
```

## Data Models

### LeadGroup Model

Represents a group that leads can be assigned to.

```typescript
interface LeadGroup {
  id: string;           // Unique identifier
  name: string;         // Display name of the group
  description?: string; // Optional description
}
```

### Lead Model (Extended)

The existing Lead model is extended with group assignment.

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  group_id: string | null;  // New field for group assignment
  // ... other existing properties
}
```

### Form State Model

Manages the state of the lead edit form.

```typescript
interface LeadEditFormState {
  selectedGroupId: string | null;
  groupsLoading: boolean;
  groupsError: string | null;
  groups: LeadGroup[];
  isSubmitting: boolean;
  submitError: string | null;
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

Before writing the correctness properties, I need to analyze the acceptance criteria for testability.


### Correctness Properties

#### Property 1: Groups Fetched on Form Load
*For any* lead edit form instance, when the form loads, the system SHALL fetch groups from GET /api/lead-groups and populate the dropdown with the returned groups.
**Validates: Requirements 1.1, 1.3**

#### Property 2: Loading State During Fetch
*For any* group fetch operation, while the fetch is in progress, the system SHALL display a loading indicator and disable the Group_Dropdown.
**Validates: Requirements 1.2, 6.1**

#### Property 3: Error Handling on Fetch Failure
*For any* failed group fetch, the system SHALL display a descriptive error message and provide a retry button that re-attempts the fetch.
**Validates: Requirements 1.4, 6.2, 6.3**

#### Property 4: Current Group Display
*For any* lead with an assigned group, when the form loads, the system SHALL display the current group as selected in the Group_Dropdown.
**Validates: Requirements 2.1, 2.3**

#### Property 5: Empty Group State
*For any* lead without an assigned group, when the form loads, the system SHALL display an empty or placeholder state in the Group_Dropdown.
**Validates: Requirements 2.2**

#### Property 6: Group Selection Updates Form State
*For any* group selection from the dropdown, the system SHALL update the form state to reflect the selected group.
**Validates: Requirements 3.2**

#### Property 7: Form Modification Detection
*For any* lead with a current group, when the user selects a different group, the system SHALL mark the form as modified. When the user selects the same group, the form SHALL NOT be marked as modified.
**Validates: Requirements 3.3, 3.4**

#### Property 8: Clear Option Availability
*For any* open Group_Dropdown, the system SHALL provide an option to clear the group selection.
**Validates: Requirements 4.1**

#### Property 9: Clear Selection Sets Null
*For any* group selection, when the user selects the clear option, the system SHALL set the group selection to null and mark the form as modified.
**Validates: Requirements 4.2, 4.3, 4.4**

#### Property 10: Group ID in Update Request
*For any* lead update submission with a selected group, the system SHALL include the group_id in the PUT /api/leads/{id} request.
**Validates: Requirements 5.1**

#### Property 11: Null Group in Update Request
*For any* lead update submission with a cleared group, the system SHALL send null or omit the group_id field in the PUT request.
**Validates: Requirements 5.2**

#### Property 12: Successful Update Confirmation
*For any* successful lead update, the system SHALL confirm the update and close the form.
**Validates: Requirements 5.3**

#### Property 13: Update Error Handling
*For any* failed lead update, the system SHALL display an error message and allow the user to retry the submission.
**Validates: Requirements 5.4, 6.5**

#### Property 14: Submit Button Loading State
*For any* lead update in progress, the system SHALL disable the submit button and display a loading indicator.
**Validates: Requirements 6.4**

#### Property 15: Responsive Layout
*For any* screen size (mobile, tablet, desktop), the system SHALL display the Group_Dropdown in a responsive layout that adapts appropriately.
**Validates: Requirements 7.1, 7.2, 7.3**

#### Property 16: Mobile Touch Targets
*For any* Group_Dropdown opened on a mobile device, the system SHALL ensure dropdown options have adequate touch targets for easy selection.
**Validates: Requirements 7.4**

#### Property 17: Inline Group Creation Option
*For any* form instance where inline group creation is enabled, the system SHALL provide an option to create a new group in the dropdown.
**Validates: Requirements 8.1**

#### Property 18: Create Group Dialog Display
*For any* create group action, the system SHALL display a dialog or inline form for creating a new group.
**Validates: Requirements 8.2**

#### Property 19: New Group Addition and Selection
*For any* successfully created group, the system SHALL add it to the Group_Dropdown and automatically select it.
**Validates: Requirements 8.3**

#### Property 20: Create Dialog Cancellation
*For any* cancelled group creation, the system SHALL close the dialog and return to the Group_Dropdown.
**Validates: Requirements 8.4**

## Error Handling

The system implements comprehensive error handling across multiple layers:

### API Error Handling
- **Group Fetch Errors**: Display user-friendly error messages with retry capability
- **Lead Update Errors**: Capture and display validation errors, network errors, and server errors
- **Timeout Handling**: Implement reasonable timeouts for API calls with user notification

### UI Error States
- **Loading States**: Show spinners or skeleton loaders during API calls
- **Error Messages**: Display clear, actionable error messages
- **Retry Mechanisms**: Provide retry buttons for failed operations
- **Form Validation**: Validate form state before submission

### Edge Cases
- **Network Failures**: Handle offline scenarios gracefully
- **Concurrent Requests**: Prevent duplicate API calls during loading
- **Stale Data**: Handle cases where groups list changes during form interaction
- **Invalid Group IDs**: Handle cases where selected group is deleted before submission

## Testing Strategy

### Unit Testing

Unit tests verify specific examples, edge cases, and error conditions:

1. **Group Dropdown Component Tests**
   - Test dropdown renders with available groups
   - Test current group is displayed as selected
   - Test empty state when no group is assigned
   - Test clear option functionality
   - Test group selection updates form state
   - Test form modification detection

2. **Group Fetch Service Tests**
   - Test successful API call and data transformation
   - Test error handling and retry logic
   - Test timeout handling
   - Test empty groups list

3. **Lead Update Service Tests**
   - Test successful lead update with group_id
   - Test lead update with null group_id
   - Test error handling and retry logic
   - Test form state validation before submission

4. **Responsive Design Tests**
   - Test layout on mobile viewport (320px)
   - Test layout on tablet viewport (768px)
   - Test layout on desktop viewport (1024px+)
   - Test touch target sizes on mobile

### Property-Based Testing

Property-based tests verify universal properties across all inputs using randomization:

1. **Group Fetch Properties** (Properties 1-3)
   - Generate random group lists and verify dropdown population
   - Test loading state transitions
   - Test error scenarios with various error types

2. **Group Selection Properties** (Properties 4-9)
   - Generate random leads with/without groups
   - Test current group display for all cases
   - Test form modification detection for all group changes
   - Test clear functionality with various initial states

3. **Lead Update Properties** (Properties 10-14)
   - Generate random group selections and verify API requests
   - Test update success and error scenarios
   - Test loading state during submission
   - Test form state consistency

4. **Responsive Design Properties** (Properties 15-16)
   - Test layout adaptation across viewport sizes
   - Test touch target adequacy on mobile
   - Test alignment and sizing on all screen sizes

5. **Inline Group Creation Properties** (Properties 17-20)
   - Test create option availability when enabled
   - Test dialog display and cancellation
   - Test new group addition and selection
   - Test form state after group creation

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: lead-groups-update, Property {N}: {property_text}`
- Tests use randomized inputs to verify properties hold universally

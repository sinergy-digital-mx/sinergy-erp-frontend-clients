# Requirements Document: Lead Groups in Update Lead

## Introduction

This feature adds lead group management capabilities to the lead edit/update form. Users can select, change, or clear a lead's group assignment when updating a lead. The form fetches available groups from the API and displays the current group selection, with optional inline group creation functionality.

## Glossary

- **Lead**: A contact or prospect record in the system
- **Lead_Group**: A categorization or collection that a lead can belong to
- **Lead_Edit_Form**: The user interface form used to modify lead information
- **Group_Dropdown**: A select input field that displays available lead groups
- **Current_Group**: The lead group currently assigned to the lead being edited
- **Group_ID**: The unique identifier for a lead group
- **API_Response**: Data returned from an API endpoint
- **Loading_State**: The UI state while data is being fetched from the API
- **Error_State**: The UI state when an API request fails or returns an error

## Requirements

### Requirement 1: Fetch Available Lead Groups

**User Story:** As a user, I want the lead edit form to automatically fetch all available groups from the API, so that I can see what groups are available to assign to the lead.

#### Acceptance Criteria

1. WHEN the lead edit form loads, THE Lead_Edit_Form SHALL fetch all available groups from GET /api/lead-groups
2. WHEN the API request is in progress, THE Lead_Edit_Form SHALL display a loading indicator for the Group_Dropdown
3. WHEN the API request completes successfully, THE Lead_Edit_Form SHALL populate the Group_Dropdown with all returned groups
4. WHEN the API request fails, THE Lead_Edit_Form SHALL display an error message and allow the user to retry the fetch

### Requirement 2: Display Current Group Selection

**User Story:** As a user, I want to see which group is currently assigned to the lead, so that I know what the current state is before making changes.

#### Acceptance Criteria

1. WHEN the lead edit form loads with an existing lead, THE Lead_Edit_Form SHALL display the Current_Group in the Group_Dropdown
2. WHEN a lead has no group assigned, THE Lead_Edit_Form SHALL display an empty or placeholder state in the Group_Dropdown
3. WHEN the Group_Dropdown displays the Current_Group, THE Group_Dropdown option SHALL be visually distinct or marked as selected

### Requirement 3: Select or Change Lead Group

**User Story:** As a user, I want to select a different group for the lead, so that I can reassign the lead to a new group.

#### Acceptance Criteria

1. WHEN the user clicks the Group_Dropdown, THE Group_Dropdown SHALL display all available groups as selectable options
2. WHEN the user selects a group from the Group_Dropdown, THE Lead_Edit_Form SHALL update the selected group in the form state
3. WHEN the user selects a different group than the Current_Group, THE Lead_Edit_Form SHALL mark the form as modified
4. WHEN the user selects the same group as the Current_Group, THE Lead_Edit_Form SHALL not mark the form as modified

### Requirement 4: Clear Group Selection

**User Story:** As a user, I want to clear the group assignment for a lead, so that I can remove the lead from any group.

#### Acceptance Criteria

1. WHEN the Group_Dropdown is open, THE Group_Dropdown SHALL provide an option to clear the selection
2. WHEN the user selects the clear option, THE Lead_Edit_Form SHALL set the group selection to empty/null
3. WHEN the group selection is cleared, THE Lead_Edit_Form SHALL mark the form as modified
4. WHEN the group selection is cleared, THE Group_Dropdown SHALL display the empty or placeholder state

### Requirement 5: Update Lead with Group Assignment

**User Story:** As a user, I want to save the group assignment when I update the lead, so that the lead's group is persisted in the system.

#### Acceptance Criteria

1. WHEN the user submits the lead edit form, THE Lead_Edit_Form SHALL include the selected group_id in the PUT /api/leads/{id} request
2. WHEN the user has cleared the group selection, THE Lead_Edit_Form SHALL send null or omit the group_id field in the PUT request
3. WHEN the PUT request completes successfully, THE Lead_Edit_Form SHALL confirm the update and close the form
4. WHEN the PUT request fails, THE Lead_Edit_Form SHALL display an error message and allow the user to retry

### Requirement 6: Handle Loading and Error States

**User Story:** As a user, I want clear feedback about the status of API operations, so that I understand what is happening and can take appropriate action if something goes wrong.

#### Acceptance Criteria

1. WHEN the Group_Dropdown is fetching groups, THE Lead_Edit_Form SHALL display a loading indicator and disable the Group_Dropdown
2. WHEN the group fetch fails, THE Lead_Edit_Form SHALL display a descriptive error message with a retry button
3. WHEN the user clicks retry, THE Lead_Edit_Form SHALL attempt to fetch groups again
4. WHEN the lead update is in progress, THE Lead_Edit_Form SHALL disable the submit button and display a loading indicator
5. WHEN the lead update fails, THE Lead_Edit_Form SHALL display an error message and allow the user to retry the submission

### Requirement 7: Responsive Design

**User Story:** As a user, I want the lead edit form to work well on different screen sizes, so that I can update leads on any device.

#### Acceptance Criteria

1. THE Lead_Edit_Form SHALL display the Group_Dropdown in a responsive layout that adapts to mobile, tablet, and desktop screen sizes
2. WHEN the form is displayed on a mobile device, THE Group_Dropdown SHALL be full-width or appropriately sized for touch interaction
3. WHEN the form is displayed on a desktop device, THE Group_Dropdown SHALL be appropriately sized and aligned with other form fields
4. WHEN the Group_Dropdown is open on a mobile device, THE dropdown options SHALL be easily selectable without requiring precise clicking

### Requirement 8: Inline Group Creation (Optional)

**User Story:** As a user, I want to create a new group directly from the lead edit form if needed, so that I don't have to navigate away to create a group first.

#### Acceptance Criteria

1. WHERE inline group creation is enabled, THE Group_Dropdown SHALL provide an option to create a new group
2. WHEN the user selects the create option, THE Lead_Edit_Form SHALL display a dialog or inline form to create a new group
3. WHEN the user creates a new group, THE Lead_Edit_Form SHALL add the new group to the Group_Dropdown and select it
4. WHEN the user cancels group creation, THE Lead_Edit_Form SHALL close the dialog and return to the Group_Dropdown

# Implementation Plan: Lead Groups in Update Lead

## Overview

This implementation plan breaks down the Lead Groups in Update Lead feature into discrete coding tasks. The approach follows a component-based architecture, starting with core services, then building the UI component, integrating with the lead edit form, and finally adding comprehensive tests. Each task builds on previous work with no orphaned code.

## Tasks

- [x] 1. Set up project structure and core interfaces
  - Create directory structure for the feature (services, components, models)
  - Define TypeScript interfaces for LeadGroup, Lead, and FormState models
  - Set up testing framework and configuration
  - _Requirements: 1.1, 2.1, 5.1_

- [ ] 2. Implement GroupFetchService
  - [x] 2.1 Create GroupFetchService with fetchGroups() method
    - Implement API call to GET /api/lead-groups
    - Handle successful responses and transform data
    - _Requirements: 1.1, 1.3_
  
  - [ ]* 2.2 Write property test for group fetch
    - **Property 1: Groups Fetched on Form Load**
    - **Validates: Requirements 1.1, 1.3**
  
  - [x] 2.3 Implement error handling in GroupFetchService
    - Add error handling for failed API calls
    - Implement retry logic with exponential backoff
    - _Requirements: 1.4, 6.2, 6.3_
  
  - [ ]* 2.4 Write property test for fetch error handling
    - **Property 3: Error Handling on Fetch Failure**
    - **Validates: Requirements 1.4, 6.2, 6.3**

- [ ] 3. Implement GroupDropdownComponent
  - [x] 3.1 Create GroupDropdownComponent with basic structure
    - Define component inputs (currentGroupId, disabled)
    - Define component outputs (groupSelected event)
    - Set up component template and styling
    - _Requirements: 2.1, 3.1_
  
  - [x] 3.2 Implement group loading and display logic
    - Call GroupFetchService on component initialization
    - Display loading indicator during fetch
    - Populate dropdown with fetched groups
    - _Requirements: 1.2, 1.3_
  
  - [ ]* 3.3 Write property test for loading state
    - **Property 2: Loading State During Fetch**
    - **Validates: Requirements 1.2, 6.1**
  
  - [x] 3.4 Implement current group display
    - Display current group as selected option
    - Show empty/placeholder state when no group assigned
    - Mark selected option as visually distinct
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ]* 3.5 Write property test for current group display
    - **Property 4: Current Group Display**
    - **Property 5: Empty Group State**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  
  - [x] 3.6 Implement group selection handler
    - Handle user selection from dropdown
    - Update form state with selected group
    - Emit groupSelected event
    - _Requirements: 3.1, 3.2_
  
  - [ ]* 3.7 Write property test for group selection
    - **Property 6: Group Selection Updates Form State**
    - **Validates: Requirements 3.2**
  
  - [x] 3.8 Implement clear option functionality
    - Add clear option to dropdown
    - Handle clear selection
    - Set group selection to null
    - _Requirements: 4.1, 4.2_
  
  - [ ]* 3.9 Write property test for clear functionality
    - **Property 8: Clear Option Availability**
    - **Property 9: Clear Selection Sets Null**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

- [ ] 4. Implement form modification detection
  - [x] 4.1 Add form modification tracking
    - Track original group value
    - Detect when selection differs from original
    - Emit modification event
    - _Requirements: 3.3, 3.4, 4.3_
  
  - [ ]* 4.2 Write property test for form modification
    - **Property 7: Form Modification Detection**
    - **Validates: Requirements 3.3, 3.4**

- [ ] 5. Implement LeadUpdateService
  - [x] 5.1 Create LeadUpdateService with updateLeadWithGroup() method
    - Implement PUT /api/leads/{id} call with group_id
    - Handle null group_id (clear case)
    - Transform response to Lead object
    - _Requirements: 5.1, 5.2_
  
  - [ ]* 5.2 Write property test for update request format
    - **Property 10: Group ID in Update Request**
    - **Property 11: Null Group in Update Request**
    - **Validates: Requirements 5.1, 5.2**
  
  - [x] 5.3 Implement error handling in LeadUpdateService
    - Handle failed update requests
    - Provide error details to caller
    - Support retry attempts
    - _Requirements: 5.4, 6.5_
  
  - [ ]* 5.4 Write property test for update error handling
    - **Property 13: Update Error Handling**
    - **Validates: Requirements 5.4, 6.5**

- [ ] 6. Integrate GroupDropdownComponent with lead edit form
  - [x] 6.1 Add GroupDropdownComponent to lead edit form template
    - Place dropdown in appropriate form section
    - Wire component inputs and outputs
    - _Requirements: 2.1, 3.1_
  
  - [x] 6.2 Implement form submission with group update
    - Capture selected group from dropdown
    - Call LeadUpdateService on form submit
    - Handle success and error responses
    - _Requirements: 5.1, 5.3, 5.4_
  
  - [ ]* 6.3 Write property test for successful update
    - **Property 12: Successful Update Confirmation**
    - **Validates: Requirements 5.3**
  
  - [x] 6.4 Implement submit button loading state
    - Disable submit button during update
    - Display loading indicator
    - Re-enable on completion or error
    - _Requirements: 6.4_
  
  - [ ]* 6.5 Write property test for submit loading state
    - **Property 14: Submit Button Loading State**
    - **Validates: Requirements 6.4**

- [ ] 7. Implement responsive design
  - [x] 7.1 Add responsive styling for GroupDropdownComponent
    - Mobile layout (full-width, touch-friendly)
    - Tablet layout (appropriate sizing)
    - Desktop layout (aligned with form fields)
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [x] 7.2 Ensure adequate touch targets on mobile
    - Dropdown options have minimum 44px height
    - Sufficient padding for touch interaction
    - _Requirements: 7.4_
  
  - [ ]* 7.3 Write property test for responsive layout
    - **Property 15: Responsive Layout**
    - **Property 16: Mobile Touch Targets**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [ ] 8. Implement inline group creation (optional)
  - [ ] 8.1 Add create group option to dropdown
    - Add "Create new group" option when feature enabled
    - _Requirements: 8.1_
  
  - [ ]* 8.2 Write property test for create option
    - **Property 17: Inline Group Creation Option**
    - **Validates: Requirements 8.1**
  
  - [ ] 8.3 Implement create group dialog
    - Create dialog/inline form for group creation
    - Handle form submission
    - Add new group to dropdown and select it
    - _Requirements: 8.2, 8.3_
  
  - [ ]* 8.4 Write property test for create dialog
    - **Property 18: Create Group Dialog Display**
    - **Property 19: New Group Addition and Selection**
    - **Validates: Requirements 8.2, 8.3**
  
  - [ ] 8.5 Implement create dialog cancellation
    - Handle cancel button
    - Close dialog and return to dropdown
    - _Requirements: 8.4_
  
  - [ ]* 8.6 Write property test for create cancellation
    - **Property 20: Create Dialog Cancellation**
    - **Validates: Requirements 8.4**

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all unit tests pass
  - Ensure all property-based tests pass (minimum 100 iterations each)
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [ ] 10. Integration testing and final validation
  - [x] 10.1 Test complete flow end-to-end
    - Load lead edit form
    - Verify groups are fetched and displayed
    - Select a group and verify form modification
    - Submit form and verify lead is updated
    - _Requirements: 1.1, 2.1, 3.2, 5.1_
  
  - [x] 10.2 Test error scenarios
    - Test group fetch failure and retry
    - Test lead update failure and retry
    - Verify error messages are displayed
    - _Requirements: 1.4, 5.4, 6.2, 6.3, 6.5_
  
  - [x] 10.3 Test responsive behavior
    - Verify layout on mobile, tablet, desktop
    - Test touch interaction on mobile
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 11. Final checkpoint - All tests pass and feature complete
  - Ensure all tests pass
  - Verify all requirements are met
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional test-related tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use randomized inputs to verify properties hold universally
- Checkpoints ensure incremental validation and catch issues early
- All code is integrated incrementally with no orphaned components

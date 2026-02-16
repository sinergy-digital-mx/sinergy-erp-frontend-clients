# Implementation Plan: Modal UI Improvements

## Overview

This implementation plan breaks down the modal UI improvements into discrete coding tasks. The approach focuses on enhancing the existing ConfirmDialogComponent with improved styling, then creating reusable button styling classes and utilities. Each task builds incrementally, with testing integrated throughout to catch issues early.

The implementation uses Angular, TypeScript, and SCSS to create a polished, professional modal interface with clear visual hierarchy and improved user experience.

## Tasks

- [ ] 1. Create SCSS styling foundation and variables
  - Create a new SCSS file for modal styling variables (colors, spacing, typography)
  - Define CSS custom properties for primary color, warning color, and neutral colors
  - Define spacing variables (16px, 24px, 12px, 8px)
  - Define typography variables (font sizes, font weights)
  - _Requirements: 1.1, 1.2, 5.2, 5.3_

- [ ] 2. Implement button styling classes
  - Create `.btn`, `.btn-primary`, `.btn-secondary`, and `.btn-warning` classes
  - Implement hover states for all button types
  - Implement disabled state styling (50% opacity)
  - Implement padding (12px horizontal, 8px vertical)
  - Implement minimum width (100px)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 2.5_

- [ ]* 2.1 Write property tests for button styling
  - **Property 1: Primary Button Styling Consistency**
  - **Property 2: Secondary Button Styling Consistency**
  - **Property 3: Button Hover State Changes**
  - **Property 4: Secondary Button Hover State**
  - **Property 5: Button Padding Consistency**
  - **Property 6: Disabled Button Opacity**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**

- [ ] 3. Implement dialog actions container styling
  - Create `.dialog-actions` class with flexbox layout
  - Implement horizontal alignment (justify-content: flex-end)
  - Implement 16px gap between buttons
  - Implement 16px padding from modal edges
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 3.1 Write property tests for button layout
  - **Property 7: Button Horizontal Alignment**
  - **Property 8: Button Spacing**
  - **Property 9: Button Container Padding**
  - **Property 10: Button Order**
  - **Property 11: Button Minimum Width**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

- [ ] 4. Enhance ConfirmDialogComponent with improved styling
  - Update component template to use new button classes
  - Add `.dialog-header`, `.dialog-content`, `.dialog-actions` classes
  - Implement title styling (18-20px, font-weight 600)
  - Implement body text styling (14-16px, font-weight 400)
  - Implement content padding (24px)
  - _Requirements: 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 4.1 Write property tests for modal typography and spacing
  - **Property 19: Modal Content Padding**
  - **Property 20: Modal Title Typography**
  - **Property 21: Modal Body Typography**
  - **Property 22: Modal Text Line Spacing**
  - **Property 23: Modal Background Contrast**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

- [ ] 5. Implement role assignment modal configuration
  - Update ConfirmDialogComponent to accept role assignment context
  - Set title to "Assign Role"
  - Set primary button label to "Assign" with primary color
  - Set secondary button label to "Cancel" with neutral color
  - Display user name and role in message
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 5.1 Write property tests for role assignment modal
  - **Property 12: Role Assignment Modal Content**
  - **Property 13: Role Assignment Button Actions**
  - **Validates: Requirements 3.2, 3.5**

- [ ] 6. Implement role deletion modal configuration
  - Update ConfirmDialogComponent to accept role deletion context
  - Set title to "Delete Role" with warning styling
  - Set header color to warning color (red/orange)
  - Set primary button label to "Delete" with warning color
  - Set secondary button label to "Cancel" with neutral color
  - Display role name in message with warning text
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ]* 6.1 Write property tests for role deletion modal
  - **Property 15: Role Deletion Modal Header Color**
  - **Property 16: Role Deletion Button Color**
  - **Property 17: Role Deletion Modal Content**
  - **Property 18: Role Deletion Button Action**
  - **Validates: Requirements 4.2, 4.4, 4.5, 4.7**

- [ ] 7. Implement button click handlers and event emission
  - Implement primary button click handler
  - Implement secondary button click handler
  - Emit primaryAction event when primary button clicked
  - Emit secondaryAction event when secondary button clicked
  - Close modal after button click
  - _Requirements: 3.5, 3.6, 4.7, 4.8_

- [ ]* 7.1 Write property tests for button actions
  - **Property 13: Role Assignment Button Actions**
  - **Property 14: Cancel Button Behavior**
  - **Property 18: Role Deletion Button Action**
  - **Validates: Requirements 3.5, 3.6, 4.7, 4.8**

- [ ] 8. Checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests with minimum 100 iterations
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [ ] 9. Update component interfaces and types
  - Create DialogConfig interface with all configuration options
  - Add TypeScript types for button colors and states
  - Add TypeScript types for dialog context ('assign' | 'delete')
  - Export types for use in other components
  - _Requirements: 1.1, 1.2, 3.1, 4.1_

- [ ] 10. Integrate improved modals with existing role management
  - Update role assignment service to use new modal configuration
  - Update role deletion service to use new modal configuration
  - Verify modals display correctly in role assignment flow
  - Verify modals display correctly in role deletion flow
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [ ]* 10.1 Write integration tests
  - Test role assignment flow end-to-end
  - Test role deletion flow end-to-end
  - Verify modal displays correct information
  - Verify button clicks trigger correct actions
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests with minimum 100 iterations
  - Run integration tests
  - Verify no console errors or warnings
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests should run with minimum 100 iterations
- All styling should use SCSS variables for maintainability
- Button styling should be reusable across the application
- Modal component should remain compatible with Angular Material

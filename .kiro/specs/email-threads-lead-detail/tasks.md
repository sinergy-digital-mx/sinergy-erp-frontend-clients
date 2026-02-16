# Implementation Plan: Email Threads in Lead Detail

## Overview

This implementation plan breaks down the Email Threads feature into discrete, incremental coding tasks. Each task builds on previous work, with property-based tests integrated throughout to validate correctness properties. The implementation follows Angular best practices with clear component hierarchy, state management, and API integration.

## Tasks

- [x] 1. Set up project structure and core interfaces
  - Create the EmailThreadsSection component directory structure
  - Define TypeScript interfaces for Thread, ThreadDetail, ThreadMessage, and error states
  - Set up the component module with required imports (HttpClientModule, FormsModule, CommonModule)
  - Create a service for email thread API calls (EmailThreadService)
  - _Requirements: 1.1, 1.2, 3.1, 4.8, 5.7_

- [x] 2. Implement EmailThreadService with API integration
  - Create methods for GET /api/email-threads?lead_id={leadId}
  - Create methods for GET /api/email-threads/{threadId}
  - Create methods for POST /api/email-threads/{threadId}/messages
  - Implement error handling and retry logic
  - _Requirements: 1.2, 3.1, 4.8, 5.7_

- [x] 3. Implement EmailThreadsSection component with state management
  - Create component class with state properties (threads, selectedThreadId, loading states, errors)
  - Implement loadThreads() method to fetch threads on component init
  - Implement selectThread() method to load thread details
  - Implement error handling with retry capability
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 3.1 Write property test for thread list API call
  - **Property 1: API call on component display**
  - **Validates: Requirements 1.2**

- [ ]* 3.2 Write property test for loading indicator display
  - **Property 2: Loading indicator during thread fetch**
  - **Validates: Requirements 1.3**

- [ ]* 3.3 Write property test for error handling
  - **Property 3: Error message and retry on thread fetch failure**
  - **Validates: Requirements 1.4**

- [x] 4. Implement ThreadListView component
  - Create component to display list of threads with sender, subject, date, and preview
  - Implement thread selection event emitter
  - Implement empty state display
  - Implement formatDate() and truncatePreview() helper methods
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ]* 4.1 Write property test for thread list display
  - **Property 4: Thread list displays all fetched threads**
  - **Validates: Requirements 1.5, 2.1, 2.2, 2.3, 2.4**

- [ ]* 4.2 Write property test for message preview truncation
  - **Property 5: Message preview truncation**
  - **Validates: Requirements 2.5**

- [ ]* 4.3 Write property test for empty state
  - **Property 6: Empty thread list displays empty state**
  - **Validates: Requirements 2.6**

- [x] 5. Implement ThreadDetailView component
  - Create component to display full thread conversation
  - Implement message list display in chronological order
  - Implement back button navigation
  - Implement reply button and reply compose toggle
  - _Requirements: 3.4, 3.5, 3.6, 3.7_

- [ ]* 5.1 Write property test for thread detail API call
  - **Property 7: API call on thread selection**
  - **Validates: Requirements 3.1**

- [ ]* 5.2 Write property test for loading indicator
  - **Property 8: Loading indicator during thread detail fetch**
  - **Validates: Requirements 3.2**

- [ ]* 5.3 Write property test for error handling
  - **Property 9: Error message and retry on thread detail fetch failure**
  - **Validates: Requirements 3.3**

- [ ]* 5.4 Write property test for message ordering
  - **Property 10: Thread detail shows messages in chronological order**
  - **Validates: Requirements 3.5, 3.6**

- [ ]* 5.5 Write property test for back button navigation
  - **Property 11: Back button returns to thread list**
  - **Validates: Requirements 3.7**

- [x] 6. Implement ComposeModal component
  - Create modal component with recipient, subject, and message body fields
  - Implement form validation (subject and body required)
  - Implement cancel button to close modal
  - Implement send button with API integration
  - Pre-populate recipient field with lead email
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [ ]* 6.1 Write property test for send email button
  - **Property 12: Send Email button opens compose modal**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 6.2 Write property test for recipient pre-population
  - **Property 13: Recipient field pre-populated in compose**
  - **Validates: Requirements 4.3, 4.4**

- [ ]* 6.3 Write property test for modal cancel
  - **Property 14: Compose modal cancel closes without sending**
  - **Validates: Requirements 4.5**

- [ ]* 6.4 Write property test for form validation
  - **Property 15: Compose form validation prevents empty submission**
  - **Validates: Requirements 4.6, 4.7**

- [ ]* 6.5 Write property test for valid email send
  - **Property 16: Valid email send triggers API call**
  - **Validates: Requirements 4.8**

- [ ]* 6.6 Write property test for thread list refresh
  - **Property 17: Thread list refresh after new email**
  - **Validates: Requirements 4.9**

- [x] 7. Implement ReplyCompose component
  - Create inline reply compose component within thread detail
  - Implement message body field and send button
  - Implement form validation (body required)
  - Implement cancel button
  - Implement loading state during send
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

- [ ]* 7.1 Write property test for reply button
  - **Property 18: Reply button opens reply compose**
  - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ]* 7.2 Write property test for reply cancel
  - **Property 19: Reply compose cancel closes without sending**
  - **Validates: Requirements 5.4**

- [ ]* 7.3 Write property test for reply validation
  - **Property 20: Reply validation prevents empty submission**
  - **Validates: Requirements 5.5, 5.6**

- [ ]* 7.4 Write property test for valid reply send
  - **Property 21: Valid reply send triggers API call**
  - **Validates: Requirements 5.7**

- [ ]* 7.5 Write property test for thread detail refresh
  - **Property 22: Thread detail refresh after reply**
  - **Validates: Requirements 5.8**

- [ ]* 7.6 Write property test for reply loading indicator
  - **Property 23: Loading indicator during reply send**
  - **Validates: Requirements 5.9**

- [x] 8. Implement error handling and retry logic
  - Create ErrorBoundary component to catch and display errors
  - Implement retry button functionality for all failed API calls
  - Implement error message formatting for different error types (network, server, validation)
  - Implement automatic retry for network errors after 2 seconds
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ]* 8.1 Write property test for error message display
  - **Property 24: Error message displays on API failure**
  - **Validates: Requirements 6.2**

- [ ]* 8.2 Write property test for retry functionality
  - **Property 25: Retry action re-attempts failed request**
  - **Validates: Requirements 6.3, 6.4**

- [ ]* 8.3 Write property test for network error message
  - **Property 26: Network error message displays**
  - **Validates: Requirements 6.5**

- [ ]* 8.4 Write property test for server error message
  - **Property 27: Server error message displays**
  - **Validates: Requirements 6.6**

- [x] 9. Implement responsive design for mobile
  - Create mobile-specific styles for EmailThreadsSection (vertical stacking)
  - Implement mobile layout for ThreadListView (single column)
  - Implement full-screen or near full-screen ComposeModal on mobile
  - Implement readable message display on ThreadDetailView for mobile
  - Use CSS media queries for viewport width < 768px
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 9.1 Write property test for mobile layout
  - **Property 28: Mobile layout stacks vertically**
  - **Validates: Requirements 7.1, 7.2**

- [ ]* 9.2 Write property test for mobile modal
  - **Property 29: Compose modal full-screen on mobile**
  - **Validates: Requirements 7.3**

- [ ]* 9.3 Write property test for mobile thread detail
  - **Property 30: Thread detail readable on mobile**
  - **Validates: Requirements 7.4**

- [x] 10. Implement responsive design for tablet and desktop
  - Create tablet layout for ThreadListView (two-column layout)
  - Create desktop layout for ThreadListView (multi-column layout)
  - Use CSS media queries for viewport width 768px-1023px (tablet) and >= 1024px (desktop)
  - Ensure consistent styling across all breakpoints
  - _Requirements: 7.5, 7.6_

- [ ]* 10.1 Write property test for desktop layout
  - **Property 31: Thread list multi-column on desktop**
  - **Validates: Requirements 7.5**

- [ ]* 10.2 Write property test for tablet layout
  - **Property 32: Thread list two-column on tablet**
  - **Validates: Requirements 7.6**

- [x] 11. Checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests with minimum 100 iterations each
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [x] 12. Integration and wiring
  - Wire EmailThreadsSection into the lead detail page component
  - Pass lead ID as input property to EmailThreadsSection
  - Ensure proper event handling between parent and child components
  - Test full integration with lead detail view
  - _Requirements: 1.1, 4.1, 5.1_

- [ ]* 12.1 Write integration tests
  - Test full user flow: view threads → select thread → reply → refresh
  - Test full user flow: view threads → send new email → refresh
  - Test error recovery flows
  - _Requirements: 1.1, 3.1, 4.8, 5.7_

- [x] 13. Final checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests with minimum 100 iterations each
  - Verify responsive design on multiple device sizes
  - Verify error handling and retry functionality
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests are integrated throughout to catch errors early
- Checkpoints ensure incremental validation of functionality
- All property tests should run with minimum 100 iterations using fast-check library
- Each property test should be tagged with: `Feature: email-threads-lead-detail, Property {number}: {property_text}`

# Design Document: Email Threads in Lead Detail

## Overview

The Email Threads feature extends the lead detail view with comprehensive email management capabilities. The implementation follows a component-based architecture with clear separation between data fetching, state management, and UI presentation. The system integrates with three REST API endpoints to fetch threads, retrieve full thread details, and send replies.

The design prioritizes user experience through:
- Progressive loading states with clear feedback
- Graceful error handling with retry mechanisms
- Responsive layouts for all device sizes
- Efficient data fetching and caching strategies
- Accessible UI components following WCAG guidelines

## Architecture

### Component Hierarchy

```
LeadDetailView
├── EmailThreadsSection
│   ├── ThreadListView
│   │   ├── ThreadListItem (repeated)
│   │   ├── EmptyState
│   │   └── LoadingState
│   ├── ThreadDetailView
│   │   ├── MessageList
│   │   │   └── MessageItem (repeated)
│   │   ├── ReplyCompose
│   │   └── BackButton
│   ├── ComposeModal
│   │   ├── RecipientField
│   │   ├── SubjectField
│   │   ├── MessageBodyField
│   │   └── ActionButtons
│   └── ErrorBoundary
```

### Data Flow

1. **Initial Load**: When lead detail page loads, EmailThreadsSection fetches threads via GET /api/email-threads?lead_id={leadId}
2. **Thread Selection**: User clicks thread → system fetches full details via GET /api/email-threads/{threadId}
3. **Compose New**: User clicks "Send Email" → ComposeModal opens → user submits → POST to create new thread
4. **Reply**: User clicks "Reply" → ReplyCompose appears → user submits → POST /api/email-threads/{threadId}/messages
5. **Refresh**: After any successful action, affected views refresh to show updated data

### State Management

The feature uses a hierarchical state model:

```
EmailThreadsState
├── threads: Thread[]
├── selectedThreadId: string | null
├── selectedThreadDetails: ThreadDetail | null
├── isLoadingThreads: boolean
├── isLoadingThreadDetail: boolean
├── isComposing: boolean
├── isReplying: boolean
├── error: ErrorState | null
└── lastRefresh: timestamp
```

## Components and Interfaces

### Core Data Models

```typescript
interface Thread {
  id: string;
  leadId: string;
  sender: string;
  senderEmail: string;
  subject: string;
  lastMessageDate: string; // ISO 8601 timestamp
  messagePreview: string;
  messageCount: number;
}

interface ThreadDetail {
  id: string;
  leadId: string;
  subject: string;
  messages: ThreadMessage[];
}

interface ThreadMessage {
  id: string;
  sender: string;
  senderEmail: string;
  timestamp: string; // ISO 8601 timestamp
  body: string;
  isOutgoing: boolean; // true if sent by current user
}

interface ComposeEmailRequest {
  recipientEmail: string;
  subject: string;
  body: string;
}

interface ReplyRequest {
  body: string;
}

interface ErrorState {
  type: 'network' | 'server' | 'validation';
  message: string;
  retryable: boolean;
}
```

### EmailThreadsSection Component

**Responsibilities**:
- Manage overall email threads state
- Coordinate between sub-components
- Handle API calls and error states
- Manage modal and detail view visibility

**Key Methods**:
- `loadThreads()`: Fetch threads for current lead
- `selectThread(threadId)`: Load and display thread details
- `openComposeModal()`: Show compose modal
- `closeComposeModal()`: Hide compose modal
- `sendEmail(request)`: Create new thread via API
- `sendReply(threadId, request)`: Send reply via API
- `retryLastAction()`: Retry failed operation

### ThreadListView Component

**Responsibilities**:
- Display list of threads with summary information
- Handle thread selection
- Show loading and empty states

**Key Methods**:
- `selectThread(threadId)`: Emit thread selection event
- `formatDate(date)`: Format timestamp for display
- `truncatePreview(text)`: Truncate message preview to 100 characters

### ThreadDetailView Component

**Responsibilities**:
- Display full thread conversation
- Show all messages in chronological order
- Provide reply functionality
- Handle back navigation

**Key Methods**:
- `goBack()`: Return to thread list
- `openReplyCompose()`: Show reply input area
- `closeReplyCompose()`: Hide reply input area
- `formatTimestamp(date)`: Format message timestamp

### ComposeModal Component

**Responsibilities**:
- Provide form for composing new emails
- Validate input before submission
- Handle modal open/close

**Key Methods**:
- `validateForm()`: Check subject and body are not empty
- `submit()`: Send email and close modal
- `cancel()`: Close modal without sending

### ReplyCompose Component

**Responsibilities**:
- Provide inline reply input within thread detail
- Validate reply content
- Handle submission

**Key Methods**:
- `validateReply()`: Check message body is not empty
- `submit()`: Send reply and refresh thread
- `cancel()`: Close reply input

## Data Models

### API Response Formats

**GET /api/email-threads?lead_id={leadId}**
```json
{
  "threads": [
    {
      "id": "thread-123",
      "leadId": "lead-456",
      "sender": "John Doe",
      "senderEmail": "john@example.com",
      "subject": "Project Proposal",
      "lastMessageDate": "2024-01-15T10:30:00Z",
      "messagePreview": "Thank you for your interest in our services...",
      "messageCount": 5
    }
  ]
}
```

**GET /api/email-threads/{threadId}**
```json
{
  "id": "thread-123",
  "leadId": "lead-456",
  "subject": "Project Proposal",
  "messages": [
    {
      "id": "msg-1",
      "sender": "John Doe",
      "senderEmail": "john@example.com",
      "timestamp": "2024-01-10T14:00:00Z",
      "body": "Hi, I'm interested in your services...",
      "isOutgoing": false
    },
    {
      "id": "msg-2",
      "sender": "Sales Rep",
      "senderEmail": "sales@ourcompany.com",
      "timestamp": "2024-01-10T15:30:00Z",
      "body": "Thank you for reaching out! Let me tell you about...",
      "isOutgoing": true
    }
  ]
}
```

### Local State Structure

```typescript
interface EmailThreadsComponentState {
  // Thread list state
  threads: Thread[];
  isLoadingThreads: boolean;
  threadsError: ErrorState | null;
  
  // Thread detail state
  selectedThreadId: string | null;
  selectedThreadDetails: ThreadDetail | null;
  isLoadingThreadDetail: boolean;
  threadDetailError: ErrorState | null;
  
  // Modal states
  isComposeModalOpen: boolean;
  isReplyComposeOpen: boolean;
  
  // Operation states
  isSendingEmail: boolean;
  isSendingReply: boolean;
  sendError: ErrorState | null;
  
  // UI state
  lastRefresh: number; // timestamp
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property-Based Testing Overview

Property-based testing (PBT) validates software correctness by testing universal properties across many generated inputs. Each property is a formal specification that should hold for all valid inputs.

**Core Principles**:
1. **Universal Quantification**: Every property must contain an explicit "for all" statement
2. **Requirements Traceability**: Each property must reference the requirements it validates
3. **Executable Specifications**: Properties must be implementable as automated tests
4. **Comprehensive Coverage**: Properties should cover all testable acceptance criteria

### Correctness Properties

Property 1: API call on component display
*For any* lead detail view, when the EmailThreadsSection is displayed, the system should call GET /api/email-threads?lead_id={leadId} with the correct lead ID.
**Validates: Requirements 1.2**

Property 2: Loading indicator during thread fetch
*For any* thread fetch operation in progress, the system should display a loading indicator and disable thread list interactions.
**Validates: Requirements 1.3**

Property 3: Error message and retry on thread fetch failure
*For any* failed thread fetch request, the system should display an error message and provide a retry button.
**Validates: Requirements 1.4**

Property 4: Thread list displays all fetched threads
*For any* set of email threads returned from the API, the thread list should display all threads with no omissions or duplicates.
**Validates: Requirements 1.5, 2.1, 2.2, 2.3, 2.4**

Property 5: Message preview truncation
*For any* email message with body length greater than 100 characters, the displayed preview should be truncated to exactly 100 characters with an ellipsis appended.
**Validates: Requirements 2.5**

Property 6: Empty thread list displays empty state
*For any* lead with no email threads, the system should display an empty state message instead of an empty list.
**Validates: Requirements 2.6**

Property 7: API call on thread selection
*For any* thread in the thread list, when a user clicks on it, the system should call GET /api/email-threads/{threadId} with the correct thread ID.
**Validates: Requirements 3.1**

Property 8: Loading indicator during thread detail fetch
*For any* thread detail fetch operation in progress, the system should display a loading indicator.
**Validates: Requirements 3.2**

Property 9: Error message and retry on thread detail fetch failure
*For any* failed thread detail fetch request, the system should display an error message and provide a retry button.
**Validates: Requirements 3.3**

Property 10: Thread detail shows messages in chronological order
*For any* thread with multiple messages, the messages should be displayed in ascending order by timestamp (oldest first).
**Validates: Requirements 3.5, 3.6**

Property 11: Back button returns to thread list
*For any* open thread detail view, clicking the back button should return to the thread list and clear the selected thread.
**Validates: Requirements 3.7**

Property 12: Send Email button opens compose modal
*For any* email threads section, clicking the "Send Email" button should open the compose modal and set isComposeModalOpen to true.
**Validates: Requirements 4.1, 4.2**

Property 13: Recipient field pre-populated in compose
*For any* compose modal opened from a lead detail view, the recipient field should be pre-populated with the lead's email address.
**Validates: Requirements 4.3, 4.4**

Property 14: Compose modal cancel closes without sending
*For any* open compose modal, clicking cancel should close the modal without making an API call.
**Validates: Requirements 4.5**

Property 15: Compose form validation prevents empty submission
*For any* compose form submission with empty subject or empty body, the system should reject the submission and display a validation error.
**Validates: Requirements 4.6, 4.7**

Property 16: Valid email send triggers API call
*For any* valid compose form submission, the system should call POST /api/email-threads with the correct parameters and close the modal.
**Validates: Requirements 4.8**

Property 17: Thread list refresh after new email
*For any* successful email composition, the thread list should be refreshed and the new thread should appear in the list.
**Validates: Requirements 4.9**

Property 18: Reply button opens reply compose
*For any* thread detail view, clicking the "Reply" button should display the reply compose area.
**Validates: Requirements 5.1, 5.2, 5.3**

Property 19: Reply compose cancel closes without sending
*For any* open reply compose area, clicking cancel should close the area without making an API call.
**Validates: Requirements 5.4**

Property 20: Reply validation prevents empty submission
*For any* reply submission with empty message body, the system should reject the submission and display a validation error.
**Validates: Requirements 5.5, 5.6**

Property 21: Valid reply send triggers API call
*For any* valid reply submission, the system should call POST /api/email-threads/{threadId}/messages with the correct parameters.
**Validates: Requirements 5.7**

Property 22: Thread detail refresh after reply
*For any* successful reply submission, the thread detail view should be refreshed and the new message should appear in the message list.
**Validates: Requirements 5.8**

Property 23: Loading indicator during reply send
*For any* reply send operation in progress, the system should display a loading indicator on the send button.
**Validates: Requirements 5.9**

Property 24: Error message displays on API failure
*For any* failed API request, the system should display an error message describing the failure type.
**Validates: Requirements 6.2**

Property 25: Retry action re-attempts failed request
*For any* failed API request with a retry option, clicking retry should re-attempt the same request with the same parameters.
**Validates: Requirements 6.3, 6.4**

Property 26: Network error message displays
*For any* network connectivity error, the system should display a message indicating network issues.
**Validates: Requirements 6.5**

Property 27: Server error message displays
*For any* server error (5xx), the system should display a message indicating server issues.
**Validates: Requirements 6.6**

Property 28: Mobile layout stacks vertically
*For any* email threads section displayed on a mobile device (viewport width < 768px), elements should be stacked vertically with no horizontal scrolling required.
**Validates: Requirements 7.1, 7.2**

Property 29: Compose modal full-screen on mobile
*For any* compose modal displayed on a mobile device (viewport width < 768px), it should display in full-screen or near full-screen mode.
**Validates: Requirements 7.3**

Property 30: Thread detail readable on mobile
*For any* thread detail view displayed on a mobile device, messages should be displayed in a readable format without horizontal scrolling.
**Validates: Requirements 7.4**

Property 31: Thread list multi-column on desktop
*For any* thread list displayed on a desktop device (viewport width >= 1024px), it should display in a multi-column layout.
**Validates: Requirements 7.5**

Property 32: Thread list two-column on tablet
*For any* thread list displayed on a tablet device (viewport width 768px-1023px), it should display in a two-column layout.
**Validates: Requirements 7.6**

## Error Handling

### Error Types and Responses

**Network Errors**:
- Display: "Unable to connect. Please check your internet connection."
- Retryable: Yes
- Action: Show retry button

**Server Errors (5xx)**:
- Display: "Server error. Please try again later."
- Retryable: Yes
- Action: Show retry button

**Validation Errors (4xx)**:
- Display: Specific validation message (e.g., "Subject is required")
- Retryable: No
- Action: Show form errors, no retry button

**API Timeout**:
- Display: "Request timed out. Please try again."
- Retryable: Yes
- Action: Show retry button

### Error Recovery Strategy

1. **Automatic Retry**: Network errors automatically retry after 2 seconds
2. **User-Initiated Retry**: User can click retry button for any retryable error
3. **Graceful Degradation**: If thread list fails, show error state; if thread detail fails, show error in detail view
4. **Error Logging**: All errors logged for debugging and monitoring

## Testing Strategy

### Unit Testing Approach

Unit tests validate specific examples, edge cases, and error conditions:

- **Component Rendering**: Verify components render correctly with various props
- **User Interactions**: Test button clicks, form submissions, modal open/close
- **Data Formatting**: Test date formatting, text truncation, email validation
- **Error Handling**: Test error message display and retry functionality
- **State Management**: Test state updates and transitions

### Property-Based Testing Approach

Property-based tests verify universal properties across all inputs:

- **Data Consistency**: Properties 1, 4 verify data is displayed correctly
- **Validation Logic**: Properties 5, 6 verify form validation works for all inputs
- **State Transitions**: Properties 7, 8 verify state updates after operations
- **UI Responsiveness**: Properties 9, 10, 11 verify loading and error states
- **User Interactions**: Properties 12, 13, 14, 15 verify modal and navigation behavior
- **Responsive Design**: Properties 16, 17, 18, 19 verify layouts for all device sizes

### Test Configuration

- **Minimum Iterations**: 100 iterations per property test
- **Test Tagging**: Each test tagged with feature name and property number
- **Coverage Target**: All testable acceptance criteria covered by properties or unit tests
- **Complementary Testing**: Unit tests handle specific examples; property tests handle universal properties

### Testing Tools

- **Unit Testing**: Jasmine/Karma (Angular testing framework)
- **Property-Based Testing**: fast-check (JavaScript property-based testing library)
- **Component Testing**: Angular TestBed for component isolation
- **E2E Testing**: Cypress for full user workflows (optional, not part of core implementation)

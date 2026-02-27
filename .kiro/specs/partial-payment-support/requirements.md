# Requirements Document

## Introduction

This document specifies the requirements for adding partial payment support to the contract payments system. The system currently only supports full payments, but the API has been updated to handle partial payments. This feature will enable users to register payments in installments, track payment progress, and manage payment documentation.

## Glossary

- **Payment_System**: The contract payments management system
- **Partial_Payment**: A payment that covers only a portion of the total amount due
- **Full_Payment**: A payment that covers the entire amount due
- **Payment_Document**: A file (receipt, invoice, etc.) associated with a payment
- **Amount_Paid**: The cumulative amount paid towards a payment obligation
- **Amount_Pending**: The remaining balance to be paid
- **Payment_Status**: The current state of a payment (pendiente, pagado, parcial, vencido, cancelado)

## Requirements

### Requirement 1: Payment Model Extension

**User Story:** As a developer, I want the payment model to include partial payment fields, so that the system can track payment progress accurately.

#### Acceptance Criteria

1. THE Payment_Model SHALL include an amount_paid field representing the cumulative amount paid
2. THE Payment_Model SHALL include an amount_pending field representing the remaining balance
3. THE Payment_Model SHALL include a first_partial_payment_date field for tracking when partial payments began
4. THE Payment_Model SHALL support a 'parcial' status in addition to existing statuses

### Requirement 2: Partial Payment Registration

**User Story:** As a user, I want to register partial payments with specific amounts, so that I can track installment payments accurately.

#### Acceptance Criteria

1. WHEN a user registers a partial payment, THE Payment_System SHALL validate that the amount does not exceed the amount_pending
2. WHEN a user registers a partial payment, THE Payment_System SHALL update the amount_paid by adding the payment amount
3. WHEN a user registers a partial payment, THE Payment_System SHALL update the amount_pending by subtracting the payment amount
4. WHEN the amount_pending reaches zero through partial payments, THE Payment_System SHALL change the status to 'pagado'
5. WHEN the amount_pending is greater than zero after a partial payment, THE Payment_System SHALL maintain the status as 'parcial'
6. WHEN a partial payment is registered, THE Payment_System SHALL record the payment_date, payment_method, reference_number, and notes

### Requirement 3: Payment Status Display

**User Story:** As a user, I want to see the payment status clearly, so that I can quickly identify partial payments.

#### Acceptance Criteria

1. WHEN displaying a payment with 'parcial' status, THE Payment_System SHALL apply distinctive styling to differentiate it from other statuses
2. WHEN displaying a payment with 'parcial' status, THE Payment_System SHALL show a label indicating partial payment
3. THE Payment_System SHALL display amount_paid and amount_pending for payments with 'parcial' status
4. THE Payment_System SHALL display the first_partial_payment_date when available

### Requirement 4: Payment Statistics

**User Story:** As a user, I want to see statistics about partial payments, so that I can understand payment patterns.

#### Acceptance Criteria

1. THE Payment_System SHALL display a partial_count statistic showing the number of partial payments
2. WHEN the stats are updated, THE Payment_System SHALL include the partial_count in the displayed statistics

### Requirement 5: Payment Action Buttons

**User Story:** As a user, I want to choose between full and partial payment options, so that I can register the appropriate payment type.

#### Acceptance Criteria

1. WHEN a payment is eligible for payment, THE Payment_System SHALL display both "Marcar como Pagado" and "Pago Parcial" buttons
2. WHEN a payment status is 'pagado', THE Payment_System SHALL not display payment action buttons
3. WHEN a payment status is 'cancelado', THE Payment_System SHALL not display payment action buttons

### Requirement 6: Partial Payment Modal

**User Story:** As a user, I want a modal interface for registering partial payments, so that I can enter payment details easily.

#### Acceptance Criteria

1. WHEN the partial payment modal opens, THE Payment_System SHALL display the current amount_pending
2. WHEN a user enters a payment amount, THE Payment_System SHALL validate that it is greater than zero
3. WHEN a user enters a payment amount, THE Payment_System SHALL validate that it does not exceed the amount_pending
4. WHEN a user submits a partial payment, THE Payment_System SHALL require payment_date and payment_method
5. WHEN a user submits a partial payment, THE Payment_System SHALL allow optional reference_number and notes
6. WHEN validation fails, THE Payment_System SHALL display clear error messages
7. WHEN a partial payment is successfully registered, THE Payment_System SHALL close the modal and refresh the payment list

### Requirement 7: Document Management

**User Story:** As a user, I want to upload payment documents, so that I can maintain proof of payment.

#### Acceptance Criteria

1. WHEN a user uploads a document, THE Payment_System SHALL validate that the file size does not exceed 10MB
2. WHEN a user uploads a document, THE Payment_System SHALL validate that the file format is PDF, JPG, PNG, or HEIC
3. WHEN a user uploads a document, THE Payment_System SHALL require a document_type selection
4. WHEN a user uploads a document, THE Payment_System SHALL allow optional notes
5. THE Payment_System SHALL support document_type values: 'comprobante_transferencia', 'foto_deposito', 'recibo', 'factura', 'otro'
6. WHEN a document upload succeeds, THE Payment_System SHALL display the document in the payment's document list
7. WHEN a document upload fails, THE Payment_System SHALL display an error message

### Requirement 8: Document Display and Access

**User Story:** As a user, I want to view and download payment documents, so that I can access payment records.

#### Acceptance Criteria

1. WHEN a payment has documents, THE Payment_System SHALL display a list of all associated documents
2. WHEN displaying a document, THE Payment_System SHALL show the document_type, upload date, and notes
3. WHEN a user clicks on a document, THE Payment_System SHALL generate a temporary download URL
4. WHEN generating a download URL, THE Payment_System SHALL set an expiration time of 3600 seconds
5. WHEN a user downloads a document, THE Payment_System SHALL open the document in a new browser tab

### Requirement 9: Document Deletion

**User Story:** As a user, I want to delete payment documents, so that I can remove incorrect or outdated files.

#### Acceptance Criteria

1. WHEN a user requests to delete a document, THE Payment_System SHALL display a confirmation dialog
2. WHEN a user confirms deletion, THE Payment_System SHALL remove the document from storage
3. WHEN a document is deleted, THE Payment_System SHALL remove it from the document list
4. WHEN document deletion fails, THE Payment_System SHALL display an error message

### Requirement 10: Service Layer Integration

**User Story:** As a developer, I want service methods for partial payments and documents, so that components can interact with the API consistently.

#### Acceptance Criteria

1. THE Payment_Service SHALL provide a registerPartialPayment method that accepts contractId, paymentId, and payment details
2. THE Payment_Service SHALL provide an uploadDocument method that accepts contractId, paymentId, and document data
3. THE Payment_Service SHALL provide a getDocuments method that accepts contractId and paymentId
4. THE Payment_Service SHALL provide a getDocumentUrl method that accepts contractId, paymentId, and documentId
5. THE Payment_Service SHALL provide a deleteDocument method that accepts contractId, paymentId, and documentId
6. WHEN API calls fail, THE Payment_Service SHALL propagate errors to the calling component

### Requirement 11: Error Handling

**User Story:** As a user, I want clear error messages when operations fail, so that I can understand what went wrong.

#### Acceptance Criteria

1. WHEN a partial payment registration fails, THE Payment_System SHALL display an error message from the API response
2. WHEN a document upload fails, THE Payment_System SHALL display an error message indicating the failure reason
3. WHEN a document deletion fails, THE Payment_System SHALL display an error message
4. WHEN network errors occur, THE Payment_System SHALL display a user-friendly error message
5. THE Payment_System SHALL use the existing InterceptorService for error handling

### Requirement 12: UI Component Integration

**User Story:** As a developer, I want to use existing UI components, so that the interface remains consistent.

#### Acceptance Criteria

1. THE Payment_System SHALL use ButtonComponent for all action buttons
2. THE Payment_System SHALL use InputComponent for all text inputs
3. THE Payment_System SHALL use SelectComponent for all dropdown selections
4. THE Payment_System SHALL use MatDialog for modal dialogs
5. THE Payment_System SHALL use LucideAngular icons for all icons
6. THE Payment_System SHALL use Tailwind CSS for styling
7. THE Payment_System SHALL use signals for reactive state management

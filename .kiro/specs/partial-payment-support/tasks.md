# Implementation Plan: Partial Payment Support

## Overview

This implementation plan breaks down the partial payment feature into incremental coding tasks. Each task builds on previous work, with testing integrated throughout to catch errors early. The plan follows the existing Angular patterns and integrates with the current contract payments system.

## Tasks

- [ ] 1. Update data models and types
  - Update Payment interface to include amount_paid, amount_pending, first_partial_payment_date fields
  - Update PaymentStatus type to include 'parcial' status
  - Update PaymentStats interface to include partial_count field
  - Create RegisterPartialPaymentDto interface
  - Create PaymentDocument interface and DocumentType type
  - Create UploadDocumentDto interface
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.5_

- [ ]* 1.1 Write unit tests for model interfaces
  - Test that Payment interface includes all required fields
  - Test that PaymentStatus includes 'parcial'
  - Test that DocumentType includes all valid types
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.5_

- [ ] 2. Extend PaymentService with new methods
  - [ ] 2.1 Implement registerPartialPayment method
    - Add method to call POST /tenant/contracts/:contractId/payments/:paymentId/partial-payment
    - Accept RegisterPartialPaymentDto as parameter
    - Return Observable<Payment>
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.1_
  
  - [ ] 2.2 Implement document management methods
    - Add uploadDocument method with FormData handling
    - Add getDocuments method
    - Add getDocumentUrl method with expiresIn parameter (default 3600)
    - Add deleteDocument method
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6, 7.7, 8.3, 8.4, 9.2, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 2.3 Write unit tests for PaymentService new methods
    - Test registerPartialPayment calls correct endpoint with correct data
    - Test uploadDocument sends FormData correctly
    - Test getDocumentUrl includes expiresIn parameter
    - Test error propagation for all methods
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 3. Update ContractPaymentsComponent for partial payment display
  - [ ] 3.1 Update status handling methods
    - Update getStatusClass to include 'parcial' with appropriate Tailwind classes (e.g., bg-blue-100 text-blue-800)
    - Update getStatusLabel to return 'Parcial' for 'parcial' status
    - Add canMarkAsPartiallyPaid method (returns true for 'pendiente' or 'vencido' status)
    - _Requirements: 3.1, 3.2, 5.1, 5.2, 5.3_
  
  - [ ] 3.2 Update template to display partial payment information
    - Add display of amount_paid and amount_pending for payments with 'parcial' status
    - Add display of first_partial_payment_date when available
    - Update stats section to display partial_count
    - Add "Pago Parcial" button alongside "Marcar como Pagado" for eligible payments
    - _Requirements: 3.3, 3.4, 4.1, 5.1_
  
  - [ ] 3.3 Add markAsPartiallyPaid method
    - Open PartialPaymentModalComponent with MatDialog
    - Pass payment, contractId, and currency as data
    - Refresh payments and stats on dialog close with result
    - _Requirements: 5.1, 6.7_
  
  - [ ]* 3.4 Write unit tests for ContractPaymentsComponent updates
    - Test getStatusClass returns correct classes for 'parcial'
    - Test getStatusLabel returns 'Parcial' for 'parcial'
    - Test canMarkAsPartiallyPaid returns true for eligible statuses
    - Test markAsPartiallyPaid opens dialog with correct data
    - _Requirements: 3.1, 3.2, 5.1, 5.2, 5.3_

- [ ] 4. Create PartialPaymentModalComponent
  - [ ] 4.1 Create component with form and validation
    - Create standalone component with required imports
    - Set up reactive form with fields: amount, payment_date, payment_method, reference_number, notes
    - Add validators: amount (required, min: 0.01, max: amount_pending), payment_date (required), payment_method (required)
    - Implement custom validator for amount not exceeding amount_pending
    - Set up payment method select config with options: transferencia, efectivo, tarjeta, cheque
    - Initialize payment_date with today's date
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [ ] 4.2 Implement save and close methods
    - Implement save method: validate form, call PaymentService.registerPartialPayment, handle success/error
    - Implement close method: close dialog without saving
    - Display amount_pending in modal header
    - Show validation errors inline
    - Use InterceptorService for error messages
    - _Requirements: 6.6, 6.7, 11.1_
  
  - [ ] 4.3 Create template with form fields
    - Create modal layout with header showing payment details and amount_pending
    - Add form fields using InputComponent and SelectComponent
    - Add action buttons using ButtonComponent
    - Style with Tailwind CSS following existing modal patterns
    - Add LucideAngular icons (X for close)
    - _Requirements: 6.1, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [ ]* 4.4 Write property test for amount validation
    - **Property 2: Partial Payment Amount Validation**
    - **Property 6: Amount Validation - Positive Values**
    - Generate random amounts (negative, zero, exceeding amount_pending)
    - Verify form validation rejects invalid amounts
    - _Requirements: 2.1, 6.2, 6.3_
  
  - [ ]* 4.5 Write unit tests for PartialPaymentModalComponent
    - Test form initialization with correct validators
    - Test save method calls service with form values
    - Test close method closes dialog
    - Test error handling displays messages
    - Test amount_pending display
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ] 5. Checkpoint - Ensure partial payment registration works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Create PaymentDocumentsComponent
  - [ ] 6.1 Create component structure and state
    - Create standalone component with required imports
    - Set up signals: documents, uploading, deleting
    - Set up reactive form for upload: file, document_type, notes
    - Add document_type select config with options: comprobante_transferencia, foto_deposito, recibo, factura, otro
    - Implement ngOnInit to load documents
    - _Requirements: 7.3, 7.4, 8.1_
  
  - [ ] 6.2 Implement file validation
    - Create validateFile method checking size (max 10MB) and format (pdf, jpg, jpeg, png, heic)
    - Implement onFileSelected handler with validation
    - Display validation errors
    - _Requirements: 7.1, 7.2_
  
  - [ ] 6.3 Implement document operations
    - Implement loadDocuments method calling PaymentService.getDocuments
    - Implement uploadDocument method: validate, create FormData, call service, refresh list
    - Implement downloadDocument method: call getDocumentUrl, open in new tab with window.open
    - Implement deleteDocument method: show confirmation, call service, refresh list
    - Handle errors with InterceptorService
    - _Requirements: 7.6, 7.7, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 11.2, 11.3_
  
  - [ ] 6.4 Create template for document management
    - Create upload form with file input, document_type select, notes input
    - Create document list showing document_type, upload date, notes
    - Add download and delete buttons for each document
    - Style with Tailwind CSS
    - Add LucideAngular icons (Upload, Download, Trash2)
    - _Requirements: 8.1, 8.2, 12.1, 12.2, 12.3, 12.5, 12.6, 12.7_
  
  - [ ]* 6.5 Write property tests for file validation
    - **Property 7: File Size Validation**
    - **Property 8: File Format Validation**
    - Generate mock files with various sizes and formats
    - Verify validation rejects invalid files
    - _Requirements: 7.1, 7.2_
  
  - [ ]* 6.6 Write unit tests for PaymentDocumentsComponent
    - Test loadDocuments populates documents signal
    - Test validateFile rejects invalid files
    - Test uploadDocument calls service and refreshes list
    - Test downloadDocument generates URL and opens tab
    - Test deleteDocument shows confirmation and calls service
    - Test error handling displays messages
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6, 7.7, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4_

- [ ] 7. Integrate PaymentDocumentsComponent into ContractPaymentsComponent
  - [ ] 7.1 Add PaymentDocumentsComponent to payment rows
    - Import PaymentDocumentsComponent
    - Add component to template for each payment (expandable section or inline)
    - Pass contractId and paymentId as inputs
    - Style integration to match existing design
    - _Requirements: 8.1_
  
  - [ ]* 7.2 Write integration test for document display
    - Test that PaymentDocumentsComponent appears for each payment
    - Test that correct contractId and paymentId are passed
    - _Requirements: 8.1_

- [ ] 8. Write property tests for payment state transitions
  - [ ]* 8.1 Write property test for payment amount invariant
    - **Property 1: Payment Amount Invariant**
    - Generate random payments with various amounts
    - Simulate sequences of partial payments
    - Verify amount_paid + amount_pending always equals original amount
    - _Requirements: 2.2, 2.3_
  
  - [ ]* 8.2 Write property test for status transition to paid
    - **Property 3: Status Transition to Paid**
    - Generate random payments
    - Simulate partial payments that sum to total amount
    - Verify status transitions to 'pagado' when amount_pending reaches zero
    - _Requirements: 2.4_
  
  - [ ]* 8.3 Write property test for status remains partial
    - **Property 4: Status Remains Partial**
    - Generate random payments
    - Simulate partial payments that don't complete total
    - Verify status remains 'parcial' when amount_pending > 0
    - _Requirements: 2.5_
  
  - [ ]* 8.4 Write property test for payment details persistence
    - **Property 5: Payment Details Persistence**
    - Generate random payment details
    - Simulate registration and retrieval
    - Verify all details are correctly persisted
    - _Requirements: 2.6_

- [ ] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- Integration is incremental: models → service → components → integration
- Document management is built as a separate component for reusability
- All new code follows existing Angular 18+ patterns with standalone components and signals

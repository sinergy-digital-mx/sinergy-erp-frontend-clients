import { MatDialogConfig } from '@angular/material/dialog';

const formDialogBase: MatDialogConfig = {
  maxWidth: '95vw',
  maxHeight: '90vh',
};

export const CUSTOMER_FORM_DIALOG_CONFIG: MatDialogConfig = {
  ...formDialogBase,
  width: '700px',
  panelClass: 'customer-edit-dialog',
  autoFocus: 'first-tabbable',
};

export const PROPERTY_FORM_DIALOG_CONFIG: MatDialogConfig = {
  ...formDialogBase,
  width: '700px',
  panelClass: 'property-edit-dialog',
};

export const CONTRACT_CREATE_DIALOG_CONFIG: MatDialogConfig = {
  ...formDialogBase,
  width: '900px',
  panelClass: 'contract-create-dialog',
};

import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface InvoicePdfViewerData {
  url: string;
  title?: string;
}

/** Muestra un PDF dentro del sistema, encima del detalle que esté abierto. */
export function openInvoicePdfViewer(dialog: MatDialog, url: string, title?: string): void {
  dialog.open(InvoicePdfViewerDialogComponent, {
    width: 'min(1040px, 96vw)',
    maxWidth: '96vw',
    height: '92vh',
    maxHeight: '92vh',
    panelClass: 'invoice-pdf-dialog-panel',
    autoFocus: false,
    data: { url, title } satisfies InvoicePdfViewerData,
  });
}

@Component({
  selector: 'app-invoice-pdf-viewer-dialog',
  standalone: true,
  templateUrl: './invoice-pdf-viewer-dialog.component.html',
  styleUrl: './invoice-pdf-viewer-dialog.component.scss',
})
export class InvoicePdfViewerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<InvoicePdfViewerDialogComponent>);
  private readonly data = inject<InvoicePdfViewerData>(MAT_DIALOG_DATA);
  private readonly sanitizer = inject(DomSanitizer);

  readonly title = this.data.title?.trim() || 'PDF';
  readonly fileUrl = this.data.url;
  readonly pdfUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);

  close(): void {
    this.dialogRef.close();
  }
}

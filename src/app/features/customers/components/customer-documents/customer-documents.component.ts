import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDocumentService } from '../../services/customer-document.service';
import { CustomerDocument, DocumentStatus } from '../../models/customer-document.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DocumentUploadModalComponent } from '../document-upload-modal/document-upload-modal.component';
import { LucideAngularModule, Plus, Download, Trash2, FileText, Image, FileCheck, FileX } from 'lucide-angular';

@Component({
  selector: 'app-customer-documents',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './customer-documents.component.html',
  styleUrls: ['./customer-documents.component.scss']
})
export class CustomerDocumentsComponent implements OnInit {
  @Input() customerId!: string;

  documents = signal<CustomerDocument[]>([]);
  loading = signal(false);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Trash2 = Trash2;
  readonly FileText = FileText;
  readonly Image = Image;
  readonly FileCheck = FileCheck;
  readonly FileX = FileX;

  constructor(
    private documentService: CustomerDocumentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.loading.set(true);
    this.documentService.getCustomerDocuments(this.customerId).subscribe({
      next: (docs) => {
        this.documents.set(docs);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los documentos'
        });
      }
    });
  }

  openUploadModal() {
    const dialogRef = this.dialog.open(DocumentUploadModalComponent, {
      data: { customerId: this.customerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDocuments();
      }
    });
  }

  deleteDocument(doc: CustomerDocument) {
    if (!confirm(`¿Eliminar documento "${doc.file_name}"?`)) return;

    this.documentService.deleteDocument(this.customerId, doc.id).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Documento eliminado'
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudo eliminar el documento'
        });
      }
    });
  }

  updateStatus(doc: CustomerDocument, status: DocumentStatus) {
    this.documentService.updateDocumentStatus(this.customerId, doc.id, { status }).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Estado actualizado'
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudo actualizar el estado'
        });
      }
    });
  }

  getStatusClass(status: DocumentStatus): string {
    const statusMap: Record<DocumentStatus, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status]}`;
  }

  getStatusLabel(status: DocumentStatus): string {
    const labels: Record<DocumentStatus, string> = {
      'pending': 'Pendiente',
      'approved': 'Aprobado',
      'rejected': 'Rechazado'
    };
    return labels[status];
  }

  getFileIcon(mimeType: string): any {
    if (mimeType.startsWith('image/')) return this.Image;
    if (mimeType.includes('pdf')) return this.FileText;
    return this.FileText;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

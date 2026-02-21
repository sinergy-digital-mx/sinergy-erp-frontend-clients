import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ContractDocumentService } from '../../services/contract-document.service';
import { ContractDocument, DocumentStatus } from '../../models/contract-document.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ContractDocumentUploadModalComponent } from '../contract-document-upload-modal/contract-document-upload-modal.component';
import { LucideAngularModule, Plus, Download, Trash2, FileText, Image, FileCheck, FileX } from 'lucide-angular';

@Component({
  selector: 'app-contract-documents',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './contract-documents.component.html',
  styleUrls: ['./contract-documents.component.scss']
})
export class ContractDocumentsComponent implements OnInit {
  @Input() contractId!: string;

  documents = signal<ContractDocument[]>([]);
  loading = signal(false);

  readonly Plus = Plus;
  readonly Download = Download;
  readonly Trash2 = Trash2;
  readonly FileText = FileText;
  readonly Image = Image;
  readonly FileCheck = FileCheck;
  readonly FileX = FileX;

  constructor(
    private documentService: ContractDocumentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.loading.set(true);
    this.documentService.getContractDocuments(this.contractId).subscribe({
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
    const dialogRef = this.dialog.open(ContractDocumentUploadModalComponent, {
      data: { contractId: this.contractId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDocuments();
      }
    });
  }

  deleteDocument(doc: ContractDocument) {
    if (!confirm(`¿Eliminar documento "${doc.file_name}"?`)) return;

    this.documentService.deleteDocument(this.contractId, doc.id).subscribe({
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

  updateStatus(doc: ContractDocument, status: DocumentStatus) {
    this.documentService.updateDocumentStatus(this.contractId, doc.id, { status }).subscribe({
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

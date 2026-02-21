import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CustomerDocumentService } from '../../services/customer-document.service';
import { DocumentType } from '../../models/customer-document.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, Upload, X } from 'lucide-angular';

@Component({
  selector: 'app-document-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './document-upload-modal.component.html',
  styleUrls: ['./document-upload-modal.component.scss']
})
export class DocumentUploadModalComponent {
  documentTypes = signal<DocumentType[]>([]);
  uploading = signal(false);

  selectedFile: File | null = null;
  selectedTypeId: string = '';
  expirationDate: string = '';
  notes: string = '';

  readonly Upload = Upload;
  readonly X = X;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string },
    private dialogRef: MatDialogRef<DocumentUploadModalComponent>,
    private documentService: CustomerDocumentService,
    private interceptorService: InterceptorService
  ) {
    this.loadDocumentTypes();
  }

  loadDocumentTypes() {
    this.documentService.getDocumentTypes().subscribe({
      next: (types) => {
        this.documentTypes.set(types);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los tipos de documento'
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'El archivo es muy grande (máximo 10MB)'
        });
        return;
      }
      this.selectedFile = file;
    }
  }

  uploadDocument() {
    if (!this.selectedFile || !this.selectedTypeId) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Selecciona un archivo y tipo de documento'
      });
      return;
    }

    this.uploading.set(true);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('document_type_id', this.selectedTypeId);
    if (this.expirationDate) {
      formData.append('expiration_date', this.expirationDate);
    }
    if (this.notes) {
      formData.append('notes', this.notes);
    }

    this.documentService.uploadDocument(this.data.customerId, formData).subscribe({
      next: () => {
        this.uploading.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Documento subido correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.uploading.set(false);
        let message = 'Error al subir documento';
        if (err.status === 413) {
          message = 'Archivo muy grande (máximo 10MB)';
        } else if (err.status === 415) {
          message = 'Tipo de archivo no permitido';
        }
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

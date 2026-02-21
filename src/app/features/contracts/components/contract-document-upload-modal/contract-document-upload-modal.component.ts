import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ContractDocumentService } from '../../services/contract-document.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, Upload, X } from 'lucide-angular';

@Component({
  selector: 'app-contract-document-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './contract-document-upload-modal.component.html',
  styleUrls: ['./contract-document-upload-modal.component.scss']
})
export class ContractDocumentUploadModalComponent {
  uploading = signal(false);

  selectedFile: File | null = null;
  notes: string = '';

  readonly Upload = Upload;
  readonly X = X;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { contractId: string },
    private dialogRef: MatDialogRef<ContractDocumentUploadModalComponent>,
    private documentService: ContractDocumentService,
    private interceptorService: InterceptorService
  ) {}

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
    if (!this.selectedFile) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Selecciona un archivo'
      });
      return;
    }

    this.uploading.set(true);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    if (this.notes) {
      formData.append('notes', this.notes);
    }

    this.documentService.uploadDocument(this.data.contractId, formData).subscribe({
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

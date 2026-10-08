import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Download, LucideAngularModule, Upload } from 'lucide-angular';
import { CloseButtonComponent } from '../../../../core/components/close-button/close-button.component';
import { PropertyService } from '../../services/property.service';
import { PropertyImportRowError } from '../../models/property.model';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { CustomerGroupFetchService } from '../../../customers/services/customer-group-fetch.service';
import { CustomerGroup } from '../../../customers/models/customer-group.model';

@Component({
  selector: 'app-property-import-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, LucideAngularModule, CloseButtonComponent],
  templateUrl: './property-import-modal.component.html',
  styleUrl: './property-import-modal.component.scss',
})
export class PropertyImportModalComponent implements OnInit {
  Download = Download;
  Upload = Upload;
  file: File | null = null;
  downloading = false;
  importing = false;
  errors: PropertyImportRowError[] = [];
  groups: CustomerGroup[] = [];
  groupId = '';

  constructor(
    private dialogRef: MatDialogRef<PropertyImportModalComponent, number | undefined>,
    private propertyService: PropertyService,
    private toast: ToastService,
    private customerGroupFetch: CustomerGroupFetchService,
    @Inject(MAT_DIALOG_DATA) data: { groupId?: string | null } | null,
  ) {
    this.groupId = data?.groupId ?? '';
  }

  ngOnInit(): void {
    this.customerGroupFetch.fetchGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: () => {
        this.toast.error('No pudimos cargar los grupos de cliente.');
      },
    });
  }

  close(): void {
    if (this.importing) {
      return;
    }
    this.dialogRef.close();
  }

  downloadTemplate(): void {
    this.downloading = true;
    this.propertyService.downloadImportTemplate().subscribe({
      next: ({ blob, filename }) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: (error) => {
        this.downloading = false;
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo descargar la plantilla.'));
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selected = input.files?.[0] ?? null;
    this.file = selected;
    this.errors = [];
  }

  importFile(): void {
    if (!this.file || !this.groupId || this.importing) {
      return;
    }
    this.importing = true;
    this.errors = [];
    this.propertyService.importProperties(this.file, this.groupId).subscribe({
      next: (result) => {
        this.importing = false;
        const count = result?.created ?? 0;
        this.toast.success(count === 1 ? 'Se creó 1 lote.' : `Se crearon ${count} lotes.`);
        this.dialogRef.close(count);
      },
      error: (error) => {
        this.importing = false;
        this.errors = this.readRowErrors(error);
        if (!this.errors.length) {
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudieron importar los lotes.'));
        }
      },
    });
  }

  private readRowErrors(error: unknown): PropertyImportRowError[] {
    const body = (error as { error?: { errors?: unknown } })?.error;
    if (!Array.isArray(body?.errors)) {
      return [];
    }
    return body.errors.filter(
      (item): item is PropertyImportRowError =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as PropertyImportRowError).row === 'number' &&
        typeof (item as PropertyImportRowError).message === 'string',
    );
  }
}

import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Copy, Download, LucideAngularModule, Upload } from 'lucide-angular';
import { interval, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CloseButtonComponent } from '../../../../core/components/close-button/close-button.component';
import { PropertyService } from '../../services/property.service';
import { PropertyImportJob, PropertyImportRowError } from '../../models/property.model';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

const POLL_INTERVAL_MS = 900;

@Component({
  selector: 'app-property-import-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LucideAngularModule, CloseButtonComponent],
  templateUrl: './property-import-modal.component.html',
  styleUrl: './property-import-modal.component.scss',
})
export class PropertyImportModalComponent implements OnDestroy {
  Download = Download;
  Upload = Upload;
  Copy = Copy;
  file: File | null = null;
  downloading = false;
  importing = false;
  job: PropertyImportJob | null = null;
  failMessage = '';
  errors: PropertyImportRowError[] = [];
  skipped: PropertyImportRowError[] = [];
  createdCount = 0;
  done = false;

  private readonly destroy$ = new Subject<void>();
  private readonly stopPoll$ = new Subject<void>();
  private pollSub?: Subscription;

  constructor(
    private dialogRef: MatDialogRef<PropertyImportModalComponent, number | undefined>,
    private propertyService: PropertyService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  get progressPercent(): number {
    const percent = this.job?.percent ?? 0;
    if (!Number.isFinite(percent)) {
      return 0;
    }
    return Math.min(100, Math.max(0, percent));
  }

  get progressLabel(): string {
    if (!this.job) {
      return 'Leyendo el archivo…';
    }
    if (this.job.message?.trim()) {
      return this.job.message.trim();
    }
    if (this.job.total > 0) {
      return `Importando ${this.job.processed} de ${this.job.total}`;
    }
    return this.job.status === 'queued' ? 'En cola…' : 'Importando…';
  }

  get skippedCopyText(): string {
    return this.skipped
      .map((item) => {
        const code = item.code?.trim() ? `${item.code} — ` : '';
        return `Fila ${item.row}: ${code}${item.message}`;
      })
      .join('\n');
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();
    this.stopPoll$.complete();
  }

  close(): void {
    if (this.importing) {
      return;
    }
    this.dialogRef.close(this.createdCount || undefined);
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
    this.failMessage = '';
    this.job = null;
    this.skipped = [];
    this.createdCount = 0;
    this.done = false;
  }

  importFile(): void {
    if (!this.file || this.importing || this.done) {
      return;
    }
    this.importing = true;
    this.errors = [];
    this.failMessage = '';
    this.skipped = [];
    this.createdCount = 0;
    this.done = false;
    this.job = null;
    this.dialogRef.disableClose = true;

    this.propertyService.startImport(this.file).subscribe({
      next: (job) => this.applyJob(job),
      error: (error) => {
        this.finishImport();
        this.errors = this.readRowErrors(error);
        this.failMessage = resolveHttpErrorMessage(
          error,
          'No se pudieron importar los lotes.',
        );
        if (!this.errors.length) {
          this.toast.error(this.failMessage);
        }
        this.cdr.detectChanges();
      },
    });
  }

  async copySkipped(): Promise<void> {
    const text = this.skippedCopyText;
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      this.toast.success('Lista copiada.');
    } catch {
      this.toast.error('No se pudo copiar. Selecciona el texto a mano.');
    }
  }

  private applyJob(job: PropertyImportJob): void {
    this.job = job;
    this.cdr.detectChanges();

    if (job.status === 'completed') {
      this.stopPolling();
      this.createdCount = job.result?.created ?? job.processed ?? 0;
      this.skipped = job.result?.skipped ?? [];
      this.done = true;
      this.finishImport();
      const summary =
        job.message?.trim() ||
        (this.createdCount === 1 ? 'Se creó 1 lote.' : `Se crearon ${this.createdCount} lotes.`);
      if (this.skipped.length) {
        if (this.createdCount > 0) {
          this.toast.success(summary);
        } else {
          this.toast.warning(summary);
        }
        this.cdr.detectChanges();
        return;
      }
      this.toast.success(summary);
      this.dialogRef.close(this.createdCount);
      return;
    }

    if (job.status === 'failed') {
      this.stopPolling();
      this.finishImport();
      this.failMessage = job.error?.trim() || 'La importación falló.';
      this.toast.error(this.failMessage);
      this.cdr.detectChanges();
      return;
    }

    if (!this.pollSub) {
      if (!job.id) {
        this.finishImport();
        this.failMessage = 'No se recibió el identificador del trabajo.';
        this.toast.error(this.failMessage);
        return;
      }
      this.startPolling(job.id);
    }
  }

  private startPolling(jobId: string): void {
    this.stopPolling();
    this.pollSub = interval(POLL_INTERVAL_MS)
      .pipe(
        switchMap(() => this.propertyService.getImportJob(jobId)),
        takeUntil(this.stopPoll$),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (job) => this.applyJob(job),
        error: (error) => {
          this.stopPolling();
          this.finishImport();
          this.failMessage = resolveHttpErrorMessage(
            error,
            'No se pudo consultar el progreso de la importación.',
          );
          this.toast.error(this.failMessage);
          this.cdr.detectChanges();
        },
      });
  }

  private stopPolling(): void {
    this.stopPoll$.next();
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
  }

  private finishImport(): void {
    this.importing = false;
    this.dialogRef.disableClose = false;
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

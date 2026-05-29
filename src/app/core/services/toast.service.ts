import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';
import { ToastData, ToastOptions, ToastType } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly defaultDuration: Record<ToastType, number> = {
    success: 4000,
    error: 5500,
    warning: 4500,
    info: 4000,
    highlight: 4000,
  };

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: ToastType = 'info', options?: ToastOptions): void {
    const trimmed = message?.trim();
    if (!trimmed) return;

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: options?.duration ?? this.defaultDuration[type],
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
      panelClass: ['app-toast-panel'],
      data: {
        message: trimmed,
        title: options?.title,
        type,
      } satisfies ToastData,
    });
  }

  success(message: string, options?: ToastOptions): void {
    this.show(message, 'success', options);
  }

  error(message: string, options?: ToastOptions): void {
    this.show(message, 'error', options);
  }

  warning(message: string, options?: ToastOptions): void {
    this.show(message, 'warning', options);
  }

  info(message: string, options?: ToastOptions): void {
    this.show(message, 'info', options);
  }

  highlight(message: string, options?: ToastOptions): void {
    this.show(message, 'highlight', options);
  }
}

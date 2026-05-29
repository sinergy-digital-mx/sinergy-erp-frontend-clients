import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  LucideAngularModule,
  Sparkles,
  X,
} from 'lucide-angular';
import { ToastData, ToastType } from '../../models/toast.model';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent {
  readonly CircleCheck = CircleCheck;
  readonly CircleX = CircleX;
  readonly CircleAlert = CircleAlert;
  readonly Info = Info;
  readonly Sparkles = Sparkles;
  readonly X = X;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData,
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
  ) {}

  get type(): ToastType {
    return this.data?.type ?? 'info';
  }

  get hasCustomTitle(): boolean {
    return !!this.data?.title?.trim();
  }

  get displayTitle(): string {
    if (this.hasCustomTitle) {
      return this.data.title!.trim();
    }
    return this.data?.message?.trim() || this.fallbackTitle;
  }

  get displayMessage(): string {
    return this.hasCustomTitle ? this.data?.message?.trim() || '' : '';
  }

  private get fallbackTitle(): string {
    switch (this.type) {
      case 'success':
        return 'Operación exitosa';
      case 'error':
        return 'Ocurrió un error';
      case 'warning':
        return 'Revisa esta información';
      case 'highlight':
        return 'Aviso';
      default:
        return 'Información';
    }
  }

  iconForType(): typeof CircleCheck {
    switch (this.type) {
      case 'success':
        return this.CircleCheck;
      case 'error':
        return this.CircleX;
      case 'warning':
        return this.CircleAlert;
      case 'highlight':
        return this.Sparkles;
      default:
        return this.Info;
    }
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}

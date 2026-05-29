export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'highlight';

export interface ToastData {
  message: string;
  title?: string;
  type: ToastType;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
}

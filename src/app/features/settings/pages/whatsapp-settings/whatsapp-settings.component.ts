import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageCircle, RefreshCw, Unplug } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { WHATSAPP_PERMISSIONS } from '../../config/whatsapp-permissions.config';
import {
  WhatsappConnectionState,
  WhatsappMessage,
  WhatsappSession,
} from '../../models/whatsapp.model';
import { WhatsappService } from '../../services/whatsapp.service';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ERRORS = 5;

@Component({
  selector: 'app-whatsapp-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, LucideAngularModule],
  templateUrl: './whatsapp-settings.component.html',
})
export class WhatsappSettingsComponent implements OnInit, OnDestroy {
  readonly MessageCircle = MessageCircle;
  readonly RefreshCw = RefreshCw;
  readonly Unplug = Unplug;

  session = signal<WhatsappSession | null>(null);
  qrDataUrl = signal<string | null>(null);
  loading = signal(true);
  busy = signal(false);
  messages = signal<WhatsappMessage[]>([]);

  pairingPhone = '';
  pairingCode = signal<string | null>(null);
  testPhone = '';
  testText = 'Hola, esta es una prueba de WhatsApp desde el ERP.';

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private pollErrors = 0;

  constructor(
    private whatsapp: WhatsappService,
    private auth: AuthService,
    private interceptor: InterceptorService
  ) {}

  get canUpdate(): boolean {
    return this.auth.hasPermission(WHATSAPP_PERMISSIONS.update);
  }
  get canCreate(): boolean {
    return this.auth.hasPermission(WHATSAPP_PERMISSIONS.create);
  }
  get canDelete(): boolean {
    return this.auth.hasPermission(WHATSAPP_PERMISSIONS.delete);
  }

  ngOnInit(): void {
    this.loadStatus();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  get state(): WhatsappConnectionState {
    return this.session()?.state ?? 'not_configured';
  }

  stateLabel(): string {
    const labels: Record<WhatsappConnectionState, string> = {
      not_configured: 'Sin conectar',
      disconnected: 'Desconectado',
      starting: 'Iniciando…',
      waiting_qr: 'Esperando que escanees el QR',
      connected: 'Conectado',
      failed: 'Falló la conexión',
    };
    return labels[this.state];
  }

  badgeClass(): string {
    switch (this.state) {
      case 'connected':
        return 'bg-green-100 text-green-700';
      case 'starting':
      case 'waiting_qr':
        return 'bg-amber-100 text-amber-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  messageStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      queued: 'En cola',
      sending: 'Enviando',
      sent: 'Enviado',
      delivered: 'Entregado',
      read: 'Leído',
      failed: 'Falló',
    };
    return labels[status] ?? status;
  }

  connect(): void {
    this.busy.set(true);
    this.pairingCode.set(null);
    this.whatsapp.connect().subscribe({
      next: (session) => {
        this.busy.set(false);
        this.applySession(session);
        this.refreshQr();
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo iniciar WhatsApp');
      },
    });
  }

  requestPairingCode(): void {
    if (!this.pairingPhone.trim()) return;
    this.busy.set(true);
    this.whatsapp.pairingCode(this.pairingPhone.trim()).subscribe({
      next: ({ code }) => {
        this.busy.set(false);
        this.pairingCode.set(code);
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo generar el código');
      },
    });
  }

  restart(): void {
    this.busy.set(true);
    this.whatsapp.restart().subscribe({
      next: (session) => {
        this.busy.set(false);
        this.applySession(session);
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo reiniciar WhatsApp');
      },
    });
  }

  logout(): void {
    if (!confirm('¿Desvincular el teléfono? Tendrás que escanear el QR de nuevo.')) return;
    this.busy.set(true);
    this.whatsapp.logout().subscribe({
      next: (session) => {
        this.busy.set(false);
        this.qrDataUrl.set(null);
        this.applySession(session);
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo desvincular WhatsApp');
      },
    });
  }

  remove(): void {
    if (!confirm('¿Eliminar la conexión de WhatsApp de tu empresa?')) return;
    this.busy.set(true);
    this.whatsapp.remove().subscribe({
      next: () => {
        this.busy.set(false);
        this.stopPolling();
        this.qrDataUrl.set(null);
        this.messages.set([]);
        this.loadStatus();
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo eliminar la conexión');
      },
    });
  }

  sendTest(): void {
    if (!this.testPhone.trim() || !this.testText.trim()) return;
    this.busy.set(true);
    this.whatsapp.sendText({ phone: this.testPhone.trim(), text: this.testText.trim() }).subscribe({
      next: () => {
        this.busy.set(false);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'En cola',
          message: 'El mensaje se enviará en unos segundos',
        });
        this.loadMessages();
      },
      error: (err) => {
        this.busy.set(false);
        this.toastError(err, 'No se pudo enviar el mensaje');
      },
    });
  }

  loadMessages(): void {
    this.whatsapp.messages(1, 10).subscribe({
      next: (page) => this.messages.set(page.data),
      error: () => this.messages.set([]),
    });
  }

  private loadStatus(): void {
    this.loading.set(true);
    this.whatsapp.status().subscribe({
      next: (session) => {
        this.loading.set(false);
        this.applySession(session);
        if (session.state === 'waiting_qr') this.refreshQr();
      },
      error: (err) => {
        this.loading.set(false);
        this.toastError(err, 'No se pudo consultar WhatsApp');
      },
    });
  }

  /** Cambia de estado y enciende o apaga el sondeo del QR según corresponda. */
  private applySession(session: WhatsappSession): void {
    const previous = this.state;
    this.session.set(session);
    if (session.state !== 'waiting_qr') this.qrDataUrl.set(null);

    if (session.state === 'starting' || session.state === 'waiting_qr') {
      this.startPolling();
    } else {
      this.stopPolling();
    }

    if (session.state === 'connected') {
      this.pairingCode.set(null);
      if (previous !== 'connected') {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'WhatsApp conectado',
          message: session.phone_number ? `Número +${session.phone_number}` : 'Listo para enviar',
        });
      }
      this.loadMessages();
    }
  }

  private startPolling(): void {
    if (this.pollTimer) return;
    this.pollErrors = 0;
    this.pollTimer = setInterval(() => this.refreshQr(), POLL_INTERVAL_MS);
  }

  private stopPolling(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  private refreshQr(): void {
    if (!this.canUpdate) return;
    this.whatsapp.qr().subscribe({
      next: (response) => {
        this.pollErrors = 0;
        const { qr_data_url, ...session } = response;
        this.applySession(session);
        this.qrDataUrl.set(session.state === 'waiting_qr' ? qr_data_url : null);
      },
      error: () => {
        this.pollErrors += 1;
        if (this.pollErrors >= MAX_POLL_ERRORS) {
          this.stopPolling();
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Sin conexión',
            message: 'Se detuvo la actualización del QR. Pulsa "Generar nuevo QR".',
          });
        }
      },
    });
  }

  private toastError(err: { error?: { message?: string | string[] } }, fallback: string): void {
    const raw = err?.error?.message;
    this.interceptor.openSnackbar({
      type: 'error',
      title: 'Error',
      message: (Array.isArray(raw) ? raw[0] : raw) || fallback,
    });
  }
}

import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APP_BUILD_ID } from '../constants/app-version.generated';
import { AuthService } from './auth.service';
import {
  AppUpdateDialogComponent,
  AppUpdateChange,
  AppUpdateDialogData
} from '../components/app-update-dialog/app-update-dialog.component';

interface AppVersionFile {
  version?: string;
  buildId?: string;
  builtAt?: string;
  channel?: string;
  changes?: AppUpdateDialogData['changes'];
}

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  private static readonly dismissedBuildKey = 'pollux.update.dismissedBuildId';

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private dialogOpen = false;
  private reloading = false;
  private checkInFlight: Promise<void> | null = null;

  init(): void {
    if (!environment.production || !APP_BUILD_ID || APP_BUILD_ID.endsWith('-dev')) {
      return;
    }

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      void this.checkForUpdate();
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void this.checkForUpdate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    });

    interval(3 * 60 * 1000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      void this.checkForUpdate();
    });

    setTimeout(() => {
      void this.checkForUpdate();
    }, 5000);
  }

  private checkForUpdate(): Promise<void> {
    if (this.dialogOpen || this.reloading) {
      return Promise.resolve();
    }
    if (!this.checkInFlight) {
      this.checkInFlight = this.detectUpdate().finally(() => {
        this.checkInFlight = null;
      });
    }
    return this.checkInFlight;
  }

  private async detectUpdate(): Promise<void> {
    try {
      const versionUrl = new URL('app-version.json', document.baseURI);
      versionUrl.searchParams.set('v', String(Date.now()));

      const response = await fetch(versionUrl.toString(), { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const serverVersion = await response.json() as AppVersionFile;
      if (!serverVersion.buildId || serverVersion.buildId === APP_BUILD_ID) {
        return;
      }
      if (this.isDismissed(serverVersion.buildId) || this.dialogOpen || this.reloading) {
        return;
      }

      const changes = await this.changesForCurrentOrganization(serverVersion);
      if (this.dialogOpen || this.reloading || this.isDismissed(serverVersion.buildId)) {
        return;
      }
      this.promptUpdate({
        version: serverVersion.version,
        buildId: serverVersion.buildId,
        changes,
      });
    } catch {
      // Ignora fallos de red al consultar la versión.
    }
  }

  /**
   * El archivo público trae todos los cambios del deploy. El aviso solo puede
   * listar los de los módulos activos de esta organización.
   */
  private async changesForCurrentOrganization(serverVersion: AppVersionFile): Promise<AppUpdateChange[]> {
    const token = this.authService.token;
    if (!token) {
      return [];
    }

    try {
      const response = await fetch(`${environment.api}/tenant/system-versions/latest`, {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        return [];
      }

      const latest = await response.json() as {
        version?: string;
        build_id?: string | null;
        changes?: AppUpdateChange[];
      };
      const sameRelease = !latest?.build_id
        || !serverVersion.buildId
        || latest.build_id === serverVersion.buildId
        || latest.version === serverVersion.version;
      if (!sameRelease || !Array.isArray(latest?.changes)) {
        return [];
      }
      return latest.changes;
    } catch {
      return [];
    }
  }

  private promptUpdate(versionInfo: AppUpdateDialogData): void {
    if (this.dialogOpen) {
      return;
    }

    this.dialogOpen = true;

    const dialogRef = this.dialog.open(AppUpdateDialogComponent, {
      data: versionInfo,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'px-upd-panel',
      backdropClass: 'px-upd-backdrop',
      width: '440px',
      maxWidth: '92vw',
      enterAnimationDuration: 1,
      exitAnimationDuration: 120
    });

    dialogRef.afterClosed().subscribe((reload) => {
      this.dialogOpen = false;
      if (reload) {
        this.reloading = true;
        void this.reloadForUpdate();
        return;
      }
      if (versionInfo.buildId) {
        this.rememberDismissal(versionInfo.buildId);
      }
    });
  }

  /**
   * Firefox repite `visibilitychange` al cerrar el diálogo y al recuperar la
   * ventana. Sin esto, «Más tarde» volvía a abrir el aviso enseguida.
   */
  private isDismissed(buildId: string): boolean {
    try {
      return sessionStorage.getItem(AppUpdateService.dismissedBuildKey) === buildId;
    } catch {
      return false;
    }
  }

  private rememberDismissal(buildId: string): void {
    try {
      sessionStorage.setItem(AppUpdateService.dismissedBuildKey, buildId);
    } catch {
      // Modo privado: el aviso puede volver en esta sesión.
    }
  }

  /**
   * Firefox puede seguir sirviendo el HTML anterior en una recarga normal.
   * Se limpia la caché y se entra por una URL nueva.
   */
  private async reloadForUpdate(): Promise<void> {
    const url = new URL(window.location.href);
    url.searchParams.set('v', String(Date.now()));

    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      if (navigator.serviceWorker?.getRegistrations) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }
      await fetch(url.toString(), { cache: 'reload', credentials: 'same-origin' });
    } catch {
      // La navegación siguiente igual usa otra clave de caché.
    }

    window.location.replace(url.toString());
  }
}

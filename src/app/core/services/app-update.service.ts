import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APP_BUILD_ID } from '../constants/app-version.generated';
import {
  AppUpdateDialogComponent,
  AppUpdateDialogData
} from '../components/app-update-dialog/app-update-dialog.component';

interface AppVersionFile {
  version?: string;
  buildId?: string;
  builtAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private dialogOpen = false;

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

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void this.checkForUpdate();
      }
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

  private async checkForUpdate(): Promise<void> {
    if (this.dialogOpen) {
      return;
    }

    try {
      const versionUrl = new URL('app-version.json', document.baseURI);
      versionUrl.searchParams.set('v', String(Date.now()));

      const response = await fetch(versionUrl.toString(), { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const serverVersion = await response.json() as AppVersionFile;
      if (serverVersion.buildId && serverVersion.buildId !== APP_BUILD_ID) {
        this.promptUpdate(serverVersion);
      }
    } catch {
      // Ignore transient network errors while checking for updates.
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
      panelClass: 'app-update-dialog-panel',
      backdropClass: 'app-update-dialog-backdrop',
      width: '420px',
      maxWidth: '95vw'
    });

    dialogRef.afterClosed().subscribe((reload) => {
      this.dialogOpen = false;
      if (reload) {
        const url = new URL(window.location.href);
        url.searchParams.set('v', String(Date.now()));
        window.location.href = url.toString();
      }
    });
  }
}

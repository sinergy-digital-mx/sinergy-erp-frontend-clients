import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed = signal(false);
  isMobileOpen = signal(false);

  private posWorkbench: 'ventas' | 'caja' | null = null;
  private collapsedBeforePos = false;
  private posReleaseTimer: ReturnType<typeof setTimeout> | null = null;

  toggleSidebar(): void {
    this.isCollapsed.update(val => !val);
  }

  /**
   * Cierra el menú al entrar a Ventas o Caja. Si el usuario lo abre, se queda abierto
   * hasta cambiar de pantalla. Al salir, vuelve como estaba.
   */
  enterPosWorkbench(screen: 'ventas' | 'caja'): void {
    if (this.posReleaseTimer) {
      clearTimeout(this.posReleaseTimer);
      this.posReleaseTimer = null;
    }
    if (this.posWorkbench === screen) {
      return;
    }
    if (this.posWorkbench === null) {
      this.collapsedBeforePos = this.isCollapsed();
    }
    this.posWorkbench = screen;
    this.collapse();
    this.closeMobile();
  }

  leavePosWorkbench(screen: 'ventas' | 'caja'): void {
    if (this.posWorkbench !== screen) {
      return;
    }
    this.posReleaseTimer = setTimeout(() => {
      this.posReleaseTimer = null;
      if (this.posWorkbench !== screen) {
        return;
      }
      this.posWorkbench = null;
      this.isCollapsed.set(this.collapsedBeforePos);
    }, 0);
  }

  collapse(): void {
    this.isCollapsed.set(true);
  }

  expand(): void {
    this.isCollapsed.set(false);
  }

  openMobile(): void {
    this.isMobileOpen.set(true);
    document.body.classList.add('mobile-nav-open');
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
    document.body.classList.remove('mobile-nav-open');
  }

  toggleMobile(): void {
    if (this.isMobileOpen()) {
      this.closeMobile();
      return;
    }
    this.openMobile();
  }
}

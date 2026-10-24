import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed = signal(false);
  isMobileOpen = signal(false);

  toggleSidebar(): void {
    this.isCollapsed.update(val => !val);
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

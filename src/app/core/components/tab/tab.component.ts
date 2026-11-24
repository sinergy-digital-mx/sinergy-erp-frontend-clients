import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabHint {
  summary: string;
  points: string[];
}

export interface TabItem {
  id: string;
  title: string;
  disabled?: boolean;
  hint?: TabHint;
}

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnDestroy {
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId: string = '';
  @Output() tabChange = new EventEmitter<string>();

  hintTab: TabItem | null = null;
  hintTop = 0;
  hintLeft = 0;
  hintArrow = 24;
  hintAbove = false;

  private hintTimer: ReturnType<typeof setTimeout> | null = null;
  private hintAnchor: HTMLElement | null = null;
  private suppressHint = false;
  private readonly onScroll = () => {
    if (this.hintTab && this.hintAnchor) this.placeHint(this.hintTab, this.hintAnchor);
  };

  ngOnInit(): void {
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
    }
    document.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy(): void {
    this.clearHintTimer();
    document.removeEventListener('scroll', this.onScroll, true);
  }

  selectTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;
    this.activeTabId = tabId;
    this.suppressHint = true;
    this.closeHint();
    this.tabChange.emit(tabId);
  }

  scheduleHint(tab: TabItem, event: Event): void {
    if (!tab.hint || tab.disabled || this.suppressHint) return;
    const anchor = event.currentTarget as HTMLElement;
    this.clearHintTimer();
    this.hintTimer = setTimeout(() => this.openHint(tab, anchor), 280);
  }

  closeHint(fromPointer = false): void {
    if (fromPointer) this.suppressHint = false;
    this.clearHintTimer();
    this.hintTab = null;
    this.hintAnchor = null;
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onViewportChange(): void {
    if (!this.hintTab || !this.hintAnchor) return;
    this.placeHint(this.hintTab, this.hintAnchor);
  }

  private openHint(tab: TabItem, anchor: HTMLElement): void {
    this.hintAnchor = anchor;
    this.placeHint(tab, anchor);
  }

  private placeHint(tab: TabItem, anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect();
    const width = 272;
    const margin = 12;
    const height = 36 + tab.hint!.points.length * 22 + 28;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    const below = rect.bottom + 10;
    const above = rect.top - 10 - height;
    const placeAbove = below + height > window.innerHeight - margin && above > margin;
    this.hintLeft = left;
    this.hintTop = placeAbove ? above : below;
    this.hintAbove = placeAbove;
    this.hintArrow = Math.min(width - 18, Math.max(18, rect.left + rect.width / 2 - left));
    this.hintTab = tab;
  }

  private clearHintTimer(): void {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
  }
}

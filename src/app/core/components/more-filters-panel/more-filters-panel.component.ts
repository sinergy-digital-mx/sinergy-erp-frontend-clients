import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
  selector: 'app-more-filters-panel',
  standalone: true,
  imports: [CommonModule, CloseButtonComponent],
  templateUrl: './more-filters-panel.component.html',
  styleUrl: './more-filters-panel.component.scss',
})
export class MoreFiltersPanelComponent implements OnDestroy {
  @Input() activeCount = 0;
  @Input() title = 'Más filtros';

  open = false;

  toggle(): void {
    if (this.open) {
      this.close();
      return;
    }
    this.open = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    if (!this.open) {
      return;
    }
    this.open = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  ngOnDestroy(): void {
    if (this.open) {
      document.body.style.overflow = '';
    }
  }
}

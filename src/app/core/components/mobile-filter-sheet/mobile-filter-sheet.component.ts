import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule, SlidersHorizontal, X } from 'lucide-angular';

@Component({
  selector: 'app-mobile-filter-sheet',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <button type="button" class="mfs__trigger" (click)="open()">
      <lucide-icon [img]="icons.SlidersHorizontal" class="w-4 h-4"></lucide-icon>
      <span>Filtros</span>
      @if (activeCount() > 0) {
        <span class="mfs__badge">{{ activeCount() }}</span>
      }
    </button>

    <div class="mfs__panel" [class.mfs__panel--open]="isOpen()">
      <div class="mfs__chrome">
        <div class="mfs__handle"></div>
        <div class="mfs__head">
          <h3>Filtros</h3>
          <button type="button" class="mfs__x" (click)="close()" aria-label="Cerrar">
            <lucide-icon [img]="icons.X" class="w-4 h-4"></lucide-icon>
          </button>
        </div>
      </div>
      <div class="mfs__fields">
        <ng-content></ng-content>
      </div>
      <div class="mfs__foot">
        @if (activeCount() > 0) {
          <button type="button" class="mfs__clear" (click)="cleared.emit()">Limpiar</button>
        }
        <button type="button" class="mfs__done" (click)="close()">Listo</button>
      </div>
    </div>

    @if (isOpen()) {
      <div class="mfs__backdrop" (click)="close()"></div>
    }
  `,
  styleUrl: './mobile-filter-sheet.component.scss',
})
export class MobileFilterSheetComponent {
  readonly icons = { SlidersHorizontal, X };
  readonly activeCount = input(0);
  readonly cleared = output<void>();
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
    document.body.classList.add('mobile-nav-open');
  }

  close(): void {
    this.isOpen.set(false);
    document.body.classList.remove('mobile-nav-open');
  }
}

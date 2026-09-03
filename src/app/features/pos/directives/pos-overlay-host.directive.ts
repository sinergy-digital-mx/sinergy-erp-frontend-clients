import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PosAwareOverlayContainer } from '../services/pos-aware-overlay-container.service';

/** Ancla overlays de Material a este elemento (área POS, no toda la ventana). */
@Directive({
  selector: '[posOverlayHost]',
  standalone: true,
  host: {
    class: 'pos-overlay-scope',
  },
})
export class PosOverlayHostDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(PosAwareOverlayContainer);
  private readonly dialog = inject(MatDialog);

  constructor() {
    this.overlay.setPosHost(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.overlay.clearPosHost(this.host.nativeElement);
  }
}

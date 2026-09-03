import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
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
export class PosOverlayHostDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(PosAwareOverlayContainer);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.overlay.setPosHost(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.overlay.clearPosHost(this.host.nativeElement);
  }
}

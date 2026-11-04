import { Directive, ElementRef, HostListener, Input, OnDestroy, inject } from '@angular/core';

/** Globo fijo, para que el scroll de la hoja no lo recorte. */
@Directive({
  selector: '[appTip]',
  standalone: true,
})
export class HoverTipDirective implements OnDestroy {
  @Input('appTip') text = '';

  private readonly host = inject(ElementRef<HTMLElement>);
  private tip: HTMLDivElement | null = null;
  private readonly onMove = () => this.hide();

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    const message = this.text?.trim();
    if (!message) {
      return;
    }
    this.hide();
    const tip = document.createElement('div');
    tip.textContent = message;
    tip.setAttribute('role', 'tooltip');
    Object.assign(tip.style, {
      position: 'fixed',
      zIndex: '80',
      width: '17.5rem',
      maxWidth: 'calc(100vw - 1rem)',
      padding: '0.45rem 0.6rem',
      borderRadius: '8px',
      background: '#0f172a',
      color: '#f8fafc',
      font: '500 0.75rem/1.4 inherit',
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.22)',
      pointerEvents: 'none',
    });
    document.body.appendChild(tip);

    const rect = this.host.nativeElement.getBoundingClientRect();
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
    let top = rect.bottom + 8;
    if (top + height > window.innerHeight - 8) {
      top = Math.max(8, rect.top - height - 8);
    }
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    this.tip = tip;
    window.addEventListener('scroll', this.onMove, true);
    window.addEventListener('resize', this.onMove);
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    this.tip?.remove();
    this.tip = null;
    window.removeEventListener('scroll', this.onMove, true);
    window.removeEventListener('resize', this.onMove);
  }

  ngOnDestroy(): void {
    this.hide();
  }
}

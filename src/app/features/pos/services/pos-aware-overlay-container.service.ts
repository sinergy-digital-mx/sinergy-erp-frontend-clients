import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * Overlay de CDK acotado al root POS cuando hay host registrado.
 * Así el backdrop no tapa el menú lateral. Fuera de POS se comporta
 * como FullscreenOverlayContainer (body o elemento en fullscreen).
 *
 * CDK 21 monta diálogos con Popover nativo (top layer). Eso ignora el host
 * y cubre toda la app; hasHost() sirve para apagar usePopover solo en POS.
 */
@Injectable({ providedIn: 'root' })
export class PosAwareOverlayContainer extends OverlayContainer implements OnDestroy {
  private readonly documentRef = inject(DOCUMENT);
  private posHost: HTMLElement | null = null;
  private readonly onFullscreenChange = (): void => this.relocate();

  hasHost(): boolean {
    return this.posHost != null;
  }

  setPosHost(host: HTMLElement): void {
    this.posHost = host;
    this.relocate();
  }

  clearPosHost(host: HTMLElement): void {
    if (this.posHost !== host) {
      return;
    }
    this.posHost = null;
    this.relocate();
  }

  override getContainerElement(): HTMLElement {
    const container = super.getContainerElement();
    this.relocate();
    return container;
  }

  protected override _createContainer(): void {
    super._createContainer();
    this.bindFullscreen();
    this.relocate();
  }

  override ngOnDestroy(): void {
    this.unbindFullscreen();
    super.ngOnDestroy();
  }

  private relocate(): void {
    const container = this.overlayElement();
    if (!container) {
      return;
    }
    const parent = this.posHost ?? this.fullscreenElement() ?? this.documentRef.body;
    if (container.parentElement !== parent) {
      parent.appendChild(container);
    }
  }

  private overlayElement(): HTMLElement | null {
    return (this as unknown as { _containerElement?: HTMLElement })._containerElement ?? null;
  }

  private fullscreenElement(): HTMLElement | null {
    const doc = this.documentRef as Document & {
      webkitFullscreenElement?: Element | null;
      mozFullScreenElement?: Element | null;
      msFullscreenElement?: Element | null;
    };
    const el =
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement;
    return (el as HTMLElement) || null;
  }

  private bindFullscreen(): void {
    for (const eventName of PosAwareOverlayContainer.fullscreenEvents) {
      this.documentRef.addEventListener(eventName, this.onFullscreenChange);
    }
  }

  private unbindFullscreen(): void {
    for (const eventName of PosAwareOverlayContainer.fullscreenEvents) {
      this.documentRef.removeEventListener(eventName, this.onFullscreenChange);
    }
  }

  private static readonly fullscreenEvents = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange',
  ] as const;
}

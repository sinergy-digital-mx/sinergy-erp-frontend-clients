import { AfterViewInit, Directive, ElementRef, HostListener, Optional, Self, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { applyPedimentoMask, pedimentoDigits, pedimentoInputValue } from '../utils/pedimento-number.util';

@Directive({
  selector: 'input[appPedimentoMask]',
  standalone: true,
  host: {
    autocomplete: 'off',
    inputmode: 'numeric',
    spellcheck: 'false',
    style: 'font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: 0.04em',
  },
})
export class PedimentoMaskDirective implements AfterViewInit {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private cursorRequest = 0;

  constructor(@Optional() @Self() private ngControl: NgControl | null) {}

  ngAfterViewInit(): void {
    this.paintInitialValue();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    const input = this.el.nativeElement;
    if (event.key === 'Backspace') {
      this.deleteAroundSeparator(input, event, 'backspace');
      return;
    }
    if (event.key === 'Delete') {
      this.deleteAroundSeparator(input, event, 'delete');
      return;
    }
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      return;
    }
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const selected = end - start;
    if (pedimentoDigits(input.value).length >= 15 && selected === 0) {
      event.preventDefault();
    }
  }

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;
    const cursor = input.selectionStart ?? input.value.length;
    this.writeMasked(input.value, cursor);
  }

  private paintInitialValue(): void {
    const input = this.el.nativeElement;
    const next = pedimentoInputValue(input.value);
    if (next === input.value) {
      return;
    }
    input.value = next;
    this.ngControl?.control?.setValue(next, { emitEvent: false });
  }

  private deleteAroundSeparator(
    input: HTMLInputElement,
    event: KeyboardEvent,
    direction: 'backspace' | 'delete',
  ): void {
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    if (start !== end) {
      return;
    }
    const removingSpace =
      direction === 'backspace' ? start > 0 && input.value[start - 1] === ' ' : input.value[start] === ' ';
    if (!removingSpace) {
      return;
    }
    event.preventDefault();
    const digits = pedimentoDigits(input.value);
    const digitsBefore = pedimentoDigits(input.value.slice(0, start)).length;
    const removeAt = direction === 'backspace' ? digitsBefore - 1 : digitsBefore;
    if (removeAt < 0 || removeAt >= digits.length) {
      return;
    }
    const nextDigits = digits.slice(0, removeAt) + digits.slice(removeAt + 1);
    this.writeMasked(nextDigits, removeAt);
  }

  private writeMasked(raw: string, cursor: number): void {
    const next = applyPedimentoMask(raw, cursor);
    const input = this.el.nativeElement;
    const request = ++this.cursorRequest;
    input.value = next.value;
    this.ngControl?.control?.setValue(next.value, { emitEvent: true });
    this.placeCursor(input, next.cursor);
    setTimeout(() => {
      if (request !== this.cursorRequest || document.activeElement !== input) {
        return;
      }
      if (input.value !== next.value) {
        input.value = next.value;
      }
      this.placeCursor(input, next.cursor);
    });
  }

  private placeCursor(input: HTMLInputElement, cursor: number): void {
    const bounded = Math.max(0, Math.min(cursor, input.value.length));
    input.setSelectionRange(bounded, bounded);
  }
}

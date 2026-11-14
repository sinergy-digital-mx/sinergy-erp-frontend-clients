import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import {
  COUNTRIES,
  CountryOption,
  normalizeCountryName,
  resolveCountryName,
} from '../../utils/countries.util';

/**
 * Selector de país con buscador: al hacer clic despliega la lista completa
 * y la filtra mientras se escribe. Guarda el nombre en español del catálogo.
 */
@Component({
  selector: 'app-country-combobox',
  standalone: true,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './country-combobox.component.html',
  styleUrl: './country-combobox.component.scss',
})
export class CountryComboboxComponent implements OnInit, OnDestroy {
  @Input({ required: true }) control!: AbstractControl;
  @Input() placeholder = 'Busca o selecciona un país';
  @Input() invalid = false;
  @Input() options: readonly CountryOption[] = COUNTRIES;

  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('list') listRef?: ElementRef<HTMLElement>;

  readonly open = signal(false);
  readonly query = signal('');
  readonly highlighted = signal(0);
  /** Texto mostrado en el campo (el valor del control o lo que se escribe). */
  readonly text = signal('');
  /** Ancho de la lista = ancho del campo. */
  readonly overlayWidth = signal(0);

  readonly filtered = computed(() => {
    const q = normalizeCountryName(this.query());
    if (!q) return this.options;
    const starts = this.options.filter((o) => normalizeCountryName(o.name).startsWith(q));
    const contains = this.options.filter(
      (o) => !normalizeCountryName(o.name).startsWith(q) && normalizeCountryName(o.name).includes(q),
    );
    return [...starts, ...contains];
  });

  readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  ];

  private sub?: Subscription;

  ngOnInit(): void {
    this.text.set(this.control.value ?? '');
    this.sub = this.control.valueChanges.subscribe((value) => {
      if (!this.open()) this.text.set(value ?? '');
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get disabled(): boolean {
    return this.control.disabled;
  }

  openList(): void {
    if (this.disabled || this.open()) return;
    this.measure();
    this.query.set('');
    const idx = this.filtered().findIndex((o) => o.name === this.control.value);
    this.highlighted.set(Math.max(idx, 0));
    this.open.set(true);
    this.scrollToHighlighted();
  }

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.inputRef.nativeElement.focus();
      this.openList();
    }
  }

  onInput(value: string): void {
    this.text.set(value);
    this.query.set(value);
    this.highlighted.set(0);
    if (!this.open()) {
      this.measure();
      this.open.set(true);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.filtered();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open()) return this.openList();
        this.highlighted.set(Math.min(this.highlighted() + 1, items.length - 1));
        this.scrollToHighlighted();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlighted.set(Math.max(this.highlighted() - 1, 0));
        this.scrollToHighlighted();
        break;
      case 'Enter':
        if (this.open() && items[this.highlighted()]) {
          event.preventDefault();
          this.select(items[this.highlighted()]);
        }
        break;
      case 'Escape':
        if (this.open()) {
          event.stopPropagation();
          this.close();
        }
        break;
      case 'Tab':
        this.commitTyped();
        break;
    }
  }

  select(option: CountryOption): void {
    this.control.setValue(option.name);
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.text.set(option.name);
    this.open.set(false);
  }

  /** Al salir del campo: si lo escrito es un país, lo toma; si no, lo deja para que marque error. */
  commitTyped(): void {
    if (!this.open()) return;
    const typed = this.text();
    if (typed !== (this.control.value ?? '')) {
      const resolved = resolveCountryName(typed);
      this.control.setValue(resolved ?? typed);
      this.control.markAsDirty();
      this.text.set(resolved ?? typed);
    }
    this.control.markAsTouched();
    this.open.set(false);
  }

  close(): void {
    this.commitTyped();
  }

  onOutsideClick(event: MouseEvent): void {
    if (this.inputRef.nativeElement.parentElement?.contains(event.target as Node)) return;
    this.commitTyped();
  }

  private measure(): void {
    const box = this.inputRef.nativeElement.parentElement;
    this.overlayWidth.set(box?.getBoundingClientRect().width ?? 0);
  }

  private scrollToHighlighted(): void {
    setTimeout(() => {
      const el = this.listRef?.nativeElement.querySelector<HTMLElement>(
        `[data-index="${this.highlighted()}"]`,
      );
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}

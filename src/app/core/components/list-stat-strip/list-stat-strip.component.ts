import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';

export type ListStatTone = 'slate' | 'indigo' | 'emerald' | 'sky' | 'amber' | 'rose';
export type ListStatFooterKind = 'quiet' | 'pill' | 'debt' | 'ok';
export type ListStatIcon = typeof ShoppingBag;

export interface ListStatSegment {
  share: number;
  tone: ListStatTone;
}

export interface ListStatCard {
  key: string;
  label: string;
  hint: string;
  tone: ListStatTone;
  icon: ListStatIcon;
  value: number;
  share: number;
  /** Si viene, la barra se parte en estos tramos en lugar de un solo color. */
  segments?: ListStatSegment[];
  /** Si viene, sustituye el porcentaje bajo la barra. */
  shareLabel?: string;
  shareTone?: ListStatTone;
  footer: string;
  footerKind: ListStatFooterKind;
}

@Component({
  selector: 'app-list-stat-strip',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './list-stat-strip.component.html',
  styleUrl: './list-stat-strip.component.scss',
})
export class ListStatStripComponent {
  @Input() label = 'Resumen';
  @Input() cards: ListStatCard[] = [];
  @Input() columns = 5;
  @Input() loading = false;
  @Input() ready = false;
  @Input() error = false;

  get skeletonSlots(): number[] {
    const count = Math.min(6, Math.max(1, Math.trunc(this.columns) || 5));
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  formatCount(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value || 0);
  }
}

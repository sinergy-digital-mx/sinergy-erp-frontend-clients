import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';

export type ListStatTone = 'slate' | 'indigo' | 'emerald' | 'sky' | 'amber' | 'rose';
export type ListStatFooterKind = 'quiet' | 'pill' | 'debt' | 'ok';
export type ListStatIcon = typeof ShoppingBag;

export interface ListStatCard {
  key: string;
  label: string;
  hint: string;
  tone: ListStatTone;
  icon: ListStatIcon;
  value: number;
  share: number;
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
  @Input() loading = false;
  @Input() ready = false;
  @Input() error = false;

  readonly skeletons = [1, 2, 3, 4, 5];

  formatCount(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value || 0);
  }
}

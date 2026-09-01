import { Component, DestroyRef, ElementRef, HostListener, Input, OnInit, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ChevronLeft, ChevronRight, Package } from 'lucide-angular';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { CustomerProductInsightsService } from '../../services/customer-product-insights.service';
import {
  MostPurchasedProduct,
  ProductInsightBase,
  RecommendedProduct,
} from '../../models/customer-product-insights.model';

export type InsightCarouselRow = 'purchased' | 'recommended';

const CAROUSEL_STEP_PX = 320;
const SCROLL_EDGE_PX = 8;

@Component({
  selector: 'app-customer-product-insights',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './customer-product-insights.component.html',
  styleUrl: './customer-product-insights.component.scss',
})
export class CustomerProductInsightsComponent implements OnInit {
  @Input({ required: true }) customerId!: string | number;

  readonly Package = Package;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  loading = signal(true);
  error = signal(false);
  mostPurchased = signal<MostPurchasedProduct[]>([]);
  recommended = signal<RecommendedProduct[]>([]);
  photoErrors = signal<ReadonlySet<string>>(new Set());

  purchasedOverflow = signal(false);
  purchasedCanPrev = signal(false);
  purchasedCanNext = signal(false);
  recommendedOverflow = signal(false);
  recommendedCanPrev = signal(false);
  recommendedCanNext = signal(false);

  private readonly purchasedTrack = viewChild('purchasedTrack', { read: ElementRef });
  private readonly recommendedTrack = viewChild('recommendedTrack', { read: ElementRef });

  private readonly insightsService = inject(CustomerProductInsightsService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private observers: ResizeObserver[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnectObservers());
  }

  ngOnInit(): void {
    this.loadInsights();
  }

  loadInsights(): void {
    if (this.customerId == null || this.customerId === '') return;

    this.loading.set(true);
    this.error.set(false);

    this.insightsService
      .getInsights(this.customerId, {
        most_purchased_limit: 8,
        recommended_limit: 8,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.mostPurchased.set(data.most_purchased);
          this.recommended.set(data.recommended);
          this.photoErrors.set(new Set());
          this.loading.set(false);
          this.scheduleNavSync();
        },
        error: () => {
          this.mostPurchased.set([]);
          this.recommended.set([]);
          this.loading.set(false);
          this.error.set(true);
        },
      });
  }

  productName(item: ProductInsightBase): string {
    return item.name?.trim() || item.sku?.trim() || 'Producto';
  }

  timesOrderedLabel(item: MostPurchasedProduct): string {
    const times = item.times_ordered;
    const timesText = times === 1 ? '1 vez' : `${times} veces`;
    if (!item.total_quantity) return timesText;
    return `${timesText} · ${this.formatQuantity(item.total_quantity)} uds`;
  }

  recommendedEmptyMessage(): string {
    return this.mostPurchased().length > 0
      ? 'No hay sugerencias por categoría por ahora'
      : 'Aún no hay compras registradas';
  }

  reasonChipClass(reason: string): string {
    return reason === 'same_subcategory'
      ? 'product-card__chip product-card__chip--sub'
      : 'product-card__chip product-card__chip--cat';
  }

  hasPhoto(item: ProductInsightBase): boolean {
    return !!item.photo && !this.photoErrors().has(item.product_id);
  }

  onPhotoError(productId: string): void {
    const next = new Set(this.photoErrors());
    next.add(productId);
    this.photoErrors.set(next);
  }

  onPhotoLoad(): void {
    this.syncAllNavs();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncAllNavs();
  }

  scrollRow(row: InsightCarouselRow, direction: -1 | 1): void {
    const track = this.trackOf(row);
    if (!track) return;
    track.scrollBy({ left: direction * CAROUSEL_STEP_PX, behavior: 'smooth' });
  }

  onRowScroll(row: InsightCarouselRow, track: HTMLElement): void {
    this.syncNav(row, track);
  }

  private scheduleNavSync(): void {
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        this.observeTracks();
        this.syncAllNavs();
      });
    });
  }

  private observeTracks(): void {
    this.disconnectObservers();
    const purchased = this.trackOf('purchased');
    const recommended = this.trackOf('recommended');
    if (purchased) this.observeTrack(purchased, 'purchased');
    if (recommended) this.observeTrack(recommended, 'recommended');
  }

  private observeTrack(track: HTMLElement, row: InsightCarouselRow): void {
    const observer = new ResizeObserver(() => this.syncNav(row, track));
    observer.observe(track);
    this.observers.push(observer);
  }

  private disconnectObservers(): void {
    for (const observer of this.observers) {
      observer.disconnect();
    }
    this.observers = [];
  }

  private syncAllNavs(): void {
    const purchased = this.trackOf('purchased');
    const recommended = this.trackOf('recommended');
    if (purchased) this.syncNav('purchased', purchased);
    if (recommended) this.syncNav('recommended', recommended);
  }

  private syncNav(row: InsightCarouselRow, track: HTMLElement): void {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const overflow = maxScroll > SCROLL_EDGE_PX;
    const canPrev = overflow && track.scrollLeft > SCROLL_EDGE_PX;
    const canNext = overflow && track.scrollLeft < maxScroll - SCROLL_EDGE_PX;

    if (row === 'purchased') {
      this.purchasedOverflow.set(overflow);
      this.purchasedCanPrev.set(canPrev);
      this.purchasedCanNext.set(canNext);
      return;
    }

    this.recommendedOverflow.set(overflow);
    this.recommendedCanPrev.set(canPrev);
    this.recommendedCanNext.set(canNext);
  }

  private trackOf(row: InsightCarouselRow): HTMLElement | undefined {
    const ref = row === 'purchased' ? this.purchasedTrack() : this.recommendedTrack();
    const el = ref?.nativeElement;
    return el instanceof HTMLElement ? el : undefined;
  }

  openProduct(item: ProductInsightBase): void {
    if (!item.product_id) return;
    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: {
        product: {
          id: item.product_id,
          name: item.name ?? undefined,
          sku: item.sku ?? undefined,
        },
        isNew: false,
      },
    });
  }

  private formatQuantity(value: number): string {
    if (!Number.isFinite(value)) return '0';
    if (Number.isInteger(value)) return String(value);
    return value.toLocaleString('es-MX', { maximumFractionDigits: 2 });
  }
}

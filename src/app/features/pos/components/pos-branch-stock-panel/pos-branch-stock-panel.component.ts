import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Warehouse, X } from 'lucide-angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { formatInventoryNumber } from '../../../inventory/utils/inventory-list.util';
import {
  PosBranchStockBranch,
  PosBranchStockProduct,
  PosBranchStockResponse,
} from '../../models/pos-branch-stock.model';
import { POSService } from '../../services/pos.service';
import { prettyPosBranchLabel } from '../../utils/pos-branch-label.util';

interface StockCellView {
  branch: PosBranchStockBranch;
  quantity: number;
  uom: string | null;
}

@Component({
  selector: 'app-pos-branch-stock-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './pos-branch-stock-panel.component.html',
  styleUrls: ['./pos-branch-stock-panel.component.scss'],
})
export class PosBranchStockPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly pos = inject(POSService);
  private readonly search$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();
  private requestId = 0;

  readonly initialSearch = input('');
  readonly currentBranchId = input('');
  readonly closed = output<void>();

  readonly Search = Search;
  readonly Warehouse = Warehouse;
  readonly X = X;

  @ViewChild('lookup') lookupRef?: ElementRef<HTMLInputElement>;

  draft = signal('');
  loading = signal(false);
  error = signal('');
  result = signal<PosBranchStockResponse | null>(null);

  readonly orderedBranches = computed(() => {
    const branches = this.result()?.branches ?? [];
    const here = this.currentBranchId();
    if (!here) {
      return branches;
    }
    return [
      ...branches.filter((branch) => branch.id === here),
      ...branches.filter((branch) => branch.id !== here),
    ];
  });

  ngOnInit(): void {
    const initial = this.initialSearch().trim();
    this.draft.set(initial);
    this.search$
      .pipe(
        debounceTime(280),
        map((value) => value.trim()),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((term) => this.fetch(term));
    if (initial) {
      this.fetch(initial);
    }
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      const input = this.lookupRef?.nativeElement;
      input?.focus();
      input?.select();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDraft(value: string): void {
    this.draft.set(value ?? '');
    this.search$.next(this.draft());
  }

  clearDraft(): void {
    this.onDraft('');
    this.lookupRef?.nativeElement.focus();
  }

  retry(): void {
    this.fetch(this.draft().trim());
  }

  close(): void {
    this.closed.emit();
  }

  cells(product: PosBranchStockProduct): StockCellView[] {
    const byId = new Map(product.branches.map((cell) => [cell.billing_branch_id, cell]));
    return this.orderedBranches().map((branch) => {
      const cell = byId.get(branch.id);
      const quantity = Number(cell?.quantity ?? 0);
      return {
        branch,
        quantity: Number.isFinite(quantity) ? quantity : 0,
        uom: cell?.uom_name?.trim() || null,
      };
    });
  }

  whereLabel(product: PosBranchStockProduct): string {
    const cells = this.cells(product);
    if (cells.length === 0) {
      return 'Sin sucursales';
    }
    const withStock = cells.filter((cell) => cell.quantity > 0).length;
    if (withStock === 0) {
      return 'Sin existencia';
    }
    return `En ${withStock} de ${cells.length} sucursales`;
  }

  branchName(branch: PosBranchStockBranch): string {
    return prettyPosBranchLabel(branch.name || 'Sucursal');
  }

  branchCity(branch: PosBranchStockBranch): string | null {
    const city = branch.city?.trim();
    if (!city) {
      return null;
    }
    const pretty = prettyPosBranchLabel(city);
    if (pretty.toLowerCase() === this.branchName(branch).toLowerCase()) {
      return null;
    }
    return pretty;
  }

  formatQty(value: string | number): string {
    return formatInventoryNumber(value);
  }

  qty(value: string | number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private fetch(term: string): void {
    if (!term) {
      this.requestId += 1;
      this.loading.set(false);
      this.error.set('');
      this.result.set(null);
      return;
    }
    const id = ++this.requestId;
    this.loading.set(true);
    this.error.set('');
    this.pos.getPosBranchStock(term).subscribe({
      next: (response) => {
        if (id !== this.requestId) {
          return;
        }
        this.result.set(response);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        if (id !== this.requestId) {
          return;
        }
        this.result.set(null);
        this.loading.set(false);
        this.error.set(resolveHttpErrorMessage(error, 'No se pudieron consultar las existencias.'));
      },
    });
  }
}

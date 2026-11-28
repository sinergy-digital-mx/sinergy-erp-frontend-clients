import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { BranchService } from '../../settings/services/branch.service';

export interface LogisticsBranchOption {
  id: string;
  label: string;
}

interface BranchLabel {
  id: string;
  code?: string;
  city?: string;
  display_name?: string;
  name?: string;
  status?: number;
}

@Injectable({ providedIn: 'root' })
export class LogisticsBranchScopeService {
  readonly options = signal<LogisticsBranchOption[]>([]);
  readonly selectedId = signal('');
  readonly ready = signal(false);

  private loaded = false;

  constructor(
    private auth: AuthService,
    private branchService: BranchService,
  ) {}

  /** Carga las sucursales que el usuario puede ver y deja la principal seleccionada. */
  ensureLoaded(): Observable<void> {
    if (this.loaded) return of(undefined);

    const seesAll = this.auth.hasAdminRole();
    const assigned = this.auth.getAssignedBranches().filter((row) => !!row.id);
    if (!seesAll && assigned.length) {
      this.setOptions(assigned);
      return of(undefined);
    }

    const ownId = seesAll ? null : this.auth.getBillingBranchId();
    return this.branchService.getAllBranches().pipe(
      tap((branches) => {
        const active = (branches ?? []).filter((row) => row?.id && row.status !== 0);
        const visible = ownId ? active.filter((row) => row.id === ownId) : active;
        if (visible.length) {
          this.setOptions(visible);
          return;
        }
        this.setOptions(ownId ? [{ id: ownId, display_name: 'Sucursal' }] : []);
      }),
      map(() => undefined),
      catchError(() => {
        if (!this.loaded && ownId) {
          this.setOptions([{ id: ownId, display_name: 'Sucursal' }]);
        } else {
          this.loaded = true;
          this.ready.set(true);
        }
        return of(undefined);
      }),
    );
  }

  setSelected(id: string): void {
    if (!this.options().some((row) => row.id === id)) return;
    this.selectedId.set(id);
  }

  private setOptions(rows: BranchLabel[]): void {
    const options = rows
      .filter((row) => !!row.id)
      .map((row) => ({ id: row.id, label: this.labelOf(row) }))
      .sort((a, b) => a.label.localeCompare(b.label, 'es'));
    this.options.set(options);
    this.applyDefault();
    this.loaded = true;
    this.ready.set(true);
  }

  private applyDefault(): void {
    const options = this.options();
    if (!options.length) {
      this.selectedId.set('');
      return;
    }
    const current = this.selectedId();
    if (current && options.some((row) => row.id === current)) return;
    const preferred = [this.auth.getPrimaryBillingBranchId(), this.auth.getBillingBranchId()];
    const match = preferred.find((id) => !!id && options.some((row) => row.id === id));
    this.selectedId.set(match || options[0].id);
  }

  private labelOf(row: BranchLabel): string {
    const named = row.display_name?.trim() || row.name?.trim();
    if (named) return named;
    const parts = [row.code?.trim(), row.city?.trim()].filter((part): part is string => !!part);
    return parts.join(' · ') || 'Sucursal';
  }
}

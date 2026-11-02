import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search } from 'lucide-angular';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SystemVersionsService } from '../../services/system-versions.service';
import {
  SystemVersion,
  SystemVersionChannel,
  SystemVersionScope,
} from '../../models/system-version.model';

@Component({
  selector: 'app-system-versions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './system-versions.component.html',
  styleUrl: './system-versions.component.scss',
})
export class SystemVersionsComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly pageSize = 20;

  loading = false;
  errorMessage = '';
  searchQuery = '';
  page = 1;
  allItems: SystemVersion[] = [];

  constructor(
    private systemVersionsService: SystemVersionsService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const cached = this.systemVersionsService.readCachedList(this.tenantId);
    if (cached?.length) {
      this.allItems = cached;
    } else {
      this.loading = true;
    }
    this.load();
  }

  get showLoader(): boolean {
    return this.loading && this.allItems.length === 0;
  }

  get filteredItems(): SystemVersion[] {
    const term = this.searchQuery.trim().toLowerCase();
    if (!term) {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      item.version.toLowerCase().includes(term)
      || item.title.toLowerCase().includes(term)
      || item.changes.some((change) => change.message.toLowerCase().includes(term)),
    );
  }

  get totalPages(): number {
    const total = this.filteredItems.length;
    return total === 0 ? 0 : Math.ceil(total / this.pageSize);
  }

  get pagedItems(): SystemVersion[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  back(): void {
    this.router.navigate(['/settings']);
  }

  onSearch(value: string): void {
    this.searchQuery = value;
    this.page = 1;
  }

  previousPage(): void {
    if (this.page <= 1) {
      return;
    }
    this.page -= 1;
  }

  nextPage(): void {
    if (this.page >= this.totalPages) {
      return;
    }
    this.page += 1;
  }

  channelLabel(channel: SystemVersionChannel): string {
    if (channel === 'backend') return 'Servidor';
    if (channel === 'full') return 'Plataforma';
    return 'Aplicación';
  }

  scopeLabel(scope: SystemVersionScope): string {
    return scope === 'backend' ? 'Servidor' : 'Aplicación';
  }

  hasMixedScopes(item: SystemVersion): boolean {
    const scopes = new Set((item.changes ?? []).map((change) => change.scope));
    return scopes.size > 1;
  }

  formatReleasedAt(value: string): string {
    const normalized = value.includes('T') ? value : value.replace(' ', 'T');
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }

  private get tenantId(): string {
    return this.authService.user_info?.tenant_id || '';
  }

  private load(): void {
    this.errorMessage = '';
    this.systemVersionsService.loadAll().subscribe({
      next: (response) => {
        this.allItems = response?.data ?? [];
        this.systemVersionsService.rememberList(this.tenantId, this.allItems);
        this.loading = false;
        if (this.page > this.totalPages) {
          this.page = this.totalPages || 1;
        }
      },
      error: (error) => {
        this.loading = false;
        if (this.allItems.length) {
          return;
        }
        const status = error?.status;
        this.errorMessage = status === 403
          ? 'Tu organización no tiene acceso al módulo de versiones.'
          : (error?.error?.message || 'No se pudo cargar el historial de versiones.');
      },
    });
  }
}

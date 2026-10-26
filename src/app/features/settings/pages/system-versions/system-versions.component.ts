import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search } from 'lucide-angular';
import { SystemVersionsService } from '../../services/system-versions.service';
import {
  SystemVersion,
  SystemVersionChannel,
  SystemVersionScope,
} from '../../models/system-version.model';

@Component({
  selector: 'app-system-versions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './system-versions.component.html',
  styleUrl: './system-versions.component.scss',
})
export class SystemVersionsComponent implements OnInit, OnDestroy {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;

  loading = false;
  errorMessage = '';
  searchQuery = '';
  page = 1;
  totalPages = 0;
  total = 0;
  items: SystemVersion[] = [];

  private searchTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private systemVersionsService: SystemVersionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimer);
  }

  back(): void {
    this.router.navigate(['/settings']);
  }

  onSearch(value: string): void {
    this.searchQuery = value;
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.page = 1;
      this.load();
    }, 250);
  }

  previousPage(): void {
    if (this.page <= 1 || this.loading) {
      return;
    }
    this.page -= 1;
    this.load();
  }

  nextPage(): void {
    if (this.page >= this.totalPages || this.loading) {
      return;
    }
    this.page += 1;
    this.load();
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

  private load(): void {
    this.loading = true;
    this.errorMessage = '';
    this.systemVersionsService.list(this.page, 20, this.searchQuery).subscribe({
      next: (response) => {
        this.items = response?.data ?? [];
        this.total = response?.total ?? 0;
        this.totalPages = response?.totalPages ?? 0;
        this.page = response?.page ?? this.page;
        this.loading = false;
      },
      error: (error) => {
        this.items = [];
        this.loading = false;
        const status = error?.status;
        this.errorMessage = status === 403
          ? 'Tu organización no tiene acceso al módulo de versiones.'
          : (error?.error?.message || 'No se pudo cargar el historial de versiones.');
      },
    });
  }
}

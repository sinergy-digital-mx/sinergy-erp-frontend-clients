import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { SystemVersionsService } from '../../services/system-versions.service';
import {
  SystemVersion,
  SystemVersionChannel,
} from '../../models/system-version.model';

interface VersionGroup {
  label: string;
  messages: string[];
}

@Component({
  selector: 'app-system-versions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './system-versions.component.html',
  styleUrl: './system-versions.component.scss',
})
export class SystemVersionsComponent implements OnInit, OnDestroy {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly pageSize = 8;

  loading = false;
  errorMessage = '';
  searchQuery = '';
  page = 1;
  totalPages = 0;
  items: SystemVersion[] = [];

  private request?: Subscription;
  private searchTimer = 0;

  constructor(
    private systemVersionsService: SystemVersionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetch(1);
  }

  ngOnDestroy(): void {
    this.request?.unsubscribe();
    window.clearTimeout(this.searchTimer);
  }

  get showLoader(): boolean {
    return this.loading;
  }

  back(): void {
    this.router.navigate(['/settings']);
  }

  onSearch(value: string): void {
    this.searchQuery = value;
    window.clearTimeout(this.searchTimer);
    this.searchTimer = window.setTimeout(() => this.fetch(1), 300);
  }

  previousPage(): void {
    if (this.page <= 1 || this.loading) {
      return;
    }
    this.fetch(this.page - 1);
  }

  nextPage(): void {
    if (this.page >= this.totalPages || this.loading) {
      return;
    }
    this.fetch(this.page + 1);
  }

  channelLabel(channel: SystemVersionChannel): string {
    if (channel === 'backend') return 'Servidor';
    if (channel === 'full') return 'Plataforma';
    return 'Aplicación';
  }

  groups(item: SystemVersion): VersionGroup[] {
    const groups: VersionGroup[] = [];
    const index = new Map<string, VersionGroup>();
    for (const change of item.changes ?? []) {
      const label = change.module_label || 'Plataforma';
      let group = index.get(label);
      if (!group) {
        group = { label, messages: [] };
        index.set(label, group);
        groups.push(group);
      }
      const message = (change.message || '').trim();
      if (message) {
        group.messages.push(message);
      }
    }
    return groups;
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

  private fetch(page: number): void {
    this.request?.unsubscribe();
    this.loading = true;
    this.errorMessage = '';
    this.items = [];
    this.request = this.systemVersionsService.page(page, this.pageSize, this.searchQuery).subscribe({
      next: (response) => {
        this.items = response?.data ?? [];
        this.page = response?.page || page;
        this.totalPages = response?.totalPages || 0;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.items = [];
        const status = error?.status;
        this.errorMessage = status === 403
          ? 'Tu organización no tiene acceso al módulo de versiones.'
          : (error?.error?.message || 'No se pudo cargar el historial de versiones.');
      },
    });
  }
}

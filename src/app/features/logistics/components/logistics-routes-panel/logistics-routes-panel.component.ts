import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogisticsRoute, LogisticsRouteService } from '../../services/logistics-route.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-logistics-routes-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logistics-routes-panel.component.html',
  styleUrl: './logistics-routes-panel.component.scss',
})
export class LogisticsRoutesPanelComponent implements OnInit {
  routes: LogisticsRoute[] = [];
  loading = true;
  saving = false;
  draft = { name: '', code: '', description: '' };

  constructor(
    private routesApi: LogisticsRouteService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading = true;
    this.routesApi.list().subscribe({
      next: (rows) => {
        this.routes = rows || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.toast.error('No se pudieron cargar las rutas');
        this.cdr.detectChanges();
      },
    });
  }

  create(): void {
    const name = this.draft.name.trim();
    const code = this.draft.code.trim();
    if (!name || !code || this.saving) return;
    this.saving = true;
    this.routesApi.create({ name, code, description: this.draft.description.trim() || null }).subscribe({
      next: () => {
        this.draft = { name: '', code: '', description: '' };
        this.saving = false;
        this.toast.success('Ruta creada');
        this.reload();
      },
      error: (error) => {
        this.saving = false;
        this.toast.error(error?.error?.message || 'No se pudo crear la ruta');
        this.cdr.detectChanges();
      },
    });
  }

  toggle(route: LogisticsRoute): void {
    this.routesApi
      .update(route.id, {
        name: route.name,
        code: route.code,
        description: route.description,
        is_active: !route.is_active,
      })
      .subscribe({
        next: () => this.reload(),
        error: (error) => this.toast.error(error?.error?.message || 'No se pudo actualizar la ruta'),
      });
  }
}

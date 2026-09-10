import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Muestra el bloque solo si la organización tiene ese módulo (algún permiso de la entidad en el JWT).
 *
 * *hasEntity="'sales_orders'"
 * *hasEntity="['sales_orders', 'inventory']"
 */
@Directive({
  selector: '[hasEntity]',
  standalone: true,
})
export class HasEntityDirective implements OnInit, OnDestroy {
  @Input() hasEntity: string | string[];

  private permissionsSubscription?: Subscription;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.updateView();
    });
  }

  ngOnDestroy(): void {
    this.permissionsSubscription?.unsubscribe();
  }

  private updateView(): void {
    const hasAccess = this.checkEntities();

    if (hasAccess && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private checkEntities(): boolean {
    if (!this.hasEntity) {
      return false;
    }

    const entities = Array.isArray(this.hasEntity) ? this.hasEntity : [this.hasEntity];
    return entities.some((entity) => this.authService.hasEntityAccess(entity));
  }
}

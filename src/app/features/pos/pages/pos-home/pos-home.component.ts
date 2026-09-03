import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LayoutGrid,
  ShoppingCart,
  Banknote,
} from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';
import { PosOverlayHostDirective } from '../../directives/pos-overlay-host.directive';
import { PosBranchSessionService } from '../../services/pos-branch-session.service';

@Component({
  selector: 'app-pos-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, PosOverlayHostDirective],
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
})
export class POSHomeComponent implements AfterViewInit {
  readonly LayoutGrid = LayoutGrid;
  readonly ShoppingCart = ShoppingCart;
  readonly Banknote = Banknote;

  constructor(
    private router: Router,
    private authService: AuthService,
    private posBranchSession: PosBranchSessionService
  ) {}

  ngAfterViewInit(): void {
    this.posBranchSession.ensureSelected().subscribe();
  }

  canSell(): boolean {
    return this.authService.canPosSell();
  }

  canCollect(): boolean {
    return this.authService.canPosCollect();
  }

  navigateToVentas(): void {
    this.router.navigate(['/pos/ventas']);
  }

  navigateToCobranza(): void {
    this.router.navigate(['/pos/cobranza']);
  }
}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contract-section-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="contract-nav" aria-label="Secciones de contratos">
      <a routerLink="/contracts" routerLinkActive="is-on" [routerLinkActiveOptions]="{ exact: true }">Contratos</a>
      <a routerLink="/contracts/metrics" routerLinkActive="is-on">Métricas</a>
    </nav>
  `,
  styles: [`
    .contract-nav {
      display: inline-flex;
      align-items: center;
      gap: 0.15rem;
      height: 2.5rem;
      padding: 0.2rem;
      border-radius: 10px;
      background: #f1f5f9;
      flex: 0 0 auto;
    }
    a {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 0.8rem;
      border-radius: 8px;
      color: #64748b;
      font-size: 0.8125rem;
      font-weight: 650;
      text-decoration: none;
      white-space: nowrap;
    }
    a.is-on {
      background: #fff;
      color: #0f172a;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
    }
  `],
})
export class ContractSectionNavComponent {}

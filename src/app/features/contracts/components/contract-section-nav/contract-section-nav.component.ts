import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contract-section-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="contract-metrics-link" routerLink="/contracts/metrics">Métricas</a>
  `,
  styles: [`
    .contract-metrics-link {
      display: inline-flex;
      align-items: center;
      height: 2.5rem;
      padding: 0 0.85rem;
      border-radius: 10px;
      background: #f1f5f9;
      color: #0f172a;
      font-size: 0.8125rem;
      font-weight: 650;
      text-decoration: none;
      white-space: nowrap;
    }
    .contract-metrics-link:hover {
      background: #e2e8f0;
    }
  `],
})
export class ContractSectionNavComponent {}

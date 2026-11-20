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
      color: #4f46e5;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
    }
    .contract-metrics-link:hover {
      text-decoration: underline;
    }
  `],
})
export class ContractSectionNavComponent {}

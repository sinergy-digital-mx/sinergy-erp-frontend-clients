import { Component } from '@angular/core';
import { LogisticsRoutesPanelComponent } from '../../components/logistics-routes-panel/logistics-routes-panel.component';

@Component({
  selector: 'app-logistics-routes-page',
  standalone: true,
  imports: [LogisticsRoutesPanelComponent],
  template: `<div class="page"><app-logistics-routes-panel /></div>`,
  styles: [`.page { max-width: 880px; margin: 0 auto; padding: 20px; }`],
})
export class LogisticsRoutesPageComponent {}

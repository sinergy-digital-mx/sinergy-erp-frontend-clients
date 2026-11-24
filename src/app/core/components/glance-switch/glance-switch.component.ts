import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-glance-switch',
  standalone: true,
  templateUrl: './glance-switch.component.html',
  styleUrl: './glance-switch.component.scss',
})
export class GlanceSwitchComponent {
  @Input() panel: 0 | 1 = 0;
  @Input() firstLabel = 'Resumen';
  @Input() secondLabel = 'Gráfica';
  @Output() panelChange = new EventEmitter<0 | 1>();

  pick(panel: 0 | 1): void {
    this.panelChange.emit(panel);
  }
}

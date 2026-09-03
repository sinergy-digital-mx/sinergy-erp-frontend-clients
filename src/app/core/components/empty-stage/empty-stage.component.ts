import { NgStyle } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

export interface EmptyStageParams {
  icon_size?: number;
  row_gap?: number;
  wrapper_icon_circle?: boolean;
  width?: number;
  height?: number;
}

@Component({
  selector: 'app-empty-stage',
  templateUrl: './empty-stage.component.html',
  styleUrls: ['./empty-stage.component.scss'],
  standalone: true,
  imports: [NgStyle],
})
export class EmptyStageComponent {
  @Input() image = '';
  @Input() icon = '';
  @Input() message = 'Sin resultados';
  @Input() sub_message = '';
  @Input() background = 'transparent';
  @Input() compact = false;
  @Input() params: EmptyStageParams = {
    icon_size: 28,
    row_gap: 16,
    wrapper_icon_circle: true,
    width: 72,
    height: 72,
  };

  @HostBinding('class.empty-stage-host--compact')
  get compactHost(): boolean {
    return this.compact;
  }

  get hostVars() {
    const box = this.params.width ?? this.params.height ?? 72;
    return {
      '--empty-icon-size': `${this.params.icon_size ?? 28}px`,
      '--empty-icon-box': `${box}px`,
      '--empty-gap': `${this.params.row_gap ?? 16}px`,
    };
  }
}

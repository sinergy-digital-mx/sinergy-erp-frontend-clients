import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

const POLLUX_LETTERS = ['P', 'O', 'L', 'L', 'U', 'X'] as const;

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [NgStyle],
})
export class SpinnerComponent {
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;
  @Input() border_width: number;
  @Input() size: 'sm' | 'md' = 'md';

  readonly letters = POLLUX_LETTERS;

  get isCompact(): boolean {
    return Number(this.width) > 0 && Number(this.width) <= 24;
  }

  setSpinnerStyles() {
    return {
      'width.px': this.width ? this.width : '',
      'height.px': this.height ? this.height : '',
      'border-left-color': this.color ? this.color : '',
      'border-width.px': this.border_width ? this.border_width : '',
    };
  }
}

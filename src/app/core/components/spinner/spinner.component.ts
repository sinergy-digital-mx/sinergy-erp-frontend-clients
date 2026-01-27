import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgStyle]
})
export class SpinnerComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;
  @Input() border_width: number;

  constructor() {}

  ngOnInit(): void {}

  setSpinnerStyles() {
    const styles = {
      'width.px': this.width ? this.width : '',
      'height.px': this.height ? this.height : '',
      'border-left-color': this.color ? this.color : '',
      'border-width.px': this.border_width ? this.border_width : '',
    };

    return styles;
  }
}

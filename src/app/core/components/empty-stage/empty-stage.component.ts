
import { NgStyle } from '@angular/common';
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';

@Component({
    selector: 'app-empty-stage',
    templateUrl: './empty-stage.component.html',
    styleUrls: ['./empty-stage.component.scss'],
    standalone: true,
    imports:[NgStyle]
})
export class EmptyStageComponent implements OnInit {
  @Input() image: string = '';
  @Input() icon: string = '';
  @Input() message: string = 'Results not found';
  @Input() sub_message: string = '';
  @Input() background: string = 'transparent';
  @Input() params: any = {
    icon_size: undefined,
    row_gap: undefined,
    wrapper_icon_circle: false,
    width: undefined,
    height: undefined,
  };
  constructor() {}

  ngOnInit(): void {
    if (this.params.icon_size === undefined) {
      this.params.icon_size = 22;
      this.setIconPropertySize(this.params.icon_size);
    } else {
      this.setIconPropertySize(this.params.icon_size);
    }
    if (this.params.row_gap === undefined) {
      this.params.row_gap = 8;
      this.setGapProperty(this.params.row_gap);
    } else {
      this.setGapProperty(this.params.row_gap);
    }
    if (this.params.width === undefined) {
      this.params.width = 46;
      this.setWidthProperty(this.params.width);
    } else {
      this.setWidthProperty(this.params.width);
    }
    if (this.params.height === undefined) {
      this.params.height = 46;
      this.setHeightProperty(this.params.height);
    } else {
      this.setHeightProperty(this.params.height);
    }
  }

  setWidthProperty(width: number) {
    document.documentElement.style.setProperty('--width', `${width}px`);
  }

  setHeightProperty(height: number) {
    document.documentElement.style.setProperty('--height', `${height}px`);
  }
  setGapProperty(gap: number) {
    document.documentElement.style.setProperty('--row_gap', `${gap}px`);
  }
  setIconPropertySize(size: number) {
    document.documentElement.style.setProperty('--icon_size', `${size}px`);
  }

  setStyles() {
    const styles = {
      background: this.background,
    };

    return styles;
  }
}

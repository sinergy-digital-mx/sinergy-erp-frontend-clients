import {
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { CommonModule, NgStyle } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EmptyStageComponent } from '../empty-stage/empty-stage.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    imports:[SelectComponent,NgStyle,NgxSkeletonLoaderModule,SpinnerComponent,PaginationComponent,MatTooltipModule,DragDropModule,InfiniteScrollModule,
      EmptyStageComponent,CommonModule],
    standalone: true
})
export class TableComponent implements OnInit {
  @Input() config = <ITable>{};

  loading: boolean = true;

  default_config = {
    title: 'Table',
    header: [],
    columns: '1fr',
    checkbox: true,
    empty_state: {
      title: 'No result found',
      subtitle: '',
    },
    data: [],
    page: 1,
    total_results: 0,
    pagination: false,
    limit: 15,
    min_width: 900,
    mobile_width: 600,
    border_radius: 4,
  };

  params_empty_state: IParamsEmptyStates = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };

  default_min_width: any = 900;
  default_mobile_width: number = 450;
  columns_mobile = '';
  active_sort: number;
  check_all: boolean = false;
  array_check: Array<any> = [];
  limit_acomulator: number = 1;
  is_mobile: boolean = false;
  tooltipOptions: Array<any> = ['after', 'before', 'above', 'below', 'left', 'right'];
  tooltip_position = new FormControl(this.tooltipOptions[5]);
  original_columns = ''

  @Input() row_template: TemplateRef<any>;
  @Output() clicked = new EventEmitter();
  @Output() paginationChange = new EventEmitter();
  @Output() checked = new EventEmitter();
  @Output() moveColumn = new EventEmitter();
  @Output() triggerButtonHeader = new EventEmitter();
  @Output() triggerSelectHeader = new EventEmitter();
  @Output() scroll = new EventEmitter();
  @Output() sortChange = new EventEmitter();
  @ViewChild('tbody', { static: false }) tbody: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= this.default_mobile_width) {
      this.columns_mobile = '1fr';
      this.is_mobile = true;
      this.params_empty_state = {
        ...this.params_empty_state,
        width: 40,
        height: 40,
        icon_size: 20,
      };
    } else {
      this.columns_mobile = '';
      this.is_mobile = false;
    }
  }

  constructor() {
    if (window.innerWidth <= this.default_mobile_width) {
      this.params_empty_state = {
        ...this.params_empty_state,
        width: 46,
        height: 46,
        icon_size: 22,
      };
    }
    this.config = {
      ...this.default_config,
      ...this.config,
      limit_array: this.config.limit_array ? this.config.limit_array : [25, 50, 100],
    };
  }

  ngOnInit(): void {
    // if (this.config.columns) {
    //   this.config.columns = `${this.config.index ? '25px':''} ${ this.config.drag_drop ? '34px': ''} ${this.config.checkbox ? '34px': ''} ${this.config.columns}`
    // }
    this.default_mobile_width = this.config.mobile_width ? this.config.mobile_width : this.default_mobile_width;
    if (window.innerWidth <= this.default_mobile_width) {
      this.columns_mobile = '1fr';
    }
    if (window.innerWidth <= this.default_mobile_width) {
      this.is_mobile = true;
    }
  }

  ngAfterViewInit() {}

  addPadding(): any {
    if (this.tbody) {
      setTimeout(() => {
        if (this.tbody.nativeElement.scrollHeight > this.tbody.nativeElement.clientHeight) {
          return { padding: `6px 26px 6px 16px` };
        } else {
          return { padding: `6px 16px` };
        }
      }, 2000);
    }
  }

  ngOnChanges(changes: any) {
    if(changes?.config?.firstChange){
      this.original_columns = changes.config.currentValue.columns;
    }
    if(changes.config){
      this.config.columns = `${this.config.index ? '25px':''} ${ this.config.drag_drop ? '34px': ''} ${this.config.checkbox ? '34px': ''} ${this.original_columns}`
      this.config.limit_array = this.config.limit_array ? this.config.limit_array : [15, 30, 40, 50, 100];
    }
  }

  buttonHeaderEvent() {
    if (this.config.top_button !== undefined) {
      this.triggerButtonHeader.emit(true);
    }
  }

  selectChangeEvent(event_value: any) {
    if (this.config.select_config !== undefined) {
      this.triggerSelectHeader.emit(event_value);
    }
  }

  rowStyles() {
    const styles = {
      'grid-template-columns': this.config.columns,
      padding: '6px 16px',
    };

    if (this.tbody && this.tbody.nativeElement.scrollHeight > this.tbody.nativeElement.clientHeight) {
      styles.padding = `6px 26px 6px 16px`;
    }

    return styles;
  }

  getContext() {
    return {
      data: this.config.data,
    };
  }

  clickEvent(model: any) {
    this.clicked.emit(model);
  }

  eventPagination(pagination: any) {
    this.tbody.nativeElement.scrollTop = 0;
    this.paginationChange.emit(pagination);
  }

  validateDataType(value: any) {
    return typeof value == 'object' ? true : false;
  }

  checkedAll(event: any) {
    this.check_all = !this.check_all;
    event.checked ? (this.array_check = JSON.parse(JSON.stringify(this.config.data))) : (this.array_check = []);
    this.checked.emit({ array_checks: this.array_check });
  }

  checkRow(event: any, index: number, item: any) {
    if (event.checked) {
      this.array_check.push(this.config.data[index]);
    } else {
      this.array_check.splice(index, 1);
    }
    this.checked.emit({ value: event.checked, data: item, array_checks: this.array_check });
  }

  sortColumn(header: any, index: number) {
    if (this.config.data.length > 0 && this.validateDataType(header)) {
      this.config.header.forEach((item) => {
        if (item != header && this.validateDataType(item)) {
          item.order_asc = false;
        }
      });
      header.order_asc = !header.order_asc;
      if (header.key) {
        this.active_sort = this.active_sort == index ? -1 : index;
        if (typeof this.config.data[0][header.key] == 'string') {
          this.config.data.sort((a, b) => {
            if (header.order_asc) {
              return this.compareString(b[header.key], a[header.key]);
            } else {
              return this.compareString(a[header.key], b[header.key]);
            }
          });
        }
        if (typeof this.config.data[0][header.key] == 'number') {
          this.config.data.sort((a, b) => {
            if (header.order_asc) {
              return b[header.key] - a[header.key];
            } else {
              return a[header.key] - b[header.key];
            }
          });
        }
      } else {
        this.sortChange.emit({ order: header.order_asc ? header.asc : header.desc });
      }
    }
  }

  compareString(a: any, b: any) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  moveColumnEvent(event: CdkDragDrop<string[]>) {

    const prev = this.config.data[event.previousIndex];
    const curr = this.config.data[event.currentIndex];

    if (this.config.drag_disable && (prev[this.config.drag_disable] || curr[this.config.drag_disable])) {
      return;
    }

    let array_temp = {
      ...this.config.data
    }

    // if(this.config.drag_drop_index){
    //   let position_current = array_temp[event.previousIndex][this.config.drag_drop_index];
    //   let position_before = array_temp[event.currentIndex][this.config.drag_drop_index];
      
    //   this.config.data[event.previousIndex][this.config.drag_drop_index] = position_before;
    //   this.config.data[event.currentIndex][this.config.drag_drop_index] = position_current;
    // }

    moveItemInArray(this.config.data, event.previousIndex, event.currentIndex);
    this.moveColumn.emit({
      previous: event.previousIndex,
      current: event.currentIndex,
      data: this.config.data,
      item: event.item.data,
      item_previous: this.config.data[event.previousIndex],
      item_before: array_temp[event.currentIndex]
    });
  }

  onScroll() {
    if (this.config.page < this.totalPages()) {
      this.config.page++;
      this.scroll.emit({ page: this.config.page });
    }
  }

  totalPages() {
    let total = 1;
    if (this.config.total_results > 0) {
      let total = this.config.total_results / this.config.limit;
      return (total = Math.ceil(total));
    } else {
      return total;
    }
  }
}

export interface ITable {
  header: Array<any>;
  title: string;
  columns: string;
  empty_state?: {
    title?: string;
    subtitle?: string;
  };
  checkbox?: boolean;
  checkbox_all?: boolean;
  checkbox_value?: string;
  checkbox_disabled_all?: boolean;
  click?: boolean;
  loading?: boolean;
  loading_scroll?: boolean;
  active_infinite_scroll?: boolean;
  data: Array<any>;
  total_results: number;
  page: number;
  limit: number;
  limit_array?: Array<number>;
  pagination: boolean;
  min_width?: number;
  mobile_width?: number;
  border_radius?: number;
  select_array?: Array<any>;
  select_config?: {};
  top_button?: ITabHeadbutton;
  drag_drop?: boolean;
  drag_disable?: string
  // drag_drop_index?:string
  index?: boolean;
  activate_params?:boolean
}

export interface ITabHeadbutton {
  class: string;
  title: string;
  icon_class?: string;
}


export interface IParamsEmptyStates {
  icon_size: number | undefined;
  row_gap: number | undefined;
  wrapper_icon_circle: boolean;
  width?: number | undefined;
  height?: number | undefined;
}
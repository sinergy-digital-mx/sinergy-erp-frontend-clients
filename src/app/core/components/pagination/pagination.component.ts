import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, pluck } from 'rxjs';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports:[ReactiveFormsModule]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() total_results: number = 0;
  @Input() limit: number = 15;
  @Input() page: number = 1;
  @Input() limit_array: Array<number> = [15, 30, 40, 50, 100];
  @Output() goPage = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() limitChange = new EventEmitter();
  @Input() activate_params: boolean = false;

  total_pages: number = 0;
  form: any;
  timeout: any;
  width_mobile: boolean = false;

  @ViewChild('input_number', { static: true }) input_number!: ElementRef<any>;
  @ViewChild('content', { static: true }) content: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.content.nativeElement.offsetWidth <= 450) {
      this.width_mobile = true;
    } else {
      this.width_mobile = false;
    }
  }

  constructor(public form_builder: FormBuilder, public route:ActivatedRoute, public router:Router) {
    this.form = form_builder.group({
      page: [1],
      limit: [100],
    });
  }


  ngOnInit(): void {
    if(this.activate_params){
      let page = this.route.snapshot.queryParams.page ? Number(this.route.snapshot.queryParams.page) : this.page
      let limit = this.route.snapshot.queryParams.limit ? Number(this.route.snapshot.queryParams.limit) : this.limit
      this.page = page
      this.limit = limit
      
      this.form.controls.limit.setValue(limit);
      this.form.controls.page.setValue(page);
    }else{
      if (!this.limit_array.includes(this.limit)) {
        this.limit = 100;
      }
      this.form.controls.limit.setValue(this.limit);
      this.getPageInput();
    }
    if (this.content.nativeElement.offsetWidth <= 600) {
      this.width_mobile = true;
    }
    this.totalPages();
  }

  ngOnChanges(changes: any): void {
    if (changes.page && !this.activate_params) {
      this.form.controls.page.setValue(changes.page.currentValue);
    }
    if (changes.total_results) {
      this.totalPages();
    }
  }

  ngAfterViewInit() {
    /*  if (this.content.nativeElement.offsetWidth <= 600) {
      this.width_mobile = true;
    } */
  }

  changeLimit() {
    this.limit = this.form.controls.limit.value;
    this.page = 1;
    this.form.controls.limit.setValue(this.limit);
    this.form.controls.page.setValue(this.page);
    this.pageChange.emit(this.page);
    this.limitChange.emit(this.limit);
    this.totalPages();
    this.goPage.emit({ page: this.page, limit: this.limit });
    if(this.activate_params){
      this.addQueryParam(this.page, this.limit)
    }
  }

  totalPages() {
    if (this.total_results > 0) {
      let total = this.total_results / this.limit;
      this.total_pages = Math.ceil(total);
    } else {
      this.form.controls.page.setValue(this.page);
      this.total_pages = 1;
    }
  }

  goNext() {
    if (this.page == this.total_pages) {
      return;
    }
    this.setPage(Math.min(this.total_pages, this.page + 1));
  }

  goPrevious() {
    if (this.page == 1) {
      return;
    }
    this.setPage(Math.max(1, this.page - 1));
  }

  setPage(numberPage: number) {
    if (numberPage >= 1 && numberPage <= this.total_pages) {
      this.page = numberPage;
      this.form.controls.page.setValue(this.page);
    } else {
      if (numberPage > this.total_pages) {
        this.page = this.total_pages;
        this.form.controls.page.setValue(this.page);
      }
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.pageChange.emit(this.page);
      this.goPage.emit({ page: this.page, limit: this.limit });
      if(this.activate_params){
        this.addQueryParam(this.page, this.limit)
      }
    }, 300);
  }

  resetPage() {
    this.page = 1;
  }

  getPageInput() {
    fromEvent<number>(this.input_number.nativeElement, 'keyup')
      .pipe(pluck('target', 'value'), debounceTime(1000), distinctUntilChanged())
      .subscribe((res: any) => {
        if (res === '' || res < 1) {
          this.setPage(1);
        } else {
          this.setPage(Number(res));
        }
      });
  }

  addQueryParam(page:any, limit): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        page,
        limit
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}

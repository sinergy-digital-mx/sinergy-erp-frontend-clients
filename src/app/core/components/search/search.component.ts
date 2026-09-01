import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, LucideAngularModule],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  search = new FormControl('');
  subscription: Subscription;
  readonly Search = Search;
  @Input() default_value?: string;
  @Input() placeholder: string = 'Search';
  @Input() label: string = null;
  @Input() showSearchIcon = false;
  @Input() param_activate: boolean = false;
  @Input() param_name: string = 'search';
  @Output() searchChange = new EventEmitter();

  constructor(
    public router: Router,
    public route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.search.valueChanges.pipe(debounceTime(600)).subscribe((value) => {
      this.emitSearch(value);
    });

    if(this.param_activate){
      this.search.setValue(this.route.snapshot.queryParams[this.param_name] ?? '')
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['default_value'] && typeof this.default_value === 'string') {
      this.search.setValue(this.default_value, { emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  addQueryParam(value:string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        [this.param_name]: value,
        page:1
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  clear(): void {
    this.search.setValue('', { emitEvent: false });
    this.emitSearch('');
  }

  private emitSearch(value: unknown): void {
    const next = typeof value === 'string' ? value.trim() : '';
    this.searchChange.emit(next);
    if (this.param_activate) {
      this.addQueryParam(next);
    }
  }

}

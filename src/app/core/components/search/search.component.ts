import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  subscription: Subscription;
  @Input() default_value?: string;
  @Input() placeholder: string = 'Search';
  @Input() label: string = null;
  @Input() param_activate: boolean = false;
  @Input() param_name: string = 'search';
  @Output() searchChange = new EventEmitter();

  constructor(
    public router: Router,
    public route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.search.valueChanges.pipe(debounceTime(600)).subscribe((value) => {
      if (typeof value != 'undefined') {
        this.searchChange.emit(value.trim());
        if(this.param_activate){
          this.addQueryParam(value)
        }
      }
    });

    if(this.param_activate){
      this.search.setValue(this.route.snapshot.queryParams[this.param_name])
    }
  }
  ngOnChanges(): void {
    this.search.setValue(this.default_value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.search.setValue('');
  }

}

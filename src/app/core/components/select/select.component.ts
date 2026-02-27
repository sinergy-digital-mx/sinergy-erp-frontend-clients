import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { pairwise, startWith, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule]
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() config = <ISelect>{
    placeholder: 'Select an option',
    value_default: null,
    all: true,
  };

  @Input() set disable(value: boolean) {
    if (value) {
      this.select.disable({ emitEvent: false });
    } else {
      this.select.enable({ emitEvent: false });
    }
    this.disabled = value;
  }

  @Output() changeOption = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() has_error: boolean = false
  @Input() label: string

  select = new FormControl(null);
  disabled: boolean = false;
  subscription: Subscription;
  
  // Generate unique ID for aria-describedby
  private static idCounter = 0
  selectId: string
  errorId: string

  constructor() { }

  ngOnInit(): void {
    // Generate unique IDs for accessibility
    SelectComponent.idCounter++
    this.selectId = `select-${SelectComponent.idCounter}`
    this.errorId = `error-${SelectComponent.idCounter}`
    
    if (this.config.form_control) {
      this.subscription = this.config.form_control.valueChanges.subscribe((value) => {
        const data = this.config.data.find((option) => option[this.config.value] === value);
        this.changeOption.emit({ value, name: this.config.name_select, data });
      });
    } else {
      this.subscription = this.select.valueChanges.subscribe((value) => {
        const data = this.config.data.find((option) => option[this.config.value] === value);
        this.changeOption.emit({ value, name: this.config.name_select, data });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.config.form_control) {
      this.select.setValue(this.config.form_control.value, { onlySelf: true, emitEvent: false });
    } else {
      this.select.setValue(this.config.value_default, { onlySelf: true, emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRefresh() {
    this.config.error = false;
    this.refresh.emit();
  }
  
  get showError(): boolean {
    return this.has_error || (this.config?.form_control?.invalid && this.config?.form_control?.touched)
  }
  
  get errorMessage(): string {
    if (!this.showError || !this.config?.form_control?.errors) {
      return ''
    }
    
    const errors = this.config.form_control.errors
    if (errors['required']) {
      return 'Este campo es obligatorio'
    }
    return 'Este campo tiene un error'
  }

}

export interface ISelect {
  value_default?: any;
  placeholder: string;
  data: Array<any>;
  name_select?: string;
  value: any;
  option: string;
  all?: boolean;
  all_message?: string;
  disabled_option?: string;
  height?: string | null;
  form_control?: any;
  loading?: any;
  error?: any
  label?: string
}
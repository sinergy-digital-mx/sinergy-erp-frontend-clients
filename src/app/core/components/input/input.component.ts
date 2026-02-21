import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports:[ReactiveFormsModule,NgClass]
})
export class InputComponent {
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() disabled: string = ''
  @Input() form_control: any
  @Input() type: 'text' | 'number' | 'time' | 'textarea' = 'text'
  @Input() has_error: boolean = false
  @Input() debounce: number = 0
  @Output() change = new EventEmitter()
  subscription: Subscription


  ngOnChanges(changes) {
    if (changes.disabled) {
      changes.disabled.currentValue ? this.form_control.disable() : this.form_control.enable();
    }
  }

  ngOnInit(): void {
    if (this.form_control) {
      this.subscription = this.form_control.valueChanges.pipe(debounceTime(this.debounce)).subscribe((value) => {
        this.change.emit(value)
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onInputChange(event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.change.emit(value)
  }

  get showError(): boolean {
    return this.has_error || (!!this.form_control && this.form_control.invalid && this.form_control.touched);
  }

}

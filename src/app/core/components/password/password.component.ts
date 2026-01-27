import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';


import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    LucideAngularModule
  ],
})
export class PasswordComponent {
  @Input() form_control: any;
  @Input() label: any;
  @Input() has_error: boolean = false; // opcional
  @Input() placeholder = '***********'
  

  eye: boolean = false;

  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;

  input = new FormControl('');
  subscription?: Subscription;

  get showError(): boolean {
    return this.has_error || (!!this.form_control && this.form_control.invalid && this.form_control.touched);
  }

  ngOnInit() {
    if (this.form_control) {
      // sincroniza el valor inicial (si ya viene desde afuera)
      this.input.setValue(this.form_control.value ?? '', { emitEvent: false });

      this.subscription = this.input.valueChanges.subscribe(value => {
        this.form_control.setValue(value);
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

  @Input() text?: string;
  @Input() icon?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass = '';

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}

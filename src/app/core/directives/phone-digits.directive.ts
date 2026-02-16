import { Directive, HostListener } from '@angular/core';

/**
 * Directive to limit phone input to 10 digits only
 * Usage: <input appPhoneDigits />
 */
@Directive({
  selector: '[appPhoneDigits]',
  standalone: true
})
export class PhoneDigitsDirective {
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    
    input.value = value;
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const char = event.key;
    
    // Allow only digits
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
}

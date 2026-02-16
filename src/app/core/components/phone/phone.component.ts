import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (phone) {
      <a [href]="'tel:' + phone" class="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
        @if (countryCode || countryPhoneCode) {
          <span class="px-2 py-1 rounded bg-gray-100 text-xs text-gray-600">
            @if (countryCode) {
              {{ countryCode }}
            }
            @if (countryPhoneCode) {
              {{ ' ' + countryPhoneCode }}
            }
          </span>
        }
        <span>{{ phone }}</span>
      </a>
    } @else {
      <span class="text-gray-400">—</span>
    }
  `
})
export class PhoneComponent {
  @Input() phone?: string;
  @Input() countryCode?: string;
  @Input() countryPhoneCode?: string;
}

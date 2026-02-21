import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (phone) {
      <a [href]="'tel:' + phone" class="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 text-xs max-w-full">
        @if (countryCode || countryPhoneCode) {
          <span class="px-1.5 py-0.5 rounded bg-gray-100 text-xs text-gray-600 whitespace-nowrap shrink-0">
            @if (countryCode) {
              {{ countryCode }}
            }
            @if (countryPhoneCode) {
              {{ countryPhoneCode }}
            }
          </span>
        }
        <span class="truncate text-xs">{{ phone }}</span>
      </a>
    } @else {
      <span class="text-gray-400 text-xs">—</span>
    }
  `
})
export class PhoneComponent {
  @Input() phone?: string;
  @Input() countryCode?: string;
  @Input() countryPhoneCode?: string;
}

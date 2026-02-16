import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { SelectComponent, ISelect } from '../../components/select/select.component';
import { CatalogService } from '../../services/catalog.service';

export interface PhoneCode {
  code: string;
  name: string;
}

@Component({
  selector: 'app-phone-code-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig()"
      [label]="'Phone Code'"
      [has_error]="control?.invalid && control?.touched">
    </app-select>
  `,
  styles: []
})
export class PhoneCodeSelectComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Output() codeSelected = new EventEmitter<PhoneCode>();

  phoneCodes = signal<PhoneCode[]>([]);
  loading = signal(false);

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.loadPhoneCodes();
  }

  selectConfig() {
    return {
      placeholder: 'Select a phone code',
      data: this.phoneCodes(),
      value: 'code',
      option: 'name',
      form_control: this.control,
      loading: this.loading()
    } as ISelect;
  }

  private loadPhoneCodes() {
    this.loading.set(true);
    this.catalogService.getPhoneCountries().subscribe({
      next: (data) => {
        this.phoneCodes.set(
          data.map(item => ({
            code: item.value || item.code,
            name: `${item.name} (${item.value || item.code})`
          }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.phoneCodes.set(this.getDefaultPhoneCodes());
      }
    });
  }

  private getDefaultPhoneCodes(): PhoneCode[] {
    return [
      { code: '+1', name: 'United States (+1)' },
      { code: '+52', name: 'Mexico (+52)' },
      { code: '+1', name: 'Canada (+1)' },
      { code: '+44', name: 'United Kingdom (+44)' },
      { code: '+34', name: 'Spain (+34)' },
      { code: '+33', name: 'France (+33)' },
      { code: '+49', name: 'Germany (+49)' },
      { code: '+39', name: 'Italy (+39)' },
      { code: '+55', name: 'Brazil (+55)' },
      { code: '+54', name: 'Argentina (+54)' },
      { code: '+57', name: 'Colombia (+57)' },
      { code: '+56', name: 'Chile (+56)' },
      { code: '+51', name: 'Peru (+51)' },
      { code: '+81', name: 'Japan (+81)' },
      { code: '+86', name: 'China (+86)' },
      { code: '+91', name: 'India (+91)' },
      { code: '+61', name: 'Australia (+61)' }
    ];
  }
}

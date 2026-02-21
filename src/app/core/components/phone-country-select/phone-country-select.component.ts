import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { SelectComponent, ISelect } from '../../components/select/select.component';
import { CatalogService } from '../../services/catalog.service';

export interface PhoneCountry {
  code: string;
  name: string;
  phoneCode: string;
}

@Component({
  selector: 'app-phone-country-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig()"
      [label]="'País'"
      [has_error]="control?.invalid && control?.touched">
    </app-select>
  `,
  styles: []
})
export class PhoneCountrySelectComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Output() countrySelected = new EventEmitter<PhoneCountry>();

  countries = signal<PhoneCountry[]>([]);
  loading = signal(false);

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.loadCountries();
  }

  selectConfig() {
    return {
      placeholder: 'Selecciona un país',
      data: this.countries(),
      value: 'code',
      option: 'displayName',
      form_control: this.control,
      loading: this.loading()
    } as ISelect;
  }

  private loadCountries() {
    this.loading.set(true);
    this.catalogService.getPhoneCountries().subscribe({
      next: (data) => {
        this.countries.set(
          data.map(item => ({
            code: item.code,
            name: item.name,
            phoneCode: item.value || '',
            displayName: item.name
          })) as any
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.countries.set(this.getDefaultCountries());
      }
    });
  }

  private getDefaultCountries(): PhoneCountry[] {
    return [
      { code: 'US', name: 'United States', phoneCode: '+1' },
      { code: 'MX', name: 'Mexico', phoneCode: '+52' },
      { code: 'CA', name: 'Canada', phoneCode: '+1' },
      { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
      { code: 'ES', name: 'Spain', phoneCode: '+34' },
      { code: 'FR', name: 'France', phoneCode: '+33' },
      { code: 'DE', name: 'Germany', phoneCode: '+49' },
      { code: 'IT', name: 'Italy', phoneCode: '+39' },
      { code: 'BR', name: 'Brazil', phoneCode: '+55' },
      { code: 'AR', name: 'Argentina', phoneCode: '+54' },
      { code: 'CO', name: 'Colombia', phoneCode: '+57' },
      { code: 'CL', name: 'Chile', phoneCode: '+56' },
      { code: 'PE', name: 'Peru', phoneCode: '+51' },
      { code: 'JP', name: 'Japan', phoneCode: '+81' },
      { code: 'CN', name: 'China', phoneCode: '+86' },
      { code: 'IN', name: 'India', phoneCode: '+91' },
      { code: 'AU', name: 'Australia', phoneCode: '+61' }
    ];
  }
}

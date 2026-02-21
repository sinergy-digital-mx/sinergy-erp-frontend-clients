import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localDate',
  standalone: true
})
export class LocalDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string | Date | null | undefined, format: string = 'mediumDate'): string | null {
    if (!value) return null;

    // If it's a date string in format YYYY-MM-DD, treat it as local date
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      // Add 'T00:00:00' to force local timezone interpretation
      const localDate = new Date(value + 'T00:00:00');
      return this.datePipe.transform(localDate, format);
    }

    // For datetime strings, use as is
    return this.datePipe.transform(value, format);
  }
}

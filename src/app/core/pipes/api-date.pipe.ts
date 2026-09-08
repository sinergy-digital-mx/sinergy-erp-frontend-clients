import { Pipe, PipeTransform } from '@angular/core';
import { ApiDateKind, formatApiDate } from '../utils/api-datetime.util';

@Pipe({
  name: 'apiDate',
  standalone: true,
})
export class ApiDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined, kind: ApiDateKind = 'datetime'): string {
    if (value == null || value === '') {
      return '';
    }
    const formatted = formatApiDate(value, kind);
    return formatted === '—' ? '' : formatted;
  }
}

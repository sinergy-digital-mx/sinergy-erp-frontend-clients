import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTrailingZeros',
  standalone: true
})
export class RemoveTrailingZerosPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    
    // Convert to string and remove trailing zeros after decimal point
    const str = num.toString();
    
    // If no decimal point, return as is
    if (!str.includes('.')) {
      return str;
    }
    
    // Remove trailing zeros after decimal point
    return str.replace(/\.?0+$/, '');
  }
}

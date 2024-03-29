import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber'
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    if (value < 1e3) {
      return value.toString();
    } else if (value < 1e6) {
      return (value / 1e3).toFixed(2) + 'K';
    } else if (value < 1e9) {
      return (value / 1e6).toFixed(2) + 'M';
    } else if (value < 1e12) {
      return (value / 1e9).toFixed(2) + 'B';
    } else {
      return (value / 1e12).toFixed(2) + 'T';
    }
  }

}

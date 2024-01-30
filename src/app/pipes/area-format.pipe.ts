import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaFormat'
})
export class AreaFormatPipe implements PipeTransform {

   transform(value: number, decimalPlaces: number = 2): string {
    const absValue = Math.abs(value);
    const million = 1000000;
    const billion = 1000000000;

    let formattedNumber = '';

    if (absValue >= billion) {
      formattedNumber = (value / billion).toFixed(decimalPlaces) + 'B';
    } else if (absValue >= million) {
      formattedNumber = (value / million).toFixed(decimalPlaces) + 'M';
    } else {
      formattedNumber = value.toFixed(decimalPlaces);
    }

    return `${formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} km²`;
  }

}

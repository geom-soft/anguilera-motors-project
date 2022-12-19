import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(hour: string): string {
    if (hour) {
      return hour.substring(0, 5) + ' hrs';
    }
    return 'NA';
  }

}

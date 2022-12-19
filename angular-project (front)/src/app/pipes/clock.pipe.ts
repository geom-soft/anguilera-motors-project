import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({
  name: 'clock'
})
export class ClockPipe implements PipeTransform {

  transform(segundos: number): any {
    return moment.utc(segundos * 1000).format('mm:ss');
  }

}

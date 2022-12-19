import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(date: string, format?: string) {
    moment.locale('es');
    if (
      date === undefined ||
      date === '' ||
      date === 'null' ||
      date === null ||
      date === 'Invalid date'
    ) {
      return '';
    }
    return moment(date).format(format ? format : 'DD/MM/YYYY');
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import 'moment-duration-format';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(date: string, type?: string, format?: string) {
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

    let res = '';
    switch (type) {
      case 'date':      res = moment(date).format('DD/MM/YYYY'); break;
      case 'datetime':  res =  moment(date).format('DD/MM/YYYY h:mm a'); break;
      case 'time':      res =  moment(date).format('h:mm a'); break;
      case 'custom':    res =  moment(date).format(format); break;
      // case 'convert':   res =  moment.duration(Number(date), 'seconds').format('mm:ss'); break;
      default:          res =  moment(date).format('DD/MM/YYYY'); break;
    }
    return res;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'lastPosition'})
export class LastPosition implements PipeTransform {
  
  transform(value: any[]): any {
    value.sort((a, b) => {
      let dateA = moment(a.createdAt, 'DD-MM-YYYY H:m');
      let dateB = moment(b.createdAt, 'DD-MM-YYYY H:m');
      if (dateA.isAfter(dateB)) return -1;
      if (dateB.isAfter(dateA)) return 1;
      return 0
    })
    let result: any [] =[]
    result.push(value[0])
    return result
  }
}
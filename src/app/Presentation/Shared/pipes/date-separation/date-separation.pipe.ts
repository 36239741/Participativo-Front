import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSeparation'
})
export class DateSeparationPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let date: string[] = value.trim().split(' ');
    return date[0];
  }

}

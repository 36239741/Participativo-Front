import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderArray'
})
export class OrderArrayPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    let array: any[] = [];
    if(value.length > 0) {
      array = value.sort(function compare(a,b) {
        let stringDate1 = String(a.createdAt).trim().split(' ')[0].split('/')
        let stringDate2 = String(b.createdAt).trim().split(' ')[0].split('/')
        let date1 = new Date(Number(stringDate1[2]), Number(stringDate1[1])-1, Number(stringDate1[0]));
        let date2 = new Date(Number(stringDate2[2]), Number(stringDate2[1])-1, Number(stringDate2[0]));
        if(date1 < date2) return -1;
        if(date1 > date2) return 1;
        if(date1 === date2) return 0;
      })
    }

    return array;
  }

}

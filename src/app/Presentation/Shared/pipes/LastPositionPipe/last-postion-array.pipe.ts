import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lastPosition'})
export class LastPosition implements PipeTransform {
  
  transform(value: any[]): any {
    let result: any[] = []
    if(value.length > 0) {
      result.push(value[value.length - 1]);
    }else {
      result.push({ tipo: 'Vazio', createdAt: new Date().toLocaleDateString() })
    }
    return result;
  }
}
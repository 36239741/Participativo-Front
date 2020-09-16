import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationsType'
})
export class NotificationsTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let notificationsType = 
      {'COMENTARIO': 'comentou',
      'APOIO': 'apoiou',
      'STATUS': 'status'}
    
    return notificationsType[value];
  }

}

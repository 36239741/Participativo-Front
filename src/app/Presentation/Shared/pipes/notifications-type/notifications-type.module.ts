import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsTypePipe } from './notifications-type.pipe';

@NgModule({
  declarations: [	
    NotificationsTypePipe
 ],
  imports: [
    CommonModule
  ],
  exports: [NotificationsTypePipe] 

})
export class NotificationsTypeModule { }
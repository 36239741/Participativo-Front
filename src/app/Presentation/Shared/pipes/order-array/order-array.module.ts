import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderArrayPipe } from './order-array.pipe';

@NgModule({
  declarations: [	
    OrderArrayPipe
 ],
  imports: [
    CommonModule
  ],
  exports: [ OrderArrayPipe ]
})
export class OrderArrayModule { }

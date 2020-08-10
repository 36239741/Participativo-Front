import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastPosition } from './last-postion-array.pipe';

@NgModule({
  declarations: [ LastPosition ],
  imports: [
    CommonModule
  ],
  exports: [ LastPosition ]
})
export class LastPositionPipeModule { }

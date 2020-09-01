import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSeparationPipe } from './date-separation.pipe';

@NgModule({
  declarations: [DateSeparationPipe],
  imports: [
    CommonModule
  ],
  exports: [ DateSeparationPipe ]
})
export class DateSeparationModule { }

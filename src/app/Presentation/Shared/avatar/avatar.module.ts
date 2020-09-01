import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AvatarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [AvatarComponent]
})
export class AvatarModule { }

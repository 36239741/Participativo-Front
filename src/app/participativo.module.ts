import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './participativo-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './participativo.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './Infra/Authentication/jwt-interceptor.service';
import { AuthGuardService } from './Infra/Authentication/auth-guard.service';
import { MaterialModule } from './Presentation/Shared/material/material.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: 
  [
    JwtInterceptorService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

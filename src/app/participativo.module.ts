import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './participativo-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './participativo.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './Infra/Authentication/jwt-interceptor.service';
import { AuthGuardService } from './Infra/Authentication/auth-guard.service';
import { MaterialModule } from './Presentation/Shared/material/material.module';
import { SnackbarCustomComponent } from './Presentation/Shared/snackbar/snackbar-custom/snackbar-custom.component';
import { SnackbarCustomModule } from './Presentation/Shared/snackbar/snackbar-custom/snackbar-custom.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SnackbarCustomModule
  ],
  providers: 
  [
    JwtInterceptorService,
    AuthGuardService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: [SnackbarCustomComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

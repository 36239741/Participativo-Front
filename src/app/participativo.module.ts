import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './participativo-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './participativo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './Infra/Authentication/jwt-interceptor.service';
import { AuthGuardService } from './Infra/Authentication/auth-guard.service';
import { MaterialModule } from './Presentation/Shared/material/material.module';
import { SnackbarCustomComponent } from './Presentation/Shared/snackbar/snackbar-custom/snackbar-custom.component';
import { SnackbarCustomModule } from './Presentation/Shared/snackbar/snackbar-custom/snackbar-custom.module';
import { LoadingModule } from './Presentation/Shared/loading/loading.module';
import { LoadingService } from './Presentation/Shared/loading/loading.service';
import { LoadingInterceptorService } from './Presentation/Shared/loading/loading-interceptor.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SnackbarCustomModule,
    Interceptor,
    LoadingModule,
  ],
  providers: 
  [
    AuthGuardService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true }
  ],
  entryComponents: [
    SnackbarCustomComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

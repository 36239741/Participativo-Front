import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request;
      if(localStorage.getItem('token') != null) {
        request = req.clone({   
          setHeaders: {
            Authorization: localStorage.getItem('token')
          }  
      })
  }else {
    request = req.clone();
  }

    return next.handle(request).pipe(catchError((err) => {
      if(err.status === 403) {
        localStorage.removeItem('token')
      }
      return throwError(err);
    }))

}
}
@NgModule({
  providers: [
   {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true,
   },
  ],
})

export class Interceptor {}
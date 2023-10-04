import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptionInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    if (request.url.includes('/auth') || request.url.includes('/role')) {
      return next.handle(request);
   }
    const localToken = localStorage.getItem('token');
    request = request.clone({headers: request.headers.set('Authorization', 'Bearer '+ localToken)});
    return next.handle(request);
  }
}

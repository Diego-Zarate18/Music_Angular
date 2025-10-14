import { HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { CookieStorageService } from '../services/cookie-storage-service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const _cookieStorageService: CookieStorageService = inject (CookieStorageService);

  return next(req).pipe(tap(
    event =>{
      if(!(event.type === HttpEventType.Response))
        return;

      const body = event.body as any;

      if(!body || !body.access_token)
        return;

      const expirationTime = 60*60*1000;
      const expirationDate = new Date(Date.now() + expirationTime);

      _cookieStorageService.createCookie('acces_token', body.acces_token, expirationDate)
      
    }
  ));
};

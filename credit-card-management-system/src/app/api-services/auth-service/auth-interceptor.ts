import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from './auth-service';
import {inject} from '@angular/core';
import {switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/Login')) {
    return next(req);
  }

  const authService = inject(AuthService);

  return authService.getToken().pipe(
    switchMap(token => {
      if (token) {
        return next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        }));
      }
      return next(req);
    })
  );
};

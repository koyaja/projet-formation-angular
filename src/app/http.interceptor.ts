import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './service/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
const  authService = inject(AuthService);
const token = authService.getToken();
if (token) {
  req.clone({
    headers: {
      //@ts-ignore
      'Authorization': `Bearer ${token}`
    }
  })
}
  return next(req);
};

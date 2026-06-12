import { HttpInterceptorFn } from '@angular/common/http';
import { LoginUserStateService } from '../state/login-user-state-service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loginUserStateService = inject(LoginUserStateService);
  if (loginUserStateService.isLoggedIn()) {
    const token = loginUserStateService.user()?.token;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return next(req);
};

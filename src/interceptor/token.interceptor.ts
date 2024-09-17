import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authHeaders = req.clone({
    headers: req.headers.set('Authorization', 'API no longer requests')
  });
  return next(authHeaders);
};

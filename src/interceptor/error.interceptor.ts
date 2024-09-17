import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 404) {
        console.error("Not found (404)", error); 
        return throwError(() => error); 
      }
      if (error.status === 400) {
        console.error("Bad request (400)", error);
        return throwError(() => new Error("Bad request (400)")); 
      }
      return throwError(() => error); 
    })
  );
};

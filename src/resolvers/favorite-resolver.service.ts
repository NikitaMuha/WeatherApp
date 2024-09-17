import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { ForecastService } from '../services/forecast.service';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteResolverService implements Resolve<any> {
  private forecast = inject(ForecastService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.forecast.getForecast(route.params?.['city'])
    .pipe(
      catchError(error => {
        throwError(error);
        return of();
      }),
    )
  }
}

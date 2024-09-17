import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Weather } from '../../interfaces/weather.interface';

import { FavoriteService } from '../../services/favorite.service';
import { ForecastService } from '../../services/forecast.service';
import { DataSharingService } from '../../services/data-sharing.service';

import { forkJoin, from, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {
  private forecastService = inject(ForecastService);
  private favService = inject(FavoriteService);
  private dataSharing = inject(DataSharingService);
  private router = inject(Router)



  private favCities: string[] = [];
  public isFavorite: boolean = false;

  public forecastCity$: Observable<Weather[]> = new Observable<Weather[]>;

  ngOnInit(): void {
    this.updateFavoriteCities();
  }

  public updateFavoriteCities() {
    this.favCities = this.favService.getData('favorite');
    this.getForecastData();
  }

  private getForecastData() {
    this.forecastCity$ = from([this.favCities]).pipe(
      switchMap((cities) =>
        forkJoin(
          cities.map((city) =>
            this.forecastService.getForecast(city)
          )
        )
      ),
    );
  }

  public favCheck(cityName: string): boolean {
    return this.favCities.includes(cityName);
  }

  public dataTransfer(val: string): void {
    this.dataSharing.setData(val)
    this.router.navigate(['/weather', val]);
  }
}

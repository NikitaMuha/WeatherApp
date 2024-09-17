import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from '../../../services/unsubscribe';

import { ForecastInterface, CurrentInterface, LocationInterface } from '../../../interfaces/weather.interface';

import { catchError, filter, of, takeUntil, tap } from 'rxjs';

import { DataSharingService } from '../../../services/data-sharing.service';
import { ForecastService } from '../../../services/forecast.service';
import { FavoriteService } from '../../../services/favorite.service';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent extends Unsubscribe implements OnInit{
  private dataSharing = inject(DataSharingService);
  private forecastService = inject(ForecastService);
  private favService = inject(FavoriteService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public forecastWeather : ForecastInterface | null = null;
  public displayWeather : CurrentInterface |  null = null;
  public locationWeather : LocationInterface | null = null;
  public selectedHour: object = {};
  public isCelsius: boolean = true;
  private favCities: string[] = [];



  public displayNoLocation : boolean = true;
  public displayCurrent: boolean = false;
  public displayForecast: boolean = false;

  public isFavorite: boolean = false;

  private tempFormat$ = this.dataSharing.curretnTemp$

constructor () {
  super();
}

ngOnInit(): void { 
    this.activatedRoute.data
    .pipe(
      filter(res => JSON.stringify(res) !== '{}'),
      tap(response => {
        console.log(response)
        const cityData = response['city'];
        this.displayWeather = cityData['current'];
        this.forecastWeather = cityData['forecast'];
        this.locationWeather = cityData['location'];
        this.isFav();
        this.displayNoLocation = false;
        this.displayCurrent = true;
      }),
    catchError(error => {
      console.error('An error occurred:', error); 
      this.displayCurrent = false;
      this.displayForecast = false;
      this.displayNoLocation = true;
      return of();
    }),
    takeUntil(this.$destroy)
  ).subscribe();

  this.tempFormat$
  .pipe(
      tap((data) => {
        if(data == 'Celsius') {
          this.isCelsius = true;
        } else {
          this.isCelsius = false;
        }
      }),
      takeUntil(this.$destroy)
      )
      .subscribe();
}

public selectHour(hour: object): void {
  this.selectedHour = hour;
  this.displayForecast = true;
  this.displayCurrent = false;
}

private isFav() {
  this.favCities = this.favService.getData('favorite');
      this.locationWeather?.name && this.favCities.includes(this.locationWeather.name)
      ? this.isFavorite = true : this.isFavorite = false;
}
public handleEvent(event: boolean) {
  this.isFavorite = event
  this.isFav();
  console.log(this.isFavorite)
    }      
}

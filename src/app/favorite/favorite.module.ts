import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { HeaderComponent } from '../components/header/header.component';
import { WeatherModule } from '../weather/weather.module';


@NgModule({
  declarations: [
    FavoriteComponent,
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    WeatherModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class FavoriteModule { }

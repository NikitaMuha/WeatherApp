import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { WeatherModule } from './weather/weather.module';
import { FavoriteModule } from './favorite/favorite.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../interceptor/token.interceptor';
import { errorInterceptor } from '../interceptor/error.interceptor';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherModule,
    FavoriteModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorInterceptor]) // Подключение функциональных интерцепторов
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

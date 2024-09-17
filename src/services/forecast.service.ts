import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private http = inject(HttpClient)

  private readonly link_Forecast = environment.apiURL_Forecast
  private readonly key = environment.apiKEY

getForecast(location: string): Observable<Weather> {
  return this.http.get<Weather>(`${this.link_Forecast}?key=${this.key}&q=${location}&days=3&aqi=no&alerts=no`)
}
}

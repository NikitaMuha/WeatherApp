import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  
  getLocation(): Observable<City | object> {
    return this.http.get(`https://ipapi.co/json`)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Autocomplete } from '../interfaces/autocomplete.interface';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private http = inject(HttpClient)

  private readonly link = environment.apiURL_Search
  private readonly key = environment.apiKEY
  

  public getAutocompleteRes(value: string): Observable<Autocomplete[]> {
    return this.http.get<Autocomplete[]>(`${this.link}?key=${this.key}&q=${value}`)
  }
}

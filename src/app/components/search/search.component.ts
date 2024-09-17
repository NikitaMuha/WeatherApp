import { Component, inject, OnInit } from '@angular/core';


import { Autocomplete } from '../../../interfaces/autocomplete.interface';

import { AutocompleteService } from '../../../services/autocomplete.service';
import { DataSharingService } from '../../../services/data-sharing.service';

import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { Unsubscribe } from '../../../services/unsubscribe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent extends Unsubscribe implements OnInit {
  private autocompleteService = inject(AutocompleteService);
  private dataService = inject(DataSharingService);
  private router = inject(Router);


  public locationIconClassList: string = '';
  public autocompleteArray: Autocomplete[] = [];
  private inputSubject$ = new Subject<string>();

constructor() {
  super();
  this.updateArray();
}
ngOnInit () {
  this.locationIconClassList ='location-icon'
}

  public inputFocused() {
    this.locationIconClassList = 'location-icon-focus'
  }

  public forecastSearch(value: any) {
    this.dataService.setData(value.name)
    this.router.navigate(['/weather', value.name]); 
  }

  public autocompleteTrack(val: string): void {
    this.inputSubject$.next(val);
  }
  private updateArray(): void {
    this.inputSubject$
    .pipe(
      debounceTime(500), 
      distinctUntilChanged(), 
      switchMap((val: string) => this.autocompleteService.getAutocompleteRes(val)), 
      takeUntil(this.$destroy) 
    )
    .subscribe((res: Autocomplete[]) => {
      this.autocompleteArray = res;
    });
  }
}
